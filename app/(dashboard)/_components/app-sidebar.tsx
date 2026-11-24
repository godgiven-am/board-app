import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React from "react";

export function AppSidebar({ children }: { children?: React.ReactNode }) {
  return (
    <Sidebar>
      <SidebarHeader>Board App</SidebarHeader>
      <SidebarContent>{children}</SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
