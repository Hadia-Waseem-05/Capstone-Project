import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormField from './FormField';
import PasswordStrength from './PasswordStrength';
import { defaultUserSettings, userSettingsSchema } from '../schemas/userSettingsSchema';

export default function UserSettingsForm({ initialValues = defaultUserSettings, onSave }) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: { ...defaultUserSettings, ...initialValues },
    mode: 'onBlur',
  });

  useEffect(() => {
    reset({ ...defaultUserSettings, ...initialValues });
  }, [initialValues, reset]);

  const password = useWatch({ control, name: 'password', defaultValue: '' });

  const submit = async (values) => {
    if (onSave) await onSave(values);
  };

  return (
    <form className="settings-card" onSubmit={handleSubmit(submit)} noValidate>
      <div className="settings-header">
        <div>
          <p className="eyebrow">ACCOUNT PREFERENCES</p>
          <h1>User settings</h1>
          <p className="subtitle">Keep your account details accurate and your login secure.</p>
        </div>
        <div className="header-icon" aria-hidden="true">⚙</div>
      </div>

      <section className="settings-section">
        <div className="section-title">
          <div><h2>Important information</h2><p>These fields are required to keep your account identifiable and secure.</p></div>
          <span className="important-dot">●</span>
        </div>
        <div className="field-grid">
          <FormField label="Username" name="username" register={register} error={errors.username} required placeholder="e.g. hadia_waseem" autoComplete="username" />
          <FormField label="Email address" name="email" register={register} error={errors.email} required type="email" placeholder="you@example.com" autoComplete="email" />
          <div className="field field-full">
            <div className="field-label-row">
              <label htmlFor="password">Password</label>
              <span className="field-badge required-badge">Important · Required</span>
            </div>
            <input id="password" type="password" aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? 'password-error' : undefined} placeholder="Create a strong password" {...register('password')} autoComplete="new-password" />
            {errors.password && <p id="password-error" className="error-message" role="alert">{errors.password.message}</p>}
            <PasswordStrength password={password} />
          </div>
        </div>
      </section>

      <section className="settings-section optional-section">
        <div className="section-title">
          <div><h2>Profile details</h2><p>Nice to have, but you can leave these blank.</p></div>
          <span className="optional-mark">○</span>
        </div>
        <div className="field-grid">
          <FormField label="Display name" name="displayName" register={register} error={errors.displayName} optional placeholder="How others should see you" autoComplete="name" />
          <FormField label="Phone number" name="phone" register={register} error={errors.phone} optional placeholder="+92 300 1234567" autoComplete="tel" />
          <div className="field field-full">
            <div className="field-label-row">
              <label htmlFor="bio">Short bio</label>
              <span className="field-badge optional-badge">Least important · Optional</span>
            </div>
            <textarea id="bio" rows="4" maxLength="160" placeholder="A short introduction (optional)" aria-invalid={Boolean(errors.bio)} aria-describedby={errors.bio ? 'bio-error' : undefined} {...register('bio')} />
            {errors.bio && <p id="bio-error" className="error-message" role="alert">{errors.bio.message}</p>}
          </div>
        </div>
      </section>

      <div className="form-footer">
        <p><span>●</span> Important fields are required. Optional fields can be skipped.</p>
        <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving…' : 'Save settings'}</button>
      </div>
    </form>
  );
}
