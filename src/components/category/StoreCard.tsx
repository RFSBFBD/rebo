import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Truck, Heart, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Store } from '../../types';
import { useFavorites } from '../../context/FavoritesContext';

interface StoreCardProps {
  store: Store;
}

export const StoreCard: React.FC<StoreCardProps> = ({ store }) => {
  const { isStoreFavorite, toggleFavoriteStore } = useFavorites();
  const isFavorite = isStoreFavorite(store.slug);

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-[#D4AF37]/40 hover:border-[#D4AF37] shadow-[0_4px_16px_rgba(11,25,44,0.05)] hover:shadow-[0_12px_28px_rgba(212,175,55,0.22)] transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Cover Image & Badges */}
        <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100">
          <img
            src={store.coverImage}
            alt={store.nameAr}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Top Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

          {/* Status Badge: Open / Closed */}
          <div className="absolute top-3 right-3 z-10">
            {store.isOpen ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-600/90 text-white text-[11px] font-bold backdrop-blur-md shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                <span>مفتوح الآن</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-700/90 text-white text-[11px] font-bold backdrop-blur-md shadow-sm">
                <span>مغلق مؤقتاً</span>
              </span>
            )}
          </div>

          {/* Favorite Action Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavoriteStore(store.slug);
            }}
            aria-label={isFavorite ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
            className="absolute top-3 left-3 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-rose-600 shadow-md flex items-center justify-center transition-all active:scale-90"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-600'
              }`}
            />
          </button>

          {/* Promo Badge if present */}
          {store.promoBadge && (
            <div className="absolute bottom-3 right-3 z-10">
              <span className="inline-block px-2.5 py-1 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-black shadow-md border border-amber-300">
                {store.promoBadge.textAr}
              </span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 relative">
          {/* Overlapping Logo Avatar */}
          <div className="flex items-center justify-between -mt-12 sm:-mt-14 mb-3">
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl p-1 bg-white shadow-md border-2 border-[#D4AF37] overflow-hidden shrink-0">
              <img
                src={store.logo}
                alt={store.nameAr}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            {/* Rating pill */}
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200 text-bayaak-navy text-xs font-bold shadow-sm">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{store.rating.toFixed(1)}</span>
              <span className="text-[10px] text-slate-500">({store.reviewCount})</span>
            </div>
          </div>

          {/* Store Name & Specialty */}
          <div className="space-y-1 mb-3">
            <h3 className="font-extrabold text-base sm:text-lg text-bayaak-navy group-hover:text-amber-600 transition-colors flex items-center gap-1.5 line-clamp-1">
              <span>{store.nameAr}</span>
              <span title="متجر معتمد"><CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" /></span>
            </h3>
            <p className="text-xs text-amber-800 font-semibold truncate">
              {store.specialtyAr}
            </p>
          </div>

          {/* Short Description */}
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
            {store.descriptionAr}
          </p>

          {/* Delivery & Min Order Metadata */}
          <div className="grid grid-cols-2 gap-2 py-2.5 px-3 rounded-2xl bg-[#FAF8F5] border border-amber-200/50 text-[11px] sm:text-xs text-slate-700 mb-4">
            <div className="flex items-center gap-1.5 truncate">
              <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>{store.deliveryTimeMinutes} دقيقة تقريباً</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <Truck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>
                {store.deliveryFee === 0 ? (
                  <strong className="text-emerald-700">توصيل مجاني</strong>
                ) : (
                  `${store.deliveryFee} ر.س توصيل`
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Prominent Action Button: "زيارة المتجر" (Gold CTA as required) */}
      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0">
        <Link
          to={`/stores/${store.slug}`}
          className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-bayaak-navy-dark font-black text-sm flex items-center justify-center gap-2 shadow-gold transition-all duration-200 active:scale-95 group/btn"
        >
          <span>زيارة المتجر</span>
          <ArrowLeft className="w-4 h-4 rtl:rotate-0 group-hover/btn:-translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
