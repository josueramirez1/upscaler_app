import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import * as React from "react";
import ActivePage from "../components/home-page"
import { useState } from "react";

export type Page = "Home" | "Inbox" | "Board";

export default function Page() {

const [currentPage, setCurrentPage] = useState<Page>("Home");


  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset onNavigate={setCurrentPage}>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <ActivePage page={currentPage}/>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
