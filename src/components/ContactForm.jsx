import { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion, useAnimation, useInView } from 'framer-motion';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { CheckCircle, AlertTriangle, Loader2, Mail, User, Phone, MessageSquare, Briefcase, ChevronDown, Code, Palette, TrendingUp } from 'lucide-react';
import { useToast } from './Toast';
import animations from '../utils/animations';

function ContactForm() {
  // Toast notification
  const { addToast } = useToast();
  
  // Honor reduced motion preferences
  const prefersReducedMotion = useReducedMotion();
  
  // Refs and animations setup
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const controls = useAnimation();
  
  // Use appropriate animations based on user's motion preferences
  const headerVariants = prefersReducedMotion ? animations.reducedMotion : animations.fadeInUp;
  const formAnimation = prefersReducedMotion ? animations.reducedMotion : animations.scaleUp;
  
  // Track if form should be shown (only after service selection)
  const [showForm, setShowForm] = useState(false);
  
  // Start animations when section comes into view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    service: '', // Service selection
    honeypot: '' // Anti-spam honeypot field
  });
  
  // Form status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [errorMessage, setErrorMessage] = useState('');
  
  // Refs for accessibility focus management
  const formRef = useRef(null);
  const nameInputRef = useRef(null);
  
  // Available services
  const services = [
    { 
      id: "webDev", 
      name: "Web Development",
      icon: <Code className="h-6 w-6" />,
      description: "Custom websites and web applications with responsive design.",
      color: "primary" 
    },
    { 
      id: "graphicDesign", 
      name: "Graphic Design",
      icon: <Palette className="h-6 w-6" />,
      description: "Branding, logos, and visual assets for your business.",
      color: "accent" 
    },
    { 
      id: "digitalMarketing", 
      name: "Digital Marketing",
      icon: <TrendingUp className="h-6 w-6" />,
      description: "SEO, social media marketing, and online advertising.",
      color: "secondary" 
    }
  ];
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  // Form validation
  const validateForm = () => {
    // Check if honeypot field is filled (bot detection)
    if (formData.honeypot) {
      return false;
    }
    
    // Validate required fields
    if (!formData.name.trim()) {
      setErrorMessage('Name is required');
      return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address');
      return false;
    }
    
    // Validate service selection
    if (!formData.service || formData.service.trim() === '') {
      setErrorMessage('Please select a service');
      return false;
    }
    
    // Validate message length
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setErrorMessage('Message must be at least 10 characters');
      return false;
    }
    
    // Validate phone if provided (optional field)
    if (formData.phone && !/^[0-9+\-\s()]+$/.test(formData.phone)) {
      setErrorMessage('Please enter a valid phone number');
      return false;
    }
    
    return true;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset previous submission states
    setSubmitStatus(null);
    setErrorMessage('');
    
    // Validate form
    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }
    
    // Start submission
    setIsSubmitting(true);
    
    try {
      // Prepare data for Firestore (exclude honeypot)
      const { honeypot, ...messageData } = formData;
      
      // Ensure required fields are properly formatted
      const formattedData = {
        name: messageData.name.trim(),
        email: messageData.email.trim(),
        message: messageData.message.trim(),
        service: messageData.service,
        phone: messageData.phone || null, // Handle empty phone as null
        createdAt: serverTimestamp()
      };
      
      // Add message to Firestore with server timestamp
      await addDoc(collection(db, 'messages'), formattedData);
      
      // Success handling
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        service: '',
        honeypot: ''
      });
      
      // Show toast notification
      addToast('Thanks! We\'ll get back within 24 hours.', 'success');
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('Something went wrong. Please try again later.');
      setSubmitStatus('error');
      
      // Show toast notification for error
      addToast('Something went wrong. Please try again later.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section 
      id="contact" 
      ref={sectionRef}
      aria-label="Contact Us" 
      className="section bg-gray-50 dark:bg-gray-900 py-16 md:py-20 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 dark:opacity-5 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-accent/30 rounded-full"></div>
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-secondary/20 rounded-full"></div>
      </div>
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-14"
            variants={headerVariants}
            initial="hidden"
            animate={controls}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="inline-block px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              Contact Us
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dark dark:text-white">
              Get In <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Touch</span>
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-6"></div>
            <p className="mt-4 text-muted max-w-2xl mx-auto">
              Have a question or want to work together? We'd love to hear from you!
            </p>
          </motion.div>

          {/* Service selection heading */}
          <motion.div 
            className="text-center mb-8"
            variants={formAnimation}
            initial="hidden"
            animate={controls}
          >
            <div className="inline-block px-4 py-2 bg-primary/20 rounded-full mb-4">
              <h3 className="text-lg font-medium text-primary">Select a Service</h3>
            </div>
            <p className="text-gray-300">Choose the service you're interested in to continue</p>
          </motion.div>

          {/* Service cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12"
            variants={formAnimation}
            initial="hidden"
            animate={controls}
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className={`bg-gray-900/90 p-6 rounded-xl shadow-md border 
                            ${formData.service === service.id 
                              ? 'border-primary shadow-lg scale-[1.02]' 
                              : 'border-gray-700'} 
                            cursor-pointer transition-all duration-300 hover:shadow-lg group`}
                onClick={() => {
                  setFormData({...formData, service: service.id});
                  setShowForm(true);
                  
                  // Scroll to show the Contact Form header clearly
                  setTimeout(() => {
                    const formHeader = document.getElementById('contact-form-header');
                    
                    if (formHeader) {
                      const headerRect = formHeader.getBoundingClientRect();
                      const scrollPosition = window.pageYOffset + headerRect.top - 145; // Show header with padding above
                      
                      window.scrollTo({
                        top: scrollPosition,
                        behavior: 'smooth'
                      });
                    }
                  }, 250); // Allow more time for the form to render
                }}
              >
                <div className={`rounded-full w-14 h-14 flex items-center justify-center mb-4 transition-colors
                                 ${service.id === 'webDev' ? 'bg-blue-900/30' : 
                                   service.id === 'graphicDesign' ? 'bg-blue-900/30' : 
                                   'bg-blue-900/30'}`}>
                  <span className={`${service.id === 'webDev' ? 'text-blue-400' : 
                                     service.id === 'graphicDesign' ? 'text-blue-400' :
                                     'text-blue-400'}`}>{service.icon}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-primary transition-colors">{service.name}</h3>
                <p className="text-sm text-gray-400">{service.description}</p>
                <div className="mt-4 flex items-center">
                  <div 
                    className={`h-5 w-5 rounded-full border-2 ${formData.service === service.id 
                      ? `bg-primary border-primary` 
                      : `border-gray-500`} 
                      mr-2 flex items-center justify-center transition-colors`}
                  >
                    {formData.service === service.id && (
                      <div className="h-2 w-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-300">
                    {formData.service === service.id ? "Selected" : "Select this service"}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Form section - only shown after service selection */}
          {showForm && (
            <motion.div
              variants={formAnimation}
              initial="hidden"
              animate="visible"
              className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 backdrop-blur-sm relative overflow-hidden mt-10 pt-5"
            >
              {/* Decorative elements inside form container */}
              <div className="absolute top-0 right-0 h-40 w-40 bg-primary/5 rounded-full -mr-20 -mt-20 z-0"></div>
              <div className="absolute bottom-0 left-0 h-32 w-32 bg-accent/5 rounded-full -ml-16 -mb-16 z-0"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-8" id="contact-form-header">
                  <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold ml-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Contact Form
                  </h3>
                </div>
              
                {/* Success message */}
                {submitStatus === 'success' && (
                  <div className="mb-8 p-5 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-xl flex items-center border border-green-100 dark:border-green-800 shadow-sm">
                    <div className="bg-green-100 dark:bg-green-800/50 p-2 rounded-full mr-3 flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800 dark:text-green-200">Message Sent!</h4>
                      <p className="text-sm">Thanks! We'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                )}
                
                {/* Error message */}
                {submitStatus === 'error' && (
                  <div className="mb-8 p-5 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-xl flex items-center border border-red-100 dark:border-red-800 shadow-sm">
                    <div className="bg-red-100 dark:bg-red-800/50 p-2 rounded-full mr-3 flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-error" />
                    </div>
                    <div>
                      <h4 className="font-medium text-red-800 dark:text-red-200">Submission Error</h4>
                      <p className="text-sm">{errorMessage || 'An error occurred. Please try again.'}</p>
                    </div>
                  </div>
                )}
                
                {/* Contact Form */}
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                  {/* Honeypot field - hidden from real users, but bots might fill it */}
                  <div className="opacity-0 absolute top-0 left-0 h-0 w-0 -z-10 overflow-hidden">
                    <label htmlFor="honeypot">Skip this field</label>
                    <input
                      type="text"
                      id="honeypot"
                      name="honeypot"
                      value={formData.honeypot}
                      onChange={handleChange}
                      tabIndex="-1"
                      autoComplete="off"
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Name Field */}
                    <div className="relative">
                      <label htmlFor="name" className="flex text-sm font-medium text-muted mb-2 items-center">
                        <User className="h-4 w-4 mr-1.5 text-primary" />
                        <span>Name <span className="text-red-500">*</span></span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          ref={nameInputRef}
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your Name"
                          required
                          aria-required="true"
                          aria-invalid={submitStatus === 'error' && !formData.name ? 'true' : 'false'}
                          className="w-full px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-600
                            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                            dark:bg-gray-700 bg-white shadow-sm transition-all duration-300
                            disabled:opacity-60 disabled:cursor-not-allowed"
                          disabled={isSubmitting}
                        />
                        {submitStatus === 'error' && !formData.name && (
                          <p className="text-error text-xs mt-1 ml-1 absolute">Name is required</p>
                        )}
                      </div>
                    </div>
                    
                    {/* Email Field */}
                    <div className="relative">
                      <label htmlFor="email" className="flex text-sm font-medium text-muted mb-2 items-center">
                        <Mail className="h-4 w-4 mr-1.5 text-primary" />
                        <span>Email <span className="text-red-500">*</span></span>
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          required
                          aria-required="true"
                          aria-invalid={submitStatus === 'error' && (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) ? 'true' : 'false'}
                          className="w-full px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-600
                            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                            dark:bg-gray-700 bg-white shadow-sm transition-all duration-300
                            disabled:opacity-60 disabled:cursor-not-allowed"
                          disabled={isSubmitting}
                        />
                        {submitStatus === 'error' && (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) && (
                          <p className="text-error text-xs mt-1 ml-1 absolute">Valid email is required</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Phone Field (Optional) */}
                    <div className="relative">
                      <label htmlFor="phone" className="flex text-sm font-medium text-muted mb-2 items-center">
                        <Phone className="h-4 w-4 mr-1.5 text-primary" />
                        <span>Phone (Optional)</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Your Phone Number"
                        aria-required="false"
                        className="w-full px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-600
                          focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                          dark:bg-gray-700 bg-white shadow-sm transition-all duration-300
                          disabled:opacity-60 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    {/* Service Selection */}
                    <div className="relative">
                      <label htmlFor="service" className="flex text-sm font-medium text-muted mb-2 items-center">
                        <Briefcase className="h-4 w-4 mr-1.5 text-primary" />
                        <span>Selected Service <span className="text-red-500">*</span></span>
                      </label>
                      <div className="relative">
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          required
                          aria-required="true"
                          aria-invalid={submitStatus === 'error' && !formData.service ? 'true' : 'false'}
                          className="w-full px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-600
                            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                            dark:bg-gray-700 bg-white shadow-sm transition-all duration-300 appearance-none
                            disabled:opacity-60 disabled:cursor-not-allowed"
                          disabled={isSubmitting}
                        >
                          <option value="">Select a service</option>
                          {services.map((service) => (
                            <option key={service.id} value={service.id}>{service.name}</option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <ChevronDown className="h-5 w-5 text-muted" />
                        </div>
                        {submitStatus === 'error' && !formData.service && (
                          <p className="text-error text-xs mt-1 ml-1 absolute">Please select a service</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Message Field */}
                  <div className="relative">
                    <label htmlFor="message" className="flex text-sm font-medium text-muted mb-2 items-center">
                      <MessageSquare className="h-4 w-4 mr-1.5 text-primary" />
                      <span>Message <span className="text-red-500">*</span></span>
                    </label>
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your message here... (minimum 10 characters)"
                        rows={5}
                        required
                        aria-required="true"
                        aria-invalid={submitStatus === 'error' && (!formData.message || formData.message.length < 10) ? 'true' : 'false'}
                        className="w-full px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-600
                          focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                          dark:bg-gray-700 bg-white shadow-sm transition-all duration-300
                          disabled:opacity-60 disabled:cursor-not-allowed resize-none"
                        disabled={isSubmitting}
                        minLength={10}
                      />
                      {submitStatus === 'error' && (!formData.message || formData.message.length < 10) && (
                        <p className="text-error text-xs mt-1 ml-1 absolute">Message must be at least 10 characters</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <div className="mt-8">
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-accent to-primary rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        aria-label={isSubmitting ? 'Sending message...' : 'Send message'}
                        aria-busy={isSubmitting ? 'true' : 'false'}
                        className="relative w-full px-6 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-medium
                          hover:shadow-xl transition-all duration-300
                          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary 
                          disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            <span className="font-medium">Sending Message...</span>
                          </>
                        ) : (
                          <>
                            <Mail className="h-5 w-5 mr-2" />
                            <span className="font-medium">Send Message</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-center text-xs text-muted mt-3">
                      By submitting this form, you agree to our <span className="text-primary hover:underline cursor-pointer">Privacy Policy</span>
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
