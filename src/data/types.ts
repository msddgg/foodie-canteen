export type TasteCategory = 'all' | 'spicy' | 'savory' | 'light' | 'sweet';
export type DishCategory = 'rice' | 'noodle' | 'stirfry' | 'bbq' | 'soup' | 'snack' | 'drink' | 'dessert';
export type Trend = 'up' | 'down' | 'stable';

export interface ICanteen {
  id: string;
  name: string;
  location: string;
  openHours: string;
}

export interface IWindow {
  id: string;
  canteenId: string;
  name: string;
  cuisine: string;
  avgPrice: number;
  rating: number;
  queueMinutes: number;
  recommendIndex: number;
}

export interface IDish {
  id: string;
  windowId: string;
  canteenId: string;
  name: string;
  price: number;
  rating: number;
  tasteScore: number;
  portionScore: number;
  valueScore: number;
  recommendCount: number;
  tags: string[];
  isNew?: boolean;
  trend: Trend;
  trendDelta?: number;
  heat: number;
  category: DishCategory;
  taste: TasteCategory;
  description: string;
}

export interface IReview {
  id: string;
  dishId: string;
  user: string;
  avatarHue: number;
  rating: number;
  tasteScore: number;
  portionScore: number;
  valueScore: number;
  waitMinutes: number;
  content: string;
  tags: string[];
  createdAt: string;
  isSample?: boolean;
}
