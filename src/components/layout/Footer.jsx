import Logo from './Logo.jsx';
import { footer } from '../../data/landing.js';
import './Footer.css';

export default function Footer() {
  const { columns, hours, contact } = footer;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <Logo />
            <p className="footer__about">{footer.description}</p>
            <p className="mono text-accent footer__status"><span className="dot" /> {footer.status}</p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="mono text-muted">{column.title}</h3>
              <ul className="footer__list">
                {column.links.map((link) => (
                  <li key={link.label}><a href={link.href}>{link.label}</a></li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="mono text-muted">{hours.title}</h3>
            <dl className="footer__list">
              {hours.rows.map((row) => (
                <div key={row.label}>
                  <dt className="text-muted">{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h3 className="mono text-muted">{contact.title}</h3>
            <address className="footer__list footer__address">
              {contact.lines.map((line) => <p key={line}>{line}</p>)}
              <p className="footer__phone">{contact.phone}</p>
              <p><a className="text-accent" href={`mailto:${contact.email}`}>{contact.email}</a></p>
            </address>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} {footer.copyright}</p>
          <ul>
            {footer.legal.map((link) => (
              <li key={link.label}><a href={link.href}>{link.label}</a></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
