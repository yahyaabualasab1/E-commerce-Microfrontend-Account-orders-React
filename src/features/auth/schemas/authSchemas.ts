import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().email('Enter a valid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
  rememberMe: z.boolean(),
});

export const registerSchema = z
  .object({
    name: z.string().trim().min(2, 'Name must be at least 2 characters.'),
    email: z.string().trim().email('Enter a valid email address.'),
    phone: z.string().trim().min(7, 'Enter a valid phone number.'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters.')
      .regex(/[A-Z]/, 'Password must include an uppercase letter.')
      .regex(/[a-z]/, 'Password must include a lowercase letter.')
      .regex(/\d/, 'Password must include a number.')
      .regex(/[^A-Za-z0-9]/, 'Password must include a special character.'),
    confirmPassword: z.string().min(1, 'Confirm your password.'),
    acceptTerms: z.boolean().refine((value) => value, {
      message: 'Accept the terms to continue.',
    }),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
