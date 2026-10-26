import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { StoreProfileHeader } from '../components/store/StoreProfileHeader';
import { StorePromoBanner } from '../components/store/StorePromoBanner';
import { StoreCategoryNavigation } from '../components/store/StoreCategoryNavigation';
import { ProductFilterBar } from '../components/store/ProductFilterBar';
import { ProductGrid } from '../components/store/ProductGrid';
import { ProductDetailModal } from '../components/product/ProductDetailModal';
import { storeService } from '../services/api/storeService';
import { productService } from '../services/api/productService';
import { categoryService } from '../services/api/categoryService';
import { Store, Product, ProductFilterState, Category } from '../types';
import { EmptyState } from '../components/common/EmptyState';

export const StorePage: React.FC = () => {
  const { storeSlug } = useParams<{ storeSlug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const [store, setStore] = useState<Store | null>(null);
  const [parentCategory, setParentCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [internalCategories, setInternalCategories] = useState<{ id: string; nameAr: string }[]>([]);
  const [loadingStore, setLoadingStore] = useState<boolean>(true);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(true);
  const [storeNotFound, setStoreNotFound] = useState<boolean>(false);

  // Active product for detail modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);

  // Product Filters State
  const [productFilters, setProductFilters] = useState<ProductFilterState>({
    searchQuery: searchParams.get('pq') || '',
    categoryId: searchParams.get('pcat') || 'all',
    sortBy: (searchParams.get('psort') as ProductFilterState['sortBy']) || 'popular',
    inStockOnly: searchParams.get('pstock') === 'true',
  });

  // 1. Fetch Store Details
  useEffect(() => {
    if (!storeSlug) return;
    setLoadingStore(true);
    storeService.getStoreBySlug(storeSlug).then(found => {
      if (!found) {
        setStoreNotFound(true);
        setLoadingStore(false);
      } else {
        setStore(found);
        setStoreNotFound(false);
        setLoadingStore(false);

        // Fetch parent category for rich breadcrumbs
        categoryService.getCategoryBySlug(found.categorySlug).then(setParentCategory);
      }
    });
  }, [storeSlug]);

  // 2. Fetch Store Products & Internal Categories
  useEffect(() => {
    if (!storeSlug) return;
    setLoadingProducts(true);
    productService.getProductsByStore(storeSlug, productFilters).then(res => {
      setProducts(res.products);
      setInternalCategories(res.internalCategories);
      setLoadingProducts(false);
    });

    // Update query params
    const newParams = new URLSearchParams();
    if (productFilters.searchQuery) newParams.set('pq', productFilters.searchQuery);
    if (productFilters.categoryId !== 'all') newParams.set('pcat', productFilters.categoryId);
    if (productFilters.sortBy !== 'popular') newParams.set('psort', productFilters.sortBy);
    if (productFilters.inStockOnly) newParams.set('pstock', 'true');
    setSearchParams(newParams, { replace: true });
  }, [storeSlug, productFilters, setSearchParams]);

  const handleOpenProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  const handleCloseProductDetails = () => {
    setIsDetailModalOpen(false);
  };

  const handleClearProductFilters = () => {
    setProductFilters({
      searchQuery: '',
      categoryId: 'all',
      sortBy: 'popular',
      inStockOnly: false,
    });
  };

  if (storeNotFound) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState
          title="المتجر المطلوب غير موجود"
          description="لم نتمكن من العثور على هذا المتجر في سجلات بياك. يرجى تصفح قائمة المتاجر المتاحة."
          actionText="العودة للتصنيفات"
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
          {
            label: parentCategory ? parentCategory.nameAr : 'التصنيف',
            to: store ? `/categories/${store.categorySlug}` : '/',
          },
          { label: store ? store.nameAr : 'جاري التحميل...' },
        ]}
      />

      {/* Store Profile Header */}
      {store && <StoreProfileHeader store={store} />}

      {/* Store Genuine Promotional / Highlights Banner */}
      {store && <StorePromoBanner store={store} />}

      {/* Store Internal Category Navigation */}
      {internalCategories.length > 1 && (
        <StoreCategoryNavigation
          categories={internalCategories}
          activeCategoryId={productFilters.categoryId}
          onSelectCategory={catId =>
            setProductFilters(prev => ({ ...prev, categoryId: catId }))
          }
        />
      )}

      {/* Product Filter & Search Bar */}
      <ProductFilterBar
        filters={productFilters}
        onFilterChange={newFilters =>
          setProductFilters(prev => ({ ...prev, ...newFilters }))
        }
        onClearFilters={handleClearProductFilters}
        matchingCount={products.length}
      />

      {/* Responsive Product Grid */}
      <ProductGrid
        products={products}
        loading={loadingProducts}
        onOpenDetails={handleOpenProductDetails}
        onClearFilters={handleClearProductFilters}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isDetailModalOpen}
        onClose={handleCloseProductDetails}
        onSelectRelatedProduct={handleOpenProductDetails}
      />
    </div>
  );
};
