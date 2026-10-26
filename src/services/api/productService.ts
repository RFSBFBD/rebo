import { Product, ProductFilterState } from '../../types';
import { PRODUCTS_DATA } from '../mockData/productsData';
import { API_CONFIG } from './config';

export interface ProductServiceInterface {
  getProductsByStore(storeSlug: string, filters?: Partial<ProductFilterState>): Promise<{ products: Product[]; internalCategories: { id: string; nameAr: string }[] }>;
  getProductById(id: string): Promise<Product | null>;
  getRelatedProducts(storeId: string, currentProductId: string, limit?: number): Promise<Product[]>;
}

class ProductService implements ProductServiceInterface {
  async getProductsByStore(
    storeSlug: string,
    filters?: Partial<ProductFilterState>
  ): Promise<{ products: Product[]; internalCategories: { id: string; nameAr: string }[] }> {
    if (API_CONFIG.IS_DEMO_MODE) {
      await new Promise(res => setTimeout(res, API_CONFIG.DEMO_LATENCY_MS));

      // Filter all products belonging to this store
      let list = PRODUCTS_DATA.filter(p => p.storeSlug === storeSlug);

      // Extract unique internal categories for navigation
      const catMap = new Map<string, string>();
      list.forEach(p => catMap.set(p.internalCategoryId, p.internalCategoryNameAr));
      const internalCategories = [
        { id: 'all', nameAr: 'الكل' },
        ...Array.from(catMap.entries()).map(([id, nameAr]) => ({ id, nameAr })),
      ];

      // Filter by internal store category
      if (filters?.categoryId && filters.categoryId !== 'all') {
        list = list.filter(p => p.internalCategoryId === filters.categoryId);
      }

      // Filter by search query
      if (filters?.searchQuery && filters.searchQuery.trim() !== '') {
        const q = filters.searchQuery.toLowerCase().trim();
        list = list.filter(p => 
          p.nameAr.toLowerCase().includes(q) ||
          p.nameEn.toLowerCase().includes(q) ||
          p.descriptionAr.toLowerCase().includes(q) ||
          p.tagsAr.some(t => t.toLowerCase().includes(q))
        );
      }

      // Filter: In-Stock only
      if (filters?.inStockOnly) {
        list = list.filter(p => p.inStock);
      }

      // Sort
      if (filters?.sortBy) {
        switch (filters.sortBy) {
          case 'priceAsc':
            list.sort((a, b) => a.price - b.price);
            break;
          case 'priceDesc':
            list.sort((a, b) => b.price - a.price);
            break;
          case 'rating':
            list.sort((a, b) => b.rating - a.rating);
            break;
          case 'popular':
          default:
            list.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0) || b.reviewCount - a.reviewCount);
            break;
        }
      }

      return { products: list, internalCategories };
    }

    // Live API integration
    try {
      const params = new URLSearchParams();
      if (filters?.categoryId && filters.categoryId !== 'all') params.set('category', filters.categoryId);
      if (filters?.searchQuery) params.set('q', filters.searchQuery);
      if (filters?.sortBy) params.set('sort', filters.sortBy);
      if (filters?.inStockOnly) params.set('inStock', 'true');

      const response = await fetch(`${API_CONFIG.BASE_URL}/api/v1/stores/${storeSlug}/products?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch products');
      return await response.json();
    } catch (error) {
      console.warn(`[ProductService] API failed for store ${storeSlug}, falling back to demo provider`, error);
      const list = PRODUCTS_DATA.filter(p => p.storeSlug === storeSlug);
      const catMap = new Map<string, string>();
      list.forEach(p => catMap.set(p.internalCategoryId, p.internalCategoryNameAr));
      const internalCategories = [
        { id: 'all', nameAr: 'الكل' },
        ...Array.from(catMap.entries()).map(([id, nameAr]) => ({ id, nameAr })),
      ];
      return { products: list, internalCategories };
    }
  }

  async getProductById(id: string): Promise<Product | null> {
    if (API_CONFIG.IS_DEMO_MODE) {
      await new Promise(res => setTimeout(res, API_CONFIG.DEMO_LATENCY_MS));
      return PRODUCTS_DATA.find(p => p.id === id) || null;
    }

    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/api/v1/products/${id}`);
      if (!response.ok) return null;
      return await response.json();
    } catch {
      return PRODUCTS_DATA.find(p => p.id === id) || null;
    }
  }

  async getRelatedProducts(storeId: string, currentProductId: string, limit: number = 4): Promise<Product[]> {
    if (API_CONFIG.IS_DEMO_MODE) {
      return PRODUCTS_DATA.filter(p => p.storeId === storeId && p.id !== currentProductId).slice(0, limit);
    }

    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/api/v1/products/${currentProductId}/related?limit=${limit}`);
      if (!response.ok) throw new Error('Failed to fetch related products');
      return await response.json();
    } catch {
      return PRODUCTS_DATA.filter(p => p.storeId === storeId && p.id !== currentProductId).slice(0, limit);
    }
  }
}

export const productService = new ProductService();
