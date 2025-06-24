import PropTypes from 'prop-types';
import { Link } from "wouter";

const CTA = () => {
  return (
    <section className="cta-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/90"></div>
      <div className="container-custom relative z-10 py-16 md:py-20 lg:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-poppins font-bold text-2xl md:text-3xl lg:text-4xl text-white mb-4">
            Ready to Start or Grow Your Business?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Get professional assistance with company registration, tax filing, and business compliance services today.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <Link href="/contact"
              className="bg-accent text-white px-8 py-3 rounded-md font-medium hover:bg-white hover:text-accent transition-colors duration-200">
              Contact Us
            </Link>
            <Link href="/schedule-consultation"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white hover:text-primary transition-colors duration-200">
              Schedule Consultation
            </Link>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0">
            <a 
              href="tel:1-800-123-4567" 
              className="text-white flex items-center sm:mr-6 hover:text-accent transition-colors duration-200"
            >
              <i className="ri-phone-fill mr-2"></i>
              <span>1-800-123-4567</span>
            </a>
            <a 
              href="mailto:info@zenithfilings.com" 
              className="text-white flex items-center hover:text-accent transition-colors duration-200"
            >
              <i className="ri-mail-fill mr-2"></i>
              <span>info@zenithfilings.com</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

CTA.propTypes = {};

export default CTA;
