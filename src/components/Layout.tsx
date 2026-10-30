import { Outlet, NavLink, Link, useLocation } from 'react-router-dom';
import { UtensilsCrossed, Heart, Menu, PenSquare } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useApp } from '@/context/app-context';

const NAV_ITEMS = [
  { path: '/', label: '首页', end: true },
  { path: '/canteens', label: '食堂探索', end: false },
  { path: '/rankings', label: '菜品排行', end: false },
  { path: '/avoid', label: '避雷指南', end: false },
];

export const Layout = () => {
  const { favorites } = useApp();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string, end?: boolean) => {
    if (end) return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-card/85 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <UtensilsCrossed className="h-4 w-4" />
            </span>
            <span className="text-base font-bold tracking-tight">饭搭子</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.path} to={item.path} end={item.end}
                className={cn('rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                  isActive(item.path, item.end) ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground')}>
                {item.label}
              </NavLink>
            ))}
            <NavLink to="/review/new" className="ml-2 inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground">
              <PenSquare className="h-3.5 w-3.5" /> 写评价
            </NavLink>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/favorites" className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card">
              <Heart className={cn('h-4 w-4', favorites.length > 0 && 'fill-primary text-primary')} />
              {favorites.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">{favorites.length}</span>
              )}
            </Link>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild><Button variant="outline" size="icon" className="md:hidden"><Menu className="h-4 w-4" /></Button></SheetTrigger>
              <SheetContent side="left" className="w-64">
                <nav className="flex flex-col gap-1 pt-4">
                  {NAV_ITEMS.map((item) => (
                    <Link key={item.path} to={item.path} onClick={() => setOpen(false)}
                      className={cn('rounded-md px-3 py-2 text-sm font-medium',
                        isActive(item.path, item.end) ? 'bg-accent text-accent-foreground' : 'text-muted-foreground')}>
                      {item.label}
                    </Link>
                  ))}
                  <Link to="/review/new" onClick={() => setOpen(false)} className="mt-2 rounded-md bg-primary px-3 py-2 text-center text-sm font-medium text-primary-foreground">写评价</Link>
                  <Link to="/favorites" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm text-muted-foreground">我的收藏 ({favorites.length})</Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-6"><Outlet /></main>
      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">饭搭子 · 校园食堂点评演示项目</footer>
    </div>
  );
};
