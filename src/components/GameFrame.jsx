import { useEffect, useRef, useState } from 'react';
import PlayLoader from './PlayLoader.jsx';

/**
 * The game stage.
 *
 * Set `game.embedUrl` in src/data/games.js and the game loads straight
 * away inside the sandboxed iframe, covered by the PLAYPORT loader until
 * it is ready.
 */
export default function GameFrame({ game }) {
  const [likes, setLikes] = useState(null); // null | 'up' | 'down'
  const [loaded, setLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const stageRef = useRef(null);
  const iframeRef = useRef(null);

  // opening a different game restarts the loader
  useEffect(() => {
    setLoaded(false);
    setShowLoader(true);
  }, [game.slug]);

  const goFullscreen = () => {
    const el = stageRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.();
  };

  return (
    <div className="stage">
      <div className="stage__viewport" ref={stageRef} style={{ position: 'relative' }}>
        {game.embedUrl ? (
          <>
            <iframe
              key={game.slug}
              ref={iframeRef}
              src={game.embedUrl}
              title={game.title}
              allow="autoplay; fullscreen; gamepad"
              sandbox="allow-scripts allow-same-origin allow-pointer-lock"
              onLoad={() => {
                setLoaded(true);
                iframeRef.current && iframeRef.current.focus();
              }}
            />
            {showLoader && (
              <PlayLoader done={loaded} onFinish={() => setShowLoader(false)} />
            )}
          </>
        ) : (
          <div className="splash">
            <div className="splash__title">{game.title}</div>
            <p className="splash__note">
              This game isn't available yet. Add its URL to <code>embedUrl</code> in
              src/data/games.js and it will load right here.
            </p>
          </div>
        )}
      </div>

      <div className="stage__bar">
        <span className="stage__bar-title">{game.title}</span>
        <span className="stage__bar-dev">by {game.developer}</span>
        <div className="stage__actions">
          <button
            className={'iconbtn' + (likes === 'up' ? ' iconbtn--on' : '')}
            onClick={() => setLikes(likes === 'up' ? null : 'up')}
            aria-pressed={likes === 'up'}
          >
            👍 Like
          </button>
          <button
            className={'iconbtn' + (likes === 'down' ? ' iconbtn--on' : '')}
            onClick={() => setLikes(likes === 'down' ? null : 'down')}
            aria-pressed={likes === 'down'}
          >
            👎
          </button>
          <button className="iconbtn" onClick={goFullscreen}>
            ⛶ Fullscreen
          </button>
        </div>
      </div>
    </div>
  );
}