import { useEffect } from 'react';

function Page({ title, children }) {
  useEffect(() => {
    document.title = `${title} — Playport`;
    window.scrollTo(0, 0);
  }, [title]);
  return (
    <main className="page">
      <article className="infocard" style={{ marginTop: 24 }}>
        <h1>{title}</h1>
        {children}
      </article>
    </main>
  );
}

export function About() {
  return (
    <Page title="About">
      <p>
        Playport is a free browser-gaming site: no downloads, no installs —
        pick a game and play instantly on desktop, tablet, or phone. Our
        catalog mixes games built by our own team with titles from partner
        game studios.
      </p>
      <p>Playport is operated from India. For anything else, see Contact.</p>
    </Page>
  );
}

export function Contact() {
  return (
    <Page title="Contact">
      <p>
        Questions, bug reports, or business inquiries:
        write to <strong>contact@siyapa.in</strong> and we usually reply
        within 2 working days.
      </p>
    </Page>
  );
}

export function Privacy() {
  return (
    <Page title="Privacy Policy">
      <p>Last updated: 27 October 2026</p>
      <h2>What we collect</h2>
      <p>
        Playport has no user accounts and does not ask for your name, email,
        or any personal details to play. Game progress and high scores are
        stored locally in your own browser and never sent to us.
      </p>
      <h2>Advertising and third parties</h2>
      <p>
        Playport is free because it shows advertising. Ads are served by
        third-party partners (such as Google and our game-content partners),
        which may use cookies or similar identifiers to show relevant ads
        and measure performance. You can limit ad personalization in your
        browser or device settings. Some games are provided by partner
        studios and load from their servers, subject to their own policies.
      </p>
      <h2>Technical data</h2>
      <p>
        Like most websites, our hosting provider keeps standard server logs
        (IP address, browser type, pages visited) for security and
        performance.
      </p>
      <h2>Children</h2>
      <p>
        Playport is intended for general audiences. We do not knowingly
        collect personal information from children.
      </p>
      <h2>Contact</h2>
      <p>Privacy questions: contact@siyapa.in.</p>
    </Page>
  );
}

export function Terms() {
  return (
    <Page title="Terms of Use">
      <p>
        By using Playport you agree to these terms. Games are provided
        &ldquo;as is&rdquo; for personal, non-commercial entertainment. Don&rsquo;t
        copy, re-host, or resell the games or site content; titles from
        partner studios remain their property. We may change or remove
        content at any time. Use of the site is at your own risk.
      </p>
      <p>Questions: contact@siyapa.in.</p>
    </Page>
  );
}