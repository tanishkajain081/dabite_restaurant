import { LayoutDashboard, ShoppingBag, UtensilsCrossed, TrendingUp, User, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import chefIcon from "@/assets/chef-icon.png";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Orders", url: "/orders", icon: ShoppingBag },
  { title: "Menu", url: "/menu", icon: UtensilsCrossed },
  { title: "Analytics", url: "/analytics", icon: TrendingUp },
  { title: "Profile", url: "/profile", icon: User },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const handleLogout = () => {
    // TODO: Implement actual logout
    window.location.href = "/auth";
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {/* Logo/Brand */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <img src={chefIcon} alt="Dabite" className="w-10 h-10 rounded-lg" />
            {!isCollapsed && (
              <div>
                <h2 className="font-bold text-lg text-foreground">Dabite</h2>
                <p className="text-xs text-muted-foreground">Partner Portal</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-secondary text-secondary-foreground font-medium"
                          : "hover:bg-muted/50"
                      }
                    >
                      <item.icon className="w-5 h-5" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span>Logout</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
