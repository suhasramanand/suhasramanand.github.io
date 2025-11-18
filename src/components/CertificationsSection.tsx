import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Certification {
  name: string;
  issuer: string;
  badgeUrl: string;
  color: string;
  credlyUrl?: string;
}

const certifications: Certification[] = [
  {
    name: "AWS Certified DevOps Engineer - Professional",
    issuer: "Amazon Web Services",
    badgeUrl: "/images/certifications/AWSDevops.png",
    color: "from-orange-500 to-yellow-500",
    credlyUrl: "https://www.credly.com/badges/02644054-6fc0-4863-aed1-779c957d7f3f/public_url"
  },
  {
    name: "AZ-900: Microsoft Azure Fundamentals",
    issuer: "Microsoft",
    badgeUrl: "/images/certifications/AZ900.png",
    color: "from-blue-500 to-cyan-500"
  }
];

const CertificationsSection: React.FC = React.memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const certRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading
      gsap.from(headingRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.3,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      // Animate certification cards
      certRefs.current.forEach((cert, index) => {
        if (cert) {
          gsap.from(cert, {
            y: 30,
            opacity: 0,
            duration: 0.3,
            delay: 0.1 * index,
            scrollTrigger: {
              trigger: cert,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="certifications" className="py-16 sm:py-20 md:py-24 relative" ref={sectionRef}>
      <div className="section-container">
        <h2 ref={headingRef} className="section-title">Certifications</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto mt-12">
          {certifications.map((cert, index) => {
            const CardContent = (
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 flex items-center justify-center flex-shrink-0 overflow-hidden border-2 border-black/30 dark:border-border bg-paper-beige dark:bg-muted">
                  <img 
                    src={cert.badgeUrl} 
                    alt={`${cert.name} Badge`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.className = "w-20 h-20 flex items-center justify-center flex-shrink-0 bg-black dark:bg-foreground text-paper-cream dark:text-background border-2 border-black dark:border-foreground";
                        parent.innerHTML = '<svg class="text-paper-cream dark:text-background" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>';
                      }
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="text-xl font-serif font-semibold text-black dark:text-foreground mb-2">{cert.name}</h3>
                      <p className="text-ink-gray dark:text-muted-foreground font-serif">{cert.issuer}</p>
                    </div>
                    {cert.credlyUrl && (
                      <ExternalLink className="w-4 h-4 text-ink-gray dark:text-muted-foreground flex-shrink-0 mt-1" />
                    )}
                  </div>
                </div>
              </div>
            );

            if (cert.credlyUrl) {
              return (
                <a
                  key={index}
                  href={cert.credlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  ref={el => certRefs.current[index] = el}
                  className="paper-card hover:scale-105 transition-transform duration-200 cursor-pointer group"
                  aria-label={`View ${cert.name} on Credly`}
                >
                  {CardContent}
                </a>
              );
            }

            return (
              <div
                key={index}
                ref={el => certRefs.current[index] = el}
                className="paper-card"
              >
                {CardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

CertificationsSection.displayName = 'CertificationsSection';
export default CertificationsSection;

