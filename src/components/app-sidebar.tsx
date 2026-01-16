import { Calendar, Home, Inbox, LogOut } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router";
import { useAuth } from "@/contexts/useAuth";

type LinkItem = {
  type: "link";
  title: string;
  icon: React.ComponentType;
  url: string;
};

type ActionItem = {
  type: "action";
  title: string;
  icon: React.ComponentType;
  action: "logout";
};

type NavItem = LinkItem | ActionItem;

const items: NavItem[] = [
  {
    type: "link",
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    type: "link",
    title: "Inbox",
    url: "/dashboard/inbox",
    icon: Inbox,
  },
  {
    type: "link",
    title: "Board",
    url: "/dashboard/board",
    icon: Calendar,
  },
  {
    type: "action",
    title: "Logout",
    icon: LogOut,
    action: "logout",
  },
];

export function AppSidebar() {
  const { logout } = useAuth();
  const handleLogout: () => Promise<void> = async () => {
    try {
      console.log("Session ended");
      await logout();
    } catch (error) {
      console.error("Could not sign up using credentials", error);
    }
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Upscaler</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    {item.action === "logout" ? (
                      <button key={item.title} onClick={handleLogout}>
                        <span>{item.title}</span>
                      </button>
                    ) : (
                      <Link key={item.title} to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
