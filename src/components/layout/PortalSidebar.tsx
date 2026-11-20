"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearAuth } from "@/store/slice/authSlice";

interface PortalSidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const SidebarIcon = ({
  src,
  className = "w-[18px] h-[18px]",
  alt = "",
}: {
  src: string;
  className?: string;
  alt?: string;
}) => (
  <span
    role="img"
    aria-label={alt}
    className={`inline-block shrink-0 bg-current transition-colors ${className}`}
    style={{
      maskImage: `url('${src}')`,
      WebkitMaskImage: `url('${src}')`,
      maskRepeat: "no-repeat",
      WebkitMaskRepeat: "no-repeat",
      maskPosition: "center",
      WebkitMaskPosition: "center",
      maskSize: "contain",
      WebkitMaskSize: "contain",
    }}
  />
);

export const PortalSidebar = ({
  collapsed,
  onToggleCollapse,
}: PortalSidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const crmTab = searchParams.get("tab") ?? "all";
  const isCrmList = pathname === "/crm";
  const isCrmDetail = pathname.startsWith("/crm/");
  const isCrmTab = (slug: string) => isCrmList && crmTab === slug;
  const isPropertiesSection =
    pathname.startsWith("/property") || pathname === "/projects";
  const isHealthScore = pathname.startsWith("/property/health-score");
  const isDiagnosis = pathname.startsWith("/property/performance-diagnosis");
  const isMyProperties =
    pathname === "/property" && !isHealthScore && !isDiagnosis;
  const isMyPost = pathname === "/property/add-new";
  const isDrafts = pathname === "/property/drafts";
  const isBoost = pathname === "/upgrade-plane";
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  // Accordion state for dropdowns
  const [propertiesOpen, setPropertiesOpen] = useState(!pathname.startsWith("/crm"));
  const [crmOpen, setCrmOpen] = useState(pathname.startsWith("/crm"));

  useEffect(() => {
    if (pathname.startsWith("/crm")) {
      setCrmOpen(true);
      setPropertiesOpen(false);
    } else if (pathname.startsWith("/property") || pathname === "/projects") {
      setPropertiesOpen(true);
      setCrmOpen(false);
    }
  }, [pathname]);

  const userName =
    [user?.person?.firstName, user?.person?.lastName].filter(Boolean).join(" ") ||
    user?.email ||
    "";

  const handleLogout = () => {
    dispatch(clearAuth());
    router.push("/login");
  };

  const navItemBase =
    "w-full flex items-center gap-3 rounded-xl text-[13px] transition-all cursor-pointer";
  const activeItem = "bg-white text-[#1865F2] font-bold";
  const idleItem =
    "text-white/80 font-medium hover:bg-white/10 hover:text-white";
  const subItemBase =
    "w-full text-left px-3 py-2 rounded-lg text-[12.5px] transition-colors flex items-center gap-2.5 cursor-pointer";
  const subActive = "bg-[#EAF2FF] text-[#1865F2] font-bold";
  const subIdle = "text-slate-700 font-medium hover:bg-slate-50 hover:text-[#1865F2]";

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 bg-[#1865F2] text-white flex flex-col transition-all duration-300 ease-in-out select-none border-r border-white/10 ${
        collapsed ? "w-[76px]" : "w-[240px]"
      }`}
    >
      {/* Brand + collapse toggle */}
      {collapsed ? (
        <div className="flex flex-col items-center gap-3 pt-4 pb-3">
          <button
            type="button"
            onClick={onToggleCollapse}
            className="w-9 h-9 rounded-xl hover:bg-white/10 text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Expand sidebar"
          >
            <SidebarIcon
              src="/icon/sidebar/toggle.svg"
              className="w-[18px] h-[18px]"
              alt="Toggle"
            />
          </button>
          <Link
            href="/"
            className="relative h-8 w-8 hover:opacity-90 transition-opacity flex items-center justify-center"
            title="Roofin"
          >
            <Image
              src="/icon/sidebar/roofin-logo-mark.svg"
              alt="Roofin"
              width={30}
              height={30}
              className="object-contain"
              priority
            />
          </Link>
        </div>
      ) : (
        <div className="flex items-center justify-between px-4 pt-4 pb-3">
          <Link
            href="/"
            className="relative h-8 w-[124px] hover:opacity-90 transition-opacity flex items-center"
            title="Roofin"
          >
            <Image
              src="/icon/sidebar/roofin-logo-full.svg"
              alt="Roofin"
              width={124}
              height={32}
              className="object-contain object-left"
              priority
            />
          </Link>
          <button
            type="button"
            onClick={onToggleCollapse}
            className="w-9 h-9 rounded-xl hover:bg-white/10 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Collapse sidebar"
          >
            <SidebarIcon
              src="/icon/sidebar/toggle.svg"
              className="w-[18px] h-[18px]"
              alt="Collapse"
            />
          </button>
        </div>
      )}

      {/* Navigation Menu List */}
      <div className="flex-1 min-h-0 overflow-y-auto px-3 py-2 space-y-1 no-scrollbar">
        
        {/* 1. Dashboard */}
        <div className="relative">
          <button
            type="button"
            onClick={() => router.push("/")}
            className={`${navItemBase} ${
              pathname === "/" ? activeItem : idleItem
            } ${collapsed ? "justify-center h-11 w-11 mx-auto px-0" : "px-3.5 py-2.5"}`}
            title="Dashboard"
          >
            <SidebarIcon
              src="/icon/sidebar/dashboard.svg"
              className="w-[18px] h-[18px]"
              alt="Dashboard"
            />
            {!collapsed && <span>Dashboard</span>}
          </button>
        </div>

        {/* 2. Properties */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setPropertiesOpen((prev) => !prev);
              setCrmOpen(false);
            }}
            className={`${navItemBase} justify-between ${
              propertiesOpen
                ? "bg-[#0A47BE] text-white font-bold shadow-inner"
                : isPropertiesSection
                ? activeItem
                : idleItem
            } ${collapsed ? "h-11 w-11 mx-auto px-0 justify-center" : "px-3.5 py-2.5"}`}
            title="Properties"
          >
            <div className="flex items-center gap-3">
              <SidebarIcon
                src="/icon/sidebar/properties.svg"
                className="w-[18px] h-[18px]"
                alt="Properties"
              />
              {!collapsed && <span>Properties</span>}
            </div>
            {!collapsed && (
              propertiesOpen ? (
                <ChevronDown size={15} className="text-current/70" />
              ) : (
                <ChevronRight size={15} className="text-current/70" />
              )
            )}
          </button>

          {/* Properties submenu matching Figma white card */}
          {!collapsed && propertiesOpen && (
            <div className="mt-1.5 p-1.5 rounded-xl bg-white shadow-sm space-y-1 text-slate-700">
              <button
                type="button"
                onClick={() => router.push("/property")}
                className={`${subItemBase} ${isMyProperties ? subActive : subIdle}`}
              >
                <SidebarIcon
                  src="/icon/sidebar/my-properties.svg"
                  className="w-[15px] h-[15px]"
                  alt="My Properties"
                />
                <span>My Properties</span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/property/add-new")}
                className={`${subItemBase} ${isMyPost ? subActive : subIdle}`}
              >
                <SidebarIcon
                  src="/icon/sidebar/my-post.svg"
                  className="w-[15px] h-[15px]"
                  alt="My Post"
                />
                <span>My Post</span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/projects")}
                className={`${subItemBase} ${
                  pathname === "/projects" ? subActive : subIdle
                }`}
              >
                <SidebarIcon
                  src="/icon/sidebar/my-projects.svg"
                  className="w-[15px] h-[15px]"
                  alt="My Projects"
                />
                <span>My Projects</span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/property/drafts")}
                className={`${subItemBase} ${isDrafts ? subActive : subIdle}`}
              >
                <SidebarIcon
                  src="/icon/sidebar/drafts.svg"
                  className="w-[15px] h-[15px]"
                  alt="Drafts"
                />
                <span>Drafts</span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/upgrade-plane")}
                className={`${subItemBase} ${isBoost ? subActive : subIdle}`}
              >
                <SidebarIcon
                  src="/icon/sidebar/boost-property.svg"
                  className="w-[15px] h-[15px]"
                  alt="Boost Property"
                />
                <span>Boost Property</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  router.push("/property/health-score/The%20terraces%20at%20max%20estate%20361")
                }
                className={`${subItemBase} ${isHealthScore ? subActive : subIdle}`}
              >
                <SidebarIcon
                  src="/icon/sidebar/health-score.svg"
                  className="w-[15px] h-[15px]"
                  alt="Health Score"
                />
                <span>Health Score</span>
              </button>
            </div>
          )}

          {/* Properties mini submenu (collapsed) matching Figma */}
          {collapsed && propertiesOpen && (
            <div className="mt-1.5 p-1.5 rounded-xl bg-white shadow-sm flex flex-col items-center gap-1.5 mx-auto w-10 text-slate-600">
              <button
                type="button"
                onClick={() => router.push("/property")}
                className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                  isMyProperties
                    ? "bg-[#EAF2FF] text-[#1865F2]"
                    : "text-slate-500 hover:bg-slate-100 hover:text-[#1865F2]"
                }`}
                title="My Properties"
              >
                <SidebarIcon
                  src="/icon/sidebar/my-properties.svg"
                  className="w-4 h-4"
                  alt="My Properties"
                />
              </button>
              <button
                type="button"
                onClick={() => router.push("/property/add-new")}
                className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                  isMyPost
                    ? "bg-[#EAF2FF] text-[#1865F2]"
                    : "text-slate-500 hover:bg-slate-100 hover:text-[#1865F2]"
                }`}
                title="My Post"
              >
                <SidebarIcon
                  src="/icon/sidebar/my-post.svg"
                  className="w-4 h-4"
                  alt="My Post"
                />
              </button>
              <button
                type="button"
                onClick={() => router.push("/projects")}
                className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                  pathname === "/projects"
                    ? "bg-[#EAF2FF] text-[#1865F2]"
                    : "text-slate-500 hover:bg-slate-100 hover:text-[#1865F2]"
                }`}
                title="My Projects"
              >
                <SidebarIcon
                  src="/icon/sidebar/my-projects.svg"
                  className="w-4 h-4"
                  alt="My Projects"
                />
              </button>
              <button
                type="button"
                onClick={() => router.push("/property/drafts")}
                className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                  isDrafts
                    ? "bg-[#EAF2FF] text-[#1865F2]"
                    : "text-slate-500 hover:bg-slate-100 hover:text-[#1865F2]"
                }`}
                title="Drafts"
              >
                <SidebarIcon
                  src="/icon/sidebar/drafts.svg"
                  className="w-4 h-4"
                  alt="Drafts"
                />
              </button>
              <button
                type="button"
                onClick={() => router.push("/upgrade-plane")}
                className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                  isBoost
                    ? "bg-[#EAF2FF] text-[#1865F2]"
                    : "text-slate-500 hover:bg-slate-100 hover:text-[#1865F2]"
                }`}
                title="Boost Property"
              >
                <SidebarIcon
                  src="/icon/sidebar/boost-property.svg"
                  className="w-4 h-4"
                  alt="Boost Property"
                />
              </button>
              <button
                type="button"
                onClick={() =>
                  router.push("/property/health-score/The%20terraces%20at%20max%20estate%20361")
                }
                className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                  isHealthScore
                    ? "bg-[#EAF2FF] text-[#1865F2]"
                    : "text-slate-500 hover:bg-slate-100 hover:text-[#1865F2]"
                }`}
                title="Health Score"
              >
                <SidebarIcon
                  src="/icon/sidebar/health-score.svg"
                  className="w-4 h-4"
                  alt="Health Score"
                />
              </button>
            </div>
          )}
        </div>

        {/* 3. CRM */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setCrmOpen((prev) => !prev);
              setPropertiesOpen(false);
            }}
            className={`${navItemBase} justify-between ${
              crmOpen
                ? "bg-[#0A47BE] text-white font-bold shadow-inner"
                : isCrmList || isCrmDetail
                ? activeItem
                : idleItem
            } ${collapsed ? "h-11 w-11 mx-auto px-0 justify-center" : "px-3.5 py-2.5"}`}
            title="CRM"
          >
            <div className="flex items-center gap-3">
              <SidebarIcon
                src="/icon/sidebar/leads.svg"
                className="w-[18px] h-[18px]"
                alt="CRM Leads"
              />
              {!collapsed && <span>CRM</span>}
            </div>
            {!collapsed && (
              crmOpen ? (
                <ChevronDown size={15} className="text-current/70" />
              ) : (
                <ChevronRight size={15} className="text-current/70" />
              )
            )}
          </button>

          {/* CRM submenu matching Figma white card */}
          {!collapsed && crmOpen && (
            <div className="mt-1.5 p-1.5 rounded-xl bg-white shadow-sm space-y-1 text-slate-700">
              <button
                type="button"
                onClick={() => router.push("/crm?tab=all")}
                className={`${subItemBase} ${
                  isCrmDetail || isCrmTab("all") ? subActive : subIdle
                }`}
              >
                <SidebarIcon
                  src="/icon/sidebar/leads.svg"
                  className="w-[15px] h-[15px]"
                  alt="Leads"
                />
                <span>Leads</span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/crm?tab=contacted")}
                className={`${subItemBase} ${
                  isCrmTab("contacted") ? subActive : subIdle
                }`}
              >
                <SidebarIcon
                  src="/icon/sidebar/follow-ups.svg"
                  className="w-[15px] h-[15px]"
                  alt="Follow-ups"
                />
                <span>Follow-ups</span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/crm?tab=site-visit")}
                className={`${subItemBase} ${
                  isCrmTab("site-visit") ? subActive : subIdle
                }`}
              >
                <SidebarIcon
                  src="/icon/sidebar/site-visits.svg"
                  className="w-[15px] h-[15px]"
                  alt="Site Visits"
                />
                <span>Site Visits</span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/crm?tab=negotiation")}
                className={`${subItemBase} ${
                  isCrmTab("negotiation") ? subActive : subIdle
                }`}
              >
                <SidebarIcon
                  src="/icon/sidebar/pipeline.svg"
                  className="w-[15px] h-[15px]"
                  alt="Pipeline"
                />
                <span>Pipeline</span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/crm?tab=new")}
                className={`${subItemBase} ${
                  isCrmTab("new") ? subActive : subIdle
                }`}
              >
                <SidebarIcon
                  src="/icon/sidebar/tasks.svg"
                  className="w-[15px] h-[15px]"
                  alt="Tasks"
                />
                <span>Tasks</span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/crm?tab=converted")}
                className={`${subItemBase} ${
                  isCrmTab("converted") ? subActive : subIdle
                }`}
              >
                <SidebarIcon
                  src="/icon/sidebar/lead-history.svg"
                  className="w-[15px] h-[15px]"
                  alt="Lead History"
                />
                <span>Lead History</span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/crm?tab=not-respond")}
                className={`${subItemBase} ${
                  isCrmTab("not-respond") ? subActive : subIdle
                }`}
              >
                <SidebarIcon
                  src="/icon/sidebar/response-time.svg"
                  className="w-[15px] h-[15px]"
                  alt="Response Time"
                />
                <span>Response Time</span>
              </button>
            </div>
          )}

          {/* CRM mini submenu (collapsed) matching Figma */}
          {collapsed && crmOpen && (
            <div className="mt-1.5 p-1.5 rounded-xl bg-white shadow-sm flex flex-col items-center gap-1.5 mx-auto w-10 text-slate-600">
              <button
                type="button"
                onClick={() => router.push("/crm?tab=all")}
                className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                  isCrmDetail || isCrmTab("all")
                    ? "bg-[#EAF2FF] text-[#1865F2]"
                    : "text-slate-500 hover:bg-slate-100 hover:text-[#1865F2]"
                }`}
                title="Leads"
              >
                <SidebarIcon
                  src="/icon/sidebar/leads.svg"
                  className="w-4 h-4"
                  alt="Leads"
                />
              </button>
              <button
                type="button"
                onClick={() => router.push("/crm?tab=contacted")}
                className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                  isCrmTab("contacted")
                    ? "bg-[#EAF2FF] text-[#1865F2]"
                    : "text-slate-500 hover:bg-slate-100 hover:text-[#1865F2]"
                }`}
                title="Follow-ups"
              >
                <SidebarIcon
                  src="/icon/sidebar/follow-ups.svg"
                  className="w-4 h-4"
                  alt="Follow-ups"
                />
              </button>
              <button
                type="button"
                onClick={() => router.push("/crm?tab=site-visit")}
                className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                  isCrmTab("site-visit")
                    ? "bg-[#EAF2FF] text-[#1865F2]"
                    : "text-slate-500 hover:bg-slate-100 hover:text-[#1865F2]"
                }`}
                title="Site Visits"
              >
                <SidebarIcon
                  src="/icon/sidebar/site-visits.svg"
                  className="w-4 h-4"
                  alt="Site Visits"
                />
              </button>
              <button
                type="button"
                onClick={() => router.push("/crm?tab=negotiation")}
                className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                  isCrmTab("negotiation")
                    ? "bg-[#EAF2FF] text-[#1865F2]"
                    : "text-slate-500 hover:bg-slate-100 hover:text-[#1865F2]"
                }`}
                title="Pipeline"
              >
                <SidebarIcon
                  src="/icon/sidebar/pipeline.svg"
                  className="w-4 h-4"
                  alt="Pipeline"
                />
              </button>
              <button
                type="button"
                onClick={() => router.push("/crm?tab=new")}
                className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                  isCrmTab("new")
                    ? "bg-[#EAF2FF] text-[#1865F2]"
                    : "text-slate-500 hover:bg-slate-100 hover:text-[#1865F2]"
                }`}
                title="Tasks"
              >
                <SidebarIcon
                  src="/icon/sidebar/tasks.svg"
                  className="w-4 h-4"
                  alt="Tasks"
                />
              </button>
              <button
                type="button"
                onClick={() => router.push("/crm?tab=converted")}
                className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                  isCrmTab("converted")
                    ? "bg-[#EAF2FF] text-[#1865F2]"
                    : "text-slate-500 hover:bg-slate-100 hover:text-[#1865F2]"
                }`}
                title="Lead History"
              >
                <SidebarIcon
                  src="/icon/sidebar/lead-history.svg"
                  className="w-4 h-4"
                  alt="Lead History"
                />
              </button>
              <button
                type="button"
                onClick={() => router.push("/crm?tab=not-respond")}
                className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                  isCrmTab("not-respond")
                    ? "bg-[#EAF2FF] text-[#1865F2]"
                    : "text-slate-500 hover:bg-slate-100 hover:text-[#1865F2]"
                }`}
                title="Response Time"
              >
                <SidebarIcon
                  src="/icon/sidebar/response-time.svg"
                  className="w-4 h-4"
                  alt="Response Time"
                />
              </button>
            </div>
          )}
        </div>

        {/* 4. Audience */}
        <button
          type="button"
          onClick={() => router.push("/audience")}
          className={`${navItemBase} ${
            pathname === "/audience" ? activeItem : idleItem
          } ${collapsed ? "justify-center h-11 w-11 mx-auto px-0" : "px-3.5 py-2.5"}`}
          title="Audience"
        >
          <SidebarIcon
            src="/icon/sidebar/audience.svg"
            className="w-[18px] h-[18px]"
            alt="Audience"
          />
          {!collapsed && <span>Audience</span>}
        </button>

        {/* 5. Content */}
        <button
          type="button"
          onClick={() => router.push("/content")}
          className={`${navItemBase} ${
            pathname === "/content" ? activeItem : idleItem
          } ${collapsed ? "justify-center h-11 w-11 mx-auto px-0" : "px-3.5 py-2.5"}`}
          title="Content"
        >
          <SidebarIcon
            src="/icon/sidebar/content.svg"
            className="w-[18px] h-[18px]"
            alt="Content"
          />
          {!collapsed && <span>Content</span>}
        </button>

        {/* 6. Analytics */}
        <button
          type="button"
          onClick={() => router.push("/analytics")}
          className={`${navItemBase} ${
            pathname === "/analytics" ? activeItem : idleItem
          } ${collapsed ? "justify-center h-11 w-11 mx-auto px-0" : "px-3.5 py-2.5"}`}
          title="Analytics"
        >
          <SidebarIcon
            src="/icon/sidebar/analytics.svg"
            className="w-[18px] h-[18px]"
            alt="Analytics"
          />
          {!collapsed && <span>Analytics</span>}
        </button>

        {/* 7. Insights */}
        <button
          type="button"
          onClick={() => router.push("/insights")}
          className={`${navItemBase} ${
            pathname === "/insights" ? activeItem : idleItem
          } ${collapsed ? "justify-center h-11 w-11 mx-auto px-0" : "px-3.5 py-2.5"}`}
          title="Insights"
        >
          <SidebarIcon
            src="/icon/sidebar/insights.svg"
            className="w-[18px] h-[18px]"
            alt="Insights"
          />
          {!collapsed && <span>Insights</span>}
        </button>

        {/* 8. Account */}
        <button
          type="button"
          onClick={() => router.push("/account")}
          className={`${navItemBase} ${
            pathname === "/account" ? activeItem : idleItem
          } ${collapsed ? "justify-center h-11 w-11 mx-auto px-0" : "px-3.5 py-2.5"}`}
          title="Account"
        >
          <SidebarIcon
            src="/icon/sidebar/account.svg"
            className="w-[18px] h-[18px]"
            alt="Account"
          />
          {!collapsed && <span>Account</span>}
        </button>
      </div>

      {/* Bottom Area */}
      <div className="p-3 border-t border-white/15 space-y-2 shrink-0">
        {/* Upgrade Card matching Figma */}
        {!collapsed && (
          <div
            onClick={() => router.push("/upgrade-plane")}
            className="relative w-full cursor-pointer group select-none transition-transform hover:scale-[1.02]"
          >
            <div className="relative w-full aspect-[804/341]">
              <Image
                src="/icon/sidebar/Group 1686560404.png"
                alt="Want to upgrade"
                fill
                sizes="220px"
                className="object-contain"
                priority
              />
              <div className="absolute inset-x-0 bottom-2.5 flex justify-center pointer-events-auto">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push("/upgrade-plane");
                  }}
                  className="px-4 py-0.5 rounded-full bg-black hover:bg-slate-900 text-white font-bold text-[9.5px] tracking-tight shadow-sm cursor-pointer transition-colors"
                >
                  Upgrade now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Logout Button matching Figma */}
        <button
          type="button"
          onClick={handleLogout}
          className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-bold text-white bg-[#4285F4] hover:bg-[#3378EA] transition-colors cursor-pointer shadow-xs ${
            collapsed ? "justify-center px-0 h-10 w-10 mx-auto" : ""
          }`}
          title="Logout"
        >
          <SidebarIcon
            src="/icon/sidebar/logout.svg"
            className="w-4 h-4"
            alt="Logout"
          />
          {!collapsed && <span>Logout</span>}
        </button>

        {/* Profile */}
        <div
          onClick={() => router.push("/account")}
          className={`flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer ${
            collapsed ? "justify-center px-0" : ""
          }`}
          title={userName}
        >
          <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-white/80 shrink-0 bg-white/20 shadow-xs">
            <Image
              src="/broker/jitender_singh_figma.jpg"
              alt={userName}
              fill
              sizes="36px"
              className="object-cover"
              onError={(e) => {
                (e.target as any).src = "/customers/customer_man_laptop.jpg";
              }}
            />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <span className="block text-[13px] font-bold text-white tracking-tight">
                Profile
              </span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
