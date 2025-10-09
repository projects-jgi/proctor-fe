import React from 'react'
import TanstackProvider from './TanstackProvider'
import WebsiteThemeProvider from './WebsiteThemeProvider'

function ApplicationWrapper({ children }: { children: React.ReactNode }) {
    return (
        <TanstackProvider>
            <WebsiteThemeProvider>
                { children }
            </WebsiteThemeProvider>
        </TanstackProvider>
    )
}

export default ApplicationWrapper