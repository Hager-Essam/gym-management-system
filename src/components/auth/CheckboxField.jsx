import './FormField.css';

// A checkbox with a label and an optional error message. `children` is the label content (can include links).
export default function CheckboxField({ id, error, children, ...inputProps }) {
  return (
    <div className="check">
      <label className="check__row" htmlFor={id}>
        <input id={id} type="checkbox" aria-invalid={error ? 'true' : 'false'} aria-describedby={error ? `${id}-error` : undefined} {...inputProps} />
        <span>{children}</span>
      </label>
      {error && <p id={`${id}-error`} className="field__error" role="alert">{error}</p>}
    </div>
  );
}
