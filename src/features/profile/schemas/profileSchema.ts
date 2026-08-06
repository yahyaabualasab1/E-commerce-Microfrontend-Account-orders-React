import { z } from 'zod';

const dateOfBirthSchema = z
  .string()
  .min(1, 'Date of birth is required.')
  .refine((value) => new Date(value).getTime() <= Date.now(), {
    message: 'Date of birth cannot be in the future.',
  });

export const profileSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required.'),
  lastName: z.string().trim().min(1, 'Last name is required.'),
  email: z.string().trim().email('Enter a valid email address.'),
  phone: z
    .string()
    .trim()
    .regex(/^[+()\-\s\d]{7,20}$/, 'Enter a valid phone number.'),
  dateOfBirth: dateOfBirthSchema,
  address: z.string().trim().min(4, 'Address is required.'),
  city: z.string().trim().min(2, 'City is required.'),
  country: z.string().trim().min(2, 'Country is required.'),
  postalCode: z
    .string()
    .trim()
    .regex(/^[A-Za-z0-9][A-Za-z0-9\s-]{2,12}$/, 'Enter a valid postal code.'),
  preferredCategories: z.array(z.string()).optional(),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required.'),
    newPassword: z
      .string()
      .min(8, 'New password must be at least 8 characters.')
      .regex(/[A-Z]/, 'New password must include an uppercase letter.')
      .regex(/[a-z]/, 'New password must include a lowercase letter.')
      .regex(/\d/, 'New password must include a number.')
      .regex(/[^A-Za-z0-9]/, 'New password must include a special character.'),
    confirmPassword: z.string().min(1, 'Confirm your new password.'),
  })
  .refine((values) => values.newPassword !== values.currentPassword, {
    message: 'New password must be different from the current password.',
    path: ['newPassword'],
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export type ProfileFormValues = z.infer<typeof profileSchema>;
export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
