import React from 'react';
import { Plus, Star, Heart, Check, Eye } from 'lucide-react';
import { Product } from '../../types';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetails }) => {
  const { isProductFavorite, toggleFavoriteProduct } = useFavorites();
  const { addToCart } = useCart();
  const isFavorite = isProductFavorite(product.id);

  // Genuine discount calculation
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // If the product has required configurable attributes (like packaging or choice), open details modal so user selects options
    if (product.attributes && product.attributes.some(a => a.required)) {
      onOpenDetails(product);
    } else {
      addToCart(product, 1);
    }
  };

  return (
    <div
      onClick={() => onOpenDetails(product)}
      className="group bg-white rounded-3xl overflow-hidden border border-amber-200/60 hover:border-bayaak-gold shadow-[0_4px_16px_rgba(11,25,44,0.04)] hover:shadow-[0_10px_25px_rgba(212,175,55,0.2)] transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Product Image & Badges */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
          <img
            src={product.image}
            alt={product.nameAr}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

          {/* Discount Badge if genuine discount exists */}
          {discountPercent > 0 && (
            <div className="absolute top-3 right-3 z-10">
              <span className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white text-xs font-black shadow-md">
                خصم {discountPercent}%
              </span>
            </div>
          )}

          {/* Best Seller / New Badge */}
          {product.isBestSeller && discountPercent === 0 && (
            <div className="absolute top-3 right-3 z-10">
              <span className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-bayaak-navy-dark text-xs font-black shadow-md">
                الأكثر مبيعاً
              </span>
            </div>
          )}

          {/* Favorite Toggle */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavoriteProduct(product.id);
            }}
            aria-label={isFavorite ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
            className="absolute top-3 left-3 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-rose-600 shadow-md flex items-center justify-center transition-all active:scale-90"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-600'
              }`}
            />
          </button>

          {/* Rating */}
          <div className="absolute bottom-2.5 right-3 z-10">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-sm text-white text-[11px] font-bold">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span>{product.rating.toFixed(1)}</span>
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5">
          <div className="text-[11px] text-amber-800 font-semibold mb-1">
            {product.internalCategoryNameAr}
          </div>

          <h4 className="font-extrabold text-sm sm:text-base text-bayaak-navy group-hover:text-amber-600 transition-colors line-clamp-2 mb-2 leading-snug">
            {product.nameAr}
          </h4>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
            {product.descriptionAr}
          </p>
        </div>
      </div>

      {/* Pricing & Quick Add Action */}
      <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
        <div className="space-y-0.5">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base sm:text-lg font-black text-bayaak-navy">
              {product.price}
            </span>
            <span className="text-xs font-bold text-amber-600">
              {product.currency}
            </span>
          </div>

          {product.originalPrice && (
            <span className="text-xs text-slate-400 line-through block">
              {product.originalPrice} {product.currency}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(product);
            }}
            title="عرض التفاصيل"
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleQuickAdd}
            className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-bayaak-navy-dark font-black text-xs flex items-center gap-1.5 shadow-gold transition-all active:scale-95 whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>إضافة</span>
          </button>
        </div>
      </div>
    </div>
  );
};
