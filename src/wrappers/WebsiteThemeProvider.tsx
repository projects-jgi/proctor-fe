import { ThemeProvider } from 'next-themes'
import React from 'react'

function WebsiteThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute={"class"}
            defaultTheme="system"
            disableTransitionOnChange
            enableColorScheme
        >
            {children}
        </ThemeProvider>
    )
}

export default WebsiteThemeProvider