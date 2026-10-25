import { Link } from 'react-router-dom';
import Icon from '../ui/Icon.jsx';
import Logo from '../layout/Logo.jsx';
import ProgressBar from '../ui/ProgressBar.jsx';
import './AuthLayout.css';

const perks = [
  { icon: 'contactless', text: '24/7 keyless NFC turnstile access' },
  { icon: 'monitor_weight', text: 'InBody telemetry in your member portal' },
  { icon: 'verified', text: 'NSCA-CSCS certified coaching staff' },
];

// Shared two-column frame for the Login and Register pages.
// `children` = the form; `footer` = the "Already have an account?" line.
export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="auth">
      <aside className="auth__brand">
        <Logo />

        <div className="auth__pitch">
          <h2>
            Architect your strength. <span className="text-accent">Calibrated</span> for human performance.
          </h2>
          <ul>
            {perks.map((perk) => (
              <li key={perk.text}>
                <span className="text-accent"><Icon name={perk.icon} size={18} /></span>
                {perk.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="auth__readout">
          <div className="mono">
            <span className="text-muted">Floor dynamic load</span>
            <span className="text-accent">Optimal (44%)</span>
          </div>
          <ProgressBar percent={44} label="Floor dynamic load" />
        </div>
      </aside>

      <main className="auth__panel">
        <div className="auth__top">
          <Logo />
          <Link to="/" className="auth__home">
            <Icon name="arrow_back" size={16} /> Back to site
          </Link>
        </div>

        <div className="auth__card">
          <h1>{title}</h1>
          <p className="auth__subtitle">{subtitle}</p>
          {children}
          <p className="auth__footer">{footer}</p>
        </div>
      </main>
    </div>
  );
}
