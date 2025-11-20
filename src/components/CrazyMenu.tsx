import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Home,
  User,
  Briefcase,
  Code,
  GraduationCap,
  Mail,
  Sparkles,
  Award,
  BookOpen,
  GitMerge,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

type MenuItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
};

const menuItems: MenuItem[] = [
  { id: "hero", label: "Home", icon: <Home className="h-5 w-5" />, color: "from-blue-500 to-purple-500" },
  { id: "about", label: "About", icon: <User className="h-5 w-5" />, color: "from-green-500 to-blue-500" },
  {
    id: "experience",
    label: "Experience",
    icon: <Briefcase className="h-5 w-5" />,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "education",
    label: "Education",
    icon: <GraduationCap className="h-5 w-5" />,
    color: "from-orange-500 to-red-500",
  },
  { id: "projects", label: "Projects", icon: <Code className="h-5 w-5" />, color: "from-pink-500 to-purple-500" },
  { id: "activities", label: "Activities", icon: <Sparkles className="h-5 w-5" />, color: "from-yellow-500 to-orange-500" },
  { id: "opensource", label: "OSS", icon: <GitMerge className="h-5 w-5" />, color: "from-green-500 to-teal-500" },
  { id: "certifications", label: "Certifications", icon: <Award className="h-5 w-5" />, color: "from-indigo-500 to-purple-500" },
  { id: "blog", label: "Blog", icon: <BookOpen className="h-5 w-5" />, color: "from-indigo-500 to-purple-500" },
  { id: "contact", label: "Contact", icon: <Mail className="h-5 w-5" />, color: "from-cyan-500 to-blue-500" },
];

const MorphingText: React.FC<{ text: string }> = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  const animationSpeedMs = 30;

  const decryptText = (startText: string, targetText: string) => {
    setIsAnimating(true);
    
    // Clear any existing animation
    if (animationRef.current) {
      clearInterval(animationRef.current);
    }

    let currentText = startText;
    const positions: number[] = [];

    const availablePositions = [...Array(targetText.length).keys()];
    while (availablePositions.length > 0) {
      const randomIndex = Math.floor(Math.random() * availablePositions.length);
      positions.push(availablePositions[randomIndex]);
      availablePositions.splice(randomIndex, 1);
    }

    let currentStep = 0;

    animationRef.current = setInterval(() => {
      if (currentStep >= positions.length) {
        setDisplayText(targetText);
        setIsAnimating(false);
        if (animationRef.current) {
          clearInterval(animationRef.current);
        }
        return;
      }

      const position = positions[currentStep];
      const textArray = currentText.split("");
      textArray[position] = targetText[position];
      currentText = textArray.join("");

      setDisplayText(currentText);
      currentStep++;
    }, animationSpeedMs);
  };

  useEffect(() => {
    const initialRandomText = Array(text.length)
      .fill(0)
      .map(() => chars[Math.floor(Math.random() * chars.length)])
      .join("");

    setDisplayText(initialRandomText);

    const timer = setTimeout(() => {
      decryptText(initialRandomText, text);
    }, 800);

    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, [text]);

  const handleMouseEnter = () => {
    if (!isAnimating) {
      // Scramble the text first
      let currentText = displayText;
      const positions: number[] = [];

      const availablePositions = [...Array(text.length).keys()];
      while (availablePositions.length > 0) {
        const randomIndex = Math.floor(Math.random() * availablePositions.length);
        positions.push(availablePositions[randomIndex]);
        availablePositions.splice(randomIndex, 1);
      }

      const partialScramble = positions.slice(0, Math.floor(positions.length * 0.6));

      partialScramble.forEach((position) => {
        const textArray = currentText.split("");
        textArray[position] = chars[Math.floor(Math.random() * chars.length)];
        currentText = textArray.join("");
      });

      setDisplayText(currentText);
      
      // Then decrypt to reveal the name
      setTimeout(() => {
        decryptText(currentText, text);
      }, 100);
    }
  };

  return (
    <span
      className="font-serif tracking-wide font-semibold text-black dark:text-foreground"
      onMouseEnter={handleMouseEnter}
    >
      {displayText}
    </span>
  );
};

const CrazyMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const manualClickRef = useRef<boolean>(false);
  const navigate = useNavigate();

  const yourName = "SUHAS REDDY";

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    
    if (!isOpen) {
      // Opening animation - smooth slide down with fade
      if (menuRef.current) {
        menuRef.current.style.display = 'block';
        gsap.fromTo(menuRef.current, 
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
        );
      }
    } else {
      // Closing animation - smooth fade out and slide up
      if (menuRef.current) {
        gsap.to(menuRef.current, 
          { y: -10, opacity: 0, duration: 0.2, ease: "power2.in", 
            onComplete: () => {
              if (menuRef.current) {
                menuRef.current.style.display = 'none';
              }
            }
          }
        );
      }
    }
  };

  const scrollToSection = (id: string) => {
    // Handle blog navigation separately
    if (id === "blog") {
      navigate('/blog');
      setIsOpen(false);
      return;
    }

    // Check if we're on a different route (not the home page)
    const currentPath = window.location.pathname;
    if (currentPath !== '/' && currentPath !== '') {
      // Navigate to home first, then scroll after a brief delay
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          setActiveItem(id);
          manualClickRef.current = true;
          
          if (id === "hero") {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => {
              manualClickRef.current = false;
            }, 50);
          } else {
            gsap.to(window, {
              duration: 0.4,
              scrollTo: {
                y: element,
                offsetY: 50
              },
              ease: 'power2.out',
              onComplete: () => {
                setTimeout(() => {
                  manualClickRef.current = false;
                }, 50);
              }
            });
          }
        } else if (id === "hero") {
          // If hero section doesn't exist yet, just scroll to top
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
      setIsOpen(false);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      // Update active item immediately for instant feedback
      setActiveItem(id);
      manualClickRef.current = true;
      
      // Special handling for "hero" - scroll to top
      if (id === "hero") {
        gsap.to(window, {
          duration: 0.4,
          scrollTo: {
            y: 0
          },
          ease: 'power2.out',
          onComplete: () => {
            setTimeout(() => {
              manualClickRef.current = false;
            }, 50);
          }
        });
      } else {
        // Use GSAP for smooth scrolling - much faster
        gsap.to(window, {
          duration: 0.4,
          scrollTo: {
            y: element,
            offsetY: 50
          },
          ease: 'power2.out',
          onComplete: () => {
            // Allow IntersectionObserver to take over after scroll completes
            setTimeout(() => {
              manualClickRef.current = false;
            }, 50);
          }
        });
      }
      
      if (isMobile) {
        setIsOpen(false);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        isOpen &&
        isMobile
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, isMobile]);

  useEffect(() => {
    // Use IntersectionObserver for better performance and accuracy
    const observers: IntersectionObserver[] = [];
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      // Debounce scroll handler for performance
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollPosition = window.scrollY + 150; // Offset for header

        // Check sections in reverse order to get the topmost visible one
        for (let i = menuItems.length - 1; i >= 0; i--) {
          const item = menuItems[i];
          const element = document.getElementById(item.id);
          if (element) {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + window.scrollY;

            if (scrollPosition >= elementTop - 100) {
              setActiveItem(item.id);
              break;
            }
          }
        }
      }, 50); // Debounce to 50ms for smooth updates
    };

    // Use IntersectionObserver for more efficient section detection
    menuItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && entry.intersectionRatio > 0.3 && !manualClickRef.current) {
                // Only update if section is significantly visible and not during manual navigation
                setActiveItem(item.id);
              }
            });
          },
          {
            root: null,
            rootMargin: '-100px 0px -50% 0px', // Trigger when section is in upper portion of viewport
            threshold: [0, 0.3, 0.5, 1]
          }
        );

        observer.observe(element);
        observers.push(observer);
      }
    });

    // Fallback scroll listener for edge cases
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(scrollTimeout);
      window.removeEventListener("scroll", handleScroll);
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  // Initial animation for nav
  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 bg-paper-cream/95 dark:bg-background/95 backdrop-blur-sm border-b border-ink-light-gray/30 dark:border-border"
      >
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-16">
                  <div
                    className="flex items-center cursor-pointer group flex-shrink-0"
                    onClick={() => scrollToSection("hero")}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        scrollToSection("hero");
                      }
                    }}
                    aria-label="Go to home"
                  >
                    <div className="flex items-center text-lg font-serif">
                      <MorphingText text={yourName} />
                    </div>
                  </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex md:items-center md:ml-12 lg:ml-16">
              <div className="flex items-center space-x-1">
                {menuItems.map((item, index) => (
                        <button
                          key={item.id}
                          onClick={() => scrollToSection(item.id)}
                          onMouseEnter={() => setHoveredItem(item.id)}
                          onMouseLeave={() => setHoveredItem(null)}
                          className={`relative px-4 py-2 text-sm font-serif transition-all duration-200 flex items-center space-x-2 ${
                            activeItem === item.id
                              ? "text-black border-b-2 border-black dark:text-foreground dark:border-foreground"
                              : "text-ink-gray hover:text-black dark:text-muted-foreground dark:hover:text-foreground"
                          }`}
                          aria-label={`Navigate to ${item.label} section`}
                          aria-current={activeItem === item.id ? 'page' : undefined}
                        >
                          <span className="text-xs">{item.label}</span>
                        </button>
                ))}
                <div className="ml-2">
                  <ThemeToggle />
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <button
                onClick={toggleMenu}
                className="relative inline-flex items-center justify-center p-2 text-black hover:text-ink-gray focus:outline-none transition-colors duration-200 dark:text-foreground dark:hover:text-muted-foreground"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                <div className="relative w-6 h-6">
                  {isOpen ? (
                    <X size={24} className="absolute inset-0" />
                  ) : (
                    <Menu size={24} className="absolute inset-0" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          ref={menuRef}
          className="md:hidden"
          style={{ display: isOpen ? 'block' : 'none' }}
        >
          <div className="px-4 pt-2 pb-4 space-y-1 bg-paper-cream dark:bg-background border-t border-ink-light-gray/30 dark:border-border">
            {menuItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-base font-serif transition-all duration-200 ${
                  activeItem === item.id
                    ? "text-black border-l-2 border-black bg-paper-beige dark:text-foreground dark:border-foreground dark:bg-accent"
                    : "text-ink-gray hover:text-black hover:bg-paper-beige/50 dark:text-muted-foreground dark:hover:text-foreground dark:hover:bg-accent/50"
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default CrazyMenu;
