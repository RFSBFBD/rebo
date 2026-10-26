import { Store, StoreFilterState } from '../../types';
import { STORES_DATA } from '../mockData/storesData';
import { API_CONFIG } from './config';

export interface StoreServiceInterface {
  getStoresByCategory(categorySlug: string, filters?: Partial<StoreFilterState>): Promise<{ stores: Store[]; total: number }>;
  getStoreBySlug(slug: string): Promise<Store | null>;
  getFeaturedStores(limit?: number): Promise<Store[]>;
  searchAllStores(query: string): Promise<Store[]>;
}

class StoreService implements StoreServiceInterface {
  async getStoresByCategory(
    categorySlug: string,
    filters?: Partial<StoreFilterState>
  ): Promise<{ stores: Store[]; total: number }> {
    if (API_CONFIG.IS_DEMO_MODE) {
      await new Promise(res => setTimeout(res, API_CONFIG.DEMO_LATENCY_MS));
      
      let list = STORES_DATA.filter(store => store.categorySlug === categorySlug);

      // Filter: Subcategory
      if (filters?.subcategoryId && filters.subcategoryId !== 'all') {
        list = list.filter(store => store.subcategoryIds.includes(filters.subcategoryId!));
      }

      // Filter: Search Query
      if (filters?.searchQuery && filters.searchQuery.trim() !== '') {
        const q = filters.searchQuery.toLowerCase().trim();
        list = list.filter(store => 
          store.nameAr.toLowerCase().includes(q) ||
          store.nameEn.toLowerCase().includes(q) ||
          store.descriptionAr.toLowerCase().includes(q) ||
          store.specialtyAr.toLowerCase().includes(q) ||
          store.tagsAr.some(t => t.toLowerCase().includes(q))
        );
      }

      // Filter: Open Only
      if (filters?.isOpenOnly) {
        list = list.filter(store => store.isOpen);
      }

      // Filter: Free Delivery Only
      if (filters?.isFreeDeliveryOnly) {
        list = list.filter(store => store.deliveryFee === 0);
      }

      // Sort
      if (filters?.sortBy) {
        switch (filters.sortBy) {
          case 'rating':
            list.sort((a, b) => b.rating - a.rating);
            break;
          case 'deliveryTime':
            list.sort((a, b) => a.deliveryTimeMinutes - b.deliveryTimeMinutes);
            break;
          case 'name':
            list.sort((a, b) => a.nameAr.localeCompare(b.nameAr, 'ar'));
            break;
          case 'minOrder':
            list.sort((a, b) => a.minimumOrder - b.minimumOrder);
            break;
          case 'recommended':
          default:
            list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || b.rating - a.rating);
            break;
        }
      }

      return {
        stores: list,
        total: list.length,
      };
    }

    // Live API integration
    try {
      const params = new URLSearchParams();
      if (filters?.subcategoryId && filters.subcategoryId !== 'all') params.set('subcategory', filters.subcategoryId);
      if (filters?.searchQuery) params.set('q', filters.searchQuery);
      if (filters?.sortBy) params.set('sort', filters.sortBy);
      if (filters?.isOpenOnly) params.set('isOpen', 'true');
      if (filters?.isFreeDeliveryOnly) params.set('freeDelivery', 'true');

      const url = `${API_CONFIG.BASE_URL}/api/v1/categories/${categorySlug}/stores?${params.toString()}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch stores: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.warn(`[StoreService] API call failed for category ${categorySlug}, falling back to demo provider`, error);
      // Fallback to local demo provider
      const fallbackList = STORES_DATA.filter(store => store.categorySlug === categorySlug);
      return { stores: fallbackList, total: fallbackList.length };
    }
  }

  async getStoreBySlug(slug: string): Promise<Store | null> {
    if (API_CONFIG.IS_DEMO_MODE) {
      await new Promise(res => setTimeout(res, API_CONFIG.DEMO_LATENCY_MS));
      const store = STORES_DATA.find(s => s.slug === slug);
      return store || null;
    }

    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/api/v1/stores/${slug}`);
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(`Failed to fetch store details: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.warn(`[StoreService] API call failed for store ${slug}, falling back to demo provider`, error);
      const store = STORES_DATA.find(s => s.slug === slug);
      return store || null;
    }
  }

  async getFeaturedStores(limit: number = 6): Promise<Store[]> {
    if (API_CONFIG.IS_DEMO_MODE) {
      await new Promise(res => setTimeout(res, API_CONFIG.DEMO_LATENCY_MS));
      return STORES_DATA.filter(s => s.isFeatured).slice(0, limit);
    }

    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/api/v1/stores/featured?limit=${limit}`);
      if (!response.ok) throw new Error('Failed to fetch featured stores');
      return await response.json();
    } catch {
      return STORES_DATA.filter(s => s.isFeatured).slice(0, limit);
    }
  }

  async searchAllStores(query: string): Promise<Store[]> {
    if (!query.trim()) return [];
    if (API_CONFIG.IS_DEMO_MODE) {
      const q = query.toLowerCase().trim();
      return STORES_DATA.filter(store => 
        store.nameAr.toLowerCase().includes(q) ||
        store.nameEn.toLowerCase().includes(q) ||
        store.tagsAr.some(t => t.toLowerCase().includes(q))
      );
    }

    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/api/v1/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Search failed');
      return await response.json();
    } catch {
      const q = query.toLowerCase().trim();
      return STORES_DATA.filter(s => s.nameAr.toLowerCase().includes(q));
    }
  }
}

export const storeService = new StoreService();
