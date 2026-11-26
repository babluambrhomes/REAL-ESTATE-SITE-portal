
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, ChevronRight, Users } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearAuth } from "@/store/slice/authSlice";
import { resetWorkspace } from "@/store/slice/workspaceSlice";
import { usePermissions } from "@/lib/auth/usePermissions";

// =====================================================
// TYPES
// =====================================================

type MenuItem = {
  id: string;
  label: string;
  href?: string;
  icon?: string;
  permission?: string | string[] | null;
  children?: MenuItem[];
};

interface PortalSidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}


const SIDEBAR_MENU: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/",
    icon: "/icon/sidebar/dashboard.svg",
  },

  {
    id: "properties",
    label: "Properties",
    icon: "/icon/sidebar/properties.svg",
    permission: [
      "property.read",
      "property.create",
      "property.publish",
    ],
    children: [
      {
        id: "my-properties",
        label: "My Properties",
        href: "/property",
        icon: "/icon/sidebar/my-properties.svg",
      },
      {
        id: "my-post",
        label: "My Post",
        href: "/property/add-new",
        icon: "/icon/sidebar/my-post.svg",
        permission: "property.create",
      },
      {
        id: "my-projects",
        label: "My Projects",
        href: "/projects",
        icon: "/icon/sidebar/my-projects.svg",
      },
      {
        id: "drafts",
        label: "Drafts",
        href: "/property/drafts",
        icon: "/icon/sidebar/drafts.svg",
      },
      {
        id: "boost-property",
        label: "Boost Property",
        href: "/upgrade-plane",
        icon: "/icon/sidebar/boost-property.svg",
        permission: "property.publish",
      },
      {
        id: "health-score",
        label: "Health Score",
        href: "/property/health-score/The%20terraces%20at%20max%20estate%20361",
        icon: "/icon/sidebar/health-score.svg",
      },
    ],
  },

  {
    id: "crm",
    label: "CRM",
    icon: "/icon/sidebar/leads.svg",
    permission: "lead:read",
    children: [
      {
        id: "leads",
        label: "Leads",
        href: "/crm?tab=all",
        icon: "/icon/sidebar/leads.svg",
      },
      {
        id: "follow-ups",
        label: "Follow-ups",
        href: "/crm?tab=contacted",
        icon: "/icon/sidebar/follow-ups.svg",
      },
      {
        id: "site-visits",
        label: "Site Visits",
        href: "/crm?tab=site-visit",
        icon: "/icon/sidebar/site-visits.svg",
        permission: "siteVisit.read",
      },
      {
        id: "pipeline",
        label: "Pipeline",
        href: "/crm?tab=negotiation",
        icon: "/icon/sidebar/pipeline.svg",
      },
      {
        id: "tasks",
        label: "Tasks",
        href: "/crm?tab=new",
        icon: "/icon/sidebar/tasks.svg",
      },
      {
        id: "lead-history",
        label: "Lead History",
        href: "/crm?tab=converted",
        icon: "/icon/sidebar/lead-history.svg",
      },
      {
        id: "response-time",
        label: "Response Time",
        href: "/crm?tab=not-respond",
        icon: "/icon/sidebar/response-time.svg",
      },
    ],
  },

  {
    id: "audience",
    label: "Audience",
    href: "/audience",
    icon: "/icon/sidebar/audience.svg",
  },

  {
    id: "content",
    label: "Content",
    href: "/content",
    icon: "/icon/sidebar/content.svg",
  },

  {
    id: "analytics",
    label: "Analytics",
    href: "/analytics",
    icon: "/icon/sidebar/analytics.svg",
  },

  {
    id: "insights",
    label: "Insights",
    href: "/insights",
    icon: "/icon/sidebar/insights.svg",
  },

  {
    id: "team",
    label: "Team",
    href: "/team",
    permission: [
      "member.invite",
      "member.update",
      "role.manage",
    ],
  },

  {
    id: "account",
    label: "Account",
    href: "/account",
    icon: "/icon/sidebar/account.svg",
    permission: "sellerProfile:read",
  },
];

// =====================================================
// SIDEBAR ICON
// =====================================================

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

// =====================================================
// MAIN COMPONENT
// =====================================================

export const PortalSidebar = ({
  collapsed,
  onToggleCollapse,
}: PortalSidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const { can, canAny } = usePermissions();

  const crmTab = searchParams.get("tab") ?? "all";

  // ---------------------------------------------------
  // ACCORDION STATE
  // ---------------------------------------------------

  const [openMenu, setOpenMenu] = useState<string | null>(() => {
    if (pathname.startsWith("/crm")) return "crm";

    if (
      pathname.startsWith("/property") ||
      pathname === "/projects"
    ) {
      return "properties";
    }

    return null;
  });

  useEffect(() => {
    if (pathname.startsWith("/crm")) {
      setOpenMenu("crm");
    } else if (
      pathname.startsWith("/property") ||
      pathname === "/projects"
    ) {
      setOpenMenu("properties");
    }
  }, [pathname]);

  // ---------------------------------------------------
  // USER
  // ---------------------------------------------------

  const userName =
    [
      user?.person?.firstName,
      user?.person?.lastName,
    ]
      .filter(Boolean)
      .join(" ") ||
    user?.email ||
    "User";

  // ---------------------------------------------------
  // PERMISSION CHECK
  // ---------------------------------------------------

  const hasPermission = (
    permission?: string | string[] | null
  ): boolean => {
    if (!permission) return true;

    if (Array.isArray(permission)) {
      return canAny(permission);
    }

    return can(permission);
  };

  // ---------------------------------------------------
  // FILTER MENU
  // ---------------------------------------------------

  const filterMenu = (items: MenuItem[]): MenuItem[] => {
    return items
      .filter((item) => hasPermission(item.permission))
      .map((item) => ({
        ...item,
        children: item.children
          ? filterMenu(item.children)
          : undefined,
      }))
      .filter(
        (item) =>
          !item.children || item.children.length > 0
      );
  };

  const menuItems = filterMenu(SIDEBAR_MENU);

  // ---------------------------------------------------
  // ROUTE ACTIVE CHECK
  // ---------------------------------------------------

  const isActive = (item: MenuItem): boolean => {
    if (!item.href) {
      return false;
    }

    const [hrefPath, query] = item.href.split("?");

    if (hrefPath === "/crm") {
      if (pathname.startsWith("/crm/")) {
        return item.id === "leads";
      }

      if (pathname !== "/crm") {
        return false;
      }

      const tab = new URLSearchParams(query ?? "").get("tab");

      return crmTab === (tab ?? "all");
    }

    if (hrefPath === "/") {
      return pathname === "/";
    }

    if (hrefPath === "/property") {
      return pathname === "/property";
    }

    return (
      pathname === hrefPath ||
      pathname.startsWith(`${hrefPath}/`)
    );
  };

  const hasActiveChild = (item: MenuItem): boolean => {
    return !!item.children?.some(
      (child) =>
        isActive(child) || hasActiveChild(child)
    );
  };

  // ---------------------------------------------------
  // NAVIGATION
  // ---------------------------------------------------

  const navigate = (href?: string) => {
    if (!href) return;

    router.push(href);
  };

  // ---------------------------------------------------
  // LOGOUT
  // ---------------------------------------------------

  const handleLogout = () => {
    dispatch(clearAuth());
    dispatch(resetWorkspace());
    router.push("/login");
  };

  // ---------------------------------------------------
  // STYLES
  // ---------------------------------------------------

  const navItemBase =
    "w-full flex items-center gap-3 rounded-xl text-[13px] transition-all cursor-pointer";

  const activeItem =
    "bg-white text-[#1865F2] font-bold";

  const idleItem =
    "text-white/80 font-medium hover:bg-white/10 hover:text-white";

  const subItemBase =
    "w-full text-left px-3 py-2 rounded-lg text-[12.5px] transition-colors flex items-center gap-2.5 cursor-pointer";

  const subActive =
    "bg-[#EAF2FF] text-[#1865F2] font-bold";

  const subIdle =
    "text-slate-700 font-medium hover:bg-slate-50 hover:text-[#1865F2]";

  // ---------------------------------------------------
  // RECURSIVE MENU RENDERER
  // ---------------------------------------------------

  const renderMenu = (
    items: MenuItem[],
    level = 0
  ): React.ReactNode => {
    return items.map((item) => {
      const hasChildren = !!item.children?.length;

      const active = isActive(item);
      const childActive = hasActiveChild(item);

      const isOpen = openMenu === item.id;

      const isTeam = item.id === "team";

      const isActiveParent = active || childActive;

      return (
        <div
          key={item.id}
          className="relative"
        >
          {/* PARENT / NORMAL MENU */}

          <button
            type="button"
            title={collapsed ? item.label : undefined}
            onClick={() => {
              if (hasChildren) {
                setOpenMenu((prev) =>
                  prev === item.id ? null : item.id
                );
                return;
              }

              navigate(item.href);
            }}
            className={`${navItemBase} ${
              hasChildren && isOpen
                ? "bg-[#0A47BE] text-white font-bold shadow-inner"
                : isActiveParent
                ? activeItem
                : idleItem
            } ${
              collapsed
                ? "h-11 w-11 mx-auto px-0 justify-center"
                : "px-3.5 py-2.5"
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              {item.icon ? (
                <SidebarIcon
                  src={item.icon}
                  alt={item.label}
                  className="w-[18px] h-[18px]"
                />
              ) : isTeam ? (
                <Users size={18} />
              ) : null}

              {!collapsed && (
                <span>{item.label}</span>
              )}
            </div>

            {hasChildren && !collapsed && (
              isOpen ? (
                <ChevronDown
                  size={15}
                  className="ml-auto text-current/70"
                />
              ) : (
                <ChevronRight
                  size={15}
                  className="ml-auto text-current/70"
                />
              )
            )}
          </button>

          {/* SUBMENU */}

          {hasChildren && isOpen && (
            <div
              className={`mt-1.5 p-1.5 rounded-xl bg-white shadow-sm ${
                collapsed
                  ? "flex flex-col items-center gap-1.5 mx-auto w-10"
                  : "space-y-1"
              }`}
            >
              {item.children!.map((child) => {
                const childIsActive =
                  isActive(child);

                return (
                  <button
                    key={child.id}
                    type="button"
                    title={
                      collapsed
                        ? child.label
                        : undefined
                    }
                    onClick={() => navigate(child.href)}
                    className={
                      collapsed
                        ? `w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                            childIsActive
                              ? "bg-[#EAF2FF] text-[#1865F2]"
                              : "text-slate-500 hover:bg-slate-100 hover:text-[#1865F2]"
                          }`
                        : `${subItemBase} ${
                            childIsActive
                              ? subActive
                              : subIdle
                          }`
                    }
                  >
                    {child.icon && (
                      <SidebarIcon
                        src={child.icon}
                        className={
                          collapsed
                            ? "w-4 h-4"
                            : "w-[15px] h-[15px]"
                        }
                        alt={child.label}
                      />
                    )}

                    {!collapsed && (
                      <span>{child.label}</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      );
    });
  };

  // ===================================================
  // JSX
  // ===================================================

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 bg-[#1865F2] text-white flex flex-col transition-all duration-300 ease-in-out select-none border-r border-white/10 ${
        collapsed ? "w-[76px]" : "w-[240px]"
      }`}
    >
      {/* ============================================= */}
      {/* BRAND + COLLAPSE */}
      {/* ============================================= */}

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
              alt="Collapse"
            />
          </button>
        </div>
      )}

      {/* ============================================= */}
      {/* DYNAMIC NAVIGATION */}
      {/* ============================================= */}

      <div className="flex-1 min-h-0 overflow-y-auto px-3 py-2 space-y-1 no-scrollbar">
        {renderMenu(menuItems)}
      </div>

      {/* ============================================= */}
      {/* BOTTOM AREA */}
      {/* ============================================= */}

      <div className="p-3 border-t border-white/15 space-y-2 shrink-0">
        {/* UPGRADE CARD */}

        {!collapsed && can("property.publish") && (
          <div
            onClick={() => navigate("/upgrade-plane")}
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

              <div className="absolute inset-x-0 bottom-2.5 flex justify-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/upgrade-plane");
                  }}
                  className="px-4 py-0.5 rounded-full bg-black hover:bg-slate-900 text-white font-bold text-[9.5px] tracking-tight shadow-sm cursor-pointer transition-colors"
                >
                  Upgrade now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* LOGOUT */}

        <button
          type="button"
          onClick={handleLogout}
          className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-bold text-white bg-[#4285F4] hover:bg-[#3378EA] transition-colors cursor-pointer shadow-xs ${
            collapsed
              ? "justify-center px-0 h-10 w-10 mx-auto"
              : ""
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

        {/* PROFILE */}

        {can("sellerProfile:read") && (
          <div
            onClick={() => navigate("/account")}
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
                  e.currentTarget.src =
                    "/customers/customer_man_laptop.jpg";
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
        )}
      </div>
    </aside>
  );
};

export default PortalSidebar;
