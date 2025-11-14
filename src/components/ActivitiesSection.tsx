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

      // Animate badges with 3D effect
      badgeRefs.current.forEach((badge, index) => {
        if (badge) {
          gsap.from(badge, {
            y: 50,
            opacity: 0,
            rotationY: -15,
            duration: 0.6,
            delay: 0.2 * index,
            scrollTrigger: {
              trigger: badge,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          });

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
    <section id="activities" className="py-16 sm:py-20 md:py-24 relative" ref={sectionRef}>
      <div className="section-container">
        <h2 ref={headingRef} className="section-title">Activities</h2>
        
        <div className="flex justify-center items-center gap-8 md:gap-12 flex-wrap max-w-5xl mx-auto mt-12">
          {activities.map((activity, index) => (
            <div
              key={index}
              ref={el => badgeRefs.current[index] = el}
              className="paper-card w-full md:w-[500px] flex flex-row items-center gap-6"
            >
              <div className="w-32 h-32 flex-shrink-0 flex items-center justify-center p-2 overflow-hidden border-2 border-black/30 bg-paper-beige">
                <img 
                  src={activity.logo} 
                  alt={`${activity.name} Logo`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const initials = activity.name.split(' ').map(n => n[0]).join('').substring(0, 2);
                      parent.className = "w-32 h-32 flex-shrink-0 bg-black text-paper-cream flex items-center justify-center border-2 border-black";
                      parent.innerHTML = `<span class="font-serif font-bold text-2xl">${initials}</span>`;
                    }
                  }}
                />
              </div>
              <div className="flex flex-col justify-center flex-1">
                <span className="text-xl font-serif font-semibold text-black mb-1">{activity.name}</span>
                <span className="text-ink-gray font-serif mb-2">{activity.year}</span>
                <span className="text-sm text-black border border-black/40 px-3 py-1 w-fit font-serif bg-paper-beige">{activity.text}</span>
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

