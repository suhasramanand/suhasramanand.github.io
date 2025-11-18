import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import CrazyMenu from '@/components/CrazyMenu';
import AnimatedBackground from '@/components/AnimatedBackground';
import GitHubHeatmap from '@/components/GitHubHeatmap';

const GitHubHeatmapPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <AnimatedBackground />
      <CrazyMenu />
      
      <main className="relative min-h-screen pt-20 pb-16">
        <div className="section-container">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate('/test')}
              className="flex items-center gap-2 px-4 py-2 border border-black/20 dark:border-border hover:bg-black dark:hover:bg-foreground hover:text-paper-cream dark:hover:text-background transition-all duration-200 font-serif text-sm text-black dark:text-foreground mb-6"
            >
              <Home size={18} />
              <span>Back to Test Lab</span>
            </button>
            
            <div className="mb-6">
              <h1 className="text-4xl sm:text-5xl font-serif font-bold text-black dark:text-foreground mb-2">
                GitHub Contribution Heatmap
              </h1>
              <p className="text-lg text-ink-gray dark:text-muted-foreground font-serif">
                Visualize GitHub activity over the past year
              </p>
            </div>
          </div>

          {/* GitHub Heatmap Component */}
          <GitHubHeatmap username="suhasramanand" showStats={true} />
        </div>
      </main>
    </>
  );
};

export default GitHubHeatmapPage;

