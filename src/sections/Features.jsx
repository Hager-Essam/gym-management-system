import FeatureCard from '../components/cards/FeatureCard.jsx';
import TelemetryCard from '../components/cards/TelemetryCard.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import { featuresHeader, features, telemetrySnapshot } from '../data/landing.js';
import './Features.css';

export default function Features() {
  // Array destructuring: pull the five features out into named variables.
  const [trainers, workouts, access, progress, density] = features;

  return (
    <section id="features" className="section">
      <div className="container">
        <SectionHeading
          eyebrow={featuresHeader.eyebrow}
          title={featuresHeader.title}
          description={featuresHeader.description}
          aside={
            <p className="mono features__status">
              <span className="dot" /> {featuresHeader.status}
            </p>
          }
        />

        <div className="features__grid">
          <FeatureCard feature={trainers} />
          <FeatureCard feature={workouts} />
          <FeatureCard feature={access} />
          <FeatureCard feature={progress} />
          <TelemetryCard data={telemetrySnapshot} />
          <FeatureCard feature={density} />
        </div>
      </div>
    </section>
  );
}
