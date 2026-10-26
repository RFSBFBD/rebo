import React, { useState } from 'react';
import { 
  X, 
  CheckCircle, 
  CreditCard, 
  ShieldCheck, 
  Truck, 
  MapPin, 
  Phone, 
  User, 
  FileText,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { CheckoutFormData } from '../../types';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    closeCheckout, 
    groupedByStore, 
    subtotal, 
    totalDeliveryFee, 
    grandTotal, 
    clearCart 
  } = useCart();

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: 'محمد الشمري',
    phone: '0551234567',
    city: 'الرياض',
    deliveryAddress: 'حي العليا - شارع موسى بن نصير - عمارة 14',
    notes: 'يرجى وضع الطلب عند الباب والاتصال بي',
    paymentMethod: 'mada',
  });

  const [orderSubmitted, setOrderSubmitted] = useState<boolean>(false);
  const [orderNumber, setOrderNumber] = useState<string>('');

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const randomOrderNum = `BYK-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(randomOrderNum);
    setOrderSubmitted(true);
    clearCart();
  };

  const handleFinish = () => {
    setOrderSubmitted(false);
    closeCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-bayaak-navy-dark/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl md:rounded-[2.5xl] w-full max-w-2xl border-2 border-bayaak-gold/40 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#0B192C] to-[#142A4A] text-white flex items-center justify-between border-b border-bayaak-gold/30">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-bayaak-navy-dark flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5 text-bayaak-navy-dark" />
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg">
                {orderSubmitted ? 'تم تأكيد طلبك بنجاح!' : 'إتمام الطلب (تجربة تفاعلية)'}
              </h3>
              <p className="text-[11px] text-amber-200/80">بوابة طلبات بياك الآمنة</p>
            </div>
          </div>
          <button
            onClick={closeCheckout}
            aria-label="إغلاق نافذة الدفع"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
          {orderSubmitted ? (
            /* Order Success View */
            <div className="text-center py-6 space-y-5">
              <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 border-2 border-emerald-300 mx-auto flex items-center justify-center shadow-lg">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                  رقم الطلب: {orderNumber}
                </span>
                <h3 className="text-2xl font-black text-bayaak-navy">شكراً لطلبك من بياك!</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  تم إرسال تفاصيل طلبك إلى المتاجر المعنية بنجاح، وستصلك رسالة نصية برابط المتابعة الحية فور خروج المندوب.
                </p>
              </div>

              {/* Demo Mode Notice */}
              <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-300 text-amber-900 text-xs leading-relaxed max-w-lg mx-auto">
                <Sparkles className="w-4 h-4 text-amber-600 inline ml-1" />
                <strong>ملاحظة برمجية للعميل:</strong> هذا النموذج تجريبي وتفاعلي بالكامل (High-Fidelity Prototype) لتجربة دورة الشراء، ولم يتم خصم أي مبالغ حقيقية من حسابك.
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-slate-200 text-right text-xs space-y-2 max-w-md mx-auto">
                <div className="font-bold text-bayaak-navy mb-1">بيانات التسليم المسجلة:</div>
                <div>الاسم: {formData.fullName}</div>
                <div>الهاتف: {formData.phone}</div>
                <div>العنوان: {formData.city} - {formData.deliveryAddress}</div>
                <div>طريقة الدفع: {formData.paymentMethod.toUpperCase()}</div>
              </div>

              <button
                type="button"
                onClick={handleFinish}
                className="w-full max-w-xs py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-bayaak-navy-dark font-black text-sm shadow-gold transition-all"
              >
                العودة للرئيسية
              </button>
            </div>
          ) : (
            /* Checkout Form View */
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Client Information */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-bayaak-navy flex items-center gap-1.5">
                  <User className="w-4 h-4 text-amber-600" />
                  <span>معلومات المستلم</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      الاسم الكامل:
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-slate-300 focus:border-amber-400 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-bayaak-navy outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      رقم الجوال:
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-slate-300 focus:border-amber-400 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-bayaak-navy outline-none text-left"
                      dir="ltr"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-bayaak-navy flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span>عنوان التوصيل</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      المدينة:
                    </label>
                    <select
                      value={formData.city}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-slate-300 focus:border-amber-400 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-bayaak-navy outline-none"
                    >
                      <option value="الرياض">الرياض</option>
                      <option value="جدة">جدة</option>
                      <option value="الدمام والخبر">الدمام والخبر</option>
                      <option value="مكة المكرمة">مكة المكرمة</option>
                      <option value="المدينة المنورة">المدينة المنورة</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      الحي والشارع وتفاصيل العنوان:
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.deliveryAddress}
                      onChange={e => setFormData({ ...formData, deliveryAddress: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-slate-300 focus:border-amber-400 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-bayaak-navy outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    ملاحظات إضافية للمندوب (اختياري):
                  </label>
                  <input
                    type="text"
                    value={formData.notes}
                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="مثال: يرجى عدم الاتصال بالهاتف، وضع الطلب عند الباب"
                    className="w-full bg-[#FAF8F5] border border-slate-300 focus:border-amber-400 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-bayaak-navy outline-none"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-bayaak-navy flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-amber-600" />
                  <span>طريقة الدفع</span>
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'mada', label: 'مدى Mada', badge: 'فوري' },
                    { id: 'applepay', label: 'Apple Pay', badge: 'سريع' },
                    { id: 'visa', label: 'فيزا / ماستركارد', badge: '' },
                    { id: 'cash', label: 'الدفع عند الاستلام', badge: '' },
                  ].map(method => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: method.id as CheckoutFormData['paymentMethod'] })}
                      className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                        formData.paymentMethod === method.id
                          ? 'border-amber-500 bg-amber-50/80 text-amber-900 font-bold shadow-sm ring-2 ring-amber-400/30'
                          : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <span className="text-xs">{method.label}</span>
                      {method.badge && (
                        <span className="text-[10px] bg-amber-200 text-amber-900 font-bold px-1.5 rounded-full">
                          {method.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stores in Order Breakdown */}
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-slate-200 text-xs space-y-2">
                <div className="font-bold text-bayaak-navy">تفاصيل شحن المتاجر:</div>
                {groupedByStore.map(g => (
                  <div key={g.storeId} className="flex items-center justify-between text-slate-600">
                    <span>{g.storeNameAr} ({g.items.length} أصناف)</span>
                    <span className="font-bold text-bayaak-navy">{g.subtotal} + {g.storeDeliveryFee} ر.س توصيل</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between font-black text-sm text-bayaak-navy">
                  <span>المبلغ الإجمالي المستحق:</span>
                  <span className="text-amber-700 text-base">{grandTotal} ر.س</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-bayaak-navy-dark font-black text-base shadow-gold transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
              >
                <span>تأكيد الطلب ودفع {grandTotal} ر.س</span>
                <CheckCircle className="w-5 h-5 text-bayaak-navy-dark" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
