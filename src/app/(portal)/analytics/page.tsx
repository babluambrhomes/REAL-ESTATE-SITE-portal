"use client";

import { ArrowUpRight, Clock, Eye, MousePointerClick, Phone } from "lucide-react";

export default function PortalAnalyticsView()  {
  return (
    <div className="space-y-6 font-jakarta">
      <div>
        <h2 className="text-[22px] font-bold text-[#0B132B]">
          Performance & Traffic Analytics
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Detailed breakdown of impressions, clicks, inquiry conversions, and site visits
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Listing Impressions", val: "48.2K", change: "+24.5%", icon: Eye, color: "text-[#1865F2]" },
          { label: "Detailed Page Views", val: "12.4K", change: "+18.2%", icon: MousePointerClick, color: "text-emerald-600" },
          { label: "Direct Phone Inquiries", val: "418", change: "+32.1%", icon: Phone, color: "text-purple-600" },
          { label: "Avg Listing Time on Page", val: "3m 42s", change: "+12.0%", icon: Clock, color: "text-amber-600" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="p-4 rounded-2xl border border-slate-200/80 bg-white shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">{stat.label}</span>
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-600">
                  <Icon size={16} />
                </div>
              </div>
              <div className={`text-2xl font-black ${stat.color} mt-2`}>{stat.val}</div>
              <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600 mt-1">
                <ArrowUpRight size={13} />
                {stat.change} vs last month
              </span>
            </div>
          );
        })}
      </div>

      <div className="p-5 rounded-2xl border border-slate-200/80 bg-white shadow-2xs space-y-3">
        <h3 className="text-base font-bold text-[#0B132B]">Listing Conversion Funnel</h3>
        <div className="space-y-2.5">
          {[
            { step: "Listing Impression in Search Results", count: "48,200", pct: 100 },
            { step: "Opened Listing Detail Page", count: "12,400", pct: 25.7 },
            { step: "Clicked Call / WhatsApp / Brochure", count: "2,180", pct: 17.5 },
            { step: "Scheduled Physical Site Visit", count: "418", pct: 19.1 },
            { step: "Token Booking Completed", count: "38", pct: 9.1 },
          ].map((fn, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#1865F2] text-white text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="text-xs font-semibold text-slate-800">{fn.step}</span>
              </div>
              <div className="text-right">
                <strong className="text-xs font-bold text-[#0B132B]">{fn.count}</strong>
                <span className="text-[11px] text-slate-400 block">{fn.pct}% conversion</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
