import { createSlice } from "@reduxjs/toolkit";
import type { Workspace } from "@/types";

const STORAGE_KEY = "roofin_active_workspace";

const emptyState = {
  workspaces: [] as Workspace[],
  activeId: null as string | null,
};

const loadState = () => {
  if (typeof window === "undefined") return emptyState;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return emptyState;
    const parsed = JSON.parse(stored);
    if (typeof parsed === "string") {
      return { workspaces: [] as Workspace[], activeId: parsed as string | null };
    }
    if (Array.isArray(parsed?.workspaces)) {
      const workspaces = parsed.workspaces as Workspace[];
      const activeId = parsed.activeId;
      return {
        workspaces,
        activeId:
          typeof activeId === "string" &&
          workspaces.some((workspace) => workspace.id === activeId)
            ? activeId
            : null,
      };
    }
  } catch (error) {
    void error;
  }
  return emptyState;
};

const persist = (state: { workspaces: Workspace[]; activeId: string | null }) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    void error;
  }
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState: loadState(),
  reducers: {
    hydrateWorkspaces(state, action) {
      const { workspaces, activeWorkspaceId, preserveActive } = action.payload;
      if (!Array.isArray(workspaces)) return;
      state.workspaces = workspaces;
      const backendId =
        typeof activeWorkspaceId === "string" &&
        workspaces.some((workspace: Workspace) => workspace.id === activeWorkspaceId)
          ? activeWorkspaceId
          : null;
      const preservedId =
        preserveActive &&
        state.activeId &&
        workspaces.some((workspace: Workspace) => workspace.id === state.activeId)
          ? state.activeId
          : null;
      state.activeId = preservedId ?? backendId;
      persist(state);
    },
    setActiveWorkspace(state, action) {
      state.activeId = action.payload;
      persist(state);
    },
  },
});

export const { hydrateWorkspaces, setActiveWorkspace } = workspaceSlice.actions;
export default workspaceSlice.reducer;
