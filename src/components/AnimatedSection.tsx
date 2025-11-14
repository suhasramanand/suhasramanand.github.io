import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  animationType?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'slideIn' | 'bounceIn';
  delay?: number;
  duration?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  id,
  className = '',
  animationType = 'fadeInUp',
  delay = 0,
  duration = 0.4
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const element = sectionRef.current;
    
    // Set initial state based on animation type
    const initialStates = {
      fadeInUp: { y: 100, opacity: 0 },
      fadeInLeft: { x: -100, opacity: 0 },
      fadeInRight: { x: 100, opacity: 0 },
      scaleIn: { scale: 0, opacity: 0 },
      slideIn: { y: 50, opacity: 0 },
      bounceIn: { scale: 0, opacity: 0, rotation: -10 }
    };

    const finalStates = {
      fadeInUp: { y: 0, opacity: 1 },
      fadeInLeft: { x: 0, opacity: 1 },
      fadeInRight: { x: 0, opacity: 1 },
      scaleIn: { scale: 1, opacity: 1 },
      slideIn: { y: 0, opacity: 1 },
      bounceIn: { scale: 1, opacity: 1, rotation: 0 }
    };

    gsap.set(element, initialStates[animationType]);

    const animation = gsap.to(element, {
      ...finalStates[animationType],
      duration: duration,
      delay: delay,
      ease: animationType === 'bounceIn' ? "power2.out" : "power2.out", // Faster easing
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none none",
        once: true, // Only animate once for better performance
        markers: false
      }
    });

    return () => {
      if (animation.scrollTrigger) {
        animation.scrollTrigger.kill();
      }
      animation.kill();
    };
  }, [animationType, delay, duration]);

  return (
    <div ref={sectionRef} id={id} className={className}>
      {children}
    </div>
  );
};

export default AnimatedSection;
