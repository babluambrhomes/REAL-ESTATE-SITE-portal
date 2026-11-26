"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "@/store/hooks";
import type { KycDocumentsData } from "@/types";
import { dashboardSummaryKey } from "../dashboard/useDashboardSummary";
import { kycDocumentApi } from "./kycDocumentApi";

export const kycDocumentsKey = (workspaceId?: string | null) =>
  ["kyc", "documents", workspaceId ?? "individual"] as const;

export function useKycDocuments() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const workspaceId = useAppSelector((state) => state.workspace.selectedWorkspaceId);
  const queryClient = useQueryClient();

  const query = useQuery<KycDocumentsData, Error>({
    queryKey: kycDocumentsKey(workspaceId),
    enabled: isAuthenticated,
    queryFn: async () => {
      const response = await kycDocumentApi.getDocuments();
      if (!response?.success || !response.data) {
        throw new Error(response?.message || "Failed to load KYC documents.");
      }
      return response.data;
    },
  });

  const upload = useMutation({
    mutationFn: kycDocumentApi.uploadDocument,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: kycDocumentsKey(workspaceId) });
      await queryClient.invalidateQueries({ queryKey: dashboardSummaryKey(workspaceId) });
    },
  });

  return { ...query, upload };
}
