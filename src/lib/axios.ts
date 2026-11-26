import axios, { type AxiosError, type AxiosRequestConfig } from "axios";
import { store } from "@/store/store";
import { resetWorkspace } from "@/store/slice/workspaceSlice";
import type { ApiError } from "@/types";

type RetryConfig = AxiosRequestConfig & { _retry?: boolean };

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const state = store.getState();
  const { accessToken, verificationToken } = state.auth;
  const token = accessToken || verificationToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }


  console.log(accessToken, verificationToken)


  delete config.headers["x-organization-id"];
  const { workspaces, selectedWorkspaceId } = state.workspace;
  const activeWorkspace = workspaces.find((workspace) => workspace.id === selectedWorkspaceId);
  if (
    token &&
    activeWorkspace?.type === "ORGANIZATION" &&
    activeWorkspace.organizationId
  ) {
    config.headers["x-organization-id"] = activeWorkspace.organizationId;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiError>) => {
    const original = error.config as RetryConfig | undefined;

    if (
      error?.response?.status === 401 &&
      error?.response?.data?.code === "TOKEN_EXPIRED" &&
      original &&
      !original._retry
    ) {
      original._retry = true;
      const { refreshToken } = store.getState().auth;

      if (refreshToken) {
        try {
          const { data } = await axios.post(`${API_URL}/auth/refresh`, {
            refreshToken,
          });
          const { accessToken, refreshToken: newRefreshToken } = data.data;

          store.dispatch({
            type: "auth/tokensRefreshed",
            payload: { accessToken, refreshToken: newRefreshToken },
          });

          original.headers = {
            ...(original.headers ?? {}),
            Authorization: `Bearer ${accessToken}`,
          };
          return apiClient.request(original);
        } catch (refreshError) {
          store.dispatch({ type: "auth/logout" });
          store.dispatch(resetWorkspace());
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
          return Promise.reject(refreshError);
        }
      }

      store.dispatch({ type: "auth/logout" });
      store.dispatch(resetWorkspace());
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
