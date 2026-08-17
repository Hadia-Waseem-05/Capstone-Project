import { describe, expect, it } from 'vitest';
import { getPasswordStrength, userSettingsSchema } from '../schemas/userSettingsSchema';

const valid = { username: 'hadia_waseem', email: 'hadia@example.com', password: 'StrongPass1!' };

describe('userSettingsSchema', () => {
  it('accepts valid important fields', () => {
    expect(userSettingsSchema.safeParse(valid).success).toBe(true);
  });

  it.each(['Hadia', '1hadia', '@hadia', '-hadia'])('rejects username starting with %s', (username) => {
    const result = userSettingsSchema.safeParse({ ...valid, username });
    expect(result.success).toBe(false);
    expect(result.error.issues.some((issue) => issue.path[0] === 'username')).toBe(true);
  });

  it('rejects invalid email', () => {
    const result = userSettingsSchema.safeParse({ ...valid, email: 'not-an-email' });
    expect(result.success).toBe(false);
    expect(result.error.issues[0].message).toContain('valid email');
  });

  it('rejects weak passwords', () => {
    const result = userSettingsSchema.safeParse({ ...valid, password: 'password' });
    expect(result.success).toBe(false);
    expect(result.error.issues.length).toBeGreaterThan(0);
  });

  it('reports a strong password', () => {
    expect(getPasswordStrength('StrongPass1!')).toMatchObject({ strong: true, label: 'Strong password ✓' });
  });
});
