import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CrazyMenu from '@/components/CrazyMenu';
import FloatingActionButton from '@/components/FloatingActionButton';
import SupportBot from '@/components/SupportBot';
import AnimatedSection from '@/components/AnimatedSection';
import EducationSection from '@/components/EducationSection';
import SEO from '@/components/SEO';

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative overflow-hidden min-h-screen">
      <SEO
        title="Education - Academic Background"
        description="My educational background including Master's in Computer Software Engineering from Northeastern University and Bachelor's in Computer Science from REVA University. Coursework in cloud computing, AI, data science, and software engineering."
        keywords="Education, Northeastern University, REVA University, Computer Science Degree, Software Engineering, Academic Background, University Coursework"
        url="/education"
      />
      <CrazyMenu />
      <FloatingActionButton />
      <SupportBot />
      
      <div className="pt-20">
        <AnimatedSection id="education" animationType="fadeInUp" delay={0} duration={0.25}>
          <EducationSection />
        </AnimatedSection>
      </div>
    </main>
  );
};

export default Education;