import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";

interface FilterConfig {
  [key: string]: string;
}

export const useSearchFilter = (defaultFilters: FilterConfig) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialFilters = Object.keys(defaultFilters).reduce((acc, key) => {
    acc[key] = searchParams.get(key) || defaultFilters[key];
    return acc;
  }, {} as FilterConfig);

  const [filters, setFilters] = useState(initialFilters);

  const handleDebouncedSearch = useDebouncedCallback(
    (updatedFilters: FilterConfig) => {
      const newParams = new URLSearchParams();
      Object.entries(updatedFilters).forEach(([key, value]) => {
        if (value) {
          newParams.set(key, String(value));
        }
      });
      setSearchParams(newParams);
    },
    300
  );

  const handleSearch = (key: string, value: string) => {
    setFilters((prev) => {
      const updatedFilters = { ...prev, [key]: value };
      handleDebouncedSearch(updatedFilters);
      return updatedFilters;
    });
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
    setSearchParams(new URLSearchParams());
  };

  return { filters, handleSearch, clearFilters };
};
