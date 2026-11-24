export type DashboardWorkspaceType = "INDIVIDUAL" | "ORGANIZATION";

export type DashboardAccountStatus =
  | "PENDING"
  | "ACTIVE"
  | "SUSPENDED"
  | "DEACTIVATED";

export type DashboardVerificationStatus = "PENDING" | "VERIFIED" | "REJECTED";

export type DashboardKycStatus =
  | "NOT_SUBMITTED"
  | "PENDING"
  | "VERIFIED"
  | "REJECTED";

export type DashboardKycDocType =
  | "PAN_CARD"
  | "AADHAAR_CARD"
  | "GST_CERTIFICATE"
  | "COMPANY_REGISTRATION"
  | "RERA_CERTIFICATE"
  | "OFFICE_ADDRESS_PROOF"
  | "OTHER";

export interface DashboardWorkspace {
  id: string;
  sellerId: string;
  organizationId: string | null;
  type: DashboardWorkspaceType;
  name: string;
  slug: string;
  roleName: string | null;
}

export interface DashboardAccount {
  status: DashboardAccountStatus;
  emailVerified: boolean;
  phoneVerified: boolean;
  verificationStatus: DashboardVerificationStatus;
}

export interface DashboardProfile {
  percentage: number;
  status: "INCOMPLETE" | "COMPLETE";
  completed: string[];
  missing: string[];
}

export interface DashboardKycRequirement {
  docType: DashboardKycDocType;
  label: string;
  isRequired: boolean;
  submitted: boolean;
  status: DashboardVerificationStatus | null;
  rejectionReason: string | null;
}

export interface DashboardKyc {
  status: DashboardKycStatus;
  complete: boolean;
  submitted: boolean;
  requiredSubmitted: number;
  requirements: DashboardKycRequirement[];
}

export interface DashboardCounts {
  total: number;
  active: number;
}

export interface DashboardData {
  workspace: DashboardWorkspace;
  account: DashboardAccount;
  profile: DashboardProfile;
  kyc: DashboardKyc;
  properties: DashboardCounts;
  followers: { total: number };
  leads: { total: number; newCount: number };
}

export interface DashboardResponse {
  statusCode: number;
  data: DashboardData;
  message: string;
  success: boolean;
}
