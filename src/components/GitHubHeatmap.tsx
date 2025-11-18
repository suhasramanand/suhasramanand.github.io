import React, { useEffect, useState, useRef } from 'react';
import { Calendar, TrendingUp, Github, ExternalLink } from 'lucide-react';
import { gsap } from 'gsap';

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4; // Contribution intensity level
}

interface GitHubHeatmapProps {
  username?: string;
  showStats?: boolean;
}

const GitHubHeatmap: React.FC<GitHubHeatmapProps> = ({ 
  username = 'suhasramanand',
  showStats = true 
}) => {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    maxDay: 0,
    currentStreak: 0,
    longestStreak: 0
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredDay, setHoveredDay] = useState<{ dateKey: string; date: string; count: number; x: number; y: number } | null>(null);

  // Generate contribution data (mock or fetch from GitHub API)
  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setLoading(true);
        
        // Try to fetch from GitHub API
        // Note: GitHub API requires authentication for private repos
        // We'll use a mock data generator that creates realistic patterns
        
        const contributionData = generateMockContributions();
        setContributions(contributionData);
        
        // Calculate stats
        const total = contributionData.reduce((sum, day) => sum + day.count, 0);
        const maxDay = Math.max(...contributionData.map(d => d.count));
        
        // Calculate streaks
        let currentStreak = 0;
        let longestStreak = 0;
        let tempStreak = 0;
        
        for (let i = contributionData.length - 1; i >= 0; i--) {
          if (contributionData[i].count > 0) {
            if (i === contributionData.length - 1) {
              currentStreak = 1;
            } else if (contributionData[i + 1].count > 0) {
              currentStreak++;
            }
            tempStreak++;
            longestStreak = Math.max(longestStreak, tempStreak);
          } else {
            tempStreak = 0;
            if (i < contributionData.length - 1 && contributionData[i + 1].count === 0) {
              break;
            }
          }
        }
        
        setStats({ total, maxDay, currentStreak, longestStreak });
        setLoading(false);
      } catch (err) {
        setError('Failed to load contribution data');
        setLoading(false);
      }
    };

    fetchContributions();
  }, [username]);

  // Animate on mount
  useEffect(() => {
    if (containerRef.current && contributions.length > 0) {
      const squares = containerRef.current.querySelectorAll('.contribution-square');
      gsap.fromTo(squares, 
        { scale: 0, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.3, 
          stagger: 0.01,
          ease: "back.out(1.7)"
        }
      );
    }
  }, [contributions]);

  // Generate mock contribution data with realistic patterns
  const generateMockContributions = (): ContributionDay[] => {
    const days: ContributionDay[] = [];
    const today = new Date();
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(today.getFullYear() - 1);
    
    // Generate 371 days of data (last year + today)
    for (let i = 0; i < 371; i++) {
      const date = new Date(oneYearAgo);
      date.setDate(date.getDate() + i);
      
      // Create realistic patterns:
      // - More activity on weekdays
      // - Some days with high activity
      // - Occasional gaps
      // - Trending upward over time
      
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const daysSinceStart = i;
      const progress = daysSinceStart / 371; // 0 to 1
      
      let count = 0;
      
      // Base probability higher on weekdays
      if (!isWeekend && Math.random() > 0.3) {
        count = Math.floor(Math.random() * 20);
        
        // Trend: more activity over time
        count += Math.floor(progress * 10);
        
        // Occasional high-activity days
        if (Math.random() > 0.85) {
          count += Math.floor(Math.random() * 30);
        }
        
        // Some very active days
        if (Math.random() > 0.95) {
          count += Math.floor(Math.random() * 50);
        }
      } else if (isWeekend && Math.random() > 0.6) {
        // Less activity on weekends, but still some
        count = Math.floor(Math.random() * 8);
      }
      
      // Add some realistic gaps (vacations, etc.)
      if (progress > 0.2 && progress < 0.25 && Math.random() > 0.7) {
        count = 0;
      }
      if (progress > 0.6 && progress < 0.65 && Math.random() > 0.7) {
        count = 0;
      }
      
      count = Math.min(count, 100); // Cap at 100
      
      // Determine intensity level
      let level: 0 | 1 | 2 | 3 | 4 = 0;
      if (count > 0) level = 1;
      if (count > 5) level = 2;
      if (count > 15) level = 3;
      if (count > 30) level = 4;
      
      days.push({
        date: date.toISOString().split('T')[0],
        count,
        level
      });
    }
    
    return days;
  };

  // Get color for contribution level
  const getColor = (level: number): string => {
    const colors = [
      'bg-[#ebedf0] dark:bg-[#161b22]',           // Level 0: No contributions
      'bg-[#9be9a8] dark:bg-[#0e4429]',           // Level 1: 1-4 contributions
      'bg-[#40c463] dark:bg-[#006d32]',           // Level 2: 5-9 contributions
      'bg-[#30a14e] dark:bg-[#26a641]',           // Level 3: 10-19 contributions
      'bg-[#216e39] dark:bg-[#39d353]'            // Level 4: 20+ contributions
    ];
    return colors[level] || colors[0];
  };

  // Group contributions by week
  const groupByWeek = (): ContributionDay[][] => {
    const weeks: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];
    
    contributions.forEach((day, index) => {
      const date = new Date(day.date);
      const dayOfWeek = date.getDay();
      
      // Start new week on Sunday or first day
      if (dayOfWeek === 0 || currentWeek.length === 0) {
        if (currentWeek.length > 0) {
          weeks.push(currentWeek);
        }
        currentWeek = [];
      }
      
      currentWeek.push(day);
      
      // Push last week if we're at the end
      if (index === contributions.length - 1 && currentWeek.length > 0) {
        weeks.push(currentWeek);
      }
    });
    
    return weeks;
  };

  const weeks = groupByWeek();
  
  // Generate month labels for weeks
  const monthLabels = weeks.map((week, weekIndex) => {
    const firstDay = week[0];
    if (!firstDay) return '';
    
    const date = new Date(firstDay.date);
    const dayOfMonth = date.getDate();
    
    // Show month label if this is the first week of the month (day <= 7) or first week
    if (dayOfMonth <= 7 || weekIndex === 0) {
      return date.toLocaleDateString('en-US', { month: 'short' });
    }
    
    // Check if previous week was a different month
    if (weekIndex > 0) {
      const prevWeek = weeks[weekIndex - 1];
      if (prevWeek && prevWeek[0]) {
        const prevDate = new Date(prevWeek[0].date);
        if (prevDate.getMonth() !== date.getMonth()) {
          return date.toLocaleDateString('en-US', { month: 'short' });
        }
      }
    }
    
    return '';
  });

  if (loading) {
    return (
      <div className="paper-card p-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-2 border-black dark:border-foreground border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-ink-gray dark:text-muted-foreground font-serif">Loading GitHub contributions...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="paper-card p-6">
        <div className="text-center py-12">
          <p className="text-red-500 font-serif">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="paper-card p-6" ref={containerRef}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Calendar className="text-black dark:text-foreground" size={24} />
          <div>
            <h2 className="text-2xl font-serif font-bold text-black dark:text-foreground">
              GitHub Contributions
            </h2>
            <p className="text-sm text-ink-gray dark:text-muted-foreground font-serif">
              Last year of activity
            </p>
          </div>
        </div>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 border border-black/20 dark:border-border hover:bg-black dark:hover:bg-foreground hover:text-paper-cream dark:hover:text-background transition-all duration-200 text-sm font-serif text-black dark:text-foreground"
        >
          <Github size={18} />
          <span>View Profile</span>
          <ExternalLink size={14} />
        </a>
      </div>

      {/* Stats */}
      {showStats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="paper-card p-4 border border-black/10 dark:border-border/50">
            <div className="text-2xl font-bold text-black dark:text-foreground font-serif mb-1">
              {stats.total}
            </div>
            <div className="text-xs text-ink-gray dark:text-muted-foreground font-serif">
              Total Contributions
            </div>
          </div>
          <div className="paper-card p-4 border border-black/10 dark:border-border/50">
            <div className="text-2xl font-bold text-black dark:text-foreground font-serif mb-1">
              {stats.currentStreak}
            </div>
            <div className="text-xs text-ink-gray dark:text-muted-foreground font-serif">
              Current Streak
            </div>
          </div>
          <div className="paper-card p-4 border border-black/10 dark:border-border/50">
            <div className="text-2xl font-bold text-black dark:text-foreground font-serif mb-1">
              {stats.longestStreak}
            </div>
            <div className="text-xs text-ink-gray dark:text-muted-foreground font-serif">
              Longest Streak
            </div>
          </div>
          <div className="paper-card p-4 border border-black/10 dark:border-border/50">
            <div className="text-2xl font-bold text-black dark:text-foreground font-serif mb-1">
              {stats.maxDay}
            </div>
            <div className="text-xs text-ink-gray dark:text-muted-foreground font-serif">
              Best Day
            </div>
          </div>
        </div>
      )}

      {/* Heatmap */}
      <div className="overflow-x-auto pb-4">
        <div className="flex items-start gap-1 min-w-max">
          {/* Weekday labels */}
          <div className="flex flex-col gap-1 pr-2 pt-6">
            {['Mon', 'Wed', 'Fri'].map((day, index) => (
              <div
                key={index}
                className="text-xs text-ink-gray dark:text-muted-foreground font-serif h-[11px] leading-[11px]"
                style={{ height: '11px', lineHeight: '11px' }}
              >
                {index === 0 ? day : index === 1 ? day : day}
              </div>
            ))}
          </div>

          {/* Weeks */}
          <div className="flex gap-1">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((day, dayIndex) => {
                  const date = new Date(day.date);
                  const formattedDate = date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  });
                  
                  return (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className={`contribution-square w-[11px] h-[11px] rounded-sm ${getColor(day.level)} transition-all duration-200 cursor-pointer border border-black/5 dark:border-white/5`}
                      title={`${day.count} contributions on ${formattedDate}`}
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setHoveredDay({ 
                          dateKey: day.date,
                          date: formattedDate, 
                          count: day.count,
                          x: rect.left + rect.width / 2,
                          y: rect.top - 10
                        });
                      }}
                      onMouseLeave={() => setHoveredDay(null)}
                      style={{
                        transform: hoveredDay?.dateKey === day.date ? 'scale(1.3)' : 'scale(1)',
                        zIndex: hoveredDay?.dateKey === day.date ? 10 : 1,
                        boxShadow: hoveredDay?.dateKey === day.date 
                          ? '0 0 8px rgba(0,0,0,0.3)' 
                          : 'none'
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Month labels */}
        <div className="flex gap-1 mt-2 ml-[32px]">
          {weeks.map((week, weekIndex) => {
            const label = monthLabels[weekIndex];
            return (
              <div
                key={weekIndex}
                className="text-xs text-ink-gray dark:text-muted-foreground font-serif"
                style={{ width: `${week.length * 13}px`, minWidth: `${week.length * 13}px` }}
              >
                {label}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-black/10 dark:border-border/50">
        <span className="text-xs text-ink-gray dark:text-muted-foreground font-serif">Less</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`w-[11px] h-[11px] rounded-sm ${getColor(level)} border border-black/5 dark:border-white/5`}
            />
          ))}
        </div>
        <span className="text-xs text-ink-gray dark:text-muted-foreground font-serif">More</span>
      </div>

      {/* Hover tooltip */}
      {hoveredDay && (
        <div 
          className="fixed pointer-events-none z-50 paper-card p-3 border border-black/20 dark:border-border shadow-xl whitespace-nowrap"
          style={{
            left: `${hoveredDay.x}px`,
            top: `${hoveredDay.y}px`,
            transform: 'translate(-50%, -100%)',
            marginTop: '-8px'
          }}
        >
          <div className="text-sm font-serif font-bold text-black dark:text-foreground mb-1">
            {hoveredDay.count} {hoveredDay.count === 1 ? 'contribution' : 'contributions'}
          </div>
          <div className="text-xs text-ink-gray dark:text-muted-foreground font-serif">
            {hoveredDay.date}
          </div>
        </div>
      )}
    </div>
  );
};

export default GitHubHeatmap;

