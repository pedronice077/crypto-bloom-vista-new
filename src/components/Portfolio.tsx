
import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Save, X, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Mock portfolio data
const initialPortfolio = [
  { id: 1, coin: 'Bitcoin', symbol: 'BTC', amount: 0.5, buyPrice: 58000, currentPrice: 62000 },
  { id: 2, coin: 'Ethereum', symbol: 'ETH', amount: 5, buyPrice: 2800, currentPrice: 3100 },
  { id: 3, coin: 'Solana', symbol: 'SOL', amount: 30, buyPrice: 110, currentPrice: 125 },
];

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState(initialPortfolio);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newEntry, setNewEntry] = useState({ coin: '', symbol: '', amount: '', buyPrice: '' });
  
  const totalValue = portfolio.reduce((sum, item) => {
    return sum + (item.amount * item.currentPrice);
  }, 0);
  
  const totalInvested = portfolio.reduce((sum, item) => {
    return sum + (item.amount * item.buyPrice);
  }, 0);
  
  const totalProfit = totalValue - totalInvested;
  const profitPercentage = totalInvested > 0 ? (totalProfit / totalInvested) * 100 : 0;
  
  const handleAddNew = () => {
    setIsAdding(true);
    setEditingId(null);
    setNewEntry({ coin: '', symbol: '', amount: '', buyPrice: '' });
  };
  
  const handleSaveNew = () => {
    if (!newEntry.coin || !newEntry.symbol || !newEntry.amount || !newEntry.buyPrice) return;
    
    const amount = parseFloat(newEntry.amount);
    const buyPrice = parseFloat(newEntry.buyPrice);
    
    if (isNaN(amount) || isNaN(buyPrice)) return;
    
    const newItem = {
      id: Date.now(),
      coin: newEntry.coin,
      symbol: newEntry.symbol,
      amount,
      buyPrice,
      currentPrice: buyPrice // In a real app, we would fetch the current price from an API
    };
    
    setPortfolio([...portfolio, newItem]);
    setIsAdding(false);
    setNewEntry({ coin: '', symbol: '', amount: '', buyPrice: '' });
  };
  
  const handleEdit = (id: number) => {
    const item = portfolio.find(p => p.id === id);
    if (!item) return;
    
    setEditingId(id);
    setNewEntry({
      coin: item.coin,
      symbol: item.symbol,
      amount: item.amount.toString(),
      buyPrice: item.buyPrice.toString()
    });
  };
  
  const handleSaveEdit = () => {
    if (!editingId || !newEntry.amount || !newEntry.buyPrice) return;
    
    const amount = parseFloat(newEntry.amount);
    const buyPrice = parseFloat(newEntry.buyPrice);
    
    if (isNaN(amount) || isNaN(buyPrice)) return;
    
    setPortfolio(portfolio.map(item => {
      if (item.id === editingId) {
        return {
          ...item,
          coin: newEntry.coin || item.coin,
          symbol: newEntry.symbol || item.symbol,
          amount,
          buyPrice
        };
      }
      return item;
    }));
    
    setEditingId(null);
  };
  
  const handleDelete = (id: number) => {
    setPortfolio(portfolio.filter(item => item.id !== id));
  };
  
  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
  };
  
  const calculateProfit = (item: typeof portfolio[0]) => {
    const invested = item.amount * item.buyPrice;
    const current = item.amount * item.currentPrice;
    return current - invested;
  };
  
  const calculateProfitPercentage = (item: typeof portfolio[0]) => {
    const invested = item.amount * item.buyPrice;
    const profit = calculateProfit(item);
    return invested > 0 ? (profit / invested) * 100 : 0;
  };

  return (
    <div className="terminal-panel">
      <div className="terminal-header">
        <div className="flex items-center gap-1">
          <TrendingUp size={14} />
          <span>Portfolio Tracker</span>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-5 w-5 rounded-sm text-terminal-muted hover:text-terminal-text"
          onClick={handleAddNew}
        >
          <Plus size={14} />
        </Button>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Card className="bg-terminal-darker border-terminal-black">
            <CardContent className="p-4">
              <div className="text-xs text-terminal-muted">Total Value</div>
              <div className="text-lg font-semibold">${totalValue.toLocaleString()}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-terminal-darker border-terminal-black">
            <CardContent className="p-4">
              <div className="text-xs text-terminal-muted">Total Invested</div>
              <div className="text-lg font-semibold">${totalInvested.toLocaleString()}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-terminal-darker border-terminal-black">
            <CardContent className="p-4">
              <div className="text-xs text-terminal-muted">Profit/Loss</div>
              <div className={`text-lg font-semibold flex items-center gap-1 ${totalProfit >= 0 ? 'text-terminal-green' : 'text-terminal-red'}`}>
                {totalProfit >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                ${Math.abs(totalProfit).toLocaleString()} 
                <span className="text-xs">({profitPercentage.toFixed(2)}%)</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {isAdding && (
          <Card className="bg-terminal-darker border-terminal-black mb-4">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div>
                  <Label htmlFor="coin" className="text-xs text-terminal-muted">Coin</Label>
                  <Input
                    id="coin"
                    className="bg-terminal-black border-terminal-black/50 text-sm"
                    value={newEntry.coin}
                    onChange={e => setNewEntry({...newEntry, coin: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="symbol" className="text-xs text-terminal-muted">Symbol</Label>
                  <Input
                    id="symbol"
                    className="bg-terminal-black border-terminal-black/50 text-sm"
                    value={newEntry.symbol}
                    onChange={e => setNewEntry({...newEntry, symbol: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="amount" className="text-xs text-terminal-muted">Amount</Label>
                  <Input
                    id="amount"
                    className="bg-terminal-black border-terminal-black/50 text-sm"
                    value={newEntry.amount}
                    onChange={e => setNewEntry({...newEntry, amount: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="buyPrice" className="text-xs text-terminal-muted">Buy Price ($)</Label>
                  <Input
                    id="buyPrice"
                    className="bg-terminal-black border-terminal-black/50 text-sm"
                    value={newEntry.buyPrice}
                    onChange={e => setNewEntry({...newEntry, buyPrice: e.target.value})}
                  />
                </div>
                <div className="flex items-end gap-2">
                  <Button 
                    size="sm"
                    className="bg-terminal-accent hover:bg-terminal-accent/80"
                    onClick={handleSaveNew}
                  >
                    <Save size={14} className="mr-1" />
                    Save
                  </Button>
                  <Button 
                    size="sm"
                    variant="outline"
                    className="border-terminal-black"
                    onClick={handleCancel}
                  >
                    <X size={14} className="mr-1" />
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="space-y-3">
          {portfolio.map((item) => (
            <Card 
              key={item.id} 
              className="bg-terminal-darker border-terminal-black"
            >
              <CardContent className="p-4">
                {editingId === item.id ? (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    <div>
                      <Label htmlFor={`coin-${item.id}`} className="text-xs text-terminal-muted">Coin</Label>
                      <Input
                        id={`coin-${item.id}`}
                        className="bg-terminal-black border-terminal-black/50 text-sm"
                        value={newEntry.coin}
                        onChange={e => setNewEntry({...newEntry, coin: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`symbol-${item.id}`} className="text-xs text-terminal-muted">Symbol</Label>
                      <Input
                        id={`symbol-${item.id}`}
                        className="bg-terminal-black border-terminal-black/50 text-sm"
                        value={newEntry.symbol}
                        onChange={e => setNewEntry({...newEntry, symbol: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`amount-${item.id}`} className="text-xs text-terminal-muted">Amount</Label>
                      <Input
                        id={`amount-${item.id}`}
                        className="bg-terminal-black border-terminal-black/50 text-sm"
                        value={newEntry.amount}
                        onChange={e => setNewEntry({...newEntry, amount: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`buyPrice-${item.id}`} className="text-xs text-terminal-muted">Buy Price ($)</Label>
                      <Input
                        id={`buyPrice-${item.id}`}
                        className="bg-terminal-black border-terminal-black/50 text-sm"
                        value={newEntry.buyPrice}
                        onChange={e => setNewEntry({...newEntry, buyPrice: e.target.value})}
                      />
                    </div>
                    <div className="flex items-end gap-2">
                      <Button 
                        size="sm"
                        className="bg-terminal-accent hover:bg-terminal-accent/80"
                        onClick={handleSaveEdit}
                      >
                        <Save size={14} className="mr-1" />
                        Save
                      </Button>
                      <Button 
                        size="sm"
                        variant="outline"
                        className="border-terminal-black"
                        onClick={handleCancel}
                      >
                        <X size={14} className="mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-terminal-black rounded-full flex items-center justify-center text-terminal-accent">
                        {item.symbol.substring(0, 1)}
                      </div>
                      <div>
                        <div className="font-semibold flex items-center gap-1">
                          {item.coin} 
                          <span className="text-terminal-muted text-xs">({item.symbol})</span>
                        </div>
                        <div className="text-xs text-terminal-muted">
                          {item.amount} {item.symbol} × ${item.currentPrice}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-2 md:mt-0 flex items-center justify-between md:gap-6">
                      <div>
                        <div className="text-xs text-terminal-muted">Value</div>
                        <div className="font-medium">${(item.amount * item.currentPrice).toLocaleString()}</div>
                      </div>
                      
                      <div>
                        <div className="text-xs text-terminal-muted">Profit/Loss</div>
                        <div className={`font-medium flex items-center gap-1 ${calculateProfit(item) >= 0 ? 'text-terminal-green' : 'text-terminal-red'}`}>
                          {calculateProfit(item) >= 0 ? 
                            <TrendingUp size={14} /> : 
                            <TrendingDown size={14} />
                          }
                          ${Math.abs(calculateProfit(item)).toLocaleString()}
                          <span className="text-xs">
                            ({calculateProfitPercentage(item).toFixed(2)}%)
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleEdit(item.id)}
                        >
                          <Pencil size={14} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8 text-terminal-red"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          
          {portfolio.length === 0 && (
            <div className="text-center py-8 text-terminal-muted">
              No coins in your portfolio. Click the + button to add your first coin.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
