import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Process from "@/components/home/Process";
import Testimonials from "@/components/home/Testimonials";
import Pricing from "@/components/home/Pricing";
import FAQ from "@/components/home/FAQ";
import CTA from "@/components/home/CTA";
import Contact from "@/components/home/Contact";
import Resources from "@/components/home/Resources";
import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Zenithfilings – Professional Business Services</title>
        <meta name="description" content="Professional business registration, tax filing, and compliance services to help your business thrive." />
      </Helmet>
      <main>
        <Hero />
        <Services />
        <WhyChooseUs />
        <Process />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
        <Contact />
        <Resources />
      </main>
    </>
  );
};

export default Home;
