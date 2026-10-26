import React from 'react';
import { Search, SlidersHorizontal, Clock, Sparkles, X } from 'lucide-react';
import { StoreFilterState } from '../../types';

interface StoreFilterBarProps {
  filters: StoreFilterState;
  onFilterChange: (newFilters: Partial<StoreFilterState>) => void;
  onResetFilters: () => void;
  totalStores: number;
}

export const StoreFilterBar: React.FC<StoreFilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalStores,
}) => {
  const hasActiveFilters = 
    Boolean(filters.searchQuery) || 
    filters.subcategoryId !== 'all' || 
    filters.isOpenOnly || 
    filters.isFreeDeliveryOnly || 
    filters.sortBy !== 'recommended';

  return (
    <div className="bg-white rounded-3xl p-4 md:p-5 border border-amber-200/80 shadow-[0_4px_20px_rgba(11,25,44,0.04)] mb-8 space-y-4">
      {/* Top Row: Search and Sort */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={e => onFilterChange({ searchQuery: e.target.value })}
            placeholder="ابحث عن متجر بالاسم أو التخصص..."
            className="w-full bg-[#FAF8F5] border border-amber-200/70 focus:border-bayaak-gold focus:ring-2 focus:ring-bayaak-gold/20 rounded-2xl pr-11 pl-4 py-2.5 text-sm text-bayaak-navy outline-none placeholder:text-slate-400 transition-all"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onFilterChange({ searchQuery: '' })}
              aria-label="مسح البحث"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-bayaak-navy"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-[#FAF8F5] border border-amber-200/70 rounded-2xl px-3 py-2 text-xs md:text-sm text-bayaak-navy">
            <SlidersHorizontal className="w-4 h-4 text-bayaak-gold shrink-0" />
            <span className="font-semibold text-slate-500 whitespace-nowrap">الترتيب:</span>
            <select
              value={filters.sortBy}
              onChange={e => onFilterChange({ sortBy: e.target.value as StoreFilterState['sortBy'] })}
              className="bg-transparent font-bold text-bayaak-navy outline-none cursor-pointer pr-1"
            >
              <option value="recommended">الموصى به ومميز</option>
              <option value="rating">الأعلى تقييماً</option>
              <option value="deliveryTime">الأسرع توصيلاً</option>
              <option value="minOrder">أقل حد أدنى للطلب</option>
              <option value="name">أبجدياً (أ - ي)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bottom Row: Quick Toggles & Reset */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs md:text-sm">
        {/* Toggle Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onFilterChange({ isOpenOnly: !filters.isOpenOnly })}
            className={`px-3 py-1.5 rounded-full font-semibold transition-all flex items-center gap-1.5 border ${
              filters.isOpenOnly
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-[#FAF8F5] text-slate-700 border-slate-200 hover:border-amber-400'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>مفتوح الآن فقط</span>
          </button>

          <button
            onClick={() => onFilterChange({ isFreeDeliveryOnly: !filters.isFreeDeliveryOnly })}
            className={`px-3 py-1.5 rounded-full font-semibold transition-all flex items-center gap-1.5 border ${
              filters.isFreeDeliveryOnly
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-500 shadow-sm'
                : 'bg-[#FAF8F5] text-slate-700 border-slate-200 hover:border-amber-400'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>توصيل مجاني (0 ر.س)</span>
          </button>
        </div>

        {/* Counter & Clear Active Filters */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 font-bold">
            عدد النتائج: <strong className="text-bayaak-navy">{totalStores}</strong> متجر
          </span>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="text-xs text-rose-600 hover:text-rose-700 font-bold underline transition-colors flex items-center gap-1"
            >
              <span>إعادة ضبط</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
