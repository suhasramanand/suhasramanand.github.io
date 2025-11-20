import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, GitMerge } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface OpenSourceContribution {
  repository: string;
  title: string;
  description: string;
  prUrl: string;
  date?: string;
  status?: 'merged' | 'open' | 'closed';
}

const OpenSourceSection: React.FC = React.memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contributionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Set all elements to be visible immediately - let AnimatedSection handle entrance animation
    if (headingRef.current) {
      gsap.set(headingRef.current, { opacity: 1, y: 0 });
    }
    
    contributionRefs.current.forEach((contribution) => {
      if (contribution) {
        gsap.set(contribution, { opacity: 1, y: 0 });
      }
    });
  }, []);

  // Open source contributions - Add your PR links here
  const contributions: OpenSourceContribution[] = [
    // Example format:
    // {
    //   repository: 'example/repo',
    //   title: 'Fix bug in authentication',
    //   description: 'Fixed a critical bug in the authentication flow that was causing login failures.',
    //   prUrl: 'https://github.com/example/repo/pull/123',
    //   date: '2025-11-15',
    //   status: 'merged'
    // },
  ];

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'merged':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-700';
      case 'open':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700';
      case 'closed':
        return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-700';
      default:
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-700';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  if (contributions.length === 0) {
    return null; // Don't render section if there are no contributions
  }

  return (
    <section id="opensource" className="py-16 sm:py-20 md:py-24 relative" ref={sectionRef}>
      <div className="section-container">
        <h2 ref={headingRef} className="section-title">Open Source Contributions</h2>
        
        <p className="text-body text-center max-w-2xl mx-auto mb-12 text-ink-gray dark:text-muted-foreground">
          Contributing to open source projects and making a positive impact on the developer community.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12">
          {contributions.map((contribution, index) => (
            <div
              key={index}
              ref={el => contributionRefs.current[index] = el}
              className="paper-card group hover:border-black/40 dark:hover:border-foreground transition-all duration-200 flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <GitMerge size={18} className="text-ink-gray dark:text-muted-foreground" />
                  <span className="text-sm font-serif text-ink-gray dark:text-muted-foreground font-semibold">
                    {contribution.repository}
                  </span>
                </div>
                {contribution.status && (
                  <span className={`text-xs font-serif px-2 py-1 rounded border ${getStatusColor(contribution.status)}`}>
                    {contribution.status}
                  </span>
                )}
              </div>
              
              <h3 className="text-xl sm:text-2xl font-serif font-semibold text-black dark:text-foreground mb-3 group-hover:text-ink-gray dark:group-hover:text-muted-foreground transition-colors">
                {contribution.title}
              </h3>
              
              <p className="text-body mb-4 text-black dark:text-foreground flex-grow">
                {contribution.description}
              </p>
              
              <div className="mt-auto pt-4 border-t border-ink-light-gray/30 dark:border-border">
                <div className="flex items-center justify-between">
                  {contribution.date && (
                    <span className="text-xs font-serif text-ink-gray dark:text-muted-foreground">
                      {formatDate(contribution.date)}
                    </span>
                  )}
                  <a
                    href={contribution.prUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-serif text-black dark:text-foreground hover:text-ink-gray dark:hover:text-muted-foreground transition-colors group/link"
                    aria-label={`View PR: ${contribution.title}`}
                  >
                    <span>View PR</span>
                    <ExternalLink size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

OpenSourceSection.displayName = 'OpenSourceSection';
export default OpenSourceSection;

