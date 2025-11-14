
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { 
  Home, 
  User, 
  Briefcase, 
  GraduationCap,
  Code, 
  Mail,
  Sparkles,
  Award,
  BookOpen
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const ProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [unlocked, setUnlocked] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<(HTMLButtonElement | null)[]>([]);

  const totalSections = 8; // Number of sections to track
  const badges = [
    { threshold: 1, id: 'hero', icon: <Home size={18} className="text-black" />, label: 'Home' },
    { threshold: 2, id: 'about', icon: <User size={18} className="text-black" />, label: 'About' },
    { threshold: 3, id: 'experience', icon: <Briefcase size={18} className="text-black" />, label: 'Experience' },
    { threshold: 4, id: 'education', icon: <GraduationCap size={18} className="text-black" />, label: 'Education' },
    { threshold: 5, id: 'projects', icon: <Code size={18} className="text-black" />, label: 'Projects' },
    { threshold: 6, id: 'activities', icon: <Sparkles size={18} className="text-black" />, label: 'Activities' },
    { threshold: 7, id: 'certifications', icon: <Award size={18} className="text-black" />, label: 'Certifications' },
    { threshold: 8, id: 'contact', icon: <Mail size={18} className="text-black" />, label: 'Contact' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      if (id === "hero") {
        gsap.to(window, {
          duration: 0.4,
          scrollTo: {
            y: 0
          },
          ease: 'power2.out'
        });
      } else {
        gsap.to(window, {
          duration: 0.4,
          scrollTo: {
            y: element,
            offsetY: 50
          },
          ease: 'power2.out'
        });
      }
    }
  };

  useEffect(() => {
    // Calculate scroll progress with smooth animation
    let rafId: number | null = null;
    let targetProgress = 0;

    const calculateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      const percent = Math.min(scrollTop / documentHeight, 1);
      targetProgress = percent * 100;
      
      // Calculate unlocked sections based on scrolled sections
      const sectionsInView = Math.ceil(percent * totalSections);
      setUnlocked(sectionsInView);
    };

    const smoothUpdate = () => {
      setProgress((prev) => {
        const diff = targetProgress - prev;
        // Smooth interpolation for fluid movement
        const newProgress = prev + diff * 0.15; // Easing factor for smooth transition
        return Math.abs(diff) < 0.1 ? targetProgress : newProgress;
      });
      rafId = requestAnimationFrame(smoothUpdate);
    };

    const handleScroll = () => {
      calculateScrollProgress();
      if (rafId === null) {
        rafId = requestAnimationFrame(smoothUpdate);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    calculateScrollProgress(); // Initial calculation
    rafId = requestAnimationFrame(smoothUpdate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  useEffect(() => {
    badges.forEach((badge, index) => {
      if (badgesRef.current[index] && unlocked >= badge.threshold) {
        gsap.to(badgesRef.current[index], {
          scale: 1.2,
          duration: 0.3,
          repeat: 1,
          yoyo: true,
          ease: "elastic.out(1, 0.3)"
        });
      }
    });
  }, [unlocked]);

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
      <div className="flex flex-col items-center gap-6">
        <div ref={progressRef} className="h-64 w-2 bg-ink-light-gray/20 rounded-full relative overflow-hidden">
          <div 
            className="absolute bottom-0 left-0 w-full rounded-full bg-black"
            style={{ 
              height: `${progress}%`,
              transition: 'none', // We handle smoothness via requestAnimationFrame
              filter: 'blur(0.5px)', // Soft edge blending
            }}
          ></div>
          {/* Smooth gradient overlay for merging effect */}
          <div 
            className="absolute bottom-0 left-0 w-full rounded-full opacity-80"
            style={{ 
              height: `${Math.min(progress + 5, 100)}%`,
              background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%)',
              transition: 'none',
              filter: 'blur(2px)',
            }}
          ></div>
        </div>
        
        <div className="flex flex-col gap-4">
          {badges.map((badge, index) => (
            <button
              key={index}
              ref={el => badgesRef.current[index] = el}
              onClick={() => scrollToSection(badge.id)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110 border border-black/20 ${
                unlocked >= badge.threshold 
                  ? 'bg-black text-paper-cream shadow-md' 
                  : 'bg-paper-cream text-ink-light-gray hover:bg-paper-beige'
              }`}
              title={badge.label}
            >
              {badge.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
