
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, BookOpen, MapPin } from 'lucide-react';

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
    period: "Expected May 2026",
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
    <section id="education" className="py-16 sm:py-20 md:py-24 relative" ref={sectionRef}>
      <div className="section-container">
        <h2 ref={headingRef} className="section-title">Education</h2>
        
        <div className="space-y-12 md:space-y-16 mt-12">
          {educationItems.map((edu, index) => (
            <div 
              key={index}
              ref={el => cardRefs.current[index] = el}
              className="paper-card"
            >
              <div className="mb-6 pb-6 border-b border-ink-light-gray/30 dark:border-border">
                <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-black dark:text-foreground mb-2">{edu.institution}</h3>
                <h4 className="text-lg sm:text-xl font-serif font-medium text-ink-gray dark:text-muted-foreground italic mb-4">{edu.degree}</h4>
                
                <div className="flex flex-wrap gap-4 text-ink-gray dark:text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-ink-light-gray dark:text-muted-foreground" />
                    <span className="font-serif text-ink-gray dark:text-muted-foreground">{edu.period}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-ink-light-gray dark:text-muted-foreground" />
                    <span className="font-serif text-ink-gray dark:text-muted-foreground">{edu.location}</span>
                  </div>
                  <div className="font-serif text-ink-gray dark:text-muted-foreground">GPA: {edu.gpa}</div>
                </div>
              </div>
              
              <div>
                <div className="text-body font-medium mb-3 text-black dark:text-foreground">Coursework:</div>
                <div className="flex flex-wrap gap-2">
                  {edu.courses.map((course, i) => (
                    <span 
                      key={i}
                      className="inline-block px-3 py-1 border border-ink-light-gray/40 dark:border-border text-ink-gray dark:text-muted-foreground text-sm font-serif"
                    >
                      {course}
                    </span>
                  ))}
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
