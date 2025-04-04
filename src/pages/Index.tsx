
import React from 'react';
import Header from '@/components/Header';
import CryptoHeatMap from '@/components/CryptoHeatMap';
import FearAndGreedIndex from '@/components/FearAndGreedIndex';
import MarketStats from '@/components/MarketStats';
import TopMovers from '@/components/TopMovers';
import CryptoNews from '@/components/CryptoNews';
import Portfolio from '@/components/Portfolio';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-terminal-dark bg-[radial-gradient(ellipse_at_top_right,rgba(155,135,245,0.15),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(214,188,250,0.1),transparent_50%)]">
      <Header />
      
      <main className="flex-1 p-3 md:p-6 space-y-6">
        <div className="relative">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-terminal-purple/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-terminal-purple/10 rounded-full blur-3xl"></div>
          
          <Portfolio />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CryptoHeatMap />
          </div>
          <div className="animate-bloom-float">
            <FearAndGreedIndex />
          </div>
        </div>
        
        <div className="bg-bloom-gradient rounded-2xl p-0.5">
          <MarketStats />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CryptoNews />
          </div>
          <div>
            <TopMovers />
          </div>
        </div>
      </main>
      
      <footer className="bg-terminal-black text-terminal-muted text-xs px-4 py-3 text-center border-t border-terminal-purple/20">
        <span className="text-terminal-purple">Crypto Bloom Vista</span> • Market data for informational purposes only
      </footer>
    </div>
  );
};

export default Index;
