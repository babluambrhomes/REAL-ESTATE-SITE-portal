"use client";

import { useRouter } from "next/navigation";
import { PortalStats } from "@/components/dashboard/PortalStats";
import { PortalCharts } from "@/components/dashboard/PortalCharts";
import { PortalProperties } from "@/components/properties/PortalProperties";
import { PortalWidgets } from "@/components/dashboard/PortalWidgets";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <>
      <PortalStats />
      <PortalCharts />
      <PortalProperties
        onPostProperty={() => router.push("/property/add-new")}
        onViewHealthScore={(name) =>
          router.push(`/property/health-score/${encodeURIComponent(name || "property")}`)
        }
        onViewDiagnosis={(name) =>
          router.push(`/property/performance-diagnosis/${encodeURIComponent(name || "property")}`)
        }
        onSelectLead={(leadId) => router.push(`/crm/${leadId}`)}
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
