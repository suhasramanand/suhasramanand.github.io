import React, { useEffect, useRef } from 'react';

interface SmokeEffectWrapperProps {
  children: React.ReactNode;
  color?: string;
}

const SmokeEffectWrapper: React.FC<SmokeEffectWrapperProps> = ({ children, color = '#000000' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current || !contentRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : { r: 155, g: 135, b: 245 };
    };

    const rgb = hexToRgb(color);

    const gridSize = 128;
    const cellSize = Math.max(canvas.width, canvas.height) / gridSize;
    const density: number[][] = [];
    const velocityX: number[][] = [];
    const velocityY: number[][] = [];

    for (let i = 0; i < gridSize; i++) {
      density[i] = [];
      velocityX[i] = [];
      velocityY[i] = [];
      for (let j = 0; j < gridSize; j++) {
        density[i][j] = 0;
        velocityX[i][j] = 0;
        velocityY[i][j] = 0;
      }
    }

    contentRef.current.style.opacity = '0';
    contentRef.current.style.visibility = 'hidden';

    let startTime = Date.now();
    const duration = 3000;
    let frameCount = 0;

    const addSmokeSource = (x: number, y: number, intensity: number, vx: number, vy: number) => {
      const gridX = Math.floor(x / cellSize);
      const gridY = Math.floor(y / cellSize);
      if (gridX >= 0 && gridX < gridSize && gridY >= 0 && gridY < gridSize) {
        density[gridX][gridY] = Math.min(density[gridX][gridY] + intensity, 1);
        velocityX[gridX][gridY] += vx;
        velocityY[gridX][gridY] += vy;
      }
    };

    const simulate = () => {
      const newDensity: number[][] = [];
      const newVelocityX: number[][] = [];
      const newVelocityY: number[][] = [];
      
      for (let i = 0; i < gridSize; i++) {
        newDensity[i] = [];
        newVelocityX[i] = [];
        newVelocityY[i] = [];
        for (let j = 0; j < gridSize; j++) {
          newDensity[i][j] = 0;
          newVelocityX[i][j] = 0;
          newVelocityY[i][j] = 0;
        }
      }
      
      for (let i = 1; i < gridSize - 1; i++) {
        for (let j = 1; j < gridSize - 1; j++) {
          const diffRate = 0.95;
          newDensity[i][j] = density[i][j] * diffRate + 
            (density[i+1][j] + density[i-1][j] + density[i][j+1] + density[i][j-1]) * (1 - diffRate) * 0.25;
          
          const vx = velocityX[i][j];
          const vy = velocityY[i][j];
          const sourceX = i - vx * 0.5;
          const sourceY = j - vy * 0.5;
          
          const x0 = Math.floor(sourceX);
          const y0 = Math.floor(sourceY);
          const x1 = x0 + 1;
          const y1 = y0 + 1;
          
          if (x0 >= 0 && x1 < gridSize && y0 >= 0 && y1 < gridSize) {
            const fx = sourceX - x0;
            const fy = sourceY - y0;
            
            newDensity[i][j] += density[x0][y0] * (1 - fx) * (1 - fy) * 0.3;
            newDensity[i][j] += density[x1][y0] * fx * (1 - fy) * 0.3;
            newDensity[i][j] += density[x0][y1] * (1 - fx) * fy * 0.3;
            newDensity[i][j] += density[x1][y1] * fx * fy * 0.3;
          }
          
          newVelocityX[i][j] = velocityX[i][j] * 0.98 + 
            (velocityX[i+1][j] + velocityX[i-1][j] + velocityX[i][j+1] + velocityX[i][j-1]) * 0.005;
          newVelocityY[i][j] = velocityY[i][j] * 0.98 + 
            (velocityY[i+1][j] + velocityY[i-1][j] + velocityY[i][j+1] + velocityY[i][j-1]) * 0.005;
        }
      }
      
      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          density[i][j] = newDensity[i][j];
          velocityX[i][j] = newVelocityX[i][j];
          velocityY[i][j] = newVelocityY[i][j];
        }
      }
    };

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      frameCount++;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (progress < 0.8) {
        const sourceY = canvas.height / 2;
        const intensity = 0.5 * (1 - progress * 0.8);
        
        for (let i = 0; i < 8; i++) {
          const offset = Math.sin(frameCount * 0.05 + i) * 50;
          const x = -100 + offset;
          const y = sourceY + (Math.random() - 0.5) * 300;
          const targetX = canvas.width / 2;
          const vx = (targetX - x) / 100;
          const vy = (Math.random() - 0.5) * 0.3;
          
          addSmokeSource(x, y, intensity, vx, vy);
        }
        
        for (let i = 0; i < 8; i++) {
          const offset = Math.sin(frameCount * 0.05 + i) * 50;
          const x = canvas.width + 100 - offset;
          const y = sourceY + (Math.random() - 0.5) * 300;
          const targetX = canvas.width / 2;
          const vx = (targetX - x) / 100;
          const vy = (Math.random() - 0.5) * 0.3;
          
          addSmokeSource(x, y, intensity, vx, vy);
        }
      }

      simulate();

      ctx.globalCompositeOperation = 'screen';
      ctx.save();
      
      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          const d = density[i][j] * (1 - progress * 1.3);
          if (d > 0.02) {
            const x = i * cellSize;
            const y = j * cellSize;
            const alpha = Math.min(d * 0.8, 0.9);
            const size = cellSize * 2;
            
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
            gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`);
            gradient.addColorStop(0.3, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha * 0.7})`);
            gradient.addColorStop(0.6, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha * 0.4})`);
            gradient.addColorStop(0.9, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha * 0.1})`);
            gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      
      ctx.restore();
      ctx.globalCompositeOperation = 'source-over';

      if (contentRef.current) {
        const revealStart = 0.3;
        const revealProgress = progress < revealStart 
          ? 0 
          : Math.min((progress - revealStart) / (1 - revealStart), 1);
        
        contentRef.current.style.opacity = String(revealProgress);
        if (revealProgress > 0.05) {
          contentRef.current.style.visibility = 'visible';
        }
      }

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (contentRef.current) {
          contentRef.current.style.opacity = '1';
          contentRef.current.style.visibility = 'visible';
        }
      }
    };

    setTimeout(() => {
      animate();
    }, 100);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [color]);

  return (
    <div ref={containerRef} className="relative w-full">
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{ zIndex: 5 }}
      />
      <div 
        ref={contentRef} 
        className="relative"
        style={{ zIndex: 20 }}
      >
        {children}
      </div>
    </div>
  );
};

export default SmokeEffectWrapper;
