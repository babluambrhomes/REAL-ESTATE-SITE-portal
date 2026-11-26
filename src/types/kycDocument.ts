export type KycDocType =
  | "COMPANY_REGISTRATION"
  | "GST_CERTIFICATE"
  | "PAN_CARD"
  | "OFFICE_ADDRESS_PROOF"
  | "RERA_CERTIFICATE"
  | "AADHAAR_CARD"
  | "OTHER";

export type KycVerificationStatus = "PENDING" | "VERIFIED" | "REJECTED";

export interface KycSubmissionStatus {
  docType: KycDocType;
  displayLabel: string;
  isRequired: boolean;
  maxFiles: number;
  displayOrder: number;
  submitted: boolean;
  status: KycVerificationStatus | null;
  rejectionReason: string | null;
}

export interface KycDocument {
  id: string;
  docType: KycDocType;
  title: string;
  status?: KycVerificationStatus | null;
  rejectionReason?: string | null;
  fileName?: string;
  originalName?: string;
  fileUrl?: string;
  url?: string;
  mimeType?: string;
  size?: number;
  fileSize?: number;
  createdAt?: string;
  uploadedAt?: string;
}

export interface KycDocumentsData {
  sellerType: "ORGANIZATION" | "INDIVIDUAL" | string;
  documents: KycDocument[];
  submissionStatus: KycSubmissionStatus[];
}

export interface KycDocumentsResponse {
  statusCode: number;
  data: KycDocumentsData;
  message: string;
  success: boolean;
}

export interface UploadKycDocumentInput {
  document: File;
  docType: KycDocType;
  title: string;
}
