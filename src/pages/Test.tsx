import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Sparkles, Zap, Layers, MousePointerClick, Code, Palette, Rocket, Eye, Calendar } from 'lucide-react';
import { gsap } from 'gsap';
import CrazyMenu from '@/components/CrazyMenu';
import AnimatedBackground from '@/components/AnimatedBackground';

const Test: React.FC = () => {
  const navigate = useNavigate();
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [clickedParticles, setClickedParticles] = useState<number[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  // Feature ideas list
  const featureIdeas = [
    {
      title: "3D Skill Visualization",
      icon: <Layers size={24} />,
      description: "Interactive 3D skill tree or network graph showing relationships between technologies",
      difficulty: "Medium",
      demo: true,
      path: "/test/3d-skills"
    },
    {
      title: "3D Face Modeling",
      icon: <Eye size={24} />,
      description: "Interactive 3D face mesh with fluid-like deformation on hover",
      difficulty: "Hard",
      demo: true,
      path: "/test/face-model"
    },
    {
      title: "Particle Effects on Hover",
      icon: <Sparkles size={24} />,
      description: "Particles follow mouse cursor with physics simulation",
      difficulty: "Easy",
      demo: true
    },
    {
      title: "Live Code Playground",
      icon: <Code size={24} />,
      description: "Embedded code editor to showcase projects interactively",
      difficulty: "Hard"
    },
    {
      title: "Interactive Timeline",
      icon: <Zap size={24} />,
      description: "Animated timeline of experience with scroll-triggered animations",
      difficulty: "Medium"
    },
    {
      title: "Voice Commands",
      icon: <MousePointerClick size={24} />,
      description: "Navigate and interact using voice commands with Web Speech API",
      difficulty: "Hard"
    },
    {
      title: "Theme Customizer",
      icon: <Palette size={24} />,
      description: "Let users customize colors, fonts, and layouts in real-time",
      difficulty: "Medium"
    },
    {
      title: "GitHub Heatmap",
      icon: <Calendar size={24} />,
      description: "Interactive GitHub contribution graph showing activity over the past year",
      difficulty: "Medium",
      demo: true,
      path: "/test/github-heatmap"
    },
    {
      title: "Real-time Collaboration",
      description: "Live chat or video call integration for portfolio visitors",
      difficulty: "Hard"
    },
    {
      title: "Interactive Resume Builder",
      description: "Drag-and-drop resume builder that exports to PDF",
      difficulty: "Medium"
    },
    {
      title: "AR/VR Portfolio View",
      description: "3D portfolio view using WebXR for VR headsets",
      difficulty: "Very Hard"
    }
  ];

  // Particle effect demo
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Create new particles on mouse move
      if (Math.random() > 0.7) {
        const newParticle = {
          id: Date.now(),
          x: e.clientX,
          y: e.clientY,
          delay: Math.random() * 0.5
        };
        setParticles(prev => [...prev.slice(-20), newParticle]);
        
        // Remove particle after animation
        setTimeout(() => {
          setParticles(prev => prev.filter(p => p.id !== newParticle.id));
        }, 2000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let circles: Array<{ x: number; y: number; radius: number; vx: number; vy: number }> = [];

    // Initialize circles
    for (let i = 0; i < 50; i++) {
      circles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      circles.forEach(circle => {
        circle.x += circle.vx;
        circle.y += circle.vy;
        
        if (circle.x < 0 || circle.x > canvas.width) circle.vx *= -1;
        if (circle.y < 0 || circle.y > canvas.height) circle.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fill();
        
        // Draw connections
        circles.forEach(other => {
          const dx = circle.x - other.x;
          const dy = circle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(circle.x, circle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(0, 0, 0, ${0.1 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <>
      <AnimatedBackground />
      <CrazyMenu />
      
      <main className="relative min-h-screen pt-20 pb-16">
        <div className="section-container">
          {/* Header */}
          <div className="text-center mb-12">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 py-2 border border-black/20 dark:border-border hover:bg-black dark:hover:bg-foreground hover:text-paper-cream dark:hover:text-background transition-all duration-200 font-serif text-sm text-black dark:text-foreground mb-6 mx-auto"
              aria-label="Go to home"
            >
              <Home size={18} />
              <span>Home</span>
            </button>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-black dark:text-foreground mb-4">
              Feature Test Lab
            </h1>
            <p className="text-lg text-ink-gray dark:text-muted-foreground font-serif max-w-2xl mx-auto">
              Testing ground for cool features and interactive experiments
            </p>
          </div>

          {/* Particle Canvas Background */}
          <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-30"
            style={{ background: 'transparent' }}
          />

          {/* Interactive Particles Demo */}
          <section className="mb-16 relative z-10">
            <div className="paper-card">
              <h2 className="text-2xl font-serif font-semibold text-black dark:text-foreground mb-4 flex items-center gap-2">
                <Sparkles className="text-black dark:text-foreground" />
                Interactive Particles Demo
              </h2>
              <p className="text-body text-ink-gray dark:text-muted-foreground mb-6 font-serif">
                Move your mouse around to see particles follow your cursor. Click to create bursts!
              </p>
              
              <div className="relative h-64 border border-black/20 dark:border-border rounded-lg overflow-hidden bg-black/5 dark:bg-muted/20">
                {/* Particles */}
                {particles.map((particle) => (
                  <div
                    key={particle.id}
                    className="absolute w-2 h-2 bg-black dark:bg-foreground rounded-full pointer-events-none"
                    style={{
                      left: particle.x - 4,
                      top: particle.y - 4,
                      transform: 'scale(0)',
                      animation: `particleFloat 2s ease-out forwards`,
                      animationDelay: `${particle.delay}s`
                    }}
                  />
                ))}
                
                {/* Mouse follower */}
                <div
                  className="absolute w-6 h-6 border-2 border-black/30 dark:border-foreground/30 rounded-full pointer-events-none"
                  style={{
                    left: mousePos.x - 12,
                    top: mousePos.y - 12,
                    transition: 'transform 0.1s ease-out'
                  }}
                />
              </div>
            </div>
          </section>

          {/* Feature Ideas */}
          <section className="mb-16 relative z-10">
            <h2 className="text-3xl font-serif font-semibold text-black dark:text-foreground mb-8 text-center">
              Cool Feature Ideas
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featureIdeas.map((feature, index) => (
                <div
                  key={index}
                  className="paper-card hover:scale-105 transition-transform duration-300 cursor-pointer group"
                  onClick={() => {
                    if (feature.demo && (feature as any).path) {
                      navigate((feature as any).path);
                    } else if (feature.demo) {
                      alert(`${feature.title} demo is shown above!`);
                    }
                  }}
                >
                  {feature.icon && (
                    <div className="mb-4 text-black dark:text-foreground group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                  )}
                  <h3 className="text-xl font-serif font-semibold text-black dark:text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-ink-gray dark:text-muted-foreground mb-4 font-serif">
                    {feature.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded border font-serif ${
                      feature.difficulty === 'Easy' 
                        ? 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700 text-green-800 dark:text-green-200'
                        : feature.difficulty === 'Medium'
                        ? 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200'
                        : feature.difficulty === 'Hard'
                        ? 'bg-orange-100 dark:bg-orange-900/30 border-orange-300 dark:border-orange-700 text-orange-800 dark:text-orange-200'
                        : 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700 text-red-800 dark:text-red-200'
                    }`}>
                      {feature.difficulty}
                    </span>
                    {feature.demo && (
                      <span className="text-xs text-black dark:text-foreground font-serif opacity-60">
                        {(feature as any).path ? 'View Demo →' : 'Demo Available'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Animation Tests */}
          <section className="relative z-10">
            <div className="paper-card">
              <h2 className="text-2xl font-serif font-semibold text-black dark:text-foreground mb-6">
                Animation Tests
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {/* Hover Animation */}
                <div className="p-6 border border-black/20 dark:border-border rounded-lg hover:border-black dark:hover:border-foreground transition-all duration-300 hover:shadow-lg">
                  <h3 className="text-lg font-serif font-semibold text-black dark:text-foreground mb-2">Hover Effect</h3>
                  <p className="text-sm text-ink-gray dark:text-muted-foreground font-serif">Hover over me!</p>
                </div>
                
                {/* Pulse Animation */}
                <div className="p-6 border border-black/20 dark:border-border rounded-lg animate-pulse">
                  <h3 className="text-lg font-serif font-semibold text-black dark:text-foreground mb-2">Pulse Effect</h3>
                  <p className="text-sm text-ink-gray dark:text-muted-foreground font-serif">Animated pulse</p>
                </div>
                
                {/* Bounce Animation */}
                <div className="p-6 border border-black/20 dark:border-border rounded-lg hover:animate-bounce">
                  <h3 className="text-lg font-serif font-semibold text-black dark:text-foreground mb-2">Bounce Effect</h3>
                  <p className="text-sm text-ink-gray dark:text-muted-foreground font-serif">Hover to bounce</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <style>{`
        @keyframes particleFloat {
          0% {
            transform: scale(0) translateY(0);
            opacity: 1;
          }
          100% {
            transform: scale(1) translateY(-50px);
            opacity: 0;
          }
        }
        
        .dark .particle-float {
          background: hsl(var(--foreground));
        }
      `}</style>
    </>
  );
};

export default Test;

