export interface AuthUser {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email: string;
  phone: string;
  avatar?: string | null;
  dateOfBirth?: string;
  address: string;
  city?: string;
  country?: string;
  postalCode?: string;
  createdAt: string;
  memberSince?: string;
  membershipLevel?: string;
  loyaltyPoints?: number;
  preferredCategories?: string[];
  notificationPreferences?: NotificationPreferences;
}

export interface UpdateProfileInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  preferredCategories?: string[];
}

export interface NotificationPreferences {
  orderUpdates: boolean;
  wishlistPriceDrops: boolean;
  reviewReminders: boolean;
  fashionRecommendations: boolean;
  promotionalEmails: boolean;
  newCollectionAlerts: boolean;
}

export interface AuthSession {
  user: AuthUser;
  accessToken: string;
  expiresAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}
