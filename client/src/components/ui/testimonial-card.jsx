"use client"

import PropTypes from 'prop-types';

const TestimonialCard = ({ testimonial }) => {
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

TestimonialCard.propTypes = {
  testimonial: PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    initials: PropTypes.string.isRequired
  }).isRequired
};

export default TestimonialCard;
