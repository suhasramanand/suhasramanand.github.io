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
} from "lucide-react";
import { gsap } from "gsap";
import { useIsMobile } from "@/hooks/use-mobile";

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
  { id: "contact", label: "Contact", icon: <Mail className="h-5 w-5" />, color: "from-cyan-500 to-blue-500" },
];

const MorphingText: React.FC<{ text: string }> = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  const animationSpeedMs = 30;

  useEffect(() => {
    const initialRandomText = Array(text.length)
      .fill(0)
      .map(() => chars[Math.floor(Math.random() * chars.length)])
      .join("");

    setDisplayText(initialRandomText);

    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 800);

    return () => clearTimeout(timer);
  }, [text]);

  useEffect(() => {
    if (!isAnimating) return;

    let currentText = displayText;
    const positions: number[] = [];

    const availablePositions = [...Array(text.length).keys()];
    while (availablePositions.length > 0) {
      const randomIndex = Math.floor(Math.random() * availablePositions.length);
      positions.push(availablePositions[randomIndex]);
      availablePositions.splice(randomIndex, 1);
    }

    let currentStep = 0;

    const morphInterval = setInterval(() => {
      if (currentStep >= positions.length) {
        clearInterval(morphInterval);
        return;
      }

      const position = positions[currentStep];
      const textArray = currentText.split("");
      textArray[position] = text[position];
      currentText = textArray.join("");

      setDisplayText(currentText);
      currentStep++;
    }, animationSpeedMs);

    return () => clearInterval(morphInterval);
  }, [isAnimating, text, displayText]);

  const handleMouseEnter = () => {
    if (!isAnimating) {
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
      setIsAnimating(true);
    }
  };

  return (
    <span
      className="font-mono tracking-wider font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
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

  const yourName = "SUHAS REDDY";

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    
    if (!isOpen) {
      // Opening animation
      gsap.fromTo(menuRef.current, 
        { scale: 0, opacity: 0, rotation: -180 },
        { scale: 1, opacity: 1, rotation: 0, duration: 0.5, ease: "back.out(1.7)" }
      );
    } else {
      // Closing animation
      gsap.to(menuRef.current, 
        { scale: 0, opacity: 0, rotation: 180, duration: 0.3, ease: "back.in(1.7)" }
      );
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveItem(id);
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
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      for (const item of menuItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + scrollPosition;
          const elementBottom = bottom + scrollPosition;

          if (
            scrollPosition >= elementTop - 100 &&
            scrollPosition < elementBottom
          ) {
            setActiveItem(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
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
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div
              className="flex items-center cursor-pointer group"
              onClick={() => scrollToSection("hero")}
            >
              <div className="flex-shrink-0 flex items-center text-lg">
                <MorphingText text={yourName} />
                <Sparkles className="ml-2 h-5 w-5 text-purple-500 group-hover:animate-spin" />
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:ml-6 md:flex md:items-center">
              <div className="flex space-x-2">
                {menuItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-2 overflow-hidden group ${
                      activeItem === item.id
                        ? "text-white"
                        : "text-gray-700 hover:text-white"
                    }`}
                    style={{
                      background: activeItem === item.id 
                        ? `linear-gradient(135deg, ${item.color.split(' ')[1].replace('to-', '')} 0%, ${item.color.split(' ')[3].replace('to-', '')} 100%)`
                        : hoveredItem === item.id
                        ? `linear-gradient(135deg, ${item.color.split(' ')[1].replace('to-', '')} 0%, ${item.color.split(' ')[3].replace('to-', '')} 100%)`
                        : 'transparent'
                    }}
                  >
                    <div className="relative z-10 flex items-center space-x-2">
                      <span className={`transition-transform duration-300 ${hoveredItem === item.id ? 'scale-110' : ''}`}>
                        {item.icon}
                      </span>
                      <span className="ml-1">{item.label}</span>
                    </div>
                    
                    {/* Animated background */}
                    <div 
                      className={`absolute inset-0 rounded-full transition-all duration-300 ${
                        hoveredItem === item.id ? 'scale-110' : 'scale-0'
                      }`}
                      style={{
                        background: `linear-gradient(135deg, ${item.color.split(' ')[1].replace('to-', '')} 0%, ${item.color.split(' ')[3].replace('to-', '')} 100%)`,
                        opacity: 0.8
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={toggleMenu}
                className="relative inline-flex items-center justify-center p-2 rounded-full text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 focus:outline-none transition-all duration-300"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                <div className="relative w-6 h-6">
                  {isOpen ? (
                    <X size={24} className="absolute inset-0 animate-spin" />
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
          className={`md:hidden ${isOpen ? "block" : "hidden"}`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md shadow-lg">
            {menuItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                  activeItem === item.id
                    ? "text-white bg-gradient-to-r from-purple-500 to-pink-500"
                    : "text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200"
                }`}
              >
                <span className={`transition-transform duration-300 ${activeItem === item.id ? 'scale-110' : ''}`}>
                  {item.icon}
                </span>
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
