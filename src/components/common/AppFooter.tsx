import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Phone, Mail, MapPin, Heart, ShieldCheck } from 'lucide-react';
import { CATEGORIES_DATA } from '../../services/mockData/categoriesData';

export const AppFooter: React.FC = () => {
  return (
    <footer className="bg-[#06101E] text-white border-t-2 border-bayaak-gold/40 mt-16 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-300 via-amber-500 to-amber-600 p-[2px] shadow-gold">
                <div className="w-full h-full bg-[#0B192C] rounded-[14px] flex items-center justify-center">
                  <img src="/logo-bayaak.svg" alt="Bayaak Logo" className="w-8 h-8 object-contain" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-white group-hover:text-amber-300 transition-colors">
                  بياك<span className="text-amber-400">.co</span>
                </span>
                <span className="text-xs text-amber-200/70 font-semibold tracking-wider">
                  منظومة التجارة والمتاجر الذكية
                </span>
              </div>
            </Link>

            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              بياك منصة إلكترونية عربية متطورة تجمع أرقى المتاجر المحلية والعالمية، وتوفر للعملاء تجربة تسوق سهلة، ذكية، وموثوقة مع التوصيل الفوري.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>متاجر معتمدة 100%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>ذكاء اصطناعي تفاعلي</span>
              </div>
            </div>
          </div>

          {/* Categories Links (Col 1) */}
          <div className="space-y-3">
            <h4 className="text-amber-400 font-bold text-sm tracking-wide">أقسام التسوق</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              {CATEGORIES_DATA.slice(0, 4).map(c => (
                <li key={c.id}>
                  <Link
                    to={`/categories/${c.slug}`}
                    className="hover:text-amber-300 hover:translate-x-1 inline-block transition-all"
                  >
                    {c.nameAr}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Links (Col 2) */}
          <div className="space-y-3">
            <h4 className="text-amber-400 font-bold text-sm tracking-wide">المزيد من الأقسام</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              {CATEGORIES_DATA.slice(4, 8).map(c => (
                <li key={c.id}>
                  <Link
                    to={`/categories/${c.slug}`}
                    className="hover:text-amber-300 hover:translate-x-1 inline-block transition-all"
                  >
                    {c.nameAr}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Client & Vendor Support */}
          <div className="space-y-3">
            <h4 className="text-amber-400 font-bold text-sm tracking-wide">خدمات الشركاء والعملاء</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li>
                <button
                  onClick={() => alert('مرحباً بك! نموذج تسجيل التجار متاح قريباً في الإنتاج.')}
                  className="hover:text-amber-300 transition-colors text-right"
                >
                  انضم كشريك تاجر في بياك
                </button>
              </li>
              <li>
                <button
                  onClick={() => alert('فريق الدعم الفني متواجد على مدار الساعة لخدمتكم.')}
                  className="hover:text-amber-300 transition-colors text-right"
                >
                  مركز المساعدة والدعم الفني
                </button>
              </li>
              <li>
                <span className="text-slate-400">الرقم الموحد: 9200-BAYAAK</span>
              </li>
              <li>
                <span className="text-slate-400">البريد: support@bayaak.co</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>© 2026 بياك (Bayaak.co) — جميع الحقوق محفوظة</span>
          </div>

          {/* Payment Badges */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-amber-200/80">وسائل الدفع المدعومة:</span>
            <div className="flex items-center gap-1.5 font-bold text-white text-[10px]">
              <span className="px-2 py-0.5 rounded bg-white/10 border border-white/20">مدى Mada</span>
              <span className="px-2 py-0.5 rounded bg-white/10 border border-white/20">Apple Pay</span>
              <span className="px-2 py-0.5 rounded bg-white/10 border border-white/20">Visa / MC</span>
              <span className="px-2 py-0.5 rounded bg-amber-400 text-bayaak-navy-dark">الدفع عند الاستلام</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
