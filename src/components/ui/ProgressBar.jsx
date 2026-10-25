import './ProgressBar.css';

export default function ProgressBar({ percent, label }) {
  return (
    <div className="progress" role="progressbar" aria-label={label} aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
      <div className="progress__fill" style={{ width: `${percent}%` }} />
    </div>
  );
}
