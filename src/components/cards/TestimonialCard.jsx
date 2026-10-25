import Icon from '../ui/Icon.jsx';
import './TestimonialCard.css';

// "Elena Rostova" -> "ER"
function getInitials(name) {
  return name
    .split(' ')
    .map((word) => word[0])
    .slice(0, 2)
    .join('');
}

export default function TestimonialCard({ testimonial }) {
  return (
    <figure className="card quote">
      <div className="quote__stars" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
        {/* Array.from creates N items so we can render N stars */}
        {Array.from({ length: testimonial.rating }, (_, i) => (
          <Icon key={i} name="star" size={16} />
        ))}
      </div>
      <blockquote className="quote__text">{testimonial.content}</blockquote>
      <figcaption className="quote__author">
        <span className="quote__avatar" aria-hidden="true">{getInitials(testimonial.name)}</span>
        <span>
          <strong>{testimonial.name}</strong>
          <small>{testimonial.role}</small>
        </span>
      </figcaption>
    </figure>
  );
}
