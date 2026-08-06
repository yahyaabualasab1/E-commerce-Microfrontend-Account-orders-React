import { createContext } from 'react';

import type {
  AuthSession,
  AuthUser,
  LoginCredentials,
  RegisterCredentials,
  UpdateProfileInput,
} from '../../types/auth';

export type AuthContextValue = {
  session: AuthSession | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<AuthSession>;
  register: (credentials: RegisterCredentials) => Promise<AuthSession>;
  updateProfile: (profile: UpdateProfileInput) => Promise<void>;
  updateProfileImage: (avatar: string | null) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
