import { UtensilsCrossed, Soup, Flame, Drumstick, Cookie, CupSoda, CakeSlice } from 'lucide-react';
import type { DishCategory } from '@/data/types';
import { cn } from '@/lib/utils';

const CATEGORY_STYLE: Record<DishCategory, { gradient: string; icon: typeof Soup; iconColor: string }> = {
  rice: { gradient: 'from-orange-200 via-amber-100 to-yellow-50', icon: UtensilsCrossed, iconColor: 'text-orange-500' },
  noodle: { gradient: 'from-amber-100 via-yellow-50 to-orange-50', icon: Soup, iconColor: 'text-amber-600' },
  stirfry: { gradient: 'from-red-200 via-orange-100 to-amber-50', icon: Flame, iconColor: 'text-red-500' },
  bbq: { gradient: 'from-stone-300 via-amber-200 to-orange-100', icon: Drumstick, iconColor: 'text-amber-700' },
  soup: { gradient: 'from-teal-200 via-emerald-100 to-green-50', icon: Soup, iconColor: 'text-teal-600' },
  snack: { gradient: 'from-lime-200 via-emerald-100 to-green-50', icon: Cookie, iconColor: 'text-lime-700' },
  drink: { gradient: 'from-pink-200 via-orange-100 to-amber-50', icon: CupSoda, iconColor: 'text-pink-500' },
  dessert: { gradient: 'from-purple-200 via-pink-100 to-rose-50', icon: CakeSlice, iconColor: 'text-purple-500' },
};

export default function DishCover({ category, dishName, className }: { category: DishCategory; dishName: string; className?: string }) {
  const style = CATEGORY_STYLE[category] ?? CATEGORY_STYLE.rice;
  const Icon = style.icon;
  return (
    <div className={cn('relative flex items-center justify-center overflow-hidden bg-gradient-to-br', style.gradient, className)}>
      <span className="absolute right-2 bottom-1 select-none text-5xl font-black leading-none text-white/50">{dishName.charAt(0)}</span>
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/60 shadow-sm">
        <Icon className={cn('h-7 w-7', style.iconColor)} />
      </span>
    </div>
  );
}
