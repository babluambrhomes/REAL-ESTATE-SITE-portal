"use client";

import Image from "next/image";

interface PortalStatsProps {
  activeProperties?: number;
  followers?: number;
  newLeads?: number;
  propertyViews?: string;
  siteVisits?: string;
}

export const PortalStats = ({
  activeProperties = 24,
  followers = 8,
  newLeads = 500,
  propertyViews = "12.4K",
  siteVisits = "12.4K",
}: PortalStatsProps) => {
  const stats = [
    {
      label: "Active Properties",
      value: activeProperties,
      iconSrc: "/icon/status/active-properties.svg",
    },
    {
      label: "Followers",
      value: followers,
      iconSrc: "/icon/status/followers.svg",
    },
    {
      label: "New Leads",
      value: newLeads,
      iconSrc: "/icon/status/new-leads.svg",
    },
    {
      label: "Property View",
      value: propertyViews,
      iconSrc: "/icon/status/property-view.svg",
    },
    {
      label: "Site Visits",
      value: siteVisits,
      iconSrc: "/icon/status/site-visits.svg",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 font-jakarta">
      {stats.map((item, idx) => (
        <div
          key={idx}
          className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-4.5 shadow-2xs hover:shadow-xs transition-shadow flex items-center gap-3.5"
        >
          {/* Circular Badge Icon matching Figma 1:1 */}
          <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 overflow-hidden relative">
            <Image
              src={item.iconSrc}
              alt={item.label}
              width={48}
              height={48}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="min-w-0">
            <h3 className="text-[22px] sm:text-[24px] font-bold text-[#0B132B] leading-none tracking-tight">
              {item.value}
            </h3>
            <p className="text-[12px] sm:text-[13px] font-medium text-slate-500 mt-1.5 truncate">
              {item.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

