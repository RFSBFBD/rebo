import React from 'react';
import { Layers } from 'lucide-react';

interface InternalCategory {
  id: string;
  nameAr: string;
}

interface StoreCategoryNavigationProps {
  categories: InternalCategory[];
  activeCategoryId: string;
  onSelectCategory: (id: string) => void;
}

export const StoreCategoryNavigation: React.FC<StoreCategoryNavigationProps> = ({
  categories,
  activeCategoryId,
  onSelectCategory,
}) => {
  return (
    <div className="bg-white rounded-3xl p-3 md:p-4 border border-amber-200/80 shadow-[0_4px_16px_rgba(11,25,44,0.04)] mb-6">
      <div className="flex items-center gap-2 mb-2 px-1 text-xs font-bold text-amber-800">
        <Layers className="w-3.5 h-3.5 text-bayaak-gold" />
        <span>أقسام منتجات المتجر:</span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {categories.map(cat => {
          const isActive = activeCategoryId === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-bayaak-navy-dark shadow-gold scale-105'
                  : 'bg-[#FAF8F5] hover:bg-amber-50 text-slate-700 hover:text-amber-900 border border-slate-200 hover:border-amber-300'
              }`}
            >
              {cat.nameAr}
            </button>
          );
        })}
      </div>
    </div>
  );
};
