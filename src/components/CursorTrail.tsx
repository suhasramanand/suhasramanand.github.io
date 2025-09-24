import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CursorTrail: React.FC = () => {
  const trailRef = useRef<HTMLDivElement>(null);
  const trailElements: HTMLDivElement[] = [];

  useEffect(() => {
    if (!trailRef.current) return;

    // Create trail elements
    for (let i = 0; i < 20; i++) {
      const element = document.createElement('div');
      element.className = 'fixed w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full pointer-events-none z-50';
      element.style.opacity = '0';
      element.style.transform = 'translate(-50%, -50%)';
      trailRef.current.appendChild(element);
      trailElements.push(element);
    }

    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;

    const updateTrail = () => {
      trailX += (mouseX - trailX) * 0.1;
      trailY += (mouseY - trailY) * 0.1;

      trailElements.forEach((element, index) => {
        const delay = index * 0.02;
        const scale = 1 - (index * 0.05);
        const opacity = 1 - (index * 0.05);

        gsap.to(element, {
          x: trailX,
          y: trailY,
          scale: scale,
          opacity: opacity,
          duration: 0.1,
          delay: delay,
          ease: "power2.out",
        });
      });

      requestAnimationFrame(updateTrail);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseEnter = () => {
      trailElements.forEach((element, index) => {
        gsap.to(element, {
          scale: 1 - (index * 0.05),
          opacity: 1 - (index * 0.05),
          duration: 0.3,
          delay: index * 0.02,
          ease: "power2.out",
        });
      });
    };

    const handleMouseLeave = () => {
      trailElements.forEach((element) => {
        gsap.to(element, {
          scale: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    updateTrail();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      trailElements.forEach(element => element.remove());
    };
  }, []);

  return <div ref={trailRef} />;
};

export default CursorTrail;
