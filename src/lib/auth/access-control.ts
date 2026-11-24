import type { Workspace } from "@/types";

export const ACTION_RULES = {
  "sellerProfile.read": "sellerProfile:read",
  "sellerProfile.update": "sellerProfile:update",
  "property.create": "property:create",
  "property.read": "property:read",
  "property.update": "property:update",
  "property.delete": "property:delete",
  "property.publish": "property:publish",
  "lead.read": "lead:read",
  "lead.update": "lead:update",
  "siteVisit.read": "siteVisit:read",
  "siteVisit.update": "siteVisit:update",
  "buyerQuestion.read": "buyerQuestion:read",
  "buyerQuestion.answer": "buyerQuestion:answer",
  "video.upload": "video:upload",
  "member.invite": "member:invite",
  "member.update": "member:update",
  "role.manage": "role:manage",
} as const;

export type ActionKey = keyof typeof ACTION_RULES;

export const NAV_PERMISSIONS: Record<string, string[]> = {
  dashboard: [],
  properties: [ACTION_RULES["property.read"]],
  propertyCreate: [ACTION_RULES["property.create"]],
  drafts: [ACTION_RULES["property.read"]],
  boost: [ACTION_RULES["property.publish"]],
  crm: [ACTION_RULES["lead.read"]],
  siteVisits: [ACTION_RULES["siteVisit.read"]],
  buyerQuestions: [ACTION_RULES["buyerQuestion.read"]],
  audience: [],
  content: [],
  analytics: [],
  insights: [],
  account: [ACTION_RULES["sellerProfile.read"]],
  team: [
    ACTION_RULES["member.invite"],
    ACTION_RULES["member.update"],
    ACTION_RULES["role.manage"],
  ],
};

type RouteRule = { prefix: string; anyOf: string[] };

const ROUTE_RULES: RouteRule[] = [
  { prefix: "/unauthorized", anyOf: [] },
  { prefix: "/", anyOf: [] },
  { prefix: "/account", anyOf: [ACTION_RULES["sellerProfile.read"]] },
  { prefix: "/property/add-new", anyOf: [ACTION_RULES["property.create"]] },
  { prefix: "/property/drafts", anyOf: [ACTION_RULES["property.read"]] },
  { prefix: "/property/health-score", anyOf: [ACTION_RULES["property.read"]] },
  { prefix: "/property/performance-diagnosis", anyOf: [ACTION_RULES["property.read"]] },
  { prefix: "/property", anyOf: [ACTION_RULES["property.read"]] },
  { prefix: "/projects", anyOf: [ACTION_RULES["property.read"]] },
  { prefix: "/crm", anyOf: [ACTION_RULES["lead.read"]] },
  { prefix: "/upgrade-plane", anyOf: [ACTION_RULES["property.publish"]] },
  {
    prefix: "/team",
    anyOf: [
      ACTION_RULES["member.invite"],
      ACTION_RULES["member.update"],
      ACTION_RULES["role.manage"],
    ],
  },
  { prefix: "/audience", anyOf: [] },
  { prefix: "/content", anyOf: [] },
  { prefix: "/analytics", anyOf: [] },
  { prefix: "/insights", anyOf: [] },
];

export function resolvePermission(action: ActionKey | string): string {
  return ACTION_RULES[action as ActionKey] ?? action;
}

export function hasPermission(
  workspace: Workspace | null | undefined,
  action: ActionKey | string
): boolean {
  const key = resolvePermission(action);
  return workspace?.permissions?.includes(key) ?? false;
}

export function hasAnyPermission(
  workspace: Workspace | null | undefined,
  actions: Array<ActionKey | string>
): boolean {
  return actions.some((action) => hasPermission(workspace, action));
}

export function canNavigate(
  workspace: Workspace | null | undefined,
  navId: string
): boolean {
  const required = NAV_PERMISSIONS[navId];
  if (!required?.length) return true;
  return hasAnyPermission(workspace, required);
}

export function requiredPermissionsForPath(pathname: string): string[] {
  const rule = ROUTE_RULES.find((candidate) =>
    candidate.prefix === "/"
      ? pathname === "/"
      : pathname === candidate.prefix || pathname.startsWith(`${candidate.prefix}/`)
  );
  return rule?.anyOf ?? [];
}

export function canAccessPath(
  workspace: Workspace | null | undefined,
  pathname: string
): boolean {
  const required = requiredPermissionsForPath(pathname);
  if (!required.length) return true;
  return hasAnyPermission(workspace, required);
}
