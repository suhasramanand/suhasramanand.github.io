
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin, GraduationCap, Award } from 'lucide-react';

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

  // Animation handled by AnimatedSection wrapper

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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mt-12">
          {educationItems.map((edu, index) => (
            <div 
              key={index}
              ref={el => cardRefs.current[index] = el}
              className="paper-card group hover:shadow-lg transition-all duration-300 relative overflow-hidden"
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
              {/* Header with institution and GPA metric */}
              <div className="mb-4 pb-4 border-b border-ink-light-gray/30 dark:border-border">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <GraduationCap size={18} className="text-black dark:text-foreground opacity-60 shrink-0" />
                      <h3 className="text-lg sm:text-xl font-serif font-semibold text-black dark:text-foreground truncate">
                        {edu.institution}
                      </h3>
                    </div>
                    <h4 className="text-sm sm:text-base font-serif font-medium text-ink-gray dark:text-muted-foreground italic line-clamp-2">
                      {edu.degree}
                    </h4>
                  </div>
                  {/* GPA Metric - prominent display */}
                  <div className="flex flex-col items-end shrink-0">
                    <div className="text-2xl sm:text-3xl font-serif font-bold text-black dark:text-foreground leading-none">
                      {edu.gpa}
                    </div>
                    <div className="text-xs font-serif text-ink-gray dark:text-muted-foreground uppercase tracking-wider mt-0.5">
                      GPA
                    </div>
                  </div>
                </div>
                
                {/* Period and Location */}
                <div className="flex flex-wrap gap-3 text-xs sm:text-sm text-ink-gray dark:text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-ink-light-gray dark:text-muted-foreground shrink-0" />
                    <span className="font-serif">{edu.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={12} className="text-ink-light-gray dark:text-muted-foreground shrink-0" />
                    <span className="font-serif">{edu.location}</span>
                  </div>
                </div>
              </div>
              
              {/* Coursework Section - Compact */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <Award size={14} className="text-black dark:text-foreground opacity-60 shrink-0" />
                  <div className="text-xs sm:text-sm font-serif font-medium text-black dark:text-foreground uppercase tracking-wide">
                    Coursework
                  </div>
                  <div className="flex-1 h-px bg-ink-light-gray/30 dark:bg-border"></div>
                  <div className="text-xs font-serif text-ink-gray dark:text-muted-foreground shrink-0">
                    {edu.courses.length}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
                  {edu.courses.map((course, i) => (
                    <span 
                      key={i}
                      className="inline-block px-2 py-0.5 border border-ink-light-gray/40 dark:border-border text-ink-gray dark:text-muted-foreground text-xs font-serif hover:border-black dark:hover:border-foreground hover:text-black dark:hover:text-foreground transition-colors"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

EducationSection.displayName = 'EducationSection';

export default EducationSection;
