import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CrazyMenu from '@/components/CrazyMenu';
import FloatingActionButton from '@/components/FloatingActionButton';
import SupportBot from '@/components/SupportBot';
import AnimatedSection from '@/components/AnimatedSection';
import SkillsSection from '@/components/SkillsSection';
import SEO from '@/components/SEO';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative overflow-hidden min-h-screen">
      <SEO
        title="Skills & Technologies - Technical Expertise"
        description="My technical skills and expertise in programming languages, frameworks, cloud platforms, and tools. Proficient in React, Node.js, Python, TypeScript, AWS, GCP, Kubernetes, Terraform, and more."
        keywords="Skills, Programming Languages, Technologies, Cloud Skills, DevOps Skills, Full Stack Development, Technical Skills, Software Engineering Skills"
        url="/skills"
      />
      <CrazyMenu />
      <FloatingActionButton />
      <SupportBot />
      
      <div className="pt-20">
        <AnimatedSection id="skills" animationType="slideIn" delay={0} duration={0.3}>
          <SkillsSection />
        </AnimatedSection>
      </div>
    </main>
  );
};

export default Skills;