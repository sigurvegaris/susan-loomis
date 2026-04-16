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
    amazon: "https://www.amazon.com/s?k=Plat+du+Jour+Susan+Herrmann+Loomis",
    img: "/images/covers/plat-du-jour.jpg",
    featured: true,
  },
  {
    year: "2015",
    title: "In a French Kitchen",
    era: "recent",
    description: "How the French really cook. Tips, tricks, guides, menus, and more than 80 recipes drawn from the real kitchens of France.",
    amazon: "https://www.amazon.com/s?k=In+a+French+Kitchen+Susan+Herrmann+Loomis",
    img: "/images/covers/in-a-french-kitchen.jpg",
  },
  {
    year: "2018",
    title: "French Grill",
    era: "recent",
    description: "Ingredients forward, simple, beautifully grilled — French grilling will change the way you cook outdoors forever.",
    amazon: "https://www.amazon.com/s?k=French+Grill+Susan+Herrmann+Loomis",
    img: "/images/covers/french-grill.jpg",
  },
  {
    year: "2010",
    title: "Nuts in the Kitchen",
    era: "mid",
    description: "A comprehensive collection of nut recipes for every meal — sweet, savory, and everything in between.",
    amazon: "https://www.amazon.com/s?k=Nuts+in+the+Kitchen+Susan+Herrmann+Loomis",
    img: "/images/covers/nuts-in-the-kitchen.jpg",
  },
  {
    year: "2005",
    title: "Cooking at Home on Rue Tatin",
    era: "mid",
    description: "Award-winning author and professional chef Susan Herrmann Loomis takes cooks on a journey through French home cooking.",
    amazon: "https://www.amazon.com/s?k=Cooking+at+Home+on+Rue+Tatin",
    img: "/images/covers/cooking-at-home-on-rue-tatin.jpg",
  },
  {
    year: "2001",
    title: "On Rue Tatin",
    era: "early",
    description: "Part memoir, part cookbook — the story of arriving in Paris with little more than a student loan, and finding a life built around French food.",
    amazon: "https://www.amazon.com/s?k=On+Rue+Tatin+Susan+Herrmann+Loomis",
    img: "/images/covers/on-rue-tatin.jpg",
  },
  {
    year: "1991",
    title: "Farmhouse Cookbook",
    era: "early",
    description: "A beloved classic. Everything made from it is very good — an extensive and deeply satisfying collection of farmhouse recipes.",
    amazon: "https://www.amazon.com/s?k=Farmhouse+Cookbook+Susan+Herrmann+Loomis",
    img: "/images/covers/farmhouse-cookbook.jpg",
  },
  {
    year: "1996",
    title: "French Farmhouse Cookbook",
    era: "early",
    description: "As much a book of inspiration as a recipe collection — over 250 uncommonly delicious recipes capturing rustic, richly flavored farmhouse cooking.",
    amazon: "https://www.amazon.com/s?k=French+Farmhouse+Cookbook+Susan+Herrmann+Loomis",
    img: "/images/covers/french-farmhouse-cookbook.jpg",
  },
  {
    year: "2000",
    title: "Italian Farmhouse Cookbook",
    era: "early",
    description: "The essence of Italian cooking — Susan goes to the source, where the techniques are still genuine and the recipes tied to the culture.",
    amazon: "https://www.amazon.com/s?k=Italian+Farmhouse+Cookbook+Susan+Herrmann+Loomis",
    img: "/images/covers/italian-farmhouse-cookbook.jpg",
  },
  {
    year: "1999",
    title: "Tarte Tatin",
    era: "early",
    description: "Further adventures in a small French town — a delightful follow-up to On Rue Tatin, rich with food, life, and Normandy.",
    amazon: "https://www.amazon.com/s?k=Tarte+Tatin+Susan+Herrmann+Loomis",
    img: "/images/covers/tarte-tatin.jpg",
  },
  {
    year: "1993",
    title: "Clambakes & Fish Fries",
    era: "early",
    description: "From clambakes to shrimp boils to oyster galas — nothing is more pleasurable or nourishing than a great seafood celebration.",
    amazon: "https://www.amazon.com/s?k=Clambakes+Fish+Fries+Susan+Herrmann+Loomis",
    img: "/images/covers/clambakes-and-fish-fries.jpg",
  },
  {
    year: "1988",
    title: "Great American Seafood Cookbook",
    era: "early",
    description: "The seafood-lover's bible — for health, variety, and flavor, the definitive guide to American seafood cooking.",
    amazon: "https://www.amazon.com/s?k=Great+American+Seafood+Cookbook+Susan+Herrmann+Loomis",
    img: "/images/covers/great-american-seafood-cookbook.jpg",
  },
  {
    year: "1994",
    title: "A Holiday Cookbook",
    era: "early",
    description: "Les Recettes de la Saison — a holiday cookbook from the chefs of La Madeleine and Susan Herrmann Loomis.",
    amazon: "https://www.amazon.com/s?k=Holiday+Cookbook+La+Madeleine+Susan+Herrmann+Loomis",
    img: "/images/covers/a-holiday-cookbook.jpg",
  },
  {
    year: "1985",
    title: "The Food Lover's Guide to Paris",
    era: "early",
    description: "An internationally acclaimed guide to French cuisine — written by an award-winning cookbook author and restaurant critic for France.",
    amazon: "https://www.amazon.com/s?k=Food+Lovers+Guide+Paris+Susan+Herrmann+Loomis",
    img: "/images/covers/food-lovers-guide-paris.jpg",
  },
  {
    year: "",
    title: "Les Meilleures Recettes",
    era: "early",
    description: "The best recipes from the regions of France — a special book that will inspire your palate and ignite a passion for great food.",
    amazon: "https://www.amazon.com/s?k=Les+Meilleures+Recettes+Susan+Herrmann+Loomis",
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
  const [filter, setFilter] = useState<"all" | "early" | "mid" | "recent">("all");
  const [search, setSearch] = useState("");

  const filtered = BOOKS.filter((b) => {
    const matchesEra =
      filter === "all" ? true :
      filter === "early"  ? b.era === "early" :
      filter === "mid"    ? b.era === "mid" :
      b.era === "recent";
    const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase());
    return matchesEra && matchesSearch;
  });

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
        .nav-logo-name {
          font-weight: 700; font-size: 14px; color: var(--white);
          letter-spacing: 0.04em; text-transform: uppercase; line-height: 1.1;
        }
        .nav-logo-sub {
          font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(255,255,255,0.4); line-height: 1;
        }
        .nav-links { display: flex; list-style: none; gap: 2.25rem; align-items: center; }
        .nav-links a {
          font-size: 12px; letter-spacing: 0.09em; text-transform: uppercase;
          font-weight: 600; color: rgba(255,255,255,0.65);
          transition: color var(--transition);
        }
        .nav-links a:hover, .nav-links a.active { color: var(--amber); }
        .nav-cta {
          background: var(--amber); color: var(--dark);
          font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;
          font-weight: 700; padding: 10px 22px;
          border-radius: var(--radius-btn);
          transition: background var(--transition), transform var(--transition);
          flex-shrink: 0;
        }
        .nav-cta:hover { background: var(--amber-dark); transform: translateY(-1px); }
        .hamburger {
          display: none; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 4px;
        }
        .hamburger span {
          display: block; width: 22px; height: 2px; background: var(--white);
          transition: transform var(--transition), opacity var(--transition);
        }
        .mobile-drawer {
          display: none; position: fixed; top: 68px; left: 0; right: 0;
          z-index: 199; background: var(--dark); flex-direction: column;
          border-top: 1px solid rgba(255,255,255,0.07); padding: 1rem 2rem 2rem;
        }
        .mobile-drawer.open { display: flex; }
        .mobile-drawer a {
          font-size: 15px; font-weight: 600; letter-spacing: 0.08em;
          text-transform: uppercase; color: rgba(255,255,255,0.75);
          padding: 1rem 0; border-bottom: 1px solid rgba(255,255,255,0.07);
          transition: color var(--transition);
        }
        .mobile-drawer a:hover { color: var(--amber); }

        /* ── PAGE WRAPPER — amber bg like FHM ── */
        .page-wrap {
          background: var(--cream);
          min-height: 100vh;
          padding-top: 68px;
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
        .filter-bar {
          background: var(--cream);
          padding: 1.5rem 3rem;
          display: flex; align-items: center;
          justify-content: space-between;
          flex-wrap: wrap; gap: 1rem;
          position: sticky; top: 68px; z-index: 10;
          border-bottom: 1px solid rgba(13,31,26,0.1);
        }
        .filter-left { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
        .filter-toggle {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--dark); color: var(--amber);
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 10px 20px; border-radius: var(--radius-btn);
          border: none; cursor: pointer;
          transition: background var(--transition), transform var(--transition);
          font-family: var(--sans);
        }
        .filter-toggle:hover { background: #1a3030; transform: translateY(-1px); }
        .filter-toggle svg { width: 14px; height: 14px; flex-shrink: 0; }
        .filter-btn {
          background: transparent; color: var(--text-dark);
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          padding: 9px 20px; border-radius: var(--radius-btn);
          border: 2px solid rgba(13,31,26,0.2);
          cursor: pointer;
          transition: all var(--transition);
          font-family: var(--sans);
        }
        .filter-btn:hover { border-color: var(--text-dark); }
        .filter-btn.active { background: var(--dark); color: var(--amber); border-color: var(--dark); }

        /* search */
        .filter-search {
          background: transparent;
          border: 2px solid rgba(13,31,26,0.2);
          color: var(--text-dark);
          font-size: 13px; font-weight: 400;
          padding: 9px 16px; border-radius: var(--radius-btn);
          outline: none; width: 200px;
          transition: border-color var(--transition);
          font-family: var(--sans);
        }
        .filter-search::placeholder { color: rgba(13,31,26,0.35); }
        .filter-search:focus { border-color: var(--text-dark); }

        .filter-count {
          font-size: 14px; font-weight: 700;
          color: rgba(13,31,26,0.45);
          letter-spacing: 0.04em;
          white-space: nowrap;
        }
        .filter-count span { color: var(--text-dark); }

        /* ── BOOKS GRID — 3 col, tall cards, FHM style ── */
        .books-grid-section {
          background: var(--cream);
          padding: 2.5rem 3rem 5rem;
        }
        .books-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
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

        /* text overlay at bottom — always visible, like FHM */
        .book-card-info {
          position: absolute; left: 0; right: 0; bottom: 0;
          background: linear-gradient(to top, rgba(13,31,26,0.97) 0%, rgba(13,31,26,0.7) 60%, transparent 100%);
          padding: 2.5rem 1.5rem 1.5rem;
        }
        .book-card-title-author {
          font-size: clamp(13px, 1.3vw, 15px);
          font-weight: 800; text-transform: uppercase;
          color: var(--white); letter-spacing: 0.04em;
          line-height: 1.2; margin-bottom: 4px;
        }
        .book-card-year {
          font-size: 13px; color: rgba(255,255,255,0.65);
          font-weight: 400; margin-bottom: 6px;
        }
        .book-card-desc {
          font-size: 13px; color: rgba(255,255,255,0.75);
          line-height: 1.55; font-weight: 400;
        }

        /* amazon button — appears on hover */
        .book-card-btn {
          display: inline-flex; align-items: center; gap: 6px;
          background: var(--amber); color: var(--dark);
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 8px 18px; border-radius: var(--radius-btn);
          margin-top: 10px;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.25s ease, transform 0.25s ease, background var(--transition);
        }
        .book-card:hover .book-card-btn {
          opacity: 1;
          transform: translateY(0);
        }
        .book-card-btn:hover { background: var(--amber-dark); }

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
        .footer-social { display: flex; gap: 0.75rem; }
        .footer-social a {
          font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: rgba(255,255,255,0.28);
          border: 1px solid rgba(255,255,255,0.1); padding: 6px 14px;
          border-radius: var(--radius-btn);
          transition: color var(--transition), border-color var(--transition);
        }
        .footer-social a:hover { color: var(--amber); border-color: var(--amber); }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .nav { padding: 0 2rem; }
          .books-grid { grid-template-columns: repeat(2, 1fr); }
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
          .filter-bar { padding: 1rem 1.25rem; top: 68px; flex-wrap: wrap; gap: 0.75rem; }
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
          .filter-bar { flex-direction: column; align-items: flex-start; }
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
          <li><a href="/books" className="active">Books</a></li>
          <li><a href="/cooking-school">Cooking School</a></li>
          <li><a href="/writing-courses">Writing Courses</a></li>
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
        {[["Books","/books"],["Cooking School","/cooking-school"],["Writing Courses","/writing-courses"],["Ghostwriting","/ghostwriting"],["About","/about"],["Get in Touch","/contact"]].map(([label, href]) => (
          <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
      </div>

      <div className="page-wrap">

        {/* ── PAGE HERO ── */}
        <div className="page-hero">
          <div className="page-hero-inner">
            <div>
              <p className="page-hero-eyebrow">Susan Herrmann Loomis</p>
              <h1>The <span>Books</span></h1>
            </div>
            <p className="page-hero-count">
              <span>{filtered.length}</span> of {BOOKS.length} books
            </p>
          </div>
        </div>

        {/* ── FILTER BAR ── */}
        <div className="filter-bar">
          <div className="filter-left">
            {/* filter toggle pill — styled like FHM "+ FILTERS" button */}
            <button className="filter-toggle">
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="7" y1="1" x2="7" y2="13"/>
                <line x1="1" y1="7" x2="13" y2="7"/>
              </svg>
              Filters
            </button>

            {(["all","early","mid","recent"] as const).map((f) => {
              const labels: Record<string, string> = { all: "All books", early: "1996 – 2002", mid: "2003 – 2010", recent: "2011 – 2018" };
              return (
                <button
                  key={f}
                  className={`filter-btn${filter === f ? " active" : ""}`}
                  onClick={() => setFilter(f)}
                >
                  {labels[f]}
                </button>
              );
            })}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <input
              className="filter-search"
              type="text"
              placeholder="Search books…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <p className="filter-count">
              <span>{filtered.length}</span> books
            </p>
          </div>
        </div>

        {/* ── BOOKS GRID ── */}
        <section className="books-grid-section">
          <div className="books-grid">
            {filtered.length === 0 ? (
              <div className="empty-state">
                <p>No books match your search.</p>
              </div>
            ) : filtered.map((book, i) => (
              <a
                href={book.amazon}
                target="_blank"
                rel="noopener noreferrer"
                className={`book-card reveal-up delay-${(i % 3) + 1}`}
                key={`${book.year}-${book.title}`}
                style={{ textDecoration: "none" }}
              >
                {/* Featured badge */}
                {book.featured && (
                  <span className="featured-badge">James Beard Nominated</span>
                )}

                {/* Cover — swap placeholder with real image when available */}
                {book.img ? (
                  <img src={book.img} alt={book.title} />
                ) : (
                  <div
                    className="book-cover-placeholder"
                    style={{ background: CARD_COLORS[i % CARD_COLORS.length] }}
                  >
                    <span className="bcp-year">{book.year}</span>
                    <div className="bcp-line" />
                    {/*
                      PLACEHOLDER: replace this entire .book-cover-placeholder div with:
                      <img src="/images/covers/your-cover-filename.jpg" alt={book.title} />
                      once Susan provides real cover images.
                    */}
                    <span className="bcp-title">{book.title}</span>
                    <div className="bcp-line" />
                    <span className="bcp-author">Susan Herrmann Loomis</span>
                  </div>
                )}

                {/* Info overlay — always visible at bottom, like FHM */}
                <div className="book-card-info">
                  <p className="book-card-title-author">{book.title}</p>
                  <p className="book-card-year">{book.year}</p>
                  <p className="book-card-desc">{book.description}</p>
                  <span className="book-card-btn">Buy on Amazon →</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── GUMROAD ── */}
        <section className="gumroad-section">
          <div className="gumroad-inner">
            <p className="gumroad-eyebrow reveal">Digital Downloads</p>
            <h2 className="reveal">Recipe Downloads<br />&amp; Digital Extras</h2>
            <p className="reveal">
              Downloadable recipe collections, seasonal menus, and exclusive content
              — straight from Susan&apos;s kitchen to yours.
            </p>

            <div className="gumroad-cards">
              {[
                { icon: "📄", title: "Seasonal Recipe Packs", desc: "Curated collections by season — spring markets, summer grilling, autumn braises, winter warmers." },
                { icon: "🍽️", title: "Complete French Menus", desc: "Full three-course menus with shopping lists, timelines, and wine pairing notes." },
                { icon: "📚", title: "Technique Guides", desc: "Step-by-step guides to essential French techniques drawn from Susan's decades of teaching." },
              ].map((c, i) => (
                <div className={`gumroad-card reveal delay-${i + 1}`} key={c.title}>
                  <span className="gumroad-icon">{c.icon}</span>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>

            {/* PLACEHOLDER: replace # with Susan's confirmed Gumroad store URL */}
            <a href="#" className="btn-gumroad reveal" target="_blank" rel="noopener noreferrer">
              Visit the digital store →
            </a>
            <p className="gumroad-note">
              {/* PLACEHOLDER: Gumroad URL to be confirmed by Susan */}
              Store link coming soon · contact susan@onruetatin.com for early access
            </p>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer>
          <div className="footer-inner">
            <div>
              <span className="footer-brand-name">Susan Herrmann Loomis</span>
              <p className="footer-address">
                On Rue Tatin Cooking School<br />
                Louviers, Normandy, France &amp; Paris, France
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