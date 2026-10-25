import IconBadge from '../ui/IconBadge.jsx';
import TagRow from '../ui/TagRow.jsx';
import './FeatureCard.css';

export default function FeatureCard({ feature }) {
  return (
    <article className="card feature">
      <IconBadge name={feature.icon} />
      <h3 className="feature__title">{feature.title}</h3>
      <p className="feature__text">{feature.description}</p>
      <TagRow tags={feature.tags} />
    </article>
  );
}
