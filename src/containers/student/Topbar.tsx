"use client";

import { ThemeToggle } from '@/components/ThemeToggle'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { User } from 'lucide-react'
import Link from 'next/link'
import { useProctor } from '@/contexts/ProctorContext'

function Topbar() {
  const { currentUser, logout } = useProctor()

  const getProfileLinks = () => {
    switch (currentUser?.role) {
      case 'faculty':
        return [
          { href: '/faculty/profile', label: 'Profile' },
          { href: '/faculty/settings', label: 'Settings' },
        ]
      case 'department':
        return [
          { href: '/department/dashboard', label: 'Dashboard' },
        ]
      case 'campus':
        return [
          { href: '/school/dashboard', label: 'Dashboard' },
        ]
      case 'student':
        return [
          { href: '/student/dashboard', label: 'Dashboard' },
        ]
      default:
        return []
    }
  }

  const handleLogout = () => {
    logout()
  }

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
            <button className='bg-primary text-primary-foreground rounded-full aspect-square p-3 inline-block' aria-label="Open profile menu">
              <User className="w-5 h-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {getProfileLinks().map((link) => (
              <DropdownMenuItem key={link.href} asChild>
                <Link href={link.href}>{link.label}</Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem onClick={handleLogout} className="text-destructive">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}

export default Topbar