"use client";

import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Check, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setActiveWorkspace } from "@/store/slice/workspaceSlice";
import type { Workspace } from "@/types";

export const WorkspaceSwitcher = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { workspaces, activeId } = useAppSelector((state) => state.workspace);
  const [manualOpen, setManualOpen] = useState(false);
  const [selectionDismissed, setSelectionDismissed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const active = workspaces.find((workspace) => workspace.id === activeId);
  const needsSelection = activeId === null && workspaces.length > 0;
  const isOpen = needsSelection ? !selectionDismissed : manualOpen;

  const toggleOpen = () => {
    if (needsSelection) setSelectionDismissed((dismissed) => !dismissed);
    else setManualOpen((open) => !open);
  };

  useEffect(() => {
    if (!isOpen) return;

    const close = () => {
      if (needsSelection) setSelectionDismissed(true);
      else setManualOpen(false);
    };
    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) close();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, needsSelection]);

  const handleSelect = (workspace: Workspace) => {
    dispatch(setActiveWorkspace(workspace.id));
    queryClient.removeQueries();
    setManualOpen(false);
    setSelectionDismissed(false);
    toast.success(`Switched to ${workspace.label}`);
  };

console.log(workspaces)

  if (workspaces.length === 0) {
    return (
      <button
        type="button"
        disabled
        className="flex h-11 cursor-not-allowed items-center rounded-xl border border-slate-200 bg-white px-3 text-[12px] font-bold text-slate-400 opacity-60"
      >
        No workspace
      </button>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={active ? `Workspace: ${active.label}` : "Select workspace"}
        onClick={toggleOpen}
        className="flex h-11 items-center gap-2.5 rounded-xl border border-slate-200 bg-white py-1 pl-3 pr-2.5 shadow-2xs transition-colors hover:border-[#1865F2] cursor-pointer"
      >
        <span className="hidden text-left leading-tight sm:block">
          <span className="block text-[12px] font-bold text-[#0B132B]">
            {active?.label ?? "Select workspace"}
          </span>
        </span>
        <ChevronDown
          size={14}
          className={`shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Select workspace"
          className="absolute left-0 top-full z-50 mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl"
        >
          <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Switch workspace
          </p>
          {workspaces.map((workspace) => {
            const isActive = workspace.id === activeId;
            return (
              <button
                key={workspace.id}
                type="button"
                role="option"
                aria-selected={isActive}
                onClick={() => handleSelect(workspace)}
                className={`mb-0.5 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors cursor-pointer ${
                  isActive ? "bg-[#EAF2FF]" : "hover:bg-slate-50"
                }`}
              >
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block truncate text-[12px] font-bold text-[#0B132B]">
                    {workspace.label}
                  </span>
                </span>
                {isActive && (
                  <Check size={15} className="shrink-0 text-[#1865F2]" strokeWidth={2.5} />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
