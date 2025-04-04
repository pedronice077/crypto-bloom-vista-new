
import React from 'react';
import { Smile, Frown, Heart } from 'lucide-react';

// Mock data for the Fear & Greed Index
const fearGreedData = {
  currentValue: 65,
  previousValue: 55,
  status: "Greed",
  history: [45, 42, 38, 41, 45, 51, 53, 58, 60, 65],
};

const FearAndGreedIndex = () => {
  const getStatusInfo = (value: number) => {
    if (value >= 75) return { status: "Extreme Greed", color: "text-green-500", icon: <Smile className="text-green-500" size={18} /> };
    if (value >= 55) return { status: "Greed", color: "text-green-400", icon: <Smile className="text-green-400" size={18} /> };
    if (value >= 45) return { status: "Neutral", color: "text-yellow-400", icon: <Heart className="text-yellow-400" size={18} /> };
    if (value >= 25) return { status: "Fear", color: "text-orange-400", icon: <Frown className="text-orange-400" size={18} /> };
    return { status: "Extreme Fear", color: "text-red-500", icon: <Frown className="text-red-500" size={18} /> };
  };

  const statusInfo = getStatusInfo(fearGreedData.currentValue);
  
  const percentageToDegrees = (percentage: number) => {
    return (percentage / 100) * 180;
  };

  const needleRotation = percentageToDegrees(fearGreedData.currentValue);

  return (
    <div className="terminal-panel">
      <div className="terminal-header">
        <div>Fear & Greed Index</div>
        <div className="flex items-center gap-1">
          {statusInfo.icon}
          <span className={statusInfo.color}>{statusInfo.status}</span>
        </div>
      </div>
      
      <div className="p-3 flex flex-col items-center">
        <div className="relative w-full max-w-[250px] h-[125px] overflow-hidden">
          {/* Gauge Background */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-full rounded-t-full bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 opacity-20"></div>
          </div>
          
          {/* Gauge Needle */}
          <div className="absolute bottom-0 left-1/2 h-[125px] w-1 -translate-x-1/2 origin-bottom" style={{ transform: `rotate(${needleRotation - 90}deg)` }}>
            <div className="absolute top-0 left-1/2 w-1 h-[120px] -translate-x-1/2 bg-terminal-accent rounded"></div>
            <div className="absolute top-0 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full border-2 border-terminal-accent"></div>
          </div>
          
          {/* Gauge Labels */}
          <div className="absolute bottom-0 left-0 w-full flex justify-between px-4 text-xs text-terminal-muted">
            <span>Extreme<br/>Fear</span>
            <span className="absolute left-1/2 -translate-x-1/2 bottom-0">Neutral</span>
            <span>Extreme<br/>Greed</span>
          </div>
        </div>
        
        <div className="w-full mt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">{fearGreedData.currentValue}</span>
            <div className="flex items-center">
              <span className="text-xs text-terminal-muted mr-1">Yesterday:</span>
              <span className="text-sm">{fearGreedData.previousValue}</span>
              <span className={fearGreedData.currentValue > fearGreedData.previousValue ? 'text-terminal-green ml-1' : 'text-terminal-red ml-1'}>
                ({fearGreedData.currentValue > fearGreedData.previousValue ? '+' : ''}{fearGreedData.currentValue - fearGreedData.previousValue})
              </span>
            </div>
          </div>
          
          <div className="flex items-end h-12 gap-0.5 mt-3">
            {fearGreedData.history.map((value, index) => {
              const height = `${(value / 100) * 100}%`;
              return (
                <div 
                  key={index} 
                  className="flex-1 bg-terminal-accent/30 hover:bg-terminal-accent/50 transition-all"
                  style={{ height }}
                >
                </div>
              );
            })}
          </div>
          
          <div className="text-xs text-terminal-muted mt-1">10-day trend</div>
        </div>
      </div>
    </div>
  );
};

export default FearAndGreedIndex;
