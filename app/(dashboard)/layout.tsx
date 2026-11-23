import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "./_components/app-sidebar";

interface LayoutDashboardProps {
  children: React.ReactNode;
}

const LayoutDashboard: React.FC<LayoutDashboardProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar>Sidebar Content</AppSidebar>
      <SidebarTrigger />
    </SidebarProvider>
  );
};

export default LayoutDashboard;
