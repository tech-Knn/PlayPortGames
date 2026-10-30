import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import SearchOverlay from './SearchOverlay.jsx';
import Logo from './Logo.jsx';

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <header className="header">
      <div className="header__inner">
        <Logo />

        <nav className="topnav" aria-label="Site">
          <NavLink to="/" end className={({ isActive }) => 'topnav__link' + (isActive ? ' is-active' : '')}>
            Games
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => 'topnav__link' + (isActive ? ' is-active' : '')}>
            About Us
          </NavLink>
          <NavLink to="/tutorials" className={({ isActive }) => 'topnav__link' + (isActive ? ' is-active' : '')}>
            Tutorials
          </NavLink>
          <NavLink to="/faqs" className={({ isActive }) => 'topnav__link' + (isActive ? ' is-active' : '')}>
            FAQs
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => 'topnav__link' + (isActive ? ' is-active' : '')}>
            Contact
          </NavLink>
        </nav>

        <button className="topsearch" onClick={() => setSearchOpen(true)} aria-label="Search games">
          <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
          </svg>
          <span className="topsearch__ph">Search games…</span>
          <span className="topsearch__kbd">⌘ K</span>
        </button>
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
