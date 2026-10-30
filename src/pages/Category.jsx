import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CategoryChips from '../components/CategoryChips.jsx';
import { GameGrid } from '../components/GameGrid.jsx';
import { getCategory, gamesByCategory } from '../data/games.js';

export default function Category() {
  const { slug } = useParams();
  const cat = getCategory(slug);
  const games = gamesByCategory(slug);

  useEffect(() => {
    document.title = cat
      ? `${cat.name} Games — PlayGrid`
      : 'Category not found — PlayGrid';
  }, [cat]);

  if (!cat) {
    return (
      <main className="page">
        <div className="empty">
          <div className="empty__glyph">🕳️</div>
          <h1>Category not found</h1>
          <p>
            <Link to="/">Back to all games</Link>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <CategoryChips />
      <div className="cat-hero">
        <div className="cat-hero__tile" aria-hidden="true">{cat.emoji}</div>
        <div>
          <h1 className="cat-hero__title">{cat.name} Games</h1>
          <div className="cat-hero__count">{games.length} games</div>
        </div>
      </div>

      {games.length ? (
        <section className="section">
          <GameGrid games={games} />
        </section>
      ) : (
        <div className="empty">
          <div className="empty__glyph">📦</div>
          <p>No games in this category yet — add some in src/data/games.js.</p>
        </div>
      )}
    </main>
  );
}
