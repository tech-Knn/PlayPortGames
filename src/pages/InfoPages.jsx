import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

/* ─── About ─────────────────────────────────────────────── */
export function About() {
  useEffect(() => {
    document.title = 'About Us — PlayGrid';
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { value: '50K+', label: 'Players', bg: '#ff5d8f' },
    { value: '6+',   label: 'Games',   bg: '#18c29c' },
    { value: '12',   label: 'Categories', bg: '#7c4dff' },
    { value: '0',    label: 'Downloads needed', bg: '#ffb938' },
  ];

  return (
    <main className="page">
      <div className="info-wrap">
        <p className="info-label">About us</p>
        <h1 className="info-title">About PlayGrid</h1>
        <p className="info-sub">
          Your instant portal to free browser gaming — no downloads, no installs,
          just click and play on any device, anywhere.
        </p>

        <div className="stats-grid">
          {stats.map((s) => (
            <div key={s.label} className="stat-card" style={{ background: s.bg }}>
              <span className="stat-card__val">{s.value}</span>
              <span className="stat-card__label">{s.label}</span>
            </div>
          ))}
        </div>

        <h2 className="info-h2">What we do</h2>
        <div className="whatwedo__grid">
          <div className="whatwedo__card">
            <strong>Instant games, everywhere</strong>
            <p>
              Our games run entirely in your browser — on desktop, tablet, or
              phone. Nothing to install. Nothing to sign up for. Click and play in
              seconds.
            </p>
          </div>
          <div className="whatwedo__card">
            <strong>Something for everyone</strong>
            <p>
              Racing, puzzles, sports, two-player duels and cozy games — 12
              categories and growing. New titles are added regularly so there is
              always something fresh to try.
            </p>
          </div>
          <div className="whatwedo__card">
            <strong>Built in India 🇮🇳</strong>
            <p>
              PlayGrid is proudly made in India, bringing world-class browser
              gaming to players everywhere at zero cost.
            </p>
          </div>
          <div className="whatwedo__card">
            <strong>Free, always</strong>
            <p>
              Every game on PlayGrid is completely free to play. No subscriptions,
              no hidden costs, no paywalls — ever.
            </p>
          </div>
        </div>

        <h2 className="info-h2">Our story</h2>
        <p className="info-body">
          PlayGrid started with a simple frustration: too many good games buried
          behind app stores, downloads, and sign-up flows. We built PlayGrid so
          that anyone with a browser can discover and play instantly — no friction,
          no fuss.
        </p>
        <p className="info-body">
          PlayGrid is operated from India. Have a question or want to get in touch?
          Visit our <Link to="/contact" className="info-link">Contact page</Link>.
        </p>
      </div>
    </main>
  );
}

/* ─── Tutorials ──────────────────────────────────────────── */
const TUTORIALS = [
  {
    slug: 'kart-royale',
    title: 'Kart Royale: How to Play and Win',
    category: 'How to Play',
    date: 'October 28, 2026',
    excerpt:
      'Master the drift mechanic, grab item boxes at the right moment, and learn the fastest racing line through Sunset Bay Circuit.',
    glyph: '🏎️',
    color: ['#7c4dff', '#3b82f6'],
    featured: true,
  },
  {
    slug: 'plinker',
    title: 'Plinker: Top Tips to Land Big Scores',
    category: 'Tips & Tricks',
    date: 'October 20, 2026',
    excerpt: 'Choosing the right drop column makes all the difference. Learn the bounce patterns and maximize your score.',
    glyph: '🔵',
    color: ['#ff5d8f', '#ffb938'],
  },
  {
    slug: 'freecell-solitaire',
    title: 'Ultimate Guide to FreeCell Solitaire',
    category: 'Tutorials',
    date: 'October 15, 2026',
    excerpt: 'FreeCell is almost always winnable — if you know the strategy. Here is everything you need to clear the board.',
    glyph: '🃏',
    color: ['#18c29c', '#0ea5e9'],
  },
  {
    slug: 'pool',
    title: 'Pool for Beginners: Aim, Power & Strategy',
    category: 'How to Play',
    date: 'October 8, 2026',
    excerpt: 'From your very first shot to clearing the table — a step-by-step guide for pool newcomers.',
    glyph: '🎱',
    color: ['#ffb938', '#f43f5e'],
  },
];

export function Tutorials() {
  useEffect(() => {
    document.title = 'Tutorials — PlayGrid';
    window.scrollTo(0, 0);
  }, []);

  const [featured, ...rest] = TUTORIALS;

  return (
    <main className="page">
      <div className="info-banner">
        <h1 className="info-banner__title">Tutorials</h1>
        <p className="info-banner__sub">
          Welcome to PlayGrid Tutorials! Here you will find hints and tips about
          all of our games.
        </p>
      </div>

      <div className="tut-layout">
        <Link to={`/game/${featured.slug}`} className="tut-main">
          <div
            className="tut-main__img"
            style={{ background: `linear-gradient(135deg, ${featured.color[0]}, ${featured.color[1]})` }}
          >
            <span className="tut-main__glyph">{featured.glyph}</span>
          </div>
          <div className="tut-main__body">
            <time className="tut-date">{featured.date}</time>
            <h2 className="tut-main__title">{featured.title}</h2>
            <p className="tut-main__excerpt">{featured.excerpt}</p>
            <span className="tut-cat">{featured.category} · Tutorials</span>
          </div>
        </Link>

        <div className="tut-list">
          {rest.map((t) => (
            <Link to={`/game/${t.slug}`} key={t.slug} className="tut-item">
              <div
                className="tut-item__img"
                style={{ background: `linear-gradient(135deg, ${t.color[0]}, ${t.color[1]})` }}
              >
                <span className="tut-item__glyph">{t.glyph}</span>
              </div>
              <div className="tut-item__body">
                <time className="tut-date">{t.date}</time>
                <p className="tut-item__title">{t.title}</p>
                <span className="tut-cat">{t.category} · Tutorials</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

/* ─── FAQs ───────────────────────────────────────────────── */
const FAQ_ITEMS = [
  {
    q: 'Are PlayGrid games free to play?',
    a: 'Yes — every single game on PlayGrid is 100% free. No subscriptions, no in-app purchases, no hidden charges. Ever.',
  },
  {
    q: 'Do I need an account to play?',
    a: 'No account needed. Open PlayGrid, click any game thumbnail and you are playing within seconds.',
  },
  {
    q: 'Do I need to download or install anything?',
    a: 'Nothing at all. PlayGrid games run entirely in your web browser — no downloads, no plugins, no app store.',
  },
  {
    q: 'What devices can I play PlayGrid games on?',
    a: 'PlayGrid works on any device with a modern browser: desktop PCs, laptops, tablets, and smartphones — iOS and Android included.',
  },
  {
    q: "What should I do if a game won't load or keeps freezing?",
    a: 'Try refreshing the page first. If the problem persists, clear your browser cache or try a different browser. You can also reach our support team via the Contact page.',
  },
  {
    q: 'Is my game progress saved?',
    a: "Game progress is saved in your browser's local storage. It persists as long as you use the same browser on the same device and don't clear your browser data.",
  },
  {
    q: 'Can I play PlayGrid games on mobile?',
    a: 'Yes! Our games are built to work on mobile browsers. For the best experience on a phone, try landscape mode.',
  },
  {
    q: 'How do I report a bug or suggest a new game?',
    a: 'Head to our Contact page and send us a message. We read every report and suggestion.',
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button
        className="faq-item__header"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="faq-item__q">{q}</span>
        <svg
          className={'faq-item__chevron' + (open ? ' faq-item__chevron--open' : '')}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path d="M5 7.5L10 12.5L15 7.5" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && <p className="faq-item__body">{a}</p>}
    </div>
  );
}

export function FAQs() {
  useEffect(() => {
    document.title = 'FAQs — PlayGrid';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="page">
      <div className="info-banner">
        <h1 className="info-banner__title">FAQs</h1>
        <p className="info-banner__sub">
          Looking to find out more about our browser games? We have got you
          covered. Check out the questions and answers below.
        </p>
      </div>

      <h2 className="faq-section-title">PlayGrid Frequently Asked Questions</h2>

      <div className="faq-list" role="list">
        {FAQ_ITEMS.map((item) => (
          <FAQItem key={item.q} q={item.q} a={item.a} />
        ))}
      </div>

      <p className="faq-footer">
        Still have questions?{' '}
        <Link to="/contact" className="info-link">Contact us</Link> and we will
        get back to you.
      </p>
    </main>
  );
}

/* ─── Contact ────────────────────────────────────────────── */
export function Contact() {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.title = 'Contact — PlayGrid';
    window.scrollTo(0, 0);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <main className="page">
      <div className="ct-page">

        {/* ── Left: company details ── */}
        <div className="ct-left">
          <p className="info-label">Contact us</p>
          <h1 className="ct-title">Let's talk.</h1>
          <p className="ct-lead">
            Have a question, game idea, bug report, or want to partner with us?
            Drop a message and Kushagra will get back to you personally — usually
            within one business day.
          </p>

          <div className="ct-details">
            <div className="ct-detail">
              <span className="ct-detail__head">Email</span>
              <a href="mailto:kushagra@kareerllc.com" className="ct-detail__val ct-detail__val--link">
                kushagra@kareerllc.com
              </a>
            </div>

            <div className="ct-detail">
              <span className="ct-detail__head">Registered office</span>
              <address className="ct-detail__val">
                Michelle Rodriguez, Sole Member<br />
                30 N Gould St, Suite R<br />
                Sheridan, WY 82801<br />
                United States
              </address>
            </div>

            <div className="ct-detail">
              <span className="ct-detail__head">Response time</span>
              <span className="ct-detail__val">Within 1 business day</span>
            </div>

            <div className="ct-detail">
              <span className="ct-detail__head">Support hours</span>
              <span className="ct-detail__val">Mon – Fri, 10 am – 6 pm IST</span>
            </div>
          </div>

          <p className="ct-faq-note">
            Looking for a quick answer?{' '}
            <Link to="/faqs" className="info-link">Browse our FAQs</Link>
          </p>
        </div>

        {/* ── Right: contact form ── */}
        <div className="ct-right">
          {sent ? (
            <div className="ct-sent">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                <circle cx="24" cy="24" r="24" fill="#18c29c" opacity="0.15" />
                <path d="M14 24l7 7 13-14" stroke="#18c29c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h2>Message sent</h2>
              <p>Thanks — Kushagra will reply within one business day.</p>
              <button className="ct-reset" onClick={() => setSent(false)}>Send another</button>
            </div>
          ) : (
            <form className="ct-form" onSubmit={handleSubmit} noValidate>
              <div className="ct-field">
                <label className="ct-label" htmlFor="ct-name">Name</label>
                <input
                  className="ct-input"
                  id="ct-name"
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="ct-field">
                <label className="ct-label" htmlFor="ct-email">Email</label>
                <input
                  className="ct-input"
                  id="ct-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="ct-field">
                <label className="ct-label" htmlFor="ct-subject">Topic</label>
                <div className="ct-select-wrap">
                  <select className="ct-input ct-select" id="ct-subject" name="subject" required>
                    <option value="">Select a topic</option>
                    <option value="support">Game support</option>
                    <option value="feedback">Feedback / suggestion</option>
                    <option value="bug">Bug report</option>
                    <option value="business">Business / partnership</option>
                    <option value="other">Other</option>
                  </select>
                  <svg className="ct-select-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              <div className="ct-field">
                <label className="ct-label" htmlFor="ct-msg">Message</label>
                <textarea
                  className="ct-input ct-textarea"
                  id="ct-msg"
                  name="message"
                  rows="5"
                  placeholder="What's on your mind?"
                  required
                />
              </div>

              <button type="submit" className="ct-submit">
                Send message
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          )}
        </div>

      </div>
    </main>
  );
}

/* ─── Privacy ────────────────────────────────────────────── */
export function Privacy() {
  useEffect(() => {
    document.title = 'Privacy Policy — PlayGrid';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="page">
      <article className="infocard" style={{ marginTop: 24 }}>
        <h1>Privacy Policy</h1>
        <p style={{ color: 'var(--ink-soft)', fontSize: '0.9rem' }}>Last updated: 27 October 2026</p>

        <h2>What we collect</h2>
        <p>
          PlayGrid has no user accounts and does not ask for your name, email, or
          any personal details to play. Game progress and high scores are stored
          locally in your own browser and never sent to us.
        </p>

        <h2>Advertising and third parties</h2>
        <p>
          PlayGrid is free because it shows advertising. Ads are served by
          third-party partners (such as Google and our game-content partners),
          which may use cookies or similar identifiers to show relevant ads and
          measure performance. You can limit ad personalisation in your browser or
          device settings. Some games are provided by partner studios and load from
          their servers, subject to their own policies.
        </p>

        <h2>Technical data</h2>
        <p>
          Like most websites, our hosting provider keeps standard server logs (IP
          address, browser type, pages visited) for security and performance.
        </p>

        <h2>Children</h2>
        <p>
          PlayGrid is intended for general audiences. We do not knowingly collect
          personal information from children under 13.
        </p>

        <h2>Contact</h2>
        <p>
          Privacy questions:{' '}
          <a href="mailto:hello@playgridgames.com" style={{ color: 'var(--amber)' }}>
            hello@playgridgames.com
          </a>
        </p>
      </article>
    </main>
  );
}

/* ─── Terms ──────────────────────────────────────────────── */
export function Terms() {
  useEffect(() => {
    document.title = 'Terms of Use — PlayGrid';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="page">
      <article className="infocard" style={{ marginTop: 24 }}>
        <h1>Terms of Use</h1>
        <p>
          By using PlayGrid you agree to these terms. Games are provided
          &ldquo;as is&rdquo; for personal, non-commercial entertainment.
          Don&rsquo;t copy, re-host, or resell the games or site content; titles
          from partner studios remain their property. We may change or remove
          content at any time. Use of the site is at your own risk.
        </p>
        <p>
          Questions:{' '}
          <a href="mailto:hello@playgridgames.com" style={{ color: 'var(--amber)' }}>
            hello@playgridgames.com
          </a>
        </p>
      </article>
    </main>
  );
}
