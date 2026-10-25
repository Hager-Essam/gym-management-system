import Icon from '../ui/Icon.jsx';
import useCountUp from '../../hooks/useCountUp.js';
import './StatCard.css';

export default function StatCard({ stat }) {
  const isNumber = typeof stat.value === 'number';
  const { count, ref } = useCountUp(isNumber ? stat.value : 0);

  // Numbers animate; text like "24/7/365" is shown as-is.
  const display = isNumber
    ? count.toLocaleString('en-US', {
        minimumFractionDigits: stat.decimals ?? 0,
        maximumFractionDigits: stat.decimals ?? 0,
      }) + (stat.suffix ?? '')
    : stat.text;

  return (
    <div className="card stat" ref={ref}>
      <div className="stat__top">
        <p className="mono text-muted">{stat.label}</p>
        <span className="text-accent"><Icon name={stat.icon} size={18} /></span>
      </div>
      <p className="stat__value">{display}</p>
      <p className="stat__caption">{stat.caption}</p>
    </div>
  );
}
