import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { FilterDropdown } from "./blogs/filter-dropdown";

interface FilterOption {
  id: string;
  label: string;
}

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  filter?: boolean;
  onFilterChange?: (filters: string[]) => void;
  selectedFilters?: string[];
  filterOptions?: FilterOption[];
  className?: string;
  disabled?: boolean;
}

export default function SearchBar({
  placeholder = "",
  value = "",
  onChange,
  onSearch,
  filter: Filter,
  onFilterChange,
  selectedFilters = [],
  filterOptions = [],
  className,
  disabled = false,
}: SearchBarProps) {
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(value);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const handleRemoveFilter = (filterToRemove: string) => {
    if (onFilterChange) {
      const newFilters = selectedFilters.filter(
        (filter) => filter !== filterToRemove,
      );
      onFilterChange(newFilters);
    }
  };

  return (
    <div className={cn("relative w-full", className)}>
      {/* Gradient Shadow */}
      <div className="absolute -inset-0.5 sm:-inset-0.5 bg-gradient-to-r from-[#7E67C1] via-[#FFB051]/20 to-[#FFB051] animate-pulse rounded-full blur-sm" />

      {/* Search Bar */}
      <div className="relative flex items-center justify-between bg-black rounded-full px-4 py-1 z-10">
        <Search
          size={16}
          color="white"
          className="flex-shrink-0 sm:w-3.5 sm:h-3.5 ml-2"
        />

        <div className="flex items-center gap-0.5 sm:gap-2 flex-1 min-w-0">
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={handleInputChange}
            onKeyPress={handleEnter}
            disabled={disabled}
            className={cn(
              "flex-1 pl-1 sm:pl-4 md:pl-10 pr-1 sm:pr-4 py-1.5 sm:py-3 border border-gray-200 rounded-full outline-none placeholder:font-light",
              "border-none focus:ring-0 placeholder:text-white/40 placeholder:text-base text-white text-xs sm:text-sm bg-transparent",
            )}
          />

          {/* Selected Filters */}
          {selectedFilters.length > 0 && (
            <div className="hidden sm:flex items-center gap-1 flex-shrink-0 overflow-hidden max-w-[100px] md:max-w-[200px]">
              {selectedFilters.map((filterId) => {
                const option = filterOptions.find((opt) => opt.id === filterId);
                return (
                  <div
                    key={filterId}
                    className="flex items-center gap-1 px-1 sm:px-2 py-1 bg-white/10 hover:bg-white/12 transition-colors rounded-md text-xs text-white flex-shrink-0"
                  >
                    <span className="text-white/40 whitespace-nowrap">
                      {option?.label}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFilter(filterId)}
                      className="hover:bg-white/20 rounded-lg p-0.5 transition-colors flex-shrink-0"
                    >
                      <X
                        size={12}
                        className="text-white/20 hover:text-white/40 transition-colors"
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {Filter && (
          <div className="flex items-center gap-0.5 sm:gap-2">
            <FilterDropdown
              onFilterChange={onFilterChange}
              selectedFilters={selectedFilters}
              filterOptions={filterOptions}
            />
          </div>
        )}
      </div>
    </div>
  );
}
