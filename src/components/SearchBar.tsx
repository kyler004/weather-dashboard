import { useState, KeyboardEvent } from "react";
import { Search, MapPin } from "lucide-react";

interface SearchBarProps {
  onSearch: (city: string) => void;
  onUseLocation: () => void;
  loading: boolean;
}

/**
 * Search bar component for sity input
 */

export const SearchBar = ({
  onSearch,
  onUseLocation,
  loading,
}: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    if (searchValue.trim()) {
      onSearch(searchValue.trim());
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex gap-3">
        {/* Search Input */}
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search for a city..."
            disabled={loading}
            className="input-field w-full pr-12"
          />
          <button
            onClick={handleSearch}
            disabled={loading || !searchValue.trim()}
            className="absolute right-3 top-1/2 translate-y-1/2 text-white/80 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Search size={20} />
          </button>
        </div>

        {/* Use Location Button */}
        <button
          onClick={onUseLocation}
          disabled={loading}
          className="btn-primary flex items-center gap-2 whitespace-nowrap"
          aria-label="Use my location"
        >
          <MapPin size={20} />
          <span className="hidden sm:inline">Use Location</span>
        </button>
      </div>

      {/* Helper text */}
      <p className="text-white/70 text-sm mt-2 text-center">
        Search for any city or use your current location
      </p>
    </div>
  );
};
