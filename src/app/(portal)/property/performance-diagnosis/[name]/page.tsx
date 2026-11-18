"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Eye,
  MapPin,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Layers,
  FileText,
  Radio,
  IndianRupee,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const ACTIVITIES_DATA = [
  { month: "JAN", views: 8, visits: 13 },
  { month: "FEB", views: 12, visits: 15 },
  { month: "MAR", views: 22, visits: 14 },
  { month: "APR", views: 28, visits: 11 },
  { month: "MAY", views: 22, visits: 11 },
  { month: "JUN", views: 12, visits: 15 },
  { month: "JUL", views: 18, visits: 18 }, // Highlight point in Figma
  { month: "AUG", views: 11, visits: 14 },
  { month: "SEP", views: 17, visits: 13 },
  { month: "OCT", views: 9, visits: 16 },
  { month: "NOV", views: 14, visits: 18 },
  { month: "DEC", views: 5, visits: 14 },
];

const FUNNEL_STEPS = [
  {
    count: "1,240",
    label: "Property Views",
    pct: "100%",
    color: "#B6D4FD",
    leftTop: 0,
    leftBottom: 3.8,
    rightTop: 77.0,
    rightBottom: 71.0,
  },
  {
    count: "128",
    label: "Enquiries",
    pct: "10.3%",
    color: "#B6FDE4",
    leftTop: 4.0,
    leftBottom: 7.8,
    rightTop: 68.0,
    rightBottom: 62.0,
  },
  {
    count: "20",
    label: "Site visits",
    pct: "1.3%",
    color: "#FDDBEE",
    leftTop: 8.0,
    leftBottom: 11.8,
    rightTop: 59.0,
    rightBottom: 53.0,
  },
  {
    count: "2",
    label: "Booking",
    pct: "0.13%",
    color: "#E5DAFE",
    leftTop: 12.0,
    leftBottom: 15.8,
    rightTop: 50.0,
    rightBottom: 44.0,
  },
];

export default function PortalPerformanceDiagnosis() {
  const [selectedYear, setSelectedYear] = useState("Year");
  const params = useParams<{ name: string }>();
  const rawName = typeof params?.name === "string" ? decodeURIComponent(params.name) : "";
  const propertyName =
    !rawName || rawName.toLowerCase() === "property"
      ? "The terraces at max estate 361"
      : rawName;
  const encodedName = encodeURIComponent(propertyName);

  return (
    <div className="space-y-6 font-jakarta pb-12 antialiased">
      {/* 1. Header with Breadcrumb & Health Score link */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-normal">
          <Link
            href="/property"
            className="hover:text-[#1865F2] cursor-pointer transition-colors"
          >
            Properties
          </Link>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="text-slate-600 font-medium capitalize truncate">
            {propertyName}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-0.5">
          <div>
            <h1 className="text-[22px] sm:text-[24px] font-bold text-[#0B132B] tracking-tight">
              Properties Performance Diagnosis
            </h1>
            <p className="text-xs sm:text-[13px] text-slate-500 font-normal mt-0.5">
              Understand how your property is performing, identify bottlenecks and get ai- powered suggestions to improve results.
            </p>
          </div>

          <Link
            href={`/property/health-score/${encodedName}`}
            className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#1865F2] text-xs font-bold transition-colors cursor-pointer self-start sm:self-auto shrink-0 flex items-center gap-1.5 shadow-2xs"
          >
            <span>View Health Score</span>
            <ChevronRight size={13} />
          </Link>
        </div>
      </div>

      {/* 2. 5 Top KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* Card 1: Views */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#EAF2FF] flex items-center justify-center shrink-0 text-[#1865F2]">
            <Eye size={18} />
          </div>
          <div>
            <span className="text-lg font-bold text-[#0B132B] block leading-tight">
              1,240
            </span>
            <span className="text-[11px] font-medium text-slate-400">Views</span>
          </div>
        </div>

        {/* Card 2: Enquires */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#F3E8FF] flex items-center justify-center shrink-0">
            <span className="w-4 h-4 rounded-full border-2 border-[#8B5CF6] text-[#8B5CF6] flex items-center justify-center text-[10px] font-bold leading-none">
              i
            </span>
          </div>
          <div>
            <span className="text-lg font-bold text-[#0B132B] block leading-tight">
              128
            </span>
            <span className="text-[11px] font-medium text-slate-400">Enquires</span>
          </div>
        </div>

        {/* Card 3: Site Visits */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#FFEDD5] flex items-center justify-center shrink-0 text-[#EA580C]">
            <MapPin size={17} />
          </div>
          <div>
            <span className="text-lg font-bold text-[#0B132B] block leading-tight">
              20
            </span>
            <span className="text-[11px] font-medium text-slate-400">Site Visits</span>
          </div>
        </div>

        {/* Card 4: Booking */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#DCFCE7] flex items-center justify-center shrink-0 text-[#16A34A]">
            <CheckCircle size={17} />
          </div>
          <div>
            <span className="text-lg font-bold text-[#0B132B] block leading-tight">
              20
            </span>
            <span className="text-[11px] font-medium text-slate-400">Booking</span>
          </div>
        </div>

        {/* Card 5: Avg. enquiry */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-2xs flex items-center gap-3 col-span-2 sm:col-span-1">
          <div className="w-10 h-10 rounded-full bg-[#1865F2] text-white flex items-center justify-center text-[10px] font-black shrink-0 tracking-tight">
            AVG
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-[#0B132B] leading-tight">20</span>
              <span className="text-[10px] font-normal text-slate-400">per/day</span>
            </div>
            <span className="text-[11px] font-medium text-slate-400">Avg. enquiry</span>
          </div>
        </div>
      </div>

      {/* 3. Middle Section: Conversion Funnel (Left) + Activities Spline Chart (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Conversion Funnel & Alert (Span 5) */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          {/* Funnel Card */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-2xs space-y-4">
            <div>
              <h3 className="text-[20px] font-bold text-[#0B132B] tracking-tight">
                Conversion Funnel
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5">
                See where buyers drop off and what’s limiting your conversions.
              </p>
            </div>

            {/* Funnel Rows with exact slanted trapezoid clip-path matching screenshot */}
            <div className="space-y-3 pt-2">
              {FUNNEL_STEPS.map((step, idx) => (
                <div
                  key={idx}
                  className="relative w-full h-[50px] flex items-center select-none"
                >
                  {/* Base Track in Soft Ice Blue (#F0F6FE) */}
                  <div
                    className="absolute inset-0 bg-[#F0F6FE] rounded-r-md"
                    style={{
                      clipPath: `polygon(${step.leftTop}% 0%, 100% 0%, 100% 100%, ${step.leftBottom}% 100%)`,
                    }}
                  />

                  {/* Colored Funnel Trapezoid */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundColor: step.color,
                      clipPath: `polygon(${step.leftTop}% 0%, ${step.rightTop}% 0%, ${step.rightBottom}% 100%, ${step.leftBottom}% 100%)`,
                    }}
                  />

                  {/* Left Metric Text */}
                  <div
                    className="relative z-10 flex flex-col justify-center"
                    style={{
                      paddingLeft: `calc(${step.leftTop}% + 18px)`,
                    }}
                  >
                    <span className="font-bold text-[14px] sm:text-[15px] text-[#0B132B] leading-none">
                      {step.count}
                    </span>
                    <span className="text-[11px] text-slate-700 font-medium mt-0.5">
                      {step.label}
                    </span>
                  </div>

                  {/* Right Percentage Text */}
                  <div
                    className="absolute right-0 top-0 bottom-0 z-10 flex items-center justify-center font-semibold text-xs sm:text-[13px] text-[#0B132B]"
                    style={{
                      width: `calc(100% - ${step.rightBottom}%)`,
                    }}
                  >
                    {step.pct}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alert Card: High views, low enquiries */}
          <div className="rounded-2xl bg-[#FFF0F2] p-4.5 sm:p-5 flex items-center gap-4 shadow-2xs">
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#FFE0E4] flex items-center justify-center shrink-0">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2.5L1.5 21H22.5L12 2.5Z"
                  fill="#FF002E"
                  stroke="#FF002E"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 9V14"
                  stroke="white"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="17.5" r="1.2" fill="white" />
              </svg>
            </div>
            <div>
              <h4 className="text-[16px] sm:text-[17px] font-bold text-[#FF002E] tracking-tight leading-tight">
                High views, low enquiries
              </h4>
              <p className="text-[12.5px] sm:text-[13px] text-slate-800 font-normal leading-snug mt-1">
                Your property is getting good visibility, but fewer buyers are enquiring compared to similar listings.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Activities Spline Chart (Span 7) */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="text-[18px] font-bold text-[#0B132B]">Activities</h3>

            <div className="flex items-center gap-4">
              {/* Legends */}
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-slate-500 font-medium text-[11px]">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#7DD3FC]" />
                  Property views
                </span>
                <span className="flex items-center gap-1.5 text-slate-500 font-medium text-[11px]">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#FBCFE8]" />
                  Site visits
                </span>
              </div>

              {/* Year Dropdown Pill */}
              <div className="relative">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="appearance-none h-7 pl-2.5 pr-6 rounded-lg border border-slate-200 text-xs text-slate-600 bg-white focus:outline-none cursor-pointer"
                >
                  <option>Year</option>
                  <option>2026</option>
                  <option>2025</option>
                </select>
                <ChevronDown
                  size={12}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* Recharts Area Chart */}
          <div className="h-64 sm:h-72 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={ACTIVITIES_DATA}
                margin={{ top: 15, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7DD3FC" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#7DD3FC" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="visitsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F472B6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#F472B6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#94A3B8" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#94A3B8" }}
                  ticks={[0, 5, 10, 15, 20, 25, 30]}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#0B132B] text-white px-2.5 py-1 rounded-full text-[11px] font-bold shadow-md">
                          {payload[0].value}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="#7DD3FC"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#viewsGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="visits"
                  stroke="#F472B6"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#visitsGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 4. Bottom Section: Key Issues Identified */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-[#0B132B]">
          Key Issues identified
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Issue 1: Photos */}
          <div className="p-4 rounded-xl border border-slate-200/80 bg-white shadow-2xs space-y-2 hover:border-slate-300 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-[#EFF6FF] text-[#1865F2] flex items-center justify-center">
              <Radio size={18} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#0B132B]">
                Photos are underperforming
              </h4>
              <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                Listing with 10+ high-quality photos get 2.3x more enquiries.
              </p>
            </div>
          </div>

          {/* Issue 2: Floor plan */}
          <div className="p-4 rounded-xl border border-slate-200/80 bg-white shadow-2xs space-y-2 hover:border-slate-300 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-[#EFF6FF] text-[#1865F2] flex items-center justify-center">
              <Layers size={18} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#0B132B]">
                No floor plan added
              </h4>
              <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                Floor plans increase enquiries by 42%.
              </p>
            </div>
          </div>

          {/* Issue 3: Description */}
          <div className="p-4 rounded-xl border border-slate-200/80 bg-white shadow-2xs space-y-2 hover:border-slate-300 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-[#EFF6FF] text-[#1865F2] flex items-center justify-center">
              <FileText size={18} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#0B132B]">
                Description is short
              </h4>
              <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                Top performing listings have 150+ word descriptions.
              </p>
            </div>
          </div>

          {/* Issue 4: Price */}
          <div className="p-4 rounded-xl border border-slate-200/80 bg-white shadow-2xs space-y-2 hover:border-slate-300 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-[#EFF6FF] text-[#1865F2] flex items-center justify-center">
              <IndianRupee size={17} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#0B132B]">
                Price is 8% higher than similar listings
              </h4>
              <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                Similar 3 bhk properties in sector 124.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
