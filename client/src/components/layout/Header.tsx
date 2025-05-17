import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [location] = useLocation();

  const handleScroll = () => {
    if (window.scrollY > 20) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`bg-white shadow-md z-40 w-full ${isFixed ? "navbar-fixed" : ""}`}>
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-primary font-poppins font-bold text-2xl md:text-3xl">
                Zenith<span className="text-accent">filings</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            <Link href="/services" className={`font-medium hover:text-primary transition-colors duration-200 ${location === "/services" ? "text-primary" : "text-dark"}`}>
              Services
            </Link>
            <Link href="/compliance-calendar" className={`font-medium hover:text-primary transition-colors duration-200 ${location === "/compliance-calendar" ? "text-primary" : "text-dark"}`}>
              Compliance Calendar
            </Link>
            <Link href="/about" className={`font-medium hover:text-primary transition-colors duration-200 ${location === "/about" ? "text-primary" : "text-dark"}`}>
              About
            </Link>
            <Link href="/resources" className={`font-medium hover:text-primary transition-colors duration-200 ${location === "/resources" ? "text-primary" : "text-dark"}`}>
              Resources
            </Link>
            <Link href="/#pricing" className="text-dark font-medium hover:text-primary transition-colors duration-200">
              Pricing
            </Link>
            <Link href="/contact" className={`font-medium hover:text-primary transition-colors duration-200 ${location === "/contact" ? "text-primary" : "text-dark"}`}>
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="text-primary font-medium hover:underline">
              Login
            </Link>
            <Link href="/register" className="bg-accent text-white px-5 py-2 rounded-md font-medium hover:bg-accent/90 transition-colors duration-200">
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button type="button" className="text-dark focus:outline-none" aria-label="Toggle menu">
                  {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80%] sm:w-[300px] pt-12">
                <nav className="flex flex-col space-y-4">
                  <Link href="/services" onClick={closeMobileMenu} className="px-3 py-2 text-dark font-medium hover:bg-primary hover:text-white rounded-md">
                    Services
                  </Link>
                  <Link href="/compliance-calendar" onClick={closeMobileMenu} className="px-3 py-2 text-dark font-medium hover:bg-primary hover:text-white rounded-md">
                    Compliance Calendar
                  </Link>
                  <Link href="/about" onClick={closeMobileMenu} className="px-3 py-2 text-dark font-medium hover:bg-primary hover:text-white rounded-md">
                    About
                  </Link>
                  <Link href="/resources" onClick={closeMobileMenu} className="px-3 py-2 text-dark font-medium hover:bg-primary hover:text-white rounded-md">
                    Resources
                  </Link>
                  <Link href="/#pricing" onClick={closeMobileMenu} className="px-3 py-2 text-dark font-medium hover:bg-primary hover:text-white rounded-md">
                    Pricing
                  </Link>
                  <Link href="/contact" onClick={closeMobileMenu} className="px-3 py-2 text-dark font-medium hover:bg-primary hover:text-white rounded-md">
                    Contact
                  </Link>
                  <div className="flex space-x-3 mt-4 px-3">
                    <Link href="/login" onClick={closeMobileMenu} className="text-primary font-medium hover:underline">
                      Login
                    </Link>
                    <Link href="/register" onClick={closeMobileMenu} className="bg-accent text-white px-4 py-2 rounded-md font-medium hover:bg-accent/90 transition-colors duration-200">
                      Register
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
