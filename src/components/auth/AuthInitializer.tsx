"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateUser, logout } from "@/store/slice/authSlice";
import { hydrateWorkspaces } from "@/store/slice/workspaceSlice";
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
      .then((res) => {
        if (isMounted && res.data) {
          dispatch(updateUser(res.data));
        }
      })
      .catch((err) => {
        // If 401 unauthorized and refresh also failed, log out
        if (err?.response?.status === 401) {
          dispatch(logout());
        }
      });

    authApi
      .getWorkspaces()
      .then((res) => {
        if (isMounted && res.data) {
          dispatch(hydrateWorkspaces({ ...res.data, preserveActive: true }));
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [dispatch, isAuthenticated, accessToken]);

  return null;
};
