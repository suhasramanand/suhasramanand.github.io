import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CrazyMenu from '@/components/CrazyMenu';
import FloatingActionButton from '@/components/FloatingActionButton';
import SupportBot from '@/components/SupportBot';
import AnimatedSection from '@/components/AnimatedSection';
import OpenSourceSection from '@/components/OpenSourceSection';
import SEO from '@/components/SEO';

gsap.registerPlugin(ScrollTrigger);

const OpenSource = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative overflow-hidden min-h-screen">
      <SEO
        title="Open Source Contributions"
        description="My contributions to open source projects and community initiatives. Explore repositories, pull requests, and open source projects I've contributed to."
        keywords="Open Source, GitHub Contributions, Open Source Projects, Community Contributions, Software Contributions"
        url="/opensource"
      />
      <CrazyMenu />
      <FloatingActionButton />
      <SupportBot />
      
      <div className="pt-20">
        <AnimatedSection id="opensource" animationType="fadeInUp" delay={0} duration={0.3}>
          <OpenSourceSection />
        </AnimatedSection>
      </div>
    </main>
  );
};

export default OpenSource;