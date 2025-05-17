import { Helmet } from 'react-helmet';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - Zenithfilings</title>
        <meta name="description" content="Learn about Zenithfilings and our mission to simplify business services for entrepreneurs and established companies." />
      </Helmet>
      <main className="py-16 md:py-20 lg:py-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="section-subheading">About Us</span>
            <h1 className="section-heading mb-6">Our Mission and Values</h1>
            <p className="section-description">
              At Zenithfilings, we're dedicated to making business formation and compliance simple and accessible for everyone.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="font-poppins font-semibold text-2xl mb-4">Who We Are</h2>
              <p className="text-[#6c757d] mb-6">
                Zenithfilings was founded in 2008 with a simple mission: to simplify the complex processes of business formation, tax filing, and compliance for entrepreneurs and established businesses alike.
              </p>
              <p className="text-[#6c757d]">
                Our team consists of experienced professionals with backgrounds in business law, taxation, accounting, and corporate compliance. We combine our expertise with technology to deliver efficient, accurate, and affordable business services.
              </p>
            </div>
            <div className="aspect-video bg-[#f5f5f5] rounded-lg flex items-center justify-center">
              <span className="text-[#6c757d]">Company Vision Image</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center text-center mb-16">
            <div className="max-w-3xl">
              <h2 className="font-poppins font-semibold text-2xl mb-4">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div>
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <i className="ri-award-line text-primary text-2xl"></i>
                  </div>
                  <h3 className="font-poppins font-semibold text-xl mb-2">Excellence</h3>
                  <p className="text-[#6c757d]">We strive for excellence in every service we provide, ensuring accuracy and attention to detail.</p>
                </div>
                <div>
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <i className="ri-hand-heart-line text-primary text-2xl"></i>
                  </div>
                  <h3 className="font-poppins font-semibold text-xl mb-2">Integrity</h3>
                  <p className="text-[#6c757d]">We operate with honesty, transparency, and ethical standards in all our business practices.</p>
                </div>
                <div>
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <i className="ri-customer-service-2-line text-primary text-2xl"></i>
                  </div>
                  <h3 className="font-poppins font-semibold text-xl mb-2">Customer Focus</h3>
                  <p className="text-[#6c757d]">We prioritize our clients' needs and provide personalized solutions to help them succeed.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="font-poppins font-semibold text-2xl mb-8 text-center">Our Leadership Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="h-64 bg-[#f5f5f5] flex items-center justify-center">
                    <span className="text-[#6c757d]">Team Member Photo</span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-poppins font-semibold text-xl mb-1">Executive Name</h3>
                    <p className="text-accent font-medium mb-3">Position / Title</p>
                    <p className="text-[#6c757d]">Brief description of the team member's experience and expertise in the field of business services.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="font-poppins font-semibold text-2xl mb-8 text-center">Our History</h2>
            <div className="max-w-3xl mx-auto space-y-12">
              {[2008, 2012, 2016, 2020, 2023].map((year, index) => (
                <div key={index} className="flex flex-col md:flex-row items-start gap-6">
                  <div className="w-24 h-24 flex-shrink-0 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="font-poppins font-bold text-xl text-primary">{year}</span>
                  </div>
                  <div>
                    <h3 className="font-poppins font-semibold text-xl mb-2">Milestone Title</h3>
                    <p className="text-[#6c757d]">Description of the significant company milestone or achievement that occurred during this year.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default About;
