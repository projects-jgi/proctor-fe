import { ThemeToggle } from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import { Clock, AlertTriangle } from 'lucide-react'

interface TopbarProps {
  timeLeft?: number
  violations?: number
  onSubmit?: () => void
}

function Topbar({ timeLeft = 3600, violations = 0, onSubmit }: TopbarProps) {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <nav className="fixed top-0 left-0 right-0 w-full h-16 flex items-center justify-between px-6 border-b shadow-lg bg-background z-50">
      <div className="flex items-center gap-2">
        <span className="font-bold text-lg">Exam in Progress</span>
      </div>
      <div className="flex items-center gap-4">
        {/* Time Remaining */}
        <div className={`flex items-center gap-2 px-3 py-1 rounded-md ${
          timeLeft < 300 ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
        }`}>
          <Clock className="w-4 h-4" />
          <span className="font-mono font-semibold">{formatTime(timeLeft)}</span>
        </div>

        {/* Violations Warning */}
        {violations > 0 && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
            <AlertTriangle className="w-4 h-4" />
            <span className="font-semibold">{violations} violations</span>
          </div>
        )}

        {/* Emergency Submit */}
        <Button
          variant="destructive"
          size="sm"
          onClick={onSubmit}
          className="hidden md:flex"
        >
          Emergency Submit
        </Button>

        <ThemeToggle />
      </div>
    </nav>
  )
}

export default Topbar