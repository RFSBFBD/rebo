import React from 'react';
import { Category } from '../../types';
import { Sparkles, Store } from 'lucide-react';

interface CategoryHeroProps {
  category: Category;
  selectedSubcategory: string;
  onSelectSubcategory: (id: string) => void;
  matchingStoreCount: number;
}

export const CategoryHero: React.FC<CategoryHeroProps> = ({
  category,
  selectedSubcategory,
  onSelectSubcategory,
  matchingStoreCount,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl md:rounded-[2.5xl] bg-gradient-to-r from-[#071322] via-[#0B192C] to-[#142A4A] text-white p-6 sm:p-8 md:p-10 border-2 border-bayaak-gold/40 shadow-xl mb-8">
      {/* Background Banner with Subtle Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={category.bannerImage}
          alt={category.nameAr}
          className="w-full h-full object-cover opacity-20 filter blur-[1px]"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#071322]/90 via-[#0B192C]/80 to-[#071322]/95" />
      </div>

      <div className="relative z-10 space-y-4 max-w-3xl">
        {/* Category Badge & Store Count */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-bayaak-navy-dark text-xs font-black shadow-gold">
            <Sparkles className="w-3.5 h-3.5 fill-bayaak-navy-dark" />
            <span>تصنيف معتمد</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-amber-200 text-xs font-semibold backdrop-blur-sm">
            <Store className="w-3.5 h-3.5" />
            <span>{matchingStoreCount} متجر متاح</span>
          </span>
        </div>

        {/* Category Title */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          {category.nameAr}
        </h1>

        {/* Short & Long Description */}
        <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
          {category.longDescAr}
        </p>

        {/* Category-Specific Highlight Notice */}
        <div className="p-3 rounded-2xl bg-white/10 border border-amber-400/30 backdrop-blur-md text-xs sm:text-sm text-amber-200 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
          <span>
            <strong>{category.metadataLabels.specialtyLabel}:</strong> {category.metadataLabels.featureHighlightLabel} مع ضمان التوصيل السريع والمبرد.
          </span>
        </div>

        {/* Subcategories Horizontal Scrollable Tabs */}
        {category.subcategories && category.subcategories.length > 0 && (
          <div className="pt-2">
            <div className="text-xs font-bold text-amber-300 mb-2">التصنيفات الفرعية:</div>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {category.subcategories.map(sub => {
                const isSelected = selectedSubcategory === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => onSelectSubcategory(sub.id)}
                    className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 shadow-sm ${
                      isSelected
                        ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-bayaak-navy-dark shadow-gold scale-105'
                        : 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15'
                    }`}
                  >
                    {sub.nameAr}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
