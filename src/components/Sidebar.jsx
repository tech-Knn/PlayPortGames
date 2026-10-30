import { NavLink, useNavigate } from 'react-router-dom';
import { CATEGORIES, GAMES } from '../data/games.js';

export default function Sidebar() {
  const navigate = useNavigate();

  const randomGame = () => {
    const g = GAMES[Math.floor(Math.random() * GAMES.length)];
    navigate(`/game/${g.slug}`);
  };

  return (
    <aside className="sidebar" aria-label="Browse games">
      <p className="sidebar__title">Explore</p>
      <nav className="sidebar__nav">
        <NavLink to="/" end className={({ isActive }) => 'sidebar__link' + (isActive ? ' is-active' : '')}>
          ⭐ All games
        </NavLink>
        <button className="sidebar__link" onClick={randomGame}>
          🎲 Random game
        </button>
      </nav>

      <p className="sidebar__title">Categories</p>
      <nav className="sidebar__nav">
        {CATEGORIES.map((c) => (
          <NavLink
            key={c.slug}
            to={`/category/${c.slug}`}
            className={({ isActive }) => 'sidebar__link' + (isActive ? ' is-active' : '')}
          >
            {c.emoji} {c.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}