"use client";

import { useState, useEffect } from "react";

/* ============================================================
   DATA
   ============================================================ */
const BOOKS = [
  {
    year: "2024",
    title: "Plat du Jour",
    era: "recent",
    description: "Susan's latest — French cuisine at its seasonal best. Recipes built around the French tradition of the daily special, for everyone who loves French food.",
    amazon: "https://www.amazon.com/Plat-Jour-French-Dinners-Made/dp/1682684504/",
    img: "/images/covers/plat-du-jour.jpg",
    featured: true,
  },
  {
    year: "2015",
    title: "In a French Kitchen",
    era: "recent",
    description: "How the French really cook. Tips, tricks, guides, menus, and more than 80 recipes drawn from the real kitchens of France.",
    amazon: "https://www.amazon.com/French-Kitchen-Traditions-Everyday-Cooking/dp/1592408869/",
    img: "/images/covers/in-a-french-kitchen.jpg",
  },
  {
    year: "2018",
    title: "French Grill",
    era: "recent",
    description: "Ingredients forward, simple, beautifully grilled — French grilling will change the way you cook outdoors forever.",
    amazon: "https://www.amazon.com/French-Grill-Refined-Rustic-Recipes/dp/1682680843/",
    img: "/images/covers/french-grill.jpg",
  },
  {
    year: "2010",
    title: "Nuts in the Kitchen",
    era: "mid",
    description: "A comprehensive collection of nut recipes for every meal — sweet, savory, and everything in between.",
    amazon: "https://www.amazon.com/Nuts-Kitchen-Recipes-Every-Occasion-ebook/dp/B003GFIVZ2/",
    img: "/images/covers/nuts-in-the-kitchen.jpg",
  },
  {
    year: "2005",
    title: "Cooking at Home on Rue Tatin",
    era: "mid",
    description: "Award-winning author and professional chef Susan Herrmann Loomis takes cooks on a journey through French home cooking.",
    amazon: "https://www.amazon.com/Cooking-at-Home-Rue-Tatin/dp/0060758171/",
    img: "/images/covers/cooking-at-home-on-rue-tatin.jpg",
  },
  {
    year: "2001",
    title: "On Rue Tatin",
    era: "early",
    description: "Part memoir, part cookbook — the story of arriving in Paris with little more than a student loan, and finding a life built around French food.",
    amazon: "https://www.amazon.com/Rue-Tatin-Living-Cooking-French/dp/0767904559/",
    img: "/images/covers/on-rue-tatin.jpg",
  },
  {
    year: "1991",
    title: "Farmhouse Cookbook",
    era: "early",
    description: "A beloved classic. Everything made from it is very good — an extensive and deeply satisfying collection of farmhouse recipes.",
    amazon: "https://www.amazon.com/Farmhouse-Cookbook-Susan-Herrmann-Loomis/dp/1563051257/",
    img: "/images/covers/farmhouse-cookbook.jpg",
  },
  {
    year: "1996",
    title: "French Farmhouse Cookbook",
    era: "early",
    description: "As much a book of inspiration as a recipe collection — over 250 uncommonly delicious recipes capturing rustic, richly flavored farmhouse cooking.",
    amazon: "https://www.amazon.com/French-Farmhouse-Cookbook-Herrmann-Loomis/dp/0761106243/",
    img: "/images/covers/french-farmhouse-cookbook.jpg",
  },
  {
    year: "2000",
    title: "Italian Farmhouse Cookbook",
    era: "early",
    description: "The essence of Italian cooking — Susan goes to the source, where the techniques are still genuine and the recipes tied to the culture.",
    amazon: "https://www.amazon.com/Italian-Farmhouse-Cookbook-Herrmann-Loomis/dp/0761105271/",
    img: "/images/covers/italian-farmhouse-cookbook.jpg",
  },
  {
    year: "1999",
    title: "Tarte Tatin",
    era: "early",
    description: "Further adventures in a small French town — a delightful follow-up to On Rue Tatin, rich with food, life, and Normandy.",
    amazon: "https://www.amazon.com/Tarte-Tatin-More-Belle-Vie/dp/0007235224/",
    img: "/images/covers/tarte-tatin.jpg",
  },
  {
    year: "1993",
    title: "Clambakes & Fish Fries",
    era: "early",
    description: "From clambakes to shrimp boils to oyster galas — nothing is more pleasurable or nourishing than a great seafood celebration.",
    amazon: "https://www.amazon.com/Clambakes-Fries-Susan-Herrmann-Loomis/dp/1563056712/",
    img: "/images/covers/clambakes-and-fish-fries.jpg",
  },
  {
    year: "1988",
    title: "Great American Seafood Cookbook",
    era: "early",
    description: "The seafood-lover's bible — for health, variety, and flavor, the definitive guide to American seafood cooking.",
    amazon: "https://www.amazon.com/Sea-Shining-American-Seafood-Cookbook/dp/B002G2OIHQ/",
    img: "/images/covers/great-american-seafood-cookbook.jpg",
  },
  {
    year: "1994",
    title: "A Holiday Cookbook",
    era: "early",
    description: "Les Recettes de la Saison — a holiday cookbook from the chefs of La Madeleine and Susan Herrmann Loomis.",
    amazon: "https://www.amazon.com/Recettes-Saison-Cookbook-Madeleine-Herrmann/dp/0964395517/",
    img: "/images/covers/a-holiday-cookbook.jpg",
  },
  {
    year: "1985",
    title: "The Food Lover's Guide to Paris",
    era: "early",
    description: "An internationally acclaimed guide to French cuisine — written by an award-winning cookbook author and restaurant critic for France.",
    amazon: "https://www.amazon.com/Food-Lovers-Guide-France/dp/041314660X/",
    img: "/images/covers/food-lovers-guide-paris.jpg",
  },
  {
    year: "",
    title: "Les Meilleures Recettes",
    era: "early",
    description: "The best recipes from the regions of France — a special book that will inspire your palate and ignite a passion for great food.",
    amazon: "https://www.amazon.com/Meilleures-recettes-regions-France/dp/2253165964/",
    img: "/images/covers/les-meilleures-recettes.jpg",
  },
];

/* placeholder background colors so each card feels unique without real covers */
const CARD_COLORS = [
  "#1a2a1a","#1f1a0e","#0e1a1f","#1a0e1a","#1a1a0e",
  "#0e1a12","#1f150e","#0e151f","#1a0e12","#0f1a1a",
  "#1a120e","#0e1a1a","#1a1a12","#12100e","#0e121a",
];

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
      { threshold: 0.06 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ============================================================
   PAGE
   ============================================================ */
export default function BooksPage() {
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
        .nav-logo-mark {
          width: 40px; height: 40px;
          display: flex; align-items: center;
          justify-content: center; flex-shrink: 0; overflow: hidden;
        }
        .nav-logo-mark img { width: 100%; height: 100%; object-fit: contain; }
        .nav-logo-text { display: flex; flex-direction: column; }
        .nav-logo-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 600; font-size: 17px; color: #1a1714;
          letter-spacing: 0.01em; line-height: 1.1;
        }
        .nav-logo-sub {
          font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
          color: #6e6660; line-height: 1; margin-top: 2px;
        }
        .nav-links { display: flex; list-style: none; gap: 2.25rem; align-items: center; }
        .nav-links a {
          font-size: 12px; letter-spacing: 0.09em; text-transform: uppercase;
          font-weight: 500; color: #6e6660;
          transition: color 0.22s ease;
        }
        .nav-links a:hover, .nav-links a.active { color: #a8382a; }
        .nav-cta {
          background: #a8382a; color: #fff;
          font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;
          font-weight: 600; padding: 10px 22px;
          border-radius: 2px;
          transition: background 0.22s ease;
          flex-shrink: 0;
        }
        .nav-cta:hover { background: #8a2d21; }
        .hamburger {
          display: none; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 4px;
        }
        .hamburger span {
          display: block; width: 22px; height: 2px; background: #1a1714;
          transition: transform 0.22s ease, opacity 0.22s ease;
        }
        .mobile-drawer {
          display: none; position: fixed; top: 72px; left: 0; right: 0;
          z-index: 199; background: #f7f3ed; flex-direction: column;
          border-top: 1px solid rgba(26,23,20,0.1); padding: 1rem 2rem 2rem;
        }
        .mobile-drawer.open { display: flex; }
        .mobile-drawer a {
          font-size: 14px; font-weight: 500; letter-spacing: 0.08em;
          text-transform: uppercase; color: #1a1714;
          padding: 1rem 0; border-bottom: 1px solid rgba(26,23,20,0.08);
          transition: color 0.22s ease;
        }
        .mobile-drawer a:hover { color: #a8382a; }

        /* ── PAGE WRAPPER — amber bg like FHM ── */
        .page-wrap {
          background: var(--cream);
          min-height: 100vh;
          padding-top: 72px;
        }

        /* ── PAGE HERO STRIP ── */
        .page-hero {
          background: var(--dark);
          padding: 4rem 3rem 3.5rem;
          position: relative; overflow: hidden;
        }
        .page-hero::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 80% 50%, rgba(245,200,66,0.07) 0%, transparent 55%);
          pointer-events: none;
        }
        .page-hero-inner {
          display: flex; align-items: flex-end;
          justify-content: space-between; flex-wrap: wrap; gap: 2rem;
        }
        .page-hero-eyebrow {
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.25em; text-transform: uppercase;
          color: var(--amber); margin-bottom: 0.75rem;
          animation: fadeUp 0.55s ease 0.1s both;
        }
        .page-hero h1 {
          font-size: clamp(3rem, 6vw, 6rem);
          font-weight: 800; text-transform: uppercase;
          color: var(--white); line-height: 1.0;
          letter-spacing: -0.01em;
          animation: fadeUp 0.55s ease 0.2s both;
        }
        .page-hero h1 span { color: var(--amber); }
        .page-hero-count {
          font-size: clamp(1rem, 2vw, 1.4rem);
          font-weight: 700; color: rgba(255,255,255,0.35);
          text-transform: uppercase; letter-spacing: 0.08em;
          animation: fadeUp 0.55s ease 0.3s both;
          align-self: flex-end;
          padding-bottom: 0.5rem;
        }
        .page-hero-count span { color: var(--amber); }

        /* ── FILTER BAR — exact FHM style ── */
        /* ── BOOKS GRID — grouped by era ── */
        .books-grid-section {
          background: var(--cream);
          padding: 3rem 4rem 5rem;
        }
        .era-group { margin-bottom: 4rem; }
        .era-label {
          display: flex; align-items: center; gap: 1.25rem;
          margin-bottom: 2rem;
        }
        .era-rule { flex: 1; height: 1px; background: rgba(26,23,20,0.12); }
        .era-text {
          font-size: 11px; font-weight: 600; letter-spacing: 0.2em;
          text-transform: uppercase; color: #6e6660;
          white-space: nowrap;
        }
        .books-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        /* individual card */
        .book-card {
          position: relative;
          border-radius: var(--radius-card);
          overflow: hidden;
          aspect-ratio: 2 / 3;
          cursor: pointer;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }
        .book-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 28px 56px rgba(13,31,26,0.22);
        }

        /* cover image */
        .book-card img {
          width: 100%; height: 100%; object-fit: cover;
          display: block;
          transition: transform 0.6s ease;
        }
        .book-card:hover img { transform: scale(1.06); }

        /* placeholder when no cover yet */
        .book-cover-placeholder {
          width: 100%; height: 100%;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 2.5rem 2rem; text-align: center; gap: 14px;
          position: relative;
        }
        .book-cover-placeholder::after {
          content: ''; position: absolute; inset: 12px;
          border: 1px solid rgba(245,200,66,0.12);
          border-radius: 10px; pointer-events: none;
        }
        .bcp-year {
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(255,255,255,0.3);
        }
        .bcp-line { width: 28px; height: 2px; background: var(--amber); opacity: 0.35; }
        .bcp-title {
          font-size: clamp(16px, 1.8vw, 20px);
          font-weight: 800; color: var(--white);
          line-height: 1.25; text-transform: uppercase;
          letter-spacing: 0.02em;
        }
        .bcp-author {
          font-size: 10px; letter-spacing: 0.15em;
          text-transform: uppercase; color: rgba(255,255,255,0.25);
        }

        /* text overlay at bottom */
        .book-card-info {
          position: absolute; left: 0; right: 0; bottom: 0;
          background: linear-gradient(to top, rgba(13,31,26,0.92) 0%, rgba(13,31,26,0.5) 50%, transparent 100%);
          padding: 3rem 1rem 1rem;
        }
        .book-card-title-author {
          font-size: clamp(12px, 1.2vw, 14px);
          font-weight: 800; text-transform: uppercase;
          color: var(--white); letter-spacing: 0.04em;
          line-height: 1.2; margin-bottom: 2px;
        }
        .book-card-year {
          font-size: 11px; color: rgba(255,255,255,0.55);
          font-weight: 400;
        }
        .book-card-desc {
          font-size: 12px; color: rgba(255,255,255,0.8);
          line-height: 1.5; font-weight: 400; margin-top: 6px;
          max-height: 0; overflow: hidden;
          transition: max-height 0.3s ease, opacity 0.3s ease;
          opacity: 0;
        }
        .book-card:hover .book-card-desc {
          max-height: 80px; opacity: 1;
        }

        /* amazon button — appears on hover */
        .book-card-btn {
          display: inline-flex; align-items: center; gap: 6px;
          background: var(--gold); color: var(--ink);
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 7px 16px; border-radius: 2px;
          margin-top: 8px;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.25s ease, transform 0.25s ease, background 0.22s ease;
        }
        .book-card:hover .book-card-btn {
          opacity: 1; transform: translateY(0);
        }
        .book-card-btn:hover { background: #b8944e; }

        /* featured badge */
        .featured-badge {
          position: absolute; top: 1rem; right: 1rem;
          background: var(--amber); color: var(--dark);
          font-size: 9px; font-weight: 800;
          letter-spacing: 0.15em; text-transform: uppercase;
          padding: 5px 12px; border-radius: var(--radius-btn);
          z-index: 2;
        }

        /* empty state */
        .empty-state {
          grid-column: 1 / -1;
          text-align: center;
          padding: 5rem 2rem;
          color: var(--text-muted);
        }
        .empty-state p {
          font-size: 1.1rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.1em;
        }

        /* ── GUMROAD SECTION ── */
        .gumroad-section {
          background: var(--dark);
          padding: 5rem 3rem;
        }
        .gumroad-inner { max-width: 960px; margin: 0 auto; text-align: center; }
        .gumroad-eyebrow {
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.25em; text-transform: uppercase;
          color: var(--amber); margin-bottom: 1rem;
        }
        .gumroad-inner h2 {
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 800; text-transform: uppercase;
          color: var(--white); line-height: 1.1;
          margin-bottom: 1.25rem;
        }
        .gumroad-inner > p {
          font-size: 16px; color: rgba(255,255,255,0.5);
          line-height: 1.75; max-width: 520px; margin: 0 auto 3rem;
        }
        .gumroad-cards {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem; margin-bottom: 2.5rem;
        }
        .gumroad-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: var(--radius-card);
          padding: 2rem 1.5rem; text-align: left;
          transition: border-color var(--transition), transform var(--transition);
        }
        .gumroad-card:hover { border-color: rgba(245,200,66,0.25); transform: translateY(-4px); }
        .gumroad-icon { font-size: 28px; margin-bottom: 1rem; display: block; }
        .gumroad-card h3 {
          font-size: 14px; font-weight: 800;
          text-transform: uppercase; letter-spacing: 0.06em;
          color: var(--white); margin-bottom: 0.5rem;
        }
        .gumroad-card p {
          font-size: 13px; color: rgba(255,255,255,0.42); line-height: 1.65;
        }
        .btn-gumroad {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--amber); color: var(--dark);
          font-size: 13px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 14px 32px; border-radius: var(--radius-btn);
          transition: background var(--transition), transform var(--transition);
        }
        .btn-gumroad:hover { background: var(--amber-dark); transform: translateY(-2px); }
        .gumroad-note {
          font-size: 12px; color: rgba(255,255,255,0.2);
          margin-top: 1rem;
        }

        /* ── FOOTER ── */
        footer {
          background: var(--dark); padding: 4rem 3rem 0; color: var(--white);
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .footer-inner {
          display: grid; grid-template-columns: 1.8fr 1fr 1.4fr;
          gap: 4rem; padding-bottom: 3.5rem;
        }
        .footer-brand-name {
          font-size: 1.1rem; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.06em; color: var(--white);
          display: block; margin-bottom: 0.75rem;
        }
        .footer-address {
          font-size: 13px; color: rgba(255,255,255,0.38); line-height: 1.8; margin-bottom: 1.5rem;
        }
        .footer-col h4 {
          font-size: 11px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: var(--amber); margin-bottom: 1.25rem;
        }
        .footer-col ul { list-style: none; }
        .footer-col li { margin-bottom: 0.6rem; }
        .footer-col a {
          font-size: 14px; font-weight: 600; text-transform: uppercase;
          letter-spacing: 0.06em; color: rgba(255,255,255,0.5);
          transition: color var(--transition);
        }
        .footer-col a:hover { color: var(--amber); }
        .footer-newsletter {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: var(--radius-card); padding: 2rem;
        }
        .footer-newsletter h3 {
          font-size: 1.2rem; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.04em; color: var(--white); margin-bottom: 0.4rem;
        }
        .footer-newsletter p { font-size: 13px; color: rgba(255,255,255,0.38); margin-bottom: 1.25rem; }
        .newsletter-input {
          width: 100%; background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12); border-radius: var(--radius-btn);
          color: var(--white); font-size: 13px; padding: 12px 16px;
          outline: none; margin-bottom: 0.75rem;
          transition: border-color var(--transition); font-family: var(--sans);
        }
        .newsletter-input::placeholder { color: rgba(255,255,255,0.2); }
        .newsletter-input:focus { border-color: var(--amber); }
        .btn-subscribe {
          width: 100%; background: var(--amber); color: var(--dark);
          border: none; cursor: pointer; font-size: 13px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 13px; border-radius: var(--radius-btn);
          transition: background var(--transition); font-family: var(--sans);
        }
        .btn-subscribe:hover { background: var(--amber-dark); }
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.07); padding: 1.5rem 0;
          display: flex; align-items: center;
          justify-content: space-between; flex-wrap: wrap; gap: 1rem;
        }
        .footer-legal { display: flex; gap: 2rem; flex-wrap: wrap; }
        .footer-legal a, .footer-copy {
          font-size: 12px; color: rgba(255,255,255,0.22);
          transition: color var(--transition);
        }
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
          .books-grid { grid-template-columns: repeat(3, 1fr); }
          .gumroad-cards { grid-template-columns: 1fr 1fr; }
          .footer-inner { grid-template-columns: 1fr 1fr; gap: 2.5rem; }
        }
        @media (max-width: 768px) {
          .nav { padding: 0 1.25rem; }
          .nav-links, .nav-cta { display: none; }
          .hamburger { display: flex; }
          .nav-logo-sub { display: none; }
          .page-hero { padding: 2.5rem 1.25rem 2rem; }
          .page-hero h1 { font-size: clamp(2rem, 8vw, 3rem); }
          
          .filter-btns { flex-wrap: wrap; gap: 0.5rem; }
          .filter-search { width: 100%; }
          .filter-count { display: none; }
          .books-grid-section { padding: 2rem 1.25rem 4rem; }
          .books-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
          .book-card-info { padding: 0.75rem; }
          .book-card-title { font-size: 0.8rem; }
          .gumroad-section { padding: 4rem 1.25rem; }
          .gumroad-cards { grid-template-columns: 1fr; }
          footer { padding: 3rem 1.25rem 0; }
          .footer-inner { grid-template-columns: 1fr; gap: 2rem; }
          .footer-bottom { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
        }
        @media (max-width: 480px) {
          .books-grid { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
          
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
          <li><a href="/books" className="active">Books</a></li>
          <li><a href="/cooking-school">Cooking School</a></li>
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
        {[["Books","/books"],["Cooking School","/cooking-school"],["Write Your Cookbook","/write-your-cookbook"],["Ghostwriting","/ghostwriting"],["About","/about"],["Get in Touch","/contact"]].map(([label, href]) => (
          <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
      </div>

      <div className="page-wrap">

        {/* ── PAGE HERO ── */}
        <div className="page-hero">
          <div className="page-hero-inner">
            <div>
              <p className="page-hero-eyebrow">Susan Herrmann Loomis</p>
              <h1>My <span>Books</span></h1>
            </div>
            <p className="page-hero-count">
              <span>14</span> books
            </p>
          </div>
        </div>

        {/* ── FILTER BAR ── */}
        {/* ── BOOKS GRID — grouped by era ── */}
        <section className="books-grid-section">

          {[
            { era: "recent", label: "2010 — Present", books: BOOKS.filter(b => b.era === "recent") },
            { era: "mid",    label: "2000 — 2009",    books: BOOKS.filter(b => b.era === "mid") },
            { era: "early",  label: "1985 — 1999",    books: BOOKS.filter(b => b.era === "early") },
          ].map(group => (
            <div className="era-group" key={group.era}>
              <div className="era-label">
                <span className="era-rule" />
                <span className="era-text">{group.label}</span>
                <span className="era-rule" />
              </div>
              <div className="books-grid">
                {group.books.map((book, i) => (
                  <a
                    href={book.amazon}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="book-card"
                    key={`${book.year}-${book.title}`}
                  >
                    {book.featured && (
                      <span className="featured-badge">Latest</span>
                    )}
                    <img src={book.img} alt={book.title} />
                    <div className="book-card-info">
                      <p className="book-card-year">{book.year}</p>
                      <p className="book-card-title-author">{book.title}</p>
                      <p className="book-card-desc">{book.description}</p>
                      <span className="book-card-btn">Buy on Amazon →</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}

        </section>

        {/* ── GUMROAD ── */}
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