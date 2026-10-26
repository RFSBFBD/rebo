import React, { useState } from 'react';
import { Store } from '../../types';
import { StoreCard } from './StoreCard';
import { StoreCardSkeleton } from '../common/SkeletonLoader';
import { EmptyState } from '../common/EmptyState';
import { ChevronDown } from 'lucide-react';

interface StoreGridProps {
  stores: Store[];
  loading: boolean;
  onResetFilters?: () => void;
}

export const StoreGrid: React.FC<StoreGridProps> = ({
  stores,
  loading,
  onResetFilters,
}) => {
  const [visibleCount, setVisibleCount] = useState(8);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <StoreCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (stores.length === 0) {
    return (
      <EmptyState
        title="لم نجد أي متاجر مطابقة"
        description="لا تتوفر متاجر تطابق معايير البحث أو الفلاتر المختارة حالياً. يرجى تجربة فلاتر أخرى أو إزالة قيود البحث."
        actionText="إعادة تعيين الفلاتر"
        onAction={onResetFilters}
      />
    );
  }

  const displayedStores = stores.slice(0, visibleCount);
  const hasMore = visibleCount < stores.length;

  return (
    <div className="space-y-8">
      {/* 4 cols on large, 3 cols medium, 2 cols tablet, 1-2 mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
        {displayedStores.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>

      {/* "تحميل المزيد" (Load More) Button if there are more stores */}
      {hasMore && (
        <div className="text-center pt-4">
          <button
            onClick={() => setVisibleCount(prev => prev + 4)}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-white border-2 border-bayaak-gold/60 hover:border-bayaak-gold text-bayaak-navy font-black text-sm shadow-sm hover:shadow-gold transition-all active:scale-95"
          >
            <span>تحميل المزيد من المتاجر</span>
            <ChevronDown className="w-4 h-4 text-bayaak-gold" />
          </button>
        </div>
      )}
    </div>
  );
};
