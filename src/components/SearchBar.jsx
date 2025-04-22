// Import React and useState hook
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  // State to manage the input value
  const [input, setInput] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      // Trigger the onSearch callback with the input value
      onSearch(input.trim());
      setInput(''); // Clear the input field
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input field for stock symbol */}
      <input
        type="text"
        placeholder="Enter stock symbol (e.g., AAPL)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {/* Submit button */}
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;