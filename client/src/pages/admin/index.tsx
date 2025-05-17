import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'wouter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Mock data for services
const mockServices = [
  { id: 'company-registration', title: 'Company Registration', status: 'Published' },
  { id: 'gst-registration', title: 'GST Registration', status: 'Published' },
  { id: 'tax-filing', title: 'Tax Filing Services', status: 'Published' },
  { id: 'trademark', title: 'Trademark Registration', status: 'Published' },
  { id: 'import-export', title: 'Import Export Code', status: 'Published' },
  { id: 'accounting', title: 'Accounting Services', status: 'Published' },
  { id: 'compliance', title: 'Annual Compliance', status: 'Published' },
  { id: 'startup-india', title: 'Startup India Registration', status: 'Draft' },
];

// Mock data for resources
const mockResources = [
  { id: 1, title: 'GST Filing: A Complete Guide for Businesses', status: 'Published' },
  { id: 2, title: 'Private Limited vs. LLP: Choosing the Right Business Structure', status: 'Published' },
  { id: 3, title: 'Startup India Registration: Benefits and Process', status: 'Published' },
  { id: 4, title: 'Guide to Income Tax Filing for Businesses', status: 'Draft' },
  { id: 5, title: 'Understanding TDS Compliance Requirements', status: 'Draft' },
];

// Mock data for users
const mockUsers = [
  { id: 1, name: 'Admin User', email: 'admin@zenithfilings.com', role: 'Admin' },
  { id: 2, name: 'Content Editor', email: 'editor@zenithfilings.com', role: 'Editor' },
  { id: 3, name: 'Support Staff', email: 'support@zenithfilings.com', role: 'Support' },
];

// Mock data for customer inquiries
const mockInquiries = [
  { id: 1, name: 'Rajesh Kumar', email: 'rajesh@example.com', service: 'Company Registration', status: 'New', date: '2023-05-15' },
  { id: 2, name: 'Priya Sharma', email: 'priya@example.com', service: 'GST Registration', status: 'Responded', date: '2023-05-14' },
  { id: 3, name: 'Amit Patel', email: 'amit@example.com', service: 'Tax Filing', status: 'Closed', date: '2023-05-12' },
  { id: 4, name: 'Sneha Gupta', email: 'sneha@example.com', service: 'Trademark Registration', status: 'New', date: '2023-05-10' },
];

const AdminDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('userRole');
    
    if (!loggedIn || userRole !== 'admin') {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to access the admin dashboard.',
        variant: 'destructive',
      });
      setLocation('/login');
    } else {
      setIsAuthenticated(true);
    }
    
    setIsLoading(false);
  }, [setLocation, toast]);

  const handleEdit = (type: string, id: string | number) => {
    toast({
      title: 'Edit Initiated',
      description: `Editing ${type} with ID: ${id}`,
    });
  };

  const handleDelete = (type: string, id: string | number) => {
    toast({
      title: 'Confirm Deletion',
      description: `Are you sure you want to delete this ${type}?`,
      variant: 'destructive',
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    toast({
      title: 'Logged Out',
      description: 'You have been logged out successfully.',
    });
    setLocation('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will be redirected to login in useEffect
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Zenithfilings</title>
        <meta name="description" content="Admin dashboard for content management" />
      </Helmet>

      <div className="bg-primary py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-white text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-white/80 mt-2">Manage your website content, users, and inquiries</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 gap-2 mb-8">
            <TabsTrigger value="overview" className="transition-transform hover:scale-105">Overview</TabsTrigger>
            <TabsTrigger value="services" className="transition-transform hover:scale-105">Services</TabsTrigger>
            <TabsTrigger value="resources" className="transition-transform hover:scale-105">Resources</TabsTrigger>
            <TabsTrigger value="inquiries" className="transition-transform hover:scale-105">Inquiries</TabsTrigger>
            <TabsTrigger value="users" className="transition-transform hover:scale-105">Users</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="transform hover:scale-105 transition-transform">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Services</CardTitle>
                  <CardDescription>Manage your service offerings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">{mockServices.length}</div>
                  <p className="text-sm text-gray-500">{mockServices.filter(s => s.status === 'Published').length} published</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab('services')}>
                    View All Services
                  </Button>
                </CardFooter>
              </Card>

              <Card className="transform hover:scale-105 transition-transform">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Resources</CardTitle>
                  <CardDescription>Manage your resource articles</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">{mockResources.length}</div>
                  <p className="text-sm text-gray-500">{mockResources.filter(r => r.status === 'Published').length} published</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab('resources')}>
                    View All Resources
                  </Button>
                </CardFooter>
              </Card>

              <Card className="transform hover:scale-105 transition-transform">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Users</CardTitle>
                  <CardDescription>Manage admin users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">{mockUsers.length}</div>
                  <p className="text-sm text-gray-500">Last added on May 10, 2023</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab('users')}>
                    Manage Users
                  </Button>
                </CardFooter>
              </Card>

              <Card className="transform hover:scale-105 transition-transform">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Inquiries</CardTitle>
                  <CardDescription>Customer inquiries</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">{mockInquiries.length}</div>
                  <p className="text-sm text-gray-500">{mockInquiries.filter(i => i.status === 'New').length} new inquiries</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab('inquiries')}>
                    View Inquiries
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks you might want to perform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="transition-transform hover:scale-105">Add New Service</Button>
                  <Button className="transition-transform hover:scale-105">Add New Resource</Button>
                  <Button className="transition-transform hover:scale-105">Add New User</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Services</CardTitle>
                  <CardDescription>Manage your service offerings</CardDescription>
                </div>
                <Button className="transition-transform hover:scale-105">Add New Service</Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockServices.map((service) => (
                        <tr key={service.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.title}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className={`px-2 py-1 rounded-full text-xs ${service.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                              {service.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                            <button 
                              className="text-blue-500 hover:text-blue-700 transition-transform hover:scale-105"
                              onClick={() => handleEdit('service', service.id)}
                            >
                              Edit
                            </button>
                            <button 
                              className="text-red-500 hover:text-red-700 transition-transform hover:scale-105"
                              onClick={() => handleDelete('service', service.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Resources</CardTitle>
                  <CardDescription>Manage your resource articles</CardDescription>
                </div>
                <Button className="transition-transform hover:scale-105">Add New Resource</Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockResources.map((resource) => (
                        <tr key={resource.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{resource.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{resource.title}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className={`px-2 py-1 rounded-full text-xs ${resource.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                              {resource.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                            <button 
                              className="text-blue-500 hover:text-blue-700 transition-transform hover:scale-105"
                              onClick={() => handleEdit('resource', resource.id)}
                            >
                              Edit
                            </button>
                            <button 
                              className="text-red-500 hover:text-red-700 transition-transform hover:scale-105"
                              onClick={() => handleDelete('resource', resource.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inquiries Tab */}
          <TabsContent value="inquiries">
            <Card>
              <CardHeader>
                <CardTitle>Customer Inquiries</CardTitle>
                <CardDescription>Manage and respond to customer inquiries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockInquiries.map((inquiry) => (
                        <tr key={inquiry.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{inquiry.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inquiry.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inquiry.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inquiry.service}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span 
                              className={`px-2 py-1 rounded-full text-xs 
                                ${inquiry.status === 'New' ? 'bg-blue-100 text-blue-800' : 
                                  inquiry.status === 'Responded' ? 'bg-yellow-100 text-yellow-800' : 
                                  'bg-green-100 text-green-800'}`}
                            >
                              {inquiry.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inquiry.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                            <button 
                              className="text-blue-500 hover:text-blue-700 transition-transform hover:scale-105"
                            >
                              View
                            </button>
                            <button 
                              className="text-green-500 hover:text-green-700 transition-transform hover:scale-105"
                            >
                              Respond
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Users</CardTitle>
                  <CardDescription>Manage admin users and permissions</CardDescription>
                </div>
                <Button className="transition-transform hover:scale-105">Add New User</Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              user.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 
                              user.role === 'Editor' ? 'bg-blue-100 text-blue-800' : 
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                            <button 
                              className="text-blue-500 hover:text-blue-700 transition-transform hover:scale-105"
                              onClick={() => handleEdit('user', user.id)}
                            >
                              Edit
                            </button>
                            <button 
                              className="text-red-500 hover:text-red-700 transition-transform hover:scale-105"
                              onClick={() => handleDelete('user', user.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default AdminDashboard;