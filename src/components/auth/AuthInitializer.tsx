"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateUser, logout } from "@/store/slice/authSlice";
import { hydrateWorkspaces, resetWorkspace } from "@/store/slice/workspaceSlice";
import { userApi } from "@/lib/features/user/userApi";
import { authApi } from "@/lib/features/auth/authApi";

export const AuthInitializer = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (!isAuthenticated || !accessToken) return;

    let isMounted = true;

    userApi
      .getProfile()
      .then((res: any) => {
        const profile = res?.data?.user ?? res?.data;
        if (isMounted && profile) {
          dispatch(updateUser(profile));
        }
      })
      .catch((err) => {
        // If 401 unauthorized and refresh also failed, log out
        if (err?.response?.status === 401) {
          dispatch(logout());
          dispatch(resetWorkspace());
        }
      });

    authApi
      .getWorkspaces()
      .then((res) => {
        if (isMounted && res.data) {
          dispatch(hydrateWorkspaces({ workspaces: res.data.workspaces }));
        }
      })
      .catch(() => {
        dispatch(hydrateWorkspaces({ workspaces: [] }));
      });

    return () => {
      isMounted = false;
    };
  }, [dispatch, isAuthenticated, accessToken]);

  return null;
};
