import React from 'react'
import Image from 'next/image'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { User } from 'lucide-react'

function Topbar() {
  return (
    <nav className="mb-2 w-full h-16 flex items-center justify-between px-6 border-b shadow-lg">
      <div className="flex items-center gap-2">
        {/* <Image src="/logo.svg" alt="Logo" width={32} height={32} /> */}
        <span className="font-bold text-lg">Proctor</span>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className='bg-primary text-primary-foreground rounded-full aspect-square p-3 inline-block' aria-label="Open profile menu">
              <User className="w-5 h-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}

export default Topbar