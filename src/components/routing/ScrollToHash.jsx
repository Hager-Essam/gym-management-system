import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// React Router changes the URL but doesn't scroll for us. This tiny component does:
//  - URL has a hash (/#pricing)  -> scroll to the element with id="pricing"
//  - no hash                     -> scroll to the top of the new page
// It renders nothing; it only runs an effect whenever the location changes.
export default function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1));
      if (target) {
        target.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}
