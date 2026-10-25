// Small wrapper around the Material Symbols icon font.
// Usage: <Icon name="groups" size={18} />   (browse names at fonts.google.com/icons)
export default function Icon({ name, size = 20, className = '' }) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{ fontSize: size, lineHeight: 1 }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
