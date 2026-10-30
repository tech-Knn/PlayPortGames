import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import SearchOverlay from './SearchOverlay.jsx';

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="logo" aria-label="Playport home">
          <span className="logo__tile" aria-hidden="true">▶</span>
          <span>Playport</span>
        </Link>

        <nav className="topnav" aria-label="Site">
          <NavLink to="/" end className={({ isActive }) => 'topnav__link' + (isActive ? ' is-active' : '')}>
            Games
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => 'topnav__link' + (isActive ? ' is-active' : '')}>
            About
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => 'topnav__link' + (isActive ? ' is-active' : '')}>
            Contact
          </NavLink>
        </nav>

        <button className="topsearch" onClick={() => setSearchOpen(true)} aria-label="Open search">
          <span aria-hidden="true">🔍</span>
          <span className="topsearch__ph">Search games</span>
        </button>
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}