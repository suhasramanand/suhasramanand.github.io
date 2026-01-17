
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ExternalLink, Search, X } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

gsap.registerPlugin(ScrollTrigger);

interface ProjectItem {
  title: string;
  period: string;
  description: string;
  technologies: string[];
  github?: string;
  link?: string;
  image?: string;
}

const projects: ProjectItem[] = [
  {
    title: "InvoiceFlow - Invoice Management Platform",
    period: "Jan 2026",
    description: "A modern invoice management platform for small businesses. Built a full-stack application with React, TypeScript, Node.js, and PostgreSQL. Features include multi-step invoice builder, client management, dashboard analytics, PDF generation, and WCAG 2.1 AA accessibility compliance. Implemented test-driven development with comprehensive test coverage.",
    technologies: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Material-UI", "JWT", "Jest", "Vite"],
    github: "https://github.com/suhasramanand/invoiceflow",
    link: "https://invoiceflow-isqqi5fg7-suhasramanands-projects.vercel.app",
    image: "/images/projects/invoiceflow.png"
  },
  {
    title: "HomeFit - AI-Powered Apartment Finder",
    period: "Jan 2026",
    description: "Full-stack apartment finder platform with AI-powered matching, broker management, and role-based access control. Built with React, Node.js, MongoDB, and Groq AI for intelligent property recommendations and seamless user experience.",
    technologies: ["React", "Node.js", "MongoDB", "AI", "Groq", "Express"],
    github: "https://github.com/suhasramanand/homefit",
    link: "https://homefit-dcmcvhn71-suhasramanands-projects.vercel.app",
    image: "/images/projects/homefit.png"
  },
  {
    title: "Scalable Infrastructure Deployment",
    period: "Sep 2025",
    description: "Scalable Infrastructure Deployment with Terraform, Kubernetes (AWS EKS), and CI/CD pipelines for microservices architecture. Automated cloud infrastructure provisioning and container orchestration for high-availability systems.",
    technologies: ["HCL", "Terraform", "Kubernetes", "AWS EKS", "Docker", "CI/CD"],
    github: "https://github.com/suhasramanand/scalable-infrastructure-deployment",
    image: "/images/projects/scalable-infrastructure.png"
  },
  {
    title: "CodeReviewer.AI",
    period: "Sep 2025",
    description: "AI-powered pull request review bot that leverages artificial intelligence to analyze and provide suggestions on code changes. Uses Groq's language model to review and suggest improvements, focusing on security and code quality.",
    technologies: ["Python", "AI", "GitHub API", "Security", "Automation"],
    github: "https://github.com/suhasramanand/CodeReviewer.AI",
    image: "/images/projects/codereviewer-ai.png"
  },
  {
    title: "JobHunt - Automated Job Aggregator",
    period: "Sep 2025",
    description: "Automated job aggregator for entry-level software engineering positions with visa sponsorship. Built intelligent web scraping and filtering system to identify relevant opportunities for international candidates.",
    technologies: ["Python", "Web Scraping", "Data Processing", "Automation"],
    github: "https://github.com/suhasramanand/jobhunt",
    image: "/images/projects/jobhunt.png"
  },
  {
    title: "Distributed Query Engine Reliability",
    period: "Sep 2025",
    description: "A distributed query engine reliability testing framework with fault injection, monitoring, and recovery mechanisms. Designed comprehensive testing suite to ensure system resilience under various failure scenarios.",
    technologies: ["Python", "Distributed Systems", "Testing", "Monitoring"],
    github: "https://github.com/suhasramanand/distributed-query-engine-reliability",
    image: "/images/projects/distributed-query-engine.png"
  },
  {
    title: "High-Performance C++ Cache System",
    period: "Sep 2025",
    description: "High-Performance C++ Caching System with LRU eviction, custom memory allocator, and multi-threaded TCP server. Implemented efficient memory management and concurrent access patterns for optimal performance.",
    technologies: ["C++", "Memory Management", "Multi-threading", "TCP Server"],
    github: "https://github.com/suhasramanand/high-performance-cache",
    image: "/images/projects/high-performance-cache.png"
  },
  {
    title: "EvalStack - AI Pipeline Platform",
    period: "Sep 2025",
    description: "Production-grade platform for evaluating, observing, and optimizing Generative AI pipelines (LLMs, RAG, Agents). Built comprehensive evaluation framework with monitoring capabilities for AI model performance.",
    technologies: ["Python", "AI/ML", "LLMs", "RAG", "Monitoring"],
    github: "https://github.com/suhasramanand/evalstack",
    image: "/images/projects/evalstack.png"
  },
  {
    title: "Streaming Analytics Platform",
    period: "Sep 2025",
    description: "Complete end-to-end real-time streaming analytics platform with Kafka, Spark, Trino, and Iceberg on Kubernetes. Designed scalable data processing pipeline for real-time analytics and data lakehouse architecture.",
    technologies: ["Python", "Kafka", "Spark", "Trino", "Kubernetes", "Iceberg"],
    github: "https://github.com/suhasramanand/streaming-analytics-platform",
    image: "/images/projects/streaming-analytics.png"
  },
  {
    title: "React Metrics Operations",
    period: "Aug 2025",
    description: "React-based metrics operations dashboard for monitoring and analyzing application performance. Built comprehensive observability tools with real-time data visualization and alerting capabilities.",
    technologies: ["TypeScript", "React", "Metrics", "Observability"],
    github: "https://github.com/suhasramanand/react-metrics-ops",
    image: "/images/projects/react-metrics.png"
  },
  {
    title: "Terraform Infrastructure Collection",
    period: "Jan 2025",
    description: "Collection of Terraform configurations for learning and demonstrating infrastructure provisioning. Contains practical examples for AWS, Kubernetes, and cloud infrastructure automation.",
    technologies: ["HCL", "Terraform", "AWS", "Kubernetes", "DevOps"],
    github: "https://github.com/suhasramanand/terraform",
    image: "/images/projects/terraform-infrastructure.png"
  },
  {
    title: "CKD Staging & Progression Prediction",
    period: "Jan 2025",
    description: "Machine learning project focused on predicting chronic kidney disease (CKD) stages and performing survival analysis using clinical biomarkers. Utilized Kaplan-Meier estimator for patient survival analysis.",
    technologies: ["Python", "Machine Learning", "Scikit-learn", "Survival Analysis"],
    github: "https://github.com/suhasramanand/CKD_Staging_and_Progression_Prediction",
    image: "/images/projects/ckd-prediction.png"
  },
  {
    title: "Endangered Bird Species Classification",
    period: "Jan 2025",
    description: "Computer vision project for classifying endangered bird species using deep learning techniques. Implemented image preprocessing, feature extraction, and classification models for wildlife conservation.",
    technologies: ["Python", "Deep Learning", "Computer Vision", "Image Processing"],
    github: "https://github.com/suhasramanand/Endangered-Bird-species-classification",
    image: "/images/projects/endangered-bird-classification.png"
  },
  {
    title: "Residential Management System",
    period: "Nov 2024",
    description: "Java-based system for managing tenants, leases, and rent payments with role-based access control. Implemented RBAC for landlords, tenants, and administrators with JavaFX/Swing UI for rent tracking and invoice generation.",
    technologies: ["Java", "MySQL", "MVC", "Swing", "OOP"],
    github: "https://github.com/suhasreddy-northeastern/Final_Project_Group70_AED_INFO5100",
    image: "/images/projects/residential-management.png"
  }
];

const ProjectsSection: React.FC = React.memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [showAllTags, setShowAllTags] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const carouselContainerRef = useRef<HTMLDivElement>(null);

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
    if (!api || filteredProjects.length <= 1) {
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
          if (api.canScrollNext()) {
            api.scrollNext();
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
  }, [api, filteredProjects.length]);

  // Reset carousel to first slide when filters change
  useEffect(() => {
    if (api) {
      api.scrollTo(0);
    }
  }, [searchQuery, selectedTags, api]);

  // Add horizontal wheel support for touchpad gestures
  useEffect(() => {
    const carouselContainer = carouselContainerRef.current;
    if (!carouselContainer || !api) return;

    const handleWheel = (e: WheelEvent) => {
      // Only handle horizontal scrolling (touchpad horizontal swipe)
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        if (e.deltaX > 0) {
          api.scrollNext();
        } else {
          api.scrollPrev();
        }
      }
      // Ignore vertical scrolling to allow normal page scrolling
    };

    carouselContainer.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      carouselContainer.removeEventListener('wheel', handleWheel);
    };
  }, [api]);


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
    <section id="projects" className="py-8 sm:py-12 md:py-16 relative" ref={sectionRef}>
      <div className="section-container">
        <div className="mb-12 sm:mb-16">
          <div ref={headingRef} className="uppercase text-xs sm:text-sm font-sans tracking-wider mb-4 sm:mb-6 text-ink-gray dark:text-muted-foreground">
            Projects
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-tight">
            <span className="text-black dark:text-foreground">Innovation through </span>
            <span className="italic text-ink-gray dark:text-muted-foreground">code and creativity</span>
          </h2>
        </div>
        
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
              className="w-full pl-10 pr-10 py-3 border border-ink-light-gray/40 dark:border-border bg-paper-cream dark:bg-card text-black dark:text-foreground font-serif focus:outline-none focus:border-black dark:focus:border-foreground transition-colors"
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
                        ? 'bg-black dark:bg-foreground text-paper-cream dark:text-background border-black dark:border-foreground'
                        : 'bg-paper-cream dark:bg-card text-ink-gray dark:text-muted-foreground border-ink-light-gray/40 dark:border-border hover:border-black dark:hover:border-foreground hover:text-black dark:hover:text-foreground'
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
            <p className="text-sm font-serif text-ink-gray dark:text-muted-foreground">
              Showing {filteredProjects.length} of {projects.length} projects
            </p>
          )}
        </div>
        
        {/* Carousel Section */}
        {filteredProjects.length > 0 && (
          <div className="mt-12 relative" ref={carouselContainerRef}>
            <Carousel
              setApi={setApi}
              opts={{
                align: "start",
                loop: false,
                slidesToScroll: 1,
                dragFree: true,
                watchDrag: true,
                watchResize: true,
              }}
              className="w-full"
              style={{
                maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
              }}
            >
              <CarouselContent className="-ml-2 md:-ml-6">
                {filteredProjects.map((project) => {
                  const originalIndex = projects.findIndex(p => p.title === project.title);
                  return (
                    <CarouselItem
                      key={project.title}
                      className="pl-2 md:pl-6 basis-full sm:basis-4/5 md:basis-1/2 lg:basis-2/5 xl:basis-1/3"
                    >
                      <div
                        ref={el => projectRefs.current[originalIndex] = el}
                        className="paper-card h-full flex flex-col"
                        onMouseEnter={() => setHoveredProject(originalIndex)}
                        onMouseLeave={() => setHoveredProject(null)}
                      >
                        {project.image && (
                          <div className="mb-4 overflow-hidden border border-ink-light-gray/30 dark:border-border rounded-sm">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-40 md:h-44 object-cover transition-transform duration-300 hover:scale-105"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <div className="mb-4 flex-1 flex flex-col">
                          <h3 className="text-lg sm:text-xl font-serif font-semibold text-black dark:text-foreground mb-2">
                            {project.title}
                          </h3>
                          
                          <p className="text-sm mb-4 text-black dark:text-foreground line-clamp-3">
                            {project.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {project.technologies.slice(0, 4).map((tech, i) => (
                              <span
                                key={i}
                                className="inline-block px-2 py-0.5 border border-ink-light-gray/40 dark:border-border text-ink-gray dark:text-muted-foreground text-xs font-serif"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 4 && (
                              <span className="inline-block px-2 py-0.5 text-ink-gray dark:text-muted-foreground text-xs font-serif">
                                +{project.technologies.length - 4}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 pt-3 border-t border-ink-light-gray/30 dark:border-border">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-black dark:text-foreground hover:text-ink-gray dark:hover:text-muted-foreground transition-colors text-sm font-serif"
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
                              className="flex items-center gap-2 text-black dark:text-foreground hover:text-ink-gray dark:hover:text-muted-foreground transition-colors text-sm font-serif"
                            >
                              <ExternalLink size={16} />
                              <span>Live Demo</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              
              {filteredProjects.length > 1 && (
                <>
                  <CarouselPrevious 
                    className="left-2 md:-left-12 top-1/2 -translate-y-1/2 bg-paper-cream/90 dark:bg-card/90 backdrop-blur-sm border-ink-light-gray/40 dark:border-border hover:bg-paper-cream dark:hover:bg-card shadow-lg z-10"
                    variant="outline"
                    size="icon"
                  />
                  <CarouselNext 
                    className="right-2 md:-right-12 top-1/2 -translate-y-1/2 bg-paper-cream/90 dark:bg-card/90 backdrop-blur-sm border-ink-light-gray/40 dark:border-border hover:bg-paper-cream dark:hover:bg-card shadow-lg z-10"
                    variant="outline"
                    size="icon"
                  />
                </>
              )}
            </Carousel>
            
            {/* Carousel Indicators */}
            {filteredProjects.length > 1 && count > 0 && (
              <div className="flex justify-center items-center gap-2 mt-6">
                <span className="text-sm font-serif text-ink-gray dark:text-muted-foreground">
                  {current} / {count}
                </span>
              </div>
            )}
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
