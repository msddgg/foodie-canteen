import { createContext, useContext } from 'react';
import type { IReview } from '@/data/types';

export interface AppState {
  favorites: string[];
  likedReviews: string[];
  userReviews: IReview[];
  toggleFavorite: (dishId: string) => void;
  isFavorite: (dishId: string) => boolean;
  toggleReviewLike: (reviewId: string) => void;
  isReviewLiked: (reviewId: string) => boolean;
  addReview: (review: IReview) => void;
  allReviews: IReview[];
}

export const AppContext = createContext<AppState | null>(null);

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
