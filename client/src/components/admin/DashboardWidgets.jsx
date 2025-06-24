import {
  ShieldCheck,
  UserPlus,
  PlusCircle,
  FileUp,
  DatabaseBackup,
  TrendingUp,
  BarChart,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const QuickActions = () => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
                <ShieldCheck className="h-5 w-5 text-gray-600"/> Quick Actions
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start"><UserPlus className="mr-2 h-4 w-4"/> Add New User</Button>
            <Button variant="outline" className="w-full justify-start"><PlusCircle className="mr-2 h-4 w-4"/> Create Service</Button>
            <Button variant="outline" className="w-full justify-start"><FileUp className="mr-2 h-4 w-4"/> Publish Content</Button>
            <Button variant="outline" className="w-full justify-start"><DatabaseBackup className="mr-2 h-4 w-4"/> System Backup</Button>
        </CardContent>
    </Card>
)

export const RecentActivity = () => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-gray-600"/> Recent Activity
            </CardTitle>
        </CardHeader>
        <CardContent>
            <ul className="space-y-4">
                <li className="flex items-start gap-3">
                    <div className="mt-1 h-3 w-3 rounded-full bg-blue-500 border-2 border-blue-200"/>
                    <div>
                        <p className="font-medium">New user registration</p>
                        <p className="text-sm text-gray-500">by John Doe • 2 minutes ago</p>
                    </div>
                </li>
                 <li className="flex items-start gap-3">
                    <div className="mt-1 h-3 w-3 rounded-full bg-green-500 border-2 border-green-200"/>
                    <div>
                        <p className="font-medium">Service updated</p>
                        <p className="text-sm text-gray-500">by Admin • 15 minutes ago</p>
                    </div>
                </li>
                 <li className="flex items-start gap-3">
                    <div className="mt-1 h-3 w-3 rounded-full bg-yellow-500 border-2 border-yellow-200"/>
                    <div>
                        <p className="font-medium">Content published</p>
                        <p className="text-sm text-gray-500">by Editor • 1 hour ago</p>
                    </div>
                </li>
                 <li className="flex items-start gap-3">
                    <div className="mt-1 h-3 w-3 rounded-full bg-gray-500 border-2 border-gray-200"/>
                    <div>
                        <p className="font-medium">System backup completed</p>
                        <p className="text-sm text-gray-500">by System • 2 hours ago</p>
                    </div>
                </li>
            </ul>
        </CardContent>
    </Card>
)

export const SystemPerformance = () => (
    <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart className="h-5 w-5 text-gray-600"/> System Performance
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-2">
            <div>
                <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">CPU Usage</span>
                    <span className="text-gray-500">45%</span>
                </div>
                <Progress value={45} />
            </div>
             <div>
                <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Memory Usage</span>
                    <span className="text-gray-500">67%</span>
                </div>
                <Progress value={67} />
            </div>
             <div>
                <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Storage Usage</span>
                    <span className="text-gray-500">34%</span>
                </div>
                <Progress value={34} />
            </div>
        </CardContent>
    </Card>
) 