import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CrazyMenu from '@/components/CrazyMenu';
import FloatingActionButton from '@/components/FloatingActionButton';
import SupportBot from '@/components/SupportBot';
import AnimatedSection from '@/components/AnimatedSection';
import CertificationsSection from '@/components/CertificationsSection';

gsap.registerPlugin(ScrollTrigger);

const Certifications = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative overflow-hidden min-h-screen">
      <CrazyMenu />
      <FloatingActionButton />
      <SupportBot />
      
      <div className="pt-20">
        <AnimatedSection id="certifications" animationType="fadeInUp" delay={0} duration={0.3}>
          <CertificationsSection />
        </AnimatedSection>
      </div>
    </main>
  );
};

export default Certifications;