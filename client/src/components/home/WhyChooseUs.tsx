import AdvantageCard from "@/components/ui/advantage-card";

const advantages = [
  {
    id: 1,
    icon: "ri-user-star-line",
    title: "Expert Team",
    description: "Our team consists of experienced professionals with expertise in business law, taxation, and compliance."
  },
  {
    id: 2,
    icon: "ri-timer-line",
    title: "Quick Turnaround",
    description: "We understand the value of time in business. Our streamlined processes ensure fast delivery without compromising quality."
  },
  {
    id: 3,
    icon: "ri-money-dollar-circle-line",
    title: "Competitive Pricing",
    description: "Get professional services at affordable rates with transparent pricing and no hidden fees."
  },
  {
    id: 4,
    icon: "ri-customer-service-2-line",
    title: "Dedicated Support",
    description: "We're with you at every step with personalized customer service and dedicated account managers."
  },
  {
    id: 5,
    icon: "ri-shield-check-line",
    title: "100% Compliance",
    description: "Our services ensure that your business stays compliant with all relevant laws and regulations."
  },
  {
    id: 6,
    icon: "ri-global-line",
    title: "Nationwide Service",
    description: "We serve clients across the country with expertise in state-specific requirements and regulations."
  }
];

const statistics = [
  { id: 1, value: "5000+", label: "Businesses Served" },
  { id: 2, value: "98%", label: "Client Satisfaction" },
  { id: 3, value: "15+", label: "Years Experience" },
  { id: 4, value: "50+", label: "Expert Consultants" }
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-[#f5f5f5]">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <span className="section-subheading">Why Choose Us</span>
          <h2 className="section-heading">The Zenithfilings Advantage</h2>
          <p className="section-description">
            We combine professional expertise with advanced technology to deliver exceptional business services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage) => (
            <AdvantageCard key={advantage.id} advantage={advantage} />
          ))}
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-sm p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {statistics.map((stat) => (
              <div key={stat.id} className="text-center">
                <div className="text-primary font-poppins font-bold text-4xl mb-2">{stat.value}</div>
                <p className="text-[#6c757d]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
