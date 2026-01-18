import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Prevent scroll restoration and force scroll to top immediately
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Remove hash from URL to prevent browser from auto-scrolling to sections
if (window.location.hash) {
  window.history.replaceState(null, '', window.location.pathname + window.location.search);
}

// Force scroll to top before React renders
window.scrollTo(0, 0);
document.documentElement.scrollTop = 0;
document.body.scrollTop = 0;

// Scroll to top on initial page load only
window.addEventListener('load', () => {
  // Only scroll to top if we're not already at the top (prevents interference with user scrolling)
  if (window.scrollY === 0 || window.location.hash) {
    window.scrollTo(0, 0);
  }
}, { once: true });

createRoot(document.getElementById("root")!).render(<App />);
