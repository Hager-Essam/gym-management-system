import CoachCard from '../components/cards/CoachCard.jsx';
import Icon from '../components/ui/Icon.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import { coachesHeader, coaches } from '../data/landing.js';
import './Coaches.css';

export default function Coaches() {
  return (
    <section id="coaches" className="section">
      <div className="container">
        <SectionHeading
          eyebrow={coachesHeader.eyebrow}
          title={coachesHeader.title}
          aside={
            <a href={coachesHeader.linkHref} className="coaches__link">
              {coachesHeader.linkLabel} <Icon name="chevron_right" size={18} />
            </a>
          }
        />
        <div className="coaches__grid">
          {coaches.map((coach) => (
            <CoachCard key={coach.id} coach={coach} />
          ))}
        </div>
      </div>
    </section>
  );
}
