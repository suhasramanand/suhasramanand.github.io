import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ActivitiesSection: React.FC = React.memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mouseMoveHandlers: ((e: MouseEvent) => void)[] = [];
    const mouseLeaveHandlers: (() => void)[] = [];

    // Set all elements to be visible immediately - let AnimatedSection handle entrance animation
    if (headingRef.current) {
      gsap.set(headingRef.current, { opacity: 1, y: 0 });
    }
    
    // Set badges to be visible
    badgeRefs.current.forEach((badge) => {
      if (badge) {
        gsap.set(badge, { opacity: 1, y: 0, rotationY: 0 });
      }
    });

    const ctx = gsap.context(() => {
      // Set up 3D hover effects for badges
      badgeRefs.current.forEach((badge, index) => {
        if (badge) {
          // 3D hover effect
          const handleMouseMove = (e: MouseEvent) => {
            const rect = badge.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;

            gsap.to(badge, {
              rotationX: rotateX,
              rotationY: rotateY,
              z: 30,
              scale: 1.05,
              boxShadow: '0 30px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(155, 135, 245, 0.2)',
              duration: 0.2,
              ease: "power1.out"
            });
          };

          const handleMouseLeave = () => {
            gsap.to(badge, {
              rotationX: 0,
              rotationY: 0,
              z: 0,
              scale: 1,
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)',
              duration: 0.5,
              ease: "power2.out"
            });
          };

          badge.addEventListener('mousemove', handleMouseMove);
          badge.addEventListener('mouseleave', handleMouseLeave);
          
          mouseMoveHandlers.push(handleMouseMove);
          mouseLeaveHandlers.push(handleMouseLeave);
        }
      });
    });

    return () => {
      // Clean up event listeners
      badgeRefs.current.forEach((badge, index) => {
        if (badge && mouseMoveHandlers[index] && mouseLeaveHandlers[index]) {
          badge.removeEventListener('mousemove', mouseMoveHandlers[index]);
          badge.removeEventListener('mouseleave', mouseLeaveHandlers[index]);
        }
      });
      ctx.revert();
    };
  }, []);

  // Activities badge data
  const activities = [
    {
      name: "KubeCon + CloudNativeCon",
      year: "2025",
      text: "Attendee",
      logo: "/images/badges/kubecon-thumb.webp"
    },
    {
      name: "AWS re:Invent",
      year: "2025",
      text: "Attendee",
      logo: "/images/badges/AWSReInvent2025.png"
    }
  ];

  return (
    <section id="activities" className="py-8 sm:py-12 md:py-16 relative" ref={sectionRef}>
      <div className="section-container">
        <div className="mb-12 sm:mb-16">
          <div ref={headingRef} className="uppercase text-xs sm:text-sm font-sans tracking-wider mb-4 sm:mb-6 text-ink-gray dark:text-muted-foreground">
            Activities
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-tight">
            <span className="text-black dark:text-foreground">Beyond code, </span>
            <span className="italic text-ink-gray dark:text-muted-foreground">exploring passions</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto mt-12">
          {activities.map((activity, index) => (
            <div
              key={index}
              ref={el => badgeRefs.current[index] = el}
              className="paper-card flex flex-row items-center gap-4 sm:gap-6"
            >
              <div className="w-32 h-32 flex-shrink-0 flex items-center justify-center p-2 overflow-hidden border-2 border-black/30 dark:border-border bg-paper-beige dark:bg-muted">
                    <img
                      src={activity.logo}
                      alt={`${activity.name} Logo`}
                      className="w-full h-full object-contain"
                      loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const initials = activity.name.split(' ').map(n => n[0]).join('').substring(0, 2);
                      parent.className = "w-32 h-32 flex-shrink-0 bg-black dark:bg-foreground text-paper-cream dark:text-background flex items-center justify-center border-2 border-black dark:border-foreground";
                      parent.innerHTML = `<span class="font-serif font-bold text-2xl">${initials}</span>`;
                    }
                  }}
                />
              </div>
              <div className="flex flex-col justify-center flex-1">
                <span className="text-xl font-serif font-semibold text-black dark:text-foreground mb-1">{activity.name}</span>
                <span className="text-ink-gray dark:text-muted-foreground font-serif mb-2">{activity.year}</span>
                <span className="text-sm text-black dark:text-foreground border border-black/40 dark:border-border px-3 py-1 w-fit font-serif bg-paper-beige dark:bg-muted">{activity.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

ActivitiesSection.displayName = 'ActivitiesSection';
export default ActivitiesSection;

