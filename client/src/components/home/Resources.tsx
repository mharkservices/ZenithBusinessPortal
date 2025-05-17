import { Link } from "wouter";
import ResourceCard from "@/components/ui/resource-card";

const resources = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=340&q=80",
    category: "Tax Planning",
    title: "GST Filing: A Complete Guide for Businesses",
    description: "Learn about GST return filing process, due dates, and compliance requirements to ensure your business stays tax compliant.",
    link: "/resources/gst-filing-guide"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=340&q=80",
    category: "Business Formation",
    title: "Private Limited vs. LLP: Choosing the Right Business Structure",
    description: "Understand the differences between Private Limited Company and Limited Liability Partnership to make the best choice for your business.",
    link: "/resources/private-limited-vs-llp"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=340&q=80",
    category: "Legal",
    title: "Startup India Registration: Benefits and Process",
    description: "Learn how to register under the Startup India initiative and access government benefits, tax exemptions, and funding opportunities.",
    link: "/resources/startup-india-guide"
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
