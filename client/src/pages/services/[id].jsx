import { useState, useEffect, useCallback, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useRoute } from 'wouter';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowLeft, FileText, Clock, DollarSign, Shield } from "lucide-react";
import FeedbackForm from '@/components/ui/feedback-form';
import api from '@/lib/axios';
import { useToast } from "@/hooks/use-toast";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const ServiceDetail = () => {
  // Try to match the more specific route first (with subservice)
  const [, paramsWithSubService] = useRoute('/services/:serviceName/:subServiceName/:filingName');
  // Try to match the less specific route (without subservice)
  const [, paramsWithoutSubService] = useRoute('/services/:serviceName/:filingName');
  
  // Use the params that match
  const params = paramsWithSubService || paramsWithoutSubService;
  const { serviceName, subServiceName, filingName } = params || {};
  
  console.log('🔍 Service Name:', serviceName);
  console.log('🔍 Sub Service Name:', subServiceName);
  console.log('🔍 Filing Name:', filingName);
  
  const [service, setService] = useState(null);
  const [subService, setSubService] = useState(null);
  const [filing, setFiling] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const isFetchingRef = useRef(false);
  
  const fetchFilingDetails = useCallback(async (serviceId, subServiceId, currentFilingName) => {
    if (!currentFilingName) return;
    console.log('📄 fetchFilingDetails called with:', { serviceId, subServiceId, currentFilingName });
    
    try {
      let endpoint = '';
      if (subServiceId) {
        endpoint = `/services/${serviceId}/sub-services/${subServiceId}/filings`;
      } else {
        endpoint = `/services/${serviceId}/filings`;
      }
      
      console.log('📡 Fetching filings from endpoint:', endpoint);
      const response = await api.get(endpoint);
      const filings = response.data;
      console.log('📦 Filings fetched:', filings.length);
      
      const filingData = filings.find(f => 
        f.title.toLowerCase().replace(/\s+/g, '-') === currentFilingName
      );
      
      if (filingData) {
        setFiling(filingData);
      } else {
        toast({ title: "Error", description: "Filing not found", variant: "destructive" });
      }
    } catch (error) {
      console.error('❌ Error in fetchFilingDetails:', error);
      toast({ title: "Error", description: "Failed to fetch filing details", variant: "destructive" });
    }
  }, [toast]);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      if (!serviceName || isFetchingRef.current) {
        return;
      }

      console.log('🔄 Starting fetchServiceDetails with params:', { serviceName, subServiceName, filingName });
      
      try {
        isFetchingRef.current = true;
        setLoading(true);

        const servicesResponse = await api.get('/services');
        const allServices = servicesResponse.data;

        const serviceData = allServices.find(s => 
          s.name.toLowerCase().replace(/\s+/g, '-') === serviceName
        );

        if (!serviceData) {
          toast({ title: "Error", description: "Service not found", variant: "destructive" });
          return;
        }
        
        setService(serviceData);

        let subServiceData;
        if (subServiceName && serviceData.subServices) {
          subServiceData = serviceData.subServices.find(ss => 
            ss.name.toLowerCase().replace(/\s+/g, '-') === subServiceName
          );
          if (subServiceData) {
            setSubService(subServiceData);
          }
        }

        if (filingName) {
          const serviceId = serviceData.id;
          const subServiceId = subServiceData ? subServiceData.id : null;
          await fetchFilingDetails(serviceId, subServiceId, filingName);
        }
        
      } catch (error) {
        console.error('❌ Error in fetchServiceDetails:', error);
        toast({ title: "Error", description: "Failed to fetch service details", variant: "destructive" });
      } finally {
        setLoading(false);
        isFetchingRef.current = false;
      }
    };

    fetchServiceDetails();
  }, [serviceName, subServiceName, filingName, toast, fetchFilingDetails]);


  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-3/4 mb-6"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-10"></div>
          <div className="h-40 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-60 bg-gray-200 rounded"></div>
            <div className="h-60 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
        <p className="mb-8">The service you are looking for does not exist.</p>
        <Link href="/services">
          <Button>Back to Services</Button>
        </Link>
      </div>
    );
  }

  // Helper to format names for URL slugs
  const toSlug = (name) => name.toLowerCase().replace(/\s+/g, '-');

  return (
    <>
      <Helmet>
        <title>{filing ? filing.title : (subService ? `${subService.name} - ${service.name}` : service.name)} | Zenithfilings</title>
        <meta name="description" content={filing ? filing.description : `Professional ${service.name} services by Zenithfilings. ${service.description || 'Expert business services to help your company grow.'}`} />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">ZenithFilings</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/services">Services</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {subService && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    {/* This link might need adjustment depending on how you want to navigate to sub-service lists */}
                    <Link href={`/services`}>{service.name}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{filing ? filing.title : service.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        {filing ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Column */}
            <div>
              {filing.filePath && (
                <img 
                  src={`http://localhost:5002${filing.filePath}`} 
                  alt={filing.title}
                  className="w-full rounded-lg shadow-lg mb-8"
                />
              )}
              {filing.documents && filing.documents.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Documents Required</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2">
                      {filing.documents.map(doc => (
                        <li key={doc.id}>{doc.name}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
            {/* Right Column */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{filing.title}</h1>
              <p className="text-lg text-gray-600 mb-8">{filing.description}</p>
              
              <div className="flex flex-wrap gap-4">
                <Button size="lg">Get Started</Button>
                <Button size="lg" variant="outline">Contact Us</Button>
              </div>
            </div>
          </div>
        ) : (
          // Fallback for when no filing is selected
          <div className="py-12 md:py-20">
            <h1 className="text-4xl font-bold mb-6">{service.name}</h1>
            <p className="text-xl mb-8">{service.description || 'Professional service to help your business grow.'}</p>
            
            {subService && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{subService.name}</h2>
                <p className="text-gray-600">{subService.description}</p>
              </div>
            )}
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg">Get Started</Button>
              <Button size="lg" variant="outline">Contact Us</Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ServiceDetail; 