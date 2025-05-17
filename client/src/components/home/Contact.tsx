import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  service: z.string().min(1, { message: "Please select a service." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  consent: z.boolean().refine(val => val === true, { message: "You must agree to our terms." })
});

type FormValues = z.infer<typeof formSchema>;

const ContactInfo = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-start">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 shrink-0">
          <i className="ri-map-pin-line text-primary text-xl"></i>
        </div>
        <div>
          <h3 className="font-poppins font-semibold text-lg mb-1">Office Location</h3>
          <p className="text-[#6c757d]">1234 Business Avenue, Suite 500<br />New York, NY 10001</p>
        </div>
      </div>

      <div className="flex items-start">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 shrink-0">
          <i className="ri-phone-line text-primary text-xl"></i>
        </div>
        <div>
          <h3 className="font-poppins font-semibold text-lg mb-1">Phone</h3>
          <p className="text-[#6c757d]">Toll-Free: 1-800-123-4567<br />Direct: (212) 555-1234</p>
        </div>
      </div>

      <div className="flex items-start">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 shrink-0">
          <i className="ri-mail-line text-primary text-xl"></i>
        </div>
        <div>
          <h3 className="font-poppins font-semibold text-lg mb-1">Email</h3>
          <p className="text-[#6c757d]">info@zenithfilings.com<br />support@zenithfilings.com</p>
        </div>
      </div>

      <div className="flex items-start">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 shrink-0">
          <i className="ri-time-line text-primary text-xl"></i>
        </div>
        <div>
          <h3 className="font-poppins font-semibold text-lg mb-1">Business Hours</h3>
          <p className="text-[#6c757d]">Monday-Friday: 9:00 AM - 6:00 PM ET<br />Saturday: 10:00 AM - 2:00 PM ET</p>
        </div>
      </div>
    </div>
  );
};

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
      consent: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // In a real implementation, we'd send this to a backend API
      const response = await apiRequest("POST", "/api/contact", data);
      
      toast({
        title: "Message sent!",
        description: "We'll get back to you soon.",
        variant: "default",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <span className="section-subheading">Contact Us</span>
            <h2 className="section-heading mb-6">Get in Touch With Our Experts</h2>
            <p className="text-[#6c757d] mb-8">
              Our team of business and legal experts is ready to assist you with any questions or service needs. Contact us today for personalized assistance.
            </p>

            <ContactInfo />
          </div>

          <div>
            <div className="bg-[#f5f5f5] rounded-lg p-6 md:p-8">
              <h3 className="font-poppins font-semibold text-xl mb-6">Send Us a Message</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name*</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address*</FormLabel>
                          <FormControl>
                            <Input placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="(123) 456-7890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service Interest*</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="company-registration">Company Registration</SelectItem>
                              <SelectItem value="tax-filing">Tax Filing & Compliance</SelectItem>
                              <SelectItem value="trademark">Trademark & IP Registration</SelectItem>
                              <SelectItem value="legal-docs">Legal Documentation</SelectItem>
                              <SelectItem value="accounting">Accounting Services</SelectItem>
                              <SelectItem value="licenses">Business Licenses</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message*</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="How can we help you?" 
                            className="min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="consent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm text-[#6c757d]">
                            I consent to having this website store my submitted information so they can respond to my inquiry.*
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full bg-primary text-white hover:bg-primary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Message"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
