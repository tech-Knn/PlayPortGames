import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import CategoryChips from '../components/CategoryChips.jsx';
import { GameGrid } from '../components/GameGrid.jsx';
import { searchGames } from '../data/games.js';

export default function SearchResults() {
  const [params] = useSearchParams();
  const q = params.get('q') || '';
  const results = searchGames(q);

  useEffect(() => {
    document.title = q ? `"${q}" — Search | Playport` : 'Search — Playport';
  }, [q]);

  return (
    <main className="page">
      <CategoryChips />
      <div className="cat-hero">
        <div className="cat-hero__tile" aria-hidden="true">🔍</div>
        <div>
          <h1 className="cat-hero__title">Results for “{q}”</h1>
          <div className="cat-hero__count">
            {results.length} {results.length === 1 ? 'game' : 'games'} found
          </div>
        </div>
      </div>

      {results.length ? (
        <section className="section">
          <GameGrid games={results} allowBig={false} />
        </section>
      ) : (
        <div className="empty">
          <div className="empty__glyph">🫥</div>
          <p>
            Nothing matched “{q}”. Try a game name, a developer, or a
            category like “puzzle” — or <Link to="/">browse all games</Link>.
          </p>
        </div>
      )}
    </main>
  );
}
