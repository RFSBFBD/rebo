import React, { useState } from 'react';
import { Search, Sparkles, ShieldCheck, Zap, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HomeHeroProps {
  onOpenAIAssistant: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({ onOpenAIAssistant }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    // Default search routing to restaurants or global search
    navigate(`/categories/restaurants?q=${encodeURIComponent(searchTerm.trim())}`);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#06101E] via-[#0B192C] to-[#0D1F36] text-white pt-10 pb-16 md:pt-14 md:pb-20 px-4 sm:px-6 lg:px-8 border-b border-bayaak-gold/30">
      {/* Background Decorative Gold Ambient Lighting & Grid */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -top-24 right-10 w-72 h-72 rounded-full bg-amber-400/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-10 w-72 h-72 rounded-full bg-amber-400/5 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
        {/* Marketplace Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-semibold backdrop-blur-md shadow-sm">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>منصة التسوق والمتاجر المتعددة المدعومة بالذكاء الاصطناعي</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight sm:leading-snug">
          تسوق من أرقى المتاجر المحلية <br className="hidden sm:inline" />
          بلمسة <span className="gold-gradient-text drop-shadow-sm">ذكية وفاخرة</span>
        </h1>

        {/* Hero Description */}
        <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          اكتشف أفضل الحلويات، الزهور، المطاعم، الإلكترونيات، والمقاضي اليومية في تجربة تسوق واحدة متكاملة وسريعة حتى باب بيتك.
        </p>

        {/* Search & AI Bar */}
        <div className="max-w-2xl mx-auto pt-2">
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row items-center gap-2.5 p-2 rounded-3xl bg-white/10 backdrop-blur-md border border-amber-400/40 shadow-2xl"
          >
            <div className="relative flex-1 w-full flex items-center">
              <Search className="w-5 h-5 text-amber-300 absolute right-4 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="ابحث عن متجر، صنف، أو وجبة مفضلة..."
                className="w-full bg-white/95 text-bayaak-navy placeholder:text-slate-500 rounded-2xl pr-12 pl-4 py-3.5 text-sm sm:text-base outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="submit"
                className="flex-1 sm:flex-none px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-bayaak-navy-dark font-extrabold text-sm sm:text-base shadow-gold transition-all active:scale-95 whitespace-nowrap"
              >
                بحث
              </button>

              <button
                type="button"
                onClick={onOpenAIAssistant}
                title="مساعد بياك الذكي"
                className="px-4 py-3.5 rounded-2xl bg-bayaak-navy-surface hover:bg-bayaak-navy-light text-amber-300 border border-amber-400/30 flex items-center gap-2 text-sm font-bold transition-all active:scale-95 whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                <span className="hidden sm:inline">اسأل الذكاء الاصطناعي</span>
              </button>
            </div>
          </form>

          {/* Quick Trending Searches */}
          <div className="flex items-center justify-center gap-2 flex-wrap pt-3 text-xs text-slate-300">
            <span className="font-semibold text-amber-300">الأكثر طلباً:</span>
            <button
              onClick={() => navigate('/categories/sweets')}
              className="hover:text-amber-200 transition-colors underline decoration-amber-400/40"
            >
              شوكولاتة باتشي
            </button>
            <span>•</span>
            <button
              onClick={() => navigate('/categories/flowers')}
              className="hover:text-amber-200 transition-colors underline decoration-amber-400/40"
            >
              باقات ورد هولندي
            </button>
            <span>•</span>
            <button
              onClick={() => navigate('/categories/restaurants')}
              className="hover:text-amber-200 transition-colors underline decoration-amber-400/40"
            >
              مشاوي السلطان
            </button>
            <span>•</span>
            <button
              onClick={() => navigate('/categories/electronics')}
              className="hover:text-amber-200 transition-colors underline decoration-amber-400/40"
            >
              سماعات سوني
            </button>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="pt-6 grid grid-cols-3 gap-2 sm:gap-4 max-w-2xl mx-auto border-t border-white/10 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2">
            <Award className="w-5 h-5 text-amber-400 shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-slate-200">500+ متجر معتمد</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 border-x border-white/10">
            <Zap className="w-5 h-5 text-amber-400 shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-slate-200">توصيل فوري مبرد</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-slate-200">دفع آمن 100%</span>
          </div>
        </div>
      </div>
    </section>
  );
};
