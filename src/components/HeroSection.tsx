import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Github, Linkedin, Mail, ArrowDown, FileText, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'next-themes';

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { resolvedTheme } = useTheme();
  const [displayedDesc, setDisplayedDesc] = useState("");
  const isDark = resolvedTheme === 'dark';
  
  const fullDescText = "Master's student at Northeastern University specialized in building scalable applications with expertise in Full Stack, DevOps and Cloud infrastructure.";

  // Initial scroll to top only on first mount
  useEffect(() => {
    // Only scroll to top if we're at the top or there's a hash in URL
    // This prevents interfering with user scrolling
    if (window.scrollY === 0 || window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
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
      
      // Animate name heading
      tl.from(nameRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2
      });
      
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
    <div 
      ref={sectionRef} 
      id="hero" 
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 sm:px-8 overflow-hidden"
    >
      <div className="relative z-10 max-w-4xl w-full">
        <div className="mb-12">
          <h1 
            ref={nameRef} 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-black dark:text-foreground mb-6 tracking-tight" 
            style={{ 
              textShadow: isDark 
                ? '2px 2px 0px rgba(255,255,255,0.1), 4px 4px 0px rgba(255,255,255,0.08), 6px 6px 0px rgba(255,255,255,0.05)'
                : '2px 2px 0px rgba(0,0,0,0.1), 4px 4px 0px rgba(0,0,0,0.08), 6px 6px 0px rgba(0,0,0,0.05)'
            }}
          >
            <span>Hi, I'm </span>
            <span 
              className="text-black dark:text-foreground" 
              style={{ 
                textShadow: isDark
                  ? '2px 2px 0px rgba(255,255,255,0.15), 4px 4px 0px rgba(255,255,255,0.12), 6px 6px 0px rgba(255,255,255,0.08), 8px 8px 0px rgba(255,255,255,0.05)'
                  : '2px 2px 0px rgba(0,0,0,0.15), 4px 4px 0px rgba(0,0,0,0.12), 6px 6px 0px rgba(0,0,0,0.08), 8px 8px 0px rgba(0,0,0,0.05)'
              }}
            >
              Suhas
            </span>
          </h1>
          <p 
            ref={titleRef} 
            className="text-xl sm:text-2xl md:text-3xl text-ink-gray dark:text-muted-foreground font-serif font-medium mb-6 italic" 
            style={{ 
              textShadow: isDark
                ? '1px 1px 0px rgba(255,255,255,0.08), 2px 2px 0px rgba(255,255,255,0.05)'
                : '1px 1px 0px rgba(0,0,0,0.08), 2px 2px 0px rgba(0,0,0,0.05)'
            }}
          >
            Software Engineer & Cloud Specialist
          </p>
                <p ref={descRef} className="text-base sm:text-lg md:text-xl text-ink-gray/80 dark:text-muted-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed font-serif min-h-[3rem]">
                  {displayedDesc}
                  {displayedDesc.length < fullDescText.length && (
                    <span
                      className="inline-block w-2 h-5 bg-black dark:bg-foreground ml-1 align-middle"
                      style={{ animation: 'blink 1s infinite' }}
                    />
                  )}
                </p>
        </div>

        {/* Blog Banner */}
        <div className="mb-8">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/20 dark:border-foreground/20 bg-white/50 dark:bg-card/50 hover:bg-white/70 dark:hover:bg-card/70 transition-all hover:scale-105 hover:shadow-lg text-sm font-serif text-ink-gray dark:text-muted-foreground hover:text-black dark:hover:text-foreground"
          >
            <BookOpen size={16} />
            <span>Read my blog</span>
          </a>
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
        
        <div ref={scrollRef} className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="flex flex-col items-center cursor-pointer" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
            <p className="text-xs text-ink-gray dark:text-muted-foreground mb-2 font-serif">Scroll</p>
            <ArrowDown className="text-black dark:text-foreground animate-bounce w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;