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
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

type MenuItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

const menuItems: MenuItem[] = [
  { id: "hero", label: "Home", icon: <Home className="h-5 w-5" /> },
  { id: "about", label: "About", icon: <User className="h-5 w-5" /> },
  {
    id: "experience",
    label: "Experience",
    icon: <Briefcase className="h-5 w-5" />,
  },
  {
    id: "education",
    label: "Education",
    icon: <GraduationCap className="h-5 w-5" />,
  },
  { id: "projects", label: "Projects", icon: <Code className="h-5 w-5" /> },
  { id: "contact", label: "Contact", icon: <Mail className="h-5 w-5" /> },
];

const CipherText: React.FC<{ text: string }> = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const [isDeciphering, setIsDeciphering] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  const animationSpeedMs = 50;

  // Initialize with random characters
  useEffect(() => {
    const initialRandomText = Array(text.length)
      .fill(0)
      .map(() => chars[Math.floor(Math.random() * chars.length)])
      .join("");

    setDisplayText(initialRandomText);

    // Automatically start deciphering on page load after a short delay
    const timer = setTimeout(() => {
      setIsDeciphering(true);
    }, 600);

    return () => clearTimeout(timer);
  }, [text]);

  // Handle deciphering effect - reveal real text
  useEffect(() => {
    if (!isDeciphering) return;

    let currentText = displayText;
    const positions: number[] = [];

    // Generate random order of positions to reveal
    const availablePositions = [...Array(text.length).keys()];
    while (availablePositions.length > 0) {
      const randomIndex = Math.floor(Math.random() * availablePositions.length);
      positions.push(availablePositions[randomIndex]);
      availablePositions.splice(randomIndex, 1);
    }

    let currentStep = 0;

    const decipherInterval = setInterval(() => {
      if (currentStep >= positions.length) {
        clearInterval(decipherInterval);
        setIsComplete(true);
        return;
      }

      const position = positions[currentStep];
      const textArray = currentText.split("");
      textArray[position] = text[position];
      currentText = textArray.join("");

      setDisplayText(currentText);
      currentStep++;
    }, animationSpeedMs);

    return () => clearInterval(decipherInterval);
  }, [isDeciphering, text, displayText]);

  // Add hover effect to re-scramble and decipher again
  const handleMouseEnter = () => {
    if (isComplete) {
      // Start scrambling first
      let currentText = displayText;
      const positions: number[] = [];

      // Generate random order of positions to scramble
      const availablePositions = [...Array(text.length).keys()];
      while (availablePositions.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * availablePositions.length
        );
        positions.push(availablePositions[randomIndex]);
        availablePositions.splice(randomIndex, 1);
      }

      // Only scramble 40% of the characters for a quick effect
      const partialScramble = positions.slice(
        0,
        Math.floor(positions.length * 0.4)
      );

      partialScramble.forEach((position) => {
        const textArray = currentText.split("");
        textArray[position] = chars[Math.floor(Math.random() * chars.length)];
        currentText = textArray.join("");
      });

      setDisplayText(currentText);
      setIsComplete(false);
      setIsDeciphering(true);
    }
  };

  return (
    <span
      className="font-mono tracking-wider font-semibold"
      onMouseEnter={handleMouseEnter}
    >
      {displayText}
    </span>
  );
};

const SimpleMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Replace with your actual name
  const yourName = "SUHAS REDDY";

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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

  return (
    <nav
      ref={menuRef}
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => scrollToSection("hero")}
          >
            <div className="flex-shrink-0 flex items-center text-lg text-gray-900">
              <CipherText text={yourName} />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:ml-6 md:flex md:items-center">
            <div className="flex space-x-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-1 ${
                    activeItem === item.id
                      ? "bg-purple-100 text-purple-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  <span className="ml-1">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                activeItem === item.id
                  ? "bg-purple-100 text-purple-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default SimpleMenu;
