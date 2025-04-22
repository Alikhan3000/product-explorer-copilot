import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import StockCard from './components/StockCard';
import './App.css';

const API_KEY = 'PASTE_YOUR_KEY_HERE';

const App = () => {
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState('');

  // Load default stocks
  useEffect(() => {
    const defaultSymbols = ['AAPL', 'MSFT', 'GOOGL'];
    defaultSymbols.forEach((symbol) => fetchStockData(symbol));
  }, []);
  // Fetch stock data from API
  const fetchStockData = async (symbol) => {
    try {
      const res = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`);
      const data = await res.json();
      const quote = data['Global Quote'];
      if (!quote || Object.keys(quote).length === 0) {
        throw new Error('Stock not found.');
      }
      // Check if the stock is already in the list
      const parsed = {
        symbol: quote['01. symbol'],
        price: parseFloat(quote['05. price']),
        change: parseFloat(quote['10. change percent']),
      };

      // prevent duplicate
      setStocks((prev) => {
        if (prev.some((s) => s.symbol === parsed.symbol)) return prev;
        return [...prev, parsed];
      });
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };
  // Remove stock from the list
  const removeStock = (symbol) => {
    setStocks((prev) => prev.filter((s) => s.symbol !== symbol));
  };

  const clearStocks = () => setStocks([]);
  // Clear error message after a delay
  return (
    <div id="root">
      <h1>Stock Price Viewer</h1>
      <SearchBar onSearch={fetchStockData} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {stocks.length > 0 && (
        <button onClick={clearStocks}>Clear All</button>
      )}
      <div className="results-section">
        {stocks.map((stock) => (
          <StockCard key={stock.symbol} stock={stock} onRemove={removeStock} />
        ))}
      </div>
    </div>
  );
};

export default App;
