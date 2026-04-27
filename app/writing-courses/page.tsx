"use client";

import { useState } from "react";

const MODULES = [
  {
    num: "01",
    title: "Finding Your Culinary Voice",
    desc: "What makes a cookbook yours? This module explores how to identify and develop your unique perspective — the sensibility, the stories, and the point of view that will make readers want to spend time in your kitchen.",
  },
  {
    num: "02",
    title: "Structuring Your Cookbook",
    desc: "How do you organise 80 recipes into something a reader can live with? We cover chapter architecture, the logic of flow, how to balance technique with narrative, and how to make your book feel like a whole.",
  },
  {
    num: "03",
    title: "Writing Headnotes & Recipes",
    desc: "The headnote is where your voice lives — the story, the memory, the context that makes a recipe worth cooking. This module covers how to write them well, and how to write recipes that are accurate, clear, and a pleasure to follow.",
  },
  {
    num: "04",
    title: "The Editorial Process",
    desc: "What happens after you write the first draft? We walk through the editorial process — working with editors, responding to feedback, the revision cycle, and how to protect your voice while making the book better.",
  },
  {
    num: "05",
    title: "Publishing & Bringing It to Market",
    desc: "Proposals, agents, publishers, self-publishing — the landscape explained by someone who has navigated it fourteen times. We cover how to position your book, how to write a proposal, and how to get it in front of the right people.",
  },
];

export default function WritingCoursesPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <>
      <style>{`
        /* ── NAV ── */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          height: 72px; background: #f7f3ed;
          display: flex; align-items: center;
          justify-content: space-between; padding: 0 3rem;
          border-bottom: 1px solid rgba(26,23,20,0.1);
        }
        .nav-logo { display: flex; align-items: center; gap: 12px; }
        .nav-logo-mark { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; overflow: hidden; background: transparent; }
        .nav-logo-mark img { width: 100%; height: 100%; object-fit: contain; }
        .nav-logo-text { display: flex; flex-direction: column; }
        .nav-logo-name { font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 600; font-size: 17px; color: #1a1714; letter-spacing: 0.01em; line-height: 1.1; }
        .nav-logo-sub { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: #6e6660; line-height: 1; margin-top: 2px; }
        .nav-links { display: flex; list-style: none; gap: 2.25rem; align-items: center; }
        .nav-links a { font-size: 12px; letter-spacing: 0.09em; text-transform: uppercase; font-weight: 500; color: #6e6660; transition: color 0.22s ease; }
        .nav-links a:hover, .nav-links a.active { color: #a8382a; }
        .nav-cta { background: #a8382a; color: #fff; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 600; padding: 10px 22px; border-radius: 2px; transition: background 0.22s ease; flex-shrink: 0; }
        .nav-cta:hover { background: #8a2d21; }
        .hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; }
        .hamburger span { display: block; width: 22px; height: 2px; background: #1a1714; transition: transform 0.22s ease, opacity 0.22s ease; }
        .mobile-drawer { display: none; position: fixed; top: 72px; left: 0; right: 0; z-index: 199; background: #f7f3ed; flex-direction: column; border-top: 1px solid rgba(26,23,20,0.1); padding: 1rem 2rem 2rem; }
        .mobile-drawer.open { display: flex; }
        .mobile-drawer a { font-size: 14px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: #1a1714; padding: 1rem 0; border-bottom: 1px solid rgba(26,23,20,0.08); transition: color 0.22s ease; }
        .mobile-drawer a:hover { color: #a8382a; }

        /* ── PAGE ── */
        .page-wrap { padding-top: 72px; background: var(--cream); }

        /* ── HERO ── */
        .wc-hero {
          background: var(--dark); padding: 5rem 4rem;
          position: relative; overflow: hidden;
        }
        .wc-hero::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse at 70% 50%, rgba(245,200,66,0.06) 0%, transparent 55%);
          pointer-events: none;
        }
        .wc-hero-eyebrow {
          font-size: 11px; font-weight: 700; letter-spacing: 0.25em;
          text-transform: uppercase; color: var(--amber); margin-bottom: 1rem;
          animation: fadeUp 0.6s ease 0.1s both;
        }
        .wc-hero h1 {
          font-size: clamp(3rem, 6vw, 5.5rem); font-weight: 800;
          text-transform: uppercase; color: var(--white); line-height: 1.0;
          letter-spacing: -0.01em; margin-bottom: 1.5rem;
          animation: fadeUp 0.6s ease 0.2s both;
        }
        .wc-hero h1 span { color: var(--amber); }
        .wc-hero-row {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 5rem; align-items: start; margin-top: 0;
          animation: fadeUp 0.6s ease 0.3s both;
        }
        .wc-hero-desc {
          font-size: 17px; color: rgba(255,255,255,0.6); line-height: 1.8;
        }

        /* in development badge */
        .dev-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(245,200,66,0.12); border: 1px solid rgba(245,200,66,0.3);
          color: var(--amber); font-size: 11px; font-weight: 700;
          letter-spacing: 0.15em; text-transform: uppercase;
          padding: 8px 16px; border-radius: var(--radius-btn);
          margin-bottom: 1.5rem; animation: fadeUp 0.5s ease 0s both;
        }
        .dev-badge::before {
          content: ''; display: block; width: 7px; height: 7px;
          background: var(--amber); border-radius: 50%;
          animation: pulse 2s ease infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }

        /* consulting card */
        .consulting-card {
          background: rgba(245,200,66,0.08);
          border: 1px solid rgba(245,200,66,0.2);
          border-radius: var(--radius-card);
          padding: 2rem;
        }
        .consulting-card h3 {
          font-size: 14px; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.08em; color: var(--amber); margin-bottom: 0.75rem;
        }
        .consulting-card p {
          font-size: 14px; color: rgba(255,255,255,0.55); line-height: 1.7; margin-bottom: 1.25rem;
        }
        .btn-consult {
          display: inline-flex; align-items: center;
          background: var(--amber); color: var(--dark);
          font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; padding: 10px 22px; border-radius: var(--radius-btn);
          transition: background var(--transition), transform var(--transition);
        }
        .btn-consult:hover { background: var(--amber-dark); transform: translateY(-2px); }

        /* ── MODULES ── */
        .modules-section { background: var(--cream); padding: 5rem 4rem; }
        .modules-header {
          display: flex; align-items: flex-end;
          justify-content: space-between; flex-wrap: wrap; gap: 1rem;
          margin-bottom: 3rem; padding-bottom: 2rem;
          border-bottom: 1px solid rgba(13,31,26,0.1);
        }
        .modules-header h2 {
          font-size: clamp(1.8rem, 3vw, 2.8rem); font-weight: 800;
          text-transform: uppercase; color: var(--text-dark); line-height: 1;
        }
        .modules-header h2 span { color: var(--amber); }
        .modules-count {
          font-size: 13px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: rgba(13,31,26,0.35);
        }

        .module-row {
          display: grid; grid-template-columns: 64px 1fr;
          gap: 2rem; padding: 2rem 0;
          border-bottom: 1px solid rgba(13,31,26,0.08);
          align-items: start;
          transition: background var(--transition);
        }
        .module-row:last-child { border-bottom: none; }
        .module-row:hover { background: rgba(13,31,26,0.02); margin: 0 -1rem; padding-left: 1rem; padding-right: 1rem; border-radius: var(--radius-sm,8px); }
        .module-num {
          font-size: 2.2rem; font-weight: 800;
          color: rgba(13,31,26,0.12); line-height: 1; padding-top: 4px;
        }
        .module-body { display: flex; flex-direction: column; gap: 6px; }
        .module-title {
          font-size: 1.2rem; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.03em; color: var(--text-dark); line-height: 1.2;
        }
        .module-desc {
          font-size: 15px; color: rgba(13,31,26,0.6); line-height: 1.75; font-weight: 400;
        }

        /* ── WAITLIST SECTION ── */
        .waitlist-section {
          background: var(--dark); padding: 5rem 4rem; text-align: center;
        }
        .waitlist-eyebrow {
          font-size: 11px; font-weight: 700; letter-spacing: 0.25em;
          text-transform: uppercase; color: var(--amber); margin-bottom: 1rem;
        }
        .waitlist-section h2 {
          font-size: clamp(2rem, 3.5vw, 3rem); font-weight: 800;
          text-transform: uppercase; color: var(--white); line-height: 1.1;
          margin-bottom: 1rem;
        }
        .waitlist-section h2 span { color: var(--amber); }
        .waitlist-section > p {
          font-size: 16px; color: rgba(255,255,255,0.5); line-height: 1.75;
          max-width: 520px; margin: 0 auto 2.5rem;
        }
        .waitlist-form {
          display: flex; gap: 0.75rem; max-width: 460px;
          margin: 0 auto; flex-wrap: wrap; justify-content: center;
        }
        .waitlist-input {
          flex: 1; min-width: 220px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.15); border-radius: var(--radius-btn);
          color: var(--white); font-size: 14px; padding: 13px 18px;
          outline: none; transition: border-color var(--transition); font-family: var(--sans);
        }
        .waitlist-input::placeholder { color: rgba(255,255,255,0.25); }
        .waitlist-input:focus { border-color: var(--amber); }
        .btn-waitlist {
          background: var(--amber); color: var(--dark); border: none;
          font-size: 12px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; padding: 13px 28px; border-radius: var(--radius-btn);
          cursor: pointer; transition: background var(--transition), transform var(--transition);
          font-family: var(--sans);
        }
        .btn-waitlist:hover { background: var(--amber-dark); transform: translateY(-2px); }
        .waitlist-success {
          display: inline-flex; align-items: center; gap: 10px;
          background: rgba(245,200,66,0.1); border: 1px solid rgba(245,200,66,0.25);
          color: var(--amber); font-size: 14px; font-weight: 600;
          padding: 14px 28px; border-radius: var(--radius-btn);
        }
        .waitlist-note {
          font-size: 12px; color: rgba(255,255,255,0.22); margin-top: 1rem;
        }

        /* ── OUTLINED INFO CARD ── */
        .info-section { background: var(--cream); padding: 5rem 4rem; }
        .info-card {
          border: 2px solid rgba(13,31,26,0.18); border-radius: var(--radius-card);
          padding: 2rem 2.5rem; display: flex; align-items: center;
          justify-content: space-between; gap: 2rem; flex-wrap: wrap;
        }
        .info-card-left h3 {
          font-size: 1rem; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.08em; color: var(--text-dark); margin-bottom: 0.4rem;
        }
        .info-card-left p { font-size: 14px; color: rgba(13,31,26,0.6); line-height: 1.5; }
        .btn-outline-card {
          display: inline-flex; align-items: center; white-space: nowrap;
          font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 11px 24px; border-radius: var(--radius-btn);
          border: 2px solid var(--text-dark); color: var(--text-dark); background: transparent;
          transition: background var(--transition), color var(--transition);
        }
        .btn-outline-card:hover { background: var(--text-dark); color: var(--amber); }

        /* ── FOOTER ── */
        footer { background: var(--dark); padding: 4rem 4rem 0; color: var(--white); border-top: 1px solid rgba(255,255,255,0.06); }
        .footer-inner { display: grid; grid-template-columns: 1.8fr 1fr 1.4fr; gap: 4rem; padding-bottom: 3.5rem; }
        .footer-brand-name { font-size: 1.1rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: var(--white); display: block; margin-bottom: 0.75rem; }
        .footer-address { font-size: 13px; color: rgba(255,255,255,0.38); line-height: 1.8; }
        .footer-col h4 { font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--amber); margin-bottom: 1.25rem; }
        .footer-col ul { list-style: none; }
        .footer-col li { margin-bottom: 0.6rem; }
        .footer-col a { font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: rgba(255,255,255,0.5); transition: color var(--transition); }
        .footer-col a:hover { color: var(--amber); }
        .footer-newsletter { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-card); padding: 2rem; }
        .footer-newsletter h3 { font-size: 1.2rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; color: var(--white); margin-bottom: 0.4rem; }
        .footer-newsletter p { font-size: 13px; color: rgba(255,255,255,0.38); margin-bottom: 1.25rem; }
        .newsletter-input { width: 100%; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: var(--radius-btn); color: var(--white); font-size: 13px; padding: 12px 16px; outline: none; margin-bottom: 0.75rem; transition: border-color var(--transition); font-family: var(--sans); }
        .newsletter-input::placeholder { color: rgba(255,255,255,0.2); }
        .newsletter-input:focus { border-color: var(--amber); }
        .btn-subscribe { width: 100%; background: var(--amber); color: var(--dark); border: none; cursor: pointer; font-size: 13px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 13px; border-radius: var(--radius-btn); transition: background var(--transition); font-family: var(--sans); }
        .btn-subscribe:hover { background: var(--amber-dark); }
        .footer-bottom { border-top: 1px solid rgba(255,255,255,0.07); padding: 1.5rem 0; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
        .footer-legal { display: flex; gap: 2rem; flex-wrap: wrap; }
        .footer-legal a, .footer-copy { font-size: 12px; color: rgba(255,255,255,0.22); transition: color var(--transition); }
        .footer-legal a:hover { color: var(--white); }
        .footer-social { display: flex; gap: 0.75rem; }
        .footer-social a { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.28); border: 1px solid rgba(255,255,255,0.1); padding: 6px 14px; border-radius: var(--radius-btn); transition: color var(--transition), border-color var(--transition); }
        .footer-social a:hover { color: var(--amber); border-color: var(--amber); }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .nav { padding: 0 2rem; }
          .wc-hero-row { grid-template-columns: 1fr; gap: 2.5rem; }
          .footer-inner { grid-template-columns: 1fr 1fr; gap: 2.5rem; }
        }
        @media (max-width: 768px) {
          .nav { padding: 0 1.25rem; }
          .nav-links, .nav-cta { display: none; }
          .hamburger { display: flex; }
          .nav-logo-sub { display: none; }
          .wc-hero { padding: 3rem 1.25rem 3.5rem; }
          .wc-hero h1 { font-size: clamp(2.2rem, 8vw, 3.5rem); }
          .wc-hero-desc { font-size: 15px; }
          .consulting-card { padding: 1.5rem; }
          .modules-section { padding: 3.5rem 1.25rem; }
          .modules-header { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
          .module-row { grid-template-columns: 40px 1fr; gap: 1rem; }
          .module-title { font-size: 1rem; }
          .waitlist-section { padding: 3.5rem 1.25rem; }
          .waitlist-form { flex-direction: column; }
          .waitlist-input { min-width: unset; width: 100%; }
          .btn-waitlist { width: 100%; }
          .info-section { padding: 3.5rem 1.25rem; }
          .info-card { flex-direction: column; align-items: flex-start; }
          footer { padding: 3rem 1.25rem 0; }
          .footer-inner { grid-template-columns: 1fr; gap: 2rem; }
          .footer-bottom { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
        }
        @media (max-width: 480px) {
          .wc-hero h1 { font-size: 2rem; }
          .module-num { font-size: 1.6rem; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav className="nav">
        <a href="/" className="nav-logo">
          <div className="nav-logo-mark"><img src="/images/onruetatinlogo.png" alt="On Rue Tatin" /></div>
          <div className="nav-logo-text">
            <span className="nav-logo-name">Susan Herrmann Loomis</span>
            <span className="nav-logo-sub">Author · Chef · Cooking School</span>
          </div>
        </a>
        <ul className="nav-links">
          <li><a href="/books">Books</a></li>
          <li><a href="/cooking-school">Cooking School</a></li>
          <li><a href="/write-your-cookbook" className="active">Write Your Cookbook</a></li>
          <li><a href="/ghostwriting">Ghostwriting</a></li>
          <li><a href="/about">About</a></li>
        </ul>
        <a href="/contact" className="nav-cta">Get in Touch</a>
        <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          <span style={{ transform: menuOpen ? "translateY(7px) rotate(45deg)" : "" }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "" }} />
        </button>
      </nav>

      <div className={`mobile-drawer${menuOpen ? " open" : ""}`}>
        {[["Books","/books"],["Cooking School","/cooking-school"],["Write Your Cookbook","/write-your-cookbook"],["Ghostwriting","/ghostwriting"],["About","/about"],["Get in Touch","/contact"]].map(([l,h]) => (
          <a key={h} href={h} onClick={() => setMenuOpen(false)}>{l}</a>
        ))}
      </div>

      <div className="page-wrap">

        {/* ── HERO ── */}
        <section className="wc-hero">
          <div className="dev-badge">In Development</div>
          <h1>Cookbook <span>Writing</span><br />Course</h1>
          <div className="wc-hero-row">
            <div>
              <p className="wc-hero-desc">
                A 5-module online programme on writing and publishing cookbooks
                — from finding your voice to landing a deal. Taught by Susan
                Herrmann Loomis, a James Beard–nominated author with fourteen
                published books and thirty years of experience in food writing,
                recipe development, and the publishing industry.
              </p>
            </div>
            <div className="consulting-card">
              <h3>One-on-One Consulting Available Now</h3>
              <p>
                While the full programme is in development, Susan is available
                for individual consulting sessions — manuscript feedback, proposal
                review, voice development, and publishing strategy. Contact Susan
                directly to discuss.
              </p>
              <a href="/contact" className="btn-consult">Enquire about consulting →</a>
            </div>
          </div>
        </section>

        {/* ── MODULES ── */}
        <section className="modules-section">
          <div className="modules-header">
            <h2>The <span>Modules</span></h2>
            <span className="modules-count">5 modules</span>
          </div>

          {MODULES.map((m) => (
            <div className="module-row" key={m.num}>
              <span className="module-num">{m.num}</span>
              <div className="module-body">
                <h3 className="module-title">{m.title}</h3>
                <p className="module-desc">{m.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* ── WAITLIST ── */}
        <section className="waitlist-section">
          <p className="waitlist-eyebrow">Be the first to know</p>
          <h2>Join the <span>Waitlist</span></h2>
          <p>
            The programme is currently in development. Leave your email and
            Susan will reach out as soon as enrolment opens — you&apos;ll be
            first in line.
          </p>

          {submitted ? (
            <div className="waitlist-success">
              ✓ &nbsp;You&apos;re on the list — Susan will be in touch soon.
            </div>
          ) : (
            <form className="waitlist-form" onSubmit={handleSubmit}>
              <input
                className="waitlist-input"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn-waitlist">Join waitlist</button>
            </form>
          )}

          <p className="waitlist-note">No spam. One email when enrolment opens.</p>
        </section>

        {/* ── CONSULTING CARD ── */}
        <section className="info-section">
          <div className="info-card">
            <div className="info-card-left">
              <h3>One-on-One Consulting</h3>
              <p>
                Available now while the programme is in development. Manuscript
                feedback, proposal review, voice development, and publishing
                strategy — reach Susan directly.
              </p>
            </div>
            <a href="/contact" className="btn-outline-card">Get in touch</a>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer>
          <div className="footer-inner">
            <div>
              <span className="footer-brand-name">Susan Herrmann Loomis</span>
              <p className="footer-address">
                Louviers, Normandy, France &amp; Paris, France<br />
                susan@onruetatin.com
              </p>
            </div>
            <div className="footer-col">
              <h4>Pages</h4>
              <ul>
                {[["Books","/books"],["Cooking School","/cooking-school"],["Write Your Cookbook","/write-your-cookbook"],["Ghostwriting","/ghostwriting"],["About","/about"],["Contact","/contact"]].map(([l,h]) => (
                  <li key={h}><a href={h}>{l}</a></li>
                ))}
              </ul>
            </div>
            <div className="footer-newsletter">
              <h3>Stay Informed</h3>
              <p>News, recipes, and class updates from Normandy.</p>
              <input className="newsletter-input" type="email" placeholder="example@email.com" />
              <button className="btn-subscribe">Subscribe</button>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-legal">
              <span className="footer-copy">© 2025 Susan Herrmann Loomis</span>
              <a href="/privacy">Privacy Policy</a>
              <a href="https://onruetatin.com" target="_blank" rel="noopener noreferrer">onruetatin.com</a>
            </div>
            <div className="footer-social">
              <a href="#">Instagram</a>
              <a href="#">Facebook</a>
              <a href="#">Amazon</a>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}