import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full h-full dark:bg-background bg-background">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
