"use client";

import { cn } from "@/lib/utils";
import {
    FileText,
    LayoutDashboard,
    TrendingUp,
    Users
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DepartmentSidebarProps {
  className?: string;
}

const navigationItems = [
  {
    title: "Dashboard",
    href: "/department/dashboard",
    icon: LayoutDashboard,
    description: "Overview and management"
  },
  {
    title: "Students",
    href: "/department/students",
    icon: Users,
    description: "Manage enrolled students"
  },
  {
    title: "Faculty",
    href: "/department/faculty",
    icon: Users,
    description: "Department faculty members"
  },
  {
    title: "Exams",
    href: "/department/exams",
    icon: FileText,
    description: "Department-wide exams"
  },
  {
    title: "Results",
    href: "/department/results",
    icon: TrendingUp,
    description: "Exam results & analytics"
  }
];

export function DepartmentSidebar({ className }: DepartmentSidebarProps) {
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