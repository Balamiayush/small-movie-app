import React from "react";
import { Search as SearchIcon } from "lucide-react"; // Example icon library, adjust based on your setup

export const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative w-full max-w-2xl">
      <div className="absolute left-3 top-1/2 -translate-y-1/2">
        <SearchIcon className="h-5 w-5 text-purple-400" />
      </div>

      {/* Search Input */}
      <input
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search through 300+ movies online"
        className="w-full bg-[#0D0C1D] border-none pl-11 text-lg text-gray-200 placeholder:text-gray-400 focus:ring-purple-400 focus:outline-none py-2 rounded-lg"
        aria-label="Search movies"
      />
    </div>
  );
};
