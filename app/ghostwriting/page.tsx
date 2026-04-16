"use client";

import { useState } from "react";



export default function GhostwritingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        /* ── NAV ── */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          height: 68px; background: var(--dark);
          display: flex; align-items: center;
          justify-content: space-between; padding: 0 3rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .nav-logo { display: flex; align-items: center; gap: 12px; }
        .nav-logo-mark {
          width: 38px; height: 38px; background: var(--amber);
          border-radius: 10px; display: flex; align-items: center;
          justify-content: center; font-weight: 800; font-size: 16px;
          color: var(--dark); flex-shrink: 0; font-family: var(--sans);
        }
        .nav-logo-text { display: flex; flex-direction: column; }
        .nav-logo-name { font-weight: 700; font-size: 14px; color: var(--white); letter-spacing: 0.04em; text-transform: uppercase; line-height: 1.1; }
        .nav-logo-sub { font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.4); line-height: 1; }
        .nav-links { display: flex; list-style: none; gap: 2.25rem; align-items: center; }
        .nav-links a { font-size: 12px; letter-spacing: 0.09em; text-transform: uppercase; font-weight: 600; color: rgba(255,255,255,0.65); transition: color var(--transition); }
        .nav-links a:hover, .nav-links a.active { color: var(--amber); }
        .nav-cta { background: var(--amber); color: var(--dark); font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; padding: 10px 22px; border-radius: var(--radius-btn); transition: background var(--transition), transform var(--transition); flex-shrink: 0; }
        .nav-cta:hover { background: var(--amber-dark); transform: translateY(-1px); }
        .hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; }
        .hamburger span { display: block; width: 22px; height: 2px; background: var(--white); transition: transform var(--transition), opacity var(--transition); }
        .mobile-drawer { display: none; position: fixed; top: 68px; left: 0; right: 0; z-index: 199; background: var(--dark); flex-direction: column; border-top: 1px solid rgba(255,255,255,0.07); padding: 1rem 2rem 2rem; }
        .mobile-drawer.open { display: flex; }
        .mobile-drawer a { font-size: 15px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.75); padding: 1rem 0; border-bottom: 1px solid rgba(255,255,255,0.07); transition: color var(--transition); }
        .mobile-drawer a:hover { color: var(--amber); }

        /* ── PAGE ── */
        .page-wrap { padding-top: 68px; background: var(--cream); }

        /* ── HERO ── */
        .gw-hero {
          background: var(--dark); padding: 5rem 4rem;
          position: relative; overflow: hidden;
        }
        .gw-hero::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse at 70% 40%, rgba(245,200,66,0.06) 0%, transparent 55%);
          pointer-events: none;
        }
        .gw-hero-eyebrow {
          font-size: 11px; font-weight: 700; letter-spacing: 0.25em;
          text-transform: uppercase; color: var(--amber); margin-bottom: 1rem;
          animation: fadeUp 0.6s ease 0.1s both;
        }
        .gw-hero h1 {
          font-size: clamp(3rem, 6vw, 5.5rem); font-weight: 800;
          text-transform: uppercase; color: var(--white); line-height: 1.0;
          letter-spacing: -0.01em; margin-bottom: 2rem;
          animation: fadeUp 0.6s ease 0.2s both;
        }
        .gw-hero h1 span { color: var(--amber); }
        .gw-hero-row {
          display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start;
          border-top: 1px solid rgba(255,255,255,0.07); padding-top: 3rem;
          animation: fadeUp 0.6s ease 0.3s both;
        }
        .gw-hero-desc { font-size: 17px; color: rgba(255,255,255,0.6); line-height: 1.8; }
        .agent-note {
          background: rgba(245,200,66,0.07); border: 1px solid rgba(245,200,66,0.18);
          border-radius: var(--radius-card); padding: 2rem;
        }
        .agent-note h3 { font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: var(--amber); margin-bottom: 0.75rem; }
        .agent-note p { font-size: 14px; color: rgba(255,255,255,0.5); line-height: 1.75; }

        /* ── SERVICES — FHM large image card style ── */
        .services-section { background: var(--cream); padding: 5rem 4rem; }
        .services-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(13,31,26,0.45); margin-bottom: 1.5rem; }
        .services-section h2 { font-size: clamp(1.8rem, 3vw, 2.8rem); font-weight: 800; text-transform: uppercase; color: var(--text-dark); margin-bottom: 2.5rem; }
        .services-section h2 span { color: var(--amber); }

        /* Two large image cards side by side — FHM image 4 style */
        .service-cards-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 3rem; }
        .service-big-card {
          position: relative; border-radius: var(--radius-card);
          overflow: hidden; aspect-ratio: 4/3;
          background: var(--dark); cursor: pointer;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }
        .service-big-card:hover { transform: translateY(-5px); box-shadow: 0 24px 48px rgba(13,31,26,0.2); }
        .service-big-card img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.5); transition: transform 0.6s ease, filter 0.4s ease; display: block; }
        .service-big-card:hover img { transform: scale(1.05); filter: brightness(0.4); }

        /* pill label top-left */
        .sbc-pill {
          position: absolute; top: 1.25rem; left: 1.25rem; z-index: 2;
          background: rgba(10,10,10,0.75); border: 1px solid rgba(255,255,255,0.25);
          color: var(--white); font-size: 11px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 6px 14px; border-radius: var(--radius-btn);
          backdrop-filter: blur(4px);
        }

        /* title + desc at the bottom */
        .sbc-bottom {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 2;
          background: linear-gradient(to top, rgba(13,31,26,0.97) 0%, rgba(13,31,26,0.6) 60%, transparent 100%);
          padding: 2.5rem 1.75rem 1.75rem;
        }
        .sbc-title { font-size: clamp(1.2rem, 2vw, 1.6rem); font-weight: 800; text-transform: uppercase; color: var(--white); line-height: 1.15; margin-bottom: 0.5rem; }
        .sbc-desc { font-size: 13px; color: rgba(255,255,255,0.65); line-height: 1.65; margin-bottom: 1rem; }
        .sbc-includes { list-style: none; display: flex; flex-direction: column; gap: 5px; }
        .sbc-includes li { font-size: 12px; color: rgba(255,255,255,0.45); display: flex; align-items: center; gap: 7px; }
        .sbc-includes li::before { content: ''; display: block; width: 4px; height: 4px; border-radius: 50%; background: var(--amber); opacity: 0.7; flex-shrink: 0; }

        /* ── OVERLAP CARD SECTION — FHM image 3 style ── */
        /* Image right, dark card overlapping left */
        .overlap-section { background: var(--cream); padding: 2rem 4rem 5rem; }
        .overlap-section h2 { font-size: 11px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(13,31,26,0.45); margin-bottom: 2rem; }
        .overlap-wrap {
          position: relative; display: flex; align-items: center;
          min-height: 440px;
        }
        .overlap-img {
          position: absolute; right: 0; top: 0; bottom: 0;
          width: 65%; border-radius: var(--radius-card); overflow: hidden;
          background: #1a2a1a;
        }
        .overlap-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .overlap-card {
          position: relative; z-index: 2;
          background: var(--dark); border-radius: var(--radius-card);
          padding: 3rem; width: 52%;
          box-shadow: 0 20px 60px rgba(13,31,26,0.3);
        }
        .overlap-card h3 {
          font-size: clamp(1.4rem, 2.5vw, 2.2rem); font-weight: 800;
          text-transform: uppercase; color: var(--amber); line-height: 1.15;
          margin-bottom: 1.25rem;
        }
        .overlap-card p { font-size: 15px; color: rgba(255,255,255,0.62); line-height: 1.8; margin-bottom: 1.5rem; }
        .btn-overlap {
          display: inline-flex; align-items: center;
          background: var(--amber); color: var(--dark);
          font-size: 12px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; padding: 12px 26px; border-radius: var(--radius-btn);
          transition: background var(--transition), transform var(--transition);
        }
        .btn-overlap:hover { background: var(--amber-dark); transform: translateY(-2px); }

        /* ── FLOATING CARD SECTION — FHM image 2 style ── */
        /* Image bleeds left, dark card floats right overlapping */
        .float-section { background: var(--cream); padding: 0 4rem 5rem; }
        .float-wrap { position: relative; display: flex; align-items: center; min-height: 440px; }
        .float-img {
          position: absolute; left: 0; top: 0; bottom: 0;
          width: 65%; border-radius: var(--radius-card); overflow: hidden;
          background: #1a2a1a;
        }
        .float-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .float-card {
          position: absolute; right: 0; z-index: 2;
          background: var(--dark); border-radius: var(--radius-card);
          padding: 3rem; width: 50%;
          box-shadow: 0 20px 60px rgba(13,31,26,0.3);
        }
        .float-card h3 {
          font-size: clamp(1.4rem, 2.5vw, 2.2rem); font-weight: 800;
          text-transform: uppercase; color: var(--amber); line-height: 1.15;
          margin-bottom: 1.25rem;
        }
        .float-card p { font-size: 15px; color: rgba(255,255,255,0.62); line-height: 1.8; margin-bottom: 1.5rem; }

        /* ── BIG SINGLE CARD — FHM image 1 style ── */
        /* Full-width image card with pill top-left, date, title + button */
        .featured-section { background: var(--cream); padding: 0 4rem 5rem; }
        .featured-section-label { font-size: 11px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(13,31,26,0.45); margin-bottom: 1.5rem; }
        .featured-card {
          position: relative; border-radius: var(--radius-card);
          overflow: hidden; width: 100%; aspect-ratio: 16/3;
          background: var(--dark);
          transition: transform 0.35s ease;
        }
        .featured-card:hover { transform: translateY(-4px); box-shadow: 0 24px 56px rgba(13,31,26,0.22); }
        .featured-card img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.45); transition: transform 0.7s ease; display: block; }
        .featured-card:hover img { transform: scale(1.04); }
        .fc-pill {
          position: absolute; top: 1.5rem; left: 1.5rem; z-index: 2;
          background: rgba(10,10,10,0.75); border: 1px solid rgba(255,255,255,0.25);
          color: var(--white); font-size: 11px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 7px 16px; border-radius: var(--radius-btn);
          backdrop-filter: blur(4px);
        }
        .fc-bottom {
          position: absolute; bottom: 1.75rem; left: 1.75rem; right: 1.75rem; z-index: 2;
          display: flex; align-items: flex-end; justify-content: space-between; gap: 2rem;
        }
        .fc-text { display: flex; flex-direction: column; gap: 4px; }
        .fc-sub { font-size: 14px; color: rgba(255,255,255,0.65); font-weight: 400; }
        .fc-title { font-size: clamp(1.4rem, 3vw, 2.4rem); font-weight: 800; text-transform: uppercase; color: var(--white); line-height: 1.1; }
        .btn-fc {
          display: inline-flex; align-items: center; flex-shrink: 0;
          background: var(--amber); color: var(--dark);
          font-size: 12px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; padding: 12px 24px; border-radius: var(--radius-btn);
          transition: background var(--transition), transform var(--transition);
          white-space: nowrap;
        }
        .btn-fc:hover { background: var(--amber-dark); transform: translateY(-2px); }



        /* ── AGENT CARD ── */
        .agent-section { background: var(--cream); padding: 5rem 4rem; }
        .agent-card { border: 2px solid rgba(13,31,26,0.18); border-radius: var(--radius-card); padding: 2rem 2.5rem; display: flex; align-items: center; justify-content: space-between; gap: 2rem; flex-wrap: wrap; }
        .agent-card-left h3 { font-size: 1rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-dark); margin-bottom: 0.4rem; }
        .agent-card-left p { font-size: 14px; color: rgba(13,31,26,0.6); line-height: 1.6; max-width: 580px; }
        .btn-outline-card { display: inline-flex; align-items: center; white-space: nowrap; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 11px 24px; border-radius: var(--radius-btn); border: 2px solid var(--text-dark); color: var(--text-dark); background: transparent; transition: background var(--transition), color var(--transition); }
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
          .gw-hero-row { grid-template-columns: 1fr; gap: 2.5rem; }
          .service-cards-grid { grid-template-columns: 1fr; }
          .overlap-wrap, .float-wrap { flex-direction: column; min-height: auto; }
          .overlap-img, .float-img { position: relative; width: 100%; height: 280px; }
          .overlap-card, .float-card { position: relative; width: 100%; right: auto; }
          .footer-inner { grid-template-columns: 1fr 1fr; gap: 2.5rem; }
        }
        @media (max-width: 768px) {
          .nav { padding: 0 1.25rem; }
          .nav-links, .nav-cta { display: none; }
          .hamburger { display: flex; }
          .nav-logo-sub { display: none; }
          .gw-hero { padding: 3rem 1.25rem 3.5rem; }
          .gw-hero h1 { font-size: clamp(2.2rem, 8vw, 3.5rem); }
          .gw-hero-desc { font-size: 15px; }
          .services-section { padding: 3.5rem 1.25rem; }
          .overlap-section, .float-section { padding-left: 1.25rem; padding-right: 1.25rem; }
          .featured-section { padding-left: 1.25rem; padding-right: 1.25rem; }
          .agent-section { padding: 3.5rem 1.25rem; }
          .overlap-img, .float-img { height: 220px; }
          .overlap-card, .float-card { padding: 1.75rem; }
          .overlap-card h3, .float-card h3 { font-size: 1.2rem; }
          .fc-bottom { flex-direction: column; align-items: flex-start; gap: 1rem; }
          .featured-card { aspect-ratio: 16/5; }
          .agent-card { flex-direction: column; align-items: flex-start; }
          .cta-section { padding: 3.5rem 1.25rem; }
          footer { padding: 3rem 1.25rem 0; }
          .footer-inner { grid-template-columns: 1fr; gap: 2rem; }
          .footer-bottom { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
        }
        @media (max-width: 480px) {
          .gw-hero h1 { font-size: 2rem; }
          .service-big-card { aspect-ratio: 3/2; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav className="nav">
        <a href="/" className="nav-logo">
          <div className="nav-logo-mark">SL</div>
          <div className="nav-logo-text">
            <span className="nav-logo-name">Susan Herrmann Loomis</span>
            <span className="nav-logo-sub">Author · Chef · Cooking School</span>
          </div>
        </a>
        <ul className="nav-links">
          <li><a href="/books">Books</a></li>
          <li><a href="/cooking-school">Cooking School</a></li>
          <li><a href="/writing-courses">Writing Courses</a></li>
          <li><a href="/ghostwriting" className="active">Ghostwriting</a></li>
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
        {[["Books","/books"],["Cooking School","/cooking-school"],["Writing Courses","/writing-courses"],["Ghostwriting","/ghostwriting"],["About","/about"],["Get in Touch","/contact"]].map(([l,h]) => (
          <a key={h} href={h} onClick={() => setMenuOpen(false)}>{l}</a>
        ))}
      </div>

      <div className="page-wrap">

        {/* ── HERO ── */}
        <section className="gw-hero">
          <p className="gw-hero-eyebrow">Ghostwriting & Consulting</p>
          <h1>Your Story,<br /><span>Expertly Told</span></h1>
          <div className="gw-hero-row">
            <p className="gw-hero-desc">
              Susan Herrmann Loomis brings thirty years of food writing,
              recipe development, and publishing experience to ghostwriting
              projects — food memoirs, cookbooks, culinary narratives, and
              beyond. She writes in your voice, not hers. The result is a
              book that sounds unmistakably like you, built on the craft of
              someone who has done it fourteen times.
            </p>
            <div className="agent-note">
              <h3>A note on the process</h3>
              <p>
                Susan works primarily through literary agents. If you have
                representation, please have your agent reach out directly.
                If you don&apos;t yet have an agent, Susan is happy to discuss
                your project and advise on next steps.
              </p>
            </div>
          </div>
        </section>

        {/* ── TWO SERVICE CARDS — FHM image 4 style ── */}
        <section className="services-section">
          <p className="services-eyebrow">What Susan offers</p>
          <h2>Ways to <span>Work Together</span></h2>

          <div className="service-cards-grid">

            {/* Card 1 — Full Ghostwriting */}
            <div className="service-big-card">
              {/* PLACEHOLDER: replace with a writing / manuscript photo */}
              <img
                src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&auto=format&q=75"
                alt="Full ghostwriting"
              />
              <span className="sbc-pill">Full Ghostwriting</span>
              <div className="sbc-bottom">
                <h3 className="sbc-title">Full Ghostwriting</h3>
                <p className="sbc-desc">
                  Susan writes the entire book in your voice — from proposal
                  through final manuscript. Recipe development, all writing,
                  and complete revision rounds included.
                </p>
                <ul className="sbc-includes">
                  <li>Book proposal development</li>
                  <li>Full manuscript writing</li>
                  <li>Recipe review and editing</li>
                  <li>Voice development and consistency</li>
                  <li>All revision rounds</li>
                </ul>
              </div>
            </div>

            {/* Card 2 — Writing Consulting */}
            <div className="service-big-card">
              {/* PLACEHOLDER: replace with a books / editing photo */}
              <img
                src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=900&auto=format&q=75"
                alt="Writing consulting"
              />
              <span className="sbc-pill">Writing Consulting</span>
              <div className="sbc-bottom">
                <h3 className="sbc-title">Writing Consulting</h3>
                <p className="sbc-desc">
                  You&apos;ve written a draft — or part of one — and need an
                  expert eye. Manuscript feedback, voice coaching, structural
                  advice, and publishing guidance.
                </p>
                <ul className="sbc-includes">
                  <li>Manuscript critique and feedback</li>
                  <li>Voice and structure coaching</li>
                  <li>Recipe writing review</li>
                  <li>Editorial process guidance</li>
                  <li>Publishing strategy advice</li>
                </ul>
              </div>
            </div>

          </div>
        </section>

        {/* ── FEATURED CARD — FHM image 1 style ── */}
        <section className="featured-section">
          <p className="featured-section-label">Also available</p>
          <a href="/contact" className="featured-card">
            {/* PLACEHOLDER: replace with a cooking / food writing photo */}
            <img
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1400&auto=format&q=75"
              alt="Recipe development and food writing"
            />
            <span className="fc-pill">Speciality Service</span>
            <div className="fc-bottom">
              <div className="fc-text">
                <span className="fc-sub">By arrangement</span>
                <h3 className="fc-title">Recipe Development & Food Writing</h3>
              </div>
              <span className="btn-fc">Enquire →</span>
            </div>
          </a>
        </section>

        {/* ── OVERLAP CARD — FHM image 3 style (image right, card left) ── */}
        <section className="overlap-section">
          <h2>Why Susan</h2>
          <div className="overlap-wrap">
            <div className="overlap-img">
              {/* PLACEHOLDER: replace with Susan writing or cooking photo */}
              <img
                src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=900&auto=format&q=75"
                alt="Susan Herrmann Loomis"
              />
            </div>
            <div className="overlap-card">
              <h3>Fourteen Books. Thirty Years. Your Voice.</h3>
              <p>
                Susan brings a journalist&apos;s ear, a chef&apos;s precision, and a
                writer&apos;s sensitivity to every project she takes on. She knows
                how publishers think, how recipes should read, and how to find
                the voice inside your story — then get it onto the page with
                the craft it deserves.
              </p>
              <a href="/contact" className="btn-overlap">Start the conversation →</a>
            </div>
          </div>
        </section>

        {/* ── FLOAT CARD — FHM image 2 style (image left, card right) ── */}
        <section className="float-section">
          <div className="float-wrap">
            <div className="float-img">
              {/* PLACEHOLDER: replace with a market or kitchen photo */}
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&auto=format&q=75"
                alt="French food and writing"
              />
            </div>
            <div className="float-card">
              <h3>Working Through Literary Agents</h3>
              <p>
                Ghostwriting inquiries are best handled through a literary
                agent. If you have representation, ask your agent to reach
                out to susan@onruetatin.com. If you&apos;re at an earlier stage,
                Susan is happy to have an initial conversation and advise
                on next steps.
              </p>
              <a href="/contact" className="btn-overlap">Get in touch</a>
            </div>
          </div>
        </section>



        {/* ── AGENT CARD ── */}
        <section className="agent-section">
          <div className="agent-card">
            <div className="agent-card-left">
              <h3>Ready to talk?</h3>
              <p>
                Whether you have an agent, a manuscript, or just an idea —
                reach out and start the conversation. Susan responds to all
                enquiries within 3–5 business days.
              </p>
            </div>
            <a href="/contact" className="btn-outline-card">Go to contact page</a>
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
                {[["Books","/books"],["Cooking School","/cooking-school"],["Writing Courses","/writing-courses"],["Ghostwriting","/ghostwriting"],["About","/about"],["Contact","/contact"]].map(([l,h]) => (
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