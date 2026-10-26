import React, { createContext, useContext, useState, useEffect } from 'react';

interface FavoritesContextType {
  favoriteStoreSlugs: string[];
  favoriteProductIds: string[];
  toggleFavoriteStore: (slug: string) => void;
  toggleFavoriteProduct: (id: string) => void;
  isStoreFavorite: (slug: string) => boolean;
  isProductFavorite: (id: string) => boolean;
}

const FAVORITES_STORAGE_KEY = 'bayaak_favorites_v1';

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favoriteStoreSlugs, setFavoriteStoreSlugs] = useState<string[]>(() => {
    try {
      const data = localStorage.getItem(`${FAVORITES_STORAGE_KEY}_stores`);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });

  const [favoriteProductIds, setFavoriteProductIds] = useState<string[]>(() => {
    try {
      const data = localStorage.getItem(`${FAVORITES_STORAGE_KEY}_products`);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(`${FAVORITES_STORAGE_KEY}_stores`, JSON.stringify(favoriteStoreSlugs));
    } catch {}
  }, [favoriteStoreSlugs]);

  useEffect(() => {
    try {
      localStorage.setItem(`${FAVORITES_STORAGE_KEY}_products`, JSON.stringify(favoriteProductIds));
    } catch {}
  }, [favoriteProductIds]);

  const toggleFavoriteStore = (slug: string) => {
    setFavoriteStoreSlugs(prev =>
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    );
  };

  const toggleFavoriteProduct = (id: string) => {
    setFavoriteProductIds(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const isStoreFavorite = (slug: string) => favoriteStoreSlugs.includes(slug);
  const isProductFavorite = (id: string) => favoriteProductIds.includes(id);

  return (
    <FavoritesContext.Provider
      value={{
        favoriteStoreSlugs,
        favoriteProductIds,
        toggleFavoriteStore,
        toggleFavoriteProduct,
        isStoreFavorite,
        isProductFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
