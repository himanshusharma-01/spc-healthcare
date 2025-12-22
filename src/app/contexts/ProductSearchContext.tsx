'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ProductSearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
}

const ProductSearchContext = createContext<ProductSearchContextType | undefined>(undefined);

const STORAGE_KEY = 'spc-healthcare-search-query';

export const ProductSearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from localStorage if available
  const [searchQuery, setSearchQueryState] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored || '';
    }
    return '';
  });

  // Persist to localStorage whenever searchQuery changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (searchQuery) {
        localStorage.setItem(STORAGE_KEY, searchQuery);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, [searchQuery]);

  // Listen for storage changes (for cross-tab synchronization)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setSearchQueryState(e.newValue || '');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const setSearchQuery = (query: string) => {
    setSearchQueryState(query);
  };

  const clearSearch = () => {
    setSearchQueryState('');
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <ProductSearchContext.Provider value={{ searchQuery, setSearchQuery, clearSearch }}>
      {children}
    </ProductSearchContext.Provider>
  );
};

export const useProductSearch = () => {
  const context = useContext(ProductSearchContext);
  if (context === undefined) {
    throw new Error('useProductSearch must be used within a ProductSearchProvider');
  }
  return context;
};

