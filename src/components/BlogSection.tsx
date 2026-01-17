import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with Cloud Infrastructure',
    excerpt: 'A comprehensive guide to building scalable cloud infrastructure using Terraform and Kubernetes.',
    date: '2025-01-15',
    readTime: '5 min read',
    category: 'DevOps'
  },
  {
    id: '2',
    title: 'SRE Best Practices',
    excerpt: 'Learn about Site Reliability Engineering practices and how to implement them in your organization.',
    date: '2025-01-10',
    readTime: '8 min read',
    category: 'SRE'
  },
  {
    id: '3',
    title: 'CI/CD Pipeline Optimization',
    excerpt: 'Tips and tricks for optimizing your CI/CD pipelines to reduce build times and improve reliability.',
    date: '2025-01-05',
    readTime: '6 min read',
    category: 'DevOps'
  }
];

const BlogSection: React.FC = React.memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const postRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Set all elements to be visible immediately
    if (headingRef.current) {
      gsap.set(headingRef.current, { opacity: 1, y: 0 });
    }
    postRefs.current.forEach((post) => {
      if (post) {
        gsap.set(post, { opacity: 1, y: 0 });
      }
    });
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <section id="blog" className="py-8 sm:py-12 md:py-16 relative" ref={sectionRef}>
      <div className="section-container">
        <div className="mb-12 sm:mb-16">
          <div ref={headingRef} className="uppercase text-xs sm:text-sm font-sans tracking-wider mb-4 sm:mb-6 text-ink-gray dark:text-muted-foreground">
            Blog
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-tight">
            <span className="text-black dark:text-foreground">Thoughts, insights and </span>
            <span className="italic text-ink-gray dark:text-muted-foreground">learnings</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mt-12">
          {blogPosts.map((post, index) => (
            <div
              key={post.id}
              ref={el => postRefs.current[index] = el}
              className="paper-card h-full flex flex-col cursor-pointer group hover:border-black/40 transition-all duration-200"
              onClick={() => navigate(`/blog/${post.id}`)}
            >
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen size={18} className="text-ink-gray" />
                  <span className="text-xs font-serif text-ink-gray border border-ink-light-gray/40 px-2 py-1">
                    {post.category}
                  </span>
                </div>
                
                <h3 className="text-xl sm:text-2xl font-serif font-semibold text-black mb-3 group-hover:text-ink-gray transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-body mb-4">
                  {post.excerpt}
                </p>
              </div>
              
              <div className="mt-auto pt-4 border-t border-ink-light-gray/30 flex items-center justify-between">
                <div className="flex items-center gap-4 text-muted">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} className="text-ink-light-gray" />
                    <span className="text-xs font-serif text-ink-gray">{formatDate(post.date)}</span>
                  </div>
                  <span className="text-xs font-serif text-ink-gray">{post.readTime}</span>
                </div>
                <ArrowRight size={16} className="text-black group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/blog')}
            className="minimal-button-outline"
          >
            View All Posts
          </button>
        </div>
      </div>
    </section>
  );
});

BlogSection.displayName = 'BlogSection';
export default BlogSection;

