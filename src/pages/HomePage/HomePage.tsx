import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, Dices, Flame, TrendingDown, Sparkle, Store } from 'lucide-react';
import { MOCK_DISHES, MOCK_CANTEENS } from '@/data/mockData';
import DishCard from '@/components/DishCard';
import AIRecommendDialog from './AIRecommendDialog';
import RandomPickDialog from './RandomPickDialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [aiOpen, setAiOpen] = useState(false);
  const [randomOpen, setRandomOpen] = useState(false);

  const topRated = useMemo(() => [...MOCK_DISHES].sort((a, b) => b.rating - a.rating).slice(0, 4), []);
  const hotDishes = useMemo(() => [...MOCK_DISHES].sort((a, b) => b.heat - a.heat).slice(0, 4), []);
  const newDishes = useMemo(() => MOCK_DISHES.filter((d) => d.isNew).slice(0, 3), []);
  const avoidDishes = useMemo(() => MOCK_DISHES.filter((d) => d.trend === 'down').slice(0, 3), []);

  const onSearch = () => {
    const q = query.trim();
    if (q) navigate(`/canteens?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-gradient-to-br from-primary to-orange-600 p-6 text-white sm:p-10">
        <h1 className="text-2xl font-bold leading-tight sm:text-4xl">今天吃什么？<br /><span className="text-white/90">让真实评价告诉你。</span></h1>
        <p className="mt-2 max-w-md text-sm text-white/85">校园版大众点评 · 菜品评分 · 排队时间 · 避雷指南，不再为选食堂纠结。</p>
        <div className="mt-5 flex max-w-lg items-center gap-2 rounded-xl bg-white p-1.5 shadow-lg">
          <Search className="ml-2 h-4 w-4 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && onSearch()} placeholder="搜索食堂、窗口或菜品，如：黄焖鸡" className="border-0 bg-transparent text-foreground focus-visible:ring-0" />
          <Button onClick={onSearch} className="shrink-0">搜索</Button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button onClick={() => setAiOpen(true)} className="bg-white text-primary hover:bg-white/90"><Sparkles className="mr-1 h-4 w-4" />AI 帮我选</Button>
          <Button onClick={() => setRandomOpen(true)} variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"><Dices className="mr-1 h-4 w-4" />饭搭子随机抽一道</Button>
        </div>
      </section>

      <section>
        <SectionTitle icon={<Sparkle className="h-4 w-4 text-primary" />} title="今日推荐" subtitle="按评分和热度精选" onMore={() => navigate('/rankings')} />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{topRated.map((d) => <DishCard key={d.id} dish={d} />)}</div>
      </section>

      <section>
        <SectionTitle icon={<Flame className="h-4 w-4 text-destructive" />} title="今日热门" subtitle="大家最近都在吃" onMore={() => navigate('/rankings')} />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{hotDishes.map((d) => <DishCard key={d.id} dish={d} />)}</div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-border bg-card p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2"><Sparkle className="h-4 w-4 text-success" /><h2 className="font-semibold">本周新品</h2></div>
            <span className="text-xs text-muted-foreground">发现食堂新味道</span>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">{newDishes.map((d) => <DishCard key={d.id} dish={d} compact />)}</div>
        </section>
        <section className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2"><TrendingDown className="h-4 w-4 text-destructive" /><h2 className="font-semibold">今日避雷预警</h2></div>
            <button onClick={() => navigate('/avoid')} className="text-xs font-medium text-destructive">查看全部 →</button>
          </div>
          <div className="space-y-2">
            {avoidDishes.map((d) => (
              <button key={d.id} onClick={() => navigate(`/dish/${d.id}`)} className="flex w-full items-center justify-between rounded-lg bg-card p-2.5 text-left transition-colors hover:bg-muted">
                <div><p className="text-sm font-medium">{d.name}</p><p className="text-xs text-muted-foreground">近期评分下降 {d.trendDelta} 分</p></div>
                <span className="rounded bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">{d.rating.toFixed(1)}</span>
              </button>
            ))}
          </div>
        </section>
      </div>

      <section>
        <SectionTitle icon={<Store className="h-4 w-4 text-primary" />} title="走进哪个食堂" subtitle="5 个食堂，12 个窗口，任你选" onMore={() => navigate('/canteens')} />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {MOCK_CANTEENS.map((c) => (
            <button key={c.id} onClick={() => navigate(`/canteens?canteen=${c.id}`)} className="rounded-xl border border-border bg-card p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-md">
              <p className="text-sm font-semibold">{c.name}</p><p className="mt-1 text-xs text-muted-foreground">{c.location}</p><p className="mt-2 text-xs text-primary">{c.openHours} →</p>
            </button>
          ))}
        </div>
      </section>

      <AIRecommendDialog open={aiOpen} onOpenChange={setAiOpen} />
      <RandomPickDialog open={randomOpen} onOpenChange={setRandomOpen} />
    </div>
  );
}

function SectionTitle({ icon, title, subtitle, onMore }: { icon: React.ReactNode; title: string; subtitle?: string; onMore?: () => void; }) {
  return (
    <div className="mb-3 flex items-end justify-between">
      <div><h2 className="flex items-center gap-1.5 text-lg font-bold">{icon}{title}</h2>{subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}</div>
      {onMore && <button onClick={onMore} className="text-xs font-medium text-primary hover:underline">查看更多 →</button>}
    </div>
  );
}
