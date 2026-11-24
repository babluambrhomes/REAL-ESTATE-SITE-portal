"use client";

import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center font-jakarta">
      <div className="compound-small-card w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF3E6] text-[#D97706]">
          <ShieldAlert size={26} />
        </div>
        <h1 className="text-xl font-bold text-[#0B132B]">Access denied</h1>
        <p className="mt-2 text-sm text-slate-500">
          Your current workspace does not have permission to view this page.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#1865F2] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-700"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
