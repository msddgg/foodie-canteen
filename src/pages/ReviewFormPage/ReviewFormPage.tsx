import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Star, Clock, Plus } from 'lucide-react';
import { MOCK_DISHES, MOCK_WINDOWS, MOCK_CANTEENS } from '@/data/mockData';
import { useApp } from '@/context/app-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const ALL_TAGS = ['好吃', '分量足', '便宜', '排队久', '偏咸', '偏油', '不推荐'];

export default function ReviewFormPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const preDish = params.get('dish') ?? '';
  const { addReview } = useApp();
  const [dishId, setDishId] = useState(preDish);
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState(5);
  const [taste, setTaste] = useState(5);
  const [portion, setPortion] = useState(5);
  const [value, setValue] = useState(5);
  const [wait, setWait] = useState('5');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const dishOptions = MOCK_DISHES.map((d) => {
    const win = MOCK_WINDOWS.find((w) => w.id === d.windowId);
    const can = MOCK_CANTEENS.find((c) => c.id === d.canteenId);
    return { id: d.id, label: `${d.name}（${can?.name}·${win?.name}）` };
  });

  const toggleTag = (t: string) => setTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const submit = () => {
    if (!dishId) { toast.error('请选择菜品'); return; }
    if (!content.trim()) { toast.error('写几句真实评价吧'); return; }
    addReview({
      id: `u-${Date.now()}`, dishId, user: '我（同学）', avatarHue: Math.floor(Math.random() * 360),
      rating, tasteScore: taste, portionScore: portion, valueScore: value,
      waitMinutes: Number(wait) || 0, content: content.trim(), tags, createdAt: new Date().toISOString(),
    });
    toast.success('评价已发布，感谢反馈！');
    const d = MOCK_DISHES.find((x) => x.id === dishId);
    navigate(d ? `/dish/${d.id}` : '/');
  };

  return (
    <div className="mx-auto max-w-2 space-y-5">
      <div><h1 className="text-xl font-bold">发布评价</h1><p className="text-sm text-muted-foreground">你的一句真话，能帮很多同学避坑。</p></div>
      <div className="space-y-4 rounded-xl border border-border bg-card p-5">
        <div className="space-y-2">
          <Label>选一道你吃过的菜</Label>
          <Select value={dishId} onValueChange={setDishId}>
            <SelectTrigger><SelectValue placeholder="选择菜品" /></SelectTrigger>
            <SelectContent>{dishOptions.map((d) => (<SelectItem key={d.id} value={d.id}>{d.label}</SelectItem>))}</SelectContent>
          </Select>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2"><Label>消费价格（元）</Label><Input type="number" min={0} value={price} onChange={(e) => setPrice(e.target.value)} placeholder="如 16" /></div>
          <div className="space-y-2"><Label className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />实际排队时间（分钟）</Label><Input type="number" min={0} value={wait} onChange={(e) => setWait(e.target.value)} /></div>
        </div>
        <StarRow label="综合评分" value={rating} onChange={setRating} />
        <StarRow label="口味" value={taste} onChange={setTaste} />
        <StarRow label="分量" value={portion} onChange={setPortion} />
        <StarRow label="性价比" value={value} onChange={setValue} />
        <div className="space-y-2">
          <Label>标签（可多选）</Label>
          <div className="flex flex-wrap gap-2">
            {ALL_TAGS.map((t) => (
              <button key={t} type="button" onClick={() => toggleTag(t)} className={cn('rounded-full px-3 py-1.5 text-sm transition-colors', tags.includes(t) ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/70')}>
                <Plus className="mr-1 inline h-3 w-3" />{t}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2"><Label>你的评价</Label><Textarea rows={4} value={content} onChange={(e) => setContent(e.target.value)} placeholder="说说味道、分量、排队体验，真实最有价值～" /></div>
        <Button onClick={submit} className="w-full" size="lg">发布评价</Button>
      </div>
    </div>
  );
}

function StarRow({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void; }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{label}</span>
      <div className="flex gap-0.5">{[1, 2, 3, 4, 5].map((n) => (<button key={n} type="button" onClick={() => onChange(n)}><Star className={cn('h-5 w-5', n <= value ? 'fill-primary text-primary' : 'text-muted-foreground')} /></button>))}</div>
    </div>
  );
}
