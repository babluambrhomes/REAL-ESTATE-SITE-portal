"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  LayoutDashboard,
  LayoutGrid,
  Columns2,
  Menu,
  User,
  Megaphone,
  CreditCard,
  Building2,
  Building,
  Home,
  Users2,
  Users,
  FileText,
  BarChart3,
  Lightbulb,
  Settings,
  ChevronDown,
  ChevronRight,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  PlusCircle,
  FolderGit2,
  Sparkles,
  Rocket,
  CalendarCheck,
  PhoneCall,
  Kanban,
  CheckSquare,
  History,
  Timer,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearAuth } from "@/store/slice/authSlice";

interface PortalSidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

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
  const isMyProperties =
    pathname === "/property" ||
    pathname.startsWith("/property/health-score") ||
    pathname.startsWith("/property/performance-diagnosis");
  const isMyPost = pathname === "/property/add-new";
  const isDrafts = pathname === "/property/drafts";
  const isBoost = pathname === "/upgrade-plane";
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  // Accordion state for dropdowns
  const [propertiesOpen, setPropertiesOpen] = useState(true);
  const [crmOpen, setCrmOpen] = useState(false);

  const userName =
    [user?.person?.firstName, user?.person?.lastName].filter(Boolean).join(" ") ||
    user?.email?.split("@")[0] ||
    "Jitender Singh";

  const handleLogout = () => {
    dispatch(clearAuth());
    router.push("/login");
  };

  const navItemBase =
    "w-full flex items-center gap-3 rounded-xl text-[13px] transition-all cursor-pointer";
  const activeItem = "bg-white text-[#1865F2] font-bold shadow-sm";
  const idleItem =
    "text-white/80 font-medium hover:bg-white/10 hover:text-white";
  const subItemBase =
    "w-full text-left pl-3 pr-2 py-2 rounded-lg text-[12px] transition-all flex items-center gap-2.5 cursor-pointer";
  const subActive = "bg-white text-[#1865F2] font-bold shadow-sm";
  const subIdle = "text-white/70 font-medium hover:bg-white/10 hover:text-white";

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 bg-[#1865F2] text-white flex flex-col transition-all duration-300 ease-in-out select-none shadow-xl border-r border-white/10 ${
        collapsed ? "w-[76px]" : "w-[240px]"
      }`}
    >
      {/* Brand + collapse toggle */}
      {collapsed ? (
        <div className="flex flex-col items-center gap-2 pt-4 pb-3">
          <Link
            href="/"
            className="relative h-7 w-7 hover:opacity-90 transition-opacity"
            title="Roofin"
          >
            <Image
              src="/layout/white_logo.png"
              alt="Roofin"
              fill
              sizes="28px"
              className="object-contain"
            />
          </Link>
          <button
            type="button"
            onClick={onToggleCollapse}
            className="w-9 h-9 rounded-xl hover:bg-white/10 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Expand sidebar"
          >
            <Columns2 size={18} strokeWidth={2.2} />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between px-4 pt-4 pb-3">
          <Link
            href="/"
            className="relative h-8 w-[112px] hover:opacity-90 transition-opacity"
            title="Roofin"
          >
            <Image
              src="/layout/white_logo.png"
              alt="Roofin"
              fill
              sizes="112px"
              className="object-contain object-left"
            />
          </Link>
          <button
            type="button"
            onClick={onToggleCollapse}
            className="w-9 h-9 rounded-xl hover:bg-white/10 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Collapse sidebar"
          >
            <Columns2 size={18} strokeWidth={2.2} />
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
            <LayoutGrid size={19} className="shrink-0" strokeWidth={2.2} />
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
              propertiesOpen || isPropertiesSection ? activeItem : idleItem
            } ${collapsed ? "h-11 w-11 mx-auto px-0 justify-center" : "px-3.5 py-2.5"}`}
            title="Properties"
          >
            <div className="flex items-center gap-3">
              <CreditCard size={19} className="shrink-0" />
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

          {/* Properties submenu */}
          {!collapsed && propertiesOpen && (
            <div className="mt-1 ml-4 pl-3 border-l border-white/20 space-y-0.5">
              <button
                type="button"
                onClick={() => router.push("/property")}
                className={`${subItemBase} ${isMyProperties ? subActive : subIdle}`}
              >
                <Home size={15} className="shrink-0" />
                <span>My Properties</span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/property/add-new")}
                className={`${subItemBase} ${isMyPost ? subActive : subIdle}`}
              >
                <PlusCircle size={15} className="shrink-0" />
                <span>My Post</span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/projects")}
                className={`${subItemBase} ${
                  pathname === "/projects" ? subActive : subIdle
                }`}
              >
                <FolderGit2 size={15} className="shrink-0" />
                <span>My Projects</span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/property/drafts")}
                className={`${subItemBase} ${isDrafts ? subActive : subIdle}`}
              >
                <FileText size={15} className="shrink-0" />
                <span>Drafts</span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/upgrade-plane")}
                className={`${subItemBase} ${isBoost ? subActive : subIdle}`}
              >
                <Rocket size={15} className="shrink-0" />
                <span>Boost Property</span>
              </button>
            </div>
          )}

          {/* Properties mini submenu (collapsed) */}
          {collapsed && propertiesOpen && (
            <div className="mt-1.5 p-1.5 rounded-xl bg-white/10 flex flex-col items-center gap-1 mx-auto w-12">
              <button
                type="button"
                onClick={() => router.push("/property")}
                className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer ${
                  isMyProperties
                    ? "bg-white text-[#1865F2]"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
                title="My Properties"
              >
                <Home size={15} />
              </button>
              <button
                type="button"
                onClick={() => router.push("/property/add-new")}
                className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer ${
                  isMyPost
                    ? "bg-white text-[#1865F2]"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
                title="My Post"
              >
                <PlusCircle size={15} />
              </button>
              <button
                type="button"
                onClick={() => router.push("/projects")}
                className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer ${
                  pathname === "/projects"
                    ? "bg-white text-[#1865F2]"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
                title="My Projects"
              >
                <FolderGit2 size={15} />
              </button>
              <button
                type="button"
                onClick={() => router.push("/property/drafts")}
                className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer ${
                  isDrafts
                    ? "bg-white text-[#1865F2]"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
                title="Drafts"
              >
                <FileText size={15} />
              </button>
              <button
                type="button"
                onClick={() => router.push("/upgrade-plane")}
                className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer ${
                  isBoost
                    ? "bg-white text-[#1865F2]"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
                title="Boost Property"
              >
                <Rocket size={15} />
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
              crmOpen || isCrmList || isCrmDetail ? activeItem : idleItem
            } ${collapsed ? "h-11 w-11 mx-auto px-0 justify-center" : "px-3.5 py-2.5"}`}
            title="CRM"
          >
            <div className="flex items-center gap-3">
              <div className="px-1 py-0.5 border border-current rounded text-[8.5px] font-black leading-none tracking-tight shrink-0">
                CRM
              </div>
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

          {/* CRM submenu */}
          {!collapsed && crmOpen && (
            <div className="mt-1 ml-4 pl-3 border-l border-white/20 space-y-0.5">
              <button
                type="button"
                onClick={() => router.push("/crm?tab=all")}
                className={`${subItemBase} ${
                  isCrmDetail || isCrmTab("all") ? subActive : subIdle
                }`}
              >
                <Users size={15} className="shrink-0" />
                <span>Leads</span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/crm?tab=contacted")}
                className={`${subItemBase} ${
                  isCrmTab("contacted") ? subActive : subIdle
                }`}
              >
                <PhoneCall size={15} className="shrink-0" />
                <span>Follow-ups</span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/crm?tab=site-visit")}
                className={`${subItemBase} ${
                  isCrmTab("site-visit") ? subActive : subIdle
                }`}
              >
                <Building size={15} className="shrink-0" />
                <span>Site Visits</span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/crm?tab=negotiation")}
                className={`${subItemBase} ${
                  isCrmTab("negotiation") ? subActive : subIdle
                }`}
              >
                <Kanban size={15} className="shrink-0" />
                <span>Pipeline</span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/crm?tab=new")}
                className={`${subItemBase} ${
                  isCrmTab("new") ? subActive : subIdle
                }`}
              >
                <CheckSquare size={15} className="shrink-0" />
                <span>Tasks</span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/crm?tab=converted")}
                className={`${subItemBase} ${
                  isCrmTab("converted") ? subActive : subIdle
                }`}
              >
                <History size={15} className="shrink-0" />
                <span>Lead History</span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/crm?tab=not-respond")}
                className={`${subItemBase} ${
                  isCrmTab("not-respond") ? subActive : subIdle
                }`}
              >
                <Timer size={15} className="shrink-0" />
                <span>Response Time</span>
              </button>
            </div>
          )}

          {/* CRM mini submenu (collapsed) */}
          {collapsed && crmOpen && (
            <div className="mt-1.5 p-1.5 rounded-xl bg-white/10 flex flex-col items-center gap-1 mx-auto w-12">
              <button
                type="button"
                onClick={() => {
                  router.push("/crm?tab=all");
                }}
                className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer ${
                  isCrmDetail || isCrmTab("all")
                    ? "bg-white text-[#1865F2]"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
                title="Leads"
              >
                <Users size={15} />
              </button>
              <button
                type="button"
                onClick={() => {
                  router.push("/crm?tab=contacted");
                }}
                className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer ${
                  isCrmTab("contacted")
                    ? "bg-white text-[#1865F2]"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
                title="Follow-ups"
              >
                <PhoneCall size={15} />
              </button>
              <button
                type="button"
                onClick={() => {
                  router.push("/crm?tab=site-visit");
                }}
                className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer ${
                  isCrmTab("site-visit")
                    ? "bg-white text-[#1865F2]"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
                title="Site Visits"
              >
                <Building size={15} />
              </button>
              <button
                type="button"
                onClick={() => {
                  router.push("/crm?tab=negotiation");
                }}
                className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer ${
                  isCrmTab("negotiation")
                    ? "bg-white text-[#1865F2]"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
                title="Pipeline"
              >
                <Kanban size={15} />
              </button>
              <button
                type="button"
                onClick={() => {
                  router.push("/crm?tab=new");
                }}
                className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer ${
                  isCrmTab("new")
                    ? "bg-white text-[#1865F2]"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
                title="Tasks"
              >
                <CheckSquare size={15} />
              </button>
              <button
                type="button"
                onClick={() => {
                  router.push("/crm?tab=converted");
                }}
                className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer ${
                  isCrmTab("converted")
                    ? "bg-white text-[#1865F2]"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
                title="Lead History"
              >
                <History size={15} />
              </button>
              <button
                type="button"
                onClick={() => {
                  router.push("/crm?tab=not-respond");
                }}
                className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer ${
                  isCrmTab("not-respond")
                    ? "bg-white text-[#1865F2]"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
                title="Response Time"
              >
                <Timer size={15} />
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
          <User size={19} className="shrink-0" />
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
          <Building size={19} className="shrink-0" />
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
          <BarChart3 size={19} className="shrink-0" />
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
          <Megaphone size={19} className="shrink-0" />
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
          <Settings size={19} className="shrink-0" />
          {!collapsed && <span>Account</span>}
        </button>
      </div>

      {/* Bottom Area */}
      <div className="p-3 border-t border-white/15 space-y-2 shrink-0">
        {/* Upgrade Card */}
        {!collapsed && (
          <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-white p-3 shadow-md flex items-center gap-2.5 text-[#0B132B]">
            <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
              <Rocket size={16} />
            </div>
            <div className="min-w-0">
              <span className="text-[11.5px] font-bold text-slate-900 block leading-tight">
                Want to upgrade?
              </span>
              <button
                type="button"
                onClick={() => router.push("/upgrade-plane")}
                className="mt-1 px-3 py-1 rounded-full bg-[#0B132B] hover:bg-black text-white font-bold text-[9.5px] shadow-2xs transition-colors cursor-pointer"
              >
                Upgrade now
              </button>
            </div>
          </div>
        )}

        {/* Logout Button */}
        <button
          type="button"
          onClick={handleLogout}
          className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-white/90 bg-white/10 hover:bg-white/20 border border-white/15 transition-colors cursor-pointer ${
            collapsed ? "justify-center px-0" : ""
          }`}
          title="Logout"
        >
          <LogOut size={16} />
          {!collapsed && <span>Logout</span>}
        </button>

        {/* Profile */}
        <div
          onClick={() => router.push("/account")}
          className={`flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer ${
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
              <span className="block text-[12.5px] font-bold text-white tracking-tight truncate">
                {userName}
              </span>
              <span className="block text-[10px] text-white/60 font-medium">
                Seller
              </span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
