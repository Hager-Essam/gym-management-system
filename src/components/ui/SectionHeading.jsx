import './SectionHeading.css';

// Eyebrow label + big title + optional description. `aside` is anything placed at the right.
export default function SectionHeading({ eyebrow, title, description, align = 'left', aside }) {
  return (
    <div className={`heading heading--${align}`}>
      <div className="heading__text">
        <p className="heading__eyebrow mono">
          <span className="dot" />
          {eyebrow}
        </p>
        <h2 className="heading__title">{title}</h2>
        {description && <p className="heading__desc">{description}</p>}
      </div>
      {aside}
    </div>
  );
}
