"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Bell,
  MessageSquare,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Calendar,
  X,
  UserCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import toast from "react-hot-toast";
import { WorkspaceSwitcher } from "./WorkspaceSwitcher";
import { useDashboardSummary } from "@/lib/features/dashboard/useDashboardSummary";
import { usePermissions } from "@/lib/auth/usePermissions";

interface PortalHeaderProps {
  onSearch?: (query: string) => void;
}

const NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "New Lead Inquiry",
    desc: "Rohit Malhotra submitted an inquiry for 3 BHK Apartment",
    time: "10 mins ago",
    unread: true,
  },
  {
    id: "notif-2",
    title: "Site Visit Confirmed",
    desc: "Rahul Sharma confirmed site visit for Today 4:00 PM",
    time: "45 mins ago",
    unread: true,
  },
  {
    id: "notif-3",
    title: "Draft Saved",
    desc: "Your property draft for The Terraces was automatically backed up",
    time: "2 hours ago",
    unread: false,
  },
];

const MESSAGES = [
  {
    id: "msg-1",
    sender: "Rohit Malhotra",
    text: "Is the price negotiable for the Sector 124 unit?",
    time: "12m",
  },
  {
    id: "msg-2",
    sender: "Pooja Verma",
    text: "Can we schedule a call tomorrow morning?",
    time: "1h",
  },
];

export const PortalHeader = ({ onSearch }: PortalHeaderProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const [searchVal, setSearchVal] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const { data: dashboardSummary, isLoading: isSummaryLoading } = useDashboardSummary();
  const { can, canAny } = usePermissions();
  const profilePercentage = dashboardSummary?.profile.percentage;

  const userName =
    [user?.person?.firstName, user?.person?.lastName].filter(Boolean).join(" ") ||
    user?.email ||
    ""; 

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(searchVal);
    else if (searchVal.trim()) {
      toast.success(`Filtering portal for "${searchVal}"`);
    }
  };

  console.log("user",user)

  return (
    <header className="w-full bg-transparent flex flex-col md:flex-row md:items-center justify-between gap-4 font-jakarta relative z-30">
      {/* Left: Greeting & Subtitle */}
      <div>
        <h1 className="text-[24px]  font-bold text-[#0B132B] tracking-tight">
          Hi, {userName}
        </h1>
        
      </div>

      {/* Right: Search, Chat, Notifications & Profile Completion */}
      <div className="flex  items-center gap-3 sm:gap-3.5 relative">
        <WorkspaceSwitcher />
        {/* Search Bar Input */}
        <form
          onSubmit={handleSearchSubmit}
          className="relative flex items-center bg-white border border-slate-200 rounded-full pl-4 pr-1 py-1 shadow-2xs focus-within:border-[#1865F2] transition-colors w-full sm:w-[260px] lg:w-[200px]"
        >
          <input
            type="text"
            placeholder="Search Anything..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="w-full text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none bg-transparent"
          />
          <button
            type="submit"
            className="w-8 h-8 rounded-full bg-[#1865F2] hover:bg-blue-700 text-white flex items-center justify-center shrink-0 transition-colors shadow-xs cursor-pointer p-1.5"
          >
            <Image
              src="/icon/dashboard/search-glass.svg"
              alt="Search"
              width={14}
              height={14}
              className="object-contain"
            />
          </button>
        </form>

        {/* Message / Chat Icon */}
        <div
          className={canAny(["buyerQuestion.read", "lead.read"]) ? "relative" : "hidden"}
        >
          <button
            type="button"
            onClick={() => {
              setShowMessages(!showMessages);
              setShowNotifications(false);
            }}
            className="w-9 h-9 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-[#1865F2] flex items-center justify-center transition-colors shadow-2xs relative cursor-pointer overflow-hidden p-1.5"
            title="Messages"
          >
            <Image
              src="/icon/dashboard/chat-bubble.svg"
              alt="Messages"
              width={20}
              height={20}
              className="object-contain"
            />
          </button>

          {/* Messages Dropdown */}
          {showMessages && (
            <div className="absolute right-0 top-full mt-2 w-72 rounded-xl border border-slate-200 bg-white p-3 shadow-xl z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-[#0B132B]">Buyer Messages</span>
                <span className="text-[10px] text-[#1865F2] font-semibold">2 New</span>
              </div>
              <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto">
                {MESSAGES.map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => {
                      setShowMessages(false);
                      router.push("/crm");
                    }}
                    className="py-2.5 px-1 hover:bg-slate-50 cursor-pointer rounded-lg transition-colors"
                  >
                    <div className="flex justify-between items-center text-xs">
                      <strong className="text-slate-800 font-semibold">{msg.sender}</strong>
                      <span className="text-[10px] text-slate-400">{msg.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{msg.text}</p>
                  </div>
                ))}
              </div>
              {/* <button
                type="button"
                onClick={() => {
                  setShowMessages(false);
                  router.push("/crm");
                }}
                className="w-full mt-2 py-1.5 text-center text-xs font-bold text-[#1865F2] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
              >
                Go to CRM Leads →
              </button> */}
            </div>
          )}
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowMessages(false);
            }}
            className="w-9 h-9 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-[#1865F2] flex items-center justify-center transition-colors shadow-2xs relative cursor-pointer overflow-hidden p-1.5"
            title="Notifications"
          >
            <Image
              src="/icon/dashboard/bell-badge.svg"
              alt="Notifications"
              width={20}
              height={20}
              className="object-contain"
            />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#1865F2] rounded-full" />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-slate-200 bg-white p-3.5 shadow-xl z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-[#0B132B]">Recent Alerts</span>
                <button
                  type="button"
                  onClick={() => toast.success("All notifications marked as read")}
                  className="text-[10.5px] text-[#1865F2] font-semibold hover:underline cursor-pointer"
                >
                  Mark all read
                </button>
              </div>
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {NOTIFICATIONS.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      setShowNotifications(false);
                      if (n.id === "notif-1") router.push("/crm");
                      if (n.id === "notif-2") router.push("/property");
                    }}
                    className={`py-2.5 px-1.5 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors ${
                      n.unread ? "bg-blue-50/40" : ""
                    }`}
                  >
                    <div className="flex justify-between items-center text-xs">
                      <strong className="text-slate-900 font-bold">{n.title}</strong>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Completion Card (Figma Exact 1:1) */}
        <div
          className={
            can("sellerProfile.read")
              ? "hidden lg:flex flex-col justify-center bg-white border border-slate-200 rounded-xl px-3.5 py-2 shadow-2xs min-w-[210px]"
              : "hidden"
          }
        >
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 mb-1">
            <span>Profile Completion</span>
            {isSummaryLoading && profilePercentage === undefined ? (
              <span className="h-3 w-8 animate-pulse rounded bg-slate-100" />
            ) : (
              <span className="text-[#0B132B]">{profilePercentage ?? 0}%</span>
            )}
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-1">
            <div
              className="h-full bg-[#1865F2] rounded-full transition-all duration-500"
              style={{
                width: `${Math.max(0, Math.min(100, profilePercentage ?? 0))}%`,
              }}
            />
          </div>

          <div className="flex items-center justify-between text-[9.5px]">
            <span className="text-slate-400 truncate max-w-[130px]">
              Complete Your Profile To Get More Leads.
            </span>
            <button
              type="button"
              onClick={() => router.push("/account")}
              className="text-[#1865F2] font-semibold hover:underline flex items-center gap-0.5 shrink-0 cursor-pointer"
            >
              <span>Complete Now</span>
              <ArrowRight size={10} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
