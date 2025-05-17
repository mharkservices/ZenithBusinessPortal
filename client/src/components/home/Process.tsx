import { Link } from "wouter";

const processSteps = [
  {
    step: 1,
    title: "Consultation",
    description: "Discuss your business needs with our expert consultants to determine the best service package."
  },
  {
    step: 2,
    title: "Document Submission",
    description: "Provide the necessary information and documents through our secure online portal."
  },
  {
    step: 3,
    title: "Service Delivery",
    description: "Our team processes your request and delivers the completed service within the promised timeframe."
  }
];

const Process = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <span className="section-subheading">How It Works</span>
          <h2 className="section-heading">Simple Process, Exceptional Results</h2>
          <p className="section-description">
            Our streamlined process makes business services hassle-free so you can focus on what's important.
          </p>
        </div>

        <div className="relative">
          {/* Desktop Process Line */}
          <div className="hidden md:block absolute left-0 right-0 top-1/2 h-0.5 bg-primary/20 -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {processSteps.map((step) => (
              <div key={step.step} className="relative z-10">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary text-white text-2xl font-bold mb-4 md:mb-6">
                    {step.step}
                  </div>
                  <h3 className="font-poppins font-semibold text-xl text-center mb-3">{step.title}</h3>
                  <p className="text-[#6c757d] text-center">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 md:mt-16 text-center">
          <Link href="/contact" 
            className="bg-accent text-white px-6 py-3 rounded-md font-medium hover:bg-accent/90 transition-colors duration-200 inline-flex items-center">
            Get Started Today
            <i className="ri-arrow-right-line ml-1"></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Process;
