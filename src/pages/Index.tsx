
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
import CrazyMenu from '@/components/CrazyMenu';
import AnimatedBackground from '@/components/AnimatedBackground';
import CursorTrail from '@/components/CursorTrail';
import AnimatedSection from '@/components/AnimatedSection';
import FloatingActionButton from '@/components/FloatingActionButton';
import ProgressBar from '@/components/ProgressBar';
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
      {/* Crazy animated background */}
      <AnimatedBackground />
      
      {/* Cursor trail effect */}
      <CursorTrail />
      
      {/* Crazy morphing menu */}
      <CrazyMenu />
      
      {/* Floating action button */}
      <FloatingActionButton />
      
      {/* Gamification progress bar */}
      <ProgressBar />
      
      {/* Portfolio sections with animations */}
      <AnimatedSection id="hero" animationType="fadeInUp" delay={0.2}>
        <HeroSection />
      </AnimatedSection>
      
      <AnimatedSection id="about" animationType="fadeInLeft" delay={0.1}>
        <AboutSection />
      </AnimatedSection>
      
      <AnimatedSection id="experience" animationType="scaleIn" delay={0.3}>
        <ExperienceSection />
      </AnimatedSection>
      
      <AnimatedSection id="education" animationType="fadeInRight" delay={0.2}>
        <EducationSection />
      </AnimatedSection>
      
      <AnimatedSection id="projects" animationType="bounceIn" delay={0.4}>
        <ProjectsSection />
      </AnimatedSection>
      
      <AnimatedSection id="skills" animationType="slideIn" delay={0.1}>
        <SkillsSection />
      </AnimatedSection>
      
      <AnimatedSection id="contact" animationType="fadeInUp" delay={0.2}>
        <ContactSection />
      </AnimatedSection>
      
      {/* Enhanced Footer with social links */}
      <AnimatedSection animationType="fadeInUp" delay={0.5}>
        <footer className="py-8 text-center text-gray-600 bg-white/80 backdrop-blur-md border-t border-gray-100/50">
          <div className="container mx-auto">
            {/* Social Links */}
            <div className="flex justify-center gap-4 mb-6">
              <a 
                href="https://github.com/suhasramanand" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group p-3 rounded-full bg-gray-100 hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-900 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="GitHub Profile"
              >
                <Github size={22} className="group-hover:animate-pulse" />
              </a>
              <a 
                href="https://linkedin.com/in/suhasreddybr/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group p-3 rounded-full bg-gray-100 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={22} className="group-hover:animate-pulse" />
              </a>
              <a 
                href="mailto:baluvanahallyraman.s@northeastern.edu"
                className="group p-3 rounded-full bg-gray-100 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="Email Contact"
              >
                <Mail size={22} className="group-hover:animate-pulse" />
              </a>
              <a 
                href="tel:+18577462805"
                className="group p-3 rounded-full bg-gray-100 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="Phone Contact"
              >
                <PhoneCall size={22} className="group-hover:animate-pulse" />
              </a>
            </div>
            
            <p className="text-sm">&copy; {new Date().getFullYear()} Suhas Reddy. All rights reserved.</p>
          </div>
        </footer>
      </AnimatedSection>
    </main>
  );
};

export default Index;
