import { useEffect } from 'react';
import CategoryChips from '../components/CategoryChips.jsx';
import { GameGrid, Section } from '../components/GameGrid.jsx';
import { GAMES } from '../data/games.js';
import Marquee from '../components/Marquee.jsx';

export default function Home() {
  useEffect(() => {
    document.title = 'PlayGrid — Free Online Games, Play Instantly';
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

    </main>
  );
}