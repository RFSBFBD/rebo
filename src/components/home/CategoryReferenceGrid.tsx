import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Candy, 
  Flower2, 
  ShoppingCart, 
  UtensilsCrossed, 
  PawPrint, 
  Sparkles, 
  Laptop, 
  Cross 
} from 'lucide-react';
import { CATEGORIES_DATA } from '../../services/mockData/categoriesData';

// Map icons to the 8 categories from reference image
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  sweets: <Candy className="w-5 h-5 text-amber-300" />,
  flowers: <Flower2 className="w-5 h-5 text-amber-300" />,
  supermarkets: <ShoppingCart className="w-5 h-5 text-amber-300" />,
  restaurants: <UtensilsCrossed className="w-5 h-5 text-amber-300" />,
  pets: <PawPrint className="w-5 h-5 text-amber-300" />,
  beauty: <Sparkles className="w-5 h-5 text-amber-300" />,
  electronics: <Laptop className="w-5 h-5 text-amber-300" />,
  pharmacies: <Cross className="w-5 h-5 text-amber-300" />,
};

export const CategoryReferenceGrid: React.FC = () => {
  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Reference Title Header: "اكتشف من حولك" with 3D Gold & Navy Arabic Typography */}
      <div className="flex items-center justify-center gap-3 md:gap-6 mb-10 md:mb-14">
        {/* Left Golden Ornament */}
        <div className="flex items-center gap-1.5 opacity-90">
          <div className="h-[2px] w-8 md:w-16 bg-gradient-to-r from-transparent via-amber-400 to-amber-500 rounded-full" />
          <div className="w-3 h-3 md:w-4 md:h-4 rotate-45 bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 shadow-sm border border-amber-300" />
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-center tracking-tight text-bayaak-navy relative select-none">
          <span className="title-3d-gold drop-shadow-md">اكتشف من حولك</span>
        </h2>

        {/* Right Golden Ornament */}
        <div className="flex items-center gap-1.5 opacity-90">
          <div className="w-3 h-3 md:w-4 md:h-4 rotate-45 bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 shadow-sm border border-amber-300" />
          <div className="h-[2px] w-8 md:w-16 bg-gradient-to-l from-transparent via-amber-400 to-amber-500 rounded-full" />
        </div>
      </div>

      {/* Grid of the 8 Categories Matching the Reference Image */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-7">
        {CATEGORIES_DATA.map((category) => {
          const icon = CATEGORY_ICONS[category.slug] || <ShoppingCart className="w-5 h-5 text-amber-300" />;

          return (
            <Link
              key={category.id}
              to={`/categories/${category.slug}`}
              className="group relative bg-[#FDFBF7] rounded-[2rem] p-3 sm:p-4 border-2 border-[#D4AF37]/50 hover:border-[#D4AF37] transition-all duration-300 hover:-translate-y-1.5 shadow-[0_4px_16px_rgba(11,25,44,0.06)] hover:shadow-[0_12px_28px_rgba(212,175,55,0.25)] flex flex-col items-center overflow-hidden"
            >
              {/* Inner Double Thin Border Frame (matching reference card contour) */}
              <div className="absolute inset-1.5 rounded-[1.6rem] border border-[#D4AF37]/30 pointer-events-none group-hover:border-[#D4AF37]/60 transition-colors" />

              {/* Upper Circular Framed Illustration */}
              <div className="relative w-full aspect-square max-w-[210px] my-1 sm:my-2 flex items-center justify-center">
                {/* Outer Golden Metallic Ring */}
                <div className="w-full h-full rounded-full p-1 bg-gradient-to-br from-[#BF953F] via-[#FCF6BA] to-[#AA8221] shadow-md group-hover:shadow-gold transition-shadow">
                  {/* Inner Dark Navy Gap */}
                  <div className="w-full h-full rounded-full p-[3px] bg-[#0B192C]">
                    {/* Illustration Image Container */}
                    <div className="w-full h-full rounded-full overflow-hidden relative bg-white">
                      <img
                        src={category.illustrationImage}
                        alt={category.nameAr}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Subtle lighting shine */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/30 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Navy Pill with Golden Frame & Icon (Faithful Reference Replica) */}
              <div className="w-full mt-2 sm:mt-3 z-10 flex flex-col items-center">
                <div className="w-full max-w-[220px] bg-gradient-to-b from-[#0F223D] to-[#071322] border-2 border-[#D4AF37] rounded-2xl sm:rounded-3xl py-1.5 px-2.5 sm:py-2 sm:px-3 shadow-[0_4px_10px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center gap-1 group-hover:border-[#F9DC7D] transition-colors">
                  {/* Small Circular Golden Icon Crest */}
                  <div className="w-8 h-8 sm:w-9 sm:h-9 -mt-5 sm:-mt-6 rounded-full bg-gradient-to-b from-[#0F223D] to-[#071322] border-2 border-[#D4AF37] flex items-center justify-center shadow-md">
                    {icon}
                  </div>

                  {/* Arabic Category Label */}
                  <span className="text-white font-extrabold text-sm sm:text-base md:text-lg text-center tracking-wide leading-tight group-hover:text-amber-300 transition-colors">
                    {category.nameAr}
                  </span>
                </div>

                {/* Subtitle / Available Stores Count */}
                <span className="text-[11px] sm:text-xs text-bayaak-navy/60 font-medium mt-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                  {category.storeCount} متجر متاح
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
