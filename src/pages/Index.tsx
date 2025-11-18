
import React, { useEffect, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import HeroSection from '@/components/HeroSection';
import CrazyMenu from '@/components/CrazyMenu';
import AnimatedBackground from '@/components/AnimatedBackground';
import AnimatedSection from '@/components/AnimatedSection';
import FloatingActionButton from '@/components/FloatingActionButton';
import ProgressBar from '@/components/ProgressBar';
import SupportBot from '@/components/SupportBot';
import { Github, Linkedin, Mail } from 'lucide-react';

// Lazy load below-the-fold sections for better initial load performance
const AboutSection = lazy(() => import('@/components/AboutSection'));
const ExperienceSection = lazy(() => import('@/components/ExperienceSection'));
const EducationSection = lazy(() => import('@/components/EducationSection'));
const ProjectsSection = lazy(() => import('@/components/ProjectsSection'));
const SkillsSection = lazy(() => import('@/components/SkillsSection'));
const ActivitiesSection = lazy(() => import('@/components/ActivitiesSection'));
const CertificationsSection = lazy(() => import('@/components/CertificationsSection'));
const ContactSection = lazy(() => import('@/components/ContactSection'));

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Index = () => {
  useEffect(() => {
    // Remove hash from URL to prevent browser from auto-scrolling to sections
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    
    // Force scroll to top on mount - multiple attempts to ensure it sticks
    const forceScrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    
    // Immediate scroll to top
    forceScrollToTop();
    
    // Also use requestAnimationFrame to ensure it happens after render
    requestAnimationFrame(() => {
      forceScrollToTop();
      
      // Another attempt after a short delay to override any browser behavior
      setTimeout(() => {
        forceScrollToTop();
      }, 0);
      
      // Final attempt after a slightly longer delay
      setTimeout(() => {
        forceScrollToTop();
      }, 100);
    });
    
    // Initialize any global animations or effects
    
    // Refresh ScrollTrigger after elements are rendered and scroll position is set
    // Delay this to ensure scroll to top happens first
    let refreshTimeout: NodeJS.Timeout;
    const refreshScrollTrigger = () => {
      clearTimeout(refreshTimeout);
      refreshTimeout = setTimeout(() => {
        // Make sure we're still at top before refreshing
        if (window.scrollY > 0) {
          forceScrollToTop();
        }
        ScrollTrigger.refresh();
      }, 300);
    };
    
    refreshScrollTrigger();
    
    // Set up smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href')?.substring(1);
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            gsap.to(window, {
              duration: 0.4,
              scrollTo: {
                y: targetElement,
                offsetY: 50
              },
              ease: 'power2.out'
            });
          }
        }
      });
    });
    
    // Refresh on window resize (debounced for performance)
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      clearTimeout(refreshTimeout);
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main className="relative overflow-hidden">
      {/* Crazy animated background */}
      <AnimatedBackground />
      
      {/* Crazy morphing menu */}
      <CrazyMenu />
      
      {/* Floating action button */}
      <FloatingActionButton />
      
      {/* Support Bot */}
      <SupportBot />
      
      {/* Gamification progress bar */}
      <ProgressBar />
      
      {/* Portfolio sections with animations */}
      <AnimatedSection id="hero" animationType="fadeInUp" delay={0.2}>
        <HeroSection />
      </AnimatedSection>
      
             <Suspense fallback={
               <div className="min-h-screen flex items-center justify-center">
                 <div className="text-center">
                   <div className="inline-block w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mb-4"></div>
                   <p className="text-ink-gray font-serif">Loading...</p>
                 </div>
               </div>
             }>
        <AnimatedSection id="about" animationType="fadeInLeft" delay={0} duration={0.3}>
          <AboutSection />
        </AnimatedSection>
        
        <AnimatedSection id="experience" animationType="fadeInUp" delay={0} duration={0.25}>
          <ExperienceSection />
        </AnimatedSection>
        
        <AnimatedSection id="education" animationType="fadeInUp" delay={0} duration={0.25}>
          <EducationSection />
        </AnimatedSection>
        
        <AnimatedSection id="projects" animationType="fadeInUp" delay={0} duration={0.3}>
          <ProjectsSection />
        </AnimatedSection>
        
        <AnimatedSection id="skills" animationType="slideIn" delay={0} duration={0.3}>
          <SkillsSection />
        </AnimatedSection>
        
        <AnimatedSection id="activities" animationType="fadeInUp" delay={0} duration={0.3}>
          <ActivitiesSection />
        </AnimatedSection>
        
        <AnimatedSection id="certifications" animationType="fadeInUp" delay={0} duration={0.3}>
          <CertificationsSection />
        </AnimatedSection>
        
        <AnimatedSection id="contact" animationType="fadeInUp" delay={0} duration={0.3}>
          <ContactSection />
        </AnimatedSection>
      </Suspense>
      
      {/* Enhanced Footer with social links */}
      <footer className="py-12 text-center border-t border-black/20 dark:border-border relative z-10">
        <div className="section-container">
          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-6">
            <a 
              href="https://github.com/suhasramanand" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group p-3 border border-black/20 dark:border-border hover:bg-black dark:hover:bg-foreground hover:text-paper-cream dark:hover:text-background transition-all duration-200"
              aria-label="GitHub Profile"
            >
              <Github size={22} />
            </a>
            <a 
              href="https://linkedin.com/in/suhasreddybr/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group p-3 border border-black/20 dark:border-border hover:bg-black dark:hover:bg-foreground hover:text-paper-cream dark:hover:text-background transition-all duration-200"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={22} />
            </a>
            <a 
              href="mailto:reachsuhasreddy@gmail.com"
              className="group p-3 border border-black/20 dark:border-border hover:bg-black dark:hover:bg-foreground hover:text-paper-cream dark:hover:text-background transition-all duration-200"
              aria-label="Email Contact"
            >
              <Mail size={22} />
            </a>
          </div>
          
          <p className="text-black dark:text-foreground font-serif">&copy; {new Date().getFullYear()} Suhas Reddy</p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
