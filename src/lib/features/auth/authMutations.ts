import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { authApi } from "./authApi";
import { setAuth, setRequiresOtp, setOtpState, setVerificationToken } from "@/store/slice/authSlice";
import { hydrateWorkspaces } from "@/store/slice/workspaceSlice";
import { useAppDispatch } from "@/store/hooks";
import type { AppDispatch } from "@/store/store";
import type {
  AuthData,
  AuthSuccessResponse,
  OtpSentResponse,
  RegisterOtpResponse,
  ApiError,
} from "@/types";
import type {
  RegisterRequest,
  LoginRequest,
  VerifyOtpRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from "@/types";
import toast from "react-hot-toast";

function getErrorMessage(error: unknown, fallback: string): string {
  const axiosError = error as AxiosError<ApiError>;
  return axiosError.response?.data?.message || fallback;
}

type AuthResponse = AuthSuccessResponse | OtpSentResponse | RegisterOtpResponse;
type OtpChallengeResponse = OtpSentResponse | RegisterOtpResponse;

function isOtpChallenge(response: AuthResponse): response is OtpChallengeResponse {
  const data = response.data as {
    verificationToken?: string | null;
    requiresOtp?: boolean;
  };
  return Boolean(data?.verificationToken || data?.requiresOtp) ||
    response.message?.toLowerCase().includes("otp") === true;
}

function getVerificationToken(response: OtpChallengeResponse): string | null {
  const token = response.data.verificationToken;
  return typeof token === "string" && token ? token : null;
}

function isAuthData(data: unknown): data is AuthData {
  return Boolean(
    data &&
      typeof data === "object" &&
      "accessToken" in data &&
      "user" in data
  );
}

function applyAuth(dispatch: AppDispatch, data: AuthData) {
  dispatch(setAuth(data));
  dispatch(hydrateWorkspaces({ workspaces: data.workspaces ?? [] }));
}

export function useLoginMutation() {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (result, variables) => {
      if (isOtpChallenge(result)) {
        const identifier = variables.phone || variables.email || "";
        const verificationToken = getVerificationToken(result);

        if (verificationToken) {
          dispatch(setVerificationToken(verificationToken));
        }

        dispatch(
          setOtpState({
            identifier,
            purpose: "PHONE_VERIFICATION",
          })
        );

        dispatch(setRequiresOtp(true));
      } else if (isAuthData(result.data)) {
        applyAuth(dispatch, result.data);
      }
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Login failed"));
    },
  });
}

export function useRegisterMutation() {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: (result, variables) => {
      const isGoogleAuth = !!variables.FbTokenId || !!variables.accessToken;

      if (!isGoogleAuth && isOtpChallenge(result)) {
        const purpose = variables.phone
          ? "PHONE_VERIFICATION"
          : "EMAIL_VERIFICATION";

        const identifier = variables.phone || variables.email || "";
        const verificationToken = getVerificationToken(result);

        if (verificationToken) {
          dispatch(setVerificationToken(verificationToken));
        }

        dispatch(setOtpState({ identifier, purpose }));
        dispatch(setRequiresOtp(true));
        return;
      }

      if (isAuthData(result.data)) {
        applyAuth(dispatch, result.data);
      }
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Registration failed"));
    },
  });
}

export function useVerifyOtpMutation() {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (data: VerifyOtpRequest) => authApi.verifyOtp(data),
    onSuccess: (result) => {
      if (isAuthData(result.data)) {
        applyAuth(dispatch, result.data);
      }
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "OTP verification failed"));
    },
  });
}

export function useForgotPasswordMutation() {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) => authApi.forgotPassword(data),
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to send reset link"));
    },
  });
}

export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => authApi.resetPassword(data),
    onError: (error) => {
      toast.error(getErrorMessage(error, "Password reset failed"));
    },
  });
}
