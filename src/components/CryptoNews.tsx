
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Newspaper, ExternalLink, ArrowUpRight } from 'lucide-react';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

// Mock news data - in a real app, this would come from an API
const mockNews = [
  {
    id: 1,
    title: "Bitcoin Breaks $60,000 Barrier as Institutional Adoption Increases",
    source: "CryptoWire",
    time: "2 hours ago",
    url: "#"
  },
  {
    id: 2,
    title: "Ethereum 2.0 Upgrade Set to Launch Next Month, Promises Lower Gas Fees",
    source: "BlockchainNews",
    time: "4 hours ago",
    url: "#"
  },
  {
    id: 3,
    title: "SEC Commissioner Hints at Potential Approval of Spot Ethereum ETFs",
    source: "CryptoDaily",
    time: "6 hours ago",
    url: "#"
  },
  {
    id: 4,
    title: "Major Bank Announces Crypto Custody Services for Institutional Clients",
    source: "FinanceToday",
    time: "8 hours ago",
    url: "#"
  },
  {
    id: 5,
    title: "Solana Network Experiences Record Transaction Volume, Price Surges",
    source: "CoinReporter",
    time: "10 hours ago",
    url: "#"
  }
];

const CryptoNews = () => {
  const [news, setNews] = useState(mockNews);
  const [isLoading, setIsLoading] = useState(false);

  // In a real implementation, you would fetch live news from an API
  // Example commented out since we're using mock data for now
  /*
  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        // Replace with your actual API endpoint
        const response = await fetch('https://api.example.com/crypto/news');
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
    // Set up polling for live updates every 5 minutes
    const interval = setInterval(fetchNews, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);
  */

  return (
    <div className="terminal-panel">
      <div className="terminal-header">
        <div className="flex items-center gap-1">
          <Newspaper size={14} />
          <span>Crypto News</span>
        </div>
        <div className="text-terminal-muted text-xs">Live Updates</div>
      </div>
      
      <div className="p-0">
        <Card className="border-0 bg-transparent shadow-none">
          <CardContent className="p-0">
            <Table>
              <TableBody>
                {news.map((item) => (
                  <TableRow 
                    key={item.id} 
                    className="border-b border-terminal-black/20 hover:bg-terminal-black/10"
                  >
                    <TableCell className="py-3">
                      <div className="flex flex-col space-y-1">
                        <a 
                          href={item.url} 
                          className="font-medium text-terminal-text hover:text-terminal-accent flex items-center gap-1 group"
                        >
                          {item.title}
                          <ArrowUpRight 
                            size={14} 
                            className="opacity-0 group-hover:opacity-100 transition-opacity" 
                          />
                        </a>
                        <div className="flex items-center text-xs text-terminal-muted">
                          <span>{item.source}</span>
                          <span className="mx-2">•</span>
                          <span>{item.time}</span>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CryptoNews;
