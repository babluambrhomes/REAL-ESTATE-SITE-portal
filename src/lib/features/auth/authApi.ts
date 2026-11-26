import { apiClient } from "@/lib/axios";

import type {
  RegisterRequest,
  LoginRequest,
  VerifyOtpRequest,
  RefreshRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  UpdateContactRequest,
  UpdatePasswordRequest,
  AuthSuccessResponse,
  OtpSentResponse,
  RegisterOtpResponse,
  MessageResponse,
  RefreshResponse,
  WorkspacesResponse,
} from "@/types";

export const authApi = {
  getWorkspaces: () =>
    apiClient
      .get<WorkspacesResponse>("/auth/workspaces")
      .then((r) => r.data),

  register: (data: RegisterRequest) =>
    apiClient
      .post<AuthSuccessResponse | RegisterOtpResponse>("/auth/register", data)
      .then((r) => r.data),

  login: (data: LoginRequest) =>
    apiClient
      .post<AuthSuccessResponse | OtpSentResponse>("/auth/login", data)
      .then((r) => r.data),

  verifyOtp: (data: VerifyOtpRequest) =>
    apiClient
      .post<AuthSuccessResponse | MessageResponse>(
        "/auth/private-otp-verify",
        data
      )
      .then((r) => r.data),

  refresh: (data: RefreshRequest) =>
    apiClient
      .post<RefreshResponse>("/auth/refresh", data)
      .then((r) => r.data),

  forgotPassword: (data: ForgotPasswordRequest) =>
    apiClient
      .post<MessageResponse>("/auth/forgot-password", data)
      .then((r) => r.data),

  resetPassword: (data: ResetPasswordRequest) =>
    apiClient
      .post<MessageResponse>("/auth/reset-password", data)
      .then((r) => r.data),

  updateContact: (data: UpdateContactRequest) =>
    apiClient
      .patch<MessageResponse>("/auth/me/contact", data)
      .then((r) => r.data),

  updatePassword: (data: UpdatePasswordRequest) =>
    apiClient
      .patch<MessageResponse>("/auth/me/password", data)
      .then((r) => r.data),

  logout: () =>
    apiClient
      .post<MessageResponse>("/auth/logout")
      .then((r) => r.data),
};
