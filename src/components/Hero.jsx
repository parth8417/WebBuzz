import { motion, useReducedMotion, useAnimation, useInView } from 'framer-motion';
import { Link } from 'react-scroll';
import { ChevronRight, ArrowDown, Rocket, Code, Palette, TrendingUp } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import animations from '../utils/animations';
import adjustHeroHeight from '../utils/heroHeightAdjust';
import logoImage from '../assets/webbuzz-logo.png';

function Hero() {
  // Honor reduced motion preferences
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.1 });
  
  // Use appropriate animations based on user's motion preferences
  const containerVariants = prefersReducedMotion ? animations.reducedMotion : animations.staggerContainer;
  const itemVariants = prefersReducedMotion ? animations.reducedMotion : animations.fadeInUp;
  const fadeInVariants = prefersReducedMotion ? animations.reducedMotion : animations.fadeIn;
  
  // Services with icons for visual appeal
  const services = [
    { name: "Web Development", icon: Code },
    { name: "Graphic Designing", icon: Palette },
    { name: "Digital Marketing", icon: TrendingUp }
  ];
  
  // Primary brand color
  const primaryColor = '#6C5CE7';
  
  // Start animations when section comes into view
  useEffect(() => {
    if (inView) {
      controls.start("visible");
      setIsVisible(true);
    }
  }, [controls, inView]);
  
  // Adjust hero height when component mounts and on resize
  useEffect(() => {
    adjustHeroHeight();
    window.addEventListener('resize', adjustHeroHeight);
    
    // Animation trigger with slight delay for better UX
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', adjustHeroHeight);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section 
      id="home" 
      aria-label="Home"
      className="section relative min-h-[100vh] flex items-center justify-center overflow-hidden hero-compact"
    >
      {/* Enhanced background with improved texture and depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 z-0 overflow-hidden">
        {/* Enhanced dot matrix pattern with variable opacity */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill={primaryColor} />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
        
        {/* Animated gradient overlays with enhanced colors */}
        <motion.div 
          className="absolute inset-0 opacity-25 dark:opacity-20"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear'
          }}
          style={{
            backgroundSize: '200% 200%',
            backgroundImage: `radial-gradient(circle at 15% 15%, ${primaryColor}40, transparent 70%), 
                             radial-gradient(circle at 85% 85%, #00B4D840, transparent 70%)`,
          }}
        />
        
        {/* Geometric shapes with subtle animations */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Top-left blob */}
          <motion.div 
            className="absolute -top-40 -left-40 w-[40rem] h-[40rem]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path 
                fill={`${primaryColor}20`}
                d="M39.5,-65.3C52.9,-56.7,66.8,-49.2,75.2,-37.2C83.6,-25.2,86.5,-8.7,82.8,6.2C79.2,21,69,34.1,57.9,45.1C46.8,56.1,34.9,65,21.1,70.8C7.4,76.6,-8.1,79.3,-22.4,75.9C-36.7,72.6,-49.8,63.3,-59.9,51C-70,38.8,-77.2,23.7,-79.8,7.5C-82.4,-8.7,-80.4,-26,-71.7,-38.6C-63,-51.1,-47.5,-59,-33.3,-66.9C-19.1,-74.9,-6.3,-82.8,3.9,-79.1C14.1,-75.5,26.1,-73.9,39.5,-65.3Z" 
                transform="translate(100 100)"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 100 100"
                  to="360 100 100"
                  dur="120s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </motion.div>
          
          {/* Bottom-right blob */}
          <motion.div 
            className="absolute -bottom-40 -right-40 w-[50rem] h-[50rem]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          >
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path 
                fill="#00B4D820" 
                d="M45.7,-75.2C58.9,-67.3,69.3,-54.4,75.9,-39.9C82.4,-25.5,85,-9.6,83.4,6.4C81.9,22.3,76.2,38.2,66.4,50.6C56.7,63,42.9,72,28,78.9C13.1,85.8,-2.8,90.6,-17.4,87.8C-32.1,85,-45.6,74.7,-58.3,62.4C-71,50.1,-82.9,35.8,-88.2,19C-93.5,2.2,-92.2,-17.2,-83.7,-31.4C-75.2,-45.6,-59.5,-54.7,-44.4,-61.9C-29.3,-69,-14.7,-74.2,0.8,-75.4C16.2,-76.7,32.4,-83.1,45.7,-75.2Z" 
                transform="translate(100 100)"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="360 100 100"
                  to="0 100 100"
                  dur="120s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </motion.div>
        </div>
        
        {/* Floating particles effect (subtle) */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${i % 2 ? 'bg-primary/30' : 'bg-accent/30'}`}
              style={{
                width: Math.floor(Math.random() * 10) + 6 + 'px',
                height: Math.floor(Math.random() * 10) + 6 + 'px',
                left: Math.floor(Math.random() * 100) + '%',
                top: Math.floor(Math.random() * 100) + '%',
                filter: 'blur(1px)'
              }}
              animate={{
                y: [0, -15, 0],
                x: [0, Math.random() > 0.5 ? 10 : -10, 0],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{
                duration: 3 + i * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      {/* Enhanced grid overlay for depth */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.04] z-0"></div>

      {/* Logo positioned at top-left */}
      <motion.div 
        className="absolute top-5 sm:top-6 md:top-8 left-5 sm:left-7 md:left-10 z-20"
        variants={fadeInVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {/* <div className="p-4 bg-white/90 dark:bg-gray-900/90 rounded-xl shadow-lg backdrop-blur-sm">
          <img 
            src={logoImage} 
            alt="WebBuzz Logo" 
            className="h-14 sm:h-16 md:h-18 w-auto" 
            width="72"
            height="72"
          />
        </div> */}
      </motion.div>

      {/* Main content with centered layout */}
      <div className="container relative z-10 flex flex-col justify-center items-center h-full">
        <motion.div 
          ref={ref}
          className="max-w-4xl mx-auto text-center hero-content px-4 sm:px-6"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Moderately sized but impactful headline with gradient text */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-5 sm:mb-7 hero-text-gradient leading-[1.2] tracking-tight"
          >
            Elevate Your <span className="hero-text-gradient-enhanced inline-block">Digital Presence</span>
          </motion.h1>
          
          {/* New tagline for better messaging */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto font-medium"
          >
            Transforming ideas into powerful digital experiences that drive results.
          </motion.p>

          {/* Enhanced service list with professional badges */}
          <motion.div
            variants={itemVariants} 
            className="flex flex-wrap justify-center items-center gap-4 mb-10"
          >
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div 
                  key={index}
                  className="flex items-center bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-gray-200/50 dark:border-gray-700/50 hover:shadow-md hover:border-primary/20 transition-all duration-300"
                  whileHover={{ y: -2, scale: 1.03 }}
                >
                  <div className="bg-primary/10 rounded-full p-1.5 mr-2.5">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200">{service.name}</span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Enhanced CTAs with premium styling */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-5 hero-buttons"
          >
            <Link
              to="contact"
              smooth={true}
              duration={800}
              offset={-80}
              role="button"
              aria-label="Get started with our services"
              className="group btn-glow btn-primary cursor-pointer px-6 sm:px-8 py-3.5 sm:py-4 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-all shadow-md hover:shadow-xl hover:shadow-primary/30 hover:translate-y-[-2px] flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 w-full sm:w-auto text-base"
            >
              <span className="relative z-10">Get Started</span>
              <ChevronRight className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              <span className="absolute inset-0 rounded-lg overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </span>
            </Link>
            
            <Link
              to="services"
              smooth={true}
              duration={800}
              offset={-80}
              role="button"
              aria-label="View our services"
              className="group btn-outline cursor-pointer px-6 sm:px-8 py-3.5 sm:py-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-primary/30 text-primary hover:border-primary hover:bg-primary/5 rounded-lg font-medium transition-all hover:shadow-lg flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 w-full sm:w-auto text-base"
            >
              Our Services
              <Rocket className="h-4 w-4 transition-all duration-300 group-hover:translate-x-1 group-hover:rotate-12" />
            </Link>
          </motion.div>
          
          {/* Enhanced scroll indicator */}
          <motion.div 
            variants={itemVariants}
            className="mt-20 flex justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <Link
              to="about"
              smooth={true}
              duration={800}
              offset={-80}
              className="flex flex-col items-center justify-center cursor-pointer group"
              aria-label="Scroll to About section"
            >
              <span className="text-sm mb-3 text-gray-600 dark:text-gray-300 group-hover:text-primary dark:group-hover:text-primary transition-colors font-medium">
                Discover More
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeInOut'
                }}
                className="bg-white dark:bg-gray-800 p-2.5 rounded-full shadow-lg backdrop-blur-sm border border-primary/20 group-hover:bg-primary/10 transition-colors duration-300"
              >
                <ArrowDown className="h-5 w-5 text-primary" />
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Enhanced bottom decorative wave with animation */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-0 opacity-80 dark:opacity-40">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full" preserveAspectRatio="none">
            <path 
              fill="url(#wave-gradient)" 
              d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,149.3C672,149,768,171,864,176C960,181,1056,171,1152,154.7C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            >
            </path>
            <defs>
              <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={primaryColor} stopOpacity="0.05" />
                <stop offset="50%" stopColor={primaryColor} stopOpacity="0.15" />
                <stop offset="100%" stopColor="#00B4D8" stopOpacity="0.05" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>
      
      {/* Professional accent lines and highlights */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 z-0"></div>
      
      {/* Decorative floating elements */}
      <motion.div 
        className="absolute right-[5%] top-1/4 w-12 h-12 md:w-16 md:h-16 z-0 opacity-70"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.7, scale: 1, rotate: 180 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="50" fill={`${primaryColor}20`} />
          <circle cx="50" cy="50" r="35" stroke={primaryColor} strokeOpacity="0.3" strokeWidth="2" />
          <circle cx="50" cy="50" r="20" fill={`${primaryColor}30`} />
        </svg>
      </motion.div>
      
      <motion.div 
        className="absolute left-[8%] bottom-1/3 w-16 h-16 md:w-20 md:h-20 z-0 opacity-60"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.6, scale: 1, rotate: 90 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="10" width="80" height="80" stroke="#00B4D8" strokeOpacity="0.4" strokeWidth="2" />
          <rect x="25" y="25" width="50" height="50" fill="#00B4D830" />
        </svg>
      </motion.div>
    </section>
  );
}

export default Hero;
