"use client";

import { useState } from "react";

export default function WriteYourCookbookPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Jost:wght@300;400;500;600;700&display=swap');

        /* ── NAV ── */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          height: 72px; background: #f7f3ed;
          display: flex; align-items: center;
          justify-content: space-between; padding: 0 3rem;
          border-bottom: 1px solid rgba(26,23,20,0.1);
        }
        .nav-logo { display: flex; align-items: center; gap: 12px; }
        .nav-logo-mark { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; overflow: hidden; }
        .nav-logo-mark img { width: 100%; height: 100%; object-fit: contain; }
        .nav-logo-text { display: flex; flex-direction: column; }
        .nav-logo-name { font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 700; font-size: 19px; color: #1a1714; letter-spacing: 0.01em; line-height: 1.1; }
        .nav-logo-sub { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: #6e6660; line-height: 1; margin-top: 2px; }
        .nav-links { display: flex; list-style: none; gap: 2.25rem; align-items: center; }
        .nav-links a { font-size: 12px; letter-spacing: 0.09em; text-transform: uppercase; font-weight: 600; color: #6e6660; transition: color 0.22s ease; }
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
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Jost', sans-serif; }
        a { text-decoration: none; color: inherit; }
        .page-wrap { padding-top: 72px; background: #f7f3ed; }

        /* ── HERO ── */
        .hero {
          background: #f7f3ed;
          padding: 5rem 4rem 4rem;
          max-width: 900px;
          margin: 0 auto;
        }
        .hero-eyebrow { font-size: 11px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: #6e6660; margin-bottom: 1rem; }
        .hero h1 {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2.8rem, 5vw, 4.5rem);
          font-weight: 700; font-style: italic;
          color: #a8382a; line-height: 1.15; margin-bottom: 1.75rem;
        }
        .hero p { font-size: 17px; color: #6e6660; line-height: 1.85; margin-bottom: 1rem; max-width: 680px; }
        .hero-divider { width: 48px; height: 2px; background: #c8a96e; margin: 2.5rem 0; }

        /* ── CONTENT ── */
        .content-section { background: #f7f3ed; padding: 0 4rem 5rem; max-width: 900px; margin: 0 auto; }
        .content-section h2 {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 700; font-style: italic;
          color: #1a1714; margin-bottom: 1.25rem; line-height: 1.3;
        }
        .content-section p { font-size: 16px; color: #6e6660; line-height: 1.85; margin-bottom: 1rem; }

        /* ── HOW IT WORKS ── */
        .how-section { background: #ede8df; padding: 5rem 4rem; }
        .how-inner { max-width: 900px; margin: 0 auto; }
        .how-eyebrow { font-size: 11px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: #6e6660; margin-bottom: 0.75rem; }
        .how-inner h2 {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 700; font-style: italic;
          color: #1a1714; margin-bottom: 2.5rem;
        }
        .steps { display: flex; flex-direction: column; gap: 0; }
        .step {
          display: grid; grid-template-columns: 48px 1fr;
          gap: 1.5rem; align-items: start;
          padding: 1.75rem 0;
          border-bottom: 1px solid rgba(26,23,20,0.1);
        }
        .step:last-child { border-bottom: none; }
        .step-num {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 2rem; font-weight: 700;
          color: #c8a96e; line-height: 1;
        }
        .step-content h3 { font-size: 15px; font-weight: 700; color: #1a1714; margin-bottom: 0.4rem; letter-spacing: 0.03em; }
        .step-content p, .step-content ul { font-size: 14px; color: #6e6660; line-height: 1.8; }
        .step-content ul { list-style: none; padding: 0; }
        .step-content li { padding-left: 1rem; position: relative; }
        .step-content li::before { content: '—'; position: absolute; left: 0; color: #c8a96e; }

        /* ── SELF PUB ── */
        .selfpub-section { background: #f7f3ed; padding: 5rem 4rem; }
        .selfpub-inner { max-width: 900px; margin: 0 auto; }
        .selfpub-inner h2 {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 700; font-style: italic;
          color: #1a1714; margin-bottom: 1.5rem;
        }
        .selfpub-inner p { font-size: 16px; color: #6e6660; line-height: 1.85; margin-bottom: 1rem; }
        .selfpub-list { list-style: none; padding: 0; margin-top: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; }
        .selfpub-list li {
          display: flex; align-items: flex-start; gap: 1rem;
          font-size: 15px; color: #6e6660; line-height: 1.75;
          padding: 1rem 1.25rem;
          background: #ede8df;
          border-left: 3px solid #c8a96e;
        }

        /* ── CTA ── */
        .cta-section { background: #2e7175; padding: 5rem 4rem; }
        .cta-inner { max-width: 700px; margin: 0 auto; text-align: center; }
        .cta-inner h2 {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700; font-style: italic;
          color: #fff; margin-bottom: 1rem;
        }
        .cta-inner p { font-size: 16px; color: rgba(255,255,255,0.75); line-height: 1.8; margin-bottom: 2rem; }
        .cta-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
        .btn-cta-primary { background: #c8a96e; color: #1a1714; font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; padding: 14px 32px; border-radius: 2px; transition: background 0.22s ease; }
        .btn-cta-primary:hover { background: #b8944e; }
        .btn-cta-secondary { background: transparent; color: #fff; font-size: 12px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; padding: 14px 32px; border-radius: 2px; border: 1px solid rgba(255,255,255,0.4); transition: border-color 0.22s ease, background 0.22s ease; }
        .btn-cta-secondary:hover { border-color: #fff; background: rgba(255,255,255,0.08); }

        /* ── FOOTER ── */
        footer { background: #2e7175; padding: 4rem 4rem 0; color: #fff; border-top: 2px solid #c8a96e; }
        .footer-inner { display: grid; grid-template-columns: 1.5fr 1fr; gap: 4rem; padding-bottom: 3.5rem; }
        .footer-brand-name { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.1rem; font-style: italic; font-weight: 700; color: #fff; display: block; margin-bottom: 0.75rem; }
        .footer-address { font-size: 13px; color: rgba(255,255,255,0.6); line-height: 1.8; }
        .footer-col h4 { font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #c8a96e; margin-bottom: 1.25rem; }
        .footer-col ul { list-style: none; }
        .footer-col li { margin-bottom: 0.6rem; }
        .footer-col a { font-size: 13px; color: rgba(255,255,255,0.6); transition: color 0.22s ease; }
        .footer-col a:hover { color: #fff; }
        .footer-bottom { border-top: 1px solid rgba(255,255,255,0.15); padding: 1.5rem 0; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
        .footer-legal { display: flex; gap: 2rem; flex-wrap: wrap; }
        .footer-legal a, .footer-copy { font-size: 12px; color: rgba(255,255,255,0.4); transition: color 0.22s ease; }
        .footer-legal a:hover { color: #fff; }
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
          .hero, .content-section, .selfpub-inner { padding-left: 2rem; padding-right: 2rem; }
          .how-section, .cta-section { padding-left: 2rem; padding-right: 2rem; }
          .footer-inner { grid-template-columns: 1fr 1fr; gap: 2.5rem; }
        }
        @media (max-width: 768px) {
          .nav { padding: 0 1.25rem; }
          .nav-links, .nav-cta { display: none; }
          .hamburger { display: flex; }
          .nav-logo-sub { display: none; }
          .hero, .content-section, .selfpub-inner { padding-left: 1.5rem; padding-right: 1.5rem; }
          .hero { padding-top: 3rem; }
          .how-section, .selfpub-section, .cta-section { padding: 3.5rem 1.5rem; }
          footer { padding: 3rem 1.5rem 0; }
          .footer-inner { grid-template-columns: 1fr; gap: 2rem; }
          .footer-bottom { flex-direction: column; align-items: flex-start; }
          .cta-btns { flex-direction: column; }
          .btn-cta-primary, .btn-cta-secondary { text-align: center; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav className="nav">
        <a href="/" className="nav-logo">
          <div className="nav-logo-mark">
            <img src="/images/onruetatinlogo.png" alt="On Rue Tatin" />
          </div>
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
        {[["Books","/books"],["Cooking School","/cooking-school"],["Write Your Cookbook","/write-your-cookbook"],["Ghostwriting","/ghostwriting"],["About","/about"],["Get in Touch","/contact"]].map(([label, href]) => (
          <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
      </div>

      <div className="page-wrap">

        {/* ── HERO ── */}
        <section className="hero">
          <p className="hero-eyebrow">Memory · Legacy · Culture</p>
          <h1>Write Your<br />Family Cookbook</h1>
          <p>
            I&apos;ve written fifteen cookbooks, with recipes gathered from home and farm cooks,
            chefs, friends, family. Each book represents a time and place in history — and as
            people make the recipes, they live the story of each person who made it before them.
          </p>
          <p>
            Now, I want to help you do what I&apos;ve done: assemble your cookbook, using recipes
            you have gathered that represent your personal heritage and culture.
          </p>
          <div className="hero-divider" />
          <p>
            A family cookbook is a conversation over generations. It records history. It holds
            memory, habit, and identity. It speaks of where you come from and what has been
            carried forward.
          </p>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="how-section">
          <div className="how-inner">
            <p className="how-eyebrow">The process</p>
            <h2>Here is how it works</h2>
            <div className="steps">

              <div className="step">
                <span className="step-num">1</span>
                <div className="step-content">
                  <h3>We establish a strategy</h3>
                  <ul>
                    <li>Who is the book for?</li>
                    <li>How many recipes?</li>
                    <li>Photos or other art?</li>
                    <li>How many copies?</li>
                  </ul>
                </div>
              </div>

              <div className="step">
                <span className="step-num">2</span>
                <div className="step-content">
                  <h3>We come up with a specific outline</h3>
                  <p>A structure that reflects your family, your culture, your history.</p>
                </div>
              </div>

              <div className="step">
                <span className="step-num">3</span>
                <div className="step-content">
                  <h3>We create a timeline and meet regularly</h3>
                  <p>Regular check-ins to keep the project moving and on track.</p>
                </div>
              </div>

              <div className="step">
                <span className="step-num">4</span>
                <div className="step-content">
                  <h3>We decide which recipes to include</h3>
                  <p>Which ones you want people to use, and which ones to include for historic reference.</p>
                </div>
              </div>

              <div className="step">
                <span className="step-num">5</span>
                <div className="step-content">
                  <h3>We set up a schedule of recipe testing</h3>
                  <p>Making sure every recipe works as written before it goes to print.</p>
                </div>
              </div>

              <div className="step">
                <span className="step-num">6</span>
                <div className="step-content">
                  <h3>We get the headnotes written, stories placed</h3>
                  <p>The photos linked to specific sections. Every recipe has its story.</p>
                </div>
              </div>

              <div className="step">
                <span className="step-num">7</span>
                <div className="step-content">
                  <h3>We get you a finished manuscript</h3>
                  <p>Ready to hand to a publisher.</p>
                </div>
              </div>

              <div className="step">
                <span className="step-num">8</span>
                <div className="step-content">
                  <h3>We find you a publisher to self-publish the book</h3>
                  <p>Susan guides you through the self-publishing process from start to finish.</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── SELF PUBLISHING ── */}
        <section className="selfpub-section">
          <div className="selfpub-inner">
            <h2>Self-publishing includes:</h2>
            <ul className="selfpub-list">
              <li>Figuring out, with the publisher, the layout and cover design</li>
              <li>Getting an index</li>
              <li>Making sure the book looks the way you want it to</li>
              <li>Getting the book of your dreams — one that can be perused, used, added to, given and re-given</li>
            </ul>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="cta-section">
          <div className="cta-inner">
            <h2>Ready to begin?</h2>
            <p>
              Fill out the contact form or send Susan an email directly.
              She responds to all enquiries within 3–5 business days.
            </p>
            <div className="cta-btns">
              <a href="/contact" className="btn-cta-primary">Fill out the form →</a>
              <a href="mailto:susan@onruetatin.com" className="btn-cta-secondary">susan@onruetatin.com</a>
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
              <span className="footer-copy">© 2026 Susan Herrmann Loomis</span>
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