// Import React
import React from 'react';

const StockCard = ({ stock, onRemove }) => {
  // Destructure stock properties
  const { symbol, price, change } = stock;

  return (
    <div className="stock-card">
      {/* Display stock symbol */}
      <h2>{symbol}</h2>

      {/* Display stock price */}
      <p>Price: ${price.toFixed(2)}</p>

      {/* Display stock change percentage with color indication */}
      <p style={{ color: change > 0 ? 'green' : 'red' }}>
        Change: {change.toFixed(2)}%
      </p>

      {/* Button to remove the stock */}
      <button onClick={() => onRemove(symbol)}>Remove</button>
    </div>
  );
};

export default StockCard;
