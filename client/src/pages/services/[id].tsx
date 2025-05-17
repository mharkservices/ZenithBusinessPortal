import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useRoute } from 'wouter';
import { services } from '@/data/services';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from "lucide-react";
import FeedbackForm from '@/components/ui/feedback-form';

// Pricing details for each service
const pricingOptions = {
  "company-registration": [
    { title: "Basic", price: "₹9,999", description: "For small startups with basic requirements", features: ["Name Approval", "Digital Signature Certificate (1 user)", "Company Incorporation", "PAN & TAN", "Basic Support"] },
    { title: "Standard", price: "₹14,999", description: "Most popular for new businesses", features: ["Name Approval", "Digital Signature Certificate (2 users)", "Company Incorporation", "PAN & TAN", "GST Registration", "Compliance Calendar", "Priority Support"] },
    { title: "Premium", price: "₹24,999", description: "Complete package for established businesses", features: ["Name Approval", "Digital Signature Certificate (3 users)", "Company Incorporation", "PAN & TAN", "GST Registration", "Current Account Setup", "Compliance Calendar", "Dedicated Support", "Annual Compliance (1st Year)"] },
  ],
  "gst-registration": [
    { title: "Basic", price: "₹1,999", description: "Simple GST registration for small businesses", features: ["GST Registration", "Basic Support", "Application Filing"] },
    { title: "Standard", price: "₹2,999", description: "Complete GST solution with additional support", features: ["GST Registration", "Application Filing", "Business Structure Analysis", "Priority Support", "Post-Registration Guidance"] },
    { title: "Premium", price: "₹4,999", description: "Premium registration with comprehensive support", features: ["GST Registration", "Application Filing", "Business Structure Analysis", "Priority Support", "Post-Registration Guidance", "First Return Filing", "Compliance Advisory"] },
  ],
  "tax-filing": [
    { title: "Individual", price: "₹3,999", description: "For individual taxpayers", features: ["Income Tax Return Filing", "Basic Tax Planning", "Standard Support"] },
    { title: "Business", price: "₹7,999", description: "For small & medium businesses", features: ["Income Tax Return Filing", "GST Return Filing (4 Quarters)", "TDS Return Filing", "Tax Planning", "Priority Support"] },
    { title: "Enterprise", price: "₹14,999", description: "Comprehensive tax solution for larger businesses", features: ["Income Tax Return Filing", "GST Return Filing (4 Quarters)", "TDS Return Filing", "Tax Planning", "Dedicated Support", "Compliance Monitoring", "Tax Notices Handling"] },
  ],
  "trademark": [
    { title: "Basic", price: "₹6,999", description: "Trademark filing in one class", features: ["Trademark Search", "Application Filing (1 Class)", "Standard Support"] },
    { title: "Standard", price: "₹11,999", description: "Complete trademark protection", features: ["Detailed Trademark Search", "Application Filing (2 Classes)", "Response to Examination Report", "Priority Support"] },
    { title: "Premium", price: "₹15,999", description: "Premium trademark protection", features: ["Comprehensive Trademark Search", "Application Filing (3 Classes)", "Response to Examination Report", "Objection Management", "Dedicated Support", "Trademark Monitoring"] },
  ],
  "import-export": [
    { title: "Basic", price: "₹3,999", description: "Simple IEC registration", features: ["IEC Application", "Digital Signature (1 User)", "Basic Support"] },
    { title: "Standard", price: "₹5,999", description: "Complete IEC solution", features: ["IEC Application", "Digital Signature (1 User)", "Documentation Assistance", "Priority Support"] },
    { title: "Premium", price: "₹8,999", description: "Premium IEC package with advisory", features: ["IEC Application", "Digital Signature (2 Users)", "Documentation Assistance", "Export-Import Advisory", "Dedicated Support"] },
  ],
  "accounting": [
    { title: "Startup", price: "₹4,999/month", description: "Basic accounting for startups", features: ["Monthly Bookkeeping", "Financial Statements", "Basic Support"] },
    { title: "Growth", price: "₹9,999/month", description: "Comprehensive accounting for growing businesses", features: ["Monthly Bookkeeping", "Financial Statements", "Payroll Processing (up to 10 employees)", "Bank Reconciliation", "Priority Support"] },
    { title: "Enterprise", price: "₹19,999/month", description: "Full accounting solution for established businesses", features: ["Monthly Bookkeeping", "Financial Statements", "Payroll Processing (up to 25 employees)", "Bank Reconciliation", "Financial Analysis", "Dedicated Accountant", "Tax Planning"] },
  ],
  "compliance": [
    { title: "Basic", price: "₹7,999/year", description: "Essential compliance for small businesses", features: ["Annual Return Filing", "Basic ROC Compliance", "Standard Support"] },
    { title: "Standard", price: "₹14,999/year", description: "Comprehensive compliance package", features: ["Annual Return Filing", "ROC Compliance", "Board Meeting Management", "Statutory Register Maintenance", "Priority Support"] },
    { title: "Premium", price: "₹24,999/year", description: "Complete compliance solution", features: ["Annual Return Filing", "ROC Compliance", "Board Meeting Management", "Statutory Register Maintenance", "Dedicated Support", "Compliance Calendar", "Legal Advisory"] },
  ],
  "startup-india": [
    { title: "Basic", price: "₹4,999", description: "Simple DPIIT registration", features: ["DPIIT Application", "Basic Documentation", "Standard Support"] },
    { title: "Standard", price: "₹8,999", description: "Complete startup registration package", features: ["DPIIT Application", "Business Plan Preparation", "Documentation Support", "Funding Guidance", "Priority Support"] },
    { title: "Premium", price: "₹14,999", description: "Premium startup package with advisory", features: ["DPIIT Application", "Comprehensive Business Plan", "Documentation Support", "Funding Guidance", "Tax Exemption Advisory", "Dedicated Support", "Investor Pitch Deck"] },
  ]
};

// Documents required for each service
const requiredDocuments = {
  "company-registration": [
    "Identity proof of directors (Aadhaar, PAN, Passport)",
    "Address proof of directors (Utility bills, Bank statements)",
    "Passport-sized photographs of directors",
    "Proof of registered office address",
    "Digital Signature Certificate (DSC) of directors",
    "Proposed company names (up to 6 options)"
  ],
  "gst-registration": [
    "PAN of the business entity",
    "Identity and address proof of proprietor/partners/directors",
    "Business registration documents (Certificate of Incorporation, Partnership deed)",
    "Proof of business address",
    "Bank account details of the business",
    "Digital Signature Certificate (DSC) of authorized signatory"
  ],
  "tax-filing": [
    "PAN card",
    "Aadhaar card",
    "Income statements (Form 16, Form 26AS)",
    "Investment proofs for deductions",
    "Bank statements",
    "Previous year's tax returns (if applicable)"
  ],
  "trademark": [
    "Clear representation of the trademark",
    "List of goods and services for registration",
    "User affidavit (if the mark is already in use)",
    "Business registration documents",
    "Power of attorney (if filed through an agent)",
    "Priority document (if claiming convention priority)"
  ],
  "import-export": [
    "PAN card of the business entity",
    "Identity proof of the applicant",
    "Business registration documents",
    "Proof of business address",
    "Bank certificate",
    "Digital Signature Certificate (DSC) of the applicant"
  ],
  "accounting": [
    "Business registration documents",
    "GST registration certificate",
    "Bank statements",
    "Previous financial records (if available)",
    "Vendor and customer details",
    "Employee details for payroll processing"
  ],
  "compliance": [
    "Certificate of Incorporation",
    "Memorandum and Articles of Association",
    "List of directors and shareholders",
    "Financial statements",
    "Board meeting minutes",
    "Annual returns of previous years (if applicable)"
  ],
  "startup-india": [
    "Certificate of Incorporation/Registration",
    "Business plan or pitch deck",
    "Details of directors/partners",
    "Proof of funding (if already received)",
    "Proof of patent or trademark (if applicable)",
    "Self-certification of innovativeness"
  ]
};

// Process steps for each service
const processSteps = {
  "company-registration": [
    "Apply for Digital Signature Certificate (DSC)",
    "Reserve company name through RUN (Reserve Unique Name) service",
    "File SPICe+ form for incorporation",
    "Pay government fees and stamp duty",
    "Receive Certificate of Incorporation with PAN and TAN",
    "Complete post-incorporation compliances"
  ],
  "gst-registration": [
    "Submit application with required documents",
    "Verification of the application by GST authorities",
    "Receive Application Reference Number (ARN)",
    "Attend verification call if required",
    "Receive GSTIN certificate",
    "Set up GST compliance process"
  ],
  "tax-filing": [
    "Collect all required documents and financial information",
    "Calculate tax liability and applicable deductions",
    "Fill the appropriate ITR form based on income source",
    "Submit the return online",
    "Verify the return using Aadhaar OTP or other methods",
    "Track refund status if applicable"
  ],
  "trademark": [
    "Conduct comprehensive trademark search",
    "Prepare and file trademark application",
    "Receive application number and acknowledgment",
    "Respond to examination report if objections are raised",
    "Publication in Trademark Journal",
    "Registration certificate issued if no opposition"
  ],
  "import-export": [
    "Apply for Digital Signature Certificate (DSC)",
    "Submit IEC application online on DGFT website",
    "Upload required documents",
    "Application processing by DGFT",
    "Receive IEC number digitally",
    "Set up post-registration compliance process"
  ],
  "accounting": [
    "Initial consultation and assessment of accounting needs",
    "Set up accounting software and chart of accounts",
    "Regular bookkeeping and transaction recording",
    "Monthly financial statement preparation",
    "Regular financial reviews and analysis",
    "Year-end financial reporting and tax preparation"
  ],
  "compliance": [
    "Create compliance calendar based on business structure",
    "Prepare and file annual returns",
    "Conduct board meetings as per requirements",
    "Maintain statutory registers",
    "Handle regulatory filings with ROC",
    "Address compliance notices if any"
  ],
  "startup-india": [
    "Register on the Startup India portal",
    "Prepare and upload required documents",
    "Submit DPIIT application form",
    "Application verification by DPIIT",
    "Receive recognition certificate",
    "Apply for eligible benefits and incentives"
  ]
};

// FAQ for each service
const faqs = {
  "company-registration": [
    { question: "How long does it take to register a company in India?", answer: "The company registration process typically takes 7-15 working days from the submission of all required documents." },
    { question: "What is the minimum number of directors required for a Private Limited Company?", answer: "A Private Limited Company requires a minimum of 2 directors and 2 shareholders. One person can be both a director and a shareholder." },
    { question: "Do I need to have a physical office for company registration?", answer: "Yes, you need to provide a registered office address, which can be a commercial or residential property with proper documentation." },
    { question: "What is the minimum capital requirement for company registration?", answer: "There is no minimum capital requirement for Private Limited Company registration as per the Companies Act, 2013." },
    { question: "Can a foreign national be a director in an Indian company?", answer: "Yes, a foreign national can be a director in an Indian company. However, at least one director must be a resident Indian." }
  ],
  "gst-registration": [
    { question: "Who needs to register for GST?", answer: "Any business with an annual turnover exceeding ₹20 lakhs (₹10 lakhs for special category states) must register for GST. Certain businesses must register regardless of turnover." },
    { question: "How long does it take to get GST registration?", answer: "GST registration typically takes 3-7 working days from the submission of a complete application." },
    { question: "Can I register for GST if my business is not yet started?", answer: "Yes, you can apply for GST registration before starting your business operations." },
    { question: "What is the validity of GST registration?", answer: "GST registration remains valid until it is cancelled or surrendered." },
    { question: "Can I have multiple GST registrations for one business?", answer: "Yes, you need separate GST registration for each state where your business operates." }
  ],
  "tax-filing": [
    { question: "What is the due date for filing income tax returns?", answer: "For individuals, the due date is usually July 31st for the previous financial year. For businesses and other categories, it varies between July and October." },
    { question: "What happens if I miss the tax filing deadline?", answer: "Late filing may result in penalties, interest on due taxes, and loss of the ability to carry forward certain losses." },
    { question: "Do I need to file returns if my income is below the taxable limit?", answer: "It's not mandatory, but it's advisable to file returns even if your income is below the taxable limit for maintaining financial records and for loan applications." },
    { question: "Can I revise my tax return after filing?", answer: "Yes, you can file a revised return if you discover any omission or wrong statement in the original return, within the specified time limit." },
    { question: "Which ITR form should I use?", answer: "The appropriate ITR form depends on your sources of income and taxpayer category. Our experts will help you determine the correct form." }
  ],
  "trademark": [
    { question: "How long does trademark registration take in India?", answer: "The trademark registration process typically takes 18-24 months if there are no objections or oppositions." },
    { question: "What is the validity period of a trademark?", answer: "A registered trademark is valid for 10 years from the date of application and can be renewed indefinitely for periods of 10 years." },
    { question: "Can I use the ™ symbol without registration?", answer: "Yes, you can use the ™ symbol for an unregistered trademark to indicate your claim. The ® symbol can only be used after registration." },
    { question: "In which classes should I register my trademark?", answer: "You should register your trademark in all classes relevant to your current business and future expansion plans. Our experts can help determine the appropriate classes." },
    { question: "What happens if someone else is using a similar trademark?", answer: "If someone is using a similar trademark, it may lead to an objection during the registration process. We can help you respond to such objections or explore alternative options." }
  ],
  "import-export": [
    { question: "What is an IEC code and why do I need it?", answer: "An Import Export Code (IEC) is a unique 10-digit code required for any business engaged in import or export activities in India. It is mandatory for international trade." },
    { question: "How long is an IEC valid?", answer: "An IEC has lifetime validity and does not require renewal, provided the details are updated whenever there are changes." },
    { question: "Can an individual apply for an IEC?", answer: "Yes, individuals, proprietorships, partnerships, companies, and other legal entities can apply for an IEC." },
    { question: "How long does it take to get an IEC?", answer: "The IEC registration process typically takes 3-7 working days after submission of all required documents." },
    { question: "Do I need any other licenses besides IEC for import/export?", answer: "Depending on the nature of the goods being imported or exported, you may need additional permits, licenses, or certifications." }
  ],
  "accounting": [
    { question: "Why should I outsource accounting services?", answer: "Outsourcing accounting services allows you to focus on your core business while professionals handle financial management, ensuring accuracy, compliance, and strategic financial insights." },
    { question: "How frequently will I receive financial reports?", answer: "We provide monthly financial statements as standard. However, we can customize reporting frequency based on your business needs." },
    { question: "Can you handle payroll processing for my employees?", answer: "Yes, our accounting services include payroll processing, tax calculations, and compliance with labor laws." },
    { question: "Do you provide tax planning services?", answer: "Yes, our accounting services include tax planning to help you minimize tax liability legally and maximize financial efficiency." },
    { question: "How do you ensure the security of my financial data?", answer: "We implement strict data security protocols, including encrypted communications, secure cloud storage, and confidentiality agreements." }
  ],
  "compliance": [
    { question: "What are the annual compliance requirements for a Private Limited Company?", answer: "Key annual compliances include filing Annual Returns (MGT-7), Financial Statements (AOC-4), conducting Annual General Meetings, maintaining statutory registers, and filing income tax returns." },
    { question: "What happens if I miss compliance deadlines?", answer: "Non-compliance can result in penalties, legal action, negative impact on company reputation, and restrictions on corporate actions." },
    { question: "How often are board meetings required?", answer: "A Private Limited Company must conduct at least four board meetings in a year, with not more than 120 days gap between two consecutive meetings." },
    { question: "What is ROC compliance?", answer: "ROC (Registrar of Companies) compliance involves filing various forms and returns with the ROC as per the Companies Act, 2013, to maintain good standing of the company." },
    { question: "Can I handle compliance requirements myself?", answer: "While it's possible, professional assistance ensures accurate and timely compliance, reducing the risk of penalties and legal issues." }
  ],
  "startup-india": [
    { question: "What is DPIIT recognition for startups?", answer: "DPIIT (Department for Promotion of Industry and Internal Trade) recognition is an official recognition by the Government of India for entities as 'Startups' under the Startup India initiative." },
    { question: "What are the benefits of Startup India registration?", answer: "Benefits include tax exemptions, self-certification compliance, patent fee reductions, fast-tracking patent applications, easier public procurement norms, and access to startup funding options." },
    { question: "What are the eligibility criteria for Startup India registration?", answer: "To be eligible, your entity must be incorporated as a Private Limited Company, Registered Partnership Firm, or LLP in India, be less than 10 years old, have annual turnover less than ₹100 crores, and work towards innovation and improvement of products or services." },
    { question: "How long does it take to get DPIIT recognition?", answer: "The DPIIT recognition process typically takes 2-3 weeks after submission of a complete application." },
    { question: "Can a foreign company get Startup India recognition?", answer: "No, only entities incorporated or registered in India can apply for Startup India recognition." }
  ]
};

const ServiceDetail = () => {
  const [, params] = useRoute('/services/:id/:subType?');
  const [service, setService] = useState<any>(null);
  const [subType, setSubType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (params?.id) {
      const foundService = services.find(s => s.id === params.id);
      setService(foundService);
      setSubType(params.subType || null);
      setLoading(false);
    }
  }, [params]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-3/4 mb-6"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-10"></div>
          <div className="h-40 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-60 bg-gray-200 rounded"></div>
            <div className="h-60 bg-gray-200 rounded"></div>
            <div className="h-60 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
        <p className="mb-8">The service you are looking for does not exist.</p>
        <Link href="/services">
          <Button>Back to Services</Button>
        </Link>
      </div>
    );
  }
  
  // Display specific content based on subType
  let subTypeContent = null;
  if (subType) {
    // Handle specific sub-service types
    if (service.id === "company-registration" && subType === "opc") {
      subTypeContent = (
        <div className="mb-20 bg-gray-50 p-8 rounded-xl">
          <h2 className="text-3xl font-bold mb-6">One Person Company (OPC)</h2>
          <p className="text-lg mb-6">
            A One Person Company (OPC) is a type of corporate structure introduced in the Companies Act, 2013, 
            designed specifically for solo entrepreneurs who want to enjoy the benefits of a corporate entity with limited liability protection.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Key Benefits of OPC</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-primary flex-shrink-0 h-5 w-5 mt-1" />
                  <span>Limited liability protection for the sole proprietor</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-primary flex-shrink-0 h-5 w-5 mt-1" />
                  <span>Perpetual succession regardless of the status of the member</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-primary flex-shrink-0 h-5 w-5 mt-1" />
                  <span>Enhanced credibility in the market compared to proprietorship</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-primary flex-shrink-0 h-5 w-5 mt-1" />
                  <span>Easier access to credit and funding opportunities</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-primary flex-shrink-0 h-5 w-5 mt-1" />
                  <span>Simplified compliance requirements compared to other companies</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Eligibility Criteria</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-primary flex-shrink-0 h-5 w-5 mt-1" />
                  <span>Only a natural person who is an Indian citizen and resident can form an OPC</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-primary flex-shrink-0 h-5 w-5 mt-1" />
                  <span>A person can be a member of only one OPC at any given time</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-primary flex-shrink-0 h-5 w-5 mt-1" />
                  <span>Mandatory nominee who becomes the member in case of member's death or disability</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-primary flex-shrink-0 h-5 w-5 mt-1" />
                  <span>Minimum capital requirement is ₹1 lakh</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <h3 className="text-xl font-semibold mb-4">OPC Registration Process</h3>
            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">1</div>
                <div>
                  <p className="font-medium">Apply for Digital Signature Certificate (DSC)</p>
                  <p className="text-gray-600">The director needs to obtain a DSC for electronically signing documents</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">2</div>
                <div>
                  <p className="font-medium">Apply for Director Identification Number (DIN)</p>
                  <p className="text-gray-600">DIN is required for the sole director of the OPC</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">3</div>
                <div>
                  <p className="font-medium">Name Approval</p>
                  <p className="text-gray-600">Submit RUN (Reserve Unique Name) application for company name approval</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">4</div>
                <div>
                  <p className="font-medium">Filing of Incorporation Documents</p>
                  <p className="text-gray-600">Submit SPICe+ form along with required documents</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">5</div>
                <div>
                  <p className="font-medium">Certificate of Incorporation</p>
                  <p className="text-gray-600">Receive Certificate of Incorporation with PAN and TAN</p>
                </div>
              </li>
            </ol>
          </div>
          
          <div className="flex justify-center">
            <Button size="lg" className="animate-pulse">
              Register Your OPC Now
            </Button>
          </div>
        </div>
      );
    } else if (service.id === "company-registration" && subType === "private-limited") {
      // Content for Private Limited Company
      subTypeContent = (
        <div className="mb-20 bg-gray-50 p-8 rounded-xl">
          <h2 className="text-3xl font-bold mb-6">Private Limited Company</h2>
          <p className="text-lg mb-6">
            A Private Limited Company is the most popular corporate structure in India, offering limited liability 
            protection while allowing multiple shareholders and directors to run the business.
          </p>
          
          {/* More Private Limited specific content would go here */}
          <div className="text-center my-8">
            <p className="text-primary font-medium">Detailed information for Private Limited Companies coming soon.</p>
          </div>
        </div>
      );
    } else if (service.id === "company-registration" && subType === "llp") {
      // Content for LLP
      subTypeContent = (
        <div className="mb-20 bg-gray-50 p-8 rounded-xl">
          <h2 className="text-3xl font-bold mb-6">Limited Liability Partnership (LLP)</h2>
          <p className="text-lg mb-6">
            A Limited Liability Partnership combines the flexibility of a partnership with the limited liability protection of a company.
          </p>
          
          {/* More LLP specific content would go here */}
          <div className="text-center my-8">
            <p className="text-primary font-medium">Detailed information for LLP coming soon.</p>
          </div>
        </div>
      );
    }
  }

  const servicePricing = pricingOptions[service.id as keyof typeof pricingOptions] || [];
  const serviceDocuments = requiredDocuments[service.id as keyof typeof requiredDocuments] || [];
  const serviceSteps = processSteps[service.id as keyof typeof processSteps] || [];
  const serviceFaqs = faqs[service.id as keyof typeof faqs] || [];

  return (
    <>
      <Helmet>
        <title>{subType ? `${subType.charAt(0).toUpperCase() + subType.slice(1).replace(/-/g, ' ')} - ${service.title}` : service.title} | Zenithfilings</title>
        <meta name="description" content={`Professional ${service.title} services by Zenithfilings. ${service.description}`} />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-8">
          <Link href="/">Home</Link> / <Link href="/services">Services</Link> / 
          <Link href={`/services/${service.id}`}> <span className="text-primary">{service.title}</span></Link>
          {subType && <> / <span className="text-accent">{subType.charAt(0).toUpperCase() + subType.slice(1).replace(/-/g, ' ')}</span></>}
        </div>
        
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{service.title}</h1>
            <p className="text-xl mb-8">{service.description}</p>
            <div className="flex flex-wrap gap-3 mb-8">
              {service.features.map((feature: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-sm py-1 px-3">{feature}</Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Button size="lg">Get Started</Button>
              <Button size="lg" variant="outline">Contact Us</Button>
            </div>
          </div>
          <div className="bg-primary/5 rounded-xl p-8 flex items-center justify-center">
            <div className="text-center">
              <div className="text-7xl text-primary mb-4">
                <i className={service.icon}></i>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Why Choose Our {service.title} Service?</h3>
              <ul className="text-left space-y-3">
                <li className="flex gap-3">
                  <CheckCircle className="text-primary flex-shrink-0" />
                  <span>100% Compliance Guaranteed</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="text-primary flex-shrink-0" />
                  <span>Dedicated Expert Support</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="text-primary flex-shrink-0" />
                  <span>End-to-End Documentation Assistance</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="text-primary flex-shrink-0" />
                  <span>Fastest Turnaround Time</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="text-primary flex-shrink-0" />
                  <span>Transparent Process & Pricing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Display specific subType content if available */}
        {subTypeContent}
        
        {/* Sub-Services Selection Section - only show if no subType is selected */}
        {!subType && service.id === "company-registration" && (
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-6 text-center">Choose Your {service.title} Type</h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Select the type of {service.title.toLowerCase()} that best suits your business needs.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { id: "private-limited", name: "Private Limited Company", description: "Best for medium to large businesses with multiple shareholders", icon: "ri-building-line" },
                { id: "llp", name: "Limited Liability Partnership", description: "Ideal for professional services and partnerships", icon: "ri-team-line" },
                { id: "opc", name: "One Person Company", description: "Perfect for solo entrepreneurs with limited liability protection", icon: "ri-user-line" },
                { id: "public-limited", name: "Public Limited Company", description: "For large enterprises planning to list on stock exchanges", icon: "ri-stock-line" },
                { id: "section-8", name: "Section 8 Company", description: "For non-profit organizations with charitable purposes", icon: "ri-heart-line" },
                { id: "all-types", name: "Compare All Types", description: "Not sure which company type is right for you? Compare all options", icon: "ri-scales-line" }
              ].map((subService) => (
                <Link 
                  key={subService.id}
                  href={`/services/company-registration/${subService.id}`}
                  className="bg-white border rounded-xl hover:shadow-lg hover:border-primary transition-all p-6 cursor-pointer transform hover:scale-105 duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      <i className={`${subService.icon} text-2xl`}></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{subService.name}</h3>
                      <p className="text-gray-600">{subService.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
        
        {/* Sub-Services Info for other services */}
        {!subType && service.id !== "company-registration" && (
          <section className="mb-20">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Available {service.title} Options</h2>
              <p className="text-gray-600 mb-12 max-w-3xl mx-auto">
                Please contact our experts to learn about the specific options and packages available for {service.title.toLowerCase()}.
              </p>
              <Button size="lg">Contact Our Experts</Button>
            </div>
          </section>
        )}
        
        {/* Pricing Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Our {service.title} Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicePricing.map((plan: any, index: number) => (
              <Card key={index} className={`relative ${index === 1 ? 'border-primary shadow-lg' : ''} transition-transform hover:scale-105 cursor-pointer`}>
                {index === 1 && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.title}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price.includes('/') && (
                      <span className="text-gray-500 ml-1">{plan.price.split('/')[1]}</span>
                    )}
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature: string, i: number) => (
                      <li key={i} className="flex gap-3">
                        <CheckCircle className="text-primary flex-shrink-0 h-5 w-5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant={index === 1 ? "default" : "outline"}>
                    Choose {plan.title}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Process Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">{service.title} Process</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 hidden md:block"></div>
            <div className="space-y-12">
              {serviceSteps.map((step: string, index: number) => (
                <div key={index} className={`flex flex-col md:flex-row items-center gap-6 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="w-full md:w-1/2 bg-gray-50 p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-2">Step {index + 1}</h3>
                    <p>{step}</p>
                  </div>
                  <div className="flex items-center justify-center bg-primary text-white rounded-full w-10 h-10 font-bold z-10">
                    {index + 1}
                  </div>
                  <div className="w-full md:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Required Documents */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Documents Required for {service.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {serviceDocuments.map((document: string, index: number) => (
              <div key={index} className="flex gap-4 bg-gray-50 p-6 rounded-lg">
                <div className="bg-primary/10 text-primary p-2 rounded h-fit">
                  <i className="ri-file-list-3-line text-2xl"></i>
                </div>
                <div>
                  <p>{document}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {serviceFaqs.map((faq: { question: string, answer: string }, index: number) => (
              <div key={index} className="border-b pb-6">
                <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Feedback Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gray-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-6">Have Questions?</h2>
              <p className="text-gray-600 mb-8">
                Our experts are here to assist you with any questions or concerns regarding our {service.title.toLowerCase()} services. Fill out the form and we'll get back to you promptly.
              </p>
              
              {/* Integrating the feedback form */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <FeedbackForm 
                  serviceName={service.title}
                  includeRating={true}
                />
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6">Why Choose Our {service.title} Service?</h2>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-lg flex-shrink-0">
                      <i className="ri-shield-check-line text-2xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">100% Compliance Guaranteed</h3>
                      <p className="text-gray-600">
                        Our experts ensure that all your business registrations and filings are 100% compliant with the latest regulations.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-lg flex-shrink-0">
                      <i className="ri-time-line text-2xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Fast Turnaround Time</h3>
                      <p className="text-gray-600">
                        We understand the value of time in business. Our streamlined processes ensure quick delivery of services.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-lg flex-shrink-0">
                      <i className="ri-customer-service-2-line text-2xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Dedicated Support</h3>
                      <p className="text-gray-600">
                        Get personalized assistance from our expert team throughout the entire process and beyond.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-white rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to get started with our {service.title} service?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Our experts are waiting to help you with a seamless and hassle-free experience.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary">Get Started Now</Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:text-primary">Contact Us</Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServiceDetail;