import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Logo from './Logo.jsx';
import Button from '../ui/Button.jsx';
import Icon from '../ui/Icon.jsx';
import './DashboardNav.css';

export default function DashboardNav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/', { replace: true });
  }

  const navItems = user?.role === 'coach' 
    ? [
        { label: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
        { label: 'My Members', href: '/dashboard/coach#members', icon: 'groups' },
        { label: 'Programs', href: '/dashboard/coach#programs', icon: 'fitness_center' },
        { label: 'Schedule', href: '/dashboard/coach#schedule', icon: 'calendar_month' },
      ]
    : user?.role === 'admin' || user?.role === 'manager'
    ? [
        { label: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
        { label: 'Members', href: '/operations/members', icon: 'groups' },
        { label: 'Operations', href: '/operations/floor', icon: 'business' },
        { label: 'Reports', href: '/operations/reports', icon: 'analytics' },
      ]
    : [
        { label: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
        { label: 'My Workouts', href: '/dashboard/member#workouts', icon: 'fitness_center' },
        { label: 'Progress', href: '/dashboard/member#progress', icon: 'trending_up' },
        { label: 'Classes', href: '/dashboard/member#classes', icon: 'event' },
      ];

  return (
    <nav className="dash-nav">
      <div className="container dash-nav__inner">
        <div className="dash-nav__left">
          <Link to="/" className="dash-nav__logo">
            <Logo />
          </Link>
          
          <div className="dash-nav__links">
            {navItems.map((item) => (
              <Link key={item.href} to={item.href} className="dash-nav__link">
                <Icon name={item.icon} size={20} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="dash-nav__right">
          <div className="dash-nav__user">
            <div className="dash-nav__user-avatar">
              <Icon name="person" />
            </div>
            <div className="dash-nav__user-info">
              <span className="dash-nav__user-name">{user?.fullName}</span>
              <span className="dash-nav__user-role mono">
                {user?.role === 'coach' ? 'COACH' : 
                 user?.role === 'admin' ? 'ADMIN' :
                 user?.role === 'manager' ? 'MANAGER' :
                 'MEMBER'}
              </span>
            </div>
          </div>
          
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <Icon name="logout" size={18} />
            Log out
          </Button>
        </div>
      </div>
    </nav>
  );
}
