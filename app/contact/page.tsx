"use client";

import { useState } from "react";

export default function ContactPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) setSubmitted(true);
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
        .contact-hero {
          background: var(--dark); padding: 5rem 4rem;
          position: relative; overflow: hidden;
        }
        .contact-hero::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse at 60% 50%, rgba(245,200,66,0.06) 0%, transparent 55%);
          pointer-events: none;
        }
        .contact-hero-eyebrow {
          font-size: 11px; font-weight: 700; letter-spacing: 0.25em;
          text-transform: uppercase; color: var(--amber); margin-bottom: 1rem;
          animation: fadeUp 0.6s ease 0.1s both;
        }
        .contact-hero h1 {
          font-size: clamp(3rem, 6vw, 5.5rem); font-weight: 800;
          text-transform: uppercase; color: var(--white); line-height: 1.0;
          letter-spacing: -0.01em; margin-bottom: 2rem;
          animation: fadeUp 0.6s ease 0.2s both;
        }
        .contact-hero h1 span { color: var(--amber); }
        .contact-hero-sub {
          font-size: 17px; color: rgba(255,255,255,0.55); line-height: 1.75;
          max-width: 580px; animation: fadeUp 0.6s ease 0.3s both;
        }

        /* ── MAIN CONTACT SECTION ── */
        .contact-main {
          background: var(--cream); padding: 5rem 4rem;
          display: grid; grid-template-columns: 1fr 1.6fr; gap: 6rem; align-items: start;
        }

        /* left info column */
        .contact-info { display: flex; flex-direction: column; gap: 2.5rem; }
        .contact-info-block h3 {
          font-size: 11px; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase; color: var(--amber); margin-bottom: 0.75rem;
        }
        .contact-info-block p {
          font-size: 15px; color: rgba(13,31,26,0.65); line-height: 1.75; font-weight: 400;
        }
        .contact-info-block a {
          color: var(--text-dark); font-weight: 600; border-bottom: 2px solid var(--amber);
          transition: color var(--transition);
        }
        .contact-info-block a:hover { color: var(--amber-dark); }
        .response-note {
          background: var(--dark); border-radius: var(--radius-card);
          padding: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem;
        }
        .response-note span {
          font-size: 10px; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase; color: var(--amber);
        }
        .response-note p { font-size: 14px; color: rgba(255,255,255,0.55); line-height: 1.6; }

        /* subject pills */
        .subject-pills { display: flex; flex-direction: column; gap: 0.5rem; }
        .subject-pill {
          display: flex; align-items: center; gap: 10px;
          font-size: 13px; color: rgba(13,31,26,0.6); font-weight: 400;
        }
        .subject-pill::before {
          content: ''; display: block; width: 6px; height: 6px;
          border-radius: 50%; background: var(--amber); flex-shrink: 0;
        }

        /* ── FORM ── */
        .contact-form { display: flex; flex-direction: column; gap: 1rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

        .contact-form input,
        .contact-form select,
        .contact-form textarea {
          width: 100%; background: var(--white);
          border: 2px solid rgba(13,31,26,0.12); border-radius: var(--radius-card);
          color: var(--text-dark); font-family: var(--sans);
          font-size: 14px; font-weight: 400;
          padding: 14px 18px; outline: none;
          transition: border-color var(--transition);
          appearance: none; -webkit-appearance: none;
        }
        .contact-form input::placeholder,
        .contact-form textarea::placeholder { color: rgba(13,31,26,0.3); }
        .contact-form input:focus,
        .contact-form select:focus,
        .contact-form textarea:focus { border-color: var(--amber); }
        .contact-form select {
          color: rgba(13,31,26,0.5); cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238c8880' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 16px center;
          background-color: var(--white); padding-right: 40px;
        }
        .contact-form select option { color: var(--text-dark); background: var(--white); }
        .contact-form textarea { resize: vertical; min-height: 140px; line-height: 1.6; }

        .form-note {
          font-size: 12px; color: rgba(13,31,26,0.4); line-height: 1.6; font-weight: 400;
        }
        .form-note a { color: var(--text-dark); border-bottom: 1px solid var(--amber); }

        .btn-submit {
          background: var(--dark); color: var(--amber);
          border: none; font-family: var(--sans);
          font-size: 13px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; padding: 15px 36px;
          border-radius: var(--radius-btn); cursor: pointer;
          transition: background var(--transition), transform var(--transition);
          align-self: flex-start;
        }
        .btn-submit:hover { background: #1a2a1a; transform: translateY(-2px); }

        /* success state */
        .form-success {
          background: var(--dark); border-radius: var(--radius-card);
          padding: 3rem; text-align: center;
          display: flex; flex-direction: column; align-items: center; gap: 1rem;
        }
        .form-success-icon {
          width: 52px; height: 52px; background: rgba(245,200,66,0.15);
          border: 2px solid var(--amber); border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 22px; color: var(--amber);
        }
        .form-success h3 {
          font-size: 1.2rem; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.04em; color: var(--white);
        }
        .form-success p { font-size: 14px; color: rgba(255,255,255,0.5); line-height: 1.7; max-width: 340px; }

        /* ── 3 INFO CARDS ROW (FHM policy plan style) ── */
        .info-cards-section { background: var(--cream); padding: 0 4rem 5rem; display: flex; flex-direction: column; gap: 1rem; }
        .info-card {
          border: 2px solid rgba(13,31,26,0.14); border-radius: var(--radius-card);
          padding: 1.75rem 2.5rem; display: flex; align-items: center;
          justify-content: space-between; gap: 2rem; flex-wrap: wrap;
        }
        .info-card-left h3 { font-size: 0.95rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-dark); margin-bottom: 0.3rem; }
        .info-card-left p { font-size: 13px; color: rgba(13,31,26,0.55); line-height: 1.5; }
        .btn-outline-card {
          display: inline-flex; align-items: center; white-space: nowrap;
          font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 10px 22px; border-radius: var(--radius-btn);
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
          .contact-main { grid-template-columns: 1fr; gap: 3rem; padding: 4rem 2rem; }
          .footer-inner { grid-template-columns: 1fr 1fr; gap: 2.5rem; }
        }
        @media (max-width: 768px) {
          .nav { padding: 0 1.25rem; }
          .nav-links, .nav-cta { display: none; }
          .hamburger { display: flex; }
          .nav-logo-sub { display: none; }
          .contact-hero { padding: 3rem 1.25rem 3.5rem; }
          .contact-hero h1 { font-size: clamp(2.4rem, 9vw, 4rem); }
          .contact-hero-sub { font-size: 15px; }
          .contact-main { padding: 3.5rem 1.25rem; gap: 2.5rem; }
          .form-row { grid-template-columns: 1fr; }
          .contact-form input,
          .contact-form select,
          .contact-form textarea { font-size: 16px; } /* prevents iOS zoom */
          .btn-submit { width: 100%; text-align: center; justify-content: center; }
          .info-cards-section { padding: 0 1.25rem 3.5rem; }
          .info-card { flex-direction: column; align-items: flex-start; gap: 1rem; }
          .response-note { padding: 1.25rem; }
          footer { padding: 3rem 1.25rem 0; }
          .footer-inner { grid-template-columns: 1fr; gap: 2rem; }
          .footer-bottom { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
          .footer-social { flex-wrap: wrap; }
        }
        @media (max-width: 480px) {
          .contact-hero h1 { font-size: 2rem; }
          .form-success { padding: 2rem 1.5rem; }
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
          <li><a href="/write-your-cookbook">Write Your Cookbook</a></li>
          <li><a href="/ghostwriting">Ghostwriting</a></li>
          <li><a href="/about">About</a></li>
        </ul>
        <a href="/contact" className="nav-cta active">Get in Touch</a>
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
        <section className="contact-hero">
          <p className="contact-hero-eyebrow">Get in touch</p>
          <h1>Let&apos;s <span>Talk</span></h1>
          <p className="contact-hero-sub">
            For book inquiries, writing courses, ghostwriting, and general
            questions — reach Susan here. For cooking school bookings,
            visit onruetatin.com directly.
          </p>
        </section>

        {/* ── MAIN FORM + INFO ── */}
        <section className="contact-main">

          {/* Left — contact info */}
          <div className="contact-info">

            <div className="contact-info-block">
              <h3>Email</h3>
              <p><a href="mailto:susan@onruetatin.com">susan@onruetatin.com</a></p>
            </div>

            <div className="contact-info-block">
              <h3>Location</h3>
              <p>Paris, France<br />& Paris, France</p>
            </div>

            <div className="contact-info-block">
              <h3>This form is for</h3>
              <div className="subject-pills">
                {["Book inquiries","Ghostwriting","Writing courses","General questions"].map(s => (
                  <span className="subject-pill" key={s}>{s}</span>
                ))}
              </div>
            </div>

            <div className="response-note">
              <span>Response time</span>
              <p>Susan responds to all enquiries within 3–5 business days. Ghostwriting inquiries are handled through literary agents.</p>
            </div>

            <div className="contact-info-block">
              <h3>Cooking school bookings</h3>
              <p>For class dates, pricing, and bookings please visit <a href="https://onruetatin.com" target="_blank" rel="noopener noreferrer">onruetatin.com</a> directly.</p>
            </div>

          </div>

          {/* Right — form */}
          {submitted ? (
            <div className="form-success">
              <div className="form-success-icon">✓</div>
              <h3>Message sent</h3>
              <p>Thank you — Susan will be in touch within 3–5 business days.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <input
                  type="text" placeholder="Your name"
                  autoComplete="name" required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                  type="email" placeholder="Email address"
                  autoComplete="email" required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <select
                value={formData.subject}
                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                aria-label="Subject"
              >
                <option value="" disabled>Subject</option>
                <option value="book">Book Inquiry</option>
                <option value="ghostwriting">Ghostwriting</option>
                <option value="writing-courses">Write Your Cookbook</option>
                <option value="cooking-school">Cooking School</option>
                <option value="general">General</option>
              </select>
              <textarea
                placeholder="Your message" rows={6} required
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
              />
              <p className="form-note">
                For cooking school bookings please visit{" "}
                <a href="https://onruetatin.com" target="_blank" rel="noopener noreferrer">onruetatin.com</a>.
                Ghostwriting enquiries are handled through literary agents.
              </p>
              <button type="submit" className="btn-submit">Send message →</button>
            </form>
          )}
        </section>

        {/* ── 3 INFO CARDS ── */}
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