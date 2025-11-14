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
    if (GA_MEASUREMENT_ID && typeof window !== 'undefined') {
      // Load Google Analytics script
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script1);

      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      gtag('js', new Date());
      gtag('config', GA_MEASUREMENT_ID);

      // Make gtag available globally
      window.gtag = gtag;
    }
  }, []);

  return null;
};

export default Analytics;

