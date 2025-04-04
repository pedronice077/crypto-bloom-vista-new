
import React, { useState } from 'react';
import Header from '@/components/Header';
import { useLazyLoad } from '@/hooks/useLazyLoad';
import { useTheme } from '@/contexts/ThemeContext';
import Portfolio from '@/components/Portfolio';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Lazy load components for better performance
const CryptoHeatMap = useLazyLoad(
  () => import('@/components/CryptoHeatMap'),
  'h-80'
);

const FearAndGreedIndex = useLazyLoad(
  () => import('@/components/FearAndGreedIndex'),
  'h-80'
);

const MarketStats = useLazyLoad(
  () => import('@/components/MarketStats'),
  'h-32'
);

const TopMovers = useLazyLoad(
  () => import('@/components/TopMovers'),
  'h-80'
);

const CryptoNews = useLazyLoad(
  () => import('@/components/CryptoNews'),
  'h-80'
);

const Index = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("all");
  
  return (
    <div className="min-h-screen flex flex-col bg-terminal-dark bg-[radial-gradient(ellipse_at_top_right,rgba(155,135,245,0.15),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(214,188,250,0.1),transparent_50%)]">
      <Header />
      
      <main className="flex-1 p-3 md:p-6 space-y-6">
        <div className="relative">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-terminal-purple/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-terminal-purple/10 rounded-full blur-3xl"></div>
          
          <Portfolio />
        </div>
        
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-4">
            <TabsList className="bg-terminal-black/30 border border-terminal-purple/20">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="markets">Markets</TabsTrigger>
              <TabsTrigger value="news">News</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="space-y-6 animate-fade-in">
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
          </TabsContent>
          
          <TabsContent value="markets" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <CryptoHeatMap />
              </div>
              <div>
                <FearAndGreedIndex />
              </div>
            </div>
            
            <div className="bg-bloom-gradient rounded-2xl p-0.5">
              <MarketStats />
            </div>
            
            <div>
              <TopMovers />
            </div>
          </TabsContent>
          
          <TabsContent value="news" className="space-y-6 animate-fade-in">
            <CryptoNews />
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="bg-terminal-black text-terminal-muted text-xs px-4 py-3 text-center border-t border-terminal-purple/20">
        <span className="text-terminal-purple">Crypto Bloom Vista</span> • Market data for informational purposes only
      </footer>
    </div>
  );
};

export default Index;
