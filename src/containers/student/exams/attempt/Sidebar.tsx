'use client';

import * as React from "react"
import { ChevronRight } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Logical",
      url: "#",
    },
    {
      title: "Verbal",
      url: "#",
    },
    {
      title: "Technical",
      url: "#",
    },
    {
      title: "Aptitude",
      url: "#",
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
        <SidebarHeader>
            <span className="text-lg inline-block text-center font-bold p-4">LOGO</span>
        </SidebarHeader>
      <SidebarContent className="gap-0">
        {data.navMain.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-md font-bold mb-2"
              >
                <CollapsibleTrigger>
                  {item.title}{" "}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu className="grid grid-cols-4 gap-3">
                    {Array(10).fill(0).map((_, index) => (
                        <SidebarMenuItem key={index} className="w-full aspect-square bg-secondary text-secondary-foreground ring-2 ring-border">
                            <SidebarMenuButton asChild isActive={false} className="inline-flex w-full h-full items-center justify-center">
                                <a href={item.url}>10</a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
            <SidebarMenuItem className="inline-flex gap-2 items-center mb-4">
                <span className="w-[15px] h-[15px] inline-block aspect-square bg-secondary ring-2 ring-success"></span>
                <span className="text-sm">Answered</span>
            </SidebarMenuItem>
            <SidebarMenuItem className="inline-flex gap-2 items-center mb-4">
                <span className="w-[15px] h-[15px] inline-block aspect-square bg-secondary ring-2 ring-destructive"></span>
                <span className="text-sm">Marked for Review</span>
            </SidebarMenuItem>
            <SidebarMenuItem className="inline-flex gap-2 items-center mb-4">
                <span className="w-[15px] h-[15px] inline-block aspect-square bg-secondary ring-2 ring-warning"></span>
                <span className="text-sm">Marked for Review</span>
            </SidebarMenuItem>
            <SidebarMenuItem className="inline-flex gap-2 items-center mb-4">
                <span className="w-[15px] h-[15px] inline-block aspect-square bg-secondary ring-2 ring-border"></span>
                <span className="text-sm">Not Visited</span>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
