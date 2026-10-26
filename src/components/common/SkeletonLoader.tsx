import React from 'react';

export const StoreCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-amber-200/50 shadow-card animate-pulse">
      <div className="h-44 bg-slate-200/80 w-full relative">
        <div className="absolute top-3 left-3 w-16 h-6 bg-slate-300 rounded-full" />
      </div>
      <div className="p-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-slate-300 -mt-10 border-2 border-white" />
          <div className="flex-1 space-y-2">
            <div className="h-5 bg-slate-300 rounded w-3/4" />
            <div className="h-3 bg-slate-200 rounded w-1/2" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-slate-200 rounded w-full" />
          <div className="h-3 bg-slate-200 rounded w-4/5" />
        </div>
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div className="h-4 bg-slate-200 rounded w-20" />
          <div className="h-4 bg-slate-200 rounded w-16" />
        </div>
        <div className="h-11 bg-slate-200 rounded-2xl w-full" />
      </div>
    </div>
  );
};

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2.5xl overflow-hidden border border-slate-200/60 shadow-sm animate-pulse">
      <div className="h-48 bg-slate-200/80 w-full" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-slate-300 rounded w-4/5" />
        <div className="h-3 bg-slate-200 rounded w-2/3" />
        <div className="flex items-center justify-between pt-2">
          <div className="h-5 bg-slate-300 rounded w-20" />
          <div className="h-9 w-24 bg-slate-200 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export const CategoryGridSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 animate-pulse">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-3xl p-4 border border-amber-200/40 flex flex-col items-center gap-3"
        >
          <div className="w-28 h-28 rounded-full bg-slate-200" />
          <div className="h-9 w-32 bg-slate-300 rounded-full" />
        </div>
      ))}
    </div>
  );
};
