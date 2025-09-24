import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowUp, Sparkles, Zap, Star } from 'lucide-react';

const FloatingActionButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (isHovered && particlesRef.current) {
      // Create floating particles on hover
      const particles: HTMLDivElement[] = [];
      
      for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full';
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.transform = 'translate(-50%, -50%)';
        particlesRef.current.appendChild(particle);
        particles.push(particle);
      }

      particles.forEach((particle, index) => {
        const angle = (index / particles.length) * Math.PI * 2;
        const distance = 50 + Math.random() * 30;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        gsap.fromTo(particle,
          { scale: 0, opacity: 0 },
          {
            x: x,
            y: y,
            scale: 1,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.05,
            ease: "power2.out"
          }
        );

        gsap.to(particle, {
          scale: 0,
          opacity: 0,
          duration: 0.3,
          delay: 0.6 + index * 0.05,
          ease: "power2.in"
        });
      });

      // Clean up particles after animation
      setTimeout(() => {
        particles.forEach(particle => particle.remove());
      }, 1000);
    }
  }, [isHovered]);

  const scrollToTop = () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: 0 },
      ease: "power2.inOut"
    });
  };

  if (!isVisible) return null;

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group overflow-hidden"
    >
      {/* Particle container */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />
      
      {/* Main icon */}
      <ArrowUp 
        className={`h-6 w-6 text-white transition-transform duration-300 ${
          isHovered ? 'scale-110' : ''
        }`} 
      />
      
      {/* Floating sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        <Sparkles 
          className={`absolute top-1 right-1 h-3 w-3 text-yellow-300 transition-all duration-300 ${
            isHovered ? 'animate-pulse scale-125' : 'opacity-0'
          }`} 
        />
        <Star 
          className={`absolute bottom-1 left-1 h-2 w-2 text-yellow-300 transition-all duration-300 ${
            isHovered ? 'animate-pulse scale-125' : 'opacity-0'
          }`} 
        />
      </div>
      
      {/* Animated background */}
      <div 
        className={`absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 transition-transform duration-300 ${
          isHovered ? 'scale-110' : 'scale-0'
        }`}
      />
    </button>
  );
};

export default FloatingActionButton;
