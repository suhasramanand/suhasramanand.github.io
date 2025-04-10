
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
      className={`go-to-top-btn fixed bottom-28 right-8 w-14 h-14 rounded-full shadow-xl flex items-center justify-center z-40 focus:outline-none transition-all ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      aria-label="Go to top"
    >
      <div className="go-to-top-btn-bg w-full h-full rounded-full flex items-center justify-center" 
        style={{ 
          background: 'linear-gradient(135deg, #FFDE59 0%, #FF914D 100%)',
          boxShadow: '0 6px 20px rgba(255, 222, 89, 0.4)'
        }}>
        <ArrowUp size={24} className="arrow-icon text-white" />
      </div>
      
      {/* Animated particles around the button */}
      <div className="absolute -inset-2 -z-10">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={`particle-${index}`}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: `rgba(255, 222, 89, ${0.3 + Math.random() * 0.4})`,
              top: `${50 + Math.cos(index * Math.PI / 4) * 130}%`,
              left: `${50 + Math.sin(index * Math.PI / 4) * 130}%`,
              animation: `float ${2 + Math.random()}s ease-in-out ${Math.random()}s infinite alternate`
            }}
          />
        ))}
      </div>
    </button>
  );
};

export default GoToTopButton;
