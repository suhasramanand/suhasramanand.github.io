
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Server, Database, Cloud, PenTool, GitBranch, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SkillCategory {
  icon: React.ReactNode;
  title: string;
  skills: { name: string; level: number }[];
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
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleSkills, setVisibleSkills] = useState<boolean[]>(
    Array(skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)).fill(false)
  );

  useEffect(() => {
    // Set all elements to be visible immediately
    if (headingRef.current) {
      gsap.set(headingRef.current, { opacity: 1, y: 0 });
    }
    categoryRefs.current.forEach((category) => {
      if (category) {
        gsap.set(category, { opacity: 1, y: 0 });
      }
    });
    
    // Show all skill bars immediately
    const totalSkills = skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0);
    setVisibleSkills(Array(totalSkills).fill(true));
  }, []);

  // Reset progress counter for mapping
  let progressCounter = 0;

  return (
    <section id="skills" className="py-16 sm:py-20 md:py-24 relative" ref={sectionRef}>
      <div className="section-container">
        <h2 ref={headingRef} className="section-title">Skills & Expertise</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mt-12">
          {skillCategories.map((category, catIndex) => {
            // Store current progressCounter value before incrementing it
            const startIndex = progressCounter;
            
            // Calculate skill indices for this category
            const skillIndices = category.skills.map((_, i) => {
              const index = progressCounter;
              progressCounter++;
              return index;
            });
            
            return (
              <div 
                key={catIndex}
                ref={el => categoryRefs.current[catIndex] = el}
                className="paper-card min-h-[300px]"
              >
                <div className="mb-8 pb-5 border-b border-ink-light-gray/30 dark:border-border">
                  <div className="flex items-center gap-3 mb-2">
                    {category.icon}
                    <h3 className="text-xl sm:text-2xl font-serif font-semibold text-black dark:text-foreground">{category.title}</h3>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => {
                    const globalIndex = startIndex + skillIndex;
                    
                    return (
                      <div key={skillIndex}>
                        <div className="flex justify-between items-center mb-3 gap-4">
                          <span className="text-base sm:text-lg font-medium font-serif text-black dark:text-foreground flex-1">{skill.name}</span>
                          <span className="text-sm sm:text-base text-ink-gray dark:text-muted-foreground font-serif whitespace-nowrap">{skill.level}%</span>
                        </div>
                        
                        <div className="h-1.5 bg-ink-light-gray/20 dark:bg-muted/30 overflow-hidden rounded-full">
                          <div 
                            ref={el => progressRefs.current[globalIndex] = el}
                            className="h-full bg-black dark:bg-foreground transition-all duration-1000 rounded-full"
                            style={{ 
                              width: visibleSkills[globalIndex] ? `${skill.level}%` : '0%'
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

SkillsSection.displayName = 'SkillsSection';

export default SkillsSection;
