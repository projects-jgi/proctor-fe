import React from 'react'
import TanstackProvider from './TanstackProvider'
import WebsiteThemeProvider from './WebsiteThemeProvider'
import ReduxWrapper from './ReduxWrapper'

function ApplicationWrapper({ children }: { children: React.ReactNode }) {
    return (
        <ReduxWrapper>
            <TanstackProvider>
                <WebsiteThemeProvider>
                    { children }
                </WebsiteThemeProvider>
            </TanstackProvider>
        </ReduxWrapper>
    )
}

export default ApplicationWrapper