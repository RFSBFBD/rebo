import React from 'react';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { ProductCardSkeleton } from '../common/SkeletonLoader';
import { EmptyState } from '../common/EmptyState';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  onOpenDetails: (product: Product) => void;
  onClearFilters?: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading,
  onOpenDetails,
  onClearFilters,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        title="لا توجد منتجات مطابقة في هذا المتجر"
        description="جرب البحث بكلمة أخرى أو التبديل إلى قسم منتجات آخر لعرض المنتجات المتوفرة."
        actionText="إعادة ضبط الفلاتر"
        onAction={onClearFilters}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onOpenDetails={onOpenDetails}
        />
      ))}
    </div>
  );
};
