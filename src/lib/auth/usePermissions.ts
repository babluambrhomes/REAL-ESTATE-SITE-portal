"use client";

import { useCallback } from "react";
import { useAppSelector } from "@/store/hooks";
import {
  canAccessPath,
  hasAnyPermission,
  hasPermission,
  resolvePermission,
} from "./access-control";
import type { ActionKey } from "./access-control";

export function usePermissions() {
  const selectedWorkspace = useAppSelector((state) => {
    const { workspaces, selectedWorkspaceId } = state.workspace;
    return workspaces.find((workspace) => workspace.id === selectedWorkspaceId) ?? null;
  });
  const isReady = useAppSelector((state) => state.workspace.hydrated);

  const can = useCallback(
    (action: ActionKey | string) => hasPermission(selectedWorkspace, action),
    [selectedWorkspace]
  );

  const canAny = useCallback(
    (actions: Array<ActionKey | string>) => hasAnyPermission(selectedWorkspace, actions),
    [selectedWorkspace]
  );

  const canPath = useCallback(
    (pathname: string) => canAccessPath(selectedWorkspace, pathname),
    [selectedWorkspace]
  );

  return {
    workspace: selectedWorkspace,
    permissions: selectedWorkspace?.permissions ?? [],
    can,
    canAny,
    canPath,
    canKey: (key: string) => hasPermission(selectedWorkspace, key),
    resolvePermission,
    isOrganization: selectedWorkspace?.type === "ORGANIZATION",
    organizationId: selectedWorkspace?.organizationId ?? null,
    isReady,
  };
}
