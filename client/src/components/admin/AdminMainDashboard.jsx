import {
  FileText,
  User,
  Box,
  Activity,
} from "lucide-react";
import { StatCard } from "@/components/admin/StatCard";
import { QuickActions, RecentActivity, SystemPerformance } from "@/components/admin/DashboardWidgets";

const AdminMainDashboard = () => {
  const statCardsData = [
    { title: "Total Users", value: "1,234", change: "+12% from last month", icon: <User className="h-5 w-5 text-blue-500"/>, iconBgColor: "bg-blue-100" },
    { title: "Active Services", value: "45", change: "+3 from last month", icon: <Box className="h-5 w-5 text-green-500"/>, iconBgColor: "bg-green-100" },
    { title: "Content Pages", value: "89", change: "+8 from last month", icon: <FileText className="h-5 w-5 text-yellow-500"/>, iconBgColor: "bg-yellow-100" },
    { title: "System Health", value: "99.9%", change: "Online from last month", icon: <Activity className="h-5 w-5 text-red-500"/>, iconBgColor: "bg-red-100" },
  ]

  return (
    <>
      <div
        className="w-full p-6 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg shadow-md text-white mb-6"
      >
        <h1 className="text-2xl font-bold">Welcome to ZenithFilings Admin</h1>
        <p className="mt-1">Manage your platform with comprehensive administrative controls</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {statCardsData.map(card => <StatCard key={card.title} {...card} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-1">
              <QuickActions />
          </div>
          <div className="lg:col-span-2">
              <RecentActivity />
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SystemPerformance/>
      </div>
    </>
  );
};

export default AdminMainDashboard; 