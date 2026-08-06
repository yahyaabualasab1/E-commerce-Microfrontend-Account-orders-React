import type { AuthUser, NotificationPreferences } from '../../../types/auth';

export const profileImageStorageKey = 'account-orders:profile-image';
export const profilePreferencesStorageKey = 'account-orders:profile-preferences';
export const notificationPreferencesStorageKey = 'account-orders:notification-preferences';
export const recentActivityStorageKey = 'account-orders:recent-activity';

export function getProfileImageStorageKey(userId: string) {
  return `${profileImageStorageKey}:${userId}`;
}

export function getProfilePreferencesStorageKey(userId: string) {
  return `${profilePreferencesStorageKey}:${userId}`;
}

export function getNotificationPreferencesStorageKey(userId: string) {
  return `${notificationPreferencesStorageKey}:${userId}`;
}

export const defaultNotificationPreferences: NotificationPreferences = {
  orderUpdates: true,
  wishlistPriceDrops: true,
  reviewReminders: true,
  fashionRecommendations: true,
  promotionalEmails: false,
  newCollectionAlerts: true,
};

export const fashionPreferenceOptions = [
  'Men',
  'Women',
  'Shoes',
  'Bags',
  'Accessories',
  'Sportswear',
  'Formal Wear',
  'Streetwear',
  'Casual Wear',
];

export function splitName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const firstName = parts[0] ?? 'Fashion';
  const lastName = parts.slice(1).join(' ') || 'Member';

  return { firstName, lastName };
}

export function normalizeUser(user: AuthUser): AuthUser {
  const names = splitName(user.fullName ?? user.name);
  const firstName = user.firstName?.trim() || names.firstName;
  const lastName = user.lastName?.trim() || names.lastName;
  const fullName = `${firstName} ${lastName}`.trim();
  const storedAvatar = localStorage.getItem(getProfileImageStorageKey(user.id));
  const storedPreferences = loadStoredStringArray(getProfilePreferencesStorageKey(user.id));
  const storedNotificationPreferences = loadStoredObject<NotificationPreferences>(
    getNotificationPreferencesStorageKey(user.id),
  );

  return {
    ...user,
    firstName,
    lastName,
    fullName,
    name: fullName,
    avatar: user.avatar !== undefined ? user.avatar : storedAvatar,
    dateOfBirth: user.dateOfBirth ?? '1994-06-18',
    city: user.city ?? 'New York',
    country: user.country ?? 'United States',
    postalCode: user.postalCode ?? '10013',
    memberSince: user.memberSince ?? user.createdAt,
    membershipLevel: user.membershipLevel ?? 'Rose Gold Member',
    loyaltyPoints: user.loyaltyPoints ?? 2840,
    preferredCategories: storedPreferences ??
      user.preferredCategories ?? ['Women', 'Bags', 'Shoes'],
    notificationPreferences:
      storedNotificationPreferences ??
      user.notificationPreferences ??
      defaultNotificationPreferences,
  };
}

function loadStoredStringArray(key: string) {
  const rawValue = localStorage.getItem(key);

  if (!rawValue) {
    return undefined;
  }

  try {
    const parsed = JSON.parse(rawValue) as unknown;
    return Array.isArray(parsed) && parsed.every((value) => typeof value === 'string')
      ? parsed
      : undefined;
  } catch {
    return undefined;
  }
}

function loadStoredObject<T>(key: string) {
  const rawValue = localStorage.getItem(key);

  if (!rawValue) {
    return undefined;
  }

  try {
    return JSON.parse(rawValue) as T;
  } catch {
    return undefined;
  }
}

export function getUserDisplayName(user: AuthUser | null) {
  return user?.fullName ?? user?.name ?? 'Fashion Member';
}
