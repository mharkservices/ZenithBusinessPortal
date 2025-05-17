import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'wouter';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

// Mock admin credentials (in a real app, this would be handled securely on the backend)
const ADMIN_EMAIL = 'admin@zenithfilings.com';
const ADMIN_PASSWORD = 'admin123';

const LoginPage = () => {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      if (data.email === ADMIN_EMAIL && data.password === ADMIN_PASSWORD) {
        // Set user as logged in (in a real app, this would set a token in localStorage or context)
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', 'admin');
        
        toast({
          title: 'Login Successful',
          description: 'You have been logged in successfully.',
        });
        
        // Redirect to admin dashboard
        setLocation('/admin');
      } else {
        toast({
          title: 'Login Failed',
          description: 'Invalid email or password. Please try again.',
          variant: 'destructive',
        });
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Login | Zenithfilings</title>
        <meta name="description" content="Log in to your Zenithfilings account to access your dashboard and services." />
      </Helmet>
      
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md shadow-lg transform transition-all hover:shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center">
              <a href="#" className="text-primary hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="text-sm text-center">
              Don't have an account?{' '}
              <a href="/register" className="text-primary hover:underline">
                Register
              </a>
            </div>

            {/* For demo purposes, showing login credentials */}
            <div className="mt-4 p-3 bg-gray-100 rounded-lg text-xs text-gray-600">
              <p className="font-semibold">Demo Credentials:</p>
              <p>Email: admin@zenithfilings.com</p>
              <p>Password: admin123</p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default LoginPage;