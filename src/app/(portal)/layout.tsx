"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PortalSidebar } from "@/components/layout/PortalSidebar";
import { PortalHeader } from "@/components/layout/PortalHeader";
import { useAppSelector } from "@/store/hooks";
import { PageLoader } from "@/components/ui/PageLoader";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.replace("/login");
    }
  }, [mounted, isAuthenticated, router]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F7FB] text-sm text-slate-500 font-jakarta">
        <PageLoader label="Loading portal..." />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#F4F7FB] font-jakarta antialiased flex">
      <Suspense fallback={null}>
        <PortalSidebar
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((prev) => !prev)}
        />
      </Suspense>

      <div
        className={`flex-1 transition-all duration-300 ease-in-out min-h-screen flex flex-col ${
          collapsed ? "ml-[76px]" : "ml-[240px]"
        }`}
      >
        <div className="sticky top-0 z-30 bg-[#F4F7FB]/90 backdrop-blur-md border-b border-slate-200/70">
          <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-7 py-3">
            <PortalHeader />
          </div>
        </div>
        <main className="flex-1 p-4 sm:p-6 lg:p-7 max-w-[1600px] w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
