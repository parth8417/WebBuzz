/**
 * Smooth scroll utility functions for WebBuzz
 * This module contains enhanced scrolling utilities with easing functions
 * for better user experience.
 */

/**
 * Collection of easing functions for smooth animations
 */
const easings = {
  // Linear easing (no easing)
  linear: t => t,
  
  // Quadratic easing
  easeInQuad: t => t * t,
  easeOutQuad: t => t * (2 - t),
  easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  
  // Cubic easing
  easeInCubic: t => t * t * t,
  easeOutCubic: t => (--t) * t * t + 1,
  easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  
  // Exponential easing
  easeInExpo: t => t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),
  easeOutExpo: t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
  easeInOutExpo: t => {
    if (t === 0) return 0;
    if (t === 1) return 1;
    if ((t *= 2) < 1) return 0.5 * Math.pow(2, 10 * (t - 1));
    return 0.5 * (-Math.pow(2, -10 * --t) + 2);
  }
};

/**
 * Scroll to element with enhanced smooth animation
 * @param {string} elementId - The ID of the element to scroll to
 * @param {number} offset - Offset in pixels from the top of the element (default: 0)
 * @param {number} duration - Duration of the scroll animation in ms (default: 500)
 * @param {string} easing - Easing function name (default: 'easeOutQuad')
 * @param {Function} callback - Optional callback to execute after scrolling completes
 */
export const scrollToElement = (elementId, offset = 0, duration = 500, easing = 'easeOutQuad', callback = null) => {
  const targetElement = document.getElementById(elementId);
  
  if (!targetElement) {
    console.warn(`Element with id "${elementId}" not found.`);
    return;
  }

  // Immediately set active section to improve perceived performance
  if (callback && typeof callback === 'function') {
    // Run the callback immediately to update UI without waiting for scroll completion
    setTimeout(() => callback(), 0);
  }

  // Shorter duration for better responsiveness
  const actualDuration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : duration;
  
  // For very short distances, reduce duration further for better responsiveness
  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
  const startPosition = window.pageYOffset;
  const distance = Math.abs(targetPosition - startPosition);
  
  // Adjust duration based on scroll distance for better UX
  const scaledDuration = distance < 300 ? Math.min(actualDuration, 300) : actualDuration;
  
  // Use native smooth scrolling for better performance if supported
  if ('scrollBehavior' in document.documentElement.style) {
    // Modern browsers - use native smooth scrolling
    window.scrollTo({
      top: targetPosition,
      behavior: actualDuration === 0 ? 'auto' : 'smooth'
    });
    
    // We still need to ensure callback is called after animation
    if (actualDuration === 0) {
      // No animation needed, immediately resolve
      return;
    }
    
    // Approximate animation end time based on typical native smooth scroll duration
    setTimeout(() => {
      // Ensure we're at the exact position (native smooth scroll might not be precise)
      if (Math.abs(window.pageYOffset - targetPosition) > 2) {
        window.scrollTo(0, targetPosition);
      }
    }, scaledDuration);
    
    return;
  }
  
  // Fallback for browsers without native smooth scrolling
  // Get the easing function (default to linear if not found)
  const easingFunction = easings[easing] || easings.linear;
  
  // Handle edge cases
  if (distance === 0) {
    return;
  }
  
  let startTime = null;
  let rafId = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / scaledDuration, 1);
    const easedProgress = easingFunction(progress);
    
    window.scrollTo(0, startPosition + (targetPosition - startPosition) * easedProgress);
    
    // Continue animation if not complete
    if (timeElapsed < scaledDuration) {
      rafId = requestAnimationFrame(animation);
    } else {
      // Final scroll to ensure exact position
      window.scrollTo(0, targetPosition);
      cancelAnimationFrame(rafId);
    }
  }
  
  // Start animation with efficient RAF handling
  rafId = requestAnimationFrame(animation);
};

/**
 * Updates navigation state when scrolling to a section
 * @param {string} sectionId - The ID of the section scrolled to
 * @param {Function} setActiveSectionFn - Function to update active section state
 */
export const handleSectionNavigation = (sectionId, setActiveSectionFn) => {
  // Update navigation state
  if (setActiveSectionFn && typeof setActiveSectionFn === 'function') {
    setActiveSectionFn(sectionId);
  }
  
  // Update URL hash for better bookmarking (optional)
  // Uncomment to enable URL hash update
  // window.history.replaceState(null, null, `#${sectionId}`);
  
  // Announce for screen readers
  const liveRegion = document.getElementById('a11y-section-announcement');
  if (liveRegion) {
    liveRegion.textContent = `Navigated to ${sectionId} section`;
  }
};

/**
 * Enhanced scroll spy functionality
 * @param {Array} sections - Array of section IDs to watch
 * @param {Function} setActiveSectionFn - Function to update active section state
 * @param {Object} options - Configuration options
 */
export const setupScrollSpy = (sections, setActiveSectionFn, options = {}) => {
  const {
    offset = 100,
    rootMargin = '-100px 0px -20% 0px',
    thresholds = Array.from({ length: 11 }, (_, i) => i / 10)
  } = options;
  
  const observers = [];
  
  // Ensure we're observing contact and footer sections too
  const allSections = [...sections];
  if (!allSections.includes('contact')) allSections.push('contact');
  if (!allSections.includes('footer')) allSections.push('footer');
  
  // Observer callback
  const observerCallback = (entries) => {
    // Check if contact or footer sections are visible
    const contactEntry = entries.find(entry => entry.target.id === 'contact');
    const footerEntry = entries.find(entry => entry.target.id === 'footer');
    
    // If contact form or footer are in view, don't highlight any nav item
    if ((contactEntry && contactEntry.isIntersecting) || 
        (footerEntry && footerEntry.isIntersecting)) {
      setActiveSectionFn('none'); // Special value to indicate no active section
      return;
    }
    
    // Get all currently visible sections
    const visibleSections = entries
      .filter(entry => entry.isIntersecting)
      .map(entry => ({
        id: entry.target.id,
        ratio: entry.intersectionRatio,
        // Position factor - how close to the top
        position: entry.boundingClientRect.top + (entry.boundingClientRect.height / 2),
        // Center factor - how close to center of viewport
        centerFactor: Math.abs(
          (window.innerHeight / 2) - 
          (entry.boundingClientRect.top + (entry.boundingClientRect.height / 2))
        ) / (window.innerHeight / 2)
      }))
      .sort((a, b) => {
        // First prioritize intersection ratio
        if (Math.abs(a.ratio - b.ratio) > 0.15) {
          return b.ratio - a.ratio;
        }
        // Then prioritize position in viewport
        return a.centerFactor - b.centerFactor;
      });
    
    // If there are visible sections, update the active section
    if (visibleSections.length > 0) {
      const newActiveSection = visibleSections[0].id;
      setActiveSectionFn(newActiveSection);
    }
  };
  
  // Setup observers for each section
  allSections.forEach(sectionId => {
    const sectionElement = document.getElementById(sectionId);
    
    if (!sectionElement) {
      console.warn(`Section element with id "${sectionId}" not found.`);
      return;
    }
    
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin,
      threshold: thresholds
    });
    
    observer.observe(sectionElement);
    observers.push(observer);
  });
  
  // Return cleanup function
  return () => {
    observers.forEach(observer => observer.disconnect());
  };
};

export default {
  scrollToElement,
  handleSectionNavigation,
  setupScrollSpy,
  easings
};
