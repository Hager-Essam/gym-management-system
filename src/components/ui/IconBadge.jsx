import Icon from './Icon.jsx';
import './IconBadge.css';

export default function IconBadge({ name }) {
  return (
    <div className="icon-badge">
      <Icon name={name} size={20} />
    </div>
  );
}
