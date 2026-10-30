import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const canPeek =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches;

export default function GameCard({ game, big = false, showBadge = false, index = 0 }) {
  const [from, to] = game.gradient;
  const [peek, setPeek] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const timer = useRef(null);

  const demoSrc =
    !game.noPeek && game.embedUrl && game.embedUrl.startsWith('/games/')
      ? game.embedUrl + (game.embedUrl.includes('?') ? '&' : '?') + 'demo=1'
      : null;

  const enter = () => {
    if (!demoSrc || !canPeek) return;
    timer.current = setTimeout(() => setPeek(true), 250);
  };

  const leave = () => {
    clearTimeout(timer.current);
    setPeek(false);
  };

  useEffect(() => () => clearTimeout(timer.current), []);

  const showArt = !game.thumb || imgErr;

  return (
    <Link
      to={`/game/${game.slug}`}
      className={'card' + (big ? ' card--big' : '')}
      style={{ '--i': index }}
      aria-label={`Play ${game.title}`}
      onMouseEnter={enter}
      onMouseLeave={leave}
      onFocus={enter}
      onBlur={leave}
    >
      {showArt ? (
        <div
          className="card__art"
          style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
          aria-hidden="true"
        >
          {game.glyph}
        </div>
      ) : (
        <img
          className="card__img"
          src={game.thumb}
          alt=""
          loading="lazy"
          onError={() => setImgErr(true)}
        />
      )}
      {peek && demoSrc && (
        <iframe
          className="card__peek"
          src={demoSrc}
          title=""
          aria-hidden="true"
          tabIndex={-1}
          sandbox="allow-scripts"
        />
      )}
      {showBadge && game.featured && <span className="card__badge">HOT</span>}
      <span className="card__name">{game.title}</span>
    </Link>
  );
}