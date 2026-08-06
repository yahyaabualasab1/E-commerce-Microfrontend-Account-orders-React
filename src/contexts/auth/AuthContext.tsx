import { useCallback, useMemo, useState, type PropsWithChildren } from 'react';

import { clearStoredSession, loadStoredSession, storeSession } from '@contexts/auth/authStorage';
import { AuthContext, type AuthContextValue } from '@contexts/auth/authContextValue';
import { authService } from '@services/authService';
import { getProfileImageStorageKey, normalizeUser } from '@features/profile/utils/profileDefaults';
import { dispatchAccountEvent } from '@utils/microfrontendEvents';
import type {
  AuthSession,
  LoginCredentials,
  RegisterCredentials,
  UpdateProfileInput,
} from '../../types/auth';

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<AuthSession | null>(() => loadStoredSession());

  const persistSession = useCallback((nextSession: AuthSession) => {
    storeSession(nextSession);
    setSession(nextSession);
    return nextSession;
  }, []);

  const login = useCallback(
    (credentials: LoginCredentials) => {
      return authService.login(credentials).then(persistSession);
    },
    [persistSession],
  );

  const register = useCallback(
    (credentials: RegisterCredentials) => {
      return authService.register(credentials).then(persistSession);
    },
    [persistSession],
  );

  const updateProfile = useCallback(
    async (profile: UpdateProfileInput) => {
      if (!session) {
        return;
      }

      const updatedUser = await authService.updateProfile(session.user.id, profile);
      const nextSession = {
        ...session,
        user: normalizeUser(updatedUser),
      };

      storeSession(nextSession);
      setSession(nextSession);
      dispatchAccountEvent('account:profile-updated', {
        userId: nextSession.user.id,
        fullName: nextSession.user.fullName ?? nextSession.user.name,
        email: nextSession.user.email,
        avatar: nextSession.user.avatar ?? null,
        source: 'account-orders',
      });
    },
    [session],
  );

  const updateProfileImage = useCallback(
    (avatar: string | null) => {
      if (!session) {
        return;
      }

      const imageStorageKey = getProfileImageStorageKey(session.user.id);

      if (avatar) {
        localStorage.setItem(imageStorageKey, avatar);
      } else {
        localStorage.removeItem(imageStorageKey);
      }

      const nextSession = {
        ...session,
        user: normalizeUser({
          ...session.user,
          avatar,
        }),
      };

      storeSession(nextSession);
      setSession(nextSession);
      dispatchAccountEvent('account:profile-image-updated', {
        userId: nextSession.user.id,
        avatar,
        source: 'account-orders',
      });
    },
    [session],
  );

  const logout = useCallback(() => {
    clearStoredSession();
    setSession(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user: session?.user ?? null,
      isAuthenticated: Boolean(session),
      login,
      register,
      updateProfile,
      updateProfileImage,
      logout,
    }),
    [login, logout, register, session, updateProfile, updateProfileImage],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
