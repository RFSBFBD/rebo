import React from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowLeft, 
  Store as StoreIcon, 
  AlertCircle,
  Truck,
  Sparkles
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    closeCart,
    groupedByStore,
    totalItemCount,
    subtotal,
    totalDeliveryFee,
    grandTotal,
    updateQuantity,
    removeFromCart,
    clearStoreItems,
    openCheckout,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-bayaak-navy-dark/70 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-out Drawer from Right (or Left in RTL, properly right-aligned) */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 border-l-2 border-bayaak-gold/40">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#0B192C] to-[#142A4A] text-white flex items-center justify-between border-b border-bayaak-gold/30">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-bayaak-navy-dark flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5 fill-bayaak-navy-dark" />
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg">سلة التسوق</h3>
              <p className="text-[11px] text-amber-200/80">
                {totalItemCount} {totalItemCount === 1 ? 'منتج' : 'منتجات'} • {groupedByStore.length} {groupedByStore.length === 1 ? 'متجر' : 'متاجر'}
              </p>
            </div>
          </div>
          <button
            onClick={closeCart}
            aria-label="إغلاق السلة"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-store Notice Alert if items are from multiple stores */}
        {groupedByStore.length > 1 && (
          <div className="bg-amber-50 border-b border-amber-200 p-3 text-xs text-amber-900 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>تنبيه طلب متعدد المتاجر:</strong> تحتوي سلتك على منتجات من{' '}
              {groupedByStore.length} متاجر مختلفة. سيتم تجهيز وتوصيل كل متجر بشكل منفصل لضمان الجودة والسرعة.
            </div>
          </div>
        )}

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
          {groupedByStore.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-20 h-20 rounded-full bg-amber-50 text-bayaak-gold border border-amber-200 mx-auto flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-amber-500" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-bayaak-navy">سلة التسوق فارغة حالياً</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1 leading-relaxed">
                  استكشف أفضل المتاجر والأقسام المتنوعة في بياك وأضف ما يعجبك إلى سلتك بكل سهولة.
                </p>
              </div>
              <button
                onClick={closeCart}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-bayaak-navy-dark font-black text-xs shadow-gold transition-all"
              >
                <span>ابدأ التسوق الآن</span>
                <ArrowLeft className="w-4 h-4 rtl:rotate-0" />
              </button>
            </div>
          ) : (
            groupedByStore.map(group => (
              <div
                key={group.storeId}
                className="bg-[#FAF8F5] rounded-3xl p-4 border border-amber-200/70 shadow-sm space-y-3"
              >
                {/* Store Header inside cart */}
                <div className="flex items-center justify-between pb-2 border-b border-amber-200/50">
                  <Link
                    to={`/stores/${group.storeSlug}`}
                    onClick={closeCart}
                    className="flex items-center gap-2 hover:text-amber-700 transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
                      <StoreIcon className="w-4 h-4" />
                    </div>
                    <span className="font-extrabold text-xs sm:text-sm text-bayaak-navy group-hover:text-amber-700 truncate max-w-[200px]">
                      {group.storeNameAr}
                    </span>
                  </Link>

                  <button
                    onClick={() => clearStoreItems(group.storeId)}
                    title="حذف منتجات هذا المتجر"
                    className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Items from this store */}
                <div className="space-y-3">
                  {group.items.map(item => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl p-2.5 border border-slate-200 flex items-center gap-3 shadow-xs"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.nameAr}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-100"
                      />

                      <div className="min-w-0 flex-1 space-y-1">
                        <h5 className="font-bold text-xs text-bayaak-navy line-clamp-1">
                          {item.product.nameAr}
                        </h5>

                        {/* Selected attribute labels */}
                        {item.selectedAttributes && Object.keys(item.selectedAttributes).length > 0 && (
                          <div className="text-[10px] text-amber-800 font-medium">
                            خيارات مخصصة مختارة
                          </div>
                        )}

                        <div className="text-xs font-black text-amber-700">
                          {item.unitPrice} {item.product.currency}
                        </div>
                      </div>

                      {/* Quantity Modifier */}
                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-lg bg-white hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs shadow-xs"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-black w-4 text-center text-bayaak-navy">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-lg bg-white hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs shadow-xs"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[10px] text-rose-500 hover:text-rose-700 underline"
                        >
                          حذف
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Store Subtotal */}
                <div className="pt-2 border-t border-amber-200/40 flex items-center justify-between text-xs font-bold text-slate-700">
                  <div className="flex items-center gap-1 text-slate-500">
                    <Truck className="w-3 h-3 text-amber-600" />
                    <span>توصيل المتجر: {group.storeDeliveryFee} ر.س</span>
                  </div>
                  <div>
                    مجموع المتجر: <span className="text-bayaak-navy font-black">{group.subtotal} ر.س</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout CTA */}
        {groupedByStore.length > 0 && (
          <div className="p-4 sm:p-5 bg-[#FAF8F5] border-t-2 border-amber-200 space-y-3">
            <div className="space-y-1.5 text-xs sm:text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <span>المجموع الفرعي للمنتجات:</span>
                <span className="font-bold text-bayaak-navy">{subtotal} ر.س</span>
              </div>
              <div className="flex items-center justify-between">
                <span>رسوم التوصيل ({groupedByStore.length} متاجر):</span>
                <span className="font-bold text-bayaak-navy">{totalDeliveryFee} ر.س</span>
              </div>
              <div className="flex items-center justify-between text-sm sm:text-base font-black text-bayaak-navy pt-2 border-t border-slate-200">
                <span>المجموع الكلي:</span>
                <span className="text-amber-700 text-lg sm:text-xl font-black">{grandTotal} ر.س</span>
              </div>
            </div>

            <button
              onClick={openCheckout}
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-bayaak-navy-dark font-black text-sm sm:text-base flex items-center justify-between shadow-gold transition-all duration-200 active:scale-95"
            >
              <span>متابعة إتمام الطلب (تجريبي)</span>
              <ArrowLeft className="w-5 h-5 rtl:rotate-0" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
