
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Server, Database, Cloud, PenTool, GitBranch, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
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
  {
    icon: <Sparkles size={24} />,
    title: "AI & Machine Learning",
    skills: [
      { name: "LLMs", level: 90 },
      { name: "Prompt Engineering", level: 90 },
      { name: "RAG (Retrieval Augmented Generation)", level: 85 },
      { name: "Agentic AI", level: 85 },
      { name: "Reinforcement Learning (RL)", level: 75 },
      { name: "Claude (Anthropic)", level: 90 },
      { name: "Cursor AI", level: 95 },
      { name: "Code Rabbit", level: 90 },
      { name: "Groq AI", level: 85 },
      { name: "n8n (Workflow Automation)", level: 80 },
      { name: "AI Code Generation", level: 90 },
      { name: "AI Evaluation & Monitoring", level: 85 },
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
          const currentIndex = api.selectedScrollSnap();
          const totalSlides = api.scrollSnapList().length;
          
          if (currentIndex < totalSlides - 1) {
            // Scroll to next slide by index
            api.scrollTo(currentIndex + 1);
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

  // Wheel scrolling disabled - use arrows or drag only

  useEffect(() => {
    if (headingRef.current) {
      gsap.set(headingRef.current, { opacity: 1, y: 0 });
    }
  }, []);

  return (
    <section id="skills" className="py-8 sm:py-12 md:py-16 relative" ref={sectionRef}>
      <div className="section-container max-w-7xl">
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
                dragFree: false,
                containScroll: "trimSnaps",
                watchDrag: true,
                watchResize: true,
                skipSnaps: false,
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
                  className="pl-2 md:pl-6 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/4 2xl:basis-1/5"
                >
                  <div className="paper-card h-full flex flex-col p-4 md:p-6">
                    <div className="mb-4 pb-3 border-b border-ink-light-gray/30 dark:border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="text-black dark:text-foreground">
                          {category.icon}
                        </div>
                        <h3 className="text-lg sm:text-xl font-serif font-semibold text-black dark:text-foreground">{category.title}</h3>
                      </div>
                    </div>
                    
                    <div className="space-y-3 flex-1">
                      {category.skills.map((skill, skillIndex) => (
                        <div key={skillIndex}>
                          <div className="flex justify-between items-center mb-1.5 gap-2">
                            <span className="text-sm sm:text-base font-medium font-serif text-black dark:text-foreground flex-1 truncate">{skill.name}</span>
                            <span className="text-xs sm:text-sm text-ink-gray dark:text-muted-foreground font-serif whitespace-nowrap">{skill.level}%</span>
                          </div>
                          
                          <div className="h-1.5 bg-ink-light-gray/20 dark:bg-muted/30 overflow-hidden rounded-full">
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
            
          </Carousel>
          
          {/* Carousel Indicators with Arrow Buttons */}
          {skillCategories.length > 1 && count > 0 && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (api) {
                    const currentIndex = api.selectedScrollSnap();
                    if (currentIndex > 0) {
                      api.scrollTo(currentIndex - 1);
                    }
                  }
                }}
                className="h-10 w-10 rounded-full bg-white/95 dark:bg-card/95 backdrop-blur-sm border-2 border-black/20 dark:border-border hover:bg-white dark:hover:bg-card hover:border-black/40 dark:hover:border-foreground/60 shadow-lg hover:shadow-xl z-20 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-110 active:scale-95"
                disabled={current === 1}
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} className="text-black dark:text-foreground font-bold" strokeWidth={2.5} />
              </button>
              <span className="text-sm font-serif text-ink-gray dark:text-muted-foreground min-w-[3rem] text-center">
                {current} / {count}
              </span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (api) {
                    const currentIndex = api.selectedScrollSnap();
                    const totalSlides = api.scrollSnapList().length;
                    if (currentIndex < totalSlides - 1) {
                      api.scrollTo(currentIndex + 1);
                    }
                  }
                }}
                className="h-10 w-10 rounded-full bg-white/95 dark:bg-card/95 backdrop-blur-sm border-2 border-black/20 dark:border-border hover:bg-white dark:hover:bg-card hover:border-black/40 dark:hover:border-foreground/60 shadow-lg hover:shadow-xl z-20 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-110 active:scale-95"
                disabled={current === count}
                aria-label="Next slide"
              >
                <ChevronRight size={20} className="text-black dark:text-foreground font-bold" strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

SkillsSection.displayName = 'SkillsSection';

export default SkillsSection;
