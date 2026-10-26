import React, { useState, useEffect } from 'react';
import { HomeHero } from '../components/home/HomeHero';
import { CategoryReferenceGrid } from '../components/home/CategoryReferenceGrid';
import { StoreGrid } from '../components/category/StoreGrid';
import { storeService } from '../services/api/storeService';
import { Store } from '../types';
import { Sparkles, Trophy, ArrowLeft, ShieldCheck, Truck, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HomePageProps {
  onOpenAIAssistant: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenAIAssistant }) => {
  const [featuredStores, setFeaturedStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    storeService.getFeaturedStores(4).then(stores => {
      setFeaturedStores(stores);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-12 md:space-y-16">
      {/* 1. Hero Section */}
      <HomeHero onOpenAIAssistant={onOpenAIAssistant} />

      {/* 2. Primary Visual Core: The 8 Category Reference Grid ("اكتشف من حولك") */}
      <CategoryReferenceGrid />

      {/* 3. Featured Top-Rated Stores Across Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-bayaak-cream-border">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-300">
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              <span>مختارات بياك الذهبية</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-bayaak-navy">
              المتاجر الأعلى تقييماً والأكثر طلباً
            </h2>
          </div>

          <Link
            to="/categories/restaurants"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-amber-800 hover:text-amber-900 group"
          >
            <span>استكشف جميع المتاجر</span>
            <ArrowLeft className="w-4 h-4 rtl:rotate-0 group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        <StoreGrid stores={featuredStores} loading={loading} />
      </section>

      {/* 4. Why Choose Bayaak Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl md:rounded-[2.5xl] bg-gradient-to-br from-[#0B192C] via-[#102744] to-[#0B192C] text-white p-8 md:p-12 border-2 border-bayaak-gold/40 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/5 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-4 mb-10">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              لماذا يفضل العملاء بياك؟
            </span>
            <h3 className="text-2xl sm:text-4xl font-black leading-snug">
              تجربة تسوق موثوقة تجمع أرقى العلامات التجارية
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              صممنا بياك لتلبي تطلعات المتسوق العربي الباحث عن الفخامة والسرعة، من خلال ربطك بمتاجر معتمدة مع أعلى معايير الجودة والتغليف.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold">
                <Truck className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-white">توصيل مبرد وسريع</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                أسطول نقل مجهز يحافظ على درجة حرارة الشوكولاتة، الزهور، والأغذية الطازجة بدقة فائقة.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-white">منتجات أصلية 100%</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                ضمان ذهبي معتمد على كافة الأجهزة الإلكترونية ومستحضرات التجميل من وكلائها الرسميين.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <h4 className="font-extrabold text-base text-white">مساعد ذكي يختار لك</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                ذكاء اصطناعي تفاعلي يقترح الهدايا والمطاعم بناءً على ميزانيتك ومناسبتك بدقة.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
