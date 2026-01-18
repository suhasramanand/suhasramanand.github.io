
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin, GraduationCap, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

gsap.registerPlugin(ScrollTrigger);

interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  location: string;
  gpa: string;
  courses: string[];
}

const educationItems: EducationItem[] = [
  {
    institution: "Northeastern University",
    degree: "Master of Science, Computer Software Engineering",
    period: "Apr 2026",
    location: "Boston, MA",
    gpa: "3.8",
    courses: [
      "Application Engineering & Development",
      "Data Science Engineering Methods & Tools",
      "Program Structure & Algorithms",
      "Web Design and User Experience Engineering",
      "Network Structures & Cloud Computing",
      "Prompt Engineering & AI"
    ]
  },
  {
    institution: "REVA University",
    degree: "Bachelor of Technology, Computer Science & Engineering",
    period: "Aug 2023",
    location: "Bangalore, India",
    gpa: "3.6",
    courses: [
      "Object Oriented Programming",
      "Probability and Statistics",
      "Data Structures",
      "Java",
      "Digital Logic Design",
      "Database Management System",
      "Computer Organization and Architecture",
      "Embedded System Design",
      "Computer Networks",
      "Python for Data Analysis",
      "Cloud Computing and Big Data",
      "Machine Learning for Data Analytics",
      "Artificial Intelligence",
      "Mobile Application Development",
      "Cryptography and Network Security",
      "Augmented and Virtual Reality",
      "Data Science using R"
    ]
  }
];

const EducationSection: React.FC = React.memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(educationItems.length);

  // Animation handled by AnimatedSection wrapper

  // Sync carousel state
  useEffect(() => {
    if (!api) {
      return;
    }

    const updateCarouselState = () => {
      const snapList = api.scrollSnapList();
      setCount(snapList.length);
      setCurrent(api.selectedScrollSnap() + 1);
    };

    // Initial state
    updateCarouselState();

    // Update on select
    api.on("select", updateCarouselState);
    api.on("reInit", updateCarouselState);

    // Cleanup
    return () => {
      api.off("select", updateCarouselState);
      api.off("reInit", updateCarouselState);
    };
  }, [api]);

  // Helper function to render education card
  const renderEducationCard = (edu: EducationItem, index: number) => (
    <div 
      ref={el => cardRefs.current[index] = el}
      className="paper-card group hover:shadow-lg transition-all duration-300 relative overflow-hidden h-full flex flex-col"
    >
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
      <div className="relative z-10 h-full flex flex-col">
        {/* Header with institution and GPA metric - More compact on mobile */}
        <div className="mb-3 md:mb-4 pb-3 md:pb-4 border-b border-ink-light-gray/30 dark:border-border">
          <div className="flex items-start justify-between gap-2 md:gap-4 mb-1.5 md:mb-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 md:gap-2 mb-0.5 md:mb-1">
                <GraduationCap size={14} className="md:w-[18px] md:h-[18px] text-black dark:text-foreground opacity-60 shrink-0" />
                <h3 className="text-base sm:text-lg md:text-xl font-serif font-semibold text-black dark:text-foreground truncate">
                  {edu.institution}
                </h3>
              </div>
              <h4 className="text-xs sm:text-sm md:text-base font-serif font-medium text-ink-gray dark:text-muted-foreground italic line-clamp-2">
                {edu.degree}
              </h4>
            </div>
            {/* GPA Metric - prominent display */}
            <div className="flex flex-col items-end shrink-0">
              <div className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-black dark:text-foreground leading-none">
                {edu.gpa}
              </div>
              <div className="text-[10px] md:text-xs font-serif text-ink-gray dark:text-muted-foreground uppercase tracking-wider mt-0.5">
                GPA
              </div>
            </div>
          </div>
          
          {/* Period and Location - More compact on mobile */}
          <div className="flex flex-wrap gap-2 md:gap-3 text-[10px] md:text-xs lg:text-sm text-ink-gray dark:text-muted-foreground">
            <div className="flex items-center gap-1 md:gap-1.5">
              <Calendar size={10} className="md:w-3 md:h-3 text-ink-light-gray dark:text-muted-foreground shrink-0" />
              <span className="font-serif">{edu.period}</span>
            </div>
            <div className="flex items-center gap-1 md:gap-1.5">
              <MapPin size={10} className="md:w-3 md:h-3 text-ink-light-gray dark:text-muted-foreground shrink-0" />
              <span className="font-serif">{edu.location}</span>
            </div>
          </div>
        </div>
        
        {/* Coursework Section - More compact on mobile */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
            <Award size={12} className="md:w-[14px] md:h-[14px] text-black dark:text-foreground opacity-60 shrink-0" />
            <div className="text-[10px] md:text-xs lg:text-sm font-serif font-medium text-black dark:text-foreground uppercase tracking-wide">
              Coursework
            </div>
            <div className="flex-1 h-px bg-ink-light-gray/30 dark:bg-border"></div>
            <div className="text-[10px] md:text-xs font-serif text-ink-gray dark:text-muted-foreground shrink-0">
              {edu.courses.length}
            </div>
          </div>
          <div className="flex flex-wrap gap-1 md:gap-1.5 max-h-24 md:max-h-32 overflow-y-auto">
            {edu.courses.map((course, i) => (
              <span 
                key={i}
                className="inline-block px-1.5 md:px-2 py-0.5 border border-ink-light-gray/40 dark:border-border text-ink-gray dark:text-muted-foreground text-[10px] md:text-xs font-serif hover:border-black dark:hover:border-foreground hover:text-black dark:hover:text-foreground transition-colors"
              >
                {course}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="education" className="py-8 sm:py-12 md:py-16 relative" ref={sectionRef}>
      <div className="section-container">
        <div className="mb-12 sm:mb-16">
          <div ref={headingRef} className="uppercase text-xs sm:text-sm font-sans tracking-wider mb-4 sm:mb-6 text-ink-gray dark:text-muted-foreground">
            Education
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-tight">
            <span className="text-black dark:text-foreground">Learning never </span>
            <span className="italic text-ink-gray dark:text-muted-foreground">stops</span>
          </h2>
        </div>
        
        {/* Mobile Carousel - hidden on desktop */}
        <div className="md:hidden relative mt-12">
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
              duration: 10,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2">
              {educationItems.map((edu, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 basis-full"
                >
                  {renderEducationCard(edu, index)}
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Carousel Navigation */}
          {educationItems.length > 1 && (
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
                {current} / {count || educationItems.length}
              </span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (api) {
                    const currentIndex = api.selectedScrollSnap();
                    if (currentIndex < count - 1) {
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

        {/* Desktop Grid - hidden on mobile */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mt-12">
          {educationItems.map((edu, index) => (
            <React.Fragment key={index}>
              {renderEducationCard(edu, index)}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
});

EducationSection.displayName = 'EducationSection';

export default EducationSection;
