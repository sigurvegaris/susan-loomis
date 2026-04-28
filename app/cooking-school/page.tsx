"use client";

import { useState } from "react";

export default function CookingSchoolPage() {
  const [menuOpen, setMenuOpen] = useState(false);

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
        .page-wrap {
          background: var(--dark);
          padding-top: 72px;
          min-height: 100vh;
        }

        /* ── HERO ── */
        .cs-hero {
          padding: 5rem 4rem 4rem;
          position: relative; overflow: hidden;
        }
        .cs-hero::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse at 75% 50%, rgba(245,200,66,0.06) 0%, transparent 55%);
          pointer-events: none;
        }
        .cs-hero-inner {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 5rem; align-items: center;
        }
        .cs-hero-eyebrow {
          font-size: 11px; font-weight: 700; letter-spacing: 0.25em;
          text-transform: uppercase; color: var(--amber); margin-bottom: 1rem;
          animation: fadeUp 0.6s ease 0.1s both;
        }
        .cs-hero h1 {
          font-size: clamp(3rem, 6vw, 5.5rem); font-weight: 800;
          text-transform: uppercase; color: var(--white); line-height: 1.0;
          letter-spacing: -0.01em; margin-bottom: 1.5rem;
          animation: fadeUp 0.6s ease 0.2s both;
        }
        .cs-hero h1 span { color: var(--amber); }
        .cs-hero-desc {
          font-size: 16px; color: rgba(255,255,255,0.6);
          line-height: 1.8; max-width: 460px;
          animation: fadeUp 0.6s ease 0.3s both;
        }
        .cs-hero-btns {
          display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 2.5rem;
          animation: fadeUp 0.6s ease 0.4s both;
        }
        .btn-primary {
          display: inline-flex; align-items: center;
          background: var(--amber); color: var(--dark);
          font-size: 12px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; padding: 13px 28px; border-radius: var(--radius-btn);
          transition: background var(--transition), transform var(--transition);
        }
        .btn-primary:hover { background: var(--amber-dark); transform: translateY(-2px); }
        .btn-ghost-hero {
          display: inline-flex; align-items: center;
          border: 2px solid rgba(255,255,255,0.25); color: var(--white);
          font-size: 12px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; padding: 13px 28px; border-radius: var(--radius-btn);
          transition: border-color var(--transition), background var(--transition), transform var(--transition);
        }
        .btn-ghost-hero:hover { border-color: var(--white); background: rgba(255,255,255,0.07); transform: translateY(-2px); }

        /* hero image */
        .cs-hero-img {
          border-radius: var(--radius-card); overflow: hidden;
          aspect-ratio: 3/4; background: #1a2a1a;
          animation: fadeUp 0.7s ease 0.25s both;
        }
        .cs-hero-img img {
          width: 100%; height: 100%; object-fit: cover;
          object-position: center 15%;
          transition: transform 7s ease;
        }
        .cs-hero:hover .cs-hero-img img { transform: scale(1.04); }

        /* ── STATS ROW ── */
        .stats-row {
          padding: 2.5rem 4rem 4rem;
          display: flex; gap: 4rem; flex-wrap: wrap;
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .stat-num {
          display: block; font-size: clamp(2.5rem, 4vw, 3.5rem);
          font-weight: 800; color: var(--amber); line-height: 1;
          animation: fadeUp 0.6s ease 0.5s both;
        }
        .stat-label {
          display: block; font-size: 10px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(255,255,255,0.3); margin-top: 6px;
          animation: fadeUp 0.6s ease 0.55s both;
        }

        /* ── FOOTER ── */
        footer {
          background: var(--dark); padding: 4rem 4rem 0; color: var(--white);
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .footer-inner {
          display: grid; grid-template-columns: 1.8fr 1fr;
          gap: 4rem; padding-bottom: 3.5rem;
        }
        .footer-brand-name {
          font-size: 1.1rem; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.06em; color: var(--white); display: block; margin-bottom: 0.75rem;
        }
        .footer-address { font-size: 13px; color: rgba(255,255,255,0.38); line-height: 1.8; }
        .footer-col h4 {
          font-size: 11px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: var(--amber); margin-bottom: 1.25rem;
        }
        .footer-col ul { list-style: none; }
        .footer-col li { margin-bottom: 0.6rem; }
        .footer-col a {
          font-size: 14px; font-weight: 600; text-transform: uppercase;
          letter-spacing: 0.06em; color: rgba(255,255,255,0.5); transition: color var(--transition);
        }
        .footer-col a:hover { color: var(--amber); }
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.07); padding: 1.5rem 0;
          display: flex; align-items: center;
          justify-content: space-between; flex-wrap: wrap; gap: 1rem;
        }
        .footer-legal { display: flex; gap: 2rem; flex-wrap: wrap; }
        .footer-legal a, .footer-copy { font-size: 12px; color: rgba(255,255,255,0.22); transition: color var(--transition); }
        .footer-legal a:hover { color: var(--white); }
                .footer-social { display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; }
        .footer-social-link {
          display: flex; align-items: center; justify-content: center;
          width: 38px; height: 38px;
          color: rgba(255,255,255,0.6);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 2px;
          transition: color 0.22s ease, border-color 0.22s ease, background 0.22s ease;
        }
        .footer-social-link:hover { color: #fff; border-color: #fff; background: rgba(255,255,255,0.08); }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .nav { padding: 0 2rem; }
          .cs-hero-inner { grid-template-columns: 1fr; gap: 2.5rem; }
          .cs-hero-img { aspect-ratio: 4/3; }
          .footer-inner { grid-template-columns: 1fr 1fr; gap: 2.5rem; }
        }
        @media (max-width: 768px) {
          .nav { padding: 0 1.25rem; }
          .nav-links, .nav-cta { display: none; }
          .hamburger { display: flex; }
          .nav-logo-sub { display: none; }
          .cs-hero { padding: 3rem 1.25rem 3rem; }
          .cs-hero h1 { font-size: clamp(2.4rem, 9vw, 4rem); }
          .cs-hero-desc { font-size: 15px; }
          .cs-hero-btns { flex-direction: column; }
          .btn-primary, .btn-ghost-hero { width: 100%; justify-content: center; }
          .cs-hero-img { aspect-ratio: 4/3; }
          footer { padding: 3rem 1.25rem 0; }
          .footer-inner { grid-template-columns: 1fr; gap: 2rem; }
          .footer-bottom { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
        }
        @media (max-width: 480px) {
          .cs-hero h1 { font-size: 2rem; }
          .cs-hero-img { aspect-ratio: 1/1; }
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
          <li><a href="/cooking-school" className="active">Cooking School</a></li>
          <li><a href="/write-your-cookbook">Write Your Cookbook</a></li>
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
        <section className="cs-hero">
          <div className="cs-hero-inner">
            <div>
              <p className="cs-hero-eyebrow">Paris, France</p>
              <h1>On Rue <span>Tatin</span></h1>
              <p className="cs-hero-desc">
                Small classes in a charming Parisian apartment. Thirty years
                of living and cooking in France, distilled into one
                unforgettable experience with Susan Herrmann Loomis. Every
                guest puts on their apron, picks up their whisk or their
                knife, and has Susan&apos;s full attention. You will leave
                class knowing how to taste, feel, sense — a confident cook.
              </p>
              <div className="cs-hero-btns">
                <a href="https://onruetatin.com" className="btn-primary" target="_blank" rel="noopener noreferrer">
                  Book a class →
                </a>
                <a href="https://onruetatin.com" className="btn-ghost-hero" target="_blank" rel="noopener noreferrer">
                  Visit onruetatin.com
                </a>
              </div>
            </div>
            {/* PLACEHOLDER: replace with a real photo of the kitchen or convent */}
            <div className="cs-hero-img">
              <img
                src="/images/susan-teaching.jpg"
                alt="On Rue Tatin cooking school"
              />
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer>
          <div className="footer-inner">
            <div>
              <span className="footer-brand-name">Susan Herrmann Loomis</span>
              <p className="footer-address">
                On Rue Tatin Cooking School<br />
                Paris, France<br />
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
            </div>
          <div className="footer-bottom">
            <div className="footer-legal">
              <span className="footer-copy">© 2025 Susan Herrmann Loomis</span>
              <a href="https://onruetatin.com" target="_blank" rel="noopener noreferrer">onruetatin.com</a>
            </div>
                      <div className="footer-social">
            <a href="mailto:susan@onruetatin.com" className="footer-social-link" title="Email">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </a>
            <a href="https://www.instagram.com/susanherrmannloomis/" target="_blank" rel="noopener noreferrer" className="footer-social-link" title="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
            </a>
            <a href="https://www.facebook.com/onruetatin/" target="_blank" rel="noopener noreferrer" className="footer-social-link" title="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://substack.com/@susanherrmannloomis" target="_blank" rel="noopener noreferrer" className="footer-social-link" title="Substack">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/></svg>
            </a>
          </div>
          </div>
        </footer>

      </div>
    </>
  );
}