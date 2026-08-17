import { z } from 'zod';

const usernameRegex = /^[a-z][a-z0-9_]*$/;

export const userSettingsSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, 'Username must be at least 3 characters.')
    .max(20, 'Username must be 20 characters or fewer.')
    .regex(usernameRegex, 'Username must start with a lowercase letter and may contain only lowercase letters, numbers, and underscores.'),
  email: z.string().trim().email('Please enter a valid email address.'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .regex(/[a-z]/, 'Password must contain a lowercase letter.')
    .regex(/[A-Z]/, 'Password must contain an uppercase letter.')
    .regex(/[0-9]/, 'Password must contain a number.')
    .regex(/[^A-Za-z0-9]/, 'Password must contain a special character.'),
  displayName: z.string().trim().max(50, 'Display name must be 50 characters or fewer.').optional().or(z.literal('')),
  phone: z.string().trim().max(20, 'Phone number must be 20 characters or fewer.').optional().or(z.literal('')),
  bio: z.string().trim().max(160, 'Bio must be 160 characters or fewer.').optional().or(z.literal('')),
});

export const defaultUserSettings = {
  username: '',
  email: '',
  password: '',
  displayName: '',
  phone: '',
  bio: '',
};

export function getPasswordStrength(password = '') {
  const checks = [
    password.length >= 8,
    /[a-z]/.test(password),
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;

  if (!password) return { label: 'Enter a password', score: 0, strong: false };
  if (score <= 2) return { label: 'Weak password', score, strong: false };
  if (score <= 4) return { label: 'Almost strong — add the missing requirement', score, strong: false };
  return { label: 'Strong password ✓', score, strong: true };
}
