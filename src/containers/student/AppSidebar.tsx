'use client';

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const data = {
  navMain: [
    {
      title: "Home",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "/student/dashboard"
        }
      ]
    },
    {
      title: "Exams",
      url: "#",
      items: [
        {
          title: "Upcoming exams",
          url: "/student/exams/status/upcoming",
        },
        {
          title: "Ongoing exams",
          url: "/student/exams/status/ongoing",
        },
        {
          title: "Completed exams",
          url: "/student/exams/status/completed",
        },
      ],
    },
  ],
}


function AppSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar variant='inset'>
            <SidebarHeader className='h-16 inline-flex items-center justify-center'>
                <Link href={"/student"} className=''>
                    Proctor
                </Link>
            </SidebarHeader>
            <SidebarContent>
                    {data.navMain.map(item => (
                <SidebarGroup key={item.title}>
                        <SidebarGroupLabel>
                        {item.title}
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {
                                item.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild isActive={item.url == pathname.toLocaleLowerCase()}>
                                            <Link href={item.url}>{item.title}</Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))
                            }
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                    ))}
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}

export default AppSidebar