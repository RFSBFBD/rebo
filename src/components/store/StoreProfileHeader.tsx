import React from 'react';
import { Star, Clock, Truck, MapPin, Phone, Heart, Share2, CheckCircle2 } from 'lucide-react';
import { Store } from '../../types';
import { useFavorites } from '../../context/FavoritesContext';

interface StoreProfileHeaderProps {
  store: Store;
}

export const StoreProfileHeader: React.FC<StoreProfileHeaderProps> = ({ store }) => {
  const { isStoreFavorite, toggleFavoriteStore } = useFavorites();
  const isFavorite = isStoreFavorite(store.slug);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: store.nameAr,
        text: store.descriptionAr,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('تم نسخ رابط المتجر إلى الحافظة بنجاح!');
    }
  };

  return (
    <div className="bg-white rounded-3xl md:rounded-[2.5xl] overflow-hidden border-2 border-bayaak-gold/40 shadow-xl mb-8">
      {/* Cover Banner */}
      <div className="relative h-52 sm:h-64 md:h-80 w-full overflow-hidden bg-slate-200">
        <img
          src={store.coverImage}
          alt={store.nameAr}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30" />

        {/* Floating Actions on Cover */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          <button
            onClick={handleShare}
            aria-label="مشاركة المتجر"
            className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md flex items-center justify-center transition-colors shadow-md"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleFavoriteStore(store.slug)}
            aria-label={isFavorite ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
            className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 text-slate-700 hover:text-rose-600 shadow-md flex items-center justify-center transition-all active:scale-95"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-700'
              }`}
            />
          </button>
        </div>

        {/* Operating status badge */}
        <div className="absolute top-4 right-4 z-10">
          {store.isOpen ? (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-600/90 text-white text-xs font-bold backdrop-blur-md shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
              <span>مفتوح الآن ويستقبل الطلبات</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-700/90 text-white text-xs font-bold backdrop-blur-md shadow-md">
              <span>مغلق مؤقتاً ({store.openHoursAr})</span>
            </span>
          )}
        </div>
      </div>

      {/* Profile Details Container */}
      <div className="p-5 sm:p-7 md:p-8 relative">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 -mt-16 sm:-mt-20 md:-mt-24 mb-6">
          {/* Logo & Main Title */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-6">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl p-1.5 bg-white shadow-2xl border-2 border-bayaak-gold overflow-hidden shrink-0">
              <img
                src={store.logo}
                alt={store.nameAr}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-bayaak-navy">
                  {store.nameAr}
                </h1>
                <span title="متجر معتمد وموثق"><CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" /></span>
              </div>

              <p className="text-sm sm:text-base font-semibold text-amber-800">
                {store.specialtyAr}
              </p>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-2 pt-0.5">
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-amber-50 border border-amber-300 text-bayaak-navy text-xs sm:text-sm font-bold shadow-sm">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>{store.rating.toFixed(1)}</span>
                  <span className="text-slate-500 font-normal">({store.reviewCount} تقييم معتمد)</span>
                </div>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs font-semibold text-slate-600">{store.openHoursAr}</span>
              </div>
            </div>
          </div>

          {/* Contact & Phone */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <a
              href={`tel:${store.phone}`}
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-[#0B192C] hover:bg-[#132A48] text-amber-300 border border-bayaak-gold/40 text-xs sm:text-sm font-bold transition-all shadow-sm"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>اتصال بالمتجر</span>
            </a>
          </div>
        </div>

        {/* Bio Description */}
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6 max-w-4xl">
          {store.descriptionAr}
        </p>

        {/* Metadata Highlights Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-700">
          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#FAF8F5] border border-amber-200/50">
            <Clock className="w-4 h-4 text-amber-600 shrink-0" />
            <div>
              <span className="text-slate-500 text-[11px] block">وقت التوصيل التقديري:</span>
              <strong className="text-bayaak-navy">{store.deliveryTimeMinutes} دقيقة</strong>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#FAF8F5] border border-amber-200/50">
            <Truck className="w-4 h-4 text-amber-600 shrink-0" />
            <div>
              <span className="text-slate-500 text-[11px] block">رسوم التوصيل:</span>
              <strong className="text-bayaak-navy">
                {store.deliveryFee === 0 ? 'مجاني (0 ر.س)' : `${store.deliveryFee} ر.س`}
              </strong>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#FAF8F5] border border-amber-200/50">
            <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
            <div className="truncate">
              <span className="text-slate-500 text-[11px] block">الموقع والفرع:</span>
              <strong className="text-bayaak-navy truncate block">{store.addressAr}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
