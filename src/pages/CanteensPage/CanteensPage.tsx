import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Clock, Wallet, Star } from 'lucide-react';
import { MOCK_DISHES, MOCK_CANTEENS, MOCK_WINDOWS } from '@/data/mockData';
import DishCard from '@/components/DishCard';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export default function CanteensPage() {
  const [params] = useSearchParams();
  const q = params.get('q') ?? '';
  const canteenParam = params.get('canteen') ?? '';
  const [keyword, setKeyword] = useState(q);
  const [canteenId, setCanteenId] = useState(canteenParam);
  const [maxPrice, setMaxPrice] = useState(100);
  const [minRating, setMinRating] = useState(0);
  const [maxWait, setMaxWait] = useState(30);
  const cuisineOptions = useMemo(() => Array.from(new Set(MOCK_WINDOWS.map((w) => w.cuisine))), []);
  const [cuisine, setCuisine] = useState('all');

  const filtered = useMemo(() => MOCK_DISHES.filter((d) => {
    if (keyword) { const k = keyword.toLowerCase(); const win = MOCK_WINDOWS.find((w) => w.id === d.windowId); const can = MOCK_CANTEENS.find((c) => c.id === d.canteenId); const hay = `${d.name} ${d.description} ${win?.name ?? ''} ${win?.cuisine ?? ''} ${can?.name ?? ''}`.toLowerCase(); if (!hay.includes(k)) return false; }
    if (canteenId && d.canteenId !== canteenId) return false;
    if (d.price > maxPrice) return false;
    if (d.rating < minRating) return false;
    const win = MOCK_WINDOWS.find((w) => w.id === d.windowId);
    if (win && win.queueMinutes > maxWait) return false;
    if (cuisine !== 'all' && win?.cuisine !== cuisine) return false;
    return true;
  }), [keyword, canteenId, maxPrice, minRating, maxWait, cuisine]);

  return (
    <div className="space-y-5">
      <div><h1 className="text-xl font-bold">食堂探索</h1><p className="text-sm text-muted-foreground">挑个窗口，看看大家都在吃什么。</p></div>
      <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-2">
        <Search className="ml-2 h-4 w-4 text-muted-foreground" />
        <Input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="搜索菜品、窗口、食堂…" className="border-0 bg-transparent focus-visible:ring-0" />
      </div>
      <div className="flex flex-wrap gap-2">
        <FilterChip active={canteenId === ''} onClick={() => setCanteenId('')} label="全部食堂" />
        {MOCK_CANTEENS.map((c) => (<FilterChip key={c.id} active={canteenId === c.id} onClick={() => setCanteenId(c.id)} label={c.name} />))}
      </div>
      <div className="grid gap-3 rounded-xl border border-border bg-card p-3 sm:grid-cols-4">
        <FilterGroup label="人均价格" icon={<Wallet className="h-3.5 w-3.5" />}>
          <select value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm"><option value={100}>不限</option><option value={12}>¥12 以内</option><option value={18}>¥18 以内</option><option value={25}>¥25 以内</option></select>
        </FilterGroup>
        <FilterGroup label="最低评分" icon={<Star className="h-3.5 w-3.5" />}>
          <select value={minRating} onChange={(e) => setMinRating(Number(e.target.value))} className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm"><option value={0}>不限</option><option value={4.5}>4.5 分以上</option><option value={4.0}>4.0 分以上</option></select>
        </FilterGroup>
        <FilterGroup label="排队时间" icon={<Clock className="h-3.5 w-3.5" />}>
          <select value={maxWait} onChange={(e) => setMaxWait(Number(e.target.value))} className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm"><option value={30}>不限</option><option value={5}>5 分钟内</option><option value={10}>10 分钟内</option></select>
        </FilterGroup>
        <FilterGroup label="菜系">
          <select value={cuisine} onChange={(e) => setCuisine(e.target.value)} className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm"><option value="all">全部</option>{cuisineOptions.map((c) => (<option key={c} value={c}>{c}</option>))}</select>
        </FilterGroup>
      </div>
      <div className="flex items-center justify-between"><p className="text-sm text-muted-foreground">共 {filtered.length} 道菜</p></div>
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">没有符合条件的菜，放宽一点筛选试试。</div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{filtered.map((d) => <DishCard key={d.id} dish={d} />)}</div>
      )}
    </div>
  );
}

function FilterChip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string; }) {
  return (<button type="button" onClick={onClick} className={cn('rounded-full px-3 py-1.5 text-sm transition-colors', active ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground border border-border hover:bg-muted')}>{label}</button>);
}
function FilterGroup({ label, icon, children }: { label: string; icon?: React.ReactNode; children: React.ReactNode; }) {
  return (<div><label className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">{icon}{label}</label>{children}</div>);
}
