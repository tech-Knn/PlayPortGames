# PlayGrid — a Poki-style game portal frontend (React + Vite)

A structural recreation of the poki.com UI pattern with **original branding**
(name, colors, logo, and art are all new — no Poki assets or trademarks are
used). Built as the shell you drop licensed HTML5 games into later.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
npm run preview  # serve the production build
```

## What's inside

```
src/
  data/games.js            ← single source of truth (swap for your API/feed)
  components/
    Header.jsx             ← sticky header: logo + pill search (routes to /search)
    CategoryChips.jsx      ← horizontal scrolling category pills
    GameCard.jsx           ← one tile (1×1 or featured 2×2), gradient placeholder art
    GameGrid.jsx           ← GameGrid (dense mosaic), GameRail (scroller), Section
    GameFrame.jsx          ← the game stage: splash → sandboxed <iframe>
    Footer.jsx
  pages/
    Home.jsx               ← chips + "Popular this week" rail + mosaic + SEO card
    Category.jsx           ← /category/:slug
    GamePage.jsx           ← /game/:slug — side tile rails, stage, info, dev rail
    SearchResults.jsx      ← /search?q=
    NotFound.jsx
  styles/global.css        ← all design tokens + styles (one low-specificity file)
```

## Layout patterns recreated from Poki

- Sticky header with a single centered pill search ("What are you playing today?")
- Horizontal category chip row under the header
- Dense mosaic grid mixing 1×1 tiles with 2×2 featured tiles
  (`grid-auto-flow: dense` does the backfilling)
- Tile hover reveals the game name on a bottom gradient scrim
- Game page: playfield centered with tile rails on both sides (rails collapse
  to a horizontal scroller under 960px), title/like/fullscreen bar under the
  stage, long-form info card, "More by this developer" and related-category rails
- Fully responsive down to phones; keyboard focus rings; reduced-motion respected

## Integrating licensed games (the important part)

Providers like **GamePix**, **GameDistribution**, and **GameMonetize** hand you
a per-game **embed URL** (plus a thumbnail and metadata, often as a JSON feed).
Integration is a data-layer change only:

1. In `src/data/games.js`, replace the static `GAMES` array with a fetch of
   your provider feed (or your own backend that proxies it).
2. Set each game's `embedUrl` to the provider's iframe URL.
   `GameFrame.jsx` already renders it in a sandboxed `<iframe>` after the
   player hits **Play** (click-to-load keeps the page fast and ad-policy
   friendly).
3. Swap the gradient placeholder in `GameCard.jsx` for the provider thumbnail:
   `<img src={game.thumb} alt="" loading="lazy" />`.
4. Keep games on the provider's domain (their iframe) or, if your license
   includes files, self-host them on a **separate sandbox (sub)domain** — the
   big portals isolate game code from the main site origin for security.

## Legal note

This project recreates common layout *patterns* (grids, rails, search-first
header), which are standard across game portals. Do not copy Poki's logo,
name, color scheme, thumbnails, or game files — license content from a
provider that grants you distribution rights.
