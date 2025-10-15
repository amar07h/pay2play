"use client";
import React, { useState } from "react";
import {
  LogOut,
  Settings,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
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
} from "@/components/ui/sidebar";
import { redirect, usePathname } from "next/navigation";
const AdminSidebar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const mainMenuItems = [
    {
      title: "Dashboard",
      url: "/admin",
    },
    {
      title: "categories Manger",
      url: "/admin/categories-manger",
    },
    {
      title: "add categories",
      url: "/admin/categories",
    },
    {
      title: "add subcategories",
      url: "/admin/subcategories",
    },

    {
      title: "Add Product",
      url: "/admin/add-product",
    },
  ];

  const contentMenuItems = [
    {
      title: "product option ",
      url: "/admin/products-options",
    },

    {
      title: "Add Category",
      url: "/admin/add-category",
    },
    {
      title: "Wishlist",
      url: "/admin/wishlist",
    },
  ];

  const handleNavigate = (url: string) => {
    redirect(url);
  };

  // Desktop sidebar
  const desktopSidebar = (
    <Sidebar variant="inset" className="z-50 h-screen md:mt-24">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            <span className="text-gaming-cyan font-bold text-2xl pb-8">
              ADMIN CONTROL
            </span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={pathname === item.url}
                    onClick={() => handleNavigate(item.url)}
                    tooltip={item.title}
                    className="hover:bg-gaming-cyan-glow text-xl font-bold data-[active=true]:bg-gaming-cyan/20 data-[active=true]:text-gaming-cyan"
                  >
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            <span className="text-gaming-cyan font-bold text-2xl pb-6">
              CONTENT
            </span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {contentMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={pathname === item.url}
                    onClick={() => handleNavigate(item.url)}
                    tooltip={item.title}
                    className="hover:bg-gaming-cyan-glow text-xl font-bold data-[active=true]:bg-gaming-cyan/20 data-[active=true]:text-gaming-cyan"
                  >
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            <span className="text-gaming-cyan font-bold text-2xl">SUPPORT</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Settings"
                  className="hover:bg-gaming-cyan-glow text-xl font-bold"
                >
                  <Settings />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-red-400 hover:text-red-300">
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );

  // Mobile bottom navigation bar
  const mobileNavigation = (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gaming-darker border-t border-gaming-cyan/20">
      <div className="flex justify-between items-center px-3 py-2">
        {mainMenuItems.map((item) => (
          <button
            key={item.title}
            onClick={() => handleNavigate(item.url)}
            className={`flex flex-col items-center gap-1 p-2 rounded-md ${
              pathname === item.url ? "text-gaming-cyan" : "text-gray-400"
            }`}
          >
            <span className="text-[10px]">{item.title}</span>
          </button>
        ))}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex flex-col items-center gap-1 p-2 rounded-md text-gray-400"
        >
          {mobileMenuOpen ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          <span className="text-[10px]">More</span>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="bg-gaming-darker border-t border-gaming-cyan/10 p-4 animate-fade-in">
          <div className="grid grid-cols-2 gap-4">
            {[
              ...contentMenuItems,
              { title: "Settings", url: "#", icon: Settings },
              { title: "Help", url: "#", icon: HelpCircle },
            ].map((item) => (
              <button
                key={item.title}
                onClick={() => handleNavigate(item.url)}
                className={`flex items-center gap-2 p-3 rounded-md ${
                  pathname === item.url
                    ? "bg-gaming-cyan/20 text-gaming-cyan"
                    : "bg-gaming-dark/50 text-gray-300 hover:bg-gaming-dark"
                }`}
              >
                <span className="text-sm">{item.title}</span>
              </button>
            ))}
          </div>
          <button
            onClick={() => redirect("/login")}
            className="w-full mt-4 flex items-center justify-center gap-2 p-3 rounded-md bg-red-500/10 text-red-400 hover:bg-red-500/20"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="hidden md:block ">{desktopSidebar}</div>
      {mobileNavigation}
    </>
  );
};

export default AdminSidebar;
