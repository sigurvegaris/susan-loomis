"use client";

import { useState } from "react";
import Image from "next/image";



export default function GhostwritingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const toggleCard = (i: number) => setExpandedCard(expandedCard === i ? null : i);

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
        .nav-logo-mark { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; overflow: hidden; position: relative; }
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
        .page-wrap { padding-top: 72px; background: #F5E6C8; }

        /* ── FAMILY COOKBOOK SECTION ── */
        .family-cookbook-section { background: #F5E6C8; padding: 5rem 4rem; }
        .family-cookbook-inner { display: grid; grid-template-columns: 1fr 380px; gap: 5rem; align-items: start; max-width: 1200px; margin: 0 auto; }
        .fc-eyebrow { font-size: 11px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--warm); margin-bottom: 0.75rem; }
        .family-cookbook-text h2 { font-family: 'Cormorant Garamond', Georgia, serif; font-size: clamp(2rem, 3.5vw, 3rem); font-weight: 700; font-style: italic; color: var(--terra); line-height: 1.2; margin-bottom: 1.5rem; }
        .family-cookbook-text h3 { font-size: 1rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--ink); margin: 2rem 0 1rem; }
        .family-cookbook-text p { font-size: 15px; color: var(--warm); line-height: 1.85; margin-bottom: 1rem; }
        .fc-step { margin-bottom: 0.75rem; padding-left: 1.25rem; border-left: 2px solid var(--gold); }
        .fc-step-title { font-size: 14px; font-weight: 600; color: var(--ink); display: block; margin-bottom: 0.5rem; }
        .fc-step ul, .fc-self-pub ul { list-style: none; padding: 0; }
        .fc-step li, .fc-self-pub li { font-size: 14px; color: var(--warm); line-height: 1.8; padding-left: 1rem; position: relative; }
        .fc-step li::before, .fc-self-pub li::before { content: '—'; position: absolute; left: 0; color: var(--gold); }
        .fc-self-pub { margin-top: 1rem; padding-left: 1.25rem; border-left: 2px solid var(--gold); }
        .fc-cta-card { background: #F5E6C8; border: 1px solid rgba(26,23,20,0.1); padding: 2.5rem; position: sticky; top: 96px; }
        .fc-cta-card h3 { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.6rem; font-weight: 700; font-style: italic; color: var(--ink); margin-bottom: 0.75rem; }
        .fc-cta-card p { font-size: 14px; color: var(--warm); line-height: 1.75; margin-bottom: 1.5rem; }
        .btn-fc-cta { display: block; background: var(--terra); color: #fff; font-size: 12px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; padding: 14px 24px; text-align: center; border-radius: 2px; transition: background 0.22s ease; margin-bottom: 1rem; }
        .btn-fc-cta:hover { background: var(--terra-dark); }
        .fc-email-link { display: block; text-align: center; font-size: 13px; color: var(--teal); border-bottom: 1px solid var(--teal); width: fit-content; margin: 0 auto; transition: color 0.22s ease; }
        .fc-email-link:hover { color: var(--teal-mid); }

        /* ── HERO ── */
        .gw-hero {
          background: #2e7175; padding: 5rem 4rem;
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
        .services-section { background: #F5E6C8; padding: 5rem 4rem; }
        .services-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(13,31,26,0.45); margin-bottom: 1.5rem; }
        .services-section h2 { font-size: clamp(1.8rem, 3vw, 2.8rem); font-weight: 800; text-transform: uppercase; color: var(--text-dark); margin-bottom: 2.5rem; }
        .services-section h2 span { color: var(--amber); }

        /* Two large image cards side by side — FHM image 4 style */
        .service-cards-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 3rem; }
        .service-big-card {
          position: relative; border-radius: var(--radius-card);
          overflow: hidden; aspect-ratio: 4/3;
          background: #2e7175; cursor: pointer;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }
        .service-big-card:hover { transform: translateY(-5px); box-shadow: 0 24px 48px rgba(13,31,26,0.2); }
        .service-big-card img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.65); transition: transform 0.6s ease, filter 0.4s ease; display: block; }
        .service-big-card:hover img { transform: scale(1.05); filter: brightness(0.45); }

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
          background: linear-gradient(to top, rgba(13,31,26,0.95) 0%, rgba(13,31,26,0.4) 55%, transparent 100%);
          padding: 2rem 1.75rem 1.5rem;
        }
        .sbc-title { font-size: clamp(1.1rem, 2vw, 1.5rem); font-weight: 800; text-transform: uppercase; color: var(--white); line-height: 1.15; margin-bottom: 0.4rem; }
        .sbc-desc { font-size: 13px; color: rgba(255,255,255,0.7); line-height: 1.65; margin-bottom: 0.75rem; }
        .sbc-includes { list-style: none; display: flex; flex-direction: column; gap: 5px; }
        .sbc-includes li { font-size: 12px; color: rgba(255,255,255,0.5); display: flex; align-items: center; gap: 7px; }
        .sbc-includes li::before { content: ''; display: block; width: 4px; height: 4px; border-radius: 50%; background: var(--gold); opacity: 0.8; flex-shrink: 0; }

        /* ── OVERLAP CARD SECTION — FHM image 3 style ── */
        /* Image right, dark card overlapping left */
        .overlap-section { background: #F5E6C8; padding: 2rem 4rem 5rem; }
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
          background: #2e7175; border-radius: var(--radius-card);
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
        .float-section { background: #F5E6C8; padding: 0 4rem 5rem; }
        .float-wrap { position: relative; display: flex; align-items: center; min-height: 440px; }
        .float-img {
          position: absolute; left: 0; top: 0; bottom: 0;
          width: 65%; border-radius: var(--radius-card); overflow: hidden;
          background: #1a2a1a;
        }
        .float-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .float-card {
          position: absolute; right: 0; z-index: 2;
          background: #2e7175; border-radius: var(--radius-card);
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
        .featured-section { background: #F5E6C8; padding: 0 4rem 5rem; }
        .featured-section-label { font-size: 11px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(13,31,26,0.45); margin-bottom: 1.5rem; }
        .featured-card {
          position: relative; border-radius: var(--radius-card);
          overflow: hidden; width: 100%; aspect-ratio: 16/3;
          background: #2e7175;
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
        .agent-section { background: #F5E6C8; padding: 5rem 4rem; }
        .agent-card { border: 2px solid rgba(13,31,26,0.18); border-radius: var(--radius-card); padding: 2rem 2.5rem; display: flex; align-items: center; justify-content: space-between; gap: 2rem; flex-wrap: wrap; }
        .agent-card-left h3 { font-size: 1rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-dark); margin-bottom: 0.4rem; }
        .agent-card-left p { font-size: 14px; color: rgba(13,31,26,0.6); line-height: 1.6; max-width: 580px; }
        .btn-outline-card { display: inline-flex; align-items: center; white-space: nowrap; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 11px 24px; border-radius: var(--radius-btn); border: 2px solid var(--text-dark); color: var(--text-dark); background: transparent; transition: background var(--transition), color var(--transition); }
        .btn-outline-card:hover { background: var(--text-dark); color: var(--amber); }

        /* ── FOOTER ── */
        footer { background: #2e7175; padding: 4rem 4rem 0; color: var(--white); border-top: 1px solid rgba(255,255,255,0.06); }
        .footer-inner { display: grid; grid-template-columns: 1.8fr 1fr; gap: 4rem; padding-bottom: 3.5rem; }
        .footer-brand-name { font-size: 1.1rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: var(--white); display: block; margin-bottom: 0.75rem; }
        .footer-address { font-size: 13px; color: rgba(255,255,255,0.38); line-height: 1.8; }
        .footer-col h4 { font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--amber); margin-bottom: 1.25rem; }
        .footer-col ul { list-style: none; }
        .footer-col li { margin-bottom: 0.6rem; }
        .footer-col a { font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: rgba(255,255,255,0.5); transition: color var(--transition); }
        .footer-col a:hover { color: var(--amber); }
        .footer-bottom { border-top: 1px solid rgba(255,255,255,0.07); padding: 1.5rem 0; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
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
          .sbc-desc, .sbc-includes { display: none; }
          .service-big-card .sbc-bottom { padding-bottom: 2.5rem; }
          .service-big-card.expanded .sbc-desc,
          .service-big-card.expanded .sbc-includes { display: block; }
          .service-big-card.expanded img { filter: brightness(0.4); }
          .service-big-card::after {
            content: 'TAP FOR DETAILS';
            position: absolute; bottom: 1rem; left: 1.5rem;
            font-size: 10px; font-weight: 700; letter-spacing: 0.12em;
            color: rgba(255,255,255,0.7);
          }
          .service-big-card.expanded::after { display: none; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav className="nav">
        <a href="/" className="nav-logo">
          <div className="nav-logo-mark">
            <Image src="/images/onruetatinlogo.png" alt="On Rue Tatin" fill sizes="40px" />
          </div>
          <div className="nav-logo-text">
            <span className="nav-logo-name">Susan Herrmann Loomis</span>
            <span className="nav-logo-sub">Author · Chef · Cooking School</span>
          </div>
        </a>
        <ul className="nav-links">
          <li><a href="/books">Books</a></li>
          <li><a href="/cooking-school">Cooking School</a></li>
          <li><a href="/write-your-cookbook">Write Your Cookbook</a></li>
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
        {[["Books","/books"],["Cooking School","/cooking-school"],["Write Your Cookbook","/write-your-cookbook"],["Ghostwriting","/ghostwriting"],["About","/about"],["Get in Touch","/contact"]].map(([l,h]) => (
          <a key={h} href={h} onClick={() => setMenuOpen(false)}>{l}</a>
        ))}
      </div>

      <div className="page-wrap">

        {/* ── HERO ── */}
        <section className="gw-hero">
          <p className="gw-hero-eyebrow">Ghostwriting &amp; Consulting</p>
          <h1>Your Story,<br /><span>Expertly Told</span></h1>
          <div className="gw-hero-row">
            <p className="gw-hero-desc">
              Susan Herrmann Loomis brings thirty years of research and interviews
              with cooks and chefs throughout the world, food writing, recipe
              development, and publishing experience to ghostwriting projects —
              food memoirs, cookbooks, culinary narratives, and beyond. She writes
              in your voice, not hers. The result is a book that sounds unmistakably
              like you, built on the expertise, craft, and talent of someone who has
              done it fourteen times — as well as your own.
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

        {/* ── TWO SERVICE CARDS ── */}
        <section className="services-section">
          <p className="services-eyebrow">What Susan offers</p>
          <h2>Ways to <span>Work Together</span></h2>

          <div className="service-cards-grid">

            {/* Card 1 — Full Ghostwriting */}
            <div className={`service-big-card${expandedCard === 0 ? " expanded" : ""}`} onClick={() => toggleCard(0)}>
              <Image
                src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&auto=format&q=75"
                alt="Full ghostwriting"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
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
            <div className={`service-big-card${expandedCard === 1 ? " expanded" : ""}`} onClick={() => toggleCard(1)}>
              <Image
                src="/images/stackofbooks.jpg"
                alt="Writing consulting"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
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

        {/* ── CTA ── */}
        <section style={{ background: '#2e7175', padding: '5rem 4rem' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, fontStyle: 'italic', color: '#fff', marginBottom: '1rem' }}>
              Ready to start the conversation?
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, marginBottom: '2rem' }}>
              Whether you have a manuscript, an idea, or just a story you&apos;ve always wanted to tell —
              reach out and Susan will respond within 3–5 business days.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/contact" style={{ background: '#c8a96e', color: '#1a1714', fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '14px 32px', borderRadius: '2px', transition: 'background 0.22s ease' }}>Fill out the form →</a>
              <a href="mailto:susan@onruetatin.com" style={{ background: 'transparent', color: '#fff', fontSize: '12px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '14px 32px', borderRadius: '2px', border: '1px solid rgba(255,255,255,0.4)' }}>susan@onruetatin.com</a>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer>
          <div className="footer-inner">
            <div>
              <span className="footer-brand-name">Susan Herrmann Loomis</span>
              <p className="footer-address">
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