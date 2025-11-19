import React, { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { BookOpen, Calendar, Clock, Home, Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CrazyMenu from '@/components/CrazyMenu';
import FloatingActionButton from '@/components/FloatingActionButton';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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
    date: '2025-11-18',
    readTime: '12 min read',
    category: 'Cloud',
    author: 'Suhas Reddy'
  },
  {
    id: '2',
    title: 'Site Reliability Engineering: From Theory to Practice',
    excerpt: 'Understanding SRE principles, error budgets, and how to implement reliability practices that balance innovation with operational stability.',
    content: 'Full blog post content goes here...',
    date: '2025-11-17',
    readTime: '15 min read',
    category: 'SRE',
    author: 'Suhas Reddy'
  },
  {
    id: '3',
    title: 'Optimizing CI/CD Pipelines: Reducing Build Times by 70%',
    excerpt: 'Practical strategies for accelerating your CI/CD pipelines through parallelization, caching, and intelligent dependency management.',
    content: 'Full blog post content goes here...',
    date: '2025-11-16',
    readTime: '10 min read',
    category: 'DevOps',
    author: 'Suhas Reddy'
  },
  {
    id: '4',
    title: 'Kubernetes Monitoring and Observability: A Complete Guide',
    excerpt: 'Implementing comprehensive monitoring, logging, and tracing for Kubernetes clusters to ensure visibility and quick incident response.',
    content: 'Full blog post content goes here...',
    date: '2025-11-15',
    readTime: '14 min read',
    category: 'Kubernetes',
    author: 'Suhas Reddy'
  },
  {
    id: '5',
    title: 'AWS EKS vs GKE vs AKS: Choosing the Right Managed Kubernetes Service',
    excerpt: 'A detailed comparison of managed Kubernetes offerings from major cloud providers, including cost, features, and use case recommendations.',
    content: 'Full blog post content goes here...',
    date: '2025-11-14',
    readTime: '11 min read',
    category: 'Cloud',
    author: 'Suhas Reddy'
  },
  {
    id: '6',
    title: 'Infrastructure as Code: Terraform Modules and Best Practices',
    excerpt: 'Building reusable, maintainable Terraform modules and establishing patterns for managing complex infrastructure across multiple environments.',
    content: 'Full blog post content goes here...',
    date: '2025-11-13',
    readTime: '13 min read',
    category: 'DevOps',
    author: 'Suhas Reddy'
  },
  {
    id: '7',
    title: 'Prompt Engineering Cheatsheet: A Comprehensive Guide',
    excerpt: 'Master the art of prompt engineering with essential patterns, advanced techniques, and best practices for getting the most out of AI models.',
    content: 'Full blog post content goes here...',
    date: '2025-11-19',
    readTime: '18 min read',
    category: 'AI',
    author: 'Suhas Reddy'
  }
];

const Blog: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const postRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(blogPosts.map(post => post.category));
    return Array.from(cats).sort();
  }, []);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === null || post.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <>
      <CrazyMenu />
      <FloatingActionButton />
      <main className="pt-16">
        <section ref={sectionRef} className="py-16 sm:py-20 md:py-24 relative">
          <div className="section-container">
            <div className="flex items-center justify-between mb-8">
              <h2 ref={headingRef} className="section-title mb-0">Blog</h2>
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-4 py-2 border border-black/20 dark:border-border hover:bg-black dark:hover:bg-foreground hover:text-paper-cream dark:hover:text-background transition-all duration-200 font-serif text-sm text-black dark:text-foreground"
                aria-label="Go to home"
              >
                <Home size={18} />
                <span>Home</span>
              </button>
            </div>

            {/* Search and Filter Section */}
            <div className="mb-8 space-y-4">
              {/* Search Bar */}
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ink-light-gray dark:text-muted-foreground" size={18} />
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-ink-light-gray/40 dark:border-border bg-paper-cream dark:bg-card text-black dark:text-foreground font-serif focus:outline-none focus:border-black dark:focus:border-foreground transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-ink-light-gray dark:text-muted-foreground hover:text-black dark:hover:text-foreground transition-colors"
                    aria-label="Clear search"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-3 py-1.5 text-sm font-serif border transition-all ${
                    selectedCategory === null
                      ? 'bg-black dark:bg-foreground text-paper-cream dark:text-background border-black dark:border-foreground'
                      : 'bg-paper-cream dark:bg-card text-ink-gray dark:text-muted-foreground border-ink-light-gray/40 dark:border-border hover:border-black dark:hover:border-foreground hover:text-black dark:hover:text-foreground'
                  }`}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1.5 text-sm font-serif border transition-all ${
                      selectedCategory === category
                        ? 'bg-black dark:bg-foreground text-paper-cream dark:text-background border-black dark:border-foreground'
                        : 'bg-paper-cream dark:bg-card text-ink-gray dark:text-muted-foreground border-ink-light-gray/40 dark:border-border hover:border-black dark:hover:border-foreground hover:text-black dark:hover:text-foreground'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Results count */}
              {filteredPosts.length !== blogPosts.length && (
                <p className="text-sm font-serif text-ink-gray dark:text-muted-foreground">
                  Showing {filteredPosts.length} of {blogPosts.length} posts
                </p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mt-12">
              {filteredPosts.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-body text-ink-gray dark:text-muted-foreground font-serif mb-4">
                    No blog posts found matching your search.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory(null);
                    }}
                    className="minimal-button-outline"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                filteredPosts.map((post, index) => (
                <div
                  key={post.id}
                  ref={el => postRefs.current[index] = el}
                  className="paper-card h-full flex flex-col cursor-pointer group hover:border-black/40 dark:hover:border-border transition-all duration-200"
                  onClick={() => navigate(`/blog/${post.id}`)}
                >
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen size={18} className="text-ink-gray dark:text-muted-foreground" />
                      <span className="text-xs font-serif text-ink-gray dark:text-muted-foreground border border-ink-light-gray/40 dark:border-border px-2 py-1">
                        {post.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-serif font-semibold text-black dark:text-foreground mb-3 group-hover:text-ink-gray dark:group-hover:text-muted-foreground transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-body mb-4 text-black dark:text-foreground">
                      {post.excerpt}
                    </p>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-ink-light-gray/30 dark:border-border">
                    <div className="flex items-center gap-4 text-muted mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} className="text-ink-light-gray dark:text-muted-foreground" />
                        <span className="text-xs font-serif text-ink-gray dark:text-muted-foreground">{formatDate(post.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} className="text-ink-light-gray dark:text-muted-foreground" />
                        <span className="text-xs font-serif text-ink-gray dark:text-muted-foreground">{post.readTime}</span>
                      </div>
                    </div>
                    <p className="text-xs font-serif text-ink-gray dark:text-muted-foreground">By {post.author}</p>
                  </div>
                </div>
                ))
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Blog;

