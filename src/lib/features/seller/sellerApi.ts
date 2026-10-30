import { apiClient } from "@/lib/axios";

export interface SellerOrganization {
  id?: string;
  name?: string;
}

export interface SellerProfile {
  id?: string;
  name?: string;
  reraNumber?: string;
  contactPhone?: string;
  contactEmail?: string;
  organization?: SellerOrganization;
}

export const sellerApi = {
  getMyProfile: () =>
    apiClient.get("/sellers/me").then((res) => res.data),

  updateMyProfile: (data: Partial<SellerProfile>) =>
    apiClient.put("/sellers/me", data).then((res) => res.data),
};
