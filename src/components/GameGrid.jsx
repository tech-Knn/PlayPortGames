import GameCard from './GameCard.jsx';

/**
 * Dense mosaic grid. Featured games render as 2x2 tiles; CSS
 * `grid-auto-flow: dense` backfills the gaps, giving the Poki-style
 * mixed-size wall of tiles.
 */
export function GameGrid({ games, allowBig = true }) {
  return (
    <div className="grid">
      {games.map((g, i) => (
        <GameCard key={g.id} game={g} big={allowBig && g.featured} showBadge index={i} />
      ))}
    </div>
  );
}

/** Single-row horizontal scroller ("Popular this week" style). */
export function GameRail({ games }) {
  return (
    <div className="rail">z
      {games.map((g, i) => (
        <GameCard key={g.id} game={g} index={i} />
      ))}
    </div>
  );
}

/** Section wrapper with a title and optional "See all" link. */
export function Section({ title, link, linkLabel = 'See all', children }) {
  return (
    <section className="section">
      <div className="section__head">
        <h2 className="section__title">{title}</h2>
        {link && (
          <a className="section__link" href={link}>
            {linkLabel} →
          </a>
        )}
      </div>
      {children}
    </section>
  );
}
