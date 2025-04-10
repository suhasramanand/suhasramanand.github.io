
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Github, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProjectItem {
  title: string;
  period: string;
  description: string;
  technologies: string[];
  github?: string;
  link?: string;
}

const projects: ProjectItem[] = [
  {
    title: "CodeReviewer.AI",
    period: "Jan 2025",
    description: "Engineered an AI-powered pull request review bot using Llama-3.3-70b model, automating feedback on code quality and optimizations. Integrated GitHub API for dynamic analysis of code diffs and automated workflow execution via GitHub Actions, streamlining review efficiency. Designed security-focused prompts to detect vulnerabilities.",
    technologies: ["Llama-Index", "Groq", "Github Actions", "REST API"],
    github: "https://github.com"
  },
  {
    title: "Scalable Infrastructure Deployment",
    period: "Dec 2024",
    description: "Automated cloud infrastructure provisioning with Terraform, streamlining resource management. Deployed microservices on Kubernetes (AWS EKS) to enhance system scalability and reliability. Implemented CI/CD pipelines using GitHub Actions, improving DevOps efficiency and reducing deployment errors.",
    technologies: ["HCL", "YAML", "Terraform", "GCP"],
    github: "https://github.com"
  },
  {
    title: "Residential Management System",
    period: "Nov 2024",
    description: "Developed a Java-based system for managing tenants, leases, and rent payments with role-based access control. Implemented role-based access control (RBAC) for landlords, tenants, and administrators to enhance security. Designed an intuitive JavaFX/Swing UI, automating rent tracking and invoice generation.",
    technologies: ["Java", "MySQL", "MVC", "Swing", "OOP"],
    github: "https://github.com"
  }
];

const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

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
      
      // Animate project cards with staggered effect
      projectRefs.current.forEach((project, index) => {
        gsap.from(project, {
          y: 50,
          opacity: 0,
          duration: 0.7,
          delay: 0.1 * index,
          scrollTrigger: {
            trigger: project,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        });
      });
    });
    
    return () => ctx.revert(); // Clean up animations
  }, []);

  useEffect(() => {
    if (hoveredProject !== null && projectRefs.current[hoveredProject]) {
      gsap.to(projectRefs.current[hoveredProject], {
        scale: 1.02,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        duration: 0.3,
        ease: "power1.out"
      });
    }
    
    projectRefs.current.forEach((project, index) => {
      if (index !== hoveredProject && project) {
        gsap.to(project, {
          scale: 1,
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          duration: 0.3,
          ease: "power1.out"
        });
      }
    });
  }, [hoveredProject]);

  return (
    <section id="projects" className="py-20 bg-gray-50 relative overflow-hidden" ref={sectionRef}>
      <div className="section-container">
        <h2 ref={headingRef} className="section-title text-center">Projects</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {projects.map((project, index) => (
            <div 
              key={index}
              ref={el => projectRefs.current[index] = el}
              className="apple-card h-full flex flex-col justify-between hover:shadow-xl transition-all duration-300"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-groww-dark-gray">{project.title}</h3>
                  <div className="flex items-center text-gray-500">
                    <Calendar size={14} className="mr-1" />
                    <span className="text-sm">{project.period}</span>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, i) => (
                    <span 
                      key={i}
                      className="inline-block px-3 py-1 rounded-full bg-groww-purple/10 text-groww-purple-dark text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-4 mt-auto">
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-groww-purple hover:text-groww-purple-dark transition-colors"
                  >
                    <Github size={16} />
                    <span>Code</span>
                  </a>
                )}
                
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-groww-purple hover:text-groww-purple-dark transition-colors"
                  >
                    <ExternalLink size={16} />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
