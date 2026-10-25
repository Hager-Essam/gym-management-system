import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import Hero from '../sections/Hero.jsx';
import Stats from '../sections/Stats.jsx';
import Features from '../sections/Features.jsx';
import Pricing from '../sections/Pricing.jsx';
import Coaches from '../sections/Coaches.jsx';
import Facilities from '../sections/Facilities.jsx';
import Testimonials from '../sections/Testimonials.jsx';
import CallToAction from '../sections/CallToAction.jsx';

// A page is just a component that stacks smaller components (sections) in order.
export default function HomePage() {
  return (
    <div id="top">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <Pricing />
        <Coaches />
        <Facilities />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
