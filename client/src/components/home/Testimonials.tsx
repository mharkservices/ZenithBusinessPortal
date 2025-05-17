import { Link } from "wouter";
import TestimonialCard from "@/components/ui/testimonial-card";

const testimonials = [
  {
    id: 1,
    content: "Zenithfilings made our company registration process incredibly simple. Their team guided us through every step, and we were operational faster than expected.",
    name: "John Doe",
    position: "CEO, Tech Startup",
    initials: "JD"
  },
  {
    id: 2,
    content: "We've been using their tax filing services for three years now. The accuracy and attention to detail have saved us both time and money. Highly recommended!",
    name: "Jane Smith",
    position: "CFO, Retail Chain",
    initials: "JS"
  },
  {
    id: 3,
    content: "Their trademark registration service was fantastic. The team was knowledgeable, responsive, and made the complex process easy to understand. Our brand is now fully protected!",
    name: "Robert Johnson",
    position: "Owner, Creative Agency",
    initials: "RJ"
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="testimonial-gradient">
      <div className="bg-primary/80 py-16 md:py-20 lg:py-24">
        <div className="container-custom">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-white/80 font-medium uppercase tracking-wider text-sm">Testimonials</span>
            <h2 className="font-poppins font-bold text-2xl md:text-3xl lg:text-4xl mt-2 text-white">What Our Clients Say</h2>
            <p className="mt-4 text-white/80 max-w-2xl mx-auto">
              Hear from businesses that have transformed their operations with our services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/testimonials"
              className="bg-white text-primary px-6 py-3 rounded-md font-medium hover:bg-primary/10 transition-colors duration-200 inline-flex items-center">
              Read More Success Stories
              <i className="ri-arrow-right-line ml-1"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
