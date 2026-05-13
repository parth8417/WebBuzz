import { motion, useReducedMotion, useInView } from 'framer-motion';
import { Star, Quote, Zap, Heart, Headphones, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState, useEffect, useCallback } from 'react';
import animations from '../utils/animations';

// --- DATA ---

const stats = [
  { icon: Zap, value: '20+', label: 'Projects Delivered' },
  { icon: Heart, value: '95%', label: 'Client Satisfaction' },
  { icon: Headphones, value: '24/7', label: 'Support Available' },
  { icon: Award, value: '5.0', label: 'Star Service' },
];

const testimonials = [
  {
  name: 'Hemang Mevada',
  business: 'Dairy Business Owner',
  initials: 'HM',
  color: 'from-cyan-500 to-blue-500',
  rating: 5,
  review:
    'WebBuzz developed a complete Dairy Management System for our business. From employee salary tracking to credit management and daily records, everything is now organized and easy to manage. The system is smooth, modern, and saves us a lot of time.',
},
{
  name: 'Harshdip Gohil',
  business: 'Stationery Store Owner',
  initials: 'HG',
  color: 'from-violet-500 to-purple-500',
  rating: 5,
  review:
    'WebBuzz created an amazing e-commerce website for our stationery business. The design is clean, professional, and very user-friendly. Managing products and orders is now simple, and our online sales have improved significantly.',
},
  {
    name: 'Priya Sharma',
    business: 'E-commerce Brand Owner',
    initials: 'PS',
    color: 'from-cyan-500 to-blue-500',
    rating: 5,
    review:
      'Their design team is phenomenal. Our brand identity went from generic to premium overnight. Every deliverable exceeded our expectations.',
  },
  {
    name: 'Rahul Kapoor',
    business: 'Restaurant Chain Manager',
    initials: 'RK',
    color: 'from-emerald-500 to-teal-500',
    rating: 5,
    review:
      'Digital marketing results were immediate. 3× more leads in the first month. WebBuzz truly understands how to drive real business growth.',
  },
];

// --- SUBCOMPONENTS ---

function StarRating({ count = 5 }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`} role="img">
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-amber-400 text-amber-400"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function StatBadge({ icon: Icon, value, label, variants }) {
  return (
    <motion.div
      variants={variants}
      className="stat-badge group flex items-center gap-2 xs-stat-gap sm:gap-3 md:gap-4 px-2.5 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4 rounded-lg sm:rounded-xl bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm hover:bg-white/[0.07] hover:border-primary/20 transition-all duration-300 cursor-default"
    >
      <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
        <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-primary" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <div className="text-base sm:text-xl md:text-2xl font-bold text-white leading-tight">{value}</div>
        <div className="text-[9px] sm:text-[11px] md:text-xs text-gray-400 font-medium leading-tight whitespace-nowrap">
          {label}
        </div>
      </div>
    </motion.div>
  );
}

function CarouselCard({ testimonial, isActive }) {
  const { name, business, initials, color, rating, review } = testimonial;

  return (
    <div className={`carousel-card relative group ${isActive ? 'is-active' : ''}`}>
      {/* Animated glow border — only on active */}
      <div
        className="carousel-glow-border absolute -inset-[1px] rounded-2xl pointer-events-none"
        style={{ opacity: isActive ? 1 : 0, transition: 'opacity 0.7s ease' }}
      />

      {/* Card body */}
      <blockquote className="carousel-card-body relative rounded-2xl bg-gray-800/70 backdrop-blur-xl border border-white/[0.08] p-5 sm:p-6 md:p-7 flex flex-col">
        {/* Gradient overlay */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/[0.04] via-transparent to-accent/[0.03] pointer-events-none" />

        {/* Animated quote icon */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-5 pointer-events-none">
          <motion.div
            animate={isActive ? { rotate: [0, -5, 0], scale: [1, 1.1, 1] } : { rotate: 0, scale: 1 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Quote
              className="h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10 text-primary/[0.12] rotate-180"
              aria-hidden="true"
            />
          </motion.div>
        </div>

        {/* Header: Avatar + Info */}
        <div className="relative flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 md:mb-5">
          <div className="relative flex-shrink-0">
            <div
              className={`absolute inset-0 rounded-full bg-gradient-to-br ${color} blur-md`}
              style={{ opacity: isActive ? 0.6 : 0.2, transition: 'opacity 0.5s ease' }}
            />
            <div
              className={`relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white text-xs sm:text-sm font-bold shadow-lg ring-2 ring-white/10`}
              aria-hidden="true"
            >
              {initials}
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <cite className="not-italic text-[13px] sm:text-[15px] md:text-base font-semibold text-white block leading-tight mb-0.5">
              {name}
            </cite>
            <span className="text-[11px] sm:text-[13px] md:text-sm text-gray-400 block leading-tight">
              {business}
            </span>
          </div>
        </div>

        {/* Rating */}
        <div className="relative mb-2.5 sm:mb-3 md:mb-4">
          <StarRating count={rating} />
        </div>

        {/* Review text */}
        <p className="relative text-[13px] sm:text-[15px] md:text-base text-gray-300 leading-relaxed flex-1">
          &ldquo;{review}&rdquo;
        </p>
      </blockquote>
    </div>
  );
}

// Navigation dot
function NavDot({ isActive, onClick, index }) {
  return (
    <button
      onClick={onClick}
      aria-label={`Go to review ${index + 1}`}
      className="carousel-nav-dot-btn relative p-1.5 group"
    >
      <span
        className={`carousel-nav-dot block rounded-full ${
          isActive
            ? 'w-8 h-2.5 bg-primary shadow-[0_0_12px_rgba(108,92,231,0.5)]'
            : 'w-2.5 h-2.5 bg-white/20 group-hover:bg-white/40'
        }`}
      />
    </button>
  );
}

// Arrow button
function ArrowButton({ direction, onClick }) {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight;
  return (
    <button
      onClick={onClick}
      aria-label={direction === 'left' ? 'Previous review' : 'Next review'}
      className="carousel-arrow-btn flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-white/[0.05] border border-white/[0.08] backdrop-blur-sm text-white/60 hover:text-white hover:bg-white/[0.1] hover:border-primary/30 hover:shadow-[0_0_20px_rgba(108,92,231,0.15)] transition-all duration-300 active:scale-90"
    >
      <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
    </button>
  );
}

// --- MAIN ---

function Testimonials() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [trackWidth, setTrackWidth] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const totalSlides = testimonials.length;

  // Measure track width for pixel-based positioning
  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        setTrackWidth(trackRef.current.offsetWidth);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const goToSlide = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-slide
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  }, [isPaused, goNext, prefersReducedMotion]);

  // Touch / swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };
  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goNext() : goPrev();
    }
    setTimeout(() => setIsPaused(false), 3000);
  };

  // Animation variants
  const containerVariants = prefersReducedMotion ? animations.reducedMotion : animations.staggerContainer;
  const headerVariants = prefersReducedMotion ? animations.reducedMotion : animations.fadeInUp;
  const scaleVariants = prefersReducedMotion ? animations.reducedMotion : animations.scaleUp;

  // Calculate card width and pixel offset for each card
  // Card width is roughly 40% of track on desktop, 82% on mobile
  const getCardWidthRatio = () => {
    if (trackWidth >= 1024) return 0.40;
    if (trackWidth >= 768) return 0.52;
    if (trackWidth >= 640) return 0.65;
    return 0.82;
  };

  const cardWidthRatio = getCardWidthRatio();
  const cardWidth = trackWidth * cardWidthRatio;
  const gap = trackWidth >= 768 ? 24 : trackWidth >= 640 ? 16 : 12;

  const getOffset = (index) => {
    let offset = index - activeIndex;
    if (offset > totalSlides / 2) offset -= totalSlides;
    if (offset < -totalSlides / 2) offset += totalSlides;
    return offset;
  };

  const getSlideXPixels = (offset) => {
    // Center offset = 0 means the card center aligns with track center
    // Each offset step = cardWidth + gap
    return offset * (cardWidth + gap);
  };

  const springTransition = prefersReducedMotion
    ? { duration: 0.3 }
    : { type: 'spring', stiffness: 280, damping: 32, mass: 0.9 };

  return (
    <section
      id="reviews"
      ref={sectionRef}
      aria-label="Client Reviews & Testimonials for WebBuzz Web Design Agency"
      className="reviews-section relative py-10 sm:py-14 md:py-16 lg:py-20 xl:py-24 bg-dark overflow-hidden"
      itemScope
      itemType="https://schema.org/Review"
    >
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] lg:w-[800px] h-[200px] sm:h-[350px] lg:h-[500px] bg-primary/[0.03] rounded-full blur-[60px] sm:blur-[100px] lg:blur-[120px]" />
        <div className="hidden md:block absolute -top-20 -right-20 w-60 lg:w-80 h-60 lg:h-80 bg-accent/[0.04] rounded-full blur-[80px] lg:blur-[100px]" />
        <div className="hidden md:block absolute -bottom-20 -left-20 w-48 lg:w-64 h-48 lg:h-64 bg-primary/[0.04] rounded-full blur-[80px] lg:blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-12 lg:mb-16"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div
            className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-primary/20 text-primary rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4 md:mb-5"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: 'spring', stiffness: 400, damping: 25, delay: 0.1 }}
          >
            Client Reviews
          </motion.div>
          <h2 className="text-[22px] sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2.5 sm:mb-3 md:mb-4 text-white leading-tight">
            What Our{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Clients Say
            </span>
          </h2>
          <div className="h-0.5 sm:h-1 w-12 sm:w-16 md:w-20 bg-primary mx-auto rounded-full mb-2.5 sm:mb-4 md:mb-5" />
          <p className="text-[13px] sm:text-base md:text-lg text-gray-400 max-w-xl mx-auto leading-relaxed px-2 sm:px-0">
            Trusted by startups, local businesses, and growing brands.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 max-w-4xl mx-auto mb-6 sm:mb-8 md:mb-12 lg:mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {stats.map((stat, i) => (
            <StatBadge key={i} {...stat} variants={scaleVariants} />
          ))}
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.4 }}
        >
          <div
            className="carousel-outer relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Arrows */}
            <div className="carousel-arrows hidden sm:flex items-center justify-between absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 pointer-events-none px-0 sm:px-1 lg:px-0">
              <div className="pointer-events-auto -ml-1 lg:-ml-5">
                <ArrowButton direction="left" onClick={goPrev} />
              </div>
              <div className="pointer-events-auto -mr-1 lg:-mr-5">
                <ArrowButton direction="right" onClick={goNext} />
              </div>
            </div>

            {/* Track */}
            <div ref={trackRef} className="carousel-track relative w-full overflow-hidden">
              <div className="carousel-track-inner relative w-full" style={{ minHeight: cardWidth > 0 ? 'auto' : '290px' }}>
                {/* Invisible spacer to give the track a natural height based on the tallest card */}
                <div
                  className="invisible pointer-events-none"
                  style={{ width: cardWidth || '82%', maxWidth: 480, margin: '0 auto', padding: '1.25rem' }}
                >
                  <CarouselCard testimonial={testimonials[0]} isActive={false} />
                </div>

                {/* Actual cards — absolutely positioned over the spacer */}
                {testimonials.map((t, i) => {
                  const offset = getOffset(i);
                  const isActive = offset === 0;
                  const absOffset = Math.abs(offset);
                  const xPx = getSlideXPixels(offset);

                  return (
                    <motion.div
                      key={i}
                      className="absolute top-0"
                      animate={{
                        x: xPx - (cardWidth / 2 || 0),
                        scale: isActive ? 1 : 0.85,
                        opacity: isActive ? 1 : absOffset === 1 ? 0.5 : 0.2,
                        filter: isActive ? 'blur(0px)' : `blur(${absOffset * 2}px)`,
                        zIndex: 10 - absOffset,
                      }}
                      transition={springTransition}
                      onClick={() => !isActive && goToSlide(i)}
                      style={{
                        width: cardWidth || '82%',
                        maxWidth: 480,
                        left: '50%',
                        cursor: isActive ? 'default' : 'pointer',
                        pointerEvents: absOffset > 1 ? 'none' : 'auto',
                      }}
                    >
                      <CarouselCard testimonial={t} isActive={isActive} />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-2 mt-5 sm:mt-7">
            {testimonials.map((_, i) => (
              <NavDot
                key={i}
                index={i}
                isActive={i === activeIndex}
                onClick={() => goToSlide(i)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonials;
