interface TestimonialItem {
  id: number;
  content: string;
  name: string;
  position: string;
  initials: string;
}

interface TestimonialCardProps {
  testimonial: TestimonialItem;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center mb-4">
        <div className="text-accent">
          <i className="ri-star-fill"></i>
          <i className="ri-star-fill"></i>
          <i className="ri-star-fill"></i>
          <i className="ri-star-fill"></i>
          <i className="ri-star-fill"></i>
        </div>
      </div>
      <p className="text-[#6c757d] mb-6 italic">"{testimonial.content}"</p>
      <div className="flex items-center">
        <div className="mr-4 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
          <span className="text-primary font-medium">{testimonial.initials}</span>
        </div>
        <div>
          <h4 className="font-poppins font-medium text-dark">{testimonial.name}</h4>
          <p className="text-sm text-[#6c757d]">{testimonial.position}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
