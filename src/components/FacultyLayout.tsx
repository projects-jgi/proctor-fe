"use client";

import { FacultySidebar } from "@/components/FacultySidebar";
import Topbar from "@/containers/student/Topbar";

interface FacultyLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export function FacultyLayout({ children, title, subtitle }: FacultyLayoutProps) {
  return (
    <>
      <Topbar />
      <FacultySidebar />
      <div className="pl-64 pt-16 min-h-screen bg-background">
        {/* Page Header */}
        {(title || subtitle) && (
          <div className="bg-card border-b border-border px-8 pt-6 pb-6">
            <div className="max-w-7xl mx-auto">
              {title && <h1 className="text-3xl font-bold text-foreground">{title}</h1>}
              {subtitle && <p className="mt-2 text-lg text-muted-foreground">{subtitle}</p>}
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-8 py-6">
          {children}
        </main>
      </div>
    </>
  );
}