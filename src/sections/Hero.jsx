import Button from '../components/ui/Button.jsx';
import Icon from '../components/ui/Icon.jsx';
import ImageSlot from '../components/ui/ImageSlot.jsx';
import ProgressBar from '../components/ui/ProgressBar.jsx';
import { hero } from '../data/landing.js';
import './Hero.css';

export default function Hero() {
  const { barVelocity, floorLoad } = hero;

  return (
    <section id="about" className="hero">
      <div className="container hero__grid">
        <div>
          <p className="hero__badge mono">
            <span className="dot" /> {hero.badge}
          </p>

          <h1 className="hero__title">
            {hero.titleLine1}
            <br />
            <span className="text-accent">{hero.titleHighlight}</span> {hero.titleLine2}
          </h1>

          <p className="hero__desc">{hero.description}</p>

          <div className="hero__buttons">
            <Button to={hero.primaryCta.to}>{hero.primaryCta.label}</Button>
            <Button href={hero.secondaryCta.href} variant="outline">{hero.secondaryCta.label}</Button>
          </div>

          <ul className="hero__trust">
            {hero.trust.map((item) => (
              <li key={item.label}>
                <span className="text-accent"><Icon name={item.icon} size={16} /></span>
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        <ImageSlot src={hero.image} alt="Athletes training under green floor lighting" className="hero__image">
          <span className="hero__zone mono">{barVelocity.zone}</span>

          <div className="hero__readout hero__velocity">
            <p className="mono text-muted">{barVelocity.label}</p>
            <p className="hero__velocity-value">
              {barVelocity.value} <span className="text-accent">{barVelocity.unit}</span>
            </p>
          </div>

          <div className="hero__readout hero__load">
            <div className="hero__load-head mono">
              <span>{floorLoad.label}</span>
              <span className="text-accent">{floorLoad.status}</span>
            </div>
            <ProgressBar percent={floorLoad.percent} label={floorLoad.label} />
            <div className="hero__load-foot mono text-muted">
              <span>{floorLoad.footLeft}</span>
              <span>{floorLoad.footRight}</span>
            </div>
          </div>
        </ImageSlot>
      </div>
    </section>
  );
}
