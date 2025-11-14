
import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { gsap } from 'gsap';

const GoToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when user scrolls down 500px from top
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', toggleVisibility);
    
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  
  useEffect(() => {
    if (isVisible) {
      gsap.fromTo(
        '.go-to-top-btn',
        { scale: 0.5, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' }
      );
    } else {
      gsap.to(
        '.go-to-top-btn',
        { scale: 0.5, opacity: 0, y: 20, duration: 0.3 }
      );
    }
  }, [isVisible]);
  
  useEffect(() => {
    if (isHovering) {
      gsap.to('.arrow-icon', { y: -5, duration: 0.3, repeat: -1, yoyo: true });
      gsap.to('.go-to-top-btn-bg', { scale: 1.1, duration: 0.3 });
    } else {
      gsap.killTweensOf('.arrow-icon');
      gsap.to('.arrow-icon', { y: 0, duration: 0.3 });
      gsap.to('.go-to-top-btn-bg', { scale: 1, duration: 0.3 });
    }
  }, [isHovering]);

  return (
    <button
      onClick={scrollToTop}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`go-to-top-btn fixed bottom-28 right-8 w-12 h-12 rounded-full shadow-md flex items-center justify-center z-40 focus:outline-none transition-all bg-black text-paper-cream border border-black hover:bg-white hover:text-black ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      aria-label="Go to top"
    >
      <ArrowUp size={20} className="arrow-icon" />
    </button>
  );
};

export default GoToTopButton;
