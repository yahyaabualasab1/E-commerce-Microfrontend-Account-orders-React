import { lazy, Suspense, type ReactNode } from 'react';
import { Route, Routes } from 'react-router-dom';

import { LoadingState } from '@components/feedback/LoadingState';
import { AuthLayout } from '@layouts/AuthLayout';
import { MainLayout } from '@layouts/MainLayout';
import { GuestRoute } from '@routes/GuestRoute';
import { NotFoundPage } from '@routes/NotFoundPage';
import { ProtectedRoute } from '@routes/ProtectedRoute';

const LoginPage = lazy(() =>
  import('@features/auth/pages/LoginPage').then((module) => ({ default: module.LoginPage })),
);
const RegisterPage = lazy(() =>
  import('@features/auth/pages/RegisterPage').then((module) => ({ default: module.RegisterPage })),
);
const DashboardPage = lazy(() =>
  import('@features/dashboard/pages/DashboardPage').then((module) => ({
    default: module.DashboardPage,
  })),
);
const ProfilePage = lazy(() =>
  import('@features/profile/pages/ProfilePage').then((module) => ({ default: module.ProfilePage })),
);
const OrdersPage = lazy(() =>
  import('@features/orders/pages/OrdersPage').then((module) => ({ default: module.OrdersPage })),
);
const WishlistPage = lazy(() =>
  import('@features/wishlist/pages/WishlistPage').then((module) => ({
    default: module.WishlistPage,
  })),
);
const ReviewsPage = lazy(() =>
  import('@features/reviews/pages/ReviewsPage').then((module) => ({ default: module.ReviewsPage })),
);

function withPageLoader(page: ReactNode) {
  return <Suspense fallback={<LoadingState />}>{page}</Suspense>;
}

export function AppRouter() {
  return (
    <Routes>
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<AuthLayout>{withPageLoader(<LoginPage />)}</AuthLayout>} />
        <Route
          path="/register"
          element={<AuthLayout>{withPageLoader(<RegisterPage />)}</AuthLayout>}
        />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<MainLayout>{withPageLoader(<DashboardPage />)}</MainLayout>} />
        <Route
          path="/dashboard"
          element={<MainLayout>{withPageLoader(<DashboardPage />)}</MainLayout>}
        />
        <Route
          path="/profile"
          element={<MainLayout>{withPageLoader(<ProfilePage />)}</MainLayout>}
        />
        <Route path="/orders" element={<MainLayout>{withPageLoader(<OrdersPage />)}</MainLayout>} />
        <Route
          path="/wishlist"
          element={<MainLayout>{withPageLoader(<WishlistPage />)}</MainLayout>}
        />
        <Route
          path="/reviews"
          element={<MainLayout>{withPageLoader(<ReviewsPage />)}</MainLayout>}
        />
      </Route>

      <Route
        path="*"
        element={
          <MainLayout>
            <NotFoundPage />
          </MainLayout>
        }
      />
    </Routes>
  );
}
