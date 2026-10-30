import GameCard from './GameCard.jsx';
import { GAMES } from '../data/games.js';

export default function Marquee() {
  const picks = GAMES.filter((g) => g.featured)
    .concat(GAMES)
    .slice(0, 12);
  const loop = [...picks, ...picks];

  return (
    <div className="marquee">
      <div className="marquee__track">
        {loop.map((g, i) => (
          <div className="marquee__item" key={i} aria-hidden={i >= picks.length}>
            <GameCard game={g} />
          </div>
        ))}
      </div>
    </div>
  );
}