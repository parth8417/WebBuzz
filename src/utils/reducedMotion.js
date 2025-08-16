// This file adds support for prefers-reduced-motion media query globally

import { useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

// Apply CSS class based on reduced motion preference
export function useReducedMotionHandler() {
  const prefersReducedMotion = useReducedMotion();
  
  useEffect(() => {
    if (prefersReducedMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  }, [prefersReducedMotion]);
}

// Add this component to your App.jsx to make it work globally
export function ReducedMotionHandler() {
  useReducedMotionHandler();
  return null;
}
