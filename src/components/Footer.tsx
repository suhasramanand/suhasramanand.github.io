import React from 'react';
import { ChevronDown } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden bg-background">
      {/* Oversized Background Watermark Text */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="text-transparent font-bold uppercase tracking-[0.1em] whitespace-nowrap"
          style={{
            fontSize: 'clamp(2rem, 12vw, 16rem)',
            lineHeight: '0.9',
            WebkitTextStroke: '1.5px currentColor',
            textStroke: '1.5px currentColor',
            color: 'hsl(var(--muted-foreground) / 0.15)',
            transform: 'translateY(15%)',
            maxWidth: '100vw',
            textAlign: 'center',
            padding: '0 0.5rem',
            overflow: 'hidden',
          }}
        >
          <span className="sm:hidden">SUHAS</span>
          <span className="hidden sm:inline">SUHAS REDDY</span>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 md:py-20 w-full overflow-x-hidden">
        {/* Navigation Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-12 mb-8 sm:mb-12 w-full min-w-0">
          {/* Work Column */}
          <div className="min-w-0">
            <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-foreground mb-3 sm:mb-4">
              Work
            </h3>
            <ul className="space-y-2 sm:space-y-2.5">
              <li>
                <a 
                  href="#projects" 
                  className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors block"
                >
                  Projects
                </a>
              </li>
              <li>
                <a 
                  href="#experience" 
                  className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors block"
                >
                  Experience
                </a>
              </li>
              <li>
                <a 
                  href="#skills" 
                  className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors block"
                >
                  Skills
                </a>
              </li>
            </ul>
          </div>

          {/* Social Column */}
          <div className="min-w-0">
            <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-foreground mb-3 sm:mb-4">
              Social
            </h3>
            <ul className="space-y-2 sm:space-y-2.5">
              <li>
                <a 
                  href="https://github.com/suhasramanand" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors block"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a 
                  href="https://linkedin.com/in/suhasreddybr/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors block"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a 
                  href="/blog" 
                  className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors block"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="min-w-0">
            <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-foreground mb-3 sm:mb-4">
              Contact
            </h3>
            <ul className="space-y-2 sm:space-y-2.5">
              <li>
                <a 
                  href="#contact" 
                  className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors block"
                >
                  Get In Touch
                </a>
              </li>
              <li>
                <a 
                  href="mailto:reachsuhasreddy@gmail.com" 
                  className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors block break-words"
                >
                  Email
                </a>
              </li>
              <li>
                <a 
                  href="/resume" 
                  className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors block break-words"
                >
                  Resume
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="min-w-0">
            <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-foreground mb-3 sm:mb-4">
              Resources
            </h3>
            <ul className="space-y-2 sm:space-y-2.5">
              <li>
                <a 
                  href="/blog" 
                  className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors block break-words"
                >
                  Blog
                </a>
              </li>
              <li>
                <a 
                  href="#certifications" 
                  className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors block break-words"
                >
                  Certifications
                </a>
              </li>
              <li>
                <a 
                  href="#opensource" 
                  className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors block break-words"
                >
                  Open Source
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row - Copyright & Legal */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-6 pt-6 sm:pt-8 border-t border-border w-full">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <span>English</span>
            <ChevronDown size={14} />
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm w-full sm:w-auto">
            <a 
              href="/terms-of-service" 
              className="text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
            >
              Terms of Service
            </a>
            <a 
              href="/privacy-policy" 
              className="text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
            >
              Privacy Policy
            </a>
            <span className="text-muted-foreground text-center sm:text-left whitespace-nowrap">
              Suhas Reddy © {currentYear}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

