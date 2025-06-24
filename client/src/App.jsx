import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import About from "@/pages/about";
import Services from "@/pages/services";
import ServiceDetail from "@/pages/services/[id]";
import Resources from "@/pages/resources";
import Contact from "@/pages/contact";
import ComplianceCalendar from "@/pages/compliance-calendar";
import AdminDashboard from "@/pages/admin";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Login from "@/pages/login";
import Registration from "@/pages/Registration";

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/services/:serviceName/:subServiceName/:filingName" component={ServiceDetail} />
      <Route path="/services/:serviceName/:filingName" component={ServiceDetail} />
      <Route path="/resources" component={Resources} />
      <Route path="/contact" component={Contact} />
      <Route path="/compliance-calendar" component={ComplianceCalendar} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/register" component={Registration} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Header />
        <Router />
        <Footer />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
