import { Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const DashboardHeader = () => (
  <header className="flex items-center justify-between bg-white p-4 shadow-sm sticky top-0 z-10">
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      <Input placeholder="Search..." className="pl-10 w-64 md:w-96" />
    </div>
    <div className="flex items-center space-x-4">
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-6 w-6" />
        <span className="absolute top-1 right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
      </Button>
    </div>
  </header>
); 