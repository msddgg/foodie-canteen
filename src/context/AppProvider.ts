import { useCallback, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { AppContext } from './app-context';
import { store } from '@/lib/store';
import { MOCK_REVIEWS } from '@/data/mockData';
import type { IReview } from '@/data/types';

export default function AppProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>(() => store.get<string[]>('favorites', []));
  const [likedReviews, setLikedReviews] = useState<string[]>(() => store.get<string[]>('likedReviews', []));
  const [userReviews, setUserReviews] = useState<IReview[]>(() => store.get<IReview[]>('userReviews', []));

  const toggleFavorite = useCallback((dishId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(dishId) ? prev.filter((id) => id !== dishId) : [...prev, dishId];
      store.set('favorites', next);
      return next;
    });
  }, []);

  const isFavorite = useCallback((dishId: string) => favorites.includes(dishId), [favorites]);

  const toggleReviewLike = useCallback((reviewId: string) => {
    setLikedReviews((prev) => {
      const next = prev.includes(reviewId) ? prev.filter((id) => id !== reviewId) : [...prev, reviewId];
      store.set('likedReviews', next);
      return next;
    });
  }, []);

  const isReviewLiked = useCallback((reviewId: string) => likedReviews.includes(reviewId), [likedReviews]);

  const addReview = useCallback((review: IReview) => {
    setUserReviews((prev) => {
      const next = [review, ...prev];
      store.set('userReviews', next);
      return next;
    });
  }, []);

  const allReviews = useMemo(() => [...userReviews, ...MOCK_REVIEWS], [userReviews]);

  return (
    <AppContext.Provider value={{ favorites, likedReviews, userReviews, toggleFavorite, isFavorite, toggleReviewLike, isReviewLiked, addReview, allReviews }}>
      {children}
    </AppContext.Provider>
  );
}
