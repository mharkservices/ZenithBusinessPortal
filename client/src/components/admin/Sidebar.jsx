import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  BarChart2,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const NavItem = ({ icon, text, active, isCollapsed, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center p-3 rounded-md text-sm font-medium w-full text-left ${
      active
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    } ${isCollapsed ? "justify-center" : ""}`}
  >
    {icon}
    {!isCollapsed && <span className="ml-4">{text}</span>}
  </button>
);

export const Sidebar = ({ isCollapsed, toggleSidebar, activePage, setActivePage }) => {
  const navItems = [
    { id: "Dashboard", icon: <LayoutDashboard />, text: "Dashboard" },
    { id: "User Management", icon: <Users />, text: "User Management" },
    { id: "Service Management", icon: <Briefcase />, text: "Service Management" },
    // { id: "Content Management", icon: <FileText />, text: "Content Management" },
    { id: "Analytics", icon: <BarChart2 />, text: "Analytics" },
    { id: "Settings", icon: <Settings />, text: "Settings" },
  ];

  return (
    <aside
      className={`bg-gray-900 text-white ${
        isCollapsed ? "w-20" : "w-64"
      } flex flex-col transition-all duration-300 ease-in-out h-screen sticky top-0`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        {!isCollapsed && <span className="text-xl font-bold">ZenithFilings</span>}
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-white hover:bg-gray-700">
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>
      <nav className="flex-1 p-2 space-y-2">
        {navItems.map(item => (
            <NavItem 
                key={item.id}
                icon={item.icon} 
                text={item.text} 
                active={activePage === item.id}
                isCollapsed={isCollapsed}
                onClick={() => setActivePage(item.id)}
            />
        ))}
      </nav>
      <div className="p-4 border-t border-gray-800">
        <div className={`flex items-center ${isCollapsed ? "justify-center" : ""}`}>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="Admin" />
            <AvatarFallback>SA</AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="ml-3">
              <p className="font-semibold">Super Admin</p>
              <p className="text-xs text-gray-400">admin@zenithfilings.com</p>
            </div>
          )}
        </div>
        <Button variant="ghost" className="w-full justify-start mt-4 text-gray-300 hover:bg-gray-700 hover:text-white">
          <LogOut className={`h-5 w-5 ${!isCollapsed ? "mr-2" : ""}`} />
          {!isCollapsed && "Sign Out"}
        </Button>
      </div>
    </aside>
  )
}; 