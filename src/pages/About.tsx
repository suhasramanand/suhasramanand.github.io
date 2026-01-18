import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CrazyMenu from '@/components/CrazyMenu';
import FloatingActionButton from '@/components/FloatingActionButton';
import SupportBot from '@/components/SupportBot';
import AnimatedSection from '@/components/AnimatedSection';
import AboutSection from '@/components/AboutSection';
import SEO from '@/components/SEO';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative overflow-hidden min-h-screen">
      <SEO
        title="About Me - Software Engineer & Cloud Specialist"
        description="Learn about my journey as a Software Engineer and Cloud Specialist. Passionate about building scalable systems, cloud infrastructure automation, and DevOps practices. Currently pursuing Master's at Northeastern University."
        keywords="About, Software Engineer Bio, Cloud Specialist, Personal Introduction, Developer Story, Professional Background"
        url="/about"
      />
      <CrazyMenu />
      <FloatingActionButton />
      <SupportBot />
      
      <div className="pt-20">
        <AnimatedSection id="about" animationType="fadeInLeft" delay={0} duration={0.3}>
          <AboutSection />
        </AnimatedSection>
      </div>
    </main>
  );
};

export default About;