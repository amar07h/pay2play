import React from "react";
import AdminSidebar from "./AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

type AdminLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen gaming-gradient flex w-full">
        <AdminSidebar />
        <div className="flex-1 p-6 md:p-8 pb-24 md:pb-8 overflow-x-hidden">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
