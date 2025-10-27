import * as React from "react"
import { cn } from "@/lib/utils"

// Lightweight replacement for @radix-ui/react-scroll-area
// Provides the minimal named exports used across the app.

type Props = React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }

export const ScrollArea = React.forwardRef<HTMLDivElement, Props>(
  ({ className, style, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        style={style}
        {...props}
      >
        {/* The inner viewport handles native scrolling */}
        <div
          className={cn("w-full h-full overflow-auto", "touch-auto")}
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {children}
        </div>
      </div>
    )
  }
)
ScrollArea.displayName = "ScrollArea"

export const ScrollAreaViewport = React.forwardRef<HTMLDivElement, Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("w-full h-full overflow-auto", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ScrollAreaViewport.displayName = "ScrollAreaViewport"

export const ScrollAreaThumb = React.forwardRef<HTMLDivElement, Props>(
  ({ className, ...props }, ref) => {
    // Thumb is decorative here — consumers may style via className
    return (
      <div
        ref={ref}
        className={cn("bg-muted rounded-full", className)}
        {...props}
      />
    )
  }
)
ScrollAreaThumb.displayName = "ScrollAreaThumb"

export const ScrollAreaScrollbar = React.forwardRef<HTMLDivElement, Props>(
  ({ className, ...props }, ref) => {
    // Simple placeholder scrollbar container for layout compatibility
    return (
      <div
        ref={ref}
        className={cn("absolute right-0 top-0 h-full w-2", className)}
        {...props}
      />
    )
  }
)
ScrollAreaScrollbar.displayName = "ScrollAreaScrollbar"

export const ScrollAreaCorner = React.forwardRef<HTMLDivElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("bg-background", className)}
        {...props}
      />
    )
  }
)
ScrollAreaCorner.displayName = "ScrollAreaCorner"

