import { useState } from "react";
import { Link } from "wouter";
import { CheckIcon, XIcon } from "lucide-react";

const pricingPlans = {
  monthly: [
    {
      id: "starter",
      name: "Startup",
      description: "Perfect for small businesses and startups",
      price: "₹7,999",
      period: "/service",
      features: [
        { name: "Company registration basics", included: true },
        { name: "GST registration", included: true },
        { name: "Basic tax compliance", included: true },
        { name: "Email support", included: true },
        { name: "Priority processing", included: false },
        { name: "Dedicated account manager", included: false }
      ],
      popular: false
    },
    {
      id: "business",
      name: "Business",
      description: "For growing businesses with multiple needs",
      price: "₹14,999",
      period: "/service",
      features: [
        { name: "All Startup features", included: true },
        { name: "Comprehensive compliance", included: true },
        { name: "Business license assistance", included: true },
        { name: "Priority processing", included: true },
        { name: "Phone & email support", included: true },
        { name: "Full legal document package", included: false }
      ],
      popular: true
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "Complete solution for established businesses",
      price: "₹24,999",
      period: "/service",
      features: [
        { name: "All Business features", included: true },
        { name: "Dedicated account manager", included: true },
        { name: "Full legal document package", included: true },
        { name: "Advanced tax planning", included: true },
        { name: "24/7 emergency support", included: true },
        { name: "Quarterly business reviews", included: true }
      ],
      popular: false
    }
  ],
  annual: [
    {
      id: "starter-annual",
      name: "Startup",
      description: "Perfect for small businesses and startups",
      price: "₹5,999",
      period: "/service/month",
      features: [
        { name: "Company registration basics", included: true },
        { name: "GST registration", included: true },
        { name: "Basic tax compliance", included: true },
        { name: "Email support", included: true },
        { name: "Priority processing", included: false },
        { name: "Dedicated account manager", included: false }
      ],
      popular: false
    },
    {
      id: "business-annual",
      name: "Business",
      description: "For growing businesses with multiple needs",
      price: "₹11,999",
      period: "/service/month",
      features: [
        { name: "All Startup features", included: true },
        { name: "Comprehensive compliance", included: true },
        { name: "Business license assistance", included: true },
        { name: "Priority processing", included: true },
        { name: "Phone & email support", included: true },
        { name: "Full legal document package", included: false }
      ],
      popular: true
    },
    {
      id: "enterprise-annual",
      name: "Enterprise",
      description: "Complete solution for established businesses",
      price: "₹19,999",
      period: "/service/month",
      features: [
        { name: "All Business features", included: true },
        { name: "Dedicated account manager", included: true },
        { name: "Full legal document package", included: true },
        { name: "Advanced tax planning", included: true },
        { name: "24/7 emergency support", included: true },
        { name: "Quarterly business reviews", included: true }
      ],
      popular: false
    }
  ]
};

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");

  return (
    <section id="pricing" className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <span className="section-subheading">Pricing Plans</span>
          <h2 className="section-heading">Transparent Pricing, No Hidden Fees</h2>
          <p className="section-description">
            Choose the right package for your business needs with our flexible pricing options.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center bg-[#f5f5f5] p-1 rounded-full">
            <button 
              className={`px-4 py-2 rounded-full ${billingPeriod === "monthly" ? "bg-primary text-white" : "text-dark"}`}
              onClick={() => setBillingPeriod("monthly")}
            >
              Monthly
            </button>
            <button 
              className={`px-4 py-2 rounded-full ${billingPeriod === "annual" ? "bg-primary text-white" : "text-dark"}`}
              onClick={() => setBillingPeriod("annual")}
            >
              Annual (Save 20%)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans[billingPeriod].map((plan) => (
            <div 
              key={plan.id} 
              className={`bg-white border ${plan.popular ? "border-2 border-primary" : "border-[#f5f5f5]"} rounded-lg ${plan.popular ? "shadow-md" : "shadow-sm hover:shadow-md"} transition-shadow duration-300 overflow-hidden ${plan.popular ? "relative transform scale-105 md:scale-105 z-10" : ""}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-accent text-white text-xs font-bold px-3 py-1">
                  POPULAR
                </div>
              )}
              <div className="p-6 border-b border-[#f5f5f5]">
                <h3 className="font-poppins font-semibold text-xl mb-2 text-dark">{plan.name}</h3>
                <p className="text-[#6c757d] mb-4">{plan.description}</p>
                <div className="flex items-end mb-4">
                  <span className="text-3xl font-bold text-primary">{plan.price}</span>
                  <span className="text-[#6c757d] ml-1">{plan.period}</span>
                </div>
                <Link href={`/contact?plan=${plan.id}`}
                  className={`block w-full ${plan.popular ? "bg-accent text-white hover:bg-accent/90" : "bg-[#f5f5f5] text-primary hover:bg-primary hover:text-white"} text-center py-2 rounded-md font-medium transition-colors duration-200`}
                >
                  Choose Plan
                </Link>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className={`flex items-start ${feature.included ? "" : "text-[#6c757d]"}`}>
                      {feature.included ? (
                        <CheckIcon className="text-accent mr-2 mt-1 h-4 w-4" />
                      ) : (
                        <XIcon className="mr-2 mt-1 h-4 w-4" />
                      )}
                      <span>{feature.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-[#6c757d] mb-4">Need a custom solution? We offer tailored packages for specific business needs.</p>
          <Link href="/contact" className="text-primary font-medium hover:text-accent transition-colors duration-200">
            Contact us for custom pricing
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
