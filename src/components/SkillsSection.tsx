
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

const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleSkills, setVisibleSkills] = useState<boolean[]>(
    Array(skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)).fill(false)
  );

  useEffect(() => {
    let progressIndex = 0;
    
    const ctx = gsap.context(() => {
      // Animate heading
      gsap.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
      
      // Animate each category
      categoryRefs.current.forEach((category, index) => {
        gsap.from(category, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: 0.1 * index,
          scrollTrigger: {
            trigger: category,
            start: "top 85%",
            toggleActions: "play none none none",
            onEnter: () => {
              // When a category enters the viewport, schedule animation for its skill bars
              const categorySkills = skillCategories[index].skills;
              categorySkills.forEach((_, skillIndex) => {
                const globalSkillIndex = progressIndex + skillIndex;
                setTimeout(() => {
                  setVisibleSkills(prev => {
                    const newState = [...prev];
                    newState[globalSkillIndex] = true;
                    return newState;
                  });
                }, skillIndex * 200); // Stagger the skill bar animations
              });
              progressIndex += categorySkills.length;
            }
          }
        });
      });
    });
    
    return () => ctx.revert(); // Clean up animations
  }, []);

  // Reset progress counter for mapping
  let progressCounter = 0;

  return (
    <section id="skills" className="py-20 relative overflow-hidden" ref={sectionRef}>
      <div className="section-container">
        <h2 ref={headingRef} className="section-title text-center">Skills & Expertise</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
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
                className="apple-card hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-groww-purple/10 text-groww-purple">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-groww-dark-gray">{category.title}</h3>
                </div>
                
                <div className="space-y-5">
                  {category.skills.map((skill, skillIndex) => {
                    const globalIndex = startIndex + skillIndex;
                    
                    return (
                      <div key={skillIndex}>
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-800 font-medium">{skill.name}</span>
                            {skill.level >= 90 && (
                              <Star size={14} className="fill-yellow-400 text-yellow-400" />
                            )}
                          </div>
                          <span className="text-sm text-gray-600">{skill.level}%</span>
                        </div>
                        
                        <div className="skill-bar">
                          <div 
                            ref={el => progressRefs.current[globalIndex] = el}
                            className="skill-progress"
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
};

export default SkillsSection;
