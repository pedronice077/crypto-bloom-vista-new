
import React from 'react';
import { ChartBar, TrendingUp, TrendingDown, CirclePercent, CircleDollarSign } from 'lucide-react';

const stats = [
  { 
    name: 'Global Market Cap', 
    value: '$2.43T', 
    change: '+2.1%', 
    isPositive: true,
    icon: <CircleDollarSign size={14} className="text-terminal-muted" />
  },
  { 
    name: 'BTC Dominance', 
    value: '51.2%', 
    change: '-0.3%', 
    isPositive: false,
    icon: <CirclePercent size={14} className="text-terminal-muted" />
  },
  { 
    name: 'Top Gainer', 
    value: 'OP', 
    change: '+7.3%', 
    isPositive: true,
    icon: <TrendingUp size={14} className="text-terminal-muted" />
  },
  { 
    name: 'Top Loser', 
    value: 'APE', 
    change: '-3.1%', 
    isPositive: false,
    icon: <TrendingDown size={14} className="text-terminal-muted" />
  }
];

const MarketStats = () => {
  return (
    <div className="terminal-panel">
      <div className="terminal-header">
        <div className="flex items-center gap-1">
          <ChartBar size={14} />
          <span>Market Stats</span>
        </div>
        <div className="text-terminal-muted text-xs">Updated 2 min ago</div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3">
        {stats.map((stat, index) => (
          <div key={index} className="bg-terminal-black/50 rounded p-2">
            <div className="flex items-center gap-1 text-xs text-terminal-muted mb-1">
              {stat.icon}
              <span>{stat.name}</span>
            </div>
            <div className="font-semibold">{stat.value}</div>
            <div className={stat.isPositive ? 'positive-value text-xs' : 'negative-value text-xs'}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketStats;
