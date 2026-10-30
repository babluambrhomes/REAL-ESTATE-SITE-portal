"use client";

export default function PortalAudience() {
  return (
    <div className="space-y-6 font-jakarta">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-[22px] font-bold text-[#0B132B]">
            Audience & Buyer Demographics
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time profile intelligence of high-intent buyers browsing your listings
          </p>
        </div>
        <span className="self-start sm:self-auto px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#EAF2FF] text-[#1865F2]">
          Active Active Audience: 14.8K Buyers
        </span>
      </div>

      {/* Demographic Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "HNIs & Corporate Executives", val: "64%", sub: "Avg Annual Income > ₹45L", color: "text-[#1865F2]" },
          { label: "Pre-Approved Loan Buyers", val: "78%", sub: "SBI, HDFC & ICICI verified", color: "text-emerald-600" },
          { label: "First Time Home Buyers", val: "32%", sub: "Looking for 2 & 3 BHK", color: "text-amber-600" },
          { label: "NRI Investors", val: "18%", sub: "Gulf & North America based", color: "text-purple-600" },
        ].map((item, idx) => (
          <div key={idx} className="p-4 rounded-2xl border border-slate-200/80 bg-white shadow-2xs">
            <span className="text-xs text-slate-400 font-medium">{item.label}</span>
            <div className={`text-2xl font-black ${item.color} mt-1.5`}>{item.val}</div>
            <p className="text-[11px] text-slate-500 mt-1">{item.sub}</p>
          </div>
        ))}
      </div>

      {/* Buyer Preference Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="p-5 rounded-2xl border border-slate-200/80 bg-white shadow-2xs space-y-4">
          <h3 className="text-base font-bold text-[#0B132B]">Top Preferred Micro-Markets</h3>
          <div className="space-y-3">
            {[
              { name: "Sector 150 Noida (Sports City)", pct: 42, count: "6,210 inquiries" },
              { name: "Sector 128 / 124 (Noida Expressway)", pct: 28, count: "4,140 inquiries" },
              { name: "Greater Noida West (Noida Ext)", pct: 18, count: "2,660 inquiries" },
              { name: "Golf Course Extension (Gurgaon)", pct: 12, count: "1,770 inquiries" },
            ].map((loc, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">{loc.name}</span>
                  <span className="text-slate-500">{loc.count} ({loc.pct}%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-[#1865F2] rounded-full" style={{ width: `${loc.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200/80 bg-white shadow-2xs space-y-4">
          <h3 className="text-base font-bold text-[#0B132B]">Buyer Budget Distribution</h3>
          <div className="space-y-3">
            {[
              { budget: "₹ 1.0 Cr - 1.5 Cr", pct: 45, tag: "Highest Volume" },
              { budget: "₹ 1.5 Cr - 2.5 Cr", pct: 32, tag: "Mid-Luxury" },
              { budget: "₹ 2.5 Cr - 5.0 Cr", pct: 16, tag: "High Demand" },
              { budget: "Above ₹ 5.0 Cr", pct: 7, tag: "Ultra Luxury" },
            ].map((b, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <h4 className="text-xs font-bold text-[#0B132B]">{b.budget}</h4>
                  <span className="text-[11px] text-slate-400">{b.tag}</span>
                </div>
                <span className="text-xs font-black text-[#1865F2]">{b.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
