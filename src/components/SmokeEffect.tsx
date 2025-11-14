import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface SmokeEffectProps {
  children: React.ReactNode;
  color?: string;
}

const SmokeEffect: React.FC<SmokeEffectProps> = ({ children, color = '#9b87f5' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const smokeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!smokeRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      // Create smoke particles - optimized for performance
      const smokeParticles: HTMLDivElement[] = [];
      const particleCount = 25; // Reduced from 40 for better performance

      // Start with content hidden, smoke will reveal it
      gsap.set(contentRef.current, { opacity: 0, visibility: 'hidden' });

      // Create particles
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 150 + 100;
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.borderRadius = '50%';
        particle.style.background = `radial-gradient(circle, ${color}FF, ${color}DD, ${color}AA, ${color}77, ${color}44, transparent)`;
        particle.style.filter = 'blur(50px)';
        particle.style.opacity = '0';
        particle.style.pointerEvents = 'none';
        particle.style.willChange = 'transform, opacity';
        
        // Position particles around the center
        const angle = (Math.PI * 2 * i) / particleCount;
        const radius = 100 + Math.random() * 80;
        const centerX = 50;
        const centerY = 50;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.transform = 'translate(-50%, -50%)';
        
        if (smokeRef.current) {
          smokeRef.current.appendChild(particle);
          smokeParticles.push(particle);
        }
      }

      // Animation timeline
      const tl = gsap.timeline();

      // Phase 1: Smoke appears and covers the content (0-0.8s)
      tl.to(smokeParticles, {
        opacity: 0.9,
        scale: 1.8,
        duration: 0.8,
        stagger: {
          amount: 0.5,
          from: 'random'
        },
        ease: 'power2.out'
      })
      // Phase 2: Smoke particles move outward and disperse (0.6-2.0s)
      smokeParticles.forEach((particle, i) => {
        const angle = (Math.PI * 2 * i) / particleCount;
        const distance = 150 + Math.random() * 80;
        const randomScale = Math.random() * 1.2 + 1.3;
        
        tl.to(particle, {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          scale: randomScale,
          duration: 1.4,
          ease: 'power2.out'
        }, '-=0.2');
      });
      
      // Phase 3: Smoke fades away revealing content (1.8-3.0s)
      tl.to(smokeParticles, {
        opacity: 0,
        scale: 1.8,
        duration: 1.2,
        stagger: {
          amount: 0.6,
          from: 'random'
        },
        ease: 'power2.in'
      }, '-=0.4')
      // Reveal content fully
      .to(contentRef.current, {
        opacity: 1,
        scale: 1,
        visibility: 'visible',
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.8');

      // Cleanup function
      return () => {
        smokeParticles.forEach(particle => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        });
      };
    }, containerRef);

    return () => ctx.revert();
  }, [color]);

  return (
    <div ref={containerRef} className="relative inline-block w-full">
      {/* Smoke layer - larger and more visible */}
      <div 
        ref={smokeRef} 
        className="absolute pointer-events-none"
        style={{ 
          overflow: 'visible',
          width: '800px',
          height: '800px',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10
        }}
      />
      
      {/* Content */}
      <div ref={contentRef} className="relative" style={{ zIndex: 20, position: 'relative' }}>
        {children}
      </div>
    </div>
  );
};

export default SmokeEffect;

