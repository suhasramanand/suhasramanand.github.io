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

// Also prevent scroll on load - multiple attempts to ensure it sticks
const forceScrollToTop = () => {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
};

window.addEventListener('load', () => {
  forceScrollToTop();
  // Additional attempts after load
  setTimeout(forceScrollToTop, 0);
  setTimeout(forceScrollToTop, 50);
  setTimeout(forceScrollToTop, 100);
}, { once: true });

createRoot(document.getElementById("root")!).render(<App />);
