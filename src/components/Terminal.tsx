import React, { ReactNode } from 'react';

interface TerminalProps {
  children: ReactNode;
  prompt?: string;
  showCursor?: boolean;
  className?: string;
}

const Terminal: React.FC<TerminalProps> = ({ 
  children, 
  prompt = '$',
  showCursor = true,
  className = ''
}) => {
  return (
    <div className={`terminal-container ${className}`}>
      {/* Terminal Window */}
      <div className="terminal-window">
        {/* Terminal Header */}
        <div className="terminal-header">
          <div className="terminal-buttons">
            <div className="terminal-button terminal-button-close"></div>
            <div className="terminal-button terminal-button-minimize"></div>
            <div className="terminal-button terminal-button-maximize"></div>
          </div>
          <div className="terminal-title">Terminal</div>
          <div className="terminal-spacer"></div>
        </div>
        
        {/* Terminal Body */}
        <div className="terminal-body">
          <div className="terminal-content">
            <span className="terminal-prompt">{prompt}</span>
            <span className="terminal-text">{children}</span>
            {showCursor && (
              <span 
                className="terminal-cursor"
                style={{ animation: 'blink 1s infinite' }}
              >
                ▊
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;

