'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ProductSearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
}

const ProductSearchContext = createContext<ProductSearchContextType | undefined>(undefined);

export const ProductSearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const clearSearch = () => {
    setSearchQuery('');
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

