"use client";

import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock,
  FileText,
  RefreshCw,
  ShieldCheck,
  User,
  XCircle,
} from "lucide-react";
import type {
  DashboardData,
  DashboardVerificationStatus,
} from "@/types";

interface DashboardVerificationCardProps {
  data?: DashboardData;
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  onRetry: () => void;
}

function StatusBadge({ status }: { status: DashboardVerificationStatus | string }) {
  const styles =
    status === "VERIFIED"
      ? "bg-[#E8F8F0] text-[#00BA63]"
      : status === "REJECTED"
        ? "bg-[#FFE4E6] text-[#E11D48]"
        : "bg-[#FFF3E6] text-[#D97706]";

  const Icon =
    status === "VERIFIED" ? CheckCircle2 : status === "REJECTED" ? XCircle : Clock;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${styles}`}
    >
      <Icon size={11} />
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}

function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-slate-100 ${className}`} />;
}

export function DashboardVerificationCard({
  data,
  isLoading,
  isError,
  errorMessage,
  onRetry,
}: DashboardVerificationCardProps) {
  const router = useRouter();

  if (isError && !data) {
    return (
      <div className="compound-small-card flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-5 font-jakarta sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <AlertCircle size={22} className="text-[#E11D48]" />
          <div>
            <h3 className="text-sm font-bold text-[#0B132B]">
              Dashboard summary unavailable
            </h3>
            <p className="text-xs text-slate-500">
              {errorMessage || "Could not load your dashboard data."}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-[#1865F2] hover:bg-slate-50 cursor-pointer"
        >
          <RefreshCw size={13} />
          Retry
        </button>
      </div>
    );
  }

  const profilePercentage = data?.profile.percentage ?? 0;
  const requiredDocs = data?.kyc.requirements.filter((item) => item.isRequired).length ?? 0;
  const profileMissing = data?.profile.missing ?? [];

  return (
    <div className="compound-small-card rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs font-jakarta">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-[#EAF2FF] text-[#1865F2] flex items-center justify-center">
            <ShieldCheck size={18} />
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-[#0B132B]">
              Verification &amp; Profile
            </h3>
            <p className="text-[11px] text-slate-400">
              Your workspace and account status at a glance
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {isLoading ? (
            <SkeletonBlock className="h-6 w-28" />
          ) : (
            <>
              <StatusBadge status={data?.account.verificationStatus ?? "PENDING"} />
              <StatusBadge status={data?.kyc.status ?? "NOT_SUBMITTED"} />
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 pt-4 lg:grid-cols-3">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-slate-400">
            <Building2 size={13} />
            Workspace
          </div>
          {isLoading ? (
            <div className="space-y-2">
              <SkeletonBlock className="h-4 w-36" />
              <SkeletonBlock className="h-3 w-24" />
            </div>
          ) : (
            <>
              <p className="text-sm font-bold text-[#0B132B]">
                {data?.workspace.name || "—"}
              </p>
              <p className="text-xs text-slate-500">
                {data?.workspace.type === "ORGANIZATION" ? "Organization" : "Individual"}
                {data?.workspace.roleName ? ` · ${data.workspace.roleName}` : ""}
              </p>
              <p className="text-xs text-slate-500">
                Properties: {data?.properties.active ?? 0} active of{" "}
                {data?.properties.total ?? 0} total
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1">
                  <User size={12} />
                  {data?.account.emailVerified ? "Email verified" : "Email unverified"}
                </span>
                <span className="inline-flex items-center gap-1">
                  <User size={12} />
                  {data?.account.phoneVerified ? "Phone verified" : "Phone unverified"}
                </span>
              </div>
            </>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-slate-400">
            <FileText size={13} />
            KYC documents
          </div>
          {isLoading ? (
            <div className="space-y-2">
              <SkeletonBlock className="h-4 w-32" />
              <SkeletonBlock className="h-3 w-40" />
            </div>
          ) : (
            <>
              <p className="text-sm font-bold text-[#0B132B]">
                {data?.kyc.requiredSubmitted ?? 0} of {requiredDocs} required submitted
              </p>
              <div className="flex flex-wrap gap-1.5">
                {data?.kyc.requirements.length ? (
                  data.kyc.requirements.map((item) => (
                    <span
                      key={item.docType}
                      title={item.rejectionReason || item.label}
                      className={`rounded-md px-2 py-1 text-[10px] font-semibold ${
                        item.status === "VERIFIED"
                          ? "bg-[#E8F8F0] text-[#00BA63]"
                          : item.status === "REJECTED"
                            ? "bg-[#FFE4E6] text-[#E11D48]"
                            : item.submitted
                              ? "bg-[#FFF3E6] text-[#D97706]"
                              : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {item.label}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400">No documents submitted</span>
                )}
              </div>
            </>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2 text-[11px] font-bold uppercase tracking-wide text-slate-400">
            <span>Profile completion</span>
            {!isLoading && (
              <span className="text-[13px] font-bold text-[#0B132B]">
                {profilePercentage}%
              </span>
            )}
          </div>
          {isLoading ? (
            <SkeletonBlock className="h-2 w-full" />
          ) : (
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-[#1865F2] transition-all duration-500"
                style={{ width: `${Math.max(0, Math.min(100, profilePercentage))}%` }}
              />
            </div>
          )}
          <p className="text-xs text-slate-500">
            {isLoading
              ? "Loading your profile status..."
              : profileMissing.length
                ? `${profileMissing.length} items pending: ${profileMissing.slice(0, 3).join(", ")}${profileMissing.length > 3 ? ", ..." : ""}`
                : "Your profile is complete."}
          </p>
          <button
            type="button"
            onClick={() => router.push("/account")}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#1865F2] hover:underline cursor-pointer"
          >
            Complete Now
            <ArrowRight size={12} />
          </button>
        </div>
      </div>

      {isError && data && (
        <p className="mt-4 flex items-center gap-2 text-[11px] text-[#D97706]">
          <AlertCircle size={12} />
          Showing cached data.{" "}
          <button type="button" onClick={onRetry} className="font-bold underline cursor-pointer">
            Retry
          </button>
        </p>
      )}
    </div>
  );
}
