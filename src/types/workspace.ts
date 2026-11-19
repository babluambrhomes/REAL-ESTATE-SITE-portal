export interface WorkspaceRole {
  id: string;
  name: string;
}

export interface Workspace {
  id: string;
  type: "INDIVIDUAL_SELLER" | "ORGANIZATION";
  label: string;
  organizationId: string | null;
  sellerId: string;
  roles: WorkspaceRole[];
  permissions: string[];
  verificationStatus: string;
}
