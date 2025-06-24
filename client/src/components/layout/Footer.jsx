import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <div>
            <Link href="/" className="flex items-center mb-6">
              <span className="font-poppins font-bold text-2xl">
                Zenith<span className="text-accent">filings</span>
              </span>
            </Link>
            <p className="text-white/80 mb-6">
              Professional business registration, tax filing, and compliance services to help your business thrive.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-accent transition-colors duration-200"
                aria-label="Facebook"
              >
                <i className="ri-facebook-fill text-xl"></i>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-accent transition-colors duration-200"
                aria-label="Twitter"
              >
                <i className="ri-twitter-fill text-xl"></i>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-accent transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <i className="ri-linkedin-fill text-xl"></i>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-accent transition-colors duration-200"
                aria-label="Instagram"
              >
                <i className="ri-instagram-fill text-xl"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-poppins font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-white/80 hover:text-accent transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white/80 hover:text-accent transition-colors duration-200">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-white/80 hover:text-accent transition-colors duration-200">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="text-white/80 hover:text-accent transition-colors duration-200">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-white/80 hover:text-accent transition-colors duration-200">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-accent transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-poppins font-semibold text-lg mb-6">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/services/company-registration" className="text-white/80 hover:text-accent transition-colors duration-200">
                  Company Registration
                </Link>
              </li>
              <li>
                <Link href="/services/tax-filing" className="text-white/80 hover:text-accent transition-colors duration-200">
                  Tax Filing & Compliance
                </Link>
              </li>
              <li>
                <Link href="/services/trademark" className="text-white/80 hover:text-accent transition-colors duration-200">
                  Trademark Registration
                </Link>
              </li>
              <li>
                <Link href="/services/legal-documentation" className="text-white/80 hover:text-accent transition-colors duration-200">
                  Legal Documentation
                </Link>
              </li>
              <li>
                <Link href="/services/accounting" className="text-white/80 hover:text-accent transition-colors duration-200">
                  Accounting Services
                </Link>
              </li>
              <li>
                <Link href="/services/business-licenses" className="text-white/80 hover:text-accent transition-colors duration-200">
                  Business Licenses
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-poppins font-semibold text-lg mb-6">Newsletter</h4>
            <p className="text-white/80 mb-4">
              Subscribe to our newsletter for business tips and updates.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent text-white placeholder-white/60"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-accent text-white px-4 py-2 rounded-md font-medium hover:bg-accent/90 transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Zenithfilings. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="text-white/70 text-sm hover:text-accent transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-white/70 text-sm hover:text-accent transition-colors duration-200">
              Terms of Service
            </Link>
            <Link href="/cookie-policy" className="text-white/70 text-sm hover:text-accent transition-colors duration-200">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
