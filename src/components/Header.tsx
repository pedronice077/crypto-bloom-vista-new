
import React from 'react';
import { Clock, Sparkles, Moon, Sun, Search } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Header = () => {
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const [showSearch, setShowSearch] = React.useState(false);
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = React.useState('');

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality here
  };

  return (
    <header className="bg-terminal-black/70 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-terminal-purple/20 sticky top-0 z-10">
      <div className="flex items-center space-x-2">
        <div className="flex items-center gap-1.5">
          <Sparkles size={18} className="text-terminal-purple animate-pulse-slow" />
          <h1 className="text-terminal-purple font-bold text-lg tracking-tight">CRYPTO BLOOM VISTA</h1>
        </div>
        <span className="text-terminal-muted text-xs border-l border-terminal-purple/30 pl-2 ml-2 hidden md:inline">
          Market Overview
        </span>
      </div>

      <div className="flex items-center space-x-2">
        {showSearch ? (
          <form onSubmit={handleSearch} className="relative flex items-center">
            <Input
              type="text"
              placeholder="Search coins..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-terminal-darker/50 border-terminal-purple/20 text-xs w-[180px] md:w-[220px]"
            />
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="absolute right-1 h-6 w-6"
              onClick={() => setShowSearch(false)}
            >
              ×
            </Button>
          </form>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => setShowSearch(true)}
          >
            <Search size={16} className="text-terminal-muted" />
          </Button>
        )}
        
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? <Sun size={16} className="text-terminal-muted" /> : <Moon size={16} className="text-terminal-muted" />}
        </Button>

        <div className="flex items-center space-x-1 bg-terminal-darker/50 px-2.5 py-1 rounded-full border border-terminal-purple/20">
          <Clock size={14} className="text-terminal-purple" />
          <span className="text-terminal-text text-xs hidden sm:inline">{formattedDate}</span>
          <span className="text-terminal-purple text-xs font-semibold">{formattedTime}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
