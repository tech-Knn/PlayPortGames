/**
 * Placeholder game catalog.
 *
 * When you license real games (e.g. from GamePix, GameDistribution,
 * GameMonetize or a direct studio deal), replace this static array with a
 * fetch from your own backend / the provider's JSON feed, and fill in:
 *   - `embedUrl`  → the iframe URL the provider gives you per game
 *   - `thumb`     → the provider's thumbnail image URL (swap the CSS
 *                   gradient placeholder in <GameCard/> for an <img/>)
 *
 * Everything else in the UI (routing, grids, search, category pages,
 * the game stage) already keys off this shape, so integration is a
 * data-layer change only.
 */

export const CATEGORIES = [
  { slug: 'action', name: 'Action', emoji: '⚡' },
  { slug: 'puzzle', name: 'Puzzle', emoji: '🧩' },
  { slug: 'racing', name: 'Racing', emoji: '🏎️' },
  { slug: 'sports', name: 'Sports', emoji: '⚽' },
  { slug: 'two-player', name: '2 Player', emoji: '🎮' },
  { slug: 'io', name: '.io', emoji: '🌐' },
  { slug: 'skill', name: 'Skill', emoji: '🎯' },
  { slug: 'adventure', name: 'Adventure', emoji: '🗺️' },
  { slug: 'shooting', name: 'Shooting', emoji: '🔫' },
  { slug: 'dress-up', name: 'Dress Up', emoji: '👗' },
  { slug: 'clicker', name: 'Clicker', emoji: '👆' },
  { slug: 'cozy', name: 'Cozy', emoji: '☕' },
];

// Gradient pairs used to paint placeholder tile art. Deterministic per game.
const PALETTES = [
  ['#6C3BFF', '#3B82F6'],
  ['#FF5D8F', '#FFB938'],
  ['#18C29C', '#3B82F6'],
  ['#FFB938', '#FF7A3B'],
  ['#8B5CF6', '#EC4899'],
  ['#0EA5E9', '#22D3EE'],
  ['#F43F5E', '#8B5CF6'],
  ['#22C55E', '#A3E635'],
];

const raw = [];

const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

/**
 * Embed URLs. Right now every entry points at one of six original,
 * self-contained mini-games bundled in /public/games (hopper, serpent,
 * brick, paddle, pairs, tap) — themed per title via URL params
 * (?e=emoji, ?c=%23hexcolor, ?set=..., ?two=1 for local 2-player).
 * When you get licensed games from a provider, replace these values
 * with the provider's iframe URLs. Nothing else needs to change.
 */
const EMBEDS = {};

raw.push(['Kart Royale', 'racing', '🏎️', 4.6, 'Ryan Campbell', '0', true,
  'A full 3D kart racer: drift through corners for boosts, grab item boxes and chase down your rivals on Sunset Bay Circuit.']);
EMBEDS['kart-royale'] = '/games/kart-royale/index.html';

raw.push(['Plinker', 'skill', '🔵', 4.6, 'Frank Force', '0', true,
  'Drop chips down the pegs and land them in the big-score slots. Simple, bouncy and hard to put down.']);
EMBEDS['plinker'] = '/games/plinko/games/plinko.html';

raw.push(["Saurabh's Sprint", 'action', '🏃', 4.6, 'PlayGrid', '0', false,
  'A 3D endless runner: dodge trains, grab coins, outrun the police and unlock new heroes and hoverboards.']);
EMBEDS['saurabh-s-sprint'] = '/games/saurabhs-sprint/index.html';

raw.push(['Pool', 'sports', '🎱', 4.6, 'PlayGrid', '0', false, 'Line up the cue, set your power and sink all fifteen balls in as few shots as you can.']);
EMBEDS['pool'] = '/games/pool/games/pool.html';

raw.push(['Jumpman', 'adventure', '🍄', 4.5, 'PlayGrid', '0', false, 'Run, jump and stomp through a bright side-scrolling world of blocks, coins and enemies.']);
EMBEDS['jumpman'] = '/games/jumpman/games/jumpman.html';

raw.push(['FreeCell Solitaire', 'puzzle', '🃏', 4.6, 'PlayGrid', '0', false, 'The classic card puzzle: move every card to its home pile using four free cells and a little planning.']);
EMBEDS['freecell-solitaire'] = '/games/freecell/games/freecell.html';

const THUMBS = {};

THUMBS['kart-royale'] = '/games/kart-royale/kart-royale.webp';
THUMBS['plinker'] = '/games/plinko/plinker.webp';
THUMBS['saurabh-s-sprint'] = '/games/saurabhs-sprint/saurabhs-sprint.webp';
THUMBS['pool'] = '/games/pool/pool.webp';
THUMBS['jumpman'] = '/games/jumpman/jumpman.webp';
THUMBS['freecell-solitaire'] = '/games/freecell/freecell.webp';

export const GAMES = raw.map(([title, category, glyph, rating, developer, plays, featured, blurb], i) => ({
  id: i + 1,
  slug: slugify(title),
  title,
  category,
  glyph,
  rating,
  developer: 'PlayGrid',
  plays,
  featured,
  blurb,
  gradient: PALETTES[i % PALETTES.length],
  // Bundled mini-game now; swap for your licensed provider's iframe URL later.
  embedUrl: EMBEDS[slugify(title)] || null,
  // Licensed thumbnail URL from your provider feed (GamePix: thumbnailUrl)
  thumb: THUMBS[slugify(title)] !== undefined ? THUMBS[slugify(title)] : '/thumbs/' + slugify(title) + '.webp',
}));

export const getGame = (slug) => GAMES.find((g) => g.slug === slug);
export const getCategory = (slug) => CATEGORIES.find((c) => c.slug === slug);
export const gamesByCategory = (slug) => GAMES.filter((g) => g.category === slug);
export const gamesByDeveloper = (dev, excludeSlug) =>
  GAMES.filter((g) => g.developer === dev && g.slug !== excludeSlug);
export const searchGames = (q) => {
  const term = q.trim().toLowerCase();
  if (!term) return [];
  return GAMES.filter(
    (g) =>
      g.title.toLowerCase().includes(term) ||
      g.developer.toLowerCase().includes(term) ||
      g.category.includes(term)
  );
};
