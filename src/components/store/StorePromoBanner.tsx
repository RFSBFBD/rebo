import React from 'react';
import { Gift, ShieldCheck, Sparkles } from 'lucide-react';
import { Store } from '../../types';

interface StorePromoBannerProps {
  store: Store;
}

export const StorePromoBanner: React.FC<StorePromoBannerProps> = ({ store }) => {
  // Category-specific relevant genuine banner text
  const getBannerDetails = () => {
    switch (store.categorySlug) {
      case 'sweets':
        return {
          title: 'خدمة التغليف الملكي وكروت الإهداء',
          desc: 'جميع طلبات الشوكولاتة والكيك يتم إعدادها وتغليفها بشرائط ساتان فاخرة مع إمكانية كتابة إهداء مخصص.',
          icon: <Gift className="w-5 h-5 text-amber-300" />,
          accent: 'من قسم الحلويات والضيافة',
        };
      case 'flowers':
        return {
          title: 'زهور طبيعية طازجة مع توصيل مبرد',
          desc: 'نضمن نضارة الورد الطبيعي الهولندي والكيني مع سيارات نقل مجهزة بدرجات حرارة مثالية.',
          icon: <Sparkles className="w-5 h-5 text-amber-300" />,
          accent: 'من قسم الزهور والهدايا',
        };
      case 'electronics':
        return {
          title: 'ضمان الوكيل الرسمي المعتمد سنتين',
          desc: 'جميع الأجهزة والإلكترونيات أصلية 100% ومغطاة بضمان الوكلاء المعتمدين في المملكة.',
          icon: <ShieldCheck className="w-5 h-5 text-amber-300" />,
          accent: 'من قسم الإلكترونيات والتقنية',
        };
      default:
        return {
          title: 'ضمان الجودة ورضا العملاء من بياك',
          desc: 'تسوق بأمان مع التزام المتجر بأعلى معايير الجودة والسرعة في تحضير وتوصيل الطلبات.',
          icon: <Sparkles className="w-5 h-5 text-amber-300" />,
          accent: 'تسوق موثوق',
        };
    }
  };

  const details = getBannerDetails();

  return (
    <div className="rounded-3xl bg-gradient-to-r from-[#0B192C] via-[#142A4A] to-[#0B192C] border-2 border-bayaak-gold/40 text-white p-4 sm:p-5 md:p-6 mb-8 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-300/40 text-amber-300 flex items-center justify-center shrink-0">
          {details.icon}
        </div>
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
              {details.accent}
            </span>
          </div>
          <h4 className="text-base sm:text-lg font-black text-white">{details.title}</h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">{details.desc}</p>
        </div>
      </div>
    </div>
  );
};
