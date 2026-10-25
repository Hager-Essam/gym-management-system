import PricingCard from '../components/cards/PricingCard.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import { pricingHeader, plans } from '../data/landing.js';
import './Pricing.css';

export default function Pricing() {
  return (
    <section id="pricing" className="section section--deep">
      <div className="container">
        <SectionHeading align="center" {...pricingHeader} />
        <div className="pricing__grid">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
