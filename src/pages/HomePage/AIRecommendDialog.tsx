import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, X, CheckCircle2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MOCK_DISHES, MOCK_WINDOWS } from '@/data/mockData';
import type { IDish, TasteCategory } from '@/data/types';
import DishCover from '@/components/DishCover';
import { ScoreBadge } from '@/components/ScoreBadge';
import { getDishMeta } from '@/lib/canteen';

interface Props { open: boolean; onOpenChange: (v: boolean) => void; }

const TASTE_OPTIONS: { value: TasteCategory; label: string }[] = [
  { value: 'all', label: '不挑口味' }, { value: 'spicy', label: '无辣不欢' }, { value: 'savory', label: '咸香下饭' }, { value: 'light', label: '清淡不辣' }, { value: 'sweet', label: '甜口甜品' },
];
const WAIT_OPTIONS = [
  { value: '5', label: '5 分钟以内' }, { value: '10', label: '10 分钟以内' }, { value: '15', label: '15 分钟以内' }, { value: '30', label: '不赶时间' },
];

export default function AIRecommendDialog({ open, onOpenChange }: Props) {
  const navigate = useNavigate();
  const [budget, setBudget] = useState('18');
  const [taste, setTaste] = useState<TasteCategory>('all');
  const [maxWait, setMaxWait] = useState('10');
  const [result, setResult] = useState<IDish[] | null>(null);

  const doRecommend = () => {
    const b = Number(budget) || 999;
    const wait = Number(maxWait) || 99;
    const pool = MOCK_DISHES.filter((d) => {
      if (d.price > b) return false;
      if (taste !== 'all' && d.taste !== taste) return false;
      const win = MOCK_WINDOWS.find((w) => w.id === d.windowId);
      if (win && win.queueMinutes > wait) return false;
      return true;
    });
    pool.sort((a, b2) => b2.rating - a.rating);
    setResult(pool.slice(0, 3));
  };

  const handleClose = (v: boolean) => { if (!v) setResult(null); onOpenChange(v); };

  const matchReason = useMemo(() => {
    const reasons: string[] = [];
    if (taste !== 'all') reasons.push(TASTE_OPTIONS.find((t) => t.value === taste)?.label ?? '');
    reasons.push(`预算 ¥${budget} 以内`);
    reasons.push(`${maxWait} 分钟内可取餐`);
    return reasons.join(' · ');
  }, [taste, budget, maxWait]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary" />AI 今天吃什么</DialogTitle>
          <DialogDescription>告诉我你的预算和口味，从 30 道菜里挑 3 道最合适的。</DialogDescription>
        </DialogHeader>
        {!result ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="budget">预算上限</Label>
              <div className="flex items-center gap-2"><span className="text-sm text-muted-foreground">¥</span><Input id="budget" type="number" min={5} max={40} value={budget} onChange={(e) => setBudget(e.target.value)} /><span className="text-xs text-muted-foreground">/ 餐</span></div>
            </div>
            <div className="space-y-2">
              <Label>口味偏好</Label>
              <div className="flex flex-wrap gap-2">
                {TASTE_OPTIONS.map((t) => (
                  <button key={t.value} type="button" onClick={() => setTaste(t.value)} className={`rounded-full px-3 py-1.5 text-sm transition-colors ${taste === t.value ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/70'}`}>{t.label}</button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>可接受排队时间</Label>
              <Select value={maxWait} onValueChange={setMaxWait}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{WAIT_OPTIONS.map((w) => (<SelectItem key={w.value} value={w.value}>{w.label}</SelectItem>))}</SelectContent></Select>
            </div>
            <Button onClick={doRecommend} className="w-full"><Sparkles className="mr-1 h-4 w-4" />帮我选</Button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="flex items-center gap-1.5 text-sm text-success"><CheckCircle2 className="h-4 w-4" />已为你匹配：{matchReason}</p>
            {result.length === 0 && (<p className="rounded-lg bg-muted p-4 text-center text-sm text-muted-foreground">没有符合条件的菜，放宽预算或排队时间再试一次。</p>)}
            {result.map((d, i) => {
              const { windowName, canteenName } = getDishMeta(d);
              return (
                <button key={d.id} onClick={() => { handleClose(false); navigate(`/dish/${d.id}`); }} className="flex w-full items-center gap-3 rounded-lg border border-border bg-card p-2 text-left transition-colors hover:bg-muted">
                  <DishCover category={d.category} dishName={d.name} className="h-14 w-14 shrink-0 rounded-md" />
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-1.5 text-sm font-semibold"><span className="rounded bg-primary px-1 text-[10px] font-bold text-primary-foreground">{i + 1}</span>{d.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{canteenName} · {windowName}</p>
                  </div>
                  <div className="text-right"><ScoreBadge score={d.rating} /><p className="mt-1 text-sm font-bold text-primary">¥{d.price}</p></div>
                </button>
              );
            })}
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setResult(null)} className="flex-1"><X className="mr-1 h-4 w-4" />换一批条件</Button>
              <Button variant="outline" onClick={() => handleClose(false)} className="flex-1">关闭</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
