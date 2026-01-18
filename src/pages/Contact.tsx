import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CrazyMenu from '@/components/CrazyMenu';
import FloatingActionButton from '@/components/FloatingActionButton';
import SupportBot from '@/components/SupportBot';
import AnimatedSection from '@/components/AnimatedSection';
import ContactSection from '@/components/ContactSection';
import SEO from '@/components/SEO';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative overflow-hidden min-h-screen">
      <SEO
        title="Contact - Get in Touch"
        description="Get in touch with me for collaboration opportunities, project inquiries, or just to connect. I'm always open to discussing software engineering, cloud infrastructure, and new opportunities."
        keywords="Contact, Get in Touch, Collaboration, Hire Software Engineer, Contact Developer, Portfolio Contact"
        url="/contact"
      />
      <CrazyMenu />
      <FloatingActionButton />
      <SupportBot />
      
      <div className="pt-20">
        <AnimatedSection id="contact" animationType="fadeInUp" delay={0} duration={0.3}>
          <ContactSection />
        </AnimatedSection>
      </div>
    </main>
  );
};

export default Contact;