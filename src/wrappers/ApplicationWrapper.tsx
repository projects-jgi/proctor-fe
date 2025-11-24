import React from "react";
import TanstackProvider from "./TanstackProvider";
import WebsiteThemeProvider from "./WebsiteThemeProvider";
import ReduxWrapper from "./ReduxWrapper";
import Init from "@/components/init/Init";

function ApplicationWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ReduxWrapper>
      <TanstackProvider>
        <WebsiteThemeProvider>
          {children}
          <Init />
        </WebsiteThemeProvider>
      </TanstackProvider>
    </ReduxWrapper>
  );
}

export default ApplicationWrapper;
