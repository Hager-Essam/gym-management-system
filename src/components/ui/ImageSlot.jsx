import { useState } from 'react';
import './ImageSlot.css';

// Shows a photo from /public. If the file doesn't exist yet, shows a grid placeholder instead.
// `children` are rendered on top of the image (used for badges and readouts).
export default function ImageSlot({ src, alt, className = '', children }) {
  const [failed, setFailed] = useState(false); // state: did the image fail to load?

  return (
    <div className={`image-slot ${className}`}>
      {failed ? (
        <div className="image-slot__placeholder" role="img" aria-label={alt} />
      ) : (
        <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
      )}
      <div className="image-slot__shade" />
      {children}
    </div>
  );
}
