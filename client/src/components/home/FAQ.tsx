import { useState } from "react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Link } from "wouter";

const faqs = [
  {
    id: "faq1",
    question: "How long does the company registration process take?",
    answer: "The typical company registration process takes 5-10 business days depending on the state and entity type. Our expedited service can reduce this timeline to 2-3 business days in most states."
  },
  {
    id: "faq2",
    question: "What documents do I need to provide for tax filing services?",
    answer: "For tax filing services, you typically need to provide income statements, expense records, previous tax returns, business bank statements, and any relevant tax-deductible expense documentation. Our checklist will guide you through the specific requirements for your business type."
  },
  {
    id: "faq3",
    question: "Do you offer services for international businesses?",
    answer: "Yes, we offer specialized services for international businesses looking to establish a presence in the US. Our international business package includes entity formation, EIN acquisition, US business bank account assistance, and compliance guidance for foreign-owned businesses."
  },
  {
    id: "faq4",
    question: "What's the difference between an LLC and a Corporation?",
    answer: "An LLC (Limited Liability Company) offers personal liability protection with simpler administration and tax flexibility. A Corporation provides stronger liability protection but with more complex governance and potentially double taxation in C-Corps (though S-Corps can avoid this). Our consultants can help you determine which structure is best for your specific business needs."
  },
  {
    id: "faq5",
    question: "Do you offer ongoing compliance services?",
    answer: "Yes, we offer ongoing compliance services including annual report filing, registered agent services, business license renewals, and tax compliance monitoring. Our subscription packages ensure your business remains in good standing with all relevant authorities."
  }
];

const FAQ = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-[#f5f5f5]">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <span className="section-subheading">FAQs</span>
          <h2 className="section-heading">Frequently Asked Questions</h2>
          <p className="section-description">
            Find answers to common questions about our services and processes.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq) => (
              <AccordionItem 
                key={faq.id} 
                value={faq.id}
                className="border border-[#f5f5f5] rounded-lg bg-white overflow-hidden"
              >
                <AccordionTrigger className="px-4 py-4 text-left font-poppins font-medium text-lg hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-0 border-t border-[#f5f5f5]">
                  <p className="pt-4 text-[#6c757d]">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8 text-center">
            <Link href="/faqs" className="text-primary font-medium hover:text-accent transition-colors duration-200">
              View all FAQs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
