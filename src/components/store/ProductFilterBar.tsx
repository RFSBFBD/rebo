import React from 'react';
import { Search, SlidersHorizontal, CheckCircle, X } from 'lucide-react';
import { ProductFilterState } from '../../types';

interface ProductFilterBarProps {
  filters: ProductFilterState;
  onFilterChange: (newFilters: Partial<ProductFilterState>) => void;
  onClearFilters: () => void;
  matchingCount: number;
}

export const ProductFilterBar: React.FC<ProductFilterBarProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
  matchingCount,
}) => {
  const hasActiveFilters =
    Boolean(filters.searchQuery) ||
    filters.categoryId !== 'all' ||
    filters.inStockOnly ||
    filters.sortBy !== 'popular';

  return (
    <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-sm mb-6 space-y-3">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search inside store */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={e => onFilterChange({ searchQuery: e.target.value })}
            placeholder="ابحث داخل قائمة منتجات هذا المتجر..."
            className="w-full bg-[#FAF8F5] border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 rounded-2xl pr-10 pl-4 py-2 text-xs sm:text-sm text-bayaak-navy outline-none placeholder:text-slate-400"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onFilterChange({ searchQuery: '' })}
              aria-label="مسح البحث"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort select */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-[#FAF8F5] border border-slate-200 rounded-2xl px-3 py-2 text-xs sm:text-sm text-slate-700">
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-slate-500 whitespace-nowrap">الترتيب:</span>
            <select
              value={filters.sortBy}
              onChange={e => onFilterChange({ sortBy: e.target.value as ProductFilterState['sortBy'] })}
              className="bg-transparent font-bold text-bayaak-navy outline-none cursor-pointer"
            >
              <option value="popular">الأكثر طلباً ومبيعاً</option>
              <option value="priceAsc">السعر: من الأقل للأعلى</option>
              <option value="priceDesc">السعر: من الأعلى للأقل</option>
              <option value="rating">الأعلى تقييماً</option>
            </select>
          </div>
        </div>
      </div>

      {/* Toggles & Counter */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onFilterChange({ inStockOnly: !filters.inStockOnly })}
            className={`px-3 py-1 rounded-full font-semibold transition-all flex items-center gap-1.5 border ${
              filters.inStockOnly
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-[#FAF8F5] text-slate-700 border-slate-200 hover:border-amber-400'
            }`}
          >
            <CheckCircle className="w-3 h-3" />
            <span>المتوفر بالمخزن فقط</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-slate-500">
            المنتجات: <strong className="text-bayaak-navy">{matchingCount}</strong>
          </span>

          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-rose-600 hover:text-rose-700 font-bold underline"
            >
              إلغاء الفلاتر
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
