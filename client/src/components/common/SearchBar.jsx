import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
  onClear,
}) => {
  return (
    <div className={`relative flex items-center ${className}`}>
      <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-stone-900/70 border border-white/15 text-sm text-white placeholder:text-stone-400 focus:outline-none focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/20 transition-all backdrop-blur-md"
      />
      {value && (
        <button
          type="button"
          onClick={onClear || (() => onChange(''))}
          className="absolute right-3 p-0.5 rounded-md hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
