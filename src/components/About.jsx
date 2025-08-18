import { motion, useReducedMotion, useInView } from 'framer-motion';
import { Rocket, Users, Clock } from 'lucide-react';
import { useRef } from 'react';
import animations from '../utils/animations';
import Workspace from '/Work.png';

function About() {
  // Honor reduced motion preferences
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  // Use appropriate animations based on user's motion preferences
  const containerVariants = prefersReducedMotion ? animations.reducedMotion : animations.staggerContainer;
  const itemVariants = prefersReducedMotion ? animations.reducedMotion : animations.fadeInUp;
  const imageVariants = prefersReducedMotion ? animations.reducedMotion : animations.slideInLeft;
  const contentVariants = prefersReducedMotion ? animations.reducedMotion : animations.slideInRight;

  const highlights = [
    {
      icon: <Rocket className="h-6 w-6" />,
      title: 'Fast Delivery',
      description: 'We deliver projects on time, every time, without compromising on quality.'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Creative Team',
      description: 'Our team of experts brings innovation and creativity to every project.'
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: '24/7 Support',
      description: 'Round-the-clock support ensures your business never misses a beat.'
    }
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      aria-label="About Us" 
      className="section py-16 md:py-24 bg-white dark:bg-dark"
    >
      <div className="container px-4 mx-auto">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-block px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
            About Us
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dark dark:text-white">
            Transforming <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Digital</span> Experiences
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-5"></div>
        </div>
        
        <motion.div 
          className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left column - Image/illustration */}
          <motion.div variants={imageVariants} className="order-2 md:order-1">
            <div className="relative">
              {/* Background decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/5 rounded-full z-0"></div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-accent/10 rounded-full z-0"></div>
              
              {/* Main image container */}
              <div className="relative z-10 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-4 shadow-lg">
                <div className="overflow-hidden rounded-lg">
                  <img 
                    src={Workspace} 
                    alt="WebBuzz Team at work" 
                    width="600" 
                    height="400"
                    loading="lazy" 
                    className="w-full h-auto object-cover rounded-lg transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Stats card overlay */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-3 px-5 flex items-center gap-5">
                  <div className="text-center">
                    <div className="font-bold text-xl text-primary">20+</div>
                    <div className="text-xs text-muted">Projects</div>
                  </div>
                  <div className="h-8 w-px bg-gray-200 dark:bg-gray-700"></div>
                  <div className="text-center">
                    <div className="font-bold text-xl text-primary">95%</div>
                    <div className="text-xs text-muted">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right column - Text content */}
          <motion.div variants={contentVariants} className="order-1 md:order-2">
            <h3 className="text-2xl font-semibold mb-4 text-dark dark:text-white">We Create Digital Success Stories</h3>
            <p className="text-muted mb-6">
              We are a 24/7 digital solutions company helping businesses grow online through stunning websites, 
              creative designs, and result-driven marketing strategies that deliver measurable results.
            </p>
            
            {/* Highlights with icons */}
            <div className="space-y-5">
              {highlights.map((item, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="flex items-start gap-4 p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex-shrink-0">
                    <div className="bg-primary/10 p-3 rounded-lg text-primary shadow-sm">
                      {item.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1.5 text-dark dark:text-white">{item.title}</h3>
                    <p className="text-muted text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
