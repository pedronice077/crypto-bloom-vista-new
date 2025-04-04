
import React from 'react';
import Header from '@/components/Header';
import CryptoHeatMap from '@/components/CryptoHeatMap';
import FearAndGreedIndex from '@/components/FearAndGreedIndex';
import MarketStats from '@/components/MarketStats';
import TopMovers from '@/components/TopMovers';
import CryptoNews from '@/components/CryptoNews';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-terminal-dark">
      <Header />
      
      <main className="flex-1 p-3 md:p-4 space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <CryptoHeatMap />
          </div>
          <div>
            <FearAndGreedIndex />
          </div>
        </div>
        
        <MarketStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <CryptoNews />
          </div>
          <div>
            <TopMovers />
          </div>
        </div>
      </main>
      
      <footer className="bg-terminal-black text-terminal-muted text-xs px-4 py-2 text-center">
        Crypto Bloom Vista • Market data for informational purposes only
      </footer>
    </div>
  );
};

export default Index;
