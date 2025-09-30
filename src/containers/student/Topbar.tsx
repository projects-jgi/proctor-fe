import { ThemeToggle } from '@/components/ThemeToggle'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { User } from 'lucide-react'
import Link from 'next/link'

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
            <DropdownMenuItem asChild>
              <Link href="/student/login" className="text-destructive">Logout</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}

export default Topbar