import ImageSlot from '../ui/ImageSlot.jsx';
import './FacilityCard.css';

export default function FacilityCard({ facility }) {
  return (
    <article className="card facility">
      <ImageSlot src={facility.image} alt={facility.title} className="facility__photo" />
      <div className="facility__body">
        <h3>{facility.title}</h3>
        <p>{facility.description}</p>
      </div>
    </article>
  );
}
