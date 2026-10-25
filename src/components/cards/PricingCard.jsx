import Button from '../ui/Button.jsx';
import Icon from '../ui/Icon.jsx';
import './PricingCard.css';

export default function PricingCard({ plan }) {
  return (
    <article className={`card plan ${plan.popular ? 'plan--popular' : ''}`}>
      {plan.popular && <span className="plan__badge mono">Most popular</span>}

      <p className="mono text-muted">{plan.tier}</p>
      <h3 className="plan__name">{plan.name}</h3>

      <p className="plan__price">
        <span>${plan.price}</span> / month
      </p>
      <p className="plan__desc">{plan.description}</p>

      <ul className="plan__list">
        {plan.features.map((feature) => (
          <li key={feature.label} className={feature.included ? '' : 'is-off'}>
            <Icon name={feature.included ? 'check_circle' : 'cancel'} size={16} />
            {feature.label}
          </li>
        ))}
      </ul>

      <Button to={`/register?plan=${plan.id}`} variant={plan.popular ? 'primary' : 'outline'} className="btn--block">
        {plan.cta}
      </Button>
    </article>
  );
}
