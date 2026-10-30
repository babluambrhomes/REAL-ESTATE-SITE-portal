"use client";

import { Award, Sparkles, TrendingUp } from "lucide-react";

export default function PortalInsightsView ()  {
  return (
    <div className="space-y-6 font-jakarta">
      <div>
        <h2 className="text-[22px] font-bold text-[#0B132B]">
          Market Intelligence & Competitor Insights
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Real-time pricing benchmarking against surrounding projects in Noida & NCR
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl border border-slate-200/80 bg-white shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#EAF2FF] text-[#1865F2] flex items-center justify-center">
            <TrendingUp size={20} />
          </div>
          <h4 className="text-base font-bold text-[#0B132B]">Price Positioning Index</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Your listings in Sector 124 are priced <strong>4.8% lower than median</strong>, driving 2.3x higher inquiry volumes than adjacent developer inventories.
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200/80 bg-white shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Award size={20} />
          </div>
          <h4 className="text-base font-bold text-[#0B132B]">Listing Quality Score</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Your average listing completeness score is <strong>92/100</strong>. Listings with verified floor plans & virtual walkthroughs close 18 days faster.
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200/80 bg-white shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Sparkles size={20} />
          </div>
          <h4 className="text-base font-bold text-[#0B132B]">AI Recommended Action</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Add 2 more interior photos to <strong>The Terraces At Max</strong> to unlock Top 1% Boost Badge in Sunday buyer search queries.
          </p>
        </div>
      </div>
    </div>
  );
};
