import { motion, useReducedMotion, useInView } from 'framer-motion';
import { Code, Palette, TrendingUp, ChevronRight } from 'lucide-react';
import { Link } from 'react-scroll';
import animations from '../utils/animations';
import { useRef } from 'react';

function Services() {
  // Honor reduced motion preferences
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  // Use appropriate animations based on user's motion preferences
  const containerVariants = prefersReducedMotion ? animations.reducedMotion : animations.staggerContainer;
  const itemVariants = prefersReducedMotion ? animations.reducedMotion : animations.scaleUp;
  const headerVariants = prefersReducedMotion ? animations.reducedMotion : animations.fadeInUp;

  const services = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Web Development",
      description: "Custom, responsive websites and web applications tailored to your business needs with modern technologies and optimized performance.",
      color: "primary",
      features: [
        "Responsive design for all devices",
        "SEO-optimized structure",
        "Fast loading and performance"
      ]
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Graphic Designing",
      description: "Eye-catching visual assets, brand identity development, and creative designs that effectively communicate your brand's unique story.",
      color: "secondary",
      features: [
        "Brand identity & logo design",
        "Print & digital marketing materials",
        "User interface design"
      ]
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Digital Marketing",
      description: "Strategic SEO optimization, targeted advertising campaigns, and social media management to increase your online visibility and engagement.",
      color: "accent",
      features: [
        "Search engine optimization (SEO)",
        "Social media marketing",
        "PPC & conversion optimization"
      ]
    }
  ];

  return (
    <section 
      id="services" 
      ref={sectionRef}
      aria-label="Our Services" 
      className="section bg-gray-50 dark:bg-gray-900 py-10 md:py-10 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 dark:opacity-5 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-accent/30 rounded-full"></div>
      </div>
      
      <div className="container relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="inline-block px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
            What We Offer
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dark dark:text-white">
            Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Services</span>
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-6"></div>
          <p className="text-muted max-w-2xl mx-auto">
            We deliver high-quality solutions to help your business stand out in the digital landscape with innovative and user-focused approaches.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-secondary dark:bg-gray-800 rounded-xl p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col h-full group"
            >
              {/* Service header with icon - consistent styling */}
              <div className="bg-primary/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/30 transition-colors">
                {/* Each service keeps its unique icon but with consistent color */}
                <span className="text-primary">{service.icon}</span>
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-white text-center group-hover:text-primary-light transition-colors">{service.title}</h3>
              
              <p className="text-gray-300 mb-6 text-center">{service.description}</p>
              
              {/* Feature list - consistent styling */}
              <ul className="mb-8 space-y-3 flex-grow">
                {service.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start">
                    <span className="text-primary mr-2 mt-0.5 flex-shrink-0">
                      <ChevronRight className="h-4 w-4" />
                    </span>
                    <span className="text-sm text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-auto text-center">
                <Link
                  to="contact"
                  smooth={true}
                  duration={500}
                  role="button"
                  aria-label={`Get quote for ${service.title}`}
                  className="inline-block px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-light hover:shadow-lg transform transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 group-hover:scale-105"
                >
                  Get Quote
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Services;
