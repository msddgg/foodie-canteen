import { MOCK_CANTEENS, MOCK_WINDOWS } from '@/data/mockData';
import type { IDish } from '@/data/types';

export function getCanteen(id: string) {
  return MOCK_CANTEENS.find((c) => c.id === id);
}

export function getWindow(id: string) {
  return MOCK_WINDOWS.find((w) => w.id === id);
}

export function getDishMeta(dish: IDish) {
  const window = getWindow(dish.windowId);
  const canteen = getCanteen(dish.canteenId);
  return { windowName: window?.name ?? '', canteenName: canteen?.name ?? '' };
}
