import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Calendar, Clock, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CrazyMenu from '@/components/CrazyMenu';

gsap.registerPlugin(ScrollTrigger);

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Scalable Cloud Infrastructure with Terraform and Kubernetes',
    excerpt: 'A comprehensive guide to designing and deploying production-ready cloud infrastructure using Infrastructure as Code principles and container orchestration.',
    content: 'Full blog post content goes here...',
    date: '2025-01-20',
    readTime: '12 min read',
    category: 'Cloud',
    author: 'Suhas Reddy'
  },
  {
    id: '2',
    title: 'Site Reliability Engineering: From Theory to Practice',
    excerpt: 'Understanding SRE principles, error budgets, and how to implement reliability practices that balance innovation with operational stability.',
    content: 'Full blog post content goes here...',
    date: '2025-01-15',
    readTime: '15 min read',
    category: 'SRE',
    author: 'Suhas Reddy'
  },
  {
    id: '3',
    title: 'Optimizing CI/CD Pipelines: Reducing Build Times by 70%',
    excerpt: 'Practical strategies for accelerating your CI/CD pipelines through parallelization, caching, and intelligent dependency management.',
    content: 'Full blog post content goes here...',
    date: '2025-01-10',
    readTime: '10 min read',
    category: 'DevOps',
    author: 'Suhas Reddy'
  },
  {
    id: '4',
    title: 'Kubernetes Monitoring and Observability: A Complete Guide',
    excerpt: 'Implementing comprehensive monitoring, logging, and tracing for Kubernetes clusters to ensure visibility and quick incident response.',
    content: 'Full blog post content goes here...',
    date: '2025-01-05',
    readTime: '14 min read',
    category: 'Kubernetes',
    author: 'Suhas Reddy'
  },
  {
    id: '5',
    title: 'AWS EKS vs GKE vs AKS: Choosing the Right Managed Kubernetes Service',
    excerpt: 'A detailed comparison of managed Kubernetes offerings from major cloud providers, including cost, features, and use case recommendations.',
    content: 'Full blog post content goes here...',
    date: '2024-12-28',
    readTime: '11 min read',
    category: 'Cloud',
    author: 'Suhas Reddy'
  },
  {
    id: '6',
    title: 'Infrastructure as Code: Terraform Modules and Best Practices',
    excerpt: 'Building reusable, maintainable Terraform modules and establishing patterns for managing complex infrastructure across multiple environments.',
    content: 'Full blog post content goes here...',
    date: '2024-12-20',
    readTime: '13 min read',
    category: 'DevOps',
    author: 'Suhas Reddy'
  }
];

const Blog: React.FC = () => {
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
    <>
      <CrazyMenu />
      <main className="pt-16">
        <section ref={sectionRef} className="py-16 sm:py-20 md:py-24 relative">
          <div className="section-container">
            <div className="flex items-center justify-between mb-8">
              <h2 ref={headingRef} className="section-title mb-0">Blog</h2>
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-4 py-2 border border-black/20 hover:bg-black hover:text-paper-cream transition-all duration-200 font-serif text-sm"
                aria-label="Go to home"
              >
                <Home size={18} />
                <span>Home</span>
              </button>
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
                  
                  <div className="mt-auto pt-4 border-t border-ink-light-gray/30">
                    <div className="flex items-center gap-4 text-muted mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} className="text-ink-light-gray" />
                        <span className="text-xs font-serif text-ink-gray">{formatDate(post.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} className="text-ink-light-gray" />
                        <span className="text-xs font-serif text-ink-gray">{post.readTime}</span>
                      </div>
                    </div>
                    <p className="text-xs font-serif text-ink-gray">By {post.author}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Blog;

