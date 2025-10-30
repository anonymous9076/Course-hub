import React from "react";
import { Search } from "lucide-react";

const Searchbar = ({
  placeholder = "Search...",     
  onChange,                      
  onSubmit,                      
  className = "",              
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(e);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`max-w-md w-full ${className}`}
    >
      <label
        htmlFor="search-input"
        className="mb-2 text-sm font-medium text-gray-900 sr-only "
      >
        Search
      </label>
      <div className="relative">
        <input
          type="search"
          id="search-input"
          onChange={onChange}
          placeholder={placeholder}
          className="block w-full px-4 py-3 ps-10 text-sm text-gray-600 rounded-full bg-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <div className="absolute inset-y-0 start-0 text-primary flex items-center ps-3 pointer-events-none">
          <Search className="w-5 h-5" />
        </div>
      </div>
    </form>
  );
};

export default Searchbar;
