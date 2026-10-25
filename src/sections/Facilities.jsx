import FacilityCard from '../components/cards/FacilityCard.jsx';
import IconBadge from '../components/ui/IconBadge.jsx';
import ImageSlot from '../components/ui/ImageSlot.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import TagRow from '../components/ui/TagRow.jsx';
import { facilitiesHeader, facilities, recovery, lockers } from '../data/landing.js';
import './Facilities.css';

export default function Facilities() {
  return (
    <section id="facilities" className="section section--deep">
      <div className="container">
        <SectionHeading {...facilitiesHeader} />

        <div className="facilities__row facilities__row--three">
          {facilities.map((item) => (
            <FacilityCard key={item.id} facility={item} />
          ))}
        </div>

        <div className="facilities__row facilities__row--bottom">
          <article className="card recovery">
            <ImageSlot src={recovery.image} alt={recovery.title} className="recovery__photo" />
            <div className="recovery__body">
              <IconBadge name="ac_unit" />
              <h3>{recovery.title}</h3>
              <p>{recovery.description}</p>
              <ul className="recovery__specs">
                {recovery.specs.map((spec) => (
                  <li key={spec.label} className={`mono ${spec.accent ? 'text-accent' : 'text-muted'}`}>
                    {spec.label}
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <article className="card lockers">
            <IconBadge name="lock" />
            <h3>{lockers.title}</h3>
            <p>{lockers.description}</p>
            <TagRow tags={lockers.tags} />
          </article>
        </div>
      </div>
    </section>
  );
}
