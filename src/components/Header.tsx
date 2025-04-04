
import React from 'react';
import { Clock } from 'lucide-react';

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
    <header className="bg-terminal-black px-4 py-2 flex items-center justify-between border-b border-terminal-black/80">
      <div className="flex items-center space-x-2">
        <h1 className="text-terminal-accent font-bold text-lg tracking-tight">CRYPTO BLOOM VISTA</h1>
        <span className="text-terminal-muted text-xs border-l border-terminal-muted/30 pl-2 ml-2">
          Market Overview
        </span>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <Clock size={14} className="text-terminal-muted" />
          <span className="text-terminal-text text-xs">{formattedDate}</span>
          <span className="text-terminal-accent text-xs font-semibold">{formattedTime}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
