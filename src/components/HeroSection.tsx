import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Github, Linkedin, Mail, PhoneCall, ArrowDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLCanvasElement>(null);

  // Canvas animation for interactive background
  useEffect(() => {
    const canvas = backgroundRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      if (canvas && window) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Create particles
    const particlesArray: Particle[] = [];
    const numberOfParticles = Math.min(window.innerWidth, window.innerHeight) * 0.05;
    const colors = ['#9b87f5', '#FFDE59', '#5CE1E6', '#FF914D'];

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    }

    // Create particles
    for (let i = 0; i < numberOfParticles; i++) {
      const size = Math.random() * 5 + 1;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const speedX = Math.random() * 2 - 1;
      const speedY = Math.random() * 2 - 1;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      particlesArray.push({ x, y, size, speedX, speedY, color });
    }

    // Mouse interaction
    const mouse = {
      x: 0,
      y: 0,
      radius: 150,
      active: false
    };

    canvas.addEventListener('mousemove', (event) => {
      mouse.active = true;
      mouse.x = event.x;
      mouse.y = event.y;
    });

    canvas.addEventListener('mouseout', () => {
      mouse.active = false;
    });

    // Draw and update particles
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        const p = particlesArray[i];
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + '40'; // Add transparency
        ctx.fill();
        
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Boundary checking
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        
        // Mouse interaction
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            const angle = Math.atan2(dy, dx);
            const force = (mouse.radius - distance) / mouse.radius;
            
            p.x += Math.cos(angle) * force * 2;
            p.y += Math.sin(angle) * force * 2;
          }
        }
        
        // Connect nearby particles
        for (let j = i + 1; j < particlesArray.length; j++) {
          const p2 = particlesArray[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = p.color + Math.floor((1 - distance / 100) * 20).toString(16);
            ctx.lineWidth = 0.2;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      tl.from(nameRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.2
      })
      .from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
      }, '-=0.4')
      .from(descRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
      }, '-=0.4')
      .from(socialRef.current?.children, {
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5
      }, '-=0.4')
      .from(scrollRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.8,
        repeat: -1,
        yoyo: true
      });
      
      // Floating elements animation
      const elements = floatingElementsRef.current?.children;
      if (elements) {
        Array.from(elements).forEach((element, index) => {
          gsap.to(element, {
            y: `random(-20, 20)`,
            x: `random(-20, 20)`,
            rotation: `random(-15, 15)`,
            duration: 3 + index,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.2
          });
        });
      }
      
      // Mouse follow parallax effect
      if (sectionRef.current) {
        sectionRef.current.addEventListener('mousemove', (e) => {
          const { clientX, clientY } = e;
          const x = (clientX / window.innerWidth - 0.5) * 20;
          const y = (clientY / window.innerHeight - 0.5) * 20;
          
          if (floatingElementsRef.current) {
            gsap.to(floatingElementsRef.current, {
              x: x,
              y: y,
              duration: 1,
              ease: "power2.out"
            });
          }
        });
      }
    });
    
    return () => ctx.revert(); // Clean up animation
  }, []);

  return (
    <div ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Interactive canvas background */}
      <canvas 
        ref={backgroundRef} 
        className="absolute inset-0 -z-20 w-full h-full"
      />
      
      {/* Floating decorative elements */}
      <div ref={floatingElementsRef} className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-groww-purple/20 rounded-full blur-md"></div>
        <div className="absolute top-3/4 left-2/3 w-24 h-24 bg-yellow-300/20 rounded-full blur-md"></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-blue-300/20 rounded-full blur-md"></div>
        <div className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-pink-300/20 rounded-full blur-md"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-green-300/10 rounded-full blur-lg"></div>
        
        {/* Visual shapes */}
        <div className="absolute top-1/5 left-1/5 w-8 h-8 border-2 border-groww-purple/30 rounded-lg rotate-12"></div>
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 border-2 border-yellow-400/30 rounded-full"></div>
        <div className="absolute top-2/3 left-1/3 w-10 h-10 border-2 border-blue-400/30 rotate-45"></div>
      </div>
      
      <div className="relative z-10 max-w-3xl">
        <div className="mb-6">
          <h1 ref={nameRef} className="text-5xl md:text-6xl font-bold text-groww-dark-gray mb-4">
            Suhas Reddy
          </h1>
          <p ref={titleRef} className="text-xl md:text-2xl text-groww-purple font-semibold mb-4">
            Software Engineer & Cloud Specialist
          </p>
          <p ref={descRef} className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Master's student at Northeastern University specialized in building scalable applications 
            with expertise in Full Stack, DevOps and Cloud infrastructure.
          </p>
        </div>
        
        <div ref={socialRef} className="flex justify-center gap-4 mb-12">
          <a href="https://github.com/suhasramanand" target="_blank" rel="noopener noreferrer" 
            className="w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-md text-groww-dark-gray hover:bg-groww-purple hover:text-white transition-all duration-300">
            <Github size={20} />
          </a>
          <a href="https://linkedin.com/in/suhasreddybr/" target="_blank" rel="noopener noreferrer" 
            className="w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-md text-groww-dark-gray hover:bg-groww-purple hover:text-white transition-all duration-300">
            <Linkedin size={20} />
          </a>
          <a href="mailto:baluvanahallyraman.s@northeastern.edu" 
            className="w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-md text-groww-dark-gray hover:bg-groww-purple hover:text-white transition-all duration-300">
            <Mail size={20} />
          </a>
          <a href="tel:+18577462805" 
            className="w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-md text-groww-dark-gray hover:bg-groww-purple hover:text-white transition-all duration-300">
            <PhoneCall size={20} />
          </a>
        </div>
        
        <div ref={scrollRef} className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center cursor-pointer" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
            <p className="text-sm text-gray-500 mb-2">Scroll Down</p>
            <ArrowDown className="text-groww-purple animate-bounce" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;