
import React, { useEffect, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import HeroSection from '@/components/HeroSection';
import CrazyMenu from '@/components/CrazyMenu';
import AnimatedSection from '@/components/AnimatedSection';
import FloatingActionButton from '@/components/FloatingActionButton';
import SupportBot from '@/components/SupportBot';
import { ChevronDown } from 'lucide-react';

// Lazy load below-the-fold sections for better initial load performance
const AboutSection = lazy(() => import('@/components/AboutSection'));
const ExperienceSection = lazy(() => import('@/components/ExperienceSection'));
const EducationSection = lazy(() => import('@/components/EducationSection'));
const ProjectsSection = lazy(() => import('@/components/ProjectsSection'));
const SkillsSection = lazy(() => import('@/components/SkillsSection'));
const ActivitiesSection = lazy(() => import('@/components/ActivitiesSection'));
const OpenSourceSection = lazy(() => import('@/components/OpenSourceSection'));
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
      {/* Crazy morphing menu */}
      <CrazyMenu />
      
      {/* Floating action button */}
      <FloatingActionButton />
      
      {/* Support Bot */}
      <SupportBot />
      
      
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
        
        <AnimatedSection id="opensource" animationType="fadeInUp" delay={0} duration={0.3}>
          <OpenSourceSection />
        </AnimatedSection>
        
        <AnimatedSection id="certifications" animationType="fadeInUp" delay={0} duration={0.3}>
          <CertificationsSection />
        </AnimatedSection>
        
        <AnimatedSection id="contact" animationType="fadeInUp" delay={0} duration={0.3}>
          <ContactSection />
        </AnimatedSection>
      </Suspense>
      
      {/* CodeRabbit-style Footer */}
      <footer className="relative z-40 footer-with-watermark" style={{ overflow: 'hidden', minHeight: '400px', marginTop: '-1px' }}>
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 z-30">
        </div>
      </footer>
      
      {/* Bottom Footer Section - After fade */}
      <div className="relative z-40 footer-bottom-section" style={{ marginTop: '0', paddingTop: '0' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-ink-gray dark:text-muted-foreground text-sm">
              <span>English</span>
              <ChevronDown size={16} />
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="/terms-of-service" className="text-ink-gray dark:text-muted-foreground hover:text-black dark:hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="/privacy-policy" className="text-ink-gray dark:text-muted-foreground hover:text-black dark:hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <span className="text-ink-gray dark:text-muted-foreground">
                Suhas Reddy © {new Date().getFullYear()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Index;
