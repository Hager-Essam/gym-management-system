import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../ui/Button.jsx';
import Icon from '../ui/Icon.jsx';
import Logo from './Logo.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { navLinks } from '../../data/landing.js';
import './Navbar.css';

export default function Navbar() {

  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    setOpen(false);
    navigate('/');
  }

  // The buttons change depending on whether someone is logged in.
  const authButtons = user ? (
    <>
      <Button to="/dashboard" variant="outline" size="sm" onClick={() => setOpen(false)}>Dashboard</Button>
      <Button size="sm" onClick={handleLogout}>Log out</Button>
    </>
  ) : (
    <>
      <Button to="/login" variant="outline" size="sm" onClick={() => setOpen(false)}>Member Portal Login</Button>
      <Button to="/register" size="sm" onClick={() => setOpen(false)}>Join IronForge</Button>
    </>
  );

  return (
    <header className="navbar">
      <nav className="container navbar__bar" aria-label="Primary">
        <Logo />

        <ul className="navbar__links">
          {navLinks.map((link) => (
            // "/#features" = home page + scroll to #features (see ScrollToHash)
            <li key={link.label}>
              <Link to={`/${link.href}`}>{link.label}</Link>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">{authButtons}</div>

        <button
          type="button"
          className="navbar__toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <Icon name={open ? 'close' : 'menu'} size={24} />
        </button>
      </nav>

      {/* Conditional rendering: only draw the mobile menu when `open` is true */}
      {open && (
        <div id="mobile-menu" className="navbar__mobile">
          <div className="container">
            <ul>
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link to={`/${link.href}`} onClick={() => setOpen(false)}>{link.label}</Link>
                </li>
              ))}
            </ul>
            <div className="navbar__mobile-actions">{authButtons}</div>
          </div>
        </div>
      )}
    </header>
  );
}
