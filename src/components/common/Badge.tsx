import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'navy' | 'green' | 'red' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gold',
  size = 'md',
  className = '',
  icon,
}) => {
  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs md:text-sm px-2.5 py-1';

  const variantClasses = {
    gold: 'bg-gradient-to-r from-amber-50 to-amber-100 text-amber-900 border border-amber-300 font-semibold shadow-sm',
    navy: 'bg-bayaak-navy text-bayaak-gold-light border border-bayaak-gold/40 font-medium',
    green: 'bg-emerald-50 text-emerald-800 border border-emerald-300 font-medium',
    red: 'bg-rose-50 text-rose-800 border border-rose-300 font-medium',
    outline: 'bg-white/80 text-bayaak-navy border border-bayaak-cream-border font-medium',
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full ${sizeClasses} ${variantClasses} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
