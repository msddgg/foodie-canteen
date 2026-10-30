import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { MOCK_DISHES } from '@/data/mockData';
import { useApp } from '@/context/app-context';
import DishCard from '@/components/DishCard';

export default function FavoritesPage() {
  const navigate = useNavigate();
  const { favorites } = useApp();
  const list = MOCK_DISHES.filter((d) => favorites.includes(d.id));
  return (
    <div className="space-y-5">
      <div><h1 className="flex items-center gap-2 text-xl font-bold"><Heart className="h-5 w-5 fill-primary text-primary" />我的收藏</h1><p className="text-sm text-muted-foreground">你收藏的菜品都在这。</p></div>
      {list.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-10 text-center">
          <p className="text-sm text-muted-foreground">还没收藏任何菜品。</p>
          <button onClick={() => navigate('/canteens')} className="mt-3 text-sm font-medium text-primary hover:underline">去逛逛 →</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{list.map((d) => <DishCard key={d.id} dish={d} />)}</div>
      )}
    </div>
  );
}
