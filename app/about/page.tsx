"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal,.reveal-up");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
      }),
      { threshold: 0.07 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ============================================================
   DATA
   ============================================================ */


const SERVICES = [
  {
    title: "On Rue Tatin Cooking School",
    desc: "5-day Normandy immersions, 3-day weekend intensives, and Paris apartment ateliers built around market visits and the French table.",
    href: "/cooking-school",
    cta: "Learn more",
  },
  {
    title: "Cookbook Writing Course",
    desc: "A 5-module programme covering voice, structure, recipe writing, the editorial process, and getting published.",
    href: "/write-your-cookbook",
    cta: "Learn more",
  },
  {
    title: "Ghostwriting & Consulting",
    desc: "Full ghostwriting and consulting for food books, memoirs, and culinary projects. Susan works primarily through literary agents.",
    href: "/ghostwriting",
    cta: "Learn more",
  },
];



/* ============================================================
   PAGE
   ============================================================ */
export default function AboutPage() {
  useReveal();
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
        .nav-logo-mark { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; overflow: hidden; background: transparent; position: relative; }
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

        /* ── PAGE WRAPPER ── */
        .page-wrap {
          background: #F5E6C8;
          padding-top: 72px;
        }

        /* ── HERO ── */
        .about-hero {
          background: #2e7175;
          padding: 4.5rem 4rem 5rem;
          position: relative; overflow: hidden;
        }
        .about-hero::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 80% 40%, rgba(245,200,66,0.07) 0%, transparent 55%);
          pointer-events: none;
        }
        .about-hero-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }
        .about-hero-eyebrow {
          font-size: 11px; font-weight: 700; letter-spacing: 0.25em;
          text-transform: uppercase; color: var(--amber); margin-bottom: 1rem;
          animation: fadeUp 0.6s ease 0.1s both;
        }
        .about-hero h1 {
          font-size: clamp(2.8rem, 5vw, 5rem);
          font-weight: 800; text-transform: uppercase;
          color: var(--white); line-height: 1.0;
          letter-spacing: -0.01em; margin-bottom: 1.5rem;
          animation: fadeUp 0.6s ease 0.2s both;
        }
        .about-hero h1 span { color: var(--amber); }
        .about-hero-desc {
          font-size: 17px; color: rgba(255,255,255,0.6);
          line-height: 1.75; font-weight: 400; max-width: 480px;
          animation: fadeUp 0.6s ease 0.3s both;
        }
        .about-hero-portrait {
          border-radius: var(--radius-card);
          overflow: hidden;
          aspect-ratio: 3 / 4;
          animation: fadeUp 0.7s ease 0.25s both;
          background: var(--dark-mid);
          margin-left: auto;
          width: 90%;
          position: relative;
        }
        .about-hero-portrait img {
          width: 100%; height: 100%; object-fit: cover; object-position: 80% top;
          transition: transform 7s ease;
        }
        .about-hero:hover .about-hero-portrait img { transform: scale(1.05); }

        /* ── FHM-STYLE CONTENT SECTIONS ──
           Each section: amber bg, bold h2 top-left, body text, then large rounded image
        */
        .about-content-section {
          background: #F5E6C8;
          padding: 5rem 4rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .about-content-section + .about-content-section {
          padding-top: 0;
        }
        .acs-h2 {
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 800; text-transform: uppercase;
          color: var(--text-dark); margin-bottom: 1.25rem;
          letter-spacing: 0.01em;
          text-align: center;
        }
        .acs-body {
          font-size: 16px; color: rgba(13,31,26,0.72);
          line-height: 1.8; max-width: 680px; font-weight: 400;
          margin: 0 auto 2.5rem;
          text-align: center;
        }
        .acs-img {
          width: 65%; max-width: 760px;
          aspect-ratio: 4 / 3;
          border-radius: var(--radius-card);
          overflow: hidden;
          background: var(--dark-card);
          margin: 0 auto;
          position: relative;
        }
        .acs-img img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.7s ease;
        }
        .acs-img:hover img { transform: scale(1.04); }



        /* ── OUTLINED INFO CARD (FHM "Policy Plan" style) ── */
        .info-card {
          margin: 0 4rem;
          border: 2px solid rgba(13,31,26,0.18);
          border-radius: var(--radius-card);
          padding: 2rem 2.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem; flex-wrap: wrap;
        }
        .info-card-left h3 {
          font-size: 1rem; font-weight: 800;
          text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--text-dark); margin-bottom: 0.4rem;
        }
        .info-card-left p {
          font-size: 14px; color: rgba(13,31,26,0.6);
          font-weight: 400; line-height: 1.5;
        }
        .btn-outline-card {
          display: inline-flex; align-items: center;
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 11px 24px; border-radius: var(--radius-btn);
          border: 2px solid var(--text-dark);
          color: var(--text-dark); background: transparent;
          transition: background var(--transition), color var(--transition);
          white-space: nowrap;
        }
        .btn-outline-card:hover { background: #2e7175; border-color: #2e7175; color: #fff; }

        /* ── SERVICES SECTION ── */
        .services-section {
          background: #2e7175;
          padding: 5rem 4rem 4rem;
        }
        .services-section .acs-h2 {
          color: var(--white);
          margin-bottom: 2.5rem;
          text-align: center;
        }
        .services-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;
        }
        .service-card {
          background: rgba(255,255,255,0.05);
          border-radius: var(--radius-card);
          padding: 1.75rem 1.5rem;
          display: flex; flex-direction: column; gap: 0.75rem;
          border: 1px solid rgba(255,255,255,0.08);
          transition: transform var(--transition), border-color var(--transition);
          opacity: 1 !important;
          transform: none !important;
        }
        .service-card:hover { transform: translateY(-5px) !important; border-color: rgba(245,200,66,0.25); }
        .service-num {
          font-size: 2rem; font-weight: 800;
          color: rgba(245,200,66,0.3); line-height: 1;
        }
        .service-title {
          font-size: 1rem; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.04em; color: var(--white); line-height: 1.2;
        }
        .service-desc {
          font-size: 14px; color: rgba(255,255,255,0.55);
          line-height: 1.7; flex: 1;
        }
        .service-link {
          display: inline-flex; align-items: center; gap: 6px;
          width: fit-content;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--dark); background: var(--amber);
          padding: 9px 18px; border-radius: var(--radius-btn);
          transition: background var(--transition), transform var(--transition);
          margin-top: auto;
        }
        .service-link:hover { background: var(--amber-dark); }





        /* ── FOOTER ── */
        footer {
          background: #2e7175; padding: 4rem 4rem 0; color: var(--white);
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
        .footer-address { font-size: 13px; color: rgba(255,255,255,0.38); line-height: 1.8; margin-bottom: 1.5rem; }
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
          .about-hero-inner { grid-template-columns: 1fr; gap: 2.5rem; }
          .about-hero-portrait { aspect-ratio: 3/4; width: 60%; margin: 0 auto; }
          .about-hero-portrait img { object-position: center; }
          .services-grid { grid-template-columns: 1fr 1fr; }
          .footer-inner { grid-template-columns: 1fr 1fr; gap: 2.5rem; }
          .acs-img { width: 85%; }
        }
        @media (max-width: 768px) {
          .nav { padding: 0 1.25rem; }
          .nav-links, .nav-cta { display: none; }
          .hamburger { display: flex; }
          .nav-logo-sub { display: none; }
          .about-hero { padding: 3rem 1.25rem 3rem; }
          .about-hero h1 { font-size: clamp(2.2rem, 8vw, 3.5rem); }
          .about-hero-desc { font-size: 15px; }
          .about-content-section { padding: 3.5rem 1.25rem; }
          .acs-h2 { font-size: 1.6rem; }
          .acs-body { font-size: 15px; }
          .acs-img { width: 100%; }
          .info-card { margin: 0 1.25rem; flex-direction: column; align-items: flex-start; }
          .services-section { padding: 4rem 1.25rem; }
          .services-grid { grid-template-columns: 1fr; }
          footer { padding: 3rem 1.25rem 0; }
          .footer-inner { grid-template-columns: 1fr; gap: 2rem; }
          .footer-bottom { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
        }
        @media (max-width: 480px) {
          .about-hero h1 { font-size: 2rem; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav className="nav">
        <a href="/" className="nav-logo">
          <div className="nav-logo-mark"><Image src="/images/onruetatinlogo.png" alt="On Rue Tatin" fill sizes="40px" /></div>
          <div className="nav-logo-text">
            <span className="nav-logo-name">Susan Herrmann Loomis</span>
            <span className="nav-logo-sub">Author · Chef · Cooking School</span>
          </div>
        </a>
        <ul className="nav-links">
          <li><a href="/books">Books</a></li>
          <li><a href="/cooking-school">Cooking School</a></li>
          <li><a href="/write-your-cookbook">Write Your Cookbook</a></li>
          <li><a href="/ghostwriting">Ghostwriting</a></li>
          <li><a href="/about" className="active">About</a></li>
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

        {/* ── HERO (dark, same as every page) ── */}
        <section className="about-hero">
          <div className="about-hero-inner">
            <div>
              <p className="about-hero-eyebrow">Author · Chef · Teacher</p>
              <h1>About <span>Susan</span></h1>
              <p className="about-hero-desc">
                Originally from Seattle, Susan Herrmann Loomis has spent more than
                thirty years living, cooking, and writing in France — from a Paris
                cooking school to a restored Norman convent that became her home,
                her kitchen, and one of the world&apos;s most beloved cooking schools.
              </p>
            </div>

            <div className="about-hero-portrait">
              <Image
                src="/images/Susan-Great-Photo.jpg"
                alt="Susan Herrmann Loomis"
                fill
                sizes="(max-width: 900px) 90vw, 540px"
                preload
              />
            </div>
          </div>
        </section>

        {/* ── WHO SHE IS ── */}
        <section className="about-content-section reveal">
          <h2 className="acs-h2">About Susan</h2>
          <p className="acs-body">
            Originally from Seattle, Susan Herrmann Loomis moved from Seattle to Paris to become a
            culinary apprentice so she could write knowledgeably about food. Her trajectory has included
            travels throughout the world as a food journalist, interviewing chefs, farmers, home cooks where
            they live, and transmitting their stories and recipes in her fourteen books. She now makes her
            home in the gorgeous city of Paris, where she writes, cooks, and teaches in her lovingly restored
            Paris kitchen.
          </p>
          <p className="acs-body">
            <a href="/contact" style={{ color: "#2e7175", borderBottom: "1px solid #2e7175", fontWeight: 600 }}>Contact Susan</a> for your cookbook project;
            she will help you turn your passion into a beautiful record of your culinary heritage.
          </p>
          <div className="acs-img">
            <Image
              src="/images/susan-outside-grill.jpg"
              alt="Susan Herrmann Loomis"
              fill
              sizes="(max-width: 768px) 100vw, 760px"
            />
          </div>
        </section>

        {/* ── HER APPROACH ── */}
        <section className="about-content-section reveal">
          <h2 className="acs-h2">Her Approach</h2>
          <p className="acs-body">
            What captivates Susan, aside from flavor and excellence, are the
            people who grow and fashion food into gorgeous tastes. She is a
            passionate advocate of sustainable agriculture — nearly all the
            produce she uses in her Paris kitchen comes from local producers.
            She believes firmly in the connection between food producers and
            consumers, and that cooking is inseparable from the land, the
            seasons, and the community around the table. This philosophy runs
            through every one of her fourteen books, her journalism, and every
            class she teaches.
          </p>
          <div className="acs-img">
            <Image
              src="/images/chairs.jpg"
              alt="Susan Herrmann Loomis"
              fill
              sizes="(max-width: 768px) 100vw, 760px"
              style={{ objectPosition: "center 60%" }}
            />
          </div>
        </section>

        {/* ── ON RUE TATIN outlined info card (FHM "Policy Plan" style) ── */}
        <div className="info-card reveal" style={{ marginBottom: "5rem" }}>
          <div className="info-card-left">
            <h3>On Rue Tatin Cooking School</h3>
            <p>
              Susan&apos;s cooking school in Louviers, Paris — classes,
              immersions, and ateliers available year-round. Full details and
              bookings at onruetatin.com.
            </p>
          </div>
          <a
            href="https://onruetatin.com"
            className="btn-outline-card"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit onruetatin.com
          </a>
        </div>



        {/* ── WORK WITH SUSAN ── */}
        <section className="services-section">
          <h2 className="acs-h2">Work With Susan</h2>
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <div className="service-card" key={s.title}>
                <span className="service-num">0{i + 1}</span>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.desc}</p>
                <a href={s.href} className="service-link">{s.cta} →</a>
              </div>
            ))}
          </div>
        </section>





        {/* ── FOOTER ── */}
        <footer>
          <div className="footer-inner">
            <div>
              <span className="footer-brand-name">Susan Herrmann Loomis</span>
              <p className="footer-address">
                On Rue Tatin Cooking School<br />
                Paris, France
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