"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  FileText,
  Users,
  CreditCard,
  UserX,
  Settings as SettingsIcon,
  User,
  Bell,
  Ticket,
  Grid3X3,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuSections = [
  {
    title: "MAIN MENU",
    items: [
      { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
      { name: "Analytics", icon: BarChart3, path: "/analytics" },
      { name: "Audit logs", icon: FileText, path: "/audit-logs" },
    ],
  },
  {
    title: "USER MANAGEMENT",
    items: [
      { name: "Subscriptions", icon: CreditCard, path: "/subscriptions" },
      { name: "Referrals", icon: Users, path: "/referrals" },
      { name: "User management", icon: Users, path: "/user-management" },
      {
        name: "Employee management",
        icon: UserX,
        path: "/employee-management",
      },
    ],
  },
  {
    title: "ROLES",
    items: [
      { name: "HR", icon: User, path: "/hr" },
      { name: "Marketer", icon: BarChart3, path: "/marketer" },
      { name: "Agent", icon: User, path: "/agent" },
    ],
  },
  {
    title: "ACCOUNT",
    items: [
      { name: "Notifications", icon: Bell, path: "/notifications" },
      { name: "Profile", icon: User, path: "/profile" },
      { name: "Settings", icon: SettingsIcon, path: "/settings" },
    ],
  },
  {
    title: "SUPPORT",
    items: [{ name: "Tickets", icon: Ticket, path: "/tickets" }],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActivePath = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname?.startsWith(path);
  };

  return (
    <div className="w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-2">
          {/* <Grid3X3 className="h-8 w-8 text-primary" /> */}
          <h1 className="text-2xl font-bold text-foreground">Surro</h1>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        {menuSections.map((section) => (
          <div key={section.title} className="mb-6">
            <h3 className="px-6 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {section.title}
            </h3>
            <div className="space-y-1 px-3">
              {section.items.map((item) => {
                const IconComp = item.icon;
                const active = isActivePath(item.path);
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-regular transition-colors bg-[#f6f6f6]",
                      active
                        ? "bg-[#E7E7EE] text-[#0E0E55]"
                        : "text-sidebar-foreground"
                    )}
                  >
                    <IconComp className="h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
}
