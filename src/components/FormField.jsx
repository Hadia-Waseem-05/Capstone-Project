export default function FormField({ label, name, register, error, required = false, optional = false, type = 'text', placeholder, ...props }) {
  return (
    <div className="field">
      <div className="field-label-row">
        <label htmlFor={name}>{label}</label>
        {required && <span className="field-badge required-badge">Important · Required</span>}
        {optional && <span className="field-badge optional-badge">Least important · Optional</span>}
      </div>
      <input
        id={name}
        type={type}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        placeholder={placeholder}
        {...register(name)}
        {...props}
      />
      {error && <p id={`${name}-error`} className="error-message" role="alert">{error.message}</p>}
    </div>
  );
}
