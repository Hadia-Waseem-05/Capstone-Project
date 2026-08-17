import { useState } from 'react';
import UserSettingsForm from './UserSettingsForm';

export default function UserSettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = async (values) => {
    console.log('Settings submitted:', values);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 3000);
  };

  return (
    <main className="page-shell">
      <div className="background-orb orb-one" />
      <div className="background-orb orb-two" />
      {saved && <div className="save-toast" role="status">✓ Settings saved successfully.</div>}
      <UserSettingsForm
        initialValues={{ username: 'hadia_waseem', email: 'hadia@example.com' }}
        onSave={handleSave}
      />
    </main>
  );
}
