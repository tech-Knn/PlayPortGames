import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/games.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div>
          <div className="logo">
            <span className="logo__tile" aria-hidden="true">▶</span>
            <span>Playport</span>
          </div>
          <p className="footer__tag">
            Instant browser games. No downloads, no installs — just click and
            play on any device.
          </p>
        </div>

        <div>
          <h3>Popular</h3>
          <ul>
            {CATEGORIES.slice(0, 5).map((c) => (
              <li key={c.slug}>
                <Link to={`/category/${c.slug}`}>{c.name} Games</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Help &amp; support</h3>
          <ul>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/privacy">Privacy policy</Link></li>
            <li><Link to="/terms">Terms of use</Link></li>
          </ul>
        </div>

        <div>
          <h3>Company</h3>
          <ul>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer__legal">
        © {new Date().getFullYear()} Playport. All rights reserved.
      </div>
    </footer>
  );
}
