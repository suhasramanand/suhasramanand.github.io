
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Home, 
  User, 
  Briefcase, 
  Code, 
  GraduationCap, 
  Mail
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [unlocked, setUnlocked] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<(HTMLDivElement | null)[]>([]);

  const totalSections = 5; // Number of sections to track
  const badges = [
    { threshold: 1, icon: <Home size={18} className="text-white" />, label: 'Home' },
    { threshold: 2, icon: <User size={18} className="text-white" />, label: 'About' },
    { threshold: 3, icon: <Briefcase size={18} className="text-white" />, label: 'Experience' },
    { threshold: 4, icon: <Code size={18} className="text-white" />, label: 'Projects' },
    { threshold: 5, icon: <GraduationCap size={18} className="text-white" />, label: 'Education' },
  ];

  useEffect(() => {
    // Calculate scroll progress
    const calculateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      const percent = Math.min(scrollTop / documentHeight, 1);
      setProgress(percent * 100);
      
      // Calculate unlocked sections based on scrolled sections
      const sectionsInView = Math.ceil(percent * totalSections);
      setUnlocked(sectionsInView);
    };

    window.addEventListener('scroll', calculateScrollProgress);
    calculateScrollProgress(); // Initial calculation

    return () => window.removeEventListener('scroll', calculateScrollProgress);
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
        <div ref={progressRef} className="h-64 w-2 bg-gray-200 rounded-full relative">
          <div 
            className="absolute bottom-0 left-0 w-full rounded-full purple-gradient"
            style={{ height: `${progress}%`, transition: 'height 0.3s ease-out' }}
          ></div>
        </div>
        
        <div className="flex flex-col gap-4">
          {badges.map((badge, index) => (
            <div 
              key={index}
              ref={el => badgesRef.current[index] = el}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                unlocked >= badge.threshold 
                  ? 'bg-groww-purple text-white shadow-lg' 
                  : 'bg-gray-200 text-gray-400'
              }`}
              title={badge.label}
            >
              {badge.icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
