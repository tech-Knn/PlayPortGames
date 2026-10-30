import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameCard from './GameCard.jsx';
import { CATEGORIES, GAMES, searchGames } from '../data/games.js';
import { createPortal } from 'react-dom';

export default function SearchOverlay({ open, onClose }) {
  const [q, setQ] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setQ('');
      document.body.style.overflow = 'hidden';
      const t = setTimeout(() => inputRef.current && inputRef.current.focus(), 60);
      return () => {
        clearTimeout(t);
        document.body.style.overflow = '';
      };
    }
    document.body.style.overflow = '';
    return undefined;
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const term = q.trim();
  const results = term ? searchGames(term) : [];
  const popular = [...GAMES]
    .sort((a, b) => parseFloat(b.plays) - parseFloat(a.plays))
    .slice(0, 12);

  const submit = (e) => {
    e.preventDefault();
    if (term) {
      onClose();
      navigate(`/search?q=${encodeURIComponent(term)}`);
    }
  };

  const goCategory = (slug) => {
    onClose();
    navigate(`/category/${slug}`);
  };

  return createPortal(
    <div className="soverlay" onClick={onClose} role="dialog" aria-label="Search games">
      <div className="spanel" onClick={(e) => e.stopPropagation()}>
        <form className="search spanel__search" role="search" onSubmit={submit}>
          <input
            ref={inputRef}
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="What are you playing today?"
            aria-label="Search games"
          />
          <button className="search__btn" type="submit" aria-label="Search">
            🔍
          </button>
        </form>

        <div className="spanel__chips">
          {CATEGORIES.slice(0, 6).map((c) => (
            <button key={c.slug} className="btn-chip" onClick={() => goCategory(c.slug)}>
              {c.emoji} {c.name}
            </button>
          ))}
        </div>

        <h2 className="spanel__title">
          {term
            ? results.length
              ? `Results for \u201C${term}\u201D`
              : `No games match \u201C${term}\u201D`
            : 'Popular this week'}
        </h2>

        <div className="spanel__grid" onClick={onClose}>
          {(term ? results : popular).map((g) => (
            <GameCard key={g.id} game={g} />
          ))}
        </div>

        {term && !results.length && (
          <p className="spanel__hint">
            Try a game name, a developer, or a category like &ldquo;puzzle&rdquo;.
          </p>
        )}
      </div>

      <button className="soverlay__close" aria-label="Close search" onClick={onClose}>
        ‹
     </button>
    </div>,
    document.body
  );
}