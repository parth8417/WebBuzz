import { motion, useReducedMotion } from 'framer-motion';
import { Phone, Mail, MapPin, Linkedin, Instagram, Facebook, Clock, MessageCircle, ExternalLink, ArrowRight } from 'lucide-react';
import animations from '../utils/animations';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

function ContactInfo() {
  const prefersReducedMotion = useReducedMotion();
  const animationVariants = prefersReducedMotion ? animations.reducedMotion : containerVariants;
  const itemAnimationVariants = prefersReducedMotion ? animations.reducedMotion : itemVariants;
  
  // Phone number with country code
  const phoneNumber = "*";
  const whatsappNumber = "*";

  return (
    <section id="contact-info" className="section bg-gradient-to-b from-secondary to-secondary-dark dark:from-dark dark:to-darker py-16 md:py-24 relative overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-accent/10 blur-3xl"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>
      <div className="container relative z-10">
        <motion.div
          className="text-center mb-16 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
            Get In Touch
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Contact <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Information</span>
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-6"></div>
          
          {/* 24/7 Badge */}
          <div className="mt-4 inline-flex items-center gap-2 bg-success/20 text-success px-4 py-2 rounded-full border border-success/20 shadow-sm">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium">We're available 24/7</span>
          </div>
        </motion.div>
        
        {/* Contact Cards */}
        <motion.div
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12 relative z-10"
          variants={animationVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Phone Card */}
          <motion.div
            variants={itemAnimationVariants}
            className="bg-secondary-dark/90 backdrop-blur-sm p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full border border-gray-700/30 hover:border-primary/30"
          >
            <div className="flex items-center justify-center">
              <div className="p-4 rounded-full bg-primary/20 mb-4 text-primary">
                <Phone className="h-6 w-6" />
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-2 text-white text-center">Phone</h3>
            
            <p className="text-gray-300 text-center mb-4 flex-grow">
              Temporarily Not Available
            </p>
            
            <a 
              href={`tel:${phoneNumber}`}
              className="mt-2 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-primary text-white transition-colors text-sm font-medium hover:bg-primary-light"
            >
              <span>Call us</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>

          {/* Email Card */}
          <motion.div
            variants={itemAnimationVariants}
            className="bg-secondary-dark/90 backdrop-blur-sm p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full border border-gray-700/30 hover:border-primary/30"
          >
            <div className="flex items-center justify-center">
              <div className="p-4 rounded-full bg-primary/20 mb-4 text-primary">
                <Mail className="h-6 w-6" />
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-2 text-white text-center">Email</h3>
            
            <p className="text-gray-300 text-center mb-4 flex-grow">
              WebBuzz03@gmail.com
            </p>
            
            <a 
              href="mailto:webbuzz03@gmail.com"
              className="mt-2 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-primary text-white transition-colors text-sm font-medium hover:bg-primary-light"
            >
              <span>Send email</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>

          {/* Location Card */}
          <motion.div
            variants={itemAnimationVariants}
            className="bg-secondary-dark/90 backdrop-blur-sm p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full border border-gray-700/30 hover:border-primary/30"
          >
            <div className="flex items-center justify-center">
              <div className="p-4 rounded-full bg-primary/20 mb-4 text-primary">
                <MapPin className="h-6 w-6" />
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-2 text-white text-center">Location</h3>
            
            <p className="text-gray-300 text-center mb-4 flex-grow">
              Ahmedabad, Gujarat, India
            </p>
            
            <a 
              href="https://maps.google.com/?q=Ahmedabad,Gujarat,India"
              className="mt-2 flex items-center justify-center gap-2 py-2 px-4 rounded-lg  bg-primary text-white transition-colors text-sm font-medium hover:bg-accent-light"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>View on map</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>
        
        {/* Social Media Section with WhatsApp button highlighted */}
        <motion.div
          className="mt-12 text-center relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-6 text-white">Connect With Us</h3>
          
          <div className="flex flex-wrap justify-center items-center gap-4">
            {/* WhatsApp button */}
            <a
              href={`https://wa.me/${whatsappNumber}?text=Hello%20WebBuzz,%20I%27m%20interested%20in%20your%20services`}
              className="flex items-center gap-2 py-3 px-6 rounded-full bg-[#25D366] text-white hover:bg-[#128C7E] transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105"
              aria-label="Contact us on WhatsApp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="font-medium">Chat on WhatsApp</span>
            </a>
            
            {/* LinkedIn */}
            <a
              href="#"
              className="p-3 rounded-full bg-gray-700 hover:bg-primary/80 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110"
              aria-label="Follow us on LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-5 w-5 text-white" />
            </a>
            
            {/* Instagram */}
            <a
              href="https://www.instagram.com/webbuzz.tech/"
              className="p-3 rounded-full bg-gray-700 hover:bg-gradient-to-br hover:from-purple-600 hover:to-orange-500 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110"
              aria-label="Follow us on Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="h-5 w-5 text-white" />
            </a>
            
            {/* Facebook */}
            <a
              href="https://www.facebook.com/share/1QbRTxw3G6/"
              className="p-3 rounded-full bg-gray-700 hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110"
              aria-label="Follow us on Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="h-5 w-5 text-white" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ContactInfo;
