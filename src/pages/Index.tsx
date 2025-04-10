
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import EducationSection from '@/components/EducationSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import ContactSection from '@/components/ContactSection';
import CircleMenu from '@/components/CircleMenu';
import ProgressBar from '@/components/ProgressBar';
import GoToTopButton from '@/components/GoToTopButton';
import { Github, Linkedin, Mail, PhoneCall } from 'lucide-react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Index = () => {
  useEffect(() => {
    // Initialize any global animations or effects
    
    // Set up smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href')?.substring(1);
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            gsap.to(window, {
              duration: 1,
              scrollTo: {
                y: targetElement,
                offsetY: 50
              },
              ease: 'power2.inOut'
            });
          }
        }
      });
    });
    
    return () => {
      // Clean up any event listeners or animations
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main className="relative overflow-hidden">
      {/* Circular menu that pops out from top right */}
      <CircleMenu />
      
      {/* Go to top button */}
      <GoToTopButton />
      
      {/* Gamification progress bar */}
      <ProgressBar />
      
      {/* Portfolio sections */}
      <div id="hero">
        <HeroSection />
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <div id="experience">
        <ExperienceSection />
      </div>
      <div id="education">
        <EducationSection />
      </div>
      <div id="projects">
        <ProjectsSection />
      </div>
      <div id="skills">
        <SkillsSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
      
      {/* Enhanced Footer with social links */}
      <footer className="py-8 text-center text-gray-600 bg-white border-t border-gray-100">
        <div className="container mx-auto">
          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-6">
            <a 
              href="https://github.com/suhasramanand" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-100 hover:bg-[#FFDE59] hover:text-white transition-colors"
              aria-label="GitHub Profile"
            >
              <Github size={22} />
            </a>
            <a 
              href="https://linkedin.com/in/suhasreddybr/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-100 hover:bg-[#FFDE59] hover:text-white transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={22} />
            </a>
            <a 
              href="mailto:baluvanahallyraman.s@northeastern.edu"
              className="p-3 rounded-full bg-gray-100 hover:bg-[#FFDE59] hover:text-white transition-colors"
              aria-label="Email Contact"
            >
              <Mail size={22} />
            </a>
            <a 
              href="tel:+18577462805"
              className="p-3 rounded-full bg-gray-100 hover:bg-[#FFDE59] hover:text-white transition-colors"
              aria-label="Phone Contact"
            >
              <PhoneCall size={22} />
            </a>
          </div>
          
          <p>&copy; {new Date().getFullYear()} Suhas Reddy. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
