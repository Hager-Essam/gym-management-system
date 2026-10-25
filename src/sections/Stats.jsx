import StatCard from '../components/cards/StatCard.jsx';
import { stats } from '../data/landing.js';
import './Stats.css';

export default function Stats() {
  return (
    <section className="stats">
      <div className="container stats__grid">
        {/* .map() turns an array of data into an array of components. `key` must be unique. */}
        {stats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>
    </section>
  );
}
