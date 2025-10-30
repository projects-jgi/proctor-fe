"use client";

import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { logout } from "@/lib/server_api/auth";
import { User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Topbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/auth/student");
  };
  return (
    <header className="flex h-16 shrink-0 justify-between items-center gap-2 border-b px-4">
      <div className="flex gap-2 h-16 items-center">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {/* <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">
                Building Your Application
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" /> */}
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-4 h-16">
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
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button variant={"link"} className="text-destructive" onClick={handleLogout}>
                Logout
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default Topbar;
