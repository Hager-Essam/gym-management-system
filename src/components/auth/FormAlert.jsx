import Icon from '../ui/Icon.jsx';
import './FormAlert.css';

// Banner for errors that belong to the whole form (e.g. "Invalid email or password.")
export default function FormAlert({ children }) {
  if (!children) return null; // nothing to show -> render nothing
  return (
    <div className="form-alert" role="alert">
      <Icon name="error" size={18} />
      <span>{children}</span>
    </div>
  );
}
