import { apiClient } from "@/lib/axios";
import type { DashboardResponse } from "@/types";

export const dashboardApi = {
  getSummary: () =>
    apiClient
      .get<DashboardResponse>("/dashboard/summary")
      .then((res) => res.data),
};
