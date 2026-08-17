import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserSettingsForm from '../components/UserSettingsForm';

function renderForm() {
  return render(<UserSettingsForm initialValues={{}} onSave={vi.fn()} />);
}

async function blurField(user, label) {
  await user.click(screen.getByLabelText(label));
  await user.tab();
}

describe('UserSettingsForm', () => {
  it('shows an email validation message', async () => {
    const user = userEvent.setup();
    renderForm();
    await user.type(screen.getByLabelText('Email address'), 'wrong-email');
    await blurField(user, 'Email address');
    expect(await screen.findByText('Please enter a valid email address.')).toBeInTheDocument();
  });

  it('shows a username validation message for a capital letter', async () => {
    const user = userEvent.setup();
    renderForm();
    await user.type(screen.getByLabelText('Username'), 'Hadia');
    await blurField(user, 'Username');
    expect(await screen.findByText(/must start with a lowercase letter/i)).toBeInTheDocument();
  });

  it('shows a username validation message for a number or special character at the start', async () => {
    const user = userEvent.setup();
    renderForm();
    await user.type(screen.getByLabelText('Username'), '1hadia');
    await blurField(user, 'Username');
    expect(await screen.findByText(/must start with a lowercase letter/i)).toBeInTheDocument();
  });

  it('shows weak and strong password feedback', async () => {
    const user = userEvent.setup();
    renderForm();
    const password = screen.getByLabelText('Password');
    await user.type(password, 'password');
    expect(screen.getByText('Weak password')).toBeInTheDocument();
    await user.clear(password);
    await user.type(password, 'StrongPass1!');
    expect(screen.getByText('Strong password ✓')).toBeInTheDocument();
  });

  it('submits valid data', async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();
    render(<UserSettingsForm initialValues={{}} onSave={onSave} />);
    await user.type(screen.getByLabelText('Username'), 'hadia_waseem');
    await user.type(screen.getByLabelText('Email address'), 'hadia@example.com');
    await user.type(screen.getByLabelText('Password'), 'StrongPass1!');
    await user.click(screen.getByRole('button', { name: /save settings/i }));
    await waitFor(() => expect(onSave).toHaveBeenCalledTimes(1));
    expect(onSave.mock.calls[0][0]).toMatchObject({ username: 'hadia_waseem', email: 'hadia@example.com' });
  });
});
