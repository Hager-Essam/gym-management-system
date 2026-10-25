import Button from '../components/ui/Button.jsx';
import { cta } from '../data/landing.js';
import './CallToAction.css';

export default function CallToAction() {
  return (
    <section id="cta" className="cta">
      <div className="container">
        <div className="cta__box">
          <p className="cta__eyebrow mono">
            <span className="dot" /> {cta.eyebrow}
          </p>
          <h2>{cta.title}</h2>
          <p className="cta__desc">{cta.description}</p>
          <div className="cta__buttons">
            <Button to={cta.primary.to} className="btn--lg">{cta.primary.label}</Button>
            <Button href={cta.secondary.href} variant="outline" className="btn--lg">{cta.secondary.label}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
