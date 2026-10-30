import { useEffect } from 'react';
import CategoryChips from '../components/CategoryChips.jsx';
import { GameGrid, Section } from '../components/GameGrid.jsx';
import { GAMES } from '../data/games.js';
import Marquee from '../components/Marquee.jsx';

export default function Home() {
  useEffect(() => {
    document.title = 'Playport — Free Online Games, Play Instantly';
  }, []);

  return (
    <main className="page">
      <CategoryChips />

      <Section title="Trending now">
        <Marquee />
      </Section>

      <Section title="All games">
        <GameGrid games={GAMES} />
      </Section>

      <section className="section infocard">
        <h1>Free online games on Playport</h1>
        <p>
          Play free games instantly — on desktop, tablet, or phone. No
          downloads, no sign-ups: pick a tile and you&rsquo;re playing in
          seconds.
        </p>
        <h2>Something for everyone</h2>
        <p>
          Racing, puzzles, sports, two-player duels and cozy games — use the
          categories above or search to find your next favorite. New games
          are added regularly.
        </p>
      </section>
    </main>
  );
}