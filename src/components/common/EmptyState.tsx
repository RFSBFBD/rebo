import React from 'react';
import { SearchX, RefreshCcw } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'لا توجد نتائج مطابقة',
  description = 'جرب تغيير عبارة البحث أو إزالة الفلاتر المحددة للوصول إلى المتاجر والمنتجات.',
  actionText = 'إعادة ضبط الفلاتر',
  onAction,
  icon,
}) => {
  return (
    <div className="bg-white/80 rounded-3xl border border-bayaak-cream-border p-8 md:p-12 text-center max-w-lg mx-auto shadow-sm my-6">
      <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200/60 text-bayaak-gold mx-auto flex items-center justify-center mb-4">
        {icon || <SearchX className="w-8 h-8 text-bayaak-gold" />}
      </div>
      <h3 className="text-xl font-bold text-bayaak-navy mb-2">{title}</h3>
      <p className="text-sm text-bayaak-navy/70 mb-6 leading-relaxed">{description}</p>
      {onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium text-sm transition-all shadow-md shadow-amber-500/20 active:scale-95"
        >
          <RefreshCcw className="w-4 h-4" />
          <span>{actionText}</span>
        </button>
      )}
    </div>
  );
};
