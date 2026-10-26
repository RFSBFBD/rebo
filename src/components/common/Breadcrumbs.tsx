import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="مسار التنقل" className="py-3 px-1 text-sm text-bayaak-navy/70 flex items-center gap-1.5 flex-wrap">
      <Link
        to="/"
        className="inline-flex items-center gap-1 hover:text-bayaak-gold font-medium transition-colors"
      >
        <Home className="w-3.5 h-3.5 text-bayaak-gold" />
        <span>الرئيسية</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronLeft className="w-3.5 h-3.5 text-bayaak-gold/60 rtl:rotate-0" />
            {isLast || !item.to ? (
              <span className="font-semibold text-bayaak-navy truncate max-w-[200px] sm:max-w-none">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.to}
                className="hover:text-bayaak-gold transition-colors font-medium truncate max-w-[150px] sm:max-w-none"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
