import { createSlice } from "@reduxjs/toolkit";
import type { Workspace } from "@/types";

const STORAGE_KEY = "roofin_active_workspace";

const emptyState = {
  workspaces: [] as Workspace[],
  selectedWorkspaceId: null as string | null,
  hydrated: false,
};

type WorkspaceState = typeof emptyState;

const loadState = (): WorkspaceState => {
  if (typeof window === "undefined") return emptyState;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return emptyState;
    const parsed = JSON.parse(stored);
    if (typeof parsed === "string") {
      return { ...emptyState, selectedWorkspaceId: parsed as string };
    }
    if (Array.isArray(parsed?.workspaces)) {
      const workspaces = parsed.workspaces as Workspace[];
      const selected = parsed.selectedWorkspaceId ?? parsed.activeId;
      return {
        workspaces,
        selectedWorkspaceId:
          typeof selected === "string" && workspaces.some((workspace) => workspace.id === selected)
            ? selected
            : null,
        hydrated: false,
      };
    }
  } catch {
    return emptyState;
  }
  return emptyState;
};

const persist = (state: WorkspaceState) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        workspaces: state.workspaces,
        selectedWorkspaceId: state.selectedWorkspaceId,
      })
    );
  } catch {
    return;
  }
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState: loadState(),
  reducers: {
    hydrateWorkspaces(state, action) {
      const workspaces = action.payload?.workspaces;
      if (!Array.isArray(workspaces)) return;

      state.workspaces = workspaces;
      const isStillValid =
        state.selectedWorkspaceId &&
        workspaces.some((workspace: Workspace) => workspace.id === state.selectedWorkspaceId);

      state.selectedWorkspaceId = isStillValid
        ? state.selectedWorkspaceId
        : workspaces.length > 0
          ? workspaces[0].id
          : null;
      state.hydrated = true;
      persist(state);
    },
    setSelectedWorkspace(state, action) {
      state.selectedWorkspaceId = action.payload;
      persist(state);
    },
    resetWorkspace() {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(STORAGE_KEY);
      }
      return emptyState;
    },
  },
});

export const { hydrateWorkspaces, setSelectedWorkspace, resetWorkspace } = workspaceSlice.actions;
export default workspaceSlice.reducer;
