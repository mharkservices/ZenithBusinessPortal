import {
  users, User, InsertUser,
  inquiries, Inquiry, InsertInquiry,
  services, Service, InsertService,
  resources, Resource, InsertResource,
  testimonials, Testimonial, InsertTestimonial,
  subscribers, Subscriber, InsertSubscriber
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Inquiry methods
  getInquiry(id: number): Promise<Inquiry | undefined>;
  getInquiries(): Promise<Inquiry[]>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  
  // Service methods
  getService(id: number): Promise<Service | undefined>;
  getServiceBySlug(slug: string): Promise<Service | undefined>;
  getServices(): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;
  
  // Resource methods
  getResource(id: number): Promise<Resource | undefined>;
  getResourceBySlug(slug: string): Promise<Resource | undefined>;
  getResources(): Promise<Resource[]>;
  getFeaturedResources(): Promise<Resource[]>;
  createResource(resource: InsertResource): Promise<Resource>;
  
  // Testimonial methods
  getTestimonial(id: number): Promise<Testimonial | undefined>;
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Subscriber methods
  getSubscriber(id: number): Promise<Subscriber | undefined>;
  getSubscriberByEmail(email: string): Promise<Subscriber | undefined>;
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
}

export class MemStorage implements IStorage {
  private usersMap: Map<number, User>;
  private inquiriesMap: Map<number, Inquiry>;
  private servicesMap: Map<number, Service>;
  private resourcesMap: Map<number, Resource>;
  private testimonialsMap: Map<number, Testimonial>;
  private subscribersMap: Map<number, Subscriber>;
  
  private userId: number;
  private inquiryId: number;
  private serviceId: number;
  private resourceId: number;
  private testimonialId: number;
  private subscriberId: number;

  constructor() {
    this.usersMap = new Map();
    this.inquiriesMap = new Map();
    this.servicesMap = new Map();
    this.resourcesMap = new Map();
    this.testimonialsMap = new Map();
    this.subscribersMap = new Map();
    
    this.userId = 1;
    this.inquiryId = 1;
    this.serviceId = 1;
    this.resourceId = 1;
    this.testimonialId = 1;
    this.subscriberId = 1;
    
    // Initialize with sample data
    this.initSampleData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.usersMap.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.usersMap.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date(),
      role: insertUser.role || "user",
      phone: insertUser.phone || null
    };
    this.usersMap.set(id, user);
    return user;
  }
  
  // Inquiry methods
  async getInquiry(id: number): Promise<Inquiry | undefined> {
    return this.inquiriesMap.get(id);
  }
  
  async getInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiriesMap.values());
  }
  
  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = this.inquiryId++;
    const inquiry: Inquiry = { 
      ...insertInquiry, 
      id, 
      createdAt: new Date(), 
      status: "new",
      phone: insertInquiry.phone || null
    };
    this.inquiriesMap.set(id, inquiry);
    return inquiry;
  }
  
  // Service methods
  async getService(id: number): Promise<Service | undefined> {
    return this.servicesMap.get(id);
  }
  
  async getServiceBySlug(slug: string): Promise<Service | undefined> {
    return Array.from(this.servicesMap.values()).find(service => service.slug === slug);
  }
  
  async getServices(): Promise<Service[]> {
    return Array.from(this.servicesMap.values()).filter(service => service.active);
  }
  
  async createService(insertService: InsertService): Promise<Service> {
    const id = this.serviceId++;
    const service: Service = { 
      ...insertService, 
      id,
      active: insertService.active !== undefined ? insertService.active : true
    };
    this.servicesMap.set(id, service);
    return service;
  }
  
  // Resource methods
  async getResource(id: number): Promise<Resource | undefined> {
    return this.resourcesMap.get(id);
  }
  
  async getResourceBySlug(slug: string): Promise<Resource | undefined> {
    return Array.from(this.resourcesMap.values()).find(resource => resource.slug === slug);
  }
  
  async getResources(): Promise<Resource[]> {
    return Array.from(this.resourcesMap.values());
  }
  
  async getFeaturedResources(): Promise<Resource[]> {
    return Array.from(this.resourcesMap.values()).filter(resource => resource.featured);
  }
  
  async createResource(insertResource: InsertResource): Promise<Resource> {
    const id = this.resourceId++;
    const resource: Resource = { 
      ...insertResource, 
      id, 
      publishedAt: new Date(),
      imagePath: insertResource.imagePath || null,
      featured: insertResource.featured !== undefined ? insertResource.featured : false
    };
    this.resourcesMap.set(id, resource);
    return resource;
  }
  
  // Testimonial methods
  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    return this.testimonialsMap.get(id);
  }
  
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonialsMap.values()).filter(testimonial => testimonial.active);
  }
  
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.testimonialId++;
    const testimonial: Testimonial = { 
      ...insertTestimonial, 
      id,
      active: insertTestimonial.active !== undefined ? insertTestimonial.active : true,
      company: insertTestimonial.company || null
    };
    this.testimonialsMap.set(id, testimonial);
    return testimonial;
  }
  
  // Subscriber methods
  async getSubscriber(id: number): Promise<Subscriber | undefined> {
    return this.subscribersMap.get(id);
  }
  
  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    return Array.from(this.subscribersMap.values()).find(subscriber => subscriber.email === email);
  }
  
  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    const id = this.subscriberId++;
    const subscriber: Subscriber = { 
      ...insertSubscriber, 
      id, 
      subscribedAt: new Date(), 
      active: true 
    };
    this.subscribersMap.set(id, subscriber);
    return subscriber;
  }
  
  // Initialize sample data
  private initSampleData() {
    // Sample services
    const sampleServices = [
      {
        id: this.serviceId++,
        slug: "company-registration",
        title: "Company Registration",
        description: "Start your business journey with proper registration. We handle all paperwork and compliance requirements.",
        icon: "ri-building-line",
        features: ["LLC & Corporation setup", "EIN application", "Entity formation documents"],
        active: true
      },
      {
        id: this.serviceId++,
        slug: "tax-filing",
        title: "Tax Filing & Compliance",
        description: "Stay compliant with all tax regulations and maximize your deductions with our expert services.",
        icon: "ri-file-text-line",
        features: ["Income tax filing", "Sales tax compliance", "Tax planning services"],
        active: true
      },
      {
        id: this.serviceId++,
        slug: "trademark",
        title: "Trademark & IP Registration",
        description: "Protect your brand identity and intellectual property with our trademark registration services.",
        icon: "ri-trademark-line",
        features: ["Trademark search & filing", "Copyright registration", "IP protection strategy"],
        active: true
      },
      {
        id: this.serviceId++,
        slug: "legal-documentation",
        title: "Legal Documentation",
        description: "Access professionally drafted legal documents tailored to your business needs.",
        icon: "ri-file-list-3-line",
        features: ["Contracts & agreements", "Terms & conditions", "Legal compliance documents"],
        active: true
      },
      {
        id: this.serviceId++,
        slug: "accounting",
        title: "Accounting Services",
        description: "Keep your finances in order with our professional accounting and bookkeeping services.",
        icon: "ri-calculator-line",
        features: ["Bookkeeping & accounting", "Financial statements", "Payroll management"],
        active: true
      },
      {
        id: this.serviceId++,
        slug: "business-licenses",
        title: "Business Licenses",
        description: "Obtain all necessary permits and licenses to operate your business legally and efficiently.",
        icon: "ri-government-line",
        features: ["Business permits", "Industry-specific licenses", "License renewals"],
        active: true
      }
    ];
    
    sampleServices.forEach(service => {
      this.servicesMap.set(service.id, service as Service);
    });
    
    // Sample testimonials
    const sampleTestimonials = [
      {
        id: this.testimonialId++,
        content: "Zenithfilings made our company registration process incredibly simple. Their team guided us through every step, and we were operational faster than expected.",
        name: "John Doe",
        position: "CEO",
        company: "Tech Startup",
        active: true
      },
      {
        id: this.testimonialId++,
        content: "We've been using their tax filing services for three years now. The accuracy and attention to detail have saved us both time and money. Highly recommended!",
        name: "Jane Smith",
        position: "CFO",
        company: "Retail Chain",
        active: true
      },
      {
        id: this.testimonialId++,
        content: "Their trademark registration service was fantastic. The team was knowledgeable, responsive, and made the complex process easy to understand. Our brand is now fully protected!",
        name: "Robert Johnson",
        position: "Owner",
        company: "Creative Agency",
        active: true
      }
    ];
    
    sampleTestimonials.forEach(testimonial => {
      this.testimonialsMap.set(testimonial.id, testimonial as Testimonial);
    });
    
    // Sample resources
    const sampleResources = [
      {
        id: this.resourceId++,
        slug: "tax-planning-strategies",
        title: "10 Tax Planning Strategies for Small Businesses",
        description: "Learn how to minimize your tax burden legally with these effective tax planning strategies for small business owners.",
        content: "This is a placeholder for detailed content that would normally be stored in the database.",
        category: "Tax Planning",
        imagePath: "https://images.unsplash.com/photo-1554224155-6726b3ff858f",
        publishedAt: new Date(),
        featured: true
      },
      {
        id: this.resourceId++,
        slug: "llc-vs-corporation",
        title: "LLC vs. Corporation: Choosing the Right Structure",
        description: "Understand the key differences between LLCs and Corporations to make the best choice for your business goals.",
        content: "This is a placeholder for detailed content that would normally be stored in the database.",
        category: "Business Formation",
        imagePath: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa",
        publishedAt: new Date(),
        featured: true
      },
      {
        id: this.resourceId++,
        slug: "essential-legal-documents",
        title: "5 Essential Legal Documents Every Business Needs",
        description: "Protect your business with these critical legal documents that provide the foundation for smooth operations and legal protection.",
        content: "This is a placeholder for detailed content that would normally be stored in the database.",
        category: "Legal",
        imagePath: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
        publishedAt: new Date(),
        featured: true
      }
    ];
    
    sampleResources.forEach(resource => {
      this.resourcesMap.set(resource.id, resource as Resource);
    });
  }
}

export const storage = new MemStorage();
