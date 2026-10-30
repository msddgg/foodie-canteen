import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_DISHES, MOCK_WINDOWS } from '@/data/mockData';
import { getDishMeta } from '@/lib/canteen';
import DishCover from '@/components/DishCover';
import { ScoreBadge } from '@/components/ScoreBadge';
import { cn } from '@/lib/utils';

type RankKey = 'hot' | 'rated' | 'value' | 'must' | 'hidden' | 'avoid';
const TABS: { key: RankKey; label: string }[] = [
  { key: 'hot', label: '今日最受欢迎' }, { key: 'rated', label: '本周好评榜' }, { key: 'value', label: '高性价比榜' },
  { key: 'must', label: '学生必吃榜' }, { key: 'hidden', label: '隐藏美食榜' }, { key: 'avoid', label: '避雷榜' },
];

export default function RankingsPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<RankKey>('hot');
  const list = useMemo(() => {
    const arr = [...MOCK_DISHES];
    switch (tab) {
      case 'hot': return arr.sort((a, b) => b.heat - a.heat);
      case 'rated': return arr.sort((a, b) => b.rating - a.rating);
      case 'value': return arr.sort((a, b) => b.valueScore - a.valueScore || b.price - a.price);
      case 'must': return arr.sort((a, b) => b.recommendCount - a.recommendCount).slice(0, 10);
      case 'hidden': return arr.sort((a, b) => b.heat - a.heat).slice(10, 18);
      case 'avoid': return arr.filter((d) => d.trend === 'down' || d.rating < 3.5).sort((a, b) => a.rating - b.rating);
    }
  }, [tab]);

  return (
    <div className="space-y-5">
      <div><h1 className="text-xl font-bold">菜品排行榜</h1><p className="text-sm text-muted-foreground">什么值得吃，榜单说话。</p></div>
      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)} className={cn('rounded-full px-3 py-1.5 text-sm transition-colors', tab === t.key ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-muted-foreground hover:bg-muted')}>{t.label}</button>
        ))}
      </div>
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        {list.map((d, i) => {
          const meta = getDishMeta(d);
          return (
            <button key={d.id} onClick={() => navigate(`/dish/${d.id}`)} className="flex w-full items-center gap-3 border-b border-border p-3 text-left transition-colors last:border-0 hover:bg-muted">
              <span className={cn('flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-sm font-bold', i === 0 && 'bg-primary text-primary-foreground', i === 1 && 'bg-orange-400 text-white', i === 2 && 'bg-amber-500 text-white', i > 2 && 'bg-muted text-muted-foreground')}>{i + 1}</span>
              <DishCover category={d.category} dishName={d.name} className="h-12 w-12 shrink-0 rounded-md" />
              <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{d.name}</p><p className="truncate text-xs text-muted-foreground">{meta.canteenName} · {meta.windowName}</p></div>
              <div className="hidden text-right sm:block"><ScoreBadge score={d.rating} /><p className="mt-0.5 text-[11px] text-muted-foreground">{d.recommendCount} 人推荐</p></div>
              <span className="w-14 text-right text-sm font-bold text-primary">¥{d.price}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
