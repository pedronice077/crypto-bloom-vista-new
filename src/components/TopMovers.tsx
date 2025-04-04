
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface Mover {
  symbol: string;
  price: number;
  change24h: number;
}

const topGainers: Mover[] = [
  { symbol: 'OP', price: 2.87, change24h: 7.3 },
  { symbol: 'LINK', price: 16.42, change24h: 6.2 },
  { symbol: 'ARB', price: 1.18, change24h: 5.2 },
  { symbol: 'SOL', price: 142.78, change24h: 5.1 },
  { symbol: 'TON', price: 5.71, change24h: 4.8 }
];

const topLosers: Mover[] = [
  { symbol: 'APE', price: 1.42, change24h: -3.1 },
  { symbol: 'DOGE', price: 0.1324, change24h: -2.1 },
  { symbol: 'MATIC', price: 0.61, change24h: -1.5 },
  { symbol: 'XRP', price: 0.5124, change24h: -1.2 },
  { symbol: 'SHIB', price: 0.000021, change24h: -0.9 }
];

const TopMovers = () => {
  return (
    <div className="terminal-panel">
      <div className="terminal-header">
        <div>Top Movers (24h)</div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3">
        <div>
          <div className="flex items-center gap-1 mb-2 text-terminal-green">
            <TrendingUp size={14} />
            <span className="text-sm font-semibold">Top Gainers</span>
          </div>
          
          <div className="space-y-1">
            {topGainers.map((coin) => (
              <div key={coin.symbol} className="bg-terminal-black/30 rounded p-2 flex justify-between items-center">
                <div className="font-medium">{coin.symbol}</div>
                <div className="flex items-center">
                  <div className="text-sm mr-3">${coin.price < 1 ? coin.price.toFixed(4) : coin.price.toFixed(2)}</div>
                  <div className="bg-terminal-green/20 text-terminal-green text-xs px-2 py-0.5 rounded">
                    +{coin.change24h}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex items-center gap-1 mb-2 text-terminal-red">
            <TrendingDown size={14} />
            <span className="text-sm font-semibold">Top Losers</span>
          </div>
          
          <div className="space-y-1">
            {topLosers.map((coin) => (
              <div key={coin.symbol} className="bg-terminal-black/30 rounded p-2 flex justify-between items-center">
                <div className="font-medium">{coin.symbol}</div>
                <div className="flex items-center">
                  <div className="text-sm mr-3">${coin.price < 1 ? coin.price.toFixed(4) : coin.price.toFixed(2)}</div>
                  <div className="bg-terminal-red/20 text-terminal-red text-xs px-2 py-0.5 rounded">
                    {coin.change24h}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopMovers;
