import { useEffect } from 'react';

// Google Analytics component
// Replace 'G-XXXXXXXXXX' with your actual Google Analytics Measurement ID
// Add VITE_GA_MEASUREMENT_ID to your .env file
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

const Analytics: React.FC = () => {
  useEffect(() => {
    // Check if Google Analytics is already loaded (e.g., from HTML injection)
    if (typeof window !== 'undefined' && window.gtag && window.dataLayer) {
      return; // GA already loaded, skip
    }

    if (GA_MEASUREMENT_ID && typeof window !== 'undefined') {
      // Load Google Analytics script only if not already present
      const existingScript = document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`);
      if (!existingScript) {
        const script1 = document.createElement('script');
        script1.async = true;
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        document.head.appendChild(script1);
      }

      // Initialize gtag if not already initialized
      if (!window.dataLayer) {
        window.dataLayer = [];
      }
      if (!window.gtag) {
        function gtag(...args: any[]) {
          window.dataLayer.push(args);
        }
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', GA_MEASUREMENT_ID);
      }
    }
  }, []);

  return null;
};

export default Analytics;

