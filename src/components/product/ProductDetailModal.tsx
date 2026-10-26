import React, { useState, useEffect } from 'react';
import { 
  X, 
  Star, 
  Minus, 
  Plus, 
  ShoppingBag, 
  Check, 
  ShieldCheck, 
  Heart,
  ChevronLeft
} from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { productService } from '../../services/api/productService';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectRelatedProduct?: (p: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onSelectRelatedProduct,
}) => {
  const { addToCart } = useCart();
  const { isProductFavorite, toggleFavoriteProduct } = useFavorites();

  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
  const [attributePriceModifier, setAttributePriceModifier] = useState<number>(0);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isAddedFeedback, setIsAddedFeedback] = useState<boolean>(false);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      setQuantity(1);
      setIsAddedFeedback(false);

      // Initialize default attributes
      const initialAttrs: Record<string, string> = {};
      let modifier = 0;
      if (product.attributes) {
        product.attributes.forEach(attr => {
          if (attr.options.length > 0) {
            initialAttrs[attr.id] = attr.options[0].id;
            modifier += attr.options[0].priceModifier || 0;
          }
        });
      }
      setSelectedAttributes(initialAttrs);
      setAttributePriceModifier(modifier);

      // Fetch related products from same store
      productService.getRelatedProducts(product.storeId, product.id, 3).then(setRelatedProducts);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const isFavorite = isProductFavorite(product.id);

  // Handle attribute change and recalculate price modifier
  const handleSelectAttributeOption = (attrId: string, optId: string) => {
    const updated = { ...selectedAttributes, [attrId]: optId };
    setSelectedAttributes(updated);

    // Calculate total price modifier
    let totalModifier = 0;
    if (product.attributes) {
      product.attributes.forEach(attr => {
        const chosenOptId = updated[attr.id];
        const opt = attr.options.find(o => o.id === chosenOptId);
        if (opt && opt.priceModifier) {
          totalModifier += opt.priceModifier;
        }
      });
    }
    setAttributePriceModifier(totalModifier);
  };

  const unitPrice = product.price + attributePriceModifier;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedAttributes, attributePriceModifier);
    setIsAddedFeedback(true);
    setTimeout(() => {
      setIsAddedFeedback(false);
      onClose();
    }, 600);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-bayaak-navy-dark/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl md:rounded-[2.5xl] w-full max-w-4xl border-2 border-bayaak-gold/40 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header Modal Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-800 bg-amber-100/60 px-3 py-1 rounded-full border border-amber-300">
              {product.storeNameAr}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-500">
              {product.internalCategoryNameAr}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavoriteProduct(product.id)}
              aria-label={isFavorite ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
              className="w-9 h-9 rounded-full bg-white hover:bg-slate-100 text-slate-700 hover:text-rose-600 shadow-sm border border-slate-200 flex items-center justify-center transition-colors"
            >
              <Heart
                className={`w-4 h-4 ${
                  isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-600'
                }`}
              />
            </button>
            <button
              onClick={onClose}
              aria-label="إغلاق تفاصيل المنتج"
              className="w-9 h-9 rounded-full bg-white hover:bg-slate-100 text-slate-700 shadow-sm border border-slate-200 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Scrollable */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
            {/* Gallery Images Column */}
            <div className="space-y-3">
              <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
                <img
                  src={selectedImage || product.image}
                  alt={product.nameAr}
                  className="w-full h-full object-cover transition-all duration-300"
                />
                {discountPercent > 0 && (
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white text-xs font-black shadow-md">
                      خصم {discountPercent}%
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {product.galleryImages && product.galleryImages.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                  {product.galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-16 h-16 rounded-2xl overflow-hidden border-2 shrink-0 transition-all ${
                        selectedImage === img
                          ? 'border-bayaak-gold shadow-gold scale-105'
                          : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details & Configurable Options Column */}
            <div className="space-y-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-bayaak-navy leading-snug mb-2">
                  {product.nameAr}
                </h2>
                <div className="flex items-center gap-2">
                  <div className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{product.rating.toFixed(1)}</span>
                    <span className="text-slate-400">({product.reviewCount} تقييم)</span>
                  </div>
                  {product.inStock ? (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-xl flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>متوفر في المخزن</span>
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-xl">
                      غير متوفر حالياً
                    </span>
                  )}
                </div>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 p-3.5 rounded-2xl bg-[#FAF8F5] border border-amber-200/60">
                <span className="text-2xl sm:text-3xl font-black text-bayaak-navy">
                  {unitPrice}
                </span>
                <span className="text-sm font-bold text-amber-600">
                  {product.currency}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    {product.originalPrice + attributePriceModifier} {product.currency}
                  </span>
                )}
                {attributePriceModifier > 0 && (
                  <span className="text-[11px] text-amber-700 font-semibold bg-amber-100 px-2 py-0.5 rounded-lg mr-auto">
                    + {attributePriceModifier} ر.س خيارات إضافية
                  </span>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  الوصف والتفاصيل:
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {product.descriptionAr}
                </p>
              </div>

              {/* Configurable Product Attributes (Dynamic options per category) */}
              {product.attributes && product.attributes.length > 0 && (
                <div className="space-y-4 pt-2 border-t border-slate-100">
                  {product.attributes.map(attr => (
                    <div key={attr.id} className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-bayaak-navy">
                        <span>{attr.nameAr}:</span>
                        {attr.required && (
                          <span className="text-[11px] text-amber-700">مطلوب</span>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {attr.options.map(opt => {
                          const isSelected = selectedAttributes[attr.id] === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => handleSelectAttributeOption(attr.id, opt.id)}
                              className={`p-3 rounded-2xl text-xs font-semibold border text-right transition-all flex items-center justify-between ${
                                isSelected
                                  ? 'border-bayaak-gold bg-amber-50/80 text-amber-900 shadow-sm ring-1 ring-amber-400'
                                  : 'border-slate-200 bg-white hover:border-amber-300 text-slate-700'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                    isSelected
                                      ? 'border-amber-600 bg-amber-600'
                                      : 'border-slate-300'
                                  }`}
                                >
                                  {isSelected && <Check className="w-3 h-3 text-white" />}
                                </div>
                                <span>{opt.nameAr}</span>
                              </div>
                              {opt.priceModifier ? (
                                <span className="text-[11px] font-bold text-amber-700">
                                  +{opt.priceModifier} ر.س
                                </span>
                              ) : null}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quantity Controls & Add to Cart */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">الكمية المطلوبة:</span>
                  <div className="flex items-center gap-3 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      aria-label="تقليل الكمية"
                      className="w-8 h-8 rounded-xl bg-white hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors shadow-sm disabled:opacity-50"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-extrabold text-sm w-6 text-center text-bayaak-navy">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      aria-label="زيادة الكمية"
                      className="w-8 h-8 rounded-xl bg-white hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Main Add Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-bayaak-navy-dark font-black text-sm sm:text-base flex items-center justify-between shadow-gold transition-all duration-200 active:scale-95 disabled:opacity-50"
                >
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 fill-bayaak-navy-dark" />
                    <span>
                      {isAddedFeedback ? 'تمت الإضافة بنجاح!' : 'إضافة إلى السلة'}
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold bg-bayaak-navy/15 px-3 py-1 rounded-xl">
                    الإجمالي: {totalPrice} {product.currency}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="pt-6 border-t border-slate-200">
              <h3 className="text-sm font-bold text-bayaak-navy mb-3">
                منتجات أخرى مميزة من متجر {product.storeNameAr}:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedProducts.map(rel => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelatedProduct && onSelectRelatedProduct(rel)}
                    className="p-3 rounded-2xl bg-[#FAF8F5] border border-slate-200 hover:border-bayaak-gold cursor-pointer transition-all flex items-center gap-3 group"
                  >
                    <img
                      src={rel.image}
                      alt={rel.nameAr}
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-xs text-bayaak-navy truncate group-hover:text-amber-600">
                        {rel.nameAr}
                      </h4>
                      <div className="text-xs font-bold text-amber-700 mt-0.5">
                        {rel.price} {rel.currency}
                      </div>
                    </div>
                    <ChevronLeft className="w-4 h-4 text-slate-400 rtl:rotate-0 group-hover:text-bayaak-gold" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
