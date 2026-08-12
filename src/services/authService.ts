import { mockUsers, type MockUser } from '@mocks/users';
import { cloneMock, rejectMock, resolveMock } from '@services/mockApi';
import { normalizeUser } from '@features/profile/utils/profileDefaults';
import type {
  AuthSession,
  AuthUser,
  LoginCredentials,
  RegisterCredentials,
  UpdateProfileInput,
} from '../types/auth';

let users: MockUser[] = cloneMock(mockUsers);

function createSession(user: AuthUser): AuthSession {
  return {
    user,
    accessToken: `fake-token-${user.id}`,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 8).toISOString(),
  };
}

function toAuthUser(user: MockUser): AuthUser {
  return normalizeUser({
    id: user.id,
    name: user.name,
    firstName: user.firstName,
    lastName: user.lastName,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    avatar: user.avatar,
    dateOfBirth: user.dateOfBirth,
    address: user.address,
    city: user.city,
    country: user.country,
    postalCode: user.postalCode,
    createdAt: user.createdAt,
    memberSince: user.memberSince,
    membershipLevel: user.membershipLevel,
    loyaltyPoints: user.loyaltyPoints,
    preferredCategories: user.preferredCategories,
    notificationPreferences: user.notificationPreferences,
  });
}

function createUserFromEmail(email: string, name?: string): MockUser {
  const normalizedEmail = email.trim().toLowerCase();
  const fallbackName = normalizedEmail.split('@')[0]?.replace(/[._-]/g, ' ') || 'Auto Member';

  return {
    id: crypto.randomUUID(),
    name: name?.trim() || fallbackName,
    firstName: name?.trim().split(/\s+/)[0] ?? fallbackName,
    lastName: name?.trim().split(/\s+/).slice(1).join(' ') || 'Member',
    fullName: name?.trim() || fallbackName,
    email: normalizedEmail,
    password: 'Password123',
    phone: '+1 (555) 014-7821',
    address: '214 Market Street, New York, NY 10013',
    city: 'New York',
    country: 'United States',
    postalCode: '10013',
    createdAt: new Date().toISOString(),
    memberSince: new Date().toISOString(),
    membershipLevel: 'Pro Garage Member',
    loyaltyPoints: 500,
  };
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthSession> {
    const normalizedEmail = credentials.email.trim().toLowerCase();
    const user = users.find((currentUser) => currentUser.email === normalizedEmail);

    if (!user || user.password !== credentials.password) {
      return rejectMock(new Error('Invalid email or password.'));
    }

    return resolveMock(createSession(toAuthUser(user)));
  },

  async register(credentials: RegisterCredentials): Promise<AuthSession> {
    const normalizedEmail = credentials.email.trim().toLowerCase();

    if (users.some((currentUser) => currentUser.email === normalizedEmail)) {
      return rejectMock(new Error('An account already exists for this email.'));
    }

    const user = createUserFromEmail(credentials.email, credentials.name);
    user.password = credentials.password;
    user.phone = credentials.phone.trim();
    users = [user, ...users];

    return resolveMock(createSession(toAuthUser(user)));
  },

  async updateProfile(userId: string, profile: UpdateProfileInput): Promise<AuthUser> {
    const userIndex = users.findIndex((user) => user.id === userId);
    const currentUser = users[userIndex];

    if (!currentUser) {
      return rejectMock(new Error('User was not found.'));
    }

    const updatedUser: MockUser = {
      ...currentUser,
      firstName: profile.firstName.trim(),
      lastName: profile.lastName.trim(),
      fullName: `${profile.firstName.trim()} ${profile.lastName.trim()}`.trim(),
      name: `${profile.firstName.trim()} ${profile.lastName.trim()}`.trim(),
      email: profile.email.trim().toLowerCase(),
      phone: profile.phone.trim(),
      dateOfBirth: profile.dateOfBirth,
      address: profile.address.trim(),
      city: profile.city.trim(),
      country: profile.country.trim(),
      postalCode: profile.postalCode.trim(),
      preferredCategories: profile.preferredCategories ?? currentUser.preferredCategories,
    };

    users = users.map((user) => (user.id === userId ? updatedUser : user));

    return resolveMock(toAuthUser(updatedUser));
  },

  async getUsers(): Promise<AuthUser[]> {
    return resolveMock(users.map(toAuthUser));
  },
};
