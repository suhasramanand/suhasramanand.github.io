import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, MapPin, TrendingUp, Target, CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface KPI {
  label: string;
  value: string;
  description?: string;
}

interface Responsibility {
  category: string;
  description: string;
}

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  location: string;
  logo: string;
  kpis: KPI[];
  responsibilities: Responsibility[];
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
    kpis: [
      { label: "Deployment Time Reduction", value: "35%", description: "Reduced manual provisioning time" },
      { label: "Incident Frequency", value: "Reduced", description: "Improved reliability metrics" },
      { label: "CI/CD Hardening", value: "100%", description: "Pipeline security & compliance" },
    ],
    responsibilities: [
      {
        category: "Infrastructure Automation",
        description: "Automated AlloyDB database deployments using Liquibase and Bash scripts, integrated with Cloud Build triggers and Bamboo pipelines"
      },
      {
        category: "Monitoring & Reliability",
        description: "Developed monitoring scripts to detect deployment inconsistencies and package drift, improving system reliability"
      },
      {
        category: "CI/CD Security",
        description: "Hardened CI/CD pipelines with Bitbucket pipelines, implementing automated testing, secret management, and compliance checks"
      },
      {
        category: "Cross-functional Collaboration",
        description: "Collaborated with SRE and engineering teams to troubleshoot issues, enforce least-privilege IAM policies, and ensure smooth production deployments"
      },
    ],
  },
  {
    title: "Software Engineer",
    company: "Elanco",
    period: "Oct 2023 - Jul 2024",
    location: "Bangalore, India",
    tag: "Full-time",
    logo: "/images/companies/Elanco.png",
    kpis: [
      { label: "Downtime Reduction", value: "15%", description: "Streamlined backend processes" },
      { label: "Deployment Automation", value: "100%", description: "CI/CD pipeline implementation" },
      { label: "System Architecture", value: "Microservices", description: "Scalable FERN stack applications" },
    ],
    responsibilities: [
      {
        category: "Full-Stack Development",
        description: "Engineered enterprise SaaS applications with the FERN stack (Firebase, Express, React, Node.js), using microservices architecture for optimal performance"
      },
      {
        category: "Frontend Engineering",
        description: "Developed React-based front-end features, improving UI responsiveness and creating seamless user experiences"
      },
      {
        category: "Backend Services",
        description: "Built back-end services with Express and Node.js, handling API logic and server-side operations"
      },
      {
        category: "Infrastructure Monitoring",
        description: "Automated infrastructure monitoring using Ansible and Shell scripting, streamlining backend processes"
      },
      {
        category: "DevOps & Automation",
        description: "Implemented CI/CD pipelines using GitHub Actions and Docker, automating builds, testing, and deployments"
      },
    ],
  },
  {
    title: "Project Trainee",
    company: "Bosch Global Software Technologies",
    period: "Jan 2023 - May 2023",
    location: "Bangalore, India",
    tag: "Internship",
    logo: "/images/companies/Bosch.png",
    kpis: [
      { label: "Multi-device Engagement", value: "+40%", description: "Activity tracking improvements" },
      { label: "API Response Time", value: "-30%", description: "Asynchronous processing optimization" },
      { label: "Database Performance", value: "-25%", description: "Query optimization & indexing" },
    ],
    responsibilities: [
      {
        category: "Web Application Development",
        description: "Developed a scalable website using React and TypeScript, incorporating activity tracking and reward systems"
      },
      {
        category: "API Optimization",
        description: "Optimized RESTful APIs with Python FastAPI, implementing asynchronous processing to accelerate response times and boost system throughput"
      },
      {
        category: "Database Performance",
        description: "Improved Azure SQL database performance with indexing, caching, and query optimizations, reducing data retrieval times"
      },
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
                {/* Header */}
                <div className="mb-8 pb-6 border-b border-ink-light-gray/30 dark:border-border">
                  <div className="flex flex-wrap items-start gap-4 mb-4">
                    <img
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      className="h-10 w-auto object-contain opacity-80 dark:opacity-90"
                      loading="lazy"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-serif font-semibold text-black dark:text-foreground mb-1">
                        {exp.title}
                      </h3>
                      <h4 className="text-lg sm:text-xl font-serif font-medium text-ink-gray dark:text-muted-foreground italic">
                        {exp.company}
                      </h4>
                    </div>
                    {exp.tag && (
                      <span className="px-3 py-1 text-xs font-sans tracking-wider uppercase border border-ink-light-gray/40 dark:border-border text-ink-gray dark:text-muted-foreground">
                        {exp.tag}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-ink-gray dark:text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-ink-light-gray dark:text-muted-foreground" />
                      <span className="font-serif">{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-ink-light-gray dark:text-muted-foreground" />
                      <span className="font-serif">{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* KPIs Section */}
                {exp.kpis && exp.kpis.length > 0 && (
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp size={18} className="text-black dark:text-foreground" />
                      <h5 className="text-sm font-sans uppercase tracking-wider text-black dark:text-foreground font-semibold">
                        Key Performance Indicators
                      </h5>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {exp.kpis.map((kpi, i) => (
                        <div
                          key={i}
                          className="bg-paper-cream/50 dark:bg-card/50 border border-ink-light-gray/30 dark:border-border p-4 transition-all hover:border-black/40 dark:hover:border-foreground/40"
                        >
                          <div className="flex items-start gap-2 mb-2">
                            <Target size={16} className="text-black dark:text-foreground mt-0.5 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="text-2xl font-serif font-bold text-black dark:text-foreground mb-1">
                                {kpi.value}
                              </div>
                              <div className="text-sm font-serif text-ink-gray dark:text-muted-foreground">
                                {kpi.label}
                              </div>
                              {kpi.description && (
                                <div className="text-xs text-ink-light-gray dark:text-muted-foreground mt-1 font-sans">
                                  {kpi.description}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Responsibilities Section */}
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle2 size={18} className="text-black dark:text-foreground" />
                      <h5 className="text-sm font-sans uppercase tracking-wider text-black dark:text-foreground font-semibold">
                        Key Responsibilities
                      </h5>
                    </div>
                    <div className="space-y-4">
                      {exp.responsibilities.map((resp, i) => (
                        <div
                          key={i}
                          className="border-l-2 border-black/20 dark:border-foreground/20 pl-4 py-2"
                        >
                          <div className="font-serif font-semibold text-black dark:text-foreground mb-1 text-base">
                            {resp.category}
                          </div>
                          <div className="font-serif text-ink-gray dark:text-muted-foreground text-sm leading-relaxed">
                            {resp.description}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
