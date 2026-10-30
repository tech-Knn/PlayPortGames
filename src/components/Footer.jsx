import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/games.js';
import Logo from './Logo.jsx';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div>
          <Logo />
          <p className="footer__tag">
            Instant browser games — no downloads, no installs, just click and
            play on any device.
          </p>
        </div>

        <div>
          <h3>Play</h3>
          <ul>
            <li><Link to="/">All Games</Link></li>
            {CATEGORIES.slice(0, 4).map((c) => (
              <li key={c.slug}>
                <Link to={`/category/${c.slug}`}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Company</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/tutorials">Tutorials</Link></li>
            <li><Link to="/faqs">FAQs</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3>Legal</h3>
          <ul>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Use</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer__legal">
        © {new Date().getFullYear()} PlayPort. All rights reserved. Made with ♥ in India.
      </div>
    </footer>
  );
}
