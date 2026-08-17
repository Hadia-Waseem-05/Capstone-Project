import { getPasswordStrength } from '../schemas/userSettingsSchema';

export default function PasswordStrength({ password }) {
  const strength = getPasswordStrength(password);
  const requirements = [
    ['8+ characters', password.length >= 8],
    ['Lowercase', /[a-z]/.test(password)],
    ['Uppercase', /[A-Z]/.test(password)],
    ['Number', /[0-9]/.test(password)],
    ['Special character', /[^A-Za-z0-9]/.test(password)],
  ];

  return (
    <div className={`password-strength ${strength.strong ? 'is-strong' : ''}`} aria-live="polite">
      <div className="strength-heading">
        <span>Password strength</span>
        <strong>{strength.label}</strong>
      </div>
      <div className="strength-bars" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((bar) => <span key={bar} className={bar < strength.score ? 'filled' : ''} />)}
      </div>
      <div className="requirements">
        {requirements.map(([text, met]) => (
          <span key={text} className={met ? 'met' : ''}>{met ? '✓' : '○'} {text}</span>
        ))}
      </div>
    </div>
  );
}
