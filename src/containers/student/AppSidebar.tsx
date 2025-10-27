import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import Link from 'next/link'
import React from 'react'

const data = {
  navMain: [
    {
      title: "Cohorts",
      url: "#",
      items: [
        {
          title: "Python Programming III",
          url: "#",
        },
        {
          title: "IoT III",
          url: "#",
        },
        {
          title: "View All",
          url: "#",
        },
      ],
    },
    {
      title: "Exams",
      url: "#",
      items: [
        {
          title: "Upcoming exams",
          url: "#",
        },
        {
          title: "Ongoing exams",
          url: "#",
          isActive: true,
        },
        {
          title: "Completed exams",
          url: "#",
        },
      ],
    },
    {
      title: "Practice",
      url: "#",
      items: [
        {
          title: "Logical",
          url: "#",
        },
        {
          title: "Verbal",
          url: "#",
        },
        {
          title: "Aptitude",
          url: "#",
        },
      ],
    },
  ],
}


function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader className='h-16 inline-flex items-center justify-center'>
                <Link href={"#"} className=''>
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
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild isActive={item.isActive}>
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