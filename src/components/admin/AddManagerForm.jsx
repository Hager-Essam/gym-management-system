import { useState } from 'react';
import FormField from '../auth/FormField.jsx';
import Button from '../ui/Button.jsx';
import Icon from '../ui/Icon.jsx';
import { createUser } from '../../services/dataService.js';
import './AdminForms.css';

export default function AddManagerForm({ onSuccess, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [values, setValues] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    position: '',
    department: '',
  });

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
      const newManager = await createUser({
        ...values,
        role: 'manager',
      });
      
      onSuccess(newManager);
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
          placeholder="Jane Johnson"
          value={values.fullName}
          onChange={handleChange}
          required
        />

        <FormField
          id="email"
          name="email"
          type="email"
          label="Email Address *"
          placeholder="jane@ironforge.com"
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

        <FormField
          id="position"
          name="position"
          label="Position"
          placeholder="Operations Manager, Front Desk Supervisor, etc."
          value={values.position}
          onChange={handleChange}
        />

        <div className="admin-form__field">
          <label htmlFor="department" className="admin-form__label">Department</label>
          <select
            id="department"
            name="department"
            value={values.department}
            onChange={handleChange}
            className="admin-form__select"
          >
            <option value="">Select Department</option>
            <option value="operations">Operations</option>
            <option value="front-desk">Front Desk</option>
            <option value="maintenance">Maintenance</option>
            <option value="sales">Sales & Marketing</option>
            <option value="administration">Administration</option>
          </select>
        </div>
      </div>

      <div className="admin-form__actions">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={loading}>
          <Icon name={loading ? 'hourglass_empty' : 'person_add'} />
          {loading ? 'Creating...' : 'Add Manager'}
        </Button>
      </div>
    </form>
  );
}
