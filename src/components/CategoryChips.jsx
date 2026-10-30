import { NavLink } from 'react-router-dom';
import { CATEGORIES } from '../data/games.js';

export default function CategoryChips() {
  return (
    <nav className="chips" aria-label="Game categories">
      {CATEGORIES.map((c) => (
        <NavLink
          key={c.slug}
          to={`/category/${c.slug}`}
          className={({ isActive }) =>
            'btn-chip' + (isActive ? ' btn-chip--active' : '')
          }
        >
          {c.emoji} {c.name}
        </NavLink>
      ))}
    </nav>
  );
}
