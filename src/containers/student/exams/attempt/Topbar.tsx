import { ThemeToggle } from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import React from 'react'
import { Countdown } from './Countdown'

function Topbar({ startTime, duration }: { startTime: string, duration: number }) {
    return (
        <nav className="mb-2 w-full h-16 flex items-center justify-between px-6 border-b shadow-lg">
            <div className='text-destructive'>
                <Countdown startTime={new Date(startTime)} duration={duration * 60} />
            </div>
            <div className="flex items-center gap-4">
                <ThemeToggle />
                <Button variant="destructive">Finish</Button>
            </div>
        </nav>
    )
}

export default Topbar