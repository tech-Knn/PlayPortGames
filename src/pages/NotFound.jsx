import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="page">
      <div className="empty">
        <div className="empty__glyph">🎲</div>
        <h1>404 — level not found</h1>
        <p>
          That page doesn't exist. <Link to="/">Back to the games</Link>.
        </p>
      </div>
    </main>
  );
}
