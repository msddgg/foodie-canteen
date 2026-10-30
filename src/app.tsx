import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import HomePage from '@/pages/HomePage/HomePage';
import CanteensPage from '@/pages/CanteensPage/CanteensPage';
import DishDetailPage from '@/pages/DishDetailPage/DishDetailPage';
import RankingsPage from '@/pages/RankingsPage/RankingsPage';
import AvoidPage from '@/pages/AvoidPage/AvoidPage';
import ReviewFormPage from '@/pages/ReviewFormPage/ReviewFormPage';
import FavoritesPage from '@/pages/FavoritesPage/FavoritesPage';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="canteens" element={<CanteensPage />} />
        <Route path="dish/:id" element={<DishDetailPage />} />
        <Route path="rankings" element={<RankingsPage />} />
        <Route path="avoid" element={<AvoidPage />} />
        <Route path="review/new" element={<ReviewFormPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
