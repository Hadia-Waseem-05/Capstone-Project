import React, { useState } from "react";

function validate(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required";
  } else if (values.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address";
  }

  if (!values.username.trim()) {
    errors.username = "Username is required";
  } else if (!/^[a-zA-Z0-9_]{3,20}$/.test(values.username)) {
    errors.username = "3-20 characters, letters/numbers/underscore only";
  }

  if (values.password) {
    if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
  }

  if (values.phone && !/^[0-9+\-\s()]{7,15}$/.test(values.phone)) {
    errors.phone = "Enter a valid phone number";
  }

  return errors;
}

export default function UserSettingsForm({ onSave }) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState(""); 

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(values));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setTouched({
      name: true,
      email: true,
      username: true,
      phone: true,
      password: true,
      confirmPassword: true,
    });

    if (Object.keys(validationErrors).length > 0) return;

    setStatus("saving");
    try {
      if (onSave) {
        await onSave(values);
      }
      setStatus("saved");
      setTimeout(() => setStatus(""), 2000);
    } catch (err) {
      setStatus("");
      setErrors((prev) => ({ ...prev, form: "Failed to save settings" }));
    }
  }

  const fieldError = (field) => touched[field] && errors[field];

  return (
    <form onSubmit={handleSubmit} style={styles.form} noValidate>
      <h2 style={styles.heading}>User Settings</h2>

      <Field
        label="Full Name"
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={fieldError("name")}
      />

      <Field
        label="Email"
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={fieldError("email")}
      />

      <Field
        label="Username"
        name="username"
        value={values.username}
        onChange={handleChange}
        onBlur={handleBlur}
        error={fieldError("username")}
      />

      <Field
        label="Phone (optional)"
        name="phone"
        value={values.phone}
        onChange={handleChange}
        onBlur={handleBlur}
        error={fieldError("phone")}
      />

      <Field
        label="New Password (optional)"
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={fieldError("password")}
      />

      <Field
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={values.confirmPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        error={fieldError("confirmPassword")}
      />

      {errors.form && <p style={styles.formError}>{errors.form}</p>}

      <button type="submit" style={styles.button} disabled={status === "saving"}>
        {status === "saving" ? "Saving..." : status === "saved" ? "Saved ✓" : "Save Settings"}
      </button>
    </form>
  );
}

function Field({ label, name, type = "text", value, onChange, onBlur, error }) {
  return (
    <div style={styles.field}>
      <label style={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        style={{ ...styles.input, ...(error ? styles.inputError : {}) }}
      />
      {error && <span style={styles.error}>{error}</span>}
    </div>
  );
}

const styles = {
  form: {
    maxWidth: 420,
    margin: "0 auto",
    padding: 24,
    display: "flex",
    flexDirection: "column",
    gap: 14,
    fontFamily: "system-ui, sans-serif",
  },
  heading: { marginBottom: 4 },
  field: { display: "flex", flexDirection: "column", gap: 4 },
  label: { fontSize: 14, fontWeight: 600 },
  input: {
    padding: "8px 10px",
    fontSize: 14,
    border: "1px solid #ccc",
    borderRadius: 6,
  },
  inputError: { borderColor: "#d33" },
  error: { color: "#d33", fontSize: 12 },
  formError: { color: "#d33", fontSize: 13 },
  button: {
    marginTop: 8,
    padding: "10px 16px",
    fontSize: 15,
    fontWeight: 600,
    color: "#fff",
    background: "#2563eb",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
};
