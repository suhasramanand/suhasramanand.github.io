import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Github, Linkedin, Mail, ArrowDown, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SmokeEffectWrapper from './SmokeEffectWrapper';
import Terminal from './Terminal';

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [displayedDesc, setDisplayedDesc] = useState("");
  
  const fullDescText = "Master's student at Northeastern University specialized in building scalable applications with expertise in Full Stack, DevOps and Cloud infrastructure.";

  // Prevent scroll on page load and ensure we start at top
  useEffect(() => {
    // Force scroll to top immediately
    if (window.scrollY > 0) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Also handle on next frame to ensure it sticks
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
  }, []);

  const typeText = (text: string, setText: (text: string) => void) => {
    let currentIndex = 0;
    const typingSpeed = 15; // milliseconds per character

    const type = () => {
      if (currentIndex < text.length) {
        setText(text.substring(0, currentIndex + 1));
        currentIndex++;
        setTimeout(type, typingSpeed);
      }
    };

    type();
  };

  // Removed canvas animation for minimal design

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      // Note: nameRef animation is handled by SmokeEffect
      // Make buttons visible immediately - no animation hiding them
      if (buttonsRef.current) {
        gsap.set(buttonsRef.current, { opacity: 1, visibility: 'visible' });
        Array.from(buttonsRef.current.children).forEach((child) => {
          gsap.set(child, { opacity: 1, y: 0, visibility: 'visible' });
        });
      }
      
      tl.from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.5
      })
      .call(() => {
        // Start typing animation after title appears
        typeText(fullDescText, setDisplayedDesc);
      }, null, "+=0.3")
      // Buttons fade in smoothly but are visible from start
      .from(buttonsRef.current?.children, {
        y: 10,
        opacity: 0.7,
        stagger: 0.1,
        duration: 0.4
      }, '-=0.2')
      .from(scrollRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.8,
        repeat: -1,
        yoyo: true
      });
      
      // Removed floating elements and parallax for minimal design
    });
    
    return () => ctx.revert(); // Clean up animation
  }, []);

  return (
    <div ref={sectionRef} id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 sm:px-8 overflow-hidden">
      <div className="relative z-10 max-w-4xl w-full">
        <div className="mb-12">
          <SmokeEffectWrapper color="#000000">
            <h1 ref={nameRef} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-black mb-6 tracking-tight">
              Suhas Reddy
            </h1>
          </SmokeEffectWrapper>
          <p ref={titleRef} className="text-xl sm:text-2xl md:text-3xl text-ink-gray font-serif font-medium mb-6 italic">
            Software Engineer & Cloud Specialist
          </p>
                <div ref={descRef} className="mb-12 max-w-2xl mx-auto min-h-[3rem]">
                  <Terminal 
                    prompt="$" 
                    showCursor={displayedDesc.length < fullDescText.length}
                    className="w-full"
                  >
                    {displayedDesc}
                  </Terminal>
                </div>
        </div>

        {/* GitHub, LinkedIn and Resume Buttons */}
        <div ref={buttonsRef} className="flex flex-wrap justify-center gap-4 mb-16" style={{ opacity: 1, visibility: 'visible' }}>
          <a 
            href="https://github.com/suhasramanand" 
            target="_blank" 
            rel="noopener noreferrer"
            className="minimal-button-outline flex items-center gap-2"
          >
            <Github size={18} />
            <span>GitHub</span>
          </a>
          <a
            href="https://linkedin.com/in/suhasreddybr"
            target="_blank"
            rel="noopener noreferrer"
            className="minimal-button-outline flex items-center gap-2"
          >
            <Linkedin size={18} />
            <span>LinkedIn</span>
          </a>
          <button
            onClick={() => navigate('/resume')}
            className="minimal-button flex items-center gap-2"
          >
            <FileText size={18} />
            <span>Resume</span>
          </button>
        </div>
        
        <div ref={scrollRef} className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center cursor-pointer" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
            <p className="text-xs text-ink-gray mb-2 font-serif">Scroll</p>
            <ArrowDown className="text-black animate-bounce w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;