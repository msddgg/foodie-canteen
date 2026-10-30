import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dices, RotateCw } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MOCK_DISHES } from '@/data/mockData';
import type { IDish } from '@/data/types';
import DishCover from '@/components/DishCover';
import { ScoreBadge } from '@/components/ScoreBadge';
import { getDishMeta } from '@/lib/canteen';

interface Props { open: boolean; onOpenChange: (v: boolean) => void; }

export default function RandomPickDialog({ open, onOpenChange }: Props) {
  const navigate = useNavigate();
  const [picked, setPicked] = useState<IDish | null>(null);
  const [rolling, setRolling] = useState(false);

  const pick = () => {
    setRolling(true);
    setPicked(null);
    let ticks = 0;
    const timer = setInterval(() => {
      setPicked(MOCK_DISHES[Math.floor(Math.random() * MOCK_DISHES.length)]);
      ticks += 1;
      if (ticks >= 8) { clearInterval(timer); setRolling(false); }
    }, 80);
  };

  const handleClose = (v: boolean) => { if (!v) setPicked(null); onOpenChange(v); };
  const meta = picked ? getDishMeta(picked) : null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><Dices className="h-5 w-5 text-primary" />饭搭子帮你抽</DialogTitle>
          <DialogDescription>选择困难症救星，点一下，今天就吃它。</DialogDescription>
        </DialogHeader>
        {!picked ? (
          <div className="flex flex-col items-center gap-4 py-6">
            <p className="text-sm text-muted-foreground">准备好抽签了吗？</p>
            <Button onClick={pick} size="lg" className="px-8"><Dices className="mr-2 h-5 w-5" />开抽！</Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col items-center gap-3 py-2">
              <DishCover category={picked.category} dishName={picked.name} className="h-36 w-36 rounded-2xl" />
              <div className="text-center">
                <p className="text-lg font-bold">{picked.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{meta?.canteenName} · {meta?.windowName}</p>
                <div className="mt-2 flex items-center justify-center gap-2"><ScoreBadge score={picked.rating} /><span className="text-base font-bold text-primary">¥{picked.price}</span></div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={pick} disabled={rolling} className="flex-1"><RotateCw className="mr-1 h-4 w-4" />再抽一次</Button>
              <Button onClick={() => { const id = picked.id; handleClose(false); navigate(`/dish/${id}`); }} className="flex-1">就吃这个</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
