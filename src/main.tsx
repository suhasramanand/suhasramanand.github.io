import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Prevent scroll restoration and force scroll to top immediately
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Force scroll to top before React renders
window.scrollTo(0, 0);
document.documentElement.scrollTop = 0;
document.body.scrollTop = 0;

// Also prevent scroll on load
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}, { once: true });

createRoot(document.getElementById("root")!).render(<App />);
