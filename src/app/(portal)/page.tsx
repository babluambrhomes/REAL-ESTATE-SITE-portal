"use client";

import { useRouter } from "next/navigation";
import { PortalStats } from "@/components/dashboard/PortalStats";
import { PortalCharts } from "@/components/dashboard/PortalCharts";

import { PortalWidgets } from "@/components/dashboard/PortalWidgets";
import { DashboardVerificationCard } from "@/components/dashboard/DashboardVerificationCard";
import { useDashboardSummary } from "@/lib/features/dashboard/useDashboardSummary";

export default function DashboardPage() {
  const router = useRouter();
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useDashboardSummary();



  return (
    <>
      <PortalStats
        activeProperties={data?.properties.active}
        followers={data?.followers.total}
        newLeads={data?.leads.newCount}
        isLoading={isLoading}
      />
      <PortalCharts
        totalLeads={data?.leads.total}
        newLeads={data?.leads.newCount}
      />
      <DashboardVerificationCard
        data={data}
        isLoading={isLoading}
        isError={isError}
        errorMessage={error?.message}
        onRetry={() => refetch()}
      />
     
      <PortalWidgets
        onPostProperty={() => router.push("/property/add-new")}
        onSelectView={(view) => {
          const routes: Record<string, string> = {
            "my-projects": "/projects",
            "crm-leads": "/crm",
            "boost-property": "/upgrade-plane",
            analytics: "/analytics",
          };
          router.push(routes[view] || "/");
        }}
      />
    </>
  );
}
