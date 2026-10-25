import TestimonialCard from '../components/cards/TestimonialCard.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import { testimonialsHeader, testimonials } from '../data/landing.js';
import './Testimonials.css';

export default function Testimonials() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading align="center" {...testimonialsHeader} />
        <div className="testimonials__grid">
          {testimonials.map((item) => (
            <TestimonialCard key={item.id} testimonial={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
