import { Link } from "wouter";
import ServiceCard from "@/components/ui/service-card";
import { services } from "@/data/services";

const Services = () => {
  return (
    <section id="services" className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <span className="section-subheading">Our Expertise</span>
          <h2 className="section-heading">Comprehensive Business Services</h2>
          <p className="section-description">
            We provide end-to-end business solutions to help you start, manage, and grow your business successfully.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="text-center mt-10 md:mt-12">
          <Link href="/services"
            className="inline-flex items-center justify-center bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors duration-200">
            View All Services
            <i className="ri-arrow-right-line ml-1"></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
