import ImageSlot from '../ui/ImageSlot.jsx';
import './CoachCard.css';

export default function CoachCard({ coach }) {
  return (
    <article className="card coach">
      <ImageSlot src={coach.image} alt={`Portrait of ${coach.name}`} className="coach__photo">
        <span className="coach__badge mono">{coach.badge}</span>
      </ImageSlot>
      <div className="coach__body">
        <h3 className="coach__name">{coach.name}</h3>
        <p className="mono text-accent coach__role">{coach.role}</p>
        <p className="coach__bio">{coach.bio}</p>
      </div>
    </article>
  );
}
