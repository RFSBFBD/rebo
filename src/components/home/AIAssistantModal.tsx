import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, ArrowRight, Store as StoreIcon, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { STORES_DATA } from '../../services/mockData/storesData';
import { PRODUCTS_DATA } from '../../services/mockData/productsData';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AIResponse {
  query: string;
  responseAr: string;
  suggestedStores: typeof STORES_DATA;
  suggestedProducts: typeof PRODUCTS_DATA;
}

const QUICK_PROMPTS = [
  'هدية عيد ميلاد فخمة بحدود 250 ريال',
  'أريد شوكولاتة بلجيكية فاخرة لضيافة مناسبة',
  'أفضل مطعم مشاوي نعيمي مفتوح الآن',
  'سماعات رأس عازلة للضوضاء مع ضمان سنتين',
  'باقة ورد طبيعي هولندي لمولود جديد',
];

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState<AIResponse[]>([]);

  if (!isOpen) return null;

  const handleAsk = (promptText?: string) => {
    const textToSearch = promptText || query;
    if (!textToSearch.trim()) return;

    setLoading(true);

    // Simulate smart AI recommendation processing
    setTimeout(() => {
      const q = textToSearch.toLowerCase();

      // Find stores matching keywords
      const matchedStores = STORES_DATA.filter(store => 
        q.includes('شوكولاتة') || q.includes('حلويات') ? store.categorySlug === 'sweets' :
        q.includes('ورد') || q.includes('زهور') || q.includes('هدية') ? store.categorySlug === 'flowers' || store.categorySlug === 'sweets' :
        q.includes('مشاوي') || q.includes('مطعم') || q.includes('عشاء') ? store.categorySlug === 'restaurants' :
        q.includes('سماعة') || q.includes('إلكترونيات') || q.includes('تقني') ? store.categorySlug === 'electronics' :
        q.includes('عطر') || q.includes('مكياج') || q.includes('جمال') ? store.categorySlug === 'beauty' :
        store.nameAr.toLowerCase().includes(q) || store.tagsAr.some(t => q.includes(t))
      ).slice(0, 2);

      // Find matching products
      const matchedProducts = PRODUCTS_DATA.filter(p =>
        q.includes('250') || q.includes('200') ? p.price <= 280 :
        q.includes('شوكولاتة') ? p.storeSlug.includes('patchi') :
        q.includes('ورد') ? p.storeSlug.includes('flora') :
        q.includes('مشاوي') ? p.storeSlug.includes('sultan') :
        q.includes('سماعة') ? p.tagsAr.includes('سوني') :
        p.nameAr.toLowerCase().includes(q)
      ).slice(0, 3);

      let aiMessage = `بناءً على طلبك، قمت بمسح أفضل المتاجر والمنتجات المتوفرة فوراً في بياك. إليك هذه الخيارات المختارة بعناية:`;
      if (q.includes('هدية') || q.includes('250')) {
        aiMessage = `اخترت لك أفضل خيارات الهدايا ذات التقييم الاستثنائي (4.9★) ضمن ميزانيتك، مع توفر خيارات التغليف الفاخر وكروت الإهداء المذهبة.`;
      } else if (q.includes('مشاوي') || q.includes('مطعم')) {
        aiMessage = `أنصحك بمطعم "لاونج ومشاوي السلطان الفاخر"، يقدم لحم نعيمي طازج على الفحم وتوصيل فوري ساخن ومجاني.`;
      }

      const newResponse: AIResponse = {
        query: textToSearch,
        responseAr: aiMessage,
        suggestedStores: matchedStores.length > 0 ? matchedStores : STORES_DATA.slice(0, 2),
        suggestedProducts: matchedProducts.length > 0 ? matchedProducts : PRODUCTS_DATA.slice(0, 2),
      };

      setConversation(prev => [newResponse, ...prev]);
      setQuery('');
      setLoading(false);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bayaak-navy-dark/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-2xl border border-bayaak-gold/40 shadow-2xl flex flex-col max-h-[88vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 md:p-5 bg-gradient-to-r from-bayaak-navy via-bayaak-navy-light to-bayaak-navy text-white flex items-center justify-between border-b border-bayaak-gold/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-bayaak-navy-dark flex items-center justify-center shadow-gold">
              <Sparkles className="w-5 h-5 text-bayaak-navy-dark fill-bayaak-navy-dark" />
            </div>
            <div>
              <h3 className="font-bold text-base md:text-lg flex items-center gap-2">
                <span>مساعد بياك الذكي للتسوق</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-400 text-bayaak-navy-dark">
                  AI Beta
                </span>
              </h3>
              <p className="text-xs text-bayaak-gold-light/80">
                اطلب ما تحتاجه بميزانيتك أو تفضيلك، ودع الذكاء الاصطناعي يختار لك الأفضل
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="إغلاق النافذة"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-4 md:p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
          {conversation.length === 0 ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-amber-50 text-bayaak-gold border border-amber-200 mx-auto flex items-center justify-center">
                <Bot className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-bayaak-navy">كيف يمكنني مساعدتك في التسوق اليوم؟</h4>
                <p className="text-sm text-bayaak-navy/60 max-w-md mx-auto mt-1">
                  أستطيع اقتراح هدايا مناسبة، مطاعم مفتوحة حسب ذوقك، مقارنة الأجهزة الإلكترونية، أو إيجاد أفضل العروض لك.
                </p>
              </div>

              {/* Quick suggestions */}
              <div className="pt-2">
                <p className="text-xs font-semibold text-bayaak-gold-dark mb-2.5">جرّب أحد الأسئلة الجاهزة:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {QUICK_PROMPTS.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAsk(p)}
                      className="text-xs bg-amber-50/70 hover:bg-amber-100 text-bayaak-navy border border-amber-200/80 px-3 py-1.5 rounded-full transition-all text-right hover:border-amber-400"
                    >
                      💡 {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {conversation.map((entry, idx) => (
                <div key={idx} className="space-y-4 border-b border-slate-100 pb-6 last:border-b-0">
                  {/* User query bubble */}
                  <div className="flex items-start gap-2 justify-end">
                    <div className="bg-bayaak-navy text-white text-sm px-4 py-2.5 rounded-2xl rounded-tr-none max-w-[80%] shadow-sm">
                      {entry.query}
                    </div>
                  </div>

                  {/* AI Response Bubble */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500 text-bayaak-navy-dark flex items-center justify-center shrink-0 shadow-sm">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="space-y-4 flex-1">
                      <div className="bg-amber-50/60 border border-amber-200/60 text-bayaak-navy text-sm p-3.5 rounded-2xl rounded-tl-none leading-relaxed">
                        {entry.responseAr}
                      </div>

                      {/* Suggested Stores */}
                      {entry.suggestedStores.length > 0 && (
                        <div>
                          <div className="flex items-center gap-1.5 text-xs font-bold text-bayaak-navy mb-2">
                            <StoreIcon className="w-3.5 h-3.5 text-bayaak-gold" />
                            <span>المتاجر المقترحة:</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {entry.suggestedStores.map(store => (
                              <Link
                                key={store.id}
                                to={`/stores/${store.slug}`}
                                onClick={onClose}
                                className="flex items-center gap-3 p-2.5 rounded-2xl bg-white border border-amber-200/80 hover:border-bayaak-gold hover:shadow-md transition-all group"
                              >
                                <img
                                  src={store.logo}
                                  alt={store.nameAr}
                                  className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-100"
                                />
                                <div className="min-w-0 flex-1">
                                  <h5 className="font-bold text-xs text-bayaak-navy truncate group-hover:text-bayaak-gold transition-colors">
                                    {store.nameAr}
                                  </h5>
                                  <p className="text-[11px] text-bayaak-navy/60 truncate">{store.specialtyAr}</p>
                                  <div className="text-[10px] text-amber-600 font-bold mt-0.5">
                                    ⭐ {store.rating} ({store.reviewCount})
                                  </div>
                                </div>
                                <ArrowRight className="w-4 h-4 text-bayaak-navy/40 group-hover:text-bayaak-gold rtl:rotate-180 transition-transform" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Suggested Products */}
                      {entry.suggestedProducts.length > 0 && (
                        <div>
                          <div className="flex items-center gap-1.5 text-xs font-bold text-bayaak-navy mb-2">
                            <Package className="w-3.5 h-3.5 text-bayaak-gold" />
                            <span>منتجات موصى بها:</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {entry.suggestedProducts.map(p => (
                              <Link
                                key={p.id}
                                to={`/stores/${p.storeSlug}`}
                                onClick={onClose}
                                className="p-2.5 rounded-2xl bg-white border border-slate-200 hover:border-bayaak-gold hover:shadow-sm transition-all text-right group"
                              >
                                <img
                                  src={p.image}
                                  alt={p.nameAr}
                                  className="w-full h-24 object-cover rounded-xl mb-2"
                                />
                                <div className="font-bold text-xs text-bayaak-navy line-clamp-1 group-hover:text-bayaak-gold transition-colors">
                                  {p.nameAr}
                                </div>
                                <div className="text-xs font-bold text-amber-700 mt-1">
                                  {p.price} {p.currency}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {loading && (
            <div className="flex items-center gap-3 p-4 bg-amber-50/50 rounded-2xl animate-pulse text-sm text-bayaak-navy">
              <Bot className="w-5 h-5 text-bayaak-gold animate-bounce" />
              <span>جاري تحليل طلبك والبحث في دليل المتاجر والمنتجات...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 md:p-4 bg-slate-50 border-t border-slate-200">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleAsk();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="اكتب ما تبحث عنه، مثال: كيك تخرج فاخر، أو هاتف ذكي ممتاز..."
              className="flex-1 bg-white border border-slate-300 focus:border-bayaak-gold focus:ring-2 focus:ring-bayaak-gold/20 rounded-2xl px-4 py-2.5 text-sm text-bayaak-navy outline-none placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white p-2.5 rounded-2xl disabled:opacity-50 transition-all shadow-sm active:scale-95"
            >
              <Send className="w-5 h-5 rtl:rotate-180" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
