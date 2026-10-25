import './TagRow.css';

// Row of small mono labels at the bottom of a card. Items with `accent: true` are green.
export default function TagRow({ tags }) {
  return (
    <div className="tag-row">
      {tags.map((tag) => (
        <span key={tag.label} className={`mono ${tag.accent ? 'text-accent' : 'text-muted'}`}>
          {tag.label}
        </span>
      ))}
    </div>
  );
}
