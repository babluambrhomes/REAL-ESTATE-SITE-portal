"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronRight,
  Eye,
} from "lucide-react";
import toast from "react-hot-toast";

export default function PortalHealthScore() {
  const router = useRouter();
  const [timeFilter, setTimeFilter] = useState("Last 7 days");
  const params = useParams<{ name: string }>();

  // Extract property name with Figma default fallback
  const rawName = typeof params?.name === "string" ? decodeURIComponent(params.name) : "";
  const propertyName =
    !rawName || rawName.toLowerCase() === "property"
      ? "The terraces at max estate 361"
      : rawName;

  const handleActionClick = (actionName: string) => {
    toast.success(`Opening ${actionName} section...`);
    router.push("/property/add-new");
  };

  return (
    <div className="space-y-6 font-jakarta pb-12 antialiased">
      {/* 1. Breadcrumb & Page Header */}
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
              Properties health score
            </h1>
            <p className="text-xs sm:text-[13px] text-slate-500 font-normal mt-0.5">
              See how your listing is performing and what you can do to get more views, leads and enquiries.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <Link
              href={`/property/performance-diagnosis/${encodeURIComponent(propertyName)}`}
              className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#1865F2] text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              <span>Performance Diagnosis</span>
              <ChevronRight size={13} />
            </Link>

            {/* Filter Dropdown Pill with Figma calendar icon */}
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200/90 bg-white text-xs font-semibold text-slate-700 shadow-2xs hover:border-slate-300 transition-colors">
              <svg
                width="15"
                height="15"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <rect x="1.5" y="2.5" width="13" height="12" rx="2" stroke="#64748B" strokeWidth="1.3" />
                <path d="M1.5 6H14.5" stroke="#64748B" strokeWidth="1.3" />
                <path d="M4.5 1V3.5" stroke="#64748B" strokeWidth="1.3" strokeLinecap="round" />
                <path d="M11.5 1V3.5" stroke="#64748B" strokeWidth="1.3" strokeLinecap="round" />
                <rect x="4" y="8" width="2" height="2" rx="0.5" fill="#10B981" />
                <rect x="7" y="8" width="2" height="2" rx="0.5" fill="#10B981" />
                <rect x="10" y="8" width="2" height="2" rx="0.5" fill="#10B981" />
                <rect x="4" y="11" width="2" height="2" rx="0.5" fill="#10B981" />
                <rect x="7" y="11" width="2" height="2" rx="0.5" fill="#10B981" />
              </svg>
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer pr-1 text-slate-700"
              >
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 3 months</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Top Row: Property Summary Card + Buyer Ready Score (Figma 1:1) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Card: Property Overview (Span 7) */}
        <div className="lg:col-span-7 rounded-xl border border-slate-200/80 bg-white p-5 shadow-2xs flex flex-col md:flex-row gap-5">
          {/* Property Image with Badge & Bottom View Button */}
          <div className="relative w-full md:w-56 h-48 md:h-auto min-h-[190px] rounded-xl overflow-hidden shrink-0 border border-slate-100">
            <Image
              src="/images/properties/tower-popular-figma.jpg"
              alt="The Terraces At Max Estate 361"
              fill
              className="object-cover"
              priority
            />
            {/* On Going Green Badge */}
            <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#E6F7ED] text-[#00A35C] text-[11px] font-semibold shadow-2xs">
              On Going
            </span>
            {/* View on portal white button */}
            <button
              type="button"
              onClick={() => {
                toast.success("Opening listing view on portal...");
                router.push("/property");
              }}
              className="absolute bottom-2.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/95 hover:bg-white text-slate-800 text-[11px] font-semibold flex items-center justify-center gap-1.5 shadow-md backdrop-blur-xs transition-colors cursor-pointer whitespace-nowrap"
            >
              <Eye size={13} className="text-slate-700" />
              <span>View on portal</span>
            </button>
          </div>

          {/* Details & Specs */}
          <div className="flex-1 space-y-2.5 min-w-0">
            <div>
              <h3 className="text-[17px] font-bold text-[#0B132B] truncate capitalize">
                The Terraces At Max Estate 361
              </h3>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                <Image
                  src="/icon/health-score/icon (3).png"
                  alt="Location"
                  width={11}
                  height={14}
                  className="object-contain shrink-0"
                />
                <span className="truncate">3 BHK . Apartment . Sector 124, Noida</span>
              </p>
            </div>

            {/* 6 Specs Grid matching Figma */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-1 text-xs">
              {/* 1. Starting Price */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                  <Image
                    src="/icon/health-score/Group (6).png"
                    alt="Starting Price"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <span className="font-bold text-slate-800 block text-[13px] leading-tight truncate">
                    ₹ 1.2 Cr
                  </span>
                  <span className="text-[11px] text-slate-400 font-normal">Starting Price</span>
                </div>
              </div>

              {/* 2. Area */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                  <Image
                    src="/icon/health-score/Group 1686560439.png"
                    alt="Area"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <span className="font-bold text-slate-800 block text-[13px] leading-tight truncate">
                    3,200-4,500 Sq. Ft
                  </span>
                  <span className="text-[11px] text-slate-400 font-normal">Area</span>
                </div>
              </div>

              {/* 3. Status */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                  <Image
                    src="/icon/health-score/Frame 1984078297.png"
                    alt="Status"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <span className="font-bold text-slate-800 block text-[13px] leading-tight truncate">
                    Ready to move
                  </span>
                  <span className="text-[11px] text-slate-400 font-normal">Status</span>
                </div>
              </div>

              {/* 4. Floor number */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                  <Image
                    src="/icon/health-score/Frame 1984078300.png"
                    alt="Floor number"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <span className="font-bold text-slate-800 block text-[13px] leading-tight truncate">
                    2 floors
                  </span>
                  <span className="text-[11px] text-slate-400 font-normal">Floor number</span>
                </div>
              </div>

              {/* 5. Configuration */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                  <Image
                    src="/icon/health-score/Frame 1984078300 (1).png"
                    alt="Configuration"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <span className="font-bold text-slate-800 block text-[13px] leading-tight truncate">
                    3 BHK
                  </span>
                  <span className="text-[11px] text-slate-400 font-normal">Configuration</span>
                </div>
              </div>

              {/* 6. Verified */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                  <Image
                    src="/icon/health-score/Frame 1984078297 (1).png"
                    alt="Verified"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <span className="font-bold text-slate-800 block text-[13px] leading-tight truncate">
                    Rera approved
                  </span>
                  <span className="text-[11px] text-slate-400 font-normal">Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Buyer Ready Score (Span 5) */}
        <div className="lg:col-span-5 rounded-xl border border-slate-200/80 bg-white p-5 shadow-2xs space-y-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h4 className="text-[15px] font-bold text-[#0B132B]">Buyer Ready Score</h4>
            <span className="text-[11px] text-slate-400 flex items-center gap-1.5 font-normal">
              Last Updated 2 Hours Ago
              <span className="w-3.5 h-3.5 rounded-full border border-slate-300 inline-block shrink-0" />
            </span>
          </div>

          <div className="flex items-center gap-5 py-1">
            {/* Circular Gauge 82% using high-res Figma Ethereum balance frame */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 flex items-center justify-center">
              <Image
                src="/icon/health-score/Ethereum balance.png"
                alt="Buyer Ready Score 82%"
                width={124}
                height={124}
                className="object-contain"
                priority
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[26px] font-black text-[#0B132B] tracking-tight leading-none">
                  82%
                </span>
                <span className="text-[10px] text-slate-500 font-medium mt-1">
                  Buyer Ready
                </span>
              </div>
            </div>

            {/* Checklist (7 items exactly as in Figma) */}
            <div className="space-y-1.5 text-xs text-slate-700 flex-1 pl-1">
              {/* 1. Basic */}
              <div className="flex items-center gap-2">
                <Image
                  src="/icon/health-score/Group 1686560450.png"
                  alt="Completed"
                  width={15}
                  height={15}
                  className="object-contain shrink-0"
                />
                <span className="font-medium text-slate-800 text-[11.5px]">Basic</span>
              </div>

              {/* 2. Location */}
              <div className="flex items-center gap-2">
                <Image
                  src="/icon/health-score/Group 1686560450.png"
                  alt="Completed"
                  width={15}
                  height={15}
                  className="object-contain shrink-0"
                />
                <span className="font-medium text-slate-800 text-[11.5px]">Location</span>
              </div>

              {/* 3. Details (Recommended) */}
              <div className="flex items-center gap-2">
                <div className="w-[15px] h-[15px] rounded-full bg-[#F59E0B] text-white flex items-center justify-center text-[9px] font-black shrink-0 leading-none">
                  !
                </div>
                <span className="font-medium text-slate-800 text-[11.5px]">
                  Details (Recommended)
                </span>
              </div>

              {/* 4. Price (Recommended) */}
              <div className="flex items-center gap-2 text-slate-400">
                <div className="w-[15px] h-[15px] rounded-full border border-slate-300 shrink-0" />
                <span className="text-[11.5px] font-normal">Price (Recommended)</span>
              </div>

              {/* 5. Amenities (Recommended) */}
              <div className="flex items-center gap-2 text-slate-400">
                <div className="w-[15px] h-[15px] rounded-full border border-slate-300 shrink-0" />
                <span className="text-[11.5px] font-normal">Amenities (Recommended)</span>
              </div>

              {/* 6. Media (Recommended) */}
              <div className="flex items-center gap-2 text-slate-400">
                <div className="w-[15px] h-[15px] rounded-full border border-slate-300 shrink-0" />
                <span className="text-[11.5px] font-normal">Media (Recommended)</span>
              </div>

              {/* 7. Preview (recommended) */}
              <div className="flex items-center gap-2 text-slate-400">
                <div className="w-[15px] h-[15px] rounded-full border border-slate-300 shrink-0" />
                <span className="text-[11.5px] font-normal">Preview (recommended)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Middle Section: Section Wise Completion (Figma 1:1) */}
      <div className="rounded-xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-[#0B132B]">
              Section Wise Completion
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Complete All Sections To Get Maximum Visibility And Better Leads.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-600">
              3 out of 16 completed
            </span>
            <div className="w-32 h-2 rounded-full bg-slate-100 overflow-hidden">
              <div className="w-[70%] h-full bg-[#1865F2] rounded-full" />
            </div>
            <span className="text-xs font-bold text-[#0B132B]">70%</span>
          </div>
        </div>

        {/* 6 Section Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
          {[
            {
              id: "basic",
              title: "Basic Details",
              pct: 100,
              completed: true,
              action: "READD",
              icon: "/icon/health-score/Group 1686560444 (1).png",
            },
            {
              id: "details",
              title: "Details",
              pct: 100,
              completed: true,
              action: "READD",
              icon: "/icon/health-score/Group 1686560445.png",
            },
            {
              id: "amenities",
              title: "Amenities",
              pct: 100,
              completed: true,
              action: "READD",
              icon: "/icon/health-score/Group 1686560446.png",
            },
            {
              id: "location",
              title: "Location",
              pct: 0,
              completed: false,
              action: "ADD",
              icon: "/icon/health-score/Group 1686560447.png",
            },
            {
              id: "price",
              title: "Price",
              pct: 0,
              completed: false,
              action: "ADD",
              icon: "/icon/health-score/Group 1686560448.png",
            },
            {
              id: "media",
              title: "Media",
              pct: 0,
              completed: false,
              action: "ADD",
              icon: "/icon/health-score/Group 1686560449.png",
            },
          ].map((sec) => (
            <div
              key={sec.id}
              className="p-3.5 sm:p-4 rounded-xl border border-slate-200/80 bg-white flex items-center justify-between gap-3 shadow-2xs hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="relative w-10 h-10 shrink-0">
                  <Image
                    src={sec.icon}
                    alt={sec.title}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0 pr-1">
                  <div className="flex items-center justify-between mb-1.5">
                    <h5 className="text-[13px] font-bold text-[#0B132B] truncate">
                      {sec.title}
                    </h5>
                    <span
                      className={`text-[11px] font-bold ${
                        sec.completed ? "text-[#00C49F]" : "text-[#EF4444]"
                      }`}
                    >
                      {sec.pct}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        sec.completed ? "bg-[#00C49F]" : "bg-transparent"
                      }`}
                      style={{ width: `${sec.pct}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Vertical Action Button using Figma add_circle icon */}
              <button
                type="button"
                onClick={() => handleActionClick(sec.title)}
                className="flex flex-col items-center justify-center shrink-0 cursor-pointer text-slate-600 hover:text-[#1865F2] transition-colors pl-2 group"
                title={`${sec.action} ${sec.title}`}
              >
                <Image
                  src="/icon/health-score/add_circle.png"
                  alt="Add"
                  width={18}
                  height={18}
                  className="object-contain mb-0.5 group-hover:scale-110 transition-transform"
                />
                <span className="text-[10px] font-semibold tracking-tight text-slate-600 group-hover:text-[#1865F2]">
                  {sec.action}
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Bottom Row: Benefits + Recommendations (Figma 1:1) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Benefits Of A Higher Health Score (Span 6) */}
        <div className="lg:col-span-6 rounded-xl border border-[#A7F3D0]/60 bg-[#E7F6EF] p-5 sm:p-6 shadow-2xs relative overflow-hidden flex flex-col justify-between min-h-[220px]">
          <div>
            <h4 className="text-base font-bold text-[#0B132B]">
              Benefits Of A Higher Health Score
            </h4>

            <div className="space-y-3.5 pt-4">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#D1FAE5] flex items-center justify-center shrink-0 mt-0.5">
                  <Image
                    src="/icon/health-score/Group (7).png"
                    alt="More Visibility"
                    width={18}
                    height={18}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-[#0B132B]">More Visibility</h5>
                  <p className="text-[11px] text-slate-600">Appear Higher In Search Results</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#D1FAE5] flex items-center justify-center shrink-0 mt-0.5">
                  <Image
                    src="/icon/health-score/Frame (1).png"
                    alt="Better Leads"
                    width={18}
                    height={18}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-[#0B132B]">Better Leads</h5>
                  <p className="text-[11px] text-slate-600">Get Genuine And Serious Enquiries</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#D1FAE5] flex items-center justify-center shrink-0 mt-0.5">
                  <Image
                    src="/icon/health-score/Frame (2).png"
                    alt="Fast Deals"
                    width={18}
                    height={18}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-[#0B132B]">Fast Deals</h5>
                  <p className="text-[11px] text-slate-600">Well Optimised Properties Sell/Rent Quicker</p>
                </div>
              </div>
            </div>
          </div>

          {/* Exact building with green growth arrow illustration from Figma */}
          <div className="absolute right-3 sm:right-5 bottom-2 sm:bottom-3 w-36 sm:w-44 h-32 sm:h-36 shrink-0 pointer-events-none">
            <Image
              src="/icon/health-score/Group 1686560453.png"
              alt="Growth"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Right: Recommendation to improve your score (Span 6) */}
        <div className="lg:col-span-6 rounded-xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-2xs space-y-3">
          <h4 className="text-base font-bold text-[#0B132B]">
            Recommendation to improve your score
          </h4>

          <div className="space-y-2.5">
            {[
              {
                id: "photo",
                icon: "/icon/health-score/Frame (5).png",
                title: "Add high quality interior photo",
                desc: "Properties with 15+ photos get 2x more views.",
                btn: "Add photo",
                pct: "+15%",
                badgeColor: "bg-[#FFF3F5] text-[#FF4D6D] border-[#FFE0E6]",
              },
              {
                id: "price",
                icon: "/icon/health-score/Frame (3).png",
                title: "Update price and availability",
                desc: "Keep your pricing updated to attract serious buyers.",
                btn: "Add photo",
                pct: "+10%",
                badgeColor: "bg-[#FFFBEB] text-[#F59E0B] border-[#FEF3C7]",
              },
              {
                id: "floor",
                icon: "/icon/health-score/floor-plan-svgrepo-com 1.png",
                title: "Upload floor plan",
                desc: "Floor plans help buyers understand the space better.",
                btn: "Add photo",
                pct: "+5%",
                badgeColor: "bg-[#FFF1F2] text-[#F43F5E] border-[#FFE4E6]",
              },
            ].map((rec) => (
              <div
                key={rec.id}
                className="p-3 rounded-xl border border-slate-200/80 bg-white flex items-center justify-between gap-3 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#FFF7ED] flex items-center justify-center shrink-0 p-1.5">
                    <Image
                      src={rec.icon}
                      alt={rec.title}
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-[#0B132B] truncate">
                      {rec.title}
                    </h5>
                    <p className="text-[11px] text-slate-500 truncate">
                      {rec.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleActionClick(rec.title)}
                    className="px-3 py-1.5 rounded-lg border border-[#2563EB] hover:bg-blue-50 text-[#2563EB] text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {rec.btn}
                  </button>
                  <span
                    className={`px-2 py-0.5 rounded-md border text-[11px] font-bold ${rec.badgeColor}`}
                  >
                    {rec.pct}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
