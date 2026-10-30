import { useNavigate } from 'react-router-dom';
import { AlertTriangle, TrendingDown } from 'lucide-react';
import { MOCK_DISHES } from '@/data/mockData';
import { getDishMeta } from '@/lib/canteen';
import DishCover from '@/components/DishCover';
import { ScoreBadge, TrendBadge } from '@/components/ScoreBadge';

const REASON_MAP: Record<string, string> = {
  d9: '近期反馈油偏大、盐放得不稳，分量比以前明显减少。',
  d12: '高峰时段排队 20 分钟以上，咸淡看厨师当天状态。',
  d22: '炸油反复使用，鸡排颜色发深，多位同学反馈吃完肠胃不适。',
};

export default function AvoidPage() {
  const navigate = useNavigate();
  const avoidList = MOCK_DISHES.filter((d) => d.trend === 'down' || d.rating < 3.5).sort((a, b) => a.rating - b.rating);
  return (
    <div className="space-y-5">
      <div>
        <h1 className="flex items-center gap-2 text-xl font-bold"><AlertTriangle className="h-5 w-5 text-destructive" />避雷指南</h1>
        <p className="text-sm text-muted-foreground">以下信息来自同学真实评价，仅供参考，不针对商家。</p>
      </div>
      <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm">
        <p className="flex items-center gap-1.5 font-medium text-destructive"><TrendingDown className="h-4 w-4" />避雷预警逻辑</p>
        <p className="mt-1 text-muted-foreground">当某道菜近 7 天评分连续下降、或低分评价（≤3 星）占比超过 30%，会自动出现在这里。</p>
      </div>
      <div className="space-y-3">
        {avoidList.map((d) => {
          const meta = getDishMeta(d);
          return (
            <button key={d.id} onClick={() => navigate(`/dish/${d.id}`)} className="flex w-full items-start gap-3 rounded-xl border border-border bg-card p-4 text-left transition-colors hover:bg-muted">
              <DishCover category={d.category} dishName={d.name} className="h-16 w-16 shrink-0 rounded-lg" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2"><p className="text-sm font-semibold">{d.name}</p><ScoreBadge score={d.rating} /><TrendBadge trend={d.trend} delta={d.trendDelta} /></div>
                <p className="mt-0.5 text-xs text-muted-foreground">{meta.canteenName} · {meta.windowName} · ¥{d.price}</p>
                <p className="mt-1.5 text-sm text-muted-foreground">{REASON_MAP[d.id] ?? '近期收到较多低分反馈，建议谨慎尝试。'}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
