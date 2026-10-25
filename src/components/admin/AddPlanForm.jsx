import { useState } from 'react';
import FormField from '../auth/FormField.jsx';
import Button from '../ui/Button.jsx';
import Icon from '../ui/Icon.jsx';
import { createPlan } from '../../services/dataService.js';
import './AdminForms.css';

export default function AddPlanForm({ onSuccess, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [values, setValues] = useState({
    name: '',
    tier: 'Tier 01',
    price: '',
    duration: 'monthly',
    description: '',
    accessLevel: 'basic',
    maxClasses: '',
    personalTraining: false,
    features: ['', '', '', ''],
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setValues(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    setError('');
  }

  function handleFeatureChange(index, value) {
    const newFeatures = [...values.features];
    newFeatures[index] = value;
    setValues(prev => ({ ...prev, features: newFeatures }));
  }

  function addFeature() {
    setValues(prev => ({ ...prev, features: [...prev.features, ''] }));
  }

  function removeFeature(index) {
    const newFeatures = values.features.filter((_, i) => i !== index);
    setValues(prev => ({ ...prev, features: newFeatures }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    // Validation
    if (!values.name || !values.price) {
      setError('Please fill in all required fields');
      return;
    }

    const price = parseFloat(values.price);
    if (isNaN(price) || price <= 0) {
      setError('Please enter a valid price');
      return;
    }

    setLoading(true);

    try {
      // Filter out empty features
      const features = values.features.filter(f => f.trim() !== '');
      
      const newPlan = await createPlan({
        ...values,
        price,
        maxClasses: values.maxClasses ? parseInt(values.maxClasses) : null,
        features,
      });
      
      onSuccess(newPlan);
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
          id="name"
          name="name"
          label="Plan Name *"
          placeholder="e.g., Open Gym Core"
          value={values.name}
          onChange={handleChange}
          required
        />

        <FormField
          id="tier"
          name="tier"
          label="Tier"
          placeholder="e.g., Tier 01"
          value={values.tier}
          onChange={handleChange}
        />

        <FormField
          id="price"
          name="price"
          type="number"
          step="0.01"
          label="Price (USD) *"
          placeholder="79.00"
          value={values.price}
          onChange={handleChange}
          required
        />

        <div className="admin-form__field">
          <label htmlFor="duration" className="admin-form__label">Duration *</label>
          <select
            id="duration"
            name="duration"
            value={values.duration}
            onChange={handleChange}
            className="admin-form__select"
            required
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly (3 months)</option>
            <option value="annually">Annually (12 months)</option>
          </select>
        </div>

        <div className="admin-form__field">
          <label htmlFor="accessLevel" className="admin-form__label">Access Level *</label>
          <select
            id="accessLevel"
            name="accessLevel"
            value={values.accessLevel}
            onChange={handleChange}
            className="admin-form__select"
            required
          >
            <option value="basic">Basic</option>
            <option value="premium">Premium</option>
            <option value="vip">VIP</option>
          </select>
        </div>

        <FormField
          id="maxClasses"
          name="maxClasses"
          type="number"
          label="Max Classes (per month)"
          placeholder="Leave empty for unlimited"
          value={values.maxClasses}
          onChange={handleChange}
        />
      </div>

      <FormField
        id="description"
        name="description"
        label="Description"
        placeholder="Describe what this plan includes..."
        value={values.description}
        onChange={handleChange}
      />

      {/* Features */}
      <div className="admin-form__section">
        <div className="admin-form__section-header">
          <label className="admin-form__label">Features</label>
          <button
            type="button"
            onClick={addFeature}
            className="admin-form__add-btn"
          >
            <Icon name="add" size={16} />
            Add Feature
          </button>
        </div>

        <div className="admin-form__features">
          {values.features.map((feature, index) => (
            <div key={index} className="admin-form__feature-row">
              <input
                type="text"
                placeholder={`Feature ${index + 1}`}
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                className="admin-form__input"
              />
              {values.features.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="admin-form__remove-btn"
                >
                  <Icon name="close" size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Personal Training */}
      <div className="admin-form__checkbox">
        <input
          type="checkbox"
          id="personalTraining"
          name="personalTraining"
          checked={values.personalTraining}
          onChange={handleChange}
        />
        <label htmlFor="personalTraining">
          Includes Personal Training
        </label>
      </div>

      <div className="admin-form__actions">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={loading}>
          <Icon name={loading ? 'hourglass_empty' : 'add'} />
          {loading ? 'Creating...' : 'Create Plan'}
        </Button>
      </div>
    </form>
  );
}
