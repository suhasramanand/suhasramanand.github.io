import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  location: string;
  logo: string;
  points: string[];
  tag?: string; // Optional tag like "Internship" or "Full-time"
}

    // CALIX EXPERIENCE WITH OFFICIAL LOGO - REBUILD FOR LOGO
    // Logo now in public directory - should display correctly
    const experiences: ExperienceItem[] = [
  {
    title: "Software Engineer, Cloud",
    company: "Calix Inc",
    period: "Jun 2025 - Aug 2025",
    location: "Remote",
    tag: "Internship",
    logo: "/images/companies/Calix.png",
    points: [
      "Automated AlloyDB database deployments using Liquibase and Bash scripts, integrated with Cloud Build triggers and Bamboo pipelines, reducing manual provisioning time by 35%",
      "Developed monitoring scripts to detect deployment inconsistencies and package drift, reducing incident frequency and improving reliability KPIs",
      "Hardened CI/CD pipelines with Bitbucket pipelines, implementing automated testing, secret management, and compliance checks",
      "Collaborated with SRE and engineering teams to troubleshoot issues, enforce least-privilege IAM policies, and ensure smooth production deployments",
    ],
  },
  {
    title: "Software Engineer",
    company: "Elanco",
    period: "Oct 2023 - Jul 2024",
    location: "Bangalore, India",
    tag: "Full-time",
    logo: "/images/companies/Elanco.png",
    points: [
      "Engineered full stack enterprise SaaS applications with the FERN stack (Firebase, Express, React, Node.js), with a microservices architecture ensuring seamless integration between front-end and back-end for optimal performance.",
      "Developed front-end features using React, improving UI responsiveness and creating a smooth user experience while building back-end services with Express and Node.js, handling API logic and server-side operations.",
      "Automated infrastructure monitoring using Ansible and Shell scripting, streamlining backend processes and reducing downtime by 15%.",
      "Implemented CI/CD pipelines using GitHub Actions and Docker, automating builds, testing, and deployments while integrating version control with Git for efficient collaboration and reliable software releases.",
    ],
  },
  {
    title: "Project Trainee",
    company: "Bosch Global Software Technologies",
    period: "Jan 2023 - May 2023",
    location: "Bangalore, India",
    tag: "Internship",
    logo: "/images/companies/Bosch.png",
    points: [
      "Developed a scalable website using React and TypeScript, incorporating activity tracking and reward systems to improve multi-device engagement by 40%.",
      "Optimized RESTful APIs with Python FastAPI, implementing asynchronous processing to accelerate response times by 30% and boost system throughput.",
      "Improved Azure SQL database performance with indexing, caching, and query optimizations, reducing data retrieval times by 25%.",
    ],
  },
];

const ExperienceSection: React.FC = React.memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const timelineItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const timelineContainerRef = useRef<HTMLDivElement>(null);

  // Animate timeline line as user scrolls
  useEffect(() => {
    if (!timelineLineRef.current || !timelineContainerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate timeline line from top to bottom as user scrolls
      gsap.to(timelineLineRef.current, {
        scaleY: 1,
        transformOrigin: "top",
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: timelineContainerRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1,
        },
      });

      // Animate timeline dots appearing
      timelineItemsRef.current.forEach((item, index) => {
        if (item) {
          const dot = item.querySelector('[data-timeline-dot]') as HTMLElement;
          if (dot) {
            gsap.fromTo(
              dot,
              {
                scale: 0,
                opacity: 0,
              },
              {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                ease: "back.out(1.7)",
                scrollTrigger: {
                  trigger: item,
                  start: "top 80%",
                  toggleActions: "play none none none",
                },
              }
            );
          }
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      className="py-8 sm:py-12 md:py-16 relative"
      ref={sectionRef}
    >
      <div className="section-container">
        <div className="mb-12 sm:mb-16">
          <div ref={headingRef} className="uppercase text-xs sm:text-sm font-sans tracking-wider mb-4 sm:mb-6 text-ink-gray dark:text-muted-foreground">
            Work Experience
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-tight">
            <span className="text-black dark:text-foreground">Building expertise through </span>
            <span className="italic text-ink-gray dark:text-muted-foreground">real-world practice</span>
          </h2>
        </div>

        <div ref={timelineContainerRef} className="relative mt-12">
          {/* Timeline line */}
          <div 
            ref={timelineLineRef}
            className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-ink-light-gray/30 dark:bg-border origin-top"
            style={{ transform: 'scaleY(0)' }}
          ></div>
          
          <div className="space-y-12 md:space-y-16">
            {experiences.map((exp, index) => (
              <div
                key={index}
                ref={(el) => (timelineItemsRef.current[index] = el)}
                className="relative"
              >
                {/* Timeline dot */}
                <div 
                  data-timeline-dot
                  className="hidden md:block absolute left-6 top-6 w-4 h-4 rounded-full bg-black dark:bg-foreground border-2 border-paper-cream dark:border-background z-10"
                  style={{ scale: 0, opacity: 0 }}
                ></div>
                
                {/* Card with left margin for timeline on desktop */}
                <div className="md:ml-16">
                  <div className="paper-card relative overflow-hidden">
                    {/* Dotted Grid Background Pattern */}
                    <div 
                      className="absolute inset-0 opacity-[0.08] dark:opacity-[0.12] pointer-events-none"
                      style={{
                        backgroundImage: `
                          radial-gradient(circle, currentColor 1px, transparent 1px)
                        `,
                        backgroundSize: '20px 20px',
                        backgroundPosition: '0 0, 0 0',
                        color: 'currentColor',
                      }}
                    />
                    <div className="relative z-10">
                <div className="mb-6 pb-6 border-b border-ink-light-gray/30 dark:border-border">
                  <div className="flex flex-wrap items-start gap-4 mb-3">
                    <img
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      className="h-8 w-auto object-contain opacity-80 dark:opacity-90"
                      loading="lazy"
                    />
                    <div>
                      <h3 className="text-xl sm:text-2xl font-serif font-semibold text-black dark:text-foreground mb-1">
                        {exp.title}
                      </h3>
                      <h4 className="text-lg sm:text-xl font-serif font-medium text-ink-gray dark:text-muted-foreground italic">
                        {exp.company}
                      </h4>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-ink-gray dark:text-muted-foreground mt-3">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-ink-light-gray dark:text-muted-foreground" />
                      <span className="font-serif text-ink-gray dark:text-muted-foreground">{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-ink-light-gray dark:text-muted-foreground" />
                      <span className="font-serif text-ink-gray dark:text-muted-foreground">{exp.location}</span>
                    </div>
                    {exp.tag && (
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-ink-gray dark:text-muted-foreground">{exp.tag}</span>
                      </div>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 text-body">
                  {exp.points.map((point, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-black dark:text-foreground mt-1.5 flex-shrink-0 font-serif">—</span>
                      <span className="font-serif text-black dark:text-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

ExperienceSection.displayName = 'ExperienceSection';

export default ExperienceSection;
