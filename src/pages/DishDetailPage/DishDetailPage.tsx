import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, ThumbsUp, Clock, MapPin, PenSquare } from 'lucide-react';
import { MOCK_DISHES, MOCK_WINDOWS, MOCK_CANTEENS } from '@/data/mockData';
import DishCover from '@/components/DishCover';
import { ScoreBadge, TrendBadge } from '@/components/ScoreBadge';
import { useApp } from '@/context/app-context';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function DishDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite, allReviews, toggleReviewLike, isReviewLiked } = useApp();
  const dish = MOCK_DISHES.find((d) => d.id === id);
  if (!dish) return (<div className="py-20 text-center"><p className="text-muted-foreground">没找到这道菜。</p><Button variant="outline" onClick={() => navigate('/')} className="mt-4">回首页</Button></div>);
  const win = MOCK_WINDOWS.find((w) => w.id === dish.windowId);
  const canteen = MOCK_CANTEENS.find((c) => c.id === dish.canteenId);
  const reviews = allReviews.filter((r) => r.dishId === dish.id);
  const fav = isFavorite(dish.id);

  return (
    <div className="space-y-5">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> 返回</button>
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <DishCover category={dish.category} dishName={dish.name} className="h-48 w-full sm:h-60" />
        <div className="p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold">{dish.name}</h1>
              <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{canteen?.name} · {win?.name}</span>
                <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />排队约 {win?.queueMinutes} 分钟</span>
              </p>
            </div>
            <div className="text-right"><p className="text-2xl font-bold text-primary">¥{dish.price}</p><p className="text-xs text-muted-foreground">{dish.recommendCount} 人推荐</p></div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <ScoreBadge score={dish.rating} />
            <TrendBadge trend={dish.trend} delta={dish.trendDelta} />
            {dish.isNew && <span className="rounded bg-success/10 px-1.5 py-0.5 text-xs font-medium text-success">本周新品</span>}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{dish.description}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">{dish.tags.map((t) => (<span key={t} className="rounded bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">#{t}</span>))}</div>
          <div className="mt-5 flex gap-2">
            <Button variant={fav ? 'default' : 'outline'} onClick={() => { toggleFavorite(dish.id); toast.success(fav ? '已取消收藏' : '已加入收藏'); }}>
              <Heart className={cn('mr-1 h-4 w-4', fav && 'fill-current')} />{fav ? '已收藏' : '收藏'}
            </Button>
            <Button asChild><Link to={`/review/new?dish=${dish.id}`}><PenSquare className="mr-1 h-4 w-4" />写评价</Link></Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <ScoreBar label="口味" score={dish.tasteScore} />
        <ScoreBar label="分量" score={dish.portionScore} />
        <ScoreBar label="性价比" score={dish.valueScore} />
      </div>
      <div>
        <h2 className="mb-3 text-lg font-bold">用户真实评价（{reviews.length}）</h2>
        {reviews.length === 0 && (<div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">还没有评价，来当第一个吃螃蟹的人。</div>)}
        <div className="space-y-3">
          {reviews.map((r) => (
            <div key={r.id} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: `hsl(${r.avatarHue} 60% 55%)` }}>{r.user.charAt(0)}</span>
                  <div><p className="text-sm font-medium">{r.user}</p><p className="text-xs text-muted-foreground">{r.createdAt.slice(0, 10)}{r.isSample ? ' · 模拟评价' : ''}</p></div>
                </div>
                <span className="text-sm font-bold text-primary">{r.rating}.0</span>
              </div>
              <p className="mt-2 text-sm">{r.content}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {r.tags.map((t) => (<span key={t} className="rounded bg-secondary px-1.5 py-0.5 text-[11px] text-secondary-foreground">#{t}</span>))}
                <span className="text-xs text-muted-foreground">等了约 {r.waitMinutes} 分钟</span>
                <button type="button" onClick={() => toggleReviewLike(r.id)} className={cn('ml-auto inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs transition-colors', isReviewLiked(r.id) ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted')}>
                  <ThumbsUp className="h-3.5 w-3.5" />{isReviewLiked(r.id) ? '已赞' : '有用'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScoreBar({ label, score }: { label: string; score: number; }) {
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="mt-1 flex items-baseline gap-1"><span className="text-xl font-bold">{score.toFixed(1)}</span><span className="text-xs text-muted-foreground">/ 5</span></div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${(score / 5) * 100}%` }} /></div>
    </div>
  );
}
