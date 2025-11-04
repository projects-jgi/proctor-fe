"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
    BookOpen,
    ChevronUp,
    FileText,
    HelpCircle,
    LayoutDashboard,
    TrendingUp,
    User
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface StudentSidebarProps {
  className?: string;
}

const navigationItems = [
  {
    title: "Dashboard",
    href: "/student/dashboard",
    icon: LayoutDashboard,
    description: "Overview and quick actions"
  },
  {
    title: "Exams",
    href: "/student/exams",
    icon: FileText,
    description: "View available exams"
  },
  {
    title: "Results",
    href: "/student/results",
    icon: TrendingUp,
    description: "View your exam results"
  },
  {
    title: "Eligibility Test",
    href: "/student/eligibility-test",
    icon: HelpCircle,
    description: "Take eligibility tests"
  }
];

export function StudentSidebar({ className }: StudentSidebarProps) {
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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

      {/* Profile Section */}
      <div className="border-t border-sidebar-border p-4">
        <DropdownMenu open={isProfileOpen} onOpenChange={setIsProfileOpen}>
          <DropdownMenuTrigger asChild>
            <button className="w-full flex items-center px-3 py-3 rounded-lg text-left transition-colors hover:bg-sidebar-accent">
              <Avatar className="mr-3 h-8 w-8">
                <AvatarImage src={undefined} alt="Profile" />
                <AvatarFallback>ST</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">Student Name</div>
                <div className="text-xs text-muted-foreground truncate">student@university.edu</div>
              </div>
              <ChevronUp className={cn("h-4 w-4 transition-transform", isProfileOpen && "rotate-180")} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem asChild>
              <Link href="/student/profile" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/student/settings" className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
