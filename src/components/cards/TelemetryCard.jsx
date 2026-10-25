import ProgressBar from '../ui/ProgressBar.jsx';
import './TelemetryCard.css';

// The "InBody telemetry snapshot" box in the features grid.
export default function TelemetryCard({ data }) {
  return (
    <aside className="card telemetry" aria-label={data.title}>
      <p className="mono text-muted">{data.title}</p>

      <div className="telemetry__delta">
        <span>{data.delta.label}</span>
        <strong className="mono-value text-accent">{data.delta.value}</strong>
      </div>

      {data.rows.map((row) => (
        <div key={row.label}>
          <div className="telemetry__row">
            <span>{row.label}</span>
            <span className="mono-value">{row.value}</span>
          </div>
          <ProgressBar percent={row.percent} label={row.label} />
        </div>
      ))}
    </aside>
  );
}
