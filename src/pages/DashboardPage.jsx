import { Link, useNavigate } from 'react-router-dom';
import Icon from '../components/ui/Icon.jsx';
import Button from '../components/ui/Button.jsx';
import Logo from '../components/layout/Logo.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { plans } from '../data/landing.js';
import './DashboardPage.css';

// A private page: only reachable when logged in (see ProtectedRoute in App.jsx).
export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const plan = plans.find((p) => String(p.id) === String(user.planId));
  const firstName = user.fullName.split(' ')[0];

  function handleLogout() {
    logout();
    navigate('/', { replace: true });
  }

  return (
    <div className="dash">
      <header className="dash__bar">
        <div className="container dash__bar-inner">
          <Logo />
          <div className="dash__user">
            <span className="dash__name">{user.fullName}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>Log out</Button>
          </div>
        </div>
      </header>

      <main className="container dash__main">
        <p className="mono text-accent"><span className="dot" /> Member portal</p>
        <h1>Welcome back, {firstName}.</h1>
        <p className="dash__lead">Signed in as {user.email}. This page is only visible to logged-in members.</p>

        <div className="dash__grid">
          <section className="card dash__card">
            <p className="mono text-muted">Membership</p>
            {plan ? (
              <>
                <h2>{plan.name}</h2>
                <p className="dash__price">${plan.price} <span>/ month</span></p>
              </>
            ) : (
              <>
                <h2>No plan selected</h2>
                <p className="dash__muted">Pick a plan to unlock gym access.</p>
                <Link to="/#pricing" className="dash__link">View plans <Icon name="chevron_right" size={18} /></Link>
              </>
            )}
          </section>

          <section className="card dash__card">
            <p className="mono text-muted">Access pass</p>
            <h2>Pending activation</h2>
            <p className="dash__muted">Visit the front desk to link your NFC wristband or mobile pass.</p>
          </section>

          <section className="card dash__card">
            <p className="mono text-muted">Next steps</p>
            <ul className="dash__steps">
              <li><Icon name="radio_button_unchecked" size={18} /> Book your complimentary body scan</li>
              <li><Icon name="radio_button_unchecked" size={18} /> Meet your strength coach</li>
              <li><Icon name="radio_button_unchecked" size={18} /> Install the IronForge mobile app</li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
