
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Server, Database, Cloud, PenTool, GitBranch } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

gsap.registerPlugin(ScrollTrigger);

interface SkillCategory {
  icon: React.ReactNode;
  title: string;
  skills: { name: string; level: number }[];
}

interface SkillItem {
  name: string;
  level: number;
  category: string;
  icon: React.ReactNode;
}

const skillCategories: SkillCategory[] = [
  {
    icon: <Code size={24} />,
    title: "Programming Languages",
    skills: [
      { name: "JavaScript/TypeScript", level: 95 },
      { name: "Python", level: 90 },
      { name: "Java", level: 85 },
      { name: "C++", level: 80 },
      { name: "SQL", level: 85 },
    ]
  },
  {
    icon: <PenTool size={24} />,
    title: "Frontend",
    skills: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 85 },
      { name: "Angular", level: 70 },
      { name: "Material UI", level: 80 },
      { name: "Tailwind CSS", level: 90 },
    ]
  },
  {
    icon: <Server size={24} />,
    title: "Backend",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Express", level: 90 },
      { name: "FastAPI", level: 85 },
      { name: "Django", level: 75 },
      { name: "REST APIs", level: 95 },
    ]
  },
  {
    icon: <Database size={24} />,
    title: "Databases",
    skills: [
      { name: "MongoDB", level: 85 },
      { name: "MySQL", level: 90 },
      { name: "PostgreSQL", level: 85 },
      { name: "Firebase", level: 80 },
    ]
  },
  {
    icon: <Cloud size={24} />,
    title: "DevOps & Cloud",
    skills: [
      { name: "AWS", level: 85 },
      { name: "Azure", level: 80 },
      { name: "GCP", level: 75 },
      { name: "Docker", level: 90 },
      { name: "Kubernetes", level: 85 },
      { name: "Terraform", level: 80 },
    ]
  },
  {
    icon: <GitBranch size={24} />,
    title: "Tools & Workflow",
    skills: [
      { name: "Git", level: 95 },
      { name: "CI/CD", level: 90 },
      { name: "Agile/Scrum", level: 85 },
      { name: "JIRA", level: 80 },
    ]
  },
];

const SkillsSection: React.FC = React.memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  // Flatten all skills into a single array with category info
  const allSkills: SkillItem[] = skillCategories.flatMap(category =>
    category.skills.map(skill => ({
      name: skill.name,
      level: skill.level,
      category: category.title,
      icon: category.icon,
    }))
  );

  // Sync carousel state
  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // Auto-slide functionality
  useEffect(() => {
    if (!api || skillCategories.length <= 1) {
      return;
    }

    let isPaused = false;
    let pauseTimeout: NodeJS.Timeout;
    let interval: NodeJS.Timeout;

    const pauseAutoSlide = () => {
      isPaused = true;
      clearTimeout(pauseTimeout);
      // Resume after 8 seconds of no interaction
      pauseTimeout = setTimeout(() => {
        isPaused = false;
      }, 8000);
    };

    const startAutoSlide = () => {
      interval = setInterval(() => {
        if (!isPaused && api) {
          if (api.canScrollNext()) {
            api.scrollNext();
          } else {
            // Loop back to start
            api.scrollTo(0);
          }
        }
      }, 4000); // Auto-slide every 4 seconds
    };

    // Pause on user interaction
    const carouselContainer = carouselContainerRef.current;
    if (carouselContainer) {
      carouselContainer.addEventListener('mousedown', pauseAutoSlide);
      carouselContainer.addEventListener('wheel', pauseAutoSlide);
    }

    // Also pause on navigation button clicks
    const navButtons = carouselContainer?.querySelectorAll('button[aria-label*="slide"]');
    navButtons?.forEach(btn => {
      btn.addEventListener('click', pauseAutoSlide);
    });

    startAutoSlide();

    return () => {
      clearInterval(interval);
      clearTimeout(pauseTimeout);
      if (carouselContainer) {
        carouselContainer.removeEventListener('mousedown', pauseAutoSlide);
        carouselContainer.removeEventListener('wheel', pauseAutoSlide);
        navButtons?.forEach(btn => {
          btn.removeEventListener('click', pauseAutoSlide);
        });
      }
    };
  }, [api, skillCategories.length]);

  // Add wheel scrolling support
  useEffect(() => {
    const carouselContainer = carouselContainerRef.current;
    if (!carouselContainer || !api) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 0) {
        e.preventDefault();
        if (e.deltaY > 0) {
          api.scrollNext();
        } else {
          api.scrollPrev();
        }
      }
    };

    carouselContainer.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      carouselContainer.removeEventListener('wheel', handleWheel);
    };
  }, [api]);

  useEffect(() => {
    if (headingRef.current) {
      gsap.set(headingRef.current, { opacity: 1, y: 0 });
    }
  }, []);

  return (
    <section id="skills" className="py-8 sm:py-12 md:py-16 relative" ref={sectionRef}>
      <div className="section-container">
        <div className="mb-12 sm:mb-16">
          <div ref={headingRef} className="uppercase text-xs sm:text-sm font-sans tracking-wider mb-4 sm:mb-6 text-ink-gray dark:text-muted-foreground">
            Skills & Expertise
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-tight">
            <span className="text-black dark:text-foreground">Mastering the </span>
            <span className="italic text-ink-gray dark:text-muted-foreground">craft</span>
          </h2>
        </div>
        
        {/* Skills Carousel */}
        <div className="mt-8 relative" ref={carouselContainerRef}>
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: false,
              slidesToScroll: 1,
              dragFree: true,
            }}
            className="w-full"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-6">
              {skillCategories.map((category, catIndex) => (
                <CarouselItem
                  key={catIndex}
                  className="pl-2 md:pl-6 basis-full sm:basis-4/5 md:basis-2/3 lg:basis-1/2 xl:basis-2/5"
                >
                  <div className="paper-card h-full flex flex-col p-6 md:p-8">
                    <div className="mb-6 pb-4 border-b border-ink-light-gray/30 dark:border-border">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-black dark:text-foreground">
                          {category.icon}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-serif font-semibold text-black dark:text-foreground">{category.title}</h3>
                      </div>
                    </div>
                    
                    <div className="space-y-4 flex-1">
                      {category.skills.map((skill, skillIndex) => (
                        <div key={skillIndex}>
                          <div className="flex justify-between items-center mb-2 gap-4">
                            <span className="text-base sm:text-lg font-medium font-serif text-black dark:text-foreground flex-1">{skill.name}</span>
                            <span className="text-sm sm:text-base text-ink-gray dark:text-muted-foreground font-serif whitespace-nowrap">{skill.level}%</span>
                          </div>
                          
                          <div className="h-2 bg-ink-light-gray/20 dark:bg-muted/30 overflow-hidden rounded-full">
                            <div 
                              className="h-full bg-black dark:bg-foreground transition-all duration-1000 rounded-full"
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {skillCategories.length > 1 && (
              <>
                <CarouselPrevious 
                  className="left-2 md:-left-12 top-1/2 -translate-y-1/2 bg-paper-cream/90 dark:bg-card/90 backdrop-blur-sm border-ink-light-gray/40 dark:border-border hover:bg-paper-cream dark:hover:bg-card shadow-lg z-10"
                  variant="outline"
                  size="icon"
                />
                <CarouselNext 
                  className="right-2 md:-right-12 top-1/2 -translate-y-1/2 bg-paper-cream/90 dark:bg-card/90 backdrop-blur-sm border-ink-light-gray/40 dark:border-border hover:bg-paper-cream dark:hover:bg-card shadow-lg z-10"
                  variant="outline"
                  size="icon"
                />
              </>
            )}
          </Carousel>
          
          {/* Carousel Indicators */}
          {skillCategories.length > 1 && count > 0 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <span className="text-sm font-serif text-ink-gray dark:text-muted-foreground">
                {current} / {count}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

SkillsSection.displayName = 'SkillsSection';

export default SkillsSection;
