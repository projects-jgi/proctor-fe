import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import AppSidebar from '@/containers/student/AppSidebar'
import Topbar from '@/containers/student/Topbar'
import React from 'react'

function layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Topbar />
                <main className='flex flex-col flex-1'>
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default layout