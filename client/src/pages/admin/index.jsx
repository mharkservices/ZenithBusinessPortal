import { useState } from "react";
import { Helmet } from "react-helmet";

import { Sidebar } from "@/components/admin/Sidebar";
import { DashboardHeader } from "@/components/admin/DashboardHeader";
import AdminMainDashboard from "@/components/admin/AdminMainDashboard";
import ServiceManagement from "./ServiceManager";
import UserManagement from "./UserManagement";
import Analytics from "./Analytics";


const AdminDashboard = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  const renderContent = () => {
    switch (activePage) {
      case "Dashboard":
        return <AdminMainDashboard />;
      case "User Management":
        return <UserManagement />;
      case "Service Management":
        return <ServiceManagement />;
      case "Analytics":
        return <Analytics />;
      // Add cases for other pages
      default:
        return <AdminMainDashboard />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Zenithfilings</title>
        <meta
          name="description"
          content="Admin dashboard for Zenithfilings."
        />
      </Helmet>
      <div className="flex h-screen bg-gray-100 font-sans">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          toggleSidebar={toggleSidebar}
          activePage={activePage}
          setActivePage={setActivePage}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;


