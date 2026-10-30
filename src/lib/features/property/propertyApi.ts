import { apiClient } from "@/lib/axios";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export interface SubmitEnquiryInput {
  name: string;
  email: string;
  phone: string;
  message?: string;
  propertyId?: string;
}

export interface BookSiteVisitInput {
  visitDate: string;
  startTime: string;
  name: string;
  phone: string;
  message?: string;
  propertyId?: string;
}

export const propertyApi = {
  isUUID: (str?: string) => !!str && UUID_RE.test(str),

  getMyProperties: (params?: Record<string, any>) =>
    apiClient.get("/properties/me", { params }).then((res) => res.data),

  getMyProperty: (id: string) =>
    apiClient.get(`/properties/me/${id}`).then((res) => res.data),

  createProperty: (data: any) =>
    apiClient.post("/properties", data).then((res) => res.data),

  updateProperty: (id: string, data: any) =>
    apiClient.put(`/properties/${id}`, data).then((res) => res.data),

  deleteProperty: (id: string) =>
    apiClient.delete(`/properties/${id}`).then((res) => res.data),

  uploadPropertyImages: (propertyId: string, formData: FormData) =>
    apiClient
      .post(`/properties/${propertyId}/images`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data),

  submitEnquiry: (data: SubmitEnquiryInput) =>
    apiClient.post("/enquiries", data).then((res) => res.data),

  bookSiteVisit: (data: BookSiteVisitInput) =>
    apiClient.post("/site-visits", data).then((res) => res.data),
};
