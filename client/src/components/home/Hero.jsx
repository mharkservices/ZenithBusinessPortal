import PropTypes from 'prop-types';
import { Link } from "wouter";

const Hero = () => {
  return (
    <section className="hero-gradient text-white py-20 md:py-28 lg:py-32">
      <div className="container-custom">
        <div className="max-w-3xl">
          <h1 className="font-poppins font-bold text-3xl md:text-4xl lg:text-5xl leading-tight mb-4">
            Simplify Your Business Journey
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            Professional business registration, tax filing, and compliance services to help your business thrive.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/services" 
              className="bg-accent text-white text-center px-6 py-3 rounded-md font-medium hover:bg-white hover:text-accent transition-colors duration-200">
              Explore Our Services
            </Link>
            <Link href="/contact" 
              className="bg-white text-primary text-center px-6 py-3 rounded-md font-medium hover:bg-primary/10 transition-colors duration-200">
              Contact Us
            </Link>
          </div>
          <div className="mt-8 pt-4 border-t border-white/20">
            <p className="text-sm text-white/80 mb-3">Trusted by 5000+ businesses nationwide</p>
            <div className="flex flex-wrap items-center gap-6">
              <div className="h-8 brightness-0 invert opacity-70 flex items-center justify-center">
                <i className="ri-microsoft-fill text-3xl"></i>
              </div>
              <div className="h-8 brightness-0 invert opacity-70 flex items-center justify-center">
                <i className="ri-amazon-fill text-3xl"></i>
              </div>
              <div className="h-8 brightness-0 invert opacity-70 flex items-center justify-center">
                <i className="ri-google-fill text-3xl"></i>
              </div>
              <div className="h-8 brightness-0 invert opacity-70 flex items-center justify-center">
                <i className="ri-apple-fill text-3xl"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Hero.propTypes = {};

export default Hero;
