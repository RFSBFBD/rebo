import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { CategoryHero } from '../components/category/CategoryHero';
import { StoreFilterBar } from '../components/category/StoreFilterBar';
import { StoreGrid } from '../components/category/StoreGrid';
import { categoryService } from '../services/api/categoryService';
import { storeService } from '../services/api/storeService';
import { Category, Store, StoreFilterState } from '../types';
import { EmptyState } from '../components/common/EmptyState';
import { Link } from 'react-router-dom';

export const CategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const [category, setCategory] = useState<Category | null>(null);
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [categoryNotFound, setCategoryNotFound] = useState<boolean>(false);

  // Filters State initialized from URL query parameters if present
  const [filters, setFilters] = useState<StoreFilterState>({
    searchQuery: searchParams.get('q') || '',
    subcategoryId: searchParams.get('sub') || 'all',
    sortBy: (searchParams.get('sort') as StoreFilterState['sortBy']) || 'recommended',
    isOpenOnly: searchParams.get('open') === 'true',
    isFreeDeliveryOnly: searchParams.get('free') === 'true',
  });

  // 1. Fetch category metadata
  useEffect(() => {
    if (!categorySlug) return;
    setLoading(true);
    categoryService.getCategoryBySlug(categorySlug).then(found => {
      if (!found) {
        setCategoryNotFound(true);
        setLoading(false);
      } else {
        setCategory(found);
        setCategoryNotFound(false);
      }
    });
  }, [categorySlug]);

  // 2. Fetch stores whenever categorySlug or filters change
  useEffect(() => {
    if (!categorySlug) return;
    setLoading(true);
    storeService.getStoresByCategory(categorySlug, filters).then(res => {
      setStores(res.stores);
      setLoading(false);
    });

    // Sync state with URL params
    const newParams = new URLSearchParams();
    if (filters.searchQuery) newParams.set('q', filters.searchQuery);
    if (filters.subcategoryId !== 'all') newParams.set('sub', filters.subcategoryId);
    if (filters.sortBy !== 'recommended') newParams.set('sort', filters.sortBy);
    if (filters.isOpenOnly) newParams.set('open', 'true');
    if (filters.isFreeDeliveryOnly) newParams.set('free', 'true');
    setSearchParams(newParams, { replace: true });
  }, [categorySlug, filters, setSearchParams]);

  const handleFilterChange = (newFilters: Partial<StoreFilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleSubcategorySelect = (subId: string) => {
    setFilters(prev => ({ ...prev, subcategoryId: subId }));
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      subcategoryId: 'all',
      sortBy: 'recommended',
      isOpenOnly: false,
      isFreeDeliveryOnly: false,
    });
  };

  if (categoryNotFound) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState
          title="التصنيف المطلوب غير موجود"
          description="لم نتمكن من العثور على هذا التصنيف في بياك. يرجى تصفح الأقسام الرئيسية."
          actionText="العودة للرئيسية"
          onAction={() => (window.location.href = '/')}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs
        items={[
          { label: 'التصنيفات', to: '/' },
          { label: category ? category.nameAr : 'جاري التحميل...' },
        ]}
      />

      {/* Category Hero Header */}
      {category && (
        <CategoryHero
          category={category}
          selectedSubcategory={filters.subcategoryId}
          onSelectSubcategory={handleSubcategorySelect}
          matchingStoreCount={stores.length}
        />
      )}

      {/* Filter and Search Bar */}
      <StoreFilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        totalStores={stores.length}
      />

      {/* Store Responsive Grid */}
      <StoreGrid
        stores={stores}
        loading={loading}
        onResetFilters={handleResetFilters}
      />
    </div>
  );
};
