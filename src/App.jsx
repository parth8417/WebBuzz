import { useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import ContactInfo from './components/ContactInfo';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import { ReducedMotionHandler } from './utils/reducedMotion';

function App() {
  // Refs for each section for native smooth scrolling alternative
  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    services: useRef(null),
    contactInfo: useRef(null),
    contact: useRef(null),
    footer: useRef(null)
  };

  // Section refs are used for direct DOM references

  return (
    <div className="min-h-screen">
      {/* Handle reduced motion preferences */}
      <ReducedMotionHandler />
      
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-4 focus:bg-white focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
      >
        Skip to main content
      </a>
      
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <main id="main-content" className="pt-20"> {/* Increased padding-top to account for taller navbar */}
        {/* Hero Section */}
        <div ref={sectionRefs.home}>
          <Hero />
        </div>
        
        {/* About Section */}
        <div ref={sectionRefs.about}>
          <About />
        </div>
        
        {/* Services Section */}
        <div ref={sectionRefs.services}>
          <Services />
        </div>
        
        {/* Contact Info Section */}
        <div ref={sectionRefs.contactInfo}>
          <ContactInfo />
        </div>
        
        {/* Contact Form Section */}
        <div ref={sectionRefs.contact}>
          <ContactForm />
        </div>
      </main>
      
      {/* Footer */}
      <div ref={sectionRefs.footer}>
        <Footer />
      </div>    </div>  );}export default App;