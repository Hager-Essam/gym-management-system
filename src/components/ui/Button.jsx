import { Link } from 'react-router-dom';
import './Button.css';

// A reusable button. It renders the right element for the job:
//   to="/login"     -> router <Link>   (navigates inside the app, no page reload)
//   href="#pricing" -> plain <a>       (scroll to a section on the same page)
//   neither         -> <button>        (use onClick, or type="submit" inside a form)
// `variant` picks the look: "primary" | "outline".
export default function Button({ children, to, href, variant = 'primary', size = 'md', className = '', ...rest }) {
  const classes = `btn btn--${variant} btn--${size} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
