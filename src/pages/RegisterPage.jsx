import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout.jsx';
import CheckboxField from '../components/auth/CheckboxField.jsx';
import FormAlert from '../components/auth/FormAlert.jsx';
import FormField from '../components/auth/FormField.jsx';
import Button from '../components/ui/Button.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { plans } from '../data/landing.js';
import { validateRegister } from '../utils/validators.js';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  // The pricing cards link to /register?plan=2 – read that "query string" here.
  const [searchParams] = useSearchParams();
  const planFromUrl = searchParams.get('plan');
  const initialPlan = plans.some((plan) => String(plan.id) === planFromUrl) ? planFromUrl : '';

  const [values, setValues] = useState({
    fullName: '',
    email: '',
    planId: initialPlan,
    password: '',
    confirmPassword: '',
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setValues((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setSubmitError('');
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateRegister(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await register(values);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      setSubmitError(error.message);
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join IronForge and claim your complimentary 7-day access pass."
      footer={<>Already a member? <Link to="/login">Sign in</Link></>}
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <FormAlert>{submitError}</FormAlert>

        <FormField
          id="fullName"
          name="fullName"
          label="Full name"
          placeholder="Alex Rivera"
          autoComplete="name"
          value={values.fullName}
          onChange={handleChange}
          error={errors.fullName}
        />

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
          as="select"
          id="planId"
          name="planId"
          label="Membership plan"
          hint="You can change this any time."
          value={values.planId}
          onChange={handleChange}
        >
          <option value="">I'll choose later</option>
          {plans.map((plan) => (
            <option key={plan.id} value={plan.id}>
              {plan.name} – ${plan.price}/month
            </option>
          ))}
        </FormField>

        <div className="auth-form__two">
          <FormField
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="8+ characters"
            autoComplete="new-password"
            hint="Letters and numbers."
            value={values.password}
            onChange={handleChange}
            error={errors.password}
          />
          <FormField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm password"
            placeholder="Repeat password"
            autoComplete="new-password"
            value={values.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />
        </div>

        <CheckboxField id="terms" name="terms" checked={values.terms} onChange={handleChange} error={errors.terms}>
          I agree to the <a href="#bylaws">Facility Bylaws</a> and the <a href="#safety">Liability &amp; Safety</a> waiver.
        </CheckboxField>

        <Button type="submit" className="btn--block" disabled={loading}>
          {loading ? 'Creating account…' : 'Create account'}
        </Button>
      </form>
    </AuthLayout>
  );
}
