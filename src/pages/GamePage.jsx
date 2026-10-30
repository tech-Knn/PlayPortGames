import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import GameFrame from '../components/GameFrame.jsx';
import GameCard from '../components/GameCard.jsx';
import { GameRail, Section } from '../components/GameGrid.jsx';
import {
  getGame,
  getCategory,
  gamesByCategory,
  gamesByDeveloper,
  GAMES,
} from '../data/games.js';

export default function GamePage() {
  const { slug } = useParams();
  const game = getGame(slug);

  useEffect(() => {
    document.title = game
      ? `${game.title} — Play Online | PlayGrid`
      : 'Game not found — PlayGrid';
    window.scrollTo(0, 0);
  }, [game]);

  if (!game) {
    return (
      <main className="page">
        <div className="empty">
          <div className="empty__glyph">👾</div>
          <h1>Game not found</h1>
          <p>
            <Link to="/">Back to all games</Link>
          </p>
        </div>
      </main>
    );
  }

  const cat = getCategory(game.category);
  const related = gamesByCategory(game.category).filter(
    (g) => g.slug !== game.slug
  );
  const sideA = related.slice(0, 5);
  const sideB = related.slice(5, 10);
  const filler = GAMES.filter(
    (g) => g.slug !== game.slug && !related.includes(g)
  );
  while (sideA.length < 5 && filler.length) sideA.push(filler.shift());
  while (sideB.length < 5 && filler.length) sideB.push(filler.shift());
  const byDev = gamesByDeveloper(game.developer, game.slug);

  return (
    <main className="page">
      <div className="gamepage">
        <aside className="gamepage__side" aria-label="More games">
          {sideA.map((g) => (
            <GameCard key={g.id} game={g} />
          ))}
        </aside>

        <GameFrame game={game} />

        <aside className="gamepage__side" aria-label="More games">
          {sideB.map((g) => (
            <GameCard key={g.id} game={g} />
          ))}
        </aside>
      </div>

      <article className="infocard">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Games</Link>
          {' › '}
          {cat && <Link to={`/category/${cat.slug}`}>{cat.name} Games</Link>}
        </nav>
        <h1>{game.title}</h1>
        <div className="infocard__meta">
          <span>⭐ <strong>{game.rating}</strong> rating</span>
          <span>▶ <strong>{game.plays}</strong> plays</span>
          <span>🛠 by <strong>{game.developer}</strong></span>
          {cat && <span>🏷 <strong>{cat.name}</strong></span>}
        </div>
        <p>{game.blurb}</p>
        <h2>How to play</h2>
        <p>
          Desktop: use your keyboard, mouse, or trackpad — each game shows its
          controls on the start screen. Mobile: tap and swipe. Click inside the
          game once so it picks up your keyboard.
        </p>
      </article>

      {byDev.length > 0 && (
        <Section title={`More by ${game.developer}`}>
          <GameRail games={byDev} />
        </Section>
      )}

      {related.length > 0 && cat && (
        <Section
          title={`More ${cat.name} games`}
          link={`/category/${cat.slug}`}
        >
          <GameRail games={related} />
        </Section>
      )}
    </main>
  );
}
