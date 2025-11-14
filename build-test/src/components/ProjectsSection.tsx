
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
    title: "Portfolio Website",
    period: "Sep 2025",
    description: "Personal portfolio website showcasing my projects and skills. Built with React, TypeScript, and modern web technologies. Features responsive design, smooth animations, and comprehensive project showcase with GitHub integration.",
    technologies: ["TypeScript", "React", "Vite", "Tailwind CSS", "GSAP"],
    github: "https://github.com/suhasramanand/suhasramanand.github.io",
    link: "https://suhasramanand.github.io"
  },
  {
    title: "Scalable Infrastructure Deployment",
    period: "Sep 2025",
    description: "Scalable Infrastructure Deployment with Terraform, Kubernetes (AWS EKS), and CI/CD pipelines for microservices architecture. Automated cloud infrastructure provisioning and container orchestration for high-availability systems.",
    technologies: ["HCL", "Terraform", "Kubernetes", "AWS EKS", "Docker", "CI/CD"],
    github: "https://github.com/suhasramanand/scalable-infrastructure-deployment"
  },
  {
    title: "CodeReviewer.AI",
    period: "Sep 2025",
    description: "AI-powered pull request review bot that leverages artificial intelligence to analyze and provide suggestions on code changes. Uses Groq's language model to review and suggest improvements, focusing on security and code quality.",
    technologies: ["Python", "AI", "GitHub API", "Security", "Automation"],
    github: "https://github.com/suhasramanand/CodeReviewer.AI"
  },
  {
    title: "JobHunt - Automated Job Aggregator",
    period: "Sep 2025",
    description: "Automated job aggregator for entry-level software engineering positions with visa sponsorship. Built intelligent web scraping and filtering system to identify relevant opportunities for international candidates.",
    technologies: ["Python", "Web Scraping", "Data Processing", "Automation"],
    github: "https://github.com/suhasramanand/jobhunt"
  },
  {
    title: "Distributed Query Engine Reliability",
    period: "Sep 2025",
    description: "A distributed query engine reliability testing framework with fault injection, monitoring, and recovery mechanisms. Designed comprehensive testing suite to ensure system resilience under various failure scenarios.",
    technologies: ["Python", "Distributed Systems", "Testing", "Monitoring"],
    github: "https://github.com/suhasramanand/distributed-query-engine-reliability"
  },
  {
    title: "High-Performance C++ Cache System",
    period: "Sep 2025",
    description: "High-Performance C++ Caching System with LRU eviction, custom memory allocator, and multi-threaded TCP server. Implemented efficient memory management and concurrent access patterns for optimal performance.",
    technologies: ["C++", "Memory Management", "Multi-threading", "TCP Server"],
    github: "https://github.com/suhasramanand/high-performance-cache"
  },
  {
    title: "EvalStack - AI Pipeline Platform",
    period: "Sep 2025",
    description: "Production-grade platform for evaluating, observing, and optimizing Generative AI pipelines (LLMs, RAG, Agents). Built comprehensive evaluation framework with monitoring capabilities for AI model performance.",
    technologies: ["Python", "AI/ML", "LLMs", "RAG", "Monitoring"],
    github: "https://github.com/suhasramanand/evalstack"
  },
  {
    title: "Streaming Analytics Platform",
    period: "Sep 2025",
    description: "Complete end-to-end real-time streaming analytics platform with Kafka, Spark, Trino, and Iceberg on Kubernetes. Designed scalable data processing pipeline for real-time analytics and data lakehouse architecture.",
    technologies: ["Python", "Kafka", "Spark", "Trino", "Kubernetes", "Iceberg"],
    github: "https://github.com/suhasramanand/streaming-analytics-platform"
  },
  {
    title: "React Metrics Operations",
    period: "Aug 2025",
    description: "React-based metrics operations dashboard for monitoring and analyzing application performance. Built comprehensive observability tools with real-time data visualization and alerting capabilities.",
    technologies: ["TypeScript", "React", "Metrics", "Observability"],
    github: "https://github.com/suhasramanand/react-metrics-ops"
  },
  {
    title: "Terraform Infrastructure Collection",
    period: "Jan 2025",
    description: "Collection of Terraform configurations for learning and demonstrating infrastructure provisioning. Contains practical examples for AWS, Kubernetes, and cloud infrastructure automation.",
    technologies: ["HCL", "Terraform", "AWS", "Kubernetes", "DevOps"],
    github: "https://github.com/suhasramanand/terraform"
  },
  {
    title: "CKD Staging & Progression Prediction",
    period: "Jan 2025",
    description: "Machine learning project focused on predicting chronic kidney disease (CKD) stages and performing survival analysis using clinical biomarkers. Utilized Kaplan-Meier estimator for patient survival analysis.",
    technologies: ["Python", "Machine Learning", "Scikit-learn", "Survival Analysis"],
    github: "https://github.com/suhasramanand/CKD_Staging_and_Progression_Prediction"
  },
  {
    title: "Endangered Bird Species Classification",
    period: "Jan 2025",
    description: "Computer vision project for classifying endangered bird species using deep learning techniques. Implemented image preprocessing, feature extraction, and classification models for wildlife conservation.",
    technologies: ["Python", "Deep Learning", "Computer Vision", "Image Processing"],
    github: "https://github.com/suhasramanand/Endangered-Bird-species-classification"
  },
  {
    title: "Residential Management System",
    period: "Nov 2024",
    description: "Java-based system for managing tenants, leases, and rent payments with role-based access control. Implemented RBAC for landlords, tenants, and administrators with JavaFX/Swing UI for rent tracking and invoice generation.",
    technologies: ["Java", "MySQL", "MVC", "Swing", "OOP"],
    github: "https://github.com/suhasreddy-northeastern/Final_Project_Group70_AED_INFO5100"
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
