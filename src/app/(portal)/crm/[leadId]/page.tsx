"use client";

import { useRouter } from "next/navigation";
import { PortalLeadDetail } from "@/components/crm/PortalLeadDetail";

export default function LeadDetailPage() {
  const router = useRouter();

  return <PortalLeadDetail onBack={() => router.push("/crm")} />;
}
