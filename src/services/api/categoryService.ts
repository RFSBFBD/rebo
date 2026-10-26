import { Category, CategorySlug } from '../../types';
import { CATEGORIES_DATA } from '../mockData/categoriesData';
import { API_CONFIG } from './config';

export interface CategoryServiceInterface {
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | null>;
}

class CategoryService implements CategoryServiceInterface {
  async getCategories(): Promise<Category[]> {
    if (API_CONFIG.IS_DEMO_MODE) {
      // Simulate slight network latency to show elegant skeletons
      await new Promise(res => setTimeout(res, API_CONFIG.DEMO_LATENCY_MS));
      return [...CATEGORIES_DATA];
    }

    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/api/v1/categories`);
      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.warn('[CategoryService] API unavailable, falling back to demo data', error);
      return [...CATEGORIES_DATA];
    }
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    if (API_CONFIG.IS_DEMO_MODE) {
      await new Promise(res => setTimeout(res, API_CONFIG.DEMO_LATENCY_MS));
      const found = CATEGORIES_DATA.find(c => c.slug === slug);
      return found || null;
    }

    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/api/v1/categories/${slug}`);
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(`Failed to fetch category: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.warn(`[CategoryService] API error for ${slug}, falling back to demo data`, error);
      const found = CATEGORIES_DATA.find(c => c.slug === slug);
      return found || null;
    }
  }
}

export const categoryService = new CategoryService();
