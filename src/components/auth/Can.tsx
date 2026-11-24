"use client";

import type { ReactNode } from "react";
import { usePermissions } from "@/lib/auth/usePermissions";
import type { ActionKey } from "@/lib/auth/access-control";

interface CanProps {
  action?: ActionKey | string;
  permission?: string;
  any?: Array<ActionKey | string>;
  children: ReactNode;
  fallback?: ReactNode;
}

export function Can({ action, permission, any, children, fallback = null }: CanProps) {
  const { can, canKey, canAny } = usePermissions();

  let allowed = true;
  if (action) allowed = can(action);
  else if (permission) allowed = canKey(permission);
  else if (any) allowed = canAny(any);

  return <>{allowed ? children : fallback}</>;
}
