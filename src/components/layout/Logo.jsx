import { Link } from 'react-router-dom';
import Icon from '../ui/Icon.jsx';
import './Logo.css';

export default function Logo() {
  return (
    <Link to="/" className="logo" aria-label="IronForge Athletic OS home">
      <span className="logo__mark"><Icon name="fitness_center" size={18} /></span>
      <span className="logo__name">IRONFORGE</span>
      <span className="logo__os mono">OS</span>
    </Link>
  );
}
