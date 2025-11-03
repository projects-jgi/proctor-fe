import * as React from "react"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { onCheckedChange?: (checked: boolean) => void }
>(({ className, onCheckedChange, ...props }, ref) => (
  <label className="inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      className="sr-only"
      ref={ref}
      onChange={(e) => onCheckedChange?.(e.target.checked)}
      {...props}
    />
    <div
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        props.checked ? "bg-primary" : "bg-input",
        className
      )}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-background transition-transform",
          props.checked ? "translate-x-6" : "translate-x-1"
        )}
      />
    </div>
  </label>
))
Switch.displayName = "Switch"

export { Switch }

