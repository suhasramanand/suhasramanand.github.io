import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CrazyMenu from '@/components/CrazyMenu';
import FloatingActionButton from '@/components/FloatingActionButton';
import SupportBot from '@/components/SupportBot';
import AnimatedSection from '@/components/AnimatedSection';
import ProjectsSection from '@/components/ProjectsSection';
import SEO from '@/components/SEO';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative overflow-hidden min-h-screen">
      <SEO
        title="Projects - Portfolio Showcase"
        description="Explore my portfolio of full-stack applications, cloud infrastructure projects, AI-powered tools, and DevOps solutions. Built with modern technologies including React, Node.js, Python, AWS, GCP, and Kubernetes."
        keywords="Software Projects, Portfolio, Full Stack Development, Cloud Projects, DevOps Projects, React Projects, Python Projects, Open Source"
        url="/projects"
      />
      <CrazyMenu />
      <FloatingActionButton />
      <SupportBot />
      
      <div className="pt-20">
        <AnimatedSection id="projects" animationType="fadeInUp" delay={0} duration={0.3}>
          <ProjectsSection />
        </AnimatedSection>
      </div>
    </main>
  );
};

export default Projects;