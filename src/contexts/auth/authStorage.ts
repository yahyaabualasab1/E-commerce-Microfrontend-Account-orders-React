import type { AuthSession } from '../../types/auth';
import { normalizeUser } from '@features/profile/utils/profileDefaults';

const AUTH_STORAGE_KEY = 'account-orders.session';

export function loadStoredSession(): AuthSession | null {
  const rawSession = localStorage.getItem(AUTH_STORAGE_KEY);

  if (!rawSession) {
    return null;
  }

  try {
    const session = JSON.parse(rawSession) as AuthSession;
    const hasExpired = new Date(session.expiresAt).getTime() <= Date.now();

    if (!session.user?.email || !session.accessToken || hasExpired) {
      clearStoredSession();
      return null;
    }

    return {
      ...session,
      user: normalizeUser(session.user),
    };
  } catch {
    clearStoredSession();
    return null;
  }
}

export function storeSession(session: AuthSession): void {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

export function clearStoredSession(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}
