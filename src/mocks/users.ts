import type { AuthUser } from '../types/auth';

export interface MockUser extends AuthUser {
  password: string;
}

export const mockUsers: MockUser[] = [
  {
    id: 'user-alex-morgan',
    name: 'Alex Morgan',
    firstName: 'Alex',
    lastName: 'Morgan',
    fullName: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    password: 'Password123',
    phone: '+1 (555) 014-7821',
    address: '214 Market Street, New York, NY 10013',
    city: 'New York',
    country: 'United States',
    postalCode: '10013',
    dateOfBirth: '1994-06-18',
    createdAt: '2026-01-14T09:30:00.000Z',
    memberSince: '2026-01-14T09:30:00.000Z',
    membershipLevel: 'Rose Gold Member',
    loyaltyPoints: 2840,
    preferredCategories: ['Women', 'Bags', 'Shoes'],
  },
  {
    id: 'user-jamie-lee',
    name: 'Jamie Lee',
    firstName: 'Jamie',
    lastName: 'Lee',
    fullName: 'Jamie Lee',
    email: 'jamie.lee@example.com',
    password: 'Password123',
    phone: '+1 (555) 018-3490',
    address: '88 Spring Avenue, Boston, MA 02116',
    city: 'Boston',
    country: 'United States',
    postalCode: '02116',
    dateOfBirth: '1992-03-10',
    createdAt: '2026-03-22T12:15:00.000Z',
    memberSince: '2026-03-22T12:15:00.000Z',
    membershipLevel: 'Silver Member',
    loyaltyPoints: 930,
    preferredCategories: ['Men', 'Sportswear'],
  },
];
