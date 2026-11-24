"use client";

import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/store/hooks";
import { dashboardApi } from "./dashboardApi";
import type { DashboardData } from "@/types";

export const dashboardSummaryKey = (workspaceId?: string | null) =>
  ["dashboard", "summary", workspaceId ?? "individual"] as const;

export function useDashboardSummary() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const selectedWorkspaceId = useAppSelector((state) => state.workspace.selectedWorkspaceId);

  return useQuery<DashboardData, Error>({
    queryKey: dashboardSummaryKey(selectedWorkspaceId),
    enabled: isAuthenticated,
    queryFn: async () => {
      const response = await dashboardApi.getSummary();
      if (!response?.success || !response.data) {
        throw new Error(response?.message || "Failed to load dashboard summary");
      }
      return response.data;
    },
  });
}
