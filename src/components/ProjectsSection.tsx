
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ExternalLink, Search, X } from 'lucide-react';

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

const ProjectsSection: React.FC = React.memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Get all unique tags from projects
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach(project => {
      project.technologies.forEach(tech => tags.add(tech));
    });
    return Array.from(tags).sort();
  }, []);

  // Show only first 12 tags initially, rest when "Show More Tags" is clicked
  const displayedTags = useMemo(() => {
    return showAllTags ? allTags : allTags.slice(0, 12);
  }, [showAllTags, allTags]);

  // Filter projects based on search and tags
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // Search filter - check title, description, and technologies
      const matchesSearch = searchQuery === '' || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));

      // Tag filter - if tags are selected, project must have at least one selected tag
      const matchesTags = selectedTags.length === 0 ||
        selectedTags.some(tag => project.technologies.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [searchQuery, selectedTags]);

  // Projects to display (top 3 or all based on showAll state)
  const displayedProjects = useMemo(() => {
    return showAll ? filteredProjects : filteredProjects.slice(0, 3);
  }, [showAll, filteredProjects]);

  // Reset showAll when filters change
  useEffect(() => {
    setShowAll(false);
  }, [searchQuery, selectedTags]);

  // Removed scroll-triggered animations for instant display
  useEffect(() => {
    // Set all elements to be visible immediately
    if (headingRef.current) {
      gsap.set(headingRef.current, { opacity: 1, y: 0 });
    }
    projectRefs.current.forEach((project) => {
      if (project) {
        gsap.set(project, { opacity: 1, y: 0 });
      }
    });
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

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
  };

  return (
    <section id="projects" className="py-16 sm:py-20 md:py-24 relative" ref={sectionRef}>
      <div className="section-container">
        <h2 ref={headingRef} className="section-title">Projects</h2>
        
        {/* Search and Filter Section */}
        <div className="mt-8 mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ink-light-gray" size={18} />
            <input
              type="text"
              placeholder="Search projects by title, description, or technology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 border border-ink-light-gray/40 bg-paper-cream text-black font-serif focus:outline-none focus:border-black transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-ink-light-gray hover:text-black transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Tag Filters */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-serif text-ink-gray">Filter by technology:</p>
              {(searchQuery || selectedTags.length > 0) && (
                <button
                  onClick={clearFilters}
                  className="text-sm font-serif text-ink-gray hover:text-black underline transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {displayedTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 text-sm font-serif border transition-all ${
                      isSelected
                        ? 'bg-black text-paper-cream border-black'
                        : 'bg-paper-cream text-ink-gray border-ink-light-gray/40 hover:border-black hover:text-black'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
            {allTags.length > 12 && (
              <button
                onClick={() => setShowAllTags(!showAllTags)}
                className="text-sm font-serif text-ink-gray hover:text-black underline transition-colors"
              >
                {showAllTags ? 'Show Less Tags' : `Show More Tags (${allTags.length - 12} more)`}
              </button>
            )}
          </div>

          {/* Results count */}
          {filteredProjects.length !== projects.length && (
            <p className="text-sm font-serif text-ink-gray">
              Showing {filteredProjects.length} of {projects.length} projects
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-12 max-w-6xl mx-auto">
          {displayedProjects.map((project) => {
            const originalIndex = projects.findIndex(p => p.title === project.title);
            return (
            <div 
              key={project.title}
              ref={el => projectRefs.current[originalIndex] = el}
              className="paper-card h-full flex flex-col"
              onMouseEnter={() => setHoveredProject(originalIndex)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-serif font-semibold text-black mb-4">{project.title}</h3>
                
                <p className="text-body mb-6">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, i) => (
                    <span 
                      key={i}
                      className="inline-block px-3 py-1 border border-ink-light-gray/40 text-ink-gray text-sm font-serif"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 mt-auto pt-4 border-t border-ink-light-gray/30">
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-black hover:text-ink-gray transition-colors text-sm font-serif"
                  >
                    <Github size={16} />
                    <span>View on GitHub</span>
                  </a>
                )}
                
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-black hover:text-ink-gray transition-colors text-sm font-serif"
                  >
                    <ExternalLink size={16} />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
            );
          })}
        </div>

        {/* Show More / Show Less Button */}
        {filteredProjects.length > 3 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="minimal-button-outline px-8 py-3"
            >
              {showAll ? 'Show Less' : `Show More (${filteredProjects.length - 3} more)`}
            </button>
          </div>
        )}

        {/* No results message */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-body text-ink-gray font-serif">
              No projects found matching your search criteria.
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 minimal-button-outline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
});

ProjectsSection.displayName = 'ProjectsSection';

export default ProjectsSection;
