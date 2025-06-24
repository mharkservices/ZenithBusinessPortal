import { Helmet } from 'react-helmet';
import { services } from "@/data/services";
import { useState, useEffect } from "react";
import ServiceCard from "@/components/ui/service-card";
import ServiceItem from "@/components/ui/service-item";
import { Link, useLocation } from "wouter";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const Services = () => {
  const [service, setService] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [selectedSubService, setSelectedSubService] = useState("");
  const { toast } = useToast();
  const [filings, setFilings] = useState([]);
  const [selectedFiling, setSelectedFiling] = useState(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('/api/services');
      setService(response.data);
      console.log(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch services",
        variant: "destructive"
      });
    }
  };

  const handleServiceSelect = (serviceId, subServiceId = null) => {
    setSelectedService(serviceId);
    setSelectedSubService(subServiceId || "");
    setSelectedFiling(null); // Reset selected filing when service changes
  };

  const handleFilingClick = (filing) => {
    setSelectedFiling(filing);
    
    // Find the service and subservice names for URL
    const selectedServiceData = service.find(s => s.id === parseInt(selectedService));
    let url = '';
    
    if (selectedServiceData) {
      if (selectedSubService) {
        // Service has subservice: /services/service-name/subservice-name/filing-title
        const selectedSubServiceData = selectedServiceData.subServices?.find(
          ss => ss.id === parseInt(selectedSubService)
        );
        if (selectedSubServiceData) {
          url = `/services/${selectedServiceData.name.toLowerCase().replace(/\s+/g, '-')}/${selectedSubServiceData.name.toLowerCase().replace(/\s+/g, '-')}/${filing.title.toLowerCase().replace(/\s+/g, '-')}`;
        }
      } else {
        // Service has no subservice: /services/service-name/filing-title
        url = `/services/${selectedServiceData.name.toLowerCase().replace(/\s+/g, '-')}/${filing.title.toLowerCase().replace(/\s+/g, '-')}`;
      }
    }
    
    if (url) {
      setLocation(url);
    }
  };

  useEffect(() => {
    const fetchFilings = async () => {
      const selected = service.find(s => s.id === parseInt(selectedService));
  
      if (!selectedService || (selected?.subServices?.length > 0 && !selectedSubService)) {
        setFilings([]); // wait for subservice to be selected if needed
        return;
      }

      let endpoint = '';

      if (selectedService && selectedSubService) {
        // Service has subservice
        endpoint = `/api/services/${selectedService}/sub-services/${selectedSubService}/filings`;
      } else if (selectedService) {
        // Service has no subservice
        endpoint = `/api/services/${selectedService}/filings`;
      }
  
      try {
        const response = await axios.get(endpoint);
        setFilings(response.data);
        console.log('Fetched filings:', response.data);
        toast({
          title: "Success",
          description: "Filings fetched successfully",
          variant: "success",
        });
      } catch (error) {
        console.error('Error fetching filings:', error);
        toast({
          title: "Error",
          description: "Failed to fetch filings",
          variant: "destructive",
        });
      }
    };
    console.log(`filings`,filings);
  
    fetchFilings();
  }, [selectedService, selectedSubService, service]);

  return (
    <>
      <Helmet>
        <title>Our Services - Zenithfilings</title>
        <meta name="description" content="Explore our comprehensive business services including company registration, tax filing, trademark registration, and more." />
      </Helmet>
      <main>
        {/* Hero Section */}
        <section className="bg-primary py-16 md:py-20">
          <div className="container-custom">
            <div className="max-w-2xl">
              <h1 className="font-poppins font-bold text-3xl md:text-4xl text-white mb-4">
                Comprehensive Business Services
              </h1>
              <p className="text-white/90 text-lg mb-6">
                From company registration to compliance, we provide all the services your business needs to thrive.
              </p>
              <Link href="/contact"
                className="bg-accent text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-accent transition-colors duration-200 inline-flex items-center">
                Get Started
                <i className="ri-arrow-right-line ml-1"></i>
              </Link>
            </div>
          </div>
        </section>

        {/* Services and Filings Section */}
        <div className="container-custom py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">Select Service</h3>
                  <p className="text-sm text-gray-600 mt-1">Choose a service to view available filings</p>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {service.length > 0 ? (
                    service.map((serviceItem) => (
                      <ServiceItem
                        key={serviceItem.id}
                        service={serviceItem}
                        onSelect={handleServiceSelect}
                        selectedService={selectedService}
                        selectedSubService={selectedSubService}
                      />
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      Loading services...
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {selectedService ? (
                filings.length > 0 ? (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Available Filings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filings.map((filing) => (
                        <div 
                          key={filing.id} 
                          className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-lg hover:border-primary hover:border cursor-pointer transition-all duration-200"
                          onClick={() => handleFilingClick(filing)}
                        >
                          <h4 className="font-semibold text-lg mb-2">{filing.title}</h4>
                          <p className="text-gray-600 mb-3">{filing.description}</p>
                          {filing.filePath && (
                            <div className="mb-3">
                              {filing.filePath.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                                <div>
                                  <p className="text-sm font-medium text-gray-700 mb-2">Attached Image:</p>
                                  <img 
                                    src={`http://localhost:5002${filing.filePath}`}
                                    alt={filing.title}
                                    className="w-full h-32 object-cover rounded-lg border"
                                    onError={(e) => {
                                      e.target.style.display = 'none';
                                      e.target.nextSibling.style.display = 'block';
                                    }}
                                  />
                                  <p className="text-sm text-red-500 hidden">Failed to load image</p>
                                </div>
                              ) : (
                                <p className="text-sm text-blue-600 mb-2">
                                  📎 File attached: {filing.filePath.split('/').pop()}
                                </p>
                              )}
                            </div>
                          )}
                          {filing.documents && filing.documents.length > 0 && (
                            <div className="mb-3">
                              <p className="text-sm font-medium text-gray-700 mb-1">Required Documents:</p>
                              <ul className="text-sm text-gray-600">
                                {filing.documents.map((doc, index) => (
                                  <li key={index}>• {doc.name}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          <div className="text-xs text-gray-500">
                            Created: {new Date(filing.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-gray-500">
                      <p className="text-lg mb-2">No filings available</p>
                      <p className="text-sm">Select a different service or sub-service to view available filings.</p>
                    </div>
                  </div>
                )
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-500">
                    <p className="text-lg mb-2">Select a Service</p>
                    <p className="text-sm">Choose a service from the sidebar to view available filings.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Services Overview */}
        <section className="py-16 md:py-20">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="section-subheading">Our Expertise</span>
              <h2 className="section-heading">How We Can Help You</h2>
              <p className="section-description">
                We offer a wide range of services to support businesses at every stage of their journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </section>

        {/* Service Process */}
        <section className="py-16 md:py-20 bg-[#f5f5f5]">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="section-subheading">Our Process</span>
              <h2 className="section-heading">How We Work</h2>
              <p className="section-description">
                Our streamlined process ensures that you receive high-quality services with minimal hassle.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Process line */}
                <div className="hidden md:block absolute left-[50px] top-0 bottom-0 w-0.5 bg-primary/20"></div>
                
                {/* Process steps */}
                {[
                  {
                    title: "Initial Consultation",
                    description: "We begin with a thorough discussion to understand your specific business needs and goals."
                  },
                  {
                    title: "Customized Plan",
                    description: "Based on your needs, we create a tailored service plan with transparent pricing and timelines."
                  },
                  {
                    title: "Document Collection",
                    description: "We guide you through the necessary documentation process, making it as simple as possible."
                  },
                  {
                    title: "Service Execution",
                    description: "Our expert team completes the required filings and processes with meticulous attention to detail."
                  },
                  {
                    title: "Delivery & Support",
                    description: "We deliver the completed service and provide ongoing support to ensure your business success."
                  }
                ].map((step, index) => (
                  <div key={index} className="flex items-start mb-12 relative">
                    <div className="w-[100px] flex-shrink-0 flex justify-center">
                      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold z-10">
                        {index + 1}
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm flex-grow">
                      <h3 className="font-poppins font-semibold text-xl mb-2">{step.title}</h3>
                      <p className="text-[#6c757d]">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16 md:py-20">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-poppins font-bold text-2xl md:text-3xl text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-white/90 text-lg mb-8">
                Contact us today to discuss how we can help with your business needs.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/contact"
                  className="bg-accent text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-accent transition-colors duration-200">
                  Contact Us
                </Link>
                <Link href="/#pricing"
                  className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-primary transition-colors duration-200">
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Services;
