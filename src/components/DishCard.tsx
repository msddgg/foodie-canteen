import { useNavigate } from 'react-router-dom';
import { Heart, Flame } from 'lucide-react';
import type { IDish } from '@/data/types';
import DishCover from './DishCover';
import { ScoreBadge, TrendBadge } from './ScoreBadge';
import { getDishMeta } from '@/lib/canteen';
import { useApp } from '@/context/app-context';
import { cn } from '@/lib/utils';

export default function DishCard({ dish, compact = false }: { dish: IDish; compact?: boolean }) {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useApp();
  const { windowName, canteenName } = getDishMeta(dish);
  const fav = isFavorite(dish.id);
  return (
    <div onClick={() => navigate(`/dish/${dish.id}`)}
      className="group cursor-pointer overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-md">
      <DishCover category={dish.category} dishName={dish.name} className={compact ? 'h-24' : 'h-32'} />
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 text-sm font-semibold">{dish.name}</h3>
          <button type="button" aria-label="收藏" onClick={(e) => { e.stopPropagation(); toggleFavorite(dish.id); }}
            className="shrink-0 rounded-full p-1 text-muted-foreground hover:bg-muted">
            <Heart className={cn('h-4 w-4', fav && 'fill-primary text-primary')} />
          </button>
        </div>
        <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{canteenName} · {windowName}</p>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5"><ScoreBadge score={dish.rating} /><span className="text-xs text-muted-foreground">{dish.recommendCount} 人推荐</span></div>
          <span className="text-base font-bold text-primary">¥{dish.price}</span>
        </div>
        {!compact && (
          <div className="mt-2 flex flex-wrap items-center gap-1">
            {dish.tags.slice(0, 3).map((t) => (<span key={t} className="rounded bg-secondary px-1.5 py-0.5 text-[11px] text-secondary-foreground">#{t}</span>))}
            {dish.isNew && <span className="rounded bg-success/10 px-1.5 py-0.5 text-[11px] font-medium text-success">本周新品</span>}
            {dish.trend === 'down' && <TrendBadge trend={dish.trend} delta={dish.trendDelta} />}
            {dish.heat > 85 && (<span className="inline-flex items-center gap-0.5 rounded bg-destructive/10 px-1.5 py-0.5 text-[11px] font-medium text-destructive"><Flame className="h-3 w-3" />热门</span>)}
          </div>
        )}
      </div>
    </div>
  );
}
