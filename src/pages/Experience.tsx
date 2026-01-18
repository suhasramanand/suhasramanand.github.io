import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CrazyMenu from '@/components/CrazyMenu';
import FloatingActionButton from '@/components/FloatingActionButton';
import SupportBot from '@/components/SupportBot';
import AnimatedSection from '@/components/AnimatedSection';
import ExperienceSection from '@/components/ExperienceSection';
import SEO from '@/components/SEO';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative overflow-hidden min-h-screen">
      <SEO
        title="Work Experience - Professional Journey"
        description="My professional experience as a Software Engineer specializing in Cloud Infrastructure, SRE, and DevOps. Work history at Calix Inc, Elanco, and Bosch with expertise in AWS, GCP, Kubernetes, and CI/CD pipelines."
        keywords="Work Experience, Software Engineer Experience, Cloud Engineer, SRE Experience, DevOps Experience, Calix, Elanco, Bosch"
        url="/experience"
      />
      <CrazyMenu />
      <FloatingActionButton />
      <SupportBot />
      
      <div className="pt-20">
        <AnimatedSection id="experience" animationType="fadeInUp" delay={0} duration={0.25}>
          <ExperienceSection />
        </AnimatedSection>
      </div>
    </main>
  );
};

export default Experience;