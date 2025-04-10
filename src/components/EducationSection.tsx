
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
    courses: ["Data Structures", "Database Management Systems", "Cloud Computing", "Software Development"]
  },
  {
    institution: "REVA University",
    degree: "Bachelor of Technology, Computer Science & Engineering",
    period: "Aug 2023",
    location: "Bangalore, India",
    gpa: "3.6",
    courses: ["Data Structures & Algorithms", "Object-Oriented Programming (OOP)"]
  }
];

const EducationSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
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
      
      // Animate each education card
      cardRefs.current.forEach((card, index) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: 0.2 + (index * 0.2),
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        });
      });
    });
    
    return () => ctx.revert(); // Clean up animations
  }, []);

  return (
    <section id="education" className="py-20 relative overflow-hidden" ref={sectionRef}>
      <div className="section-container">
        <h2 ref={headingRef} className="section-title text-center">Education</h2>
        
        <div className="grid md:grid-cols-2 gap-10 mt-16">
          {educationItems.map((edu, index) => (
            <div 
              key={index}
              ref={el => cardRefs.current[index] = el}
              className="apple-card hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-groww-purple/10 text-groww-purple shrink-0">
                  <BookOpen size={24} />
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-groww-dark-gray">{edu.institution}</h3>
                  <h4 className="text-lg font-medium text-groww-purple mb-2">{edu.degree}</h4>
                  
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span className="text-sm">{edu.period}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      <span className="text-sm">{edu.location}</span>
                    </div>
                    <div className="font-medium">GPA: {edu.gpa}</div>
                  </div>
                  
                  <div>
                    <div className="font-medium text-gray-700 mb-2">Coursework:</div>
                    <div className="flex flex-wrap gap-2">
                      {edu.courses.map((course, i) => (
                        <span 
                          key={i}
                          className="inline-block px-3 py-1 rounded-full bg-groww-purple/10 text-groww-purple-dark text-sm"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
