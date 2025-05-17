import { Link } from "wouter";
import ResourceCard from "@/components/ui/resource-card";

const resources = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=340&q=80",
    category: "Tax Planning",
    title: "10 Tax Planning Strategies for Small Businesses",
    description: "Learn how to minimize your tax burden legally with these effective tax planning strategies for small business owners.",
    link: "/resources/tax-planning-strategies"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=340&q=80",
    category: "Business Formation",
    title: "LLC vs. Corporation: Choosing the Right Structure",
    description: "Understand the key differences between LLCs and Corporations to make the best choice for your business goals.",
    link: "/resources/llc-vs-corporation"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=340&q=80",
    category: "Legal",
    title: "5 Essential Legal Documents Every Business Needs",
    description: "Protect your business with these critical legal documents that provide the foundation for smooth operations and legal protection.",
    link: "/resources/essential-legal-documents"
  }
];

const Resources = () => {
  return (
    <section id="resources" className="py-16 md:py-20 lg:py-24 bg-[#f5f5f5]">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <span className="section-subheading">Resources</span>
          <h2 className="section-heading">Business Knowledge Hub</h2>
          <p className="section-description">
            Stay informed with our latest articles, guides, and resources to help your business thrive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/resources"
            className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors duration-200 inline-flex items-center">
            View All Resources
            <i className="ri-arrow-right-line ml-1"></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Resources;
