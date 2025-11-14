import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowUp } from 'lucide-react';

const FloatingActionButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (buttonRef.current) {
      gsap.set(buttonRef.current, { scale: 0, rotation: -180 });
      
      if (isVisible) {
        gsap.to(buttonRef.current, {
          scale: 1,
          rotation: 0,
          duration: 0.5,
          ease: "back.out(1.7)"
        });
      } else {
        gsap.to(buttonRef.current, {
          scale: 0,
          rotation: 180,
          duration: 0.3,
          ease: "back.in(1.7)"
        });
      }
    }
  }, [isVisible]);

  // Removed particle effects for minimal design

  const scrollToTop = () => {
    gsap.to(window, {
      duration: 0.2,
      scrollTo: { y: 0 },
      ease: "power2.out"
    });
  };

  if (!isVisible) return null;

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-black text-paper-cream rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center border border-black hover:bg-white hover:text-black"
    >
      <ArrowUp 
        className="h-5 w-5 transition-transform duration-200 hover:scale-110" 
      />
    </button>
  );
};

export default FloatingActionButton;
