import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "./_components/app-sidebar";
import { Navbar } from "./_components/navbar";

interface LayoutDashboardProps {
  children: React.ReactNode;
}

const LayoutDashboard: React.FC<LayoutDashboardProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-w-0">
        <Navbar />
        <div className="flex-1 p-4 md:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default LayoutDashboard;
