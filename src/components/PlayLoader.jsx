import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const WORD = 'PLAYGRID';
const W = 720;
const H = 180;
const TOP = 28;      // top of the letters inside the viewBox
const BOTTOM = 152;  // baseline of the letters
const ASSEMBLE_MS = 1500; // how long the letters tumble in

const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Wavy waterline: a closed shape whose top edge is a sine wave.
function wavePath(level, phase, amp) {
  const y0 = BOTTOM - (BOTTOM - TOP) * level;
  const pts = [];
  for (let x = -10; x <= W + 10; x += 12) {
    const y = y0 + Math.sin(x / 38 + phase) * amp + Math.sin(x / 17 - phase * 1.6) * amp * 0.45;
    pts.push(x.toFixed(1) + ' ' + y.toFixed(1));
  }
  return 'M' + pts.join(' L') + ' L' + (W + 10) + ' ' + (H + 10) + ' L-10 ' + (H + 10) + ' Z';
}

const rnd = (i, n) => ((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1 + 1) % 1;

// Deterministic start poses for the tumbling letters.
const POSES = WORD.split('').map((_, i) => ({
  dx: (rnd(i, 1) - 0.5) * 520,
  dy: -140 - rnd(i, 2) * 220,
  rot: (rnd(i, 3) - 0.5) * 520,
}));

// Deterministic "bokeh" dots so the background looks the same every time.
const DOTS = Array.from({ length: 16 }, (_, i) => ({
  left: rnd(i, 1) * 100,
  top: rnd(i, 2) * 100,
  size: 14 + rnd(i, 3) * 46,
  hue: ['#ff5d8f', '#ffb938', '#18c29c', '#0ea5e9', '#7c4dff'][i % 5],
  delay: -rnd(i, 4) * 9,
  dur: 8 + rnd(i, 5) * 8,
}));

/**
 * PLAYGRID intro + loading screen.
 *   1. a dot pops, the letters tumble in and snap into the word
 *   2. the outline fills with a rainbow gradient (wavy waterline) + % counter
 *   3. a circular wipe reveals the game
 *
 * props:
 *   done     - set true when the game iframe has loaded
 *   onFinish - called after the exit wipe (unmount the loader there)
 *   minMs    - shortest time the fill phase stays up (default 1200)
 */
export default function PlayLoader({ done = false, onFinish, minMs = 1200 }) {
  const [phase, setPhase] = useState(prefersReduced ? 'fill' : 'assemble'); // assemble | fill | leaving
  const [pct, setPct] = useState(0);
  const [xs, setXs] = useState(null); // measured x of every letter
  const measureRef = useRef(null);
  const pathRef = useRef(null);
  const doneRef = useRef(done);
  doneRef.current = done;
  const finishRef = useRef(onFinish);
  finishRef.current = onFinish;

  // measure where each letter sits in the finished word
  useLayoutEffect(() => {
    const measure = () => {
      const el = measureRef.current;
      if (!el || !el.getStartPositionOfChar) return;
      try {
        setXs(WORD.split('').map((_, i) => el.getStartPositionOfChar(i).x));
      } catch (e) { /* fall back to no per-letter animation */ }
    };
    measure();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  }, []);

  // phase 1 -> 2
  useEffect(() => {
    if (phase !== 'assemble') return undefined;
    const t = setTimeout(() => setPhase('fill'), ASSEMBLE_MS);
    return () => clearTimeout(t);
  }, [phase]);

  // phase 2: fill + counter, then the exit wipe
  useEffect(() => {
    if (phase !== 'fill') return undefined;
    const t0 = performance.now();
    let raf = 0;
    let value = 0;
    let finished = false;
    let timer = 0;

    const tick = (now) => {
      const t = now - t0;
      const canFinish = doneRef.current && t >= minMs;
      const target = canFinish ? 100 : Math.min(92, 100 * (1 - Math.exp(-t / 1000)));
      value += (target - value) * (canFinish ? 0.14 : 0.08);
      if (canFinish && value > 99.4) value = 100;

      if (pathRef.current) pathRef.current.setAttribute('d', wavePath(value / 100, t / 380, value >= 100 ? 0 : 5));
      setPct(Math.floor(value));

      if (value >= 100 && !finished) {
        finished = true;
        timer = setTimeout(() => setPhase('leaving'), 320);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [phase, minMs]);

  // phase 3: once the iris wipe has played, tell the parent to unmount us
  useEffect(() => {
    if (phase !== 'leaving') return undefined;
    const t = setTimeout(() => finishRef.current && finishRef.current(), 750);
    return () => clearTimeout(t);
  }, [phase]);

  const assembling = phase === 'assemble';

  return (
    <div className={'pl pl--' + phase} role="status" aria-live="polite" aria-label="Loading game">
      <div className="pl__dots" aria-hidden="true">
        {DOTS.map((d, i) => (
          <span
            key={i}
            style={{
              left: d.left + '%',
              top: d.top + '%',
              width: d.size,
              height: d.size,
              background: d.hue,
              animationDelay: d.delay + 's',
              animationDuration: d.dur + 's',
            }}
          />
        ))}
      </div>

      <div className="pl__stage">
        <svg className="pl__logo" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
          <defs>
            <linearGradient id="plGrad" gradientUnits="userSpaceOnUse" x1="0" y1={TOP} x2="0" y2={BOTTOM}>
              <stop offset="0" stopColor="#ffb938" />
              <stop offset="0.5" stopColor="#ff5d8f" />
              <stop offset="1" stopColor="#7c4dff" />
            </linearGradient>
            <clipPath id="plClip">
              <path ref={pathRef} d={wavePath(0, 0, 5)} />
            </clipPath>
          </defs>

          {/* whole-word outline: measuring ruler during phase 1, the empty "glass" in phase 2 */}
          <text
            ref={measureRef}
            className="pl__outline"
            x={W / 2}
            y={BOTTOM}
            textAnchor="middle"
            style={{ visibility: assembling && xs ? 'hidden' : 'visible' }}
          >
            {WORD}
          </text>

          {/* phase 2: gradient fill revealed by the rising wave */}
          {!assembling && (
            <text className="pl__fill" x={W / 2} y={BOTTOM} textAnchor="middle" fill="url(#plGrad)" clipPath="url(#plClip)">
              {WORD}
            </text>
          )}

          {/* phase 1: the dot, then each letter tumbling into place */}
          {assembling && <circle className="pl__spark" cx={W / 2} cy={H / 2 + 6} r="13" />}
          {assembling && xs &&
            WORD.split('').map((ch, i) => (
              <text
                key={i}
                className="pl__letter"
                x={xs[i]}
                y={BOTTOM}
                style={{
                  '--dx': POSES[i].dx + 'px',
                  '--dy': POSES[i].dy + 'px',
                  '--rot': POSES[i].rot + 'deg',
                  animationDelay: 0.35 + i * 0.085 + 's',
                }}
              >
                {ch}
              </text>
            ))}
        </svg>

        <div className="pl__tag">Play free. Play instantly.</div>
        <div className="pl__pct">{pct}%</div>
      </div>
    </div>
  );
}
