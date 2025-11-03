"use client";

import { cn } from "@/lib/utils";
import {
  Building2,
  FileText,
  LayoutDashboard,
  Shield,
  Users
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SchoolSidebarProps {
  className?: string;
}

const navigationItems = [
  {
    title: "Dashboard",
    href: "/school/dashboard",
    icon: LayoutDashboard,
    description: "School administration overview"
  },
  {
    title: "Departments",
    href: "/school/departments",
    icon: Building2,
    description: "Manage academic departments"
  },
  {
    title: "Faculty",
    href: "/school/faculty",
    icon: Users,
    description: "View and manage faculty"
  },
  {
    title: "Exams",
    href: "/school/exams",
    icon: FileText,
    description: "Monitor school exams"
  },
  {
    title: "Proctoring",
    href: "/school/proctoring",
    icon: Shield,
    description: "Monitor ongoing exam sessions"
  }
];

export function SchoolSidebar({ className }: SchoolSidebarProps) {
  const pathname = usePathname();

  return (
    <div className={cn("flex h-full w-64 flex-col bg-sidebar border-r border-sidebar-border fixed left-0 top-16 z-40", className)}>
      {/* Navigation */}
      <nav className="flex-1 space-y-3 px-4 py-4">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "w-full flex items-center px-3 py-3 rounded-lg text-left transition-colors hover:bg-sidebar-accent cursor-pointer",
                  isActive && "bg-sidebar-accent text-sidebar-accent-foreground border border-sidebar-border"
                )}
              >
                <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{item.title}</div>
                  <div className="text-xs text-muted-foreground truncate">{item.description}</div>
                </div>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}