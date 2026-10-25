import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout.jsx';
import CheckboxField from '../components/auth/CheckboxField.jsx';
import FormAlert from '../components/auth/FormAlert.jsx';
import FormField from '../components/auth/FormField.jsx';
import Button from '../components/ui/Button.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { validateLogin } from '../utils/validators.js';
import { seedDemoUsers } from '../utils/seedUsers.js';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate(); // lets us change page from code
  const location = useLocation(); // info about the current URL (+ any `state` passed to us)

  // If ProtectedRoute sent us here, go back to the page the user originally wanted.
  const redirectTo = location.state?.from?.pathname || '/dashboard';

  // One state object for all inputs ("controlled inputs": React owns the values).
  const [values, setValues] = useState({ email: '', password: '', remember: true });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);
  const [seedingUsers, setSeedingUsers] = useState(false);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setValues((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: undefined })); // clear that field's error while typing
    setSubmitError('');
  }

  async function handleSubmit(event) {
    event.preventDefault(); // stop the browser from reloading the page

    const validationErrors = validateLogin(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await login(values);
      navigate(redirectTo, { replace: true });
    } catch (error) {
      setSubmitError(error.message);
      setLoading(false);
    }
  }

  async function handleSeedUsers() {
    setSeedingUsers(true);
    try {
      await seedDemoUsers();
      setSubmitError('');
      alert('✅ Demo users created!\n\nMembers:\n• ahmed@ironforge.com / password123\n• sarah@ironforge.com / password123\n\nCoaches:\n• alex@ironforge.com / coach123\n• maya@ironforge.com / coach123\n\nManagement:\n• marcus@ironforge.com / manager123 (Manager)\n• admin@ironforge.com / admin123 (Admin)');
    } catch (error) {
      alert('Error seeding users: ' + error.message);
    } finally {
      setSeedingUsers(false);
    }
  }

  return (
    <AuthLayout
      title="Member portal login"
      subtitle="Sign in to manage your membership, book coaches, and view your telemetry."
      footer={<>New to IronForge? <Link to="/register">Create an account</Link></>}
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <FormAlert>{submitError}</FormAlert>

        {/* Development helper */}
        {import.meta.env.DEV && (
          <div style={{ marginBottom: '1rem', padding: '1rem', background: 'rgba(0, 255, 136, 0.05)', border: '1px solid rgba(0, 255, 136, 0.2)', borderRadius: '8px' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
              🔧 Development Mode
            </p>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={handleSeedUsers}
              disabled={seedingUsers}
              style={{ width: '100%' }}
            >
              {seedingUsers ? 'Creating Demo Users...' : '🌱 Create Demo Users'}
            </Button>
          </div>
        )}

        <FormField
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="you@example.com"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />

        <FormField
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="Your password"
          autoComplete="current-password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />

        <div className="auth-form__row">
          <CheckboxField id="remember" name="remember" checked={values.remember} onChange={handleChange}>
            Remember me
          </CheckboxField>
          <a href="#forgot">Forgot password?</a>
        </div>

        <Button type="submit" className="btn--block" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </AuthLayout>
  );
}
