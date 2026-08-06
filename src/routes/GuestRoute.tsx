import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuth } from '@contexts/auth/useAuth';

function getRedirectPath(state: unknown): string {
  if (state && typeof state === 'object' && 'from' in state) {
    const from = (state as Record<string, unknown>).from;
    return typeof from === 'string' ? from : '/dashboard';
  }

  return '/dashboard';
}

export function GuestRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const from = getRedirectPath(location.state);

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
}
