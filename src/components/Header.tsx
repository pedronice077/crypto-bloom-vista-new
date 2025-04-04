
import React from 'react';
import { Clock, Sparkles } from 'lucide-react';

const Header = () => {
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  return (
    <header className="bg-terminal-black/70 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-terminal-purple/20 sticky top-0 z-10">
      <div className="flex items-center space-x-2">
        <div className="flex items-center gap-1.5">
          <Sparkles size={18} className="text-terminal-purple animate-pulse-slow" />
          <h1 className="text-terminal-purple font-bold text-lg tracking-tight">CRYPTO BLOOM VISTA</h1>
        </div>
        <span className="text-terminal-muted text-xs border-l border-terminal-purple/30 pl-2 ml-2">
          Market Overview
        </span>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1 bg-terminal-darker/50 px-2.5 py-1 rounded-full border border-terminal-purple/20">
          <Clock size={14} className="text-terminal-purple" />
          <span className="text-terminal-text text-xs">{formattedDate}</span>
          <span className="text-terminal-purple text-xs font-semibold">{formattedTime}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
