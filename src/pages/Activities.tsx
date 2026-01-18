import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CrazyMenu from '@/components/CrazyMenu';
import FloatingActionButton from '@/components/FloatingActionButton';
import SupportBot from '@/components/SupportBot';
import AnimatedSection from '@/components/AnimatedSection';
import ActivitiesSection from '@/components/ActivitiesSection';
import SEO from '@/components/SEO';

gsap.registerPlugin(ScrollTrigger);

const Activities = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative overflow-hidden min-h-screen">
      <SEO
        title="Activities & Achievements"
        description="My professional activities, achievements, and contributions. Including speaking engagements, community involvement, and notable accomplishments in software engineering and cloud technologies."
        keywords="Activities, Achievements, Professional Activities, Speaking Engagements, Community Involvement, Software Engineering Activities"
        url="/activities"
      />
      <CrazyMenu />
      <FloatingActionButton />
      <SupportBot />
      
      <div className="pt-20">
        <AnimatedSection id="activities" animationType="fadeInUp" delay={0} duration={0.3}>
          <ActivitiesSection />
        </AnimatedSection>
      </div>
    </main>
  );
};

export default Activities;