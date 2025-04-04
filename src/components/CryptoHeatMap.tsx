
import React from 'react';
import { useMemo } from 'react';

interface CryptoCoin {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  marketCap: number;
}

const mockCoins: CryptoCoin[] = [
  { symbol: 'BTC', name: 'Bitcoin', price: 64321.45, change24h: 2.4, marketCap: 1254000000000 },
  { symbol: 'ETH', name: 'Ethereum', price: 3472.91, change24h: 1.8, marketCap: 415000000000 },
  { symbol: 'SOL', name: 'Solana', price: 142.78, change24h: 5.1, marketCap: 61500000000 },
  { symbol: 'BNB', name: 'Binance Coin', price: 562.32, change24h: -0.7, marketCap: 86200000000 },
  { symbol: 'XRP', name: 'XRP', price: 0.5124, change24h: -1.2, marketCap: 27800000000 },
  { symbol: 'ADA', name: 'Cardano', price: 0.4521, change24h: 0.3, marketCap: 16100000000 },
  { symbol: 'DOGE', name: 'Dogecoin', price: 0.1324, change24h: -2.1, marketCap: 18700000000 },
  { symbol: 'DOT', name: 'Polkadot', price: 6.78, change24h: 1.4, marketCap: 9800000000 },
  { symbol: 'AVAX', name: 'Avalanche', price: 35.21, change24h: 3.7, marketCap: 12700000000 },
  { symbol: 'SHIB', name: 'Shiba Inu', price: 0.000021, change24h: -0.9, marketCap: 12400000000 },
  { symbol: 'LINK', name: 'Chainlink', price: 16.42, change24h: 6.2, marketCap: 9700000000 },
  { symbol: 'MATIC', name: 'Polygon', price: 0.61, change24h: -1.5, marketCap: 6100000000 },
  { symbol: 'UNI', name: 'Uniswap', price: 7.32, change24h: 1.1, marketCap: 5600000000 },
  { symbol: 'ATOM', name: 'Cosmos', price: 8.15, change24h: 2.6, marketCap: 3100000000 },
  { symbol: 'OP', name: 'Optimism', price: 2.87, change24h: 7.3, marketCap: 2800000000 },
  { symbol: 'ARB', name: 'Arbitrum', price: 1.18, change24h: 5.2, marketCap: 3200000000 },
  { symbol: 'APE', name: 'ApeCoin', price: 1.42, change24h: -3.1, marketCap: 1700000000 },
  { symbol: 'LTC', name: 'Litecoin', price: 72.14, change24h: -0.4, marketCap: 5300000000 },
  { symbol: 'FIL', name: 'Filecoin', price: 4.82, change24h: 2.9, marketCap: 2400000000 },
  { symbol: 'TON', name: 'Toncoin', price: 5.71, change24h: 4.8, marketCap: 19700000000 }
];

const CryptoHeatMap = () => {
  const getColorClass = (change24h: number) => {
    if (change24h > 4) return 'bg-green-500/90';
    if (change24h > 2) return 'bg-green-500/70';
    if (change24h > 0) return 'bg-green-500/50';
    if (change24h === 0) return 'bg-gray-500/50';
    if (change24h > -2) return 'bg-red-500/50';
    if (change24h > -4) return 'bg-red-500/70';
    return 'bg-red-500/90';
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`;
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
    return `$${marketCap.toFixed(2)}`;
  };

  const sortedCoins = useMemo(() => {
    return [...mockCoins].sort((a, b) => b.marketCap - a.marketCap);
  }, []);

  return (
    <div className="terminal-panel">
      <div className="terminal-header">
        <div>Crypto Heat Map</div>
        <div className="text-terminal-accent">Market Cap Weighted</div>
      </div>
      
      <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-1 p-1">
        {sortedCoins.map((coin) => (
          <div 
            key={coin.symbol}
            className={`terminal-panel ${getColorClass(coin.change24h)} p-2 transition-all hover:scale-105`}
            style={{
              width: '100%', 
              aspectRatio: '1/1'
            }}
          >
            <div className="flex flex-col h-full justify-between">
              <div className="flex justify-between items-start">
                <span className="font-bold">{coin.symbol}</span>
                <span className={coin.change24h >= 0 ? 'positive-value' : 'negative-value'}>
                  {coin.change24h > 0 ? '+' : ''}{coin.change24h}%
                </span>
              </div>
              
              <div className="mt-auto">
                <div className="text-xs truncate opacity-70">{coin.name}</div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs opacity-70">${coin.price < 1 ? coin.price.toFixed(4) : coin.price.toFixed(2)}</span>
                  <span className="text-xs opacity-50">{formatMarketCap(coin.marketCap)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoHeatMap;
