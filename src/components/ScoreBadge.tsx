import { Star, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { Trend } from '@/data/types';
import { cn } from '@/lib/utils';

export function ScoreBadge({ score, className }: { score: number; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-0.5 rounded-md bg-primary/10 px-1.5 py-0.5 text-xs font-bold text-primary', className)}>
      <Star className="h-3 w-3 fill-primary text-primary" />{score.toFixed(1)}
    </span>
  );
}

export function TrendBadge({ trend, delta }: { trend: Trend; delta?: number }) {
  if (trend === 'up') return (<span className="inline-flex items-center gap-0.5 rounded-md bg-success/10 px-1.5 py-0.5 text-xs font-medium text-success"><TrendingUp className="h-3 w-3" />上升 {delta?.toFixed(1)}</span>);
  if (trend === 'down') return (<span className="inline-flex items-center gap-0.5 rounded-md bg-destructive/10 px-1.5 py-0.5 text-xs font-medium text-destructive"><TrendingDown className="h-3 w-3" />下降 {delta?.toFixed(1)}</span>);
  return (<span className="inline-flex items-center gap-0.5 rounded-md bg-muted px-1.5 py-0.5 text-xs text-muted-foreground"><Minus className="h-3 w-3" />稳定</span>);
}
