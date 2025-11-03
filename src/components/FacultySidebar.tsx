"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  ChevronUp,
  FileText,
  HelpCircle,
  LayoutDashboard,
  Shield,
  Tag,
  TrendingUp,
  User,
  Users
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface FacultySidebarProps {
  className?: string;
}

const navigationItems = [
  {
    title: "Dashboard",
    href: "/faculty/dashboard",
    icon: LayoutDashboard,
    description: "Overview and quick actions"
  },
  {
    title: "Question Bank",
    href: "/faculty/questions",
    icon: HelpCircle,
    description: "Manage your question library"
  },
  {
    title: "Exams",
    href: "/faculty/exams",
    icon: FileText,
    description: "Create and manage exams"
  },
  {
    title: "Exam types",
    href: "/faculty/exam-types",
    icon: Tag,
    description: "Manage exam types and schedules"
  },
  {
    title: "Students",
    href: "/faculty/students",
    icon: Users,
    description: "Manage department students"
  },
  {
    title: "Proctoring",
    href: "/faculty/proctoring",
    icon: Shield,
    description: "Monitor ongoing exam sessions"
  },
  {
    title: "Results",
    href: "/faculty/results",
    icon: TrendingUp,
    description: "View student results"
  }
];

export function FacultySidebar({ className }: FacultySidebarProps) {
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
                <AvatarFallback>FA</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">Faculty Name</div>
                <div className="text-xs text-muted-foreground truncate">faculty@university.edu</div>
              </div>
              <ChevronUp className={cn("h-4 w-4 transition-transform", isProfileOpen && "rotate-180")} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem asChild>
              <Link href="/faculty/profile" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}