"use client";

import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FilterOption {
  id: string;
  label: string;
}

interface FilterDropdownProps {
  onFilterChange?: (filter: string[]) => void;
  selectedFilters?: string[];
  filterOptions: FilterOption[];
  className?: string;
}

export function FilterDropdown({
  onFilterChange,
  selectedFilters = [],
  filterOptions,
  className,
}: FilterDropdownProps) {
  const handleFilterToggle = (filterId: string) => {
    if (onFilterChange) {
      const newFilter = selectedFilters.includes(filterId)
        ? selectedFilters.filter((id) => id !== filterId)
        : [...selectedFilters, filterId];
      onFilterChange(newFilter);
    }
  };

  const handleClearAll = () => {
    if (onFilterChange) {
      onFilterChange([]);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-white hover:bg-white/10 border-none"
        >
          <SlidersHorizontal size={14} color="white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="mt-2 ml-2 p-2 w-64 bg-black border-none text-white shadow-2xl space-y-2"
        align="end"
      >
        <DropdownMenuLabel className="text-white text-sm font-semibold">
          Category
        </DropdownMenuLabel>

        {filterOptions.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.id}
            checked={selectedFilters.includes(option.id)}
            onCheckedChange={() => handleFilterToggle(option.id)}
            className="text-white focus:text-white focus:bg-white/10"
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}

        {selectedFilters.length > 0 && (
          <>
            <DropdownMenuSeparator className="bg-white/20" />
            <div className="px-2 py-1">
              <Button
                onClick={handleClearAll}
                className="text-xs text-white/60 hover:text-white transition-colors duration-300"
              >
                Clear All
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
