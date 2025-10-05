import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { Linkedin, Instagram, Facebook, Twitter, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import logoImage from '../assets/webbuzz-logo.png';

function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', to: 'home', icon: <ArrowUp size={14} className="mr-1.5" /> },
    { name: 'About', to: 'about', icon: <ArrowUp size={14} className="mr-1.5" /> },
    { name: 'Services', to: 'services', icon: <ArrowUp size={14} className="mr-1.5" /> },
    { name: 'Contact Info', to: 'contact-info', icon: <ArrowUp size={14} className="mr-1.5" /> },
    { name: 'Contact Form', to: 'contact', icon: <ArrowUp size={14} className="mr-1.5" /> }
  ];

  const contactInfo = [
    { icon: <Phone size={16} />, text: 'Temporarily Not Available', href: 'tel:Temporarily Not Available' },
    { icon: <Mail size={16} />, text: 'WebBuzz03@gmail.com', href: 'mailto:webbuzz03@gmail.com' },
    { icon: <MapPin size={16} />, text: 'Ahmedabad, Gujarat, India', href: 'https://maps.google.com/?q=Ahmedabad,Gujarat,India' }
  ];

  const socialLinks = [
    { 
      icon: <Linkedin size={18} />, 
      name: 'LinkedIn', 
      href: '#', 
      color: '#0A66C2',
      hoverClass: 'hover:bg-[#0A66C2]'
    },
    { 
      icon: <Instagram size={18} />, 
      name: 'Instagram', 
      href: 'https://www.instagram.com/webbuzz.tech/', 
      color: '#E4405F',
      hoverClass: 'hover:bg-gradient-to-tr hover:from-[#FFDC80] hover:via-[#E4405F] hover:to-[#8A3AB9]'
    },
    { 
      icon: <Facebook size={18} />, 
      name: 'Facebook', 
      href: 'https://www.facebook.com/share/1QbRTxw3G6/', 
      color: '#1877F2',
      hoverClass: 'hover:bg-[#1877F2]'
    },
    { 
      icon: <Twitter size={18} />, 
      name: 'Twitter', 
      href: '#', 
      color: '#1DA1F2',
      hoverClass: 'hover:bg-[#1DA1F2]'
    }
  ];

  return (
    <footer id="footer" className="relative bg-dark text-white pt-12 md:pt-14 pb-6 mt-8">
      {/* Top border with gradient */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary"></div>
      
      {/* Back to top button */}
      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
        <Link
          to="home"
          smooth={true}
          duration={800}
          offset={-80}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:scale-110 transition-all shadow-xl"
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </Link>
      </div>
      
      <div className="container mx-auto px-4 sm:px-5 lg:px-6">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-12 gap-y-6 gap-x-6 lg:gap-x-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Column 1 - Logo and Tagline */}
          <div className="md:col-span-5">
            <div className="flex items-center mb-3">
              <img 
                src={logoImage} 
                alt="WebBuzz Logo" 
                className="h-12 w-auto mr-2" 
              />
            </div>
            <p className="text-gray-400 mb-4 max-w-sm text-base leading-relaxed">
              Accelerating digital growth for businesses with innovative web solutions and 24/7 reliable support.
            </p>
            
            {/* Online Support Badge - Moved from Business Hours section */}
            <div className="mb-4">
              <div className="inline-flex items-center px-3 py-1.5 bg-success/20 text-success text-sm rounded-full border border-success/30 shadow-sm">
                <span className="w-2.5 h-2.5 bg-success rounded-full mr-2 animate-pulse"></span>
                24/7 Online Support Available
              </div>
            </div>
            
            {/* Social Icons */}
            <div className="flex flex-wrap gap-2.5 mt-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.name}
                  className={`bg-gray-800/80 p-2.5 rounded-full transition-all duration-300 flex items-center justify-center hover:shadow-md hover:scale-110 ${social.hoverClass} backdrop-blur-sm`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="md:col-span-3 md:flex md:justify-center">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-white relative inline-block">
                Quick Links
                <span className="absolute -bottom-1 left-0 w-10 h-0.5 bg-gradient-to-r from-primary to-accent"></span>
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.to}
                      smooth={true}
                      duration={500}
                      offset={-70}
                      className="text-gray-400 hover:text-primary transition-colors duration-300 cursor-pointer flex items-center group text-base"
                    >
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:-rotate-90">
                        {link.icon}
                      </span>
                      <span className="group-hover:translate-x-1.5 transition-transform duration-300">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3 - Contact Info */}
          <div className="md:col-span-4 md:flex md:justify-end">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-white relative inline-block">
                Contact Us
                <span className="absolute -bottom-1 left-0 w-10 h-0.5 bg-gradient-to-r from-primary to-accent"></span>
              </h3>
              <ul className="space-y-3.5">
                {contactInfo.map((item, index) => (
                  <li key={index} className="flex items-center group">
                    <div className="flex items-center justify-center mr-3 text-primary bg-gray-800/70 p-2 rounded-full group-hover:scale-110 transition-transform">{item.icon}</div>
                    <a 
                      href={item.href} 
                      className="text-gray-400 hover:text-primary transition-colors duration-300 text-base"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Copyright with divider */}
        <div className="relative border-t border-gray-800 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p 
              className="text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              &copy; {currentYear} WebBuzz. All rights reserved.
            </motion.p>
            <motion.div 
              className="mt-4 md:mt-0 flex space-x-6 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <a href="#" className="text-gray-400 hover:text-primary transition-colors relative group">
                Privacy Policy
                <span className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors relative group">
                Terms of Service
                <span className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Credit line - subtle but important */}
      <div className="mt-5 text-center text-sm text-gray-500 px-4">
        <p>Crafted with <span className="text-red-500 animate-pulse">♥</span> by WebBuzz Team</p>
      </div>
    </footer>
  );
}

export default Footer;
