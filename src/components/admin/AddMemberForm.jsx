import { useState } from 'react';
import FormField from '../auth/FormField.jsx';
import Button from '../ui/Button.jsx';
import Icon from '../ui/Icon.jsx';
import { createUser } from '../../services/dataService.js';
import { getAllPlans } from '../../services/dataService.js';
import './AdminForms.css';

export default function AddMemberForm({ onSuccess, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [values, setValues] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    emergencyContact: '',
    planId: '',
  });

  const plans = getAllPlans();

  function handleChange(e) {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    // Validation
    if (!values.fullName || !values.email || !values.password) {
      setError('Please fill in all required fields');
      return;
    }

    if (values.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const newMember = await createUser({
        ...values,
        role: 'member',
      });
      
      onSuccess(newMember);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      {error && (
        <div className="admin-form__alert admin-form__alert--error">
          <Icon name="error" size={20} />
          <span>{error}</span>
        </div>
      )}

      <div className="admin-form__grid">
        <FormField
          id="fullName"
          name="fullName"
          label="Full Name *"
          placeholder="John Doe"
          value={values.fullName}
          onChange={handleChange}
          required
        />

        <FormField
          id="email"
          name="email"
          type="email"
          label="Email Address *"
          placeholder="john@example.com"
          value={values.email}
          onChange={handleChange}
          required
        />

        <FormField
          id="password"
          name="password"
          type="password"
          label="Password *"
          placeholder="At least 6 characters"
          value={values.password}
          onChange={handleChange}
          required
        />

        <FormField
          id="phone"
          name="phone"
          type="tel"
          label="Phone Number"
          placeholder="+1 (555) 123-4567"
          value={values.phone}
          onChange={handleChange}
        />

        <FormField
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          label="Date of Birth"
          value={values.dateOfBirth}
          onChange={handleChange}
        />

        <div className="admin-form__field">
          <label htmlFor="gender" className="admin-form__label">Gender</label>
          <select
            id="gender"
            name="gender"
            value={values.gender}
            onChange={handleChange}
            className="admin-form__select"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
        </div>

        <div className="admin-form__field">
          <label htmlFor="planId" className="admin-form__label">Membership Plan</label>
          <select
            id="planId"
            name="planId"
            value={values.planId}
            onChange={handleChange}
            className="admin-form__select"
          >
            <option value="">No Plan (Pay as you go)</option>
            {plans.filter(p => p.isActive).map(plan => (
              <option key={plan.id} value={plan.id}>
                {plan.name} - ${plan.price}/{plan.duration}
              </option>
            ))}
          </select>
        </div>
      </div>

      <FormField
        id="address"
        name="address"
        label="Address"
        placeholder="123 Main St, City, State 12345"
        value={values.address}
        onChange={handleChange}
      />

      <FormField
        id="emergencyContact"
        name="emergencyContact"
        label="Emergency Contact"
        placeholder="Name: Jane Doe, Phone: +1 (555) 987-6543"
        value={values.emergencyContact}
        onChange={handleChange}
      />

      <div className="admin-form__actions">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={loading}>
          <Icon name={loading ? 'hourglass_empty' : 'person_add'} />
          {loading ? 'Creating...' : 'Create Member'}
        </Button>
      </div>
    </form>
  );
}
