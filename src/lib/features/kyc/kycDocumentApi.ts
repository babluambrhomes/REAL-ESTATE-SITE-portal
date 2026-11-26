import { apiClient } from "@/lib/axios";
import type {
  KycDocumentsResponse,
  UploadKycDocumentInput,
} from "@/types";

export const kycDocumentApi = {
  getDocuments: () =>
    apiClient
      .get<KycDocumentsResponse>("/sellers/kyc/documents")
      .then((response) => response.data),

  getDocumentFile: (docId: string) =>
    apiClient
      .get<Blob>(`/sellers/kyc/documents/${encodeURIComponent(docId)}/file`, {
        responseType: "blob",
      })
      .then((response) => response.data),

  uploadDocument: ({ document, docType, title }: UploadKycDocumentInput) => {
    const formData = new FormData();
    formData.append("document", document);
    formData.append("docType", docType);
    formData.append("title", title);

    return apiClient
      .post<KycDocumentsResponse>("/sellers/kyc/documents", formData)
      .then((response) => response.data);
  },
};
