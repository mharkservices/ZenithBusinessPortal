import { Helmet } from 'react-helmet';
import { services } from "@/data/services";
import ServiceCard from "@/components/ui/service-card";
import { Link } from "wouter";

const Services = () => {
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
