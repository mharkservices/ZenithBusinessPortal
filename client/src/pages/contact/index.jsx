import { Helmet } from 'react-helmet';
import Contact from "@/components/home/Contact";

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us - Zenithfilings</title>
        <meta name="description" content="Get in touch with our business services experts for any questions or service needs." />
      </Helmet>
      <main>
        {/* Hero Section */}
        <section className="bg-primary py-12 md:py-16">
          <div className="container-custom">
            <div className="max-w-2xl">
              <h1 className="font-poppins font-bold text-3xl md:text-4xl text-white mb-4">
                Contact Us
              </h1>
              <p className="text-white/90 text-lg">
                Our team is ready to answer your questions and help with your business needs.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <Contact />
        
        {/* Map Section */}
        <section className="py-16 md:py-0 pb-0">
          <div className="h-[400px] bg-[#f5f5f5] w-full flex items-center justify-center">
            <span className="text-[#6c757d]">Map will be displayed here</span>
          </div>
        </section>
      </main>
    </>
  );
};

export default ContactPage;
