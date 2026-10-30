"use client";

import { useRouter } from "next/navigation";
import { PortalProperties } from "@/components/properties/PortalProperties";

export default function PropertiesPage() {
  const router = useRouter();

  return (
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
  );
}
