"use client";

import { ThemeToggle } from '@/components/ThemeToggle'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function Topbar() {
  const pathname = usePathname()

  // Determine user type based on pathname
  const getUserType = () => {
    if (!pathname) return 'student'
    if (pathname.startsWith('/student')) return 'student'
    if (pathname.startsWith('/faculty')) return 'faculty'
    if (pathname.startsWith('/department')) return 'department'
    if (pathname.startsWith('/school')) return 'school'
    return 'student' // default fallback
  }

  const userType = getUserType()

  // Generate URLs based on user type
  const profileUrl = `/${userType}/profile`
  const settingsUrl = `/${userType}/settings`
  const loginUrl = `/${userType}/login`

  return (
    <nav className="fixed top-0 left-0 right-0 w-full h-16 flex items-center justify-between px-6 border-b shadow-lg bg-background z-50">
      <div className="flex items-center gap-2">
        {/* <Image src="/logo.svg" alt="Logo" width={32} height={32} /> */}
        <span className="font-bold text-lg">Proctor</span>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className='bg-primary text-primary-foreground rounded-full aspect-square p-3 inline-flex items-center justify-center transition-none hover:bg-primary/90' aria-label="Open profile menu">
              <User className="w-5 h-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="bottom" sideOffset={8} className="w-48">
            <DropdownMenuItem asChild>
              <Link href={profileUrl} className="w-full">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={settingsUrl} className="w-full">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={loginUrl} className="text-destructive w-full">Logout</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}

export default Topbar