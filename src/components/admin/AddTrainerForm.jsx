import { useState } from 'react';
import FormField from '../auth/FormField.jsx';
import Button from '../ui/Button.jsx';
import Icon from '../ui/Icon.jsx';
import { createUser } from '../../services/dataService.js';
import './AdminForms.css';

export default function AddTrainerForm({ onSuccess, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [values, setValues] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    specialization: '',
    certifications: '',
    bio: '',
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
      const newTrainer = await createUser({
        ...values,
        role: 'coach',
      });
      
      onSuccess(newTrainer);
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
          placeholder="John Smith"
          value={values.fullName}
          onChange={handleChange}
          required
        />

        <FormField
          id="email"
          name="email"
          type="email"
          label="Email Address *"
          placeholder="john@ironforge.com"
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
          </select>
        </div>

        <FormField
          id="specialization"
          name="specialization"
          label="Specialization"
          placeholder="Strength Training, CrossFit, Yoga, etc."
          value={values.specialization}
          onChange={handleChange}
        />

        <FormField
          id="certifications"
          name="certifications"
          label="Certifications"
          placeholder="CSCS, NASM-CPT, CrossFit L1, etc."
          value={values.certifications}
          onChange={handleChange}
        />
      </div>

      <div className="admin-form__field">
        <label htmlFor="bio" className="admin-form__label">Bio / Background</label>
        <textarea
          id="bio"
          name="bio"
          placeholder="Brief professional background and training philosophy..."
          value={values.bio}
          onChange={handleChange}
          className="admin-form__textarea"
          rows="3"
        />
      </div>

      <div className="admin-form__actions">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={loading}>
          <Icon name={loading ? 'hourglass_empty' : 'person_add'} />
          {loading ? 'Creating...' : 'Add Trainer'}
        </Button>
      </div>
    </form>
  );
}
