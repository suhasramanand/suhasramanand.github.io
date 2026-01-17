import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, ChevronRight, Mail, Linkedin, Github, ExternalLink } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollToPlugin);

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  suggestions?: string[];
  contactInfo?: {
    email: string;
    linkedin: string;
    github: string;
  };
}

interface BotResponse {
  message: string;
  suggestions?: string[];
  action?: {
    type: 'scroll' | 'navigate';
    target: string;
  };
  contactInfo?: {
    email: string;
    linkedin: string;
    github: string;
  };
}

const SupportBot: React.FC = () => {
  const botName = "JARVIS"; // Bot name
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Good day. I am JARVIS. At your service to help you learn about Suhas and navigate the site. How may I assist you today?`,
      sender: 'bot',
      suggestions: ['About me', 'Projects', 'Resume', 'Contact', 'Skills']
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const notificationShownRef = useRef(false);
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    if (id === 'hero' || id === 'home') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById('hero');
        if (element) {
          gsap.to(window, {
            duration: 0.5,
            scrollTo: { y: element, offsetY: 0 },
            ease: "power2.out"
          });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else if (id === 'blog') {
      navigate('/blog');
    } else if (id === 'resume') {
      navigate('/resume');
    } else {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          gsap.to(window, {
            duration: 0.5,
            scrollTo: { y: element, offsetY: 80 },
            ease: "power2.out"
          });
        }
      }, 100);
    }
  };

  // Knowledge base about Suhas Reddy
  const knowledgeBase = {
    name: "Suhas Reddy",
    title: "Software Engineer & Cloud Specialist",
    location: "Boston, MA",
    email: "reachsuhasreddy@gmail.com",
    linkedin: "https://linkedin.com/in/suhasreddybr/",
    github: "https://github.com/suhasramanand",
    about: {
      summary: "I'm a Software Engineer and Cloud Specialist currently pursuing my Master's in Computer Software Engineering at Northeastern University. My passion lies in building resilient, scalable infrastructure and automating complex systems in the cloud.",
      expertise: "Through my experience at Calix, Elanco, and Bosch, I've specialized in Site Reliability Engineering (SRE), cloud infrastructure automation, and DevOps practices. I work extensively with AWS, GCP, Kubernetes, Terraform, and CI/CD pipelines to design systems that are both reliable and efficient.",
      passion: "What excites me most is solving infrastructure challenges—whether it's automating database deployments, hardening CI/CD pipelines, or designing monitoring systems that prevent incidents before they happen."
    },
    experience: [
      {
        company: "Calix Inc",
        title: "Software Engineer, Cloud",
        period: "Jun 2025 - Aug 2025",
        location: "Remote",
        type: "Internship",
        highlights: [
          "Automated AlloyDB database deployments using Liquibase and Bash scripts, reducing manual provisioning time by 35%",
          "Hardened CI/CD pipelines with Bitbucket pipelines, implementing automated testing and compliance checks",
          "Developed monitoring scripts to detect deployment inconsistencies and package drift"
        ]
      },
      {
        company: "Elanco",
        title: "Software Engineer",
        period: "Oct 2023 - Jul 2024",
        location: "Bangalore, India",
        type: "Full-time",
        highlights: [
          "Engineered full stack enterprise SaaS applications with FERN stack (Firebase, Express, React, Node.js)",
          "Automated infrastructure monitoring using Ansible and Shell scripting, reducing downtime by 15%",
          "Implemented CI/CD pipelines using GitHub Actions and Docker"
        ]
      },
      {
        company: "Bosch Global Software Technologies",
        title: "Project Trainee",
        period: "Jan 2023 - May 2023",
        location: "Bangalore, India",
        type: "Internship",
        highlights: [
          "Developed scalable website using React and TypeScript, improving multi-device engagement by 40%",
          "Optimized RESTful APIs with Python FastAPI, accelerating response times by 30%",
          "Improved Azure SQL database performance with indexing and caching, reducing retrieval times by 25%"
        ]
      }
    ],
    education: [
      {
        institution: "Northeastern University",
        degree: "Master of Science, Computer Software Engineering",
        period: "Expected May 2026",
        location: "Boston, MA",
        gpa: "3.8",
        keyCourses: ["Application Engineering & Development", "Network Structures & Cloud Computing", "Prompt Engineering & AI"]
      },
      {
        institution: "REVA University",
        degree: "Bachelor of Technology, Computer Science & Engineering",
        period: "Aug 2023",
        location: "Bangalore, India",
        gpa: "3.6"
      }
    ],
    skills: {
      languages: ["JavaScript/TypeScript (95%)", "Python (90%)", "Java (85%)", "C++ (80%)", "SQL (85%)"],
      frontend: ["React (95%)", "Next.js (85%)", "Angular (70%)", "Material UI (80%)", "Tailwind CSS (90%)"],
      backend: ["Node.js (90%)", "Express (90%)", "FastAPI (85%)", "Django (75%)", "REST APIs (95%)"],
      databases: ["MongoDB (85%)", "MySQL (90%)", "PostgreSQL (85%)", "Firebase (80%)"],
      cloud: ["AWS (85%)", "Azure (80%)", "GCP (75%)", "Docker (90%)", "Kubernetes (85%)", "Terraform (80%)"],
      tools: ["Git (95%)", "CI/CD (90%)", "Agile/Scrum (85%)", "JIRA (80%)"]
    },
    projects: [
      "InvoiceFlow - Modern invoice management platform for small businesses",
      "Scalable Infrastructure Deployment with Terraform and Kubernetes",
      "CodeReviewer.AI - AI-powered pull request review bot"
    ]
  };

  const getBotResponse = (userInput: string): BotResponse => {
    const input = userInput.toLowerCase().trim();

    // Improved pattern matching with more natural language understanding
    const patterns: Array<{
      keywords: string[];
      response: BotResponse;
      priority?: number;
    }> = [
      {
        keywords: ['about', 'who are you', 'tell me about', 'introduction', 'background', 'what do you do'],
        response: {
          message: `${knowledgeBase.about.summary}\n\n${knowledgeBase.about.expertise}`,
          suggestions: ['Experience', 'Skills', 'Education', 'Projects'],
          action: { type: 'scroll', target: 'about' }
        }
      },
      {
        keywords: ['project', 'portfolio', 'what have you built', 'github', 'what projects'],
        response: {
          message: `I've built several projects:\n\n• ${knowledgeBase.projects[0]}\n• ${knowledgeBase.projects[1]}\n• ${knowledgeBase.projects[2]}\n\nYou can check them out on my GitHub profile or view more details in the Projects section!`,
          suggestions: ['Scroll to Projects', 'View GitHub', 'Skills'],
          action: { type: 'scroll', target: 'projects' }
        }
      },
      {
        keywords: ['resume', 'cv', 'download', 'pdf'],
        response: {
          message: "I can help you view or download my resume!",
          suggestions: ['Open Resume', 'Experience Section', 'Education'],
          action: { type: 'navigate', target: 'resume' }
        },
        priority: 1
      },
      {
        keywords: ['skill', 'technolog', 'what can you do', 'expertise', 'languages', 'proficient', 'tech stack', 'what languages', 'what tech'],
        response: {
          message: `I work with various technologies:\n\n**Programming Languages:** ${knowledgeBase.skills.languages.join(', ')}\n**Frontend:** ${knowledgeBase.skills.frontend.join(', ')}\n**Backend:** ${knowledgeBase.skills.backend.join(', ')}\n**Cloud & DevOps:** ${knowledgeBase.skills.cloud.join(', ')}\n**Databases:** ${knowledgeBase.skills.databases.join(', ')}\n\nWould you like to know more about any specific technology?`,
          suggestions: ['Scroll to Skills', 'Projects', 'Experience'],
          action: { type: 'scroll', target: 'skills' }
        }
      },
      {
        keywords: ['contact', 'email', 'reach out', 'get in touch', 'hire', 'connect', 'reach'],
        response: {
          message: "I'd love to connect! Here's how you can reach me:",
          suggestions: ['Scroll to Contact Section', 'View Resume'],
          action: { type: 'scroll', target: 'contact' },
          contactInfo: {
            email: 'reachsuhasreddy@gmail.com',
            linkedin: 'https://linkedin.com/in/suhasreddybr/',
            github: 'https://github.com/suhasramanand'
          }
        }
      },
      {
        keywords: ['education', 'degree', 'university', 'college', 'gpa', 'edu', 'where did you study', 'where do you study', 'northeastern', 'reva'],
        response: {
          message: `I'm currently pursuing a ${knowledgeBase.education[0].degree} at ${knowledgeBase.education[0].institution} (GPA: ${knowledgeBase.education[0].gpa}), expected to graduate in ${knowledgeBase.education[0].period}. I previously completed my ${knowledgeBase.education[1].degree} from ${knowledgeBase.education[1].institution} (GPA: ${knowledgeBase.education[1].gpa}) in ${knowledgeBase.education[1].period}.`,
          suggestions: ['Scroll to Education', 'Experience', 'Skills'],
          action: { type: 'scroll', target: 'education' }
        }
      },
      {
        keywords: ['experience', 'job', 'work', 'employment', 'career', 'company', 'exp', 'employed', 'positions', 'roles', 'where do you work', 'where have you worked'],
        response: {
          message: `I've worked at several companies:\n\n**${knowledgeBase.experience[0].company}** - ${knowledgeBase.experience[0].title} (${knowledgeBase.experience[0].period})\n${knowledgeBase.experience[0].highlights[0]}\n\n**${knowledgeBase.experience[1].company}** - ${knowledgeBase.experience[1].title} (${knowledgeBase.experience[1].period})\n${knowledgeBase.experience[1].highlights[0]}\n\n**${knowledgeBase.experience[2].company}** - ${knowledgeBase.experience[2].title} (${knowledgeBase.experience[2].period})\n${knowledgeBase.experience[2].highlights[0]}`,
          suggestions: ['Scroll to Experience', 'Projects', 'Resume'],
          action: { type: 'scroll', target: 'experience' }
        },
        priority: 1
      },
      {
        keywords: ['blog', 'article', 'post', 'writing'],
        response: {
          message: "I write blog posts about technology, software engineering, and my learnings!",
          suggestions: ['View Blog', 'Scroll to Blog Section'],
          action: { type: 'navigate', target: 'blog' }
        }
      },
      {
        keywords: ['certification', 'cert', 'aws', 'azure', 'credential', 'badge'],
        response: {
          message: "I hold several professional certifications in cloud platforms and technologies!",
          suggestions: ['Scroll to Certifications', 'Skills'],
          action: { type: 'scroll', target: 'certifications' }
        }
      },
      {
        keywords: ['activity', 'conference', 'event', 'kubecon', 'reinvent', 'attend'],
        response: {
          message: "I actively participate in tech conferences and events to stay updated!",
          suggestions: ['Scroll to Activities', 'Blog'],
          action: { type: 'scroll', target: 'activities' }
        }
      },
      {
        keywords: ['hello', 'hi', 'hey', 'greeting'],
        response: {
          message: "Hello! How can I help you today?",
          suggestions: ['About me', 'Projects', 'Resume', 'Contact']
        }
      },
      {
        keywords: ['help', 'what can you do', 'options'],
        response: {
          message: "I can help you navigate to different sections: About, Experience, Education, Projects, Skills, Certifications, Activities, Blog, and Contact. Just ask!",
          suggestions: ['Projects', 'Resume', 'Skills', 'Contact']
        }
      }
    ];

    // Sort patterns by priority (higher priority first), then by keyword length (longer first for better matching)
    const sortedPatterns = [...patterns].sort((a, b) => {
      const priorityDiff = (b.priority || 0) - (a.priority || 0);
      if (priorityDiff !== 0) return priorityDiff;
      const aMaxKeyword = Math.max(...a.keywords.map(k => k.length));
      const bMaxKeyword = Math.max(...b.keywords.map(k => k.length));
      return bMaxKeyword - aMaxKeyword;
    });

    // Check for specific company/work questions
    if (input.includes('calix')) {
      const exp = knowledgeBase.experience[0];
      return {
        message: `At ${exp.company}, I worked as a ${exp.title} from ${exp.period} (${exp.type}). Key achievements:\n\n${exp.highlights.map(h => `• ${h}`).join('\n')}`,
        suggestions: ['Scroll to Experience', 'Other Companies', 'Skills'],
        action: { type: 'scroll', target: 'experience' }
      };
    }
    
    if (input.includes('elanco')) {
      const exp = knowledgeBase.experience[1];
      return {
        message: `At ${exp.company}, I worked as a ${exp.title} from ${exp.period} (${exp.type}). Key achievements:\n\n${exp.highlights.map(h => `• ${h}`).join('\n')}`,
        suggestions: ['Scroll to Experience', 'Other Companies', 'Skills'],
        action: { type: 'scroll', target: 'experience' }
      };
    }
    
    if (input.includes('bosch')) {
      const exp = knowledgeBase.experience[2];
      return {
        message: `At ${exp.company}, I worked as a ${exp.title} from ${exp.period} (${exp.type}). Key achievements:\n\n${exp.highlights.map(h => `• ${h}`).join('\n')}`,
        suggestions: ['Scroll to Experience', 'Other Companies', 'Skills'],
        action: { type: 'scroll', target: 'experience' }
      };
    }
    
    // Check for specific technology/language questions
    const techKeywords: Record<string, string[]> = {
      'react': ['react', knowledgeBase.skills.frontend.find(s => s.toLowerCase().includes('react')) || 'React (95%)'],
      'python': ['python', knowledgeBase.skills.languages.find(s => s.toLowerCase().includes('python')) || 'Python (90%)'],
      'javascript': ['javascript', 'typescript', knowledgeBase.skills.languages.find(s => s.toLowerCase().includes('javascript')) || 'JavaScript/TypeScript (95%)'],
      'typescript': ['typescript', knowledgeBase.skills.languages.find(s => s.toLowerCase().includes('typescript')) || 'JavaScript/TypeScript (95%)'],
      'java': ['java', knowledgeBase.skills.languages.find(s => s.toLowerCase().includes('java')) || 'Java (85%)'],
      'aws': ['aws', knowledgeBase.skills.cloud.find(s => s.toLowerCase().includes('aws')) || 'AWS (85%)'],
      'kubernetes': ['kubernetes', 'k8s', knowledgeBase.skills.cloud.find(s => s.toLowerCase().includes('kubernetes')) || 'Kubernetes (85%)'],
      'docker': ['docker', knowledgeBase.skills.cloud.find(s => s.toLowerCase().includes('docker')) || 'Docker (90%)'],
      'terraform': ['terraform', knowledgeBase.skills.cloud.find(s => s.toLowerCase().includes('terraform')) || 'Terraform (80%)'],
      'node': ['node', 'node.js', 'nodejs', knowledgeBase.skills.backend.find(s => s.toLowerCase().includes('node')) || 'Node.js (90%)'],
      'gcp': ['gcp', 'google cloud', knowledgeBase.skills.cloud.find(s => s.toLowerCase().includes('gcp')) || 'GCP (75%)'],
      'azure': ['azure', knowledgeBase.skills.cloud.find(s => s.toLowerCase().includes('azure')) || 'Azure (80%)']
    };
    
    for (const [tech, values] of Object.entries(techKeywords)) {
      if (input.includes(tech) || values.slice(0, -1).some(v => input.includes(v))) {
        return {
          message: `Yes! I work with ${tech.charAt(0).toUpperCase() + tech.slice(1)}. My proficiency level is ${values[values.length - 1]}. I use it for ${tech.includes('react') || tech.includes('javascript') || tech.includes('typescript') ? 'frontend development' : tech.includes('aws') || tech.includes('azure') || tech.includes('gcp') || tech.includes('docker') || tech.includes('kubernetes') || tech.includes('terraform') ? 'cloud infrastructure and DevOps' : tech.includes('node') ? 'backend development' : 'various projects'}.`,
          suggestions: ['Scroll to Skills', 'Projects', 'Experience'],
          action: { type: 'scroll', target: 'skills' }
        };
      }
    }
    
    // Check for location questions
    if (input.includes('where') && (input.includes('live') || input.includes('location') || input.includes('based'))) {
      return {
        message: `I'm currently based in ${knowledgeBase.location}, where I'm pursuing my Master's degree at Northeastern University.`,
        suggestions: ['Education', 'Experience', 'Contact'],
        action: { type: 'scroll', target: 'about' }
      };
    }
    
    // Check for GPA questions
    if (input.includes('gpa') || input.includes('grade')) {
      return {
        message: `My current GPA at Northeastern University is ${knowledgeBase.education[0].gpa}. I graduated from REVA University with a GPA of ${knowledgeBase.education[1].gpa}.`,
        suggestions: ['Scroll to Education', 'Experience', 'Skills'],
        action: { type: 'scroll', target: 'education' }
      };
    }
    
    // Find matching pattern - check for partial matches first
    for (const pattern of sortedPatterns) {
      // Check if input matches any keyword exactly or as a substring
      const matched = pattern.keywords.some(keyword => {
        // Exact match or input is contained in keyword (handles "exp" matching "experience")
        if (input === keyword || keyword.includes(input)) return true;
        // Keyword is contained in input (handles "my experience" matching "experience")
        if (input.includes(keyword)) return true;
        // Check if input starts with keyword or vice versa (handles "exp" matching "experience")
        if (keyword.startsWith(input) || input.startsWith(keyword)) return true;
        return false;
      });
      
      if (matched) {
        return pattern.response;
      }
    }

    // Default response
    return {
      message: "I didn't quite understand that. Could you try asking about my projects, experience, skills, resume, or how to contact me?",
      suggestions: ['Projects', 'Experience', 'Resume', 'Contact']
    };
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user'
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Get bot response
    setTimeout(() => {
      const botResponse = getBotResponse(messageText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse.message,
        sender: 'bot',
        suggestions: botResponse.suggestions,
        contactInfo: botResponse.contactInfo
      };
      setMessages(prev => [...prev, botMessage]);

      // Execute action if any
      if (botResponse.action) {
        setTimeout(() => {
          if (botResponse.action?.type === 'scroll') {
            scrollToSection(botResponse.action.target);
          } else if (botResponse.action?.type === 'navigate') {
            navigate(`/${botResponse.action.target}`);
            setIsOpen(false);
          }
        }, 500);
      }
    }, 500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    const suggestionLower = suggestion.toLowerCase();
    
    // Map suggestions to actions
    if (suggestionLower.includes('scroll to')) {
      const section = suggestion.replace('Scroll to ', '').toLowerCase();
      const sectionMap: Record<string, string> = {
        'about': 'about',
        'projects': 'projects',
        'skills': 'skills',
        'experience': 'experience',
        'education': 'education',
        'contact': 'contact',
        'contact section': 'contact',
        'certifications': 'certifications',
        'activities': 'activities',
        'blog section': 'blog',
        'contributions': 'opensource',
        'open source': 'opensource',
        'contribs': 'opensource'
      };
      const targetId = sectionMap[section] || section;
      scrollToSection(targetId);
      setIsOpen(false);
    } else if (suggestionLower.includes('view blog') || suggestionLower.includes('blog')) {
      navigate('/blog');
      setIsOpen(false);
    } else if (suggestionLower.includes('open resume') || suggestionLower.includes('resume')) {
      navigate('/resume');
      setIsOpen(false);
    } else if (suggestionLower.includes('view github') || suggestionLower.includes('github')) {
      window.open('https://github.com/suhasramanand', '_blank');
    } else {
      handleSendMessage(suggestion);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Show bot button after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      if (buttonRef.current) {
        gsap.from(buttonRef.current, {
          scale: 0,
          rotation: -180,
          opacity: 0,
          duration: 0.5,
          ease: "back.out(1.7)"
        });
      }
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  // Auto-popup disabled - removed auto-notify functionality

  useEffect(() => {
    if (chatContainerRef.current) {
      if (isOpen) {
        gsap.from(chatContainerRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    }
  }, [isOpen]);

  return (
    <>
      {/* Floating Button */}
      {isVisible && (
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(true)}
          className={cn(
            "fixed bottom-24 right-4 sm:right-8 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-black dark:bg-foreground text-paper-cream dark:text-background rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center border border-black dark:border-foreground hover:scale-110",
            isOpen && "opacity-0 pointer-events-none"
          )}
          aria-label={`Open ${botName}`}
        >
          <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          ref={chatContainerRef}
          className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 w-[calc(100vw-2rem)] sm:w-96 max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-2rem)] bg-paper-cream dark:bg-card border border-black/20 dark:border-border shadow-2xl flex flex-col font-serif"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-black/20 dark:border-border bg-black/5 dark:bg-muted/30">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-black dark:text-foreground" />
              <h3 className="text-lg font-semibold text-black dark:text-foreground">{botName}</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-black dark:text-foreground hover:text-ink-gray dark:hover:text-muted-foreground transition-colors"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-4 py-2",
                    message.sender === 'user'
                      ? 'bg-black dark:bg-foreground text-paper-cream dark:text-background'
                      : 'bg-ink-light-gray/20 dark:bg-muted/50 text-black dark:text-foreground border border-black/10 dark:border-border'
                  )}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  
                  {/* Contact Info */}
                  {message.contactInfo && message.sender === 'bot' && (
                    <div className="mt-3 pt-3 border-t border-black/10 dark:border-border/50 space-y-2">
                      <a
                        href={`mailto:${message.contactInfo.email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs text-black dark:text-foreground hover:text-ink-gray dark:hover:text-muted-foreground transition-colors group"
                      >
                        <Mail className="h-4 w-4" />
                        <span className="underline">{message.contactInfo.email}</span>
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                      <a
                        href={message.contactInfo.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs text-black dark:text-foreground hover:text-ink-gray dark:hover:text-muted-foreground transition-colors group"
                      >
                        <Linkedin className="h-4 w-4" />
                        <span className="underline">LinkedIn Profile</span>
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                      <a
                        href={message.contactInfo.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs text-black dark:text-foreground hover:text-ink-gray dark:hover:text-muted-foreground transition-colors group"
                      >
                        <Github className="h-4 w-4" />
                        <span className="underline">GitHub Profile</span>
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </div>
                  )}
                  
                  {/* Suggestions */}
                  {message.suggestions && message.sender === 'bot' && (
                    <div className="mt-3 space-y-2">
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full text-left px-3 py-2 text-xs border border-black/20 dark:border-border hover:bg-black/5 dark:hover:bg-foreground/10 transition-colors flex items-center justify-between group"
                        >
                          <span>{suggestion}</span>
                          <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-black/20 dark:border-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
                placeholder="Type your question..."
                className="flex-1 px-4 py-2 border border-ink-light-gray/40 dark:border-border bg-paper-cream dark:bg-card text-black dark:text-foreground focus:outline-none focus:border-black dark:focus:border-foreground text-sm"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim()}
                className="px-4 py-2 bg-black dark:bg-foreground text-paper-cream dark:text-background border border-black dark:border-foreground hover:bg-black/80 dark:hover:bg-foreground/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SupportBot;

