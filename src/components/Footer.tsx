import React from 'react';
import { ChevronDown } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden bg-background">
      {/* Oversized Background Watermark Text */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <div
          className="text-transparent font-bold uppercase tracking-[0.1em] sm:whitespace-nowrap"
          style={{
            fontSize: 'clamp(3rem, 18vw, 16rem)',
            lineHeight: '0.9',
            WebkitTextStroke: '1.5px currentColor',
            textStroke: '1.5px currentColor',
            color: 'hsl(var(--muted-foreground) / 0.15)',
            transform: 'translateY(15%)',
            width: '100%',
            textAlign: 'center',
            padding: '0 1rem',
          }}
        >
          SUHAS REDDY
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
        {/* Navigation Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Work Column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4">
              Work
            </h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#projects" 
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Projects
                </a>
              </li>
              <li>
                <a 
                  href="#experience" 
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Experience
                </a>
              </li>
              <li>
                <a 
                  href="#skills" 
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Skills
                </a>
              </li>
            </ul>
          </div>

          {/* Social Column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4">
              Social
            </h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://github.com/suhasramanand" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a 
                  href="https://linkedin.com/in/suhasreddybr/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a 
                  href="/blog" 
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4">
              Contact
            </h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#contact" 
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Get In Touch
                </a>
              </li>
              <li>
                <a 
                  href="mailto:reachsuhasreddy@gmail.com" 
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Email
                </a>
              </li>
              <li>
                <a 
                  href="/resume" 
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Resume
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/blog" 
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a 
                  href="#certifications" 
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Certifications
                </a>
              </li>
              <li>
                <a 
                  href="#opensource" 
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Open Source
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row - Copyright & Legal */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>English</span>
            <ChevronDown size={14} />
          </div>
          <div className="flex flex-wrap items-center gap-6 text-xs">
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <span className="text-muted-foreground">
              Suhas Reddy © {currentYear}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

