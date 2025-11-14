import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AnimatedBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create floating particles - reduced for performance
    const particles: HTMLDivElement[] = [];
    const particleCount = 20; // Keep original amount

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-1 h-1 bg-black rounded-full opacity-10';
      
      // Random position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      containerRef.current.appendChild(particle);
      particles.push(particle);
    }

    particlesRef.current = particles;

    // Animate particles
    particles.forEach((particle, index) => {
      const duration = 3 + Math.random() * 4; // 3-7 seconds
      const delay = Math.random() * 2;
      
      gsap.set(particle, {
        scale: 0,
        opacity: 0,
      });

      gsap.to(particle, {
        scale: 1 + Math.random() * 2,
        opacity: 0.05 + Math.random() * 0.08, // Reduced opacity: 0.05-0.13 (was 0.3-0.7)
        duration: duration,
        delay: delay,
        ease: "power2.out",
        repeat: -1,
        yoyo: true,
      });

      // Floating movement
      gsap.to(particle, {
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
        duration: duration * 2,
        delay: delay,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });
    });

    // Create geometric shapes
    const shapes = ['circle', 'triangle', 'square'];
    const shapeElements: HTMLDivElement[] = [];

    for (let i = 0; i < 15; i++) { // Keep original amount
      const shape = document.createElement('div');
      const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
      const size = 20 + Math.random() * 40;
      
      shape.style.width = `${size}px`;
      shape.style.height = `${size}px`;
      shape.style.position = 'absolute';
      shape.style.left = `${Math.random() * 100}%`;
      shape.style.top = `${Math.random() * 100}%`;
      shape.style.pointerEvents = 'none';
      
      if (shapeType === 'circle') {
        shape.className = 'bg-black rounded-full';
        shape.style.opacity = '0.02'; // Reduced opacity from 0.05
      } else if (shapeType === 'triangle') {
        shape.className = 'bg-black';
        shape.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
        shape.style.opacity = '0.02'; // Reduced opacity from 0.05
      } else {
        shape.className = 'bg-black';
        shape.style.transform = 'rotate(45deg)';
        shape.style.opacity = '0.02'; // Reduced opacity from 0.05
      }
      
      containerRef.current.appendChild(shape);
      shapeElements.push(shape);
    }

    // Animate shapes
    shapeElements.forEach((shape, index) => {
      const duration = 8 + Math.random() * 4;
      const delay = Math.random() * 3;
      
      gsap.set(shape, {
        scale: 0,
        rotation: 0,
      });

      gsap.to(shape, {
        scale: 1,
        rotation: 360,
        duration: duration,
        delay: delay,
        ease: "power2.out",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(shape, {
        x: (Math.random() - 0.5) * 300,
        y: (Math.random() - 0.5) * 300,
        duration: duration * 1.5,
        delay: delay,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });
    });

    return () => {
      // Cleanup
      particles.forEach(particle => particle.remove());
      shapeElements.forEach(shape => shape.remove());
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    />
  );
};

export default AnimatedBackground;
