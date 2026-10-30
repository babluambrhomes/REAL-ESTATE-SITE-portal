"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PortalCrmLeads } from "@/components/crm/PortalCrmLeads";
import { PageLoader } from "@/components/ui/PageLoader";

const TAB_SLUGS: Record<string, string> = {
  all: "All Leads",
  new: "New",
  contacted: "Contacted",
  "site-visit": "Site Visit",
  negotiation: "Negotiation",
  converted: "Converted",
  "not-respond": "Not Respond",
};

const LABEL_SLUGS: Record<string, string> = Object.fromEntries(
  Object.entries(TAB_SLUGS).map(([slug, label]) => [label, slug])
);

function CrmContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabSlug = searchParams.get("tab") ?? "all";
  const initialTab = TAB_SLUGS[tabSlug] ?? "All Leads";

  return (
    <PortalCrmLeads
      initialTab={initialTab}
      onTabChange={(label) => {
        const slug = LABEL_SLUGS[label] ?? "all";
        router.replace(`/crm?tab=${slug}`, { scroll: false });
      }}
      onSelectLead={(leadId) => router.push(`/crm/${leadId}`)}
    />
  );
}

export default function CrmPage() {
  return (
    <Suspense fallback={<PageLoader label="Loading CRM..." />}>
      <CrmContent />
    </Suspense>
  );
}
