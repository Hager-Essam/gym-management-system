import { useState } from 'react';
import Icon from '../ui/Icon.jsx';
import './FormField.css';

/**
 * One labelled form control with an error message underneath.
 *  - <FormField label="Email" name="email" type="email" ... />
 *  - type="password" automatically gets a show/hide button
 *  - as="select" renders a <select>; pass <option>s as children
 * All other props (name, value, onChange, placeholder, autoComplete...) go straight to the control.
 */
export default function FormField({ id, label, error, hint, as: Control = 'input', type = 'text', children, ...controlProps }) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className="field">
      <label htmlFor={id} className="field__label">{label}</label>

      <div className="field__control">
        <Control
          id={id}
          className={`field__input ${error ? 'is-invalid' : ''}`}
          type={Control === 'input' ? (isPassword && showPassword ? 'text' : type) : undefined}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={describedBy}
          {...controlProps}
        >
          {children}
        </Control>

        {isPassword && (
          <button
            type="button"
            className="field__toggle"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <Icon name={showPassword ? 'visibility_off' : 'visibility'} size={20} />
          </button>
        )}
      </div>

      {error ? (
        <p id={`${id}-error`} className="field__error" role="alert">{error}</p>
      ) : hint ? (
        <p id={`${id}-hint`} className="field__hint">{hint}</p>
      ) : null}
    </div>
  );
}
