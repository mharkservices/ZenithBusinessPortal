import { Link } from "wouter";
import { CheckIcon } from "lucide-react";

interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  link: string;
}

interface ServiceCardProps {
  service: ServiceItem;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <Link href={service.link} className="block">
      <div className="service-card bg-white rounded-lg shadow-md hover:shadow-lg p-6 transition-all duration-300 hover:border-primary hover:border cursor-pointer h-full">
        <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
          <i className={`${service.icon} text-primary text-2xl`}></i>
        </div>
        <h3 className="font-poppins font-semibold text-xl mb-3">{service.title}</h3>
        <p className="text-[#6c757d] mb-5">{service.description}</p>
        <ul className="mb-6 space-y-2">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckIcon className="text-accent mr-2 mt-1 h-4 w-4 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <div className="text-primary font-medium hover:text-accent transition-colors duration-200 inline-flex items-center mt-auto">
          Learn more
          <i className="ri-arrow-right-line ml-1"></i>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
