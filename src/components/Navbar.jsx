import { useState, useEffect, useCallback, useRef } from 'react';
import { Menu, X, ChevronRight, ArrowRight, Home, Info, Briefcase, PhoneCall } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import animations from '../utils/animations';
import { scrollToElement, handleSectionNavigation, setupScrollSpy } from '../utils/scrollUtils';
import logoImage from '../assets/webbuzz-logo.png';

const navItems = [
  { name: 'Home', to: 'home', icon: Home },
  { name: 'About', to: 'about', icon: Info },
  { name: 'Services', to: 'services', icon: Briefcase },
  { name: 'Contact', to: 'contact-info', icon: PhoneCall }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('none');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  
  // Helper function to manually determine which section is in view
  const determineActiveSection = useCallback(() => {
    const scrollPosition = window.scrollY + 100; // Add offset for better detection
    
    // Find all section elements
    const sections = navItems.map(item => {
      const element = document.getElementById(item.to);
      if (!element) return null;
      
      return {
        id: item.to,
        offsetTop: element.offsetTop,
        offsetHeight: element.offsetHeight
      };
    }).filter(Boolean);
    
    // Sort sections by position (closest to top first)
    const sortedSections = [...sections].sort((a, b) => a.offsetTop - b.offsetTop);
    
    // Find the section that is currently in view
    for (const section of sortedSections) {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        return section.id;
      }
    }
    
    // If no section is found (user might be above all sections), use the first one
    return sortedSections[0]?.id || 'home';
  }, []);
  
  // Honor reduced motion preferences
  const prefersReducedMotion = useReducedMotion();
  
  // Use appropriate animations based on user's motion preferences
  const menuAnimation = prefersReducedMotion ? animations.reducedMotion : animations.fadeIn;
  const itemAnimation = prefersReducedMotion ? animations.reducedMotion : animations.fadeInUp;
  
  // Optimized scroll handler with requestAnimationFrame for better performance
  const handleScroll = useCallback(() => {
    // Use requestAnimationFrame for performance optimization
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      
      // Keep track of scroll position but don't change navbar visibility
      setLastScrollY(scrollY);
      
      // Always set scrolled to true for consistent navbar appearance
      setScrolled(true);
      
      // Use a throttled active section check
      if (!window.scrollCheckTimeout) {
        window.scrollCheckTimeout = setTimeout(() => {
          const newActiveSection = determineActiveSection();
          if (newActiveSection !== activeSection) {
            setActiveSection(newActiveSection);
          }
          window.scrollCheckTimeout = null;
        }, 100);
      }
    });
  }, [lastScrollY, determineActiveSection, activeSection]);

  // Handle clicks outside mobile menu to close it
  const handleClickOutside = useCallback((event) => {
    if (isOpen && 
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(event.target) && 
        navRef.current && 
        !navRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }, [isOpen]);

  // Handle escape key to close mobile menu - accessibility
  const handleEscapeKey = useCallback((event) => {
    if (isOpen && event.key === 'Escape') {
      setIsOpen(false);
    }
  }, [isOpen]);

  // Close mobile menu when screen size changes
  useEffect(() => {
    // Debounced resize handler with proper cleanup
    let resizeDebounceId = null;
    const handleResize = () => {
      if (resizeDebounceId) clearTimeout(resizeDebounceId);
      resizeDebounceId = setTimeout(() => {
        if (window.innerWidth >= 768 && isOpen) {
          setIsOpen(false);
        }
      }, 100);
    };
    
    // Optimized scroll handling with passive flag for better performance
    const optimizedScroll = () => {
      // Use passive listener for scroll events to improve performance
      handleScroll();
    };
    
    // Passive event listeners for performance where supported
    const passiveOption = { passive: true };
    
    window.addEventListener('resize', handleResize, passiveOption);
    window.addEventListener('scroll', optimizedScroll, passiveOption);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    
    // Check initial scroll position
    handleScroll();
    
    // Set initial active section
    setActiveSection(determineActiveSection());
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', optimizedScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      if (resizeDebounceId) clearTimeout(resizeDebounceId);
      if (window.scrollCheckTimeout) clearTimeout(window.scrollCheckTimeout);
    };
  }, [isOpen, handleScroll, determineActiveSection, handleClickOutside, handleEscapeKey]);

  // Enhanced intersection observer for more accurate ScrollSpy functionality
  useEffect(() => {
    // Get section IDs from navItems
    const sectionIds = navItems.map(item => item.to);
    
    // Create an accessible live region for screen readers
    const liveRegion = document.createElement('div');
    liveRegion.id = 'a11y-section-announcement';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);
    
    // Setup enhanced scroll spy with optimized options
    const cleanupScrollSpy = setupScrollSpy(
      sectionIds, 
      (newSection) => {
        // Only update if changed to prevent unnecessary re-renders
        if (newSection !== activeSection) {
          setActiveSection(newSection);
          
          // For screen readers - announce section change
          if (liveRegion) {
            liveRegion.textContent = `Current section: ${
              navItems.find(item => item.to === newSection)?.name || newSection
            }`;
          }
        }
      },
      {
        // Customize options for better accuracy
        offset: 80,
        rootMargin: '-80px 0px -20% 0px',
        thresholds: Array.from({ length: 21 }, (_, i) => i / 20) // Higher precision with more threshold points
      }
    );

    return () => {
      cleanupScrollSpy();
      if (document.getElementById('a11y-section-announcement')) {
        document.body.removeChild(document.getElementById('a11y-section-announcement'));
      }
    };
  }, [activeSection, navItems]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Enhanced navbar visibility animation with smoother transitions
  const navbarAnimationControls = {
    hidden: { y: -100, opacity: 0.6 },
    visible: { y: 0, opacity: 1 },
  };

  // Always visible regardless of scroll direction
  const navbarAnimationState = "visible";

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 navbar-glassmorphism bg-white/95 dark:bg-gray-900/95 shadow-lg backdrop-blur-md py-2.5 scrolled`}
      role="navigation"
      aria-label="Main navigation"
      initial={{ opacity: 0, y: -20 }}
      animate={navbarAnimationState}
      onMouseEnter={() => setIsMenuHovered(true)}
      onMouseLeave={() => setIsMenuHovered(false)}
      data-active-section={activeSection} // Add data attribute for debugging
      variants={navbarAnimationControls}
      // Improved transition physics for smoother animation
      transition={{
        y: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }}
    >
      <div className="container flex items-center justify-between mx-auto px-4 min-h-[72px] md:min-h-[80px]">
        {/* Logo */}
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a 
            href="/" 
            className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg"
            aria-label="WebBuzz Home"
            onClick={(e) => {
              e.preventDefault(); 
              
              // Update UI state immediately
              setActiveSection('home');
              
              // Use optimized scroll
              scrollToElement(
                'home',
                0,
                500, // shorter duration for better responsiveness
                'easeOutQuad',
                () => setActiveSection('home')
              );
            }}
          >
            <img 
              src={logoImage} 
              alt="WebBuzz Logo"
              className="h-11 sm:h-12 md:h-13 w-auto transition-transform duration-300 group-hover:scale-105 ml-0.5 navbar-logo" 
              style={{ objectFit: 'contain' }}
            />
          </a>
        </motion.div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:justify-center">
          <motion.nav 
            className="flex items-center justify-center mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3, staggerChildren: 0.1 }}
            role="navigation"
            aria-label="Main navigation"
          >
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  key={item.to}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * idx }}
                  className="relative group mx-1"
                >
                  <ScrollLink
                    to={item.to}
                    spy={true}
                    smooth={false} // Disable react-scroll's smooth scrolling
                    offset={-80} 
                    duration={0} // Set to 0 to make react-scroll instant
                    tabIndex={0}
                    role="menuitem"
                    aria-current={activeSection === item.to ? 'page' : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      
                      // Set active section immediately for better UI responsiveness
                      setActiveSection(item.to);
                      
                      // Use optimized smooth scrolling
                      scrollToElement(
                        item.to, 
                        80, // offset
                        450, // shorter duration for better responsiveness
                        'easeOutQuad', // more responsive easing
                        () => handleSectionNavigation(item.to, setActiveSection)
                      );
                    }}
                    onSetActive={() => setActiveSection(item.to)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        
                        // Set active section immediately
                        setActiveSection(item.to);
                        
                        scrollToElement(
                          item.to, 
                          80, 
                          450,
                          'easeOutQuad',
                          () => handleSectionNavigation(item.to, setActiveSection)
                        );
                      }
                    }}
                    className={`relative cursor-pointer transition-all px-3.5 py-3 mx-1.5 text-sm font-medium rounded-md overflow-hidden flex items-center justify-center gap-2 h-[48px] ${
                      activeSection === item.to 
                        ? 'text-primary' 
                        : `${scrolled ? 'text-gray-700 dark:text-gray-200' : 'text-gray-800 dark:text-gray-100'} hover:text-primary dark:hover:text-primary`
                    } focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`}
                  >
                    <Icon className={`h-4.5 w-4.5 ${activeSection === item.to ? 'text-primary' : ''} transition-all duration-300`} />
                    <span className="relative z-10 font-medium">{item.name}</span>
                    
                    {/* Active indicator with animation - enhanced */}
                    {activeSection === item.to && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                        layoutId="activeSection"
                        initial={{ opacity: 0, width: '0%' }}
                        animate={{ opacity: 1, width: '100%' }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                    )}
                    
                    {/* Hover effect with accessibility */}
                    <motion.span 
                      className="absolute inset-0 rounded-md bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.2 }}
                      aria-hidden="true"
                    ></motion.span>
                  </ScrollLink>
                </motion.div>
              );
            })}
          </motion.nav>
          
          {/* Get Started Button - Enhanced for accessibility */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="ml-6"
          >
            <ScrollLink
              to="contact"
              spy={true}
              smooth={false}
              offset={-80}
              duration={0}
              role="button"
              aria-label="Get Started - Contact Us"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  
                  // Update UI immediately
                  setActiveSection('contact');
                  
                  scrollToElement(
                    'contact',
                    80,
                    500, // shorter duration for better responsiveness
                    'easeOutQuad', 
                    () => handleSectionNavigation('contact', setActiveSection)
                  );
                }
              }}
              onClick={(e) => {
                e.preventDefault();
                
                // Update UI immediately
                setActiveSection('contact');
                
                scrollToElement(
                  'contact',
                  80,
                  500,
                  'easeOutQuad',
                  () => handleSectionNavigation('contact', setActiveSection)
                );
              }}
              className={`inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-sm font-medium rounded-md btn-get-started ${
                scrolled
                  ? 'bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg hover:translate-y-[-1px]'
                  : 'bg-white dark:bg-gray-800 text-primary hover:text-white hover:bg-primary shadow-md hover:shadow-lg border border-primary/30 backdrop-blur-sm hover:translate-y-[-1px]'
              } transition-all duration-300`}
            >
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </ScrollLink>
          </motion.div>
        </div>
        
        {/* Mobile Menu Button */}
        <motion.button 
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className={`p-2.5 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
            scrolled
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
              : 'bg-white/20 dark:bg-gray-800/40 text-gray-900 dark:text-white hover:bg-white/30 dark:hover:bg-gray-800/60 backdrop-blur-sm'
          } md:hidden transition-all duration-300`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </motion.button>
      </div>
      
      {/* Mobile Navigation - Improved slide-in panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay - click to close */}
            <motion.div
              className="md:hidden fixed inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              aria-hidden="true"
            />
            
            {/* Mobile menu panel */}
            <motion.div 
              id="mobile-menu"
              ref={mobileMenuRef}
              className="md:hidden fixed top-[70px] right-0 bottom-0 w-[85%] max-w-sm bg-white dark:bg-gray-900 shadow-xl z-50 overflow-y-auto overscroll-contain"
              variants={{
                hidden: { x: '100%', opacity: 0.5 },
                visible: { x: 0, opacity: 1 }
              }}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                duration: 0.3
              }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <motion.nav 
                className="px-4 pt-4 pb-6 space-y-2" 
                role="menu"
              >
                <div className="border-b border-gray-100 dark:border-gray-800 pb-2 mb-2">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 px-2">NAVIGATION</p>
                </div>
                
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.to}
                      variants={itemAnimation}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                    >
                      <ScrollLink
                        to={item.to}
                        spy={true}
                        smooth={false}
                        offset={-70}
                        duration={0}
                        onClick={(e) => {
                          e.preventDefault();
                          
                          // Close menu immediately
                          closeMenu();
                          
                          // Set active section right away
                          setActiveSection(item.to);
                          
                          // Use optimized smooth scroll
                          scrollToElement(
                            item.to, 
                            70, // offset for mobile
                            400, // shorter duration on mobile for responsiveness
                            'easeOutQuad', 
                            () => handleSectionNavigation(item.to, setActiveSection)
                          );
                        }}
                        onSetActive={() => setActiveSection(item.to)}
                        role="menuitem"
                        tabIndex={0}
                        aria-current={activeSection === item.to ? 'page' : undefined}
                        className={`flex items-center w-full px-4 py-4 rounded-lg ${
                          activeSection === item.to 
                            ? 'bg-primary/10 text-primary font-medium' 
                            : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:text-primary'
                        } transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            closeMenu();
                            
                            // Set active section right away
                            setActiveSection(item.to);
                            
                            scrollToElement(
                              item.to,
                              70,
                              400,
                              'easeOutQuad',
                              () => handleSectionNavigation(item.to, setActiveSection)
                            );
                          }
                        }}
                      >
                        <Icon className={`h-5 w-5 mr-3 ${activeSection === item.to ? 'text-primary' : ''}`} />
                        <span>{item.name}</span>
                        {activeSection === item.to && (
                          <motion.div 
                            className="ml-auto flex items-center gap-1 bg-primary/20 px-2 py-0.5 rounded-md text-primary text-xs"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                          >
                            <span>Current</span>
                            <ChevronRight className="h-4 w-4" />
                          </motion.div>
                        )}
                      </ScrollLink>
                    </motion.div>
                  );
                })}
                
                {/* Get Started button in mobile menu - enhanced */}
                <motion.div
                  variants={itemAnimation}
                  custom={navItems.length}
                  initial="hidden"
                  animate="visible"
                  className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800"
                >
                  <ScrollLink
                    to="contact"
                    spy={true}
                    smooth={false}
                    offset={-70}
                    duration={0}
                    onClick={(e) => {
                      e.preventDefault();
                      
                      // Close menu immediately for better responsiveness
                      closeMenu();
                      
                      // Update UI state immediately
                      setActiveSection('contact');
                      
                      // Use optimized scroll
                      scrollToElement(
                        'contact',
                        70,
                        450,
                        'easeOutQuad',
                        () => handleSectionNavigation('contact', setActiveSection)
                      );
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label="Get Started - Contact Us"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        closeMenu();
                        
                        // Update UI state immediately
                        setActiveSection('contact');
                        
                        scrollToElement(
                          'contact',
                          70,
                          450,
                          'easeOutQuad',
                          () => handleSectionNavigation('contact', setActiveSection)
                        );
                      }
                    }}
                    className="flex items-center justify-center w-full px-5 py-3.5 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg border border-primary/30"
                  >
                    Get Started
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </ScrollLink>
                </motion.div>
              </motion.nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Progress indicator for all devices - shows reading progress */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ 
          scaleX: lastScrollY / (document.documentElement.scrollHeight - window.innerHeight) || 0,
          opacity: scrolled ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Announcement region for accessibility */}
      <div className="sr-only" aria-live="polite" id="nav-announcer"></div>
    </motion.nav>
  );
}
