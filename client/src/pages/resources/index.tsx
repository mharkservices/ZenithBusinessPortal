import { Helmet } from 'react-helmet';
import ResourceCard from "@/components/ui/resource-card";

const resourceCategories = [
  { id: "all", name: "All Resources" },
  { id: "tax", name: "Tax & Compliance" },
  { id: "formation", name: "Business Formation" },
  { id: "legal", name: "Legal" },
  { id: "accounting", name: "Accounting" },
  { id: "ip", name: "Intellectual Property" }
];

const resources = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=340&q=80",
    category: "Tax Planning",
    title: "10 Tax Planning Strategies for Small Businesses",
    description: "Learn how to minimize your tax burden legally with these effective tax planning strategies for small business owners.",
    link: "/resources/tax-planning-strategies",
    categoryId: "tax"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=340&q=80",
    category: "Business Formation",
    title: "LLC vs. Corporation: Choosing the Right Structure",
    description: "Understand the key differences between LLCs and Corporations to make the best choice for your business goals.",
    link: "/resources/llc-vs-corporation",
    categoryId: "formation"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=340&q=80",
    category: "Legal",
    title: "5 Essential Legal Documents Every Business Needs",
    description: "Protect your business with these critical legal documents that provide the foundation for smooth operations and legal protection.",
    link: "/resources/essential-legal-documents",
    categoryId: "legal"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=340&q=80",
    category: "Accounting",
    title: "Understanding Business Financial Statements",
    description: "A comprehensive guide to reading and interpreting your business financial statements to make better decisions.",
    link: "/resources/understanding-financial-statements",
    categoryId: "accounting"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=340&q=80",
    category: "Tax Compliance",
    title: "Sales Tax Nexus: What Every Business Should Know",
    description: "Navigate the complexities of sales tax compliance across different states and understand your obligations.",
    link: "/resources/sales-tax-nexus",
    categoryId: "tax"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1590402494610-2c378a9114c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=340&q=80",
    category: "Intellectual Property",
    title: "How to Protect Your Business Intellectual Property",
    description: "Learn about trademarks, copyrights, patents, and trade secrets to safeguard your business innovations and brand.",
    link: "/resources/protect-intellectual-property",
    categoryId: "ip"
  }
];

const Resources = () => {
  return (
    <>
      <Helmet>
        <title>Resources - Zenithfilings</title>
        <meta name="description" content="Explore our collection of business resources, guides, and articles to help your business succeed." />
      </Helmet>
      <main>
        {/* Hero Section */}
        <section className="bg-primary py-16 md:py-20">
          <div className="container-custom">
            <div className="max-w-2xl">
              <h1 className="font-poppins font-bold text-3xl md:text-4xl text-white mb-4">
                Business Knowledge Hub
              </h1>
              <p className="text-white/90 text-lg mb-6">
                Explore our collection of guides, articles, and resources designed to help your business thrive.
              </p>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-16 md:py-20">
          <div className="container-custom">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 mb-12 justify-center">
              {resourceCategories.map((category) => (
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    category.id === "all" ? "bg-primary text-white" : "bg-[#f5f5f5] text-[#6c757d] hover:bg-primary/10"
                  } transition-colors duration-200`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex space-x-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white">
                  1
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#f5f5f5] text-[#6c757d] hover:bg-primary/10">
                  2
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#f5f5f5] text-[#6c757d] hover:bg-primary/10">
                  3
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#f5f5f5] text-[#6c757d] hover:bg-primary/10">
                  <i className="ri-arrow-right-s-line"></i>
                </button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="py-16 md:py-20 bg-[#f5f5f5]">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-poppins font-bold text-2xl md:text-3xl mb-4">
                Stay Informed
              </h2>
              <p className="text-[#6c757d] mb-8">
                Subscribe to our newsletter to receive the latest business insights, tips, and updates.
              </p>
              <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-3 rounded-md border border-[#e0e0e0] focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors duration-200"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Resources;
