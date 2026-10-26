import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Search, 
  Sparkles, 
  Heart, 
  User, 
  Menu, 
  X, 
  ChevronDown,
  PhoneCall
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { CATEGORIES_DATA } from '../../services/mockData/categoriesData';

interface AppHeaderProps {
  onOpenAIAssistant: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ onOpenAIAssistant }) => {
  const { totalItemCount, openCart } = useCart();
  const { favoriteStoreSlugs } = useFavorites();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [headerSearchQuery, setHeaderSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleHeaderSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (headerSearchQuery.trim()) {
      navigate(`/categories/restaurants?q=${encodeURIComponent(headerSearchQuery.trim())}`);
      setHeaderSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B192C]/95 backdrop-blur-md border-b border-bayaak-gold/40 text-white shadow-navy-md transition-all">
      {/* Top micro bar for announcements */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-bayaak-navy-dark text-[11px] sm:text-xs font-bold py-1 px-4 text-center flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 fill-bayaak-navy-dark shrink-0" />
        <span>توصيل مجاني للطلبات فوق 150 ر.س مع كود خصم: BAYAAK2026</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-3 md:gap-6">
          {/* Brand Logo & Wordmark */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-amber-300 via-amber-500 to-amber-600 p-[2px] shadow-gold transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-[#0B192C] rounded-[14px] flex items-center justify-center overflow-hidden">
                <img src="/logo-bayaak.svg" alt="Bayaak Logo" className="w-8 h-8 object-contain" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black tracking-tight text-white group-hover:text-amber-300 transition-colors">
                بياك<span className="text-amber-400">.co</span>
              </span>
              <span className="text-[10px] md:text-[11px] text-amber-200/70 font-semibold tracking-wider -mt-1">
                BAYAAK MARKETPLACE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-200">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition-colors hover:text-amber-300 ${isActive ? 'text-amber-400' : ''}`
              }
            >
              الرئيسية
            </NavLink>

            {/* Categories Mega Dropdown Trigger */}
            <div className="relative group">
              <button
                onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                onMouseEnter={() => setCategoriesDropdownOpen(true)}
                className="flex items-center gap-1.5 hover:text-amber-300 transition-colors py-2"
              >
                <span>التصنيفات</span>
                <ChevronDown className="w-4 h-4 text-amber-300 transition-transform group-hover:rotate-180" />
              </button>

              {/* Dropdown Menu */}
              {categoriesDropdownOpen && (
                <div
                  onMouseLeave={() => setCategoriesDropdownOpen(false)}
                  className="absolute right-0 top-full mt-1 w-72 bg-[#0B192C] border-2 border-bayaak-gold/40 rounded-2xl shadow-2xl p-2.5 space-y-1 animate-fadeIn z-50"
                >
                  <div className="text-[11px] font-bold text-amber-400 px-3 py-1 border-b border-white/10 mb-1">
                    اختر القسم للتسوق
                  </div>
                  {CATEGORIES_DATA.map(cat => (
                    <Link
                      key={cat.id}
                      to={`/categories/${cat.slug}`}
                      onClick={() => setCategoriesDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:bg-white/10 hover:text-amber-300 transition-colors"
                    >
                      <span>{cat.nameAr}</span>
                      <span className="text-[10px] text-amber-400/80 bg-amber-400/10 px-2 py-0.5 rounded-full">
                        {cat.storeCount} متجر
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={onOpenAIAssistant}
              className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 transition-colors py-1.5 px-3 rounded-full bg-amber-400/10 border border-amber-400/30 font-bold"
            >
              <Sparkles className="w-3.5 h-3.5 fill-amber-300" />
              <span>مساعد بياك الذكي</span>
            </button>
          </nav>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xs lg:max-w-sm">
            <form onSubmit={handleHeaderSearch} className="w-full relative">
              <input
                type="text"
                value={headerSearchQuery}
                onChange={e => setHeaderSearchQuery(e.target.value)}
                placeholder="ابحث عن متجر أو منتج..."
                className="w-full bg-white/10 text-white placeholder:text-slate-400 border border-amber-400/30 focus:border-amber-400 focus:bg-white/15 rounded-full pr-10 pl-4 py-2 text-xs lg:text-sm outline-none transition-all"
              />
              <button
                type="submit"
                aria-label="بحث"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400 hover:text-amber-300"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Action Icons: AI, Favorites, Cart, Account */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile AI button */}
            <button
              onClick={onOpenAIAssistant}
              aria-label="مساعد بياك الذكي"
              className="lg:hidden p-2 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300 hover:bg-amber-400/20 transition-colors"
            >
              <Sparkles className="w-4 h-4 fill-amber-300" />
            </button>

            {/* Favorites Icon */}
            <Link
              to="/categories/restaurants"
              title="المتاجر المفضلة"
              className="relative p-2 md:p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-amber-300 border border-white/10 transition-colors"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {favoriteStoreSlugs.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {favoriteStoreSlugs.length}
                </span>
              )}
            </Link>

            {/* Shopping Cart Trigger */}
            <button
              onClick={openCart}
              aria-label="سلة التسوق"
              className="relative p-2 md:p-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-bayaak-navy-dark font-extrabold shadow-gold transition-all active:scale-95 flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-bayaak-navy-dark fill-bayaak-navy-dark" />
              <span className="hidden sm:inline text-xs font-black">السلة</span>
              {totalItemCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-bayaak-navy text-amber-300 text-xs font-black flex items-center justify-center shadow-sm">
                  {totalItemCount}
                </span>
              )}
            </button>

            {/* User Account Button (Demo) */}
            <button
              onClick={() => alert('مرحباً بك في بياك! حساب العميل متاح للتسوق التجريبي.')}
              aria-label="حسابي"
              className="hidden sm:flex p-2 md:p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-amber-300 border border-white/10 transition-colors items-center gap-1.5 text-xs font-semibold"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden lg:inline">حسابي</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="فتح القائمة"
              className="lg:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#06101E] border-t border-bayaak-gold/30 p-4 space-y-4 animate-fadeIn">
          {/* Mobile Search */}
          <form onSubmit={handleHeaderSearch} className="w-full relative">
            <input
              type="text"
              value={headerSearchQuery}
              onChange={e => setHeaderSearchQuery(e.target.value)}
              placeholder="ابحث عن متجر أو منتج..."
              className="w-full bg-white/10 text-white placeholder:text-slate-400 border border-amber-400/30 rounded-2xl pr-10 pl-4 py-2.5 text-sm outline-none"
            />
            <button
              type="submit"
              aria-label="بحث"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Navigation Links */}
          <div className="space-y-1 font-semibold text-sm">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-slate-200 hover:bg-white/10 hover:text-amber-300"
            >
              الرئيسية
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAIAssistant();
              }}
              className="w-full text-right px-3 py-2 rounded-xl text-amber-300 hover:bg-white/10 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 fill-amber-300" />
                <span>مساعد بياك الذكي (AI)</span>
              </span>
              <span className="text-[10px] bg-amber-400 text-bayaak-navy-dark px-2 py-0.5 rounded-full font-bold">
                جديد
              </span>
            </button>
          </div>

          {/* Categories Grid on Mobile */}
          <div className="pt-2 border-t border-white/10">
            <div className="text-xs font-bold text-amber-400 mb-2">تصفح حسب القسم:</div>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES_DATA.map(c => (
                <Link
                  key={c.id}
                  to={`/categories/${c.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-2.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-slate-200 hover:text-amber-300 transition-colors flex items-center justify-between"
                >
                  <span className="truncate">{c.nameAr}</span>
                  <span className="text-[10px] text-amber-400/80">{c.storeCount}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
