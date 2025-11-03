<<<<<<< Updated upstream
import { ThemeToggle } from '@/components/ThemeToggle'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { User } from 'lucide-react'
import Link from 'next/link'

function Topbar() {
=======
"use client";

import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import Link from "next/link";

function Topbar() {
  const pathname = usePathname();

  // Detect which role's section the user is currently viewing
  const getBasePath = () => {
    if (pathname.startsWith("/student")) return "/student";
    if (pathname.startsWith("/faculty")) return "/faculty";
    if (pathname.startsWith("/department")) return "/department";
    if (pathname.startsWith("/school")) return "/school";
    return ""; // fallback for non-role routes
  };

  const basePath = getBasePath();

  const profileLink = `${basePath}/profile`;
  const settingsLink = `${basePath}/settings`;

  const handleLogout = () => {
    // optional: just redirect to home or clear local data
    window.location.href = "/";
  };

>>>>>>> Stashed changes
  return (
    <nav className="mb-2 w-full h-16 flex items-center justify-between px-6 border-b shadow-lg">
      <div className="flex items-center gap-2">
        <span className="font-bold text-lg">Proctor</span>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="bg-primary text-primary-foreground rounded-full aspect-square p-3 inline-block"
              aria-label="Open profile menu"
            >
              <User className="w-5 h-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
<<<<<<< Updated upstream
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/student/login" className="text-destructive">Logout</Link>
=======
            <DropdownMenuItem asChild>
              <Link href={profileLink}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={settingsLink}>Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-destructive cursor-pointer"
            >
              Logout
>>>>>>> Stashed changes
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

export default Topbar;

