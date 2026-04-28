"use client";

import { useEffect, useRef, useState } from "react";

/* ============================================================
   DATA
   ============================================================ */
const BOOKS = [
  { year: "2024", title: "Plat du Jour", amazon: "https://www.amazon.com/Plat-Jour-French-Dinners-Made/dp/1682684504/", img: "/images/covers/plat-du-jour.jpg" },
  { year: "2015", title: "In a French Kitchen", amazon: "https://www.amazon.com/French-Kitchen-Traditions-Everyday-Cooking/dp/1592408869/", img: "/images/covers/in-a-french-kitchen.jpg" },
  { year: "2018", title: "French Grill", amazon: "https://www.amazon.com/French-Grill-Refined-Rustic-Recipes/dp/1682680843/", img: "/images/covers/french-grill.jpg" },
  { year: "2010", title: "Nuts in the Kitchen", amazon: "https://www.amazon.com/Nuts-Kitchen-Recipes-Every-Occasion-ebook/dp/B003GFIVZ2/", img: "/images/covers/nuts-in-the-kitchen.jpg" },
  { year: "2005", title: "Cooking at Home on Rue Tatin", amazon: "https://www.amazon.com/Cooking-at-Home-Rue-Tatin/dp/0060758171/", img: "/images/covers/cooking-at-home-on-rue-tatin.jpg" },
  { year: "2001", title: "On Rue Tatin", amazon: "https://www.amazon.com/Rue-Tatin-Living-Cooking-French/dp/0767904559/", img: "/images/covers/on-rue-tatin.jpg" },
  { year: "1996", title: "French Farmhouse Cookbook", amazon: "https://www.amazon.com/French-Farmhouse-Cookbook-Herrmann-Loomis/dp/0761106243/", img: "/images/covers/french-farmhouse-cookbook.jpg" },
  { year: "2000", title: "Italian Farmhouse Cookbook", amazon: "https://www.amazon.com/Italian-Farmhouse-Cookbook-Herrmann-Loomis/dp/0761105271/", img: "/images/covers/italian-farmhouse-cookbook.jpg" },
  { year: "1999", title: "Tarte Tatin", amazon: "https://www.amazon.com/Tarte-Tatin-More-Belle-Vie/dp/0007235224/", img: "/images/covers/tarte-tatin.jpg" },
  { year: "1993", title: "Clambakes & Fish Fries", amazon: "https://www.amazon.com/Clambakes-Fries-Susan-Herrmann-Loomis/dp/1563056712/", img: "/images/covers/clambakes-and-fish-fries.jpg" },
  { year: "1991", title: "Farmhouse Cookbook", amazon: "https://www.amazon.com/Farmhouse-Cookbook-Susan-Herrmann-Loomis/dp/1563051257/", img: "/images/covers/farmhouse-cookbook.jpg" },
  { year: "1988", title: "Great American Seafood Cookbook", amazon: "https://www.amazon.com/Sea-Shining-American-Seafood-Cookbook/dp/B002G2OIHQ/", img: "/images/covers/great-american-seafood-cookbook.jpg" },
  { year: "1994", title: "A Holiday Cookbook", amazon: "https://www.amazon.com/Recettes-Saison-Cookbook-Madeleine-Herrmann/dp/0964395517/", img: "/images/covers/a-holiday-cookbook.jpg" },
  { year: "1985", title: "The Food Lover\'s Guide to Paris", amazon: "https://www.amazon.com/Food-Lovers-Guide-France/dp/041314660X/", img: "/images/covers/food-lovers-guide-paris.jpg" },
  { year: "", title: "Les Meilleures Recettes", amazon: "https://www.amazon.com/Meilleures-recettes-regions-France/dp/2253165964/", img: "/images/covers/les-meilleures-recettes.jpg" },
];
const SERVICES = [
  {
    label: "Cooking School",
    title: "ON RUE TATIN",
    sub: "Paris, France",
    href: "/cooking-school",
    btn: "Go to page",
    img: "/images/susan-teaching.jpg",
  },
  {
    label: "Write Your Cookbook",
    title: "WRITE YOUR COOKBOOK",
    sub: "Your story, your recipes",
    href: "/write-your-cookbook",
    btn: "Let's write",
    img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&auto=format&q=75",
  },
  {
    label: "Ghostwriting",
    title: "GHOSTWRITING",
    sub: "Your Story, Expertly Told",
    href: "/ghostwriting",
    btn: "Learn more",
    img: "/images/stackofbooks.jpg",
  },
];
/* ============================================================
   SCROLL REVEAL HOOK
   ============================================================ */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(
      ".reveal,.reveal-up,.reveal-left,.reveal-right"
    );
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ============================================================
   PAGE
   ============================================================ */
export default function Home() {
  useReveal();
  const [menuOpen, setMenuOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  /* drag-to-scroll */
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    let down = false, sx = 0, sl = 0;
    const md = (e: MouseEvent) => { down = true; sx = e.pageX - el.offsetLeft; sl = el.scrollLeft; };
    const mu = () => (down = false);
    const mm = (e: MouseEvent) => { if (!down) return; e.preventDefault(); el.scrollLeft = sl - (e.pageX - el.offsetLeft - sx) * 1.3; };
    el.addEventListener("mousedown", md);
    el.addEventListener("mouseleave", mu);
    el.addEventListener("mouseup", mu);
    el.addEventListener("mousemove", mm);
    return () => { el.removeEventListener("mousedown", md); el.removeEventListener("mouseleave", mu); el.removeEventListener("mouseup", mu); el.removeEventListener("mousemove", mm); };
  }, []);

  /* carousel arrow scroll */
  const scrollCarousel = (dir: number) => {
    if (carouselRef.current) carouselRef.current.scrollBy({ left: dir * 620, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&display=swap');

        /* ================================================
           NAV
           ================================================ */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          height: 72px;
          background: #f7f3ed;
          display: flex; align-items: center;
          justify-content: space-between;
          padding: 0 3rem;
          border-bottom: 1px solid rgba(26,23,20,0.1);
        }
        .nav-logo {
          display: flex; align-items: center; gap: 12px;
        }
        .nav-logo-mark {
          width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; overflow: hidden; background: transparent;
        }
        .nav-logo-mark img { width: 100%; height: 100%; object-fit: contain; }
        .nav-logo-text { display: flex; flex-direction: column; }
        .nav-logo-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 700; font-size: 19px;
          color: #1a1714; letter-spacing: 0.01em; line-height: 1.1;
        }
        .nav-logo-sub {
          font-size: 10px; letter-spacing: 0.12em;
          text-transform: uppercase; color: #6e6660;
          line-height: 1; margin-top: 2px;
        }
        .nav-links {
          display: flex; list-style: none; gap: 2.25rem; align-items: center;
        }
        .nav-links a {
          font-size: 12px; letter-spacing: 0.09em;
          text-transform: uppercase; font-weight: 600;
          color: #6e6660;
          transition: color 0.22s ease;
        }
        .nav-links a:hover, .nav-links a.active { color: #a8382a; }
        .nav-cta {
          background: #a8382a; color: #fff;
          font-size: 12px; letter-spacing: 0.1em;
          text-transform: uppercase; font-weight: 600;
          padding: 10px 22px; border-radius: 2px;
          transition: background 0.22s ease;
          flex-shrink: 0;
        }
        .nav-cta:hover { background: #8a2d21; }
        .hamburger {
          display: none; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 4px;
        }
        .hamburger span {
          display: block; width: 22px; height: 2px;
          background: #1a1714;
          transition: transform 0.22s ease, opacity 0.22s ease;
        }
        .mobile-drawer {
          display: none; position: fixed;
          top: 72px; left: 0; right: 0; z-index: 199;
          background: #f7f3ed;
          flex-direction: column;
          border-top: 1px solid rgba(26,23,20,0.1);
          padding: 1rem 2rem 2rem;
        }
        .mobile-drawer.open { display: flex; }
        .mobile-drawer a {
          font-size: 14px; font-weight: 500;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: #1a1714;
          padding: 1rem 0;
          border-bottom: 1px solid rgba(26,23,20,0.08);
          transition: color 0.22s ease;
        }
        .mobile-drawer a:hover { color: #a8382a; }

        /* ================================================
           HERO
           ================================================ */
        .hero {
          min-height: 100vh;
          padding-top: 72px;
          background: var(--cream);
          display: flex; align-items: center;
          justify-content: center;
          padding-left: 6rem; padding-right: 6rem;
          position: relative;
          overflow: hidden;
        }
        .hero-inner {
          display: flex; align-items: center;
          gap: 5rem; width: 100%; max-width: 1200px;
        }
        .hero-img-wrap {
          flex: 0 0 42%;
          height: 520px;
          border-radius: var(--radius-card);
          overflow: hidden;
          flex-shrink: 0;
          position: relative;
        }
        .hero-img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center 10%;
          transition: transform 7s ease;
        }
        .hero:hover .hero-img-wrap img { transform: scale(1.06); }
        .hero-card {
          background: transparent;
          padding: 3rem 3.5rem;
          max-width: 560px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .hero-titles {
          display: flex; flex-wrap: wrap; align-items: center;
          gap: 0.4rem; margin-bottom: 1.5rem;
          animation: fadeUp 0.6s ease 0.1s both;
        }
        .hero-titles span {
          font-size: 11px; font-weight: 600; letter-spacing: 0.18em;
          text-transform: uppercase; color: #6e6660;
        }
        .hero-title-dot { color: #c8a96e !important; font-size: 14px; letter-spacing: 0 !important; }
        .hero-card h1 {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2.4rem, 4vw, 3.8rem);
          font-weight: 700; font-style: italic;
          color: #a8382a; line-height: 1.15;
          margin-bottom: 1.25rem;
          animation: fadeUp 0.6s ease 0.2s both;
        }
        .hero-rule {
          width: 48px; height: 2px; background: #c8a96e;
          margin-bottom: 1.5rem;
          animation: fadeUp 0.6s ease 0.3s both;
        }
        .hero-card p {
          font-size: 16px; color: #6e6660;
          line-height: 1.85; margin-bottom: 1rem;
          font-weight: 400;
          animation: fadeUp 0.6s ease 0.35s both;
        }
        .hero-card p:last-of-type { margin-bottom: 2.5rem; }
        .hero-btns {
          display: flex; flex-direction: column; gap: 1rem;
          animation: fadeUp 0.6s ease 0.5s both;
        }
        .btn-hero {
          display: flex; align-items: center; justify-content: center;
          text-align: center;
          width: 100%;
          font-size: 12px; font-weight: 600;
          letter-spacing: 0.15em; text-transform: uppercase;
          padding: 16px 28px;
          border-radius: var(--radius-btn);
          border: 1.5px solid #1a1714;
          color: #1a1714;
          background: transparent;
          transition: background 0.22s ease, color 0.22s ease;
        }
        .btn-hero:hover { background: #2e7175; border-color: #2e7175; color: #f7f3ed; }
        .btn-hero-ghost {
          display: flex; align-items: center; justify-content: center;
          text-align: center;
          width: 100%;
          font-size: 12px; font-weight: 600;
          letter-spacing: 0.15em; text-transform: uppercase;
          padding: 16px 28px;
          border-radius: var(--radius-btn);
          border: 1.5px solid var(--gold);
          color: #1a1714;
          background: var(--gold);
          transition: background 0.22s ease, color 0.22s ease;
        }
        .btn-hero-ghost:hover { background: var(--gold-dark); border-color: var(--gold-dark); }

        /* ================================================
           BOOKS SECTION
           ================================================ */
        .books-section {
          background: var(--cream);
          padding: 5rem 4rem;
        }
        .books-header {
          display: flex; align-items: center;
          justify-content: space-between;
          margin-bottom: 2.5rem; flex-wrap: wrap; gap: 1rem;
        }
        .books-header h2 {
          font-size: clamp(1.8rem, 3vw, 2.8rem);
          font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.01em; color: var(--text-dark);
        }
        .btn-outline-dark {
          display: inline-flex; align-items: center;
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 11px 24px;
          border-radius: var(--radius-btn);
          border: 2px solid var(--text-dark);
          color: var(--text-dark);
          background: transparent;
          transition: background var(--transition), color var(--transition), transform var(--transition);
          white-space: nowrap;
        }
        .btn-outline-dark:hover { background: #2e7175; border-color: #2e7175; color: #f7f3ed; transform: translateY(-1px); }

        /* carousel */
        .books-carousel-wrap { position: relative; }
        .books-carousel {
          display: flex; gap: 16px;
          overflow-x: auto; scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          cursor: grab; padding-bottom: 0.5rem;
        }
        .books-carousel::-webkit-scrollbar { display: none; }
        .books-carousel:active { cursor: grabbing; }

        .book-card {
          flex: 0 0 210px; height: 300px;
          border-radius: var(--radius-card);
          overflow: hidden;
          scroll-snap-align: start;
          position: relative;
          background: var(--dark-card);
          transition: transform 0.35s ease, box-shadow 0.35s ease;
          cursor: pointer;
        }
        .book-card:hover { transform: translateY(-8px); box-shadow: 0 24px 48px rgba(13,31,26,0.25); }
        .book-card img { width: 100%; height: 100%; object-fit: cover; }
        /* placeholder when no cover image */
        .book-placeholder-inner {
          width: 100%; height: 100%;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 2rem 1.25rem; text-align: center; gap: 10px;
          position: relative;
        }
        .book-placeholder-inner::after {
          content: ''; position: absolute; inset: 10px;
          border: 1px solid rgba(245,200,66,0.15);
          border-radius: 10px; pointer-events: none;
        }
        .bp-year {
          font-size: 10px; letter-spacing: 0.2em;
          text-transform: uppercase; color: rgba(255,255,255,0.35);
          font-weight: 600;
        }
        .bp-divider { width: 20px; height: 1px; background: var(--amber); opacity: 0.4; }
        .bp-title {
          font-size: 15px; font-weight: 700;
          color: var(--white); line-height: 1.3;
          text-transform: uppercase; letter-spacing: 0.02em;
        }
        .bp-author { font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.3); }

        /* hover overlay on book cards */
        .book-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(13,31,26,0.95) 0%, transparent 50%);
          opacity: 0; transition: opacity 0.3s ease;
          display: flex; flex-direction: column;
          justify-content: flex-end; padding: 1.25rem;
          border-radius: var(--radius-card);
        }
        .book-card:hover .book-overlay { opacity: 1; }
        .book-overlay-year { font-size: 10px; color: var(--amber); letter-spacing: 0.15em; text-transform: uppercase; font-weight: 600; margin-bottom: 4px; }
        .book-overlay-title { font-size: 14px; font-weight: 700; color: var(--white); text-transform: uppercase; line-height: 1.25; margin-bottom: 8px; }
        .book-overlay-link {
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--dark); background: var(--amber);
          padding: 6px 14px; border-radius: var(--radius-btn);
          width: fit-content;
          transition: background var(--transition);
        }
        .book-overlay-link:hover { background: var(--amber-dark); }

        /* carousel arrows */
        .carousel-arrows {
          display: flex; gap: 0.75rem;
          justify-content: flex-end;
          margin-top: 1.5rem;
        }
        .carousel-arrow {
          width: 40px; height: 40px;
          border-radius: 50%;
          border: 2px solid var(--text-dark);
          background: transparent;
          color: var(--text-dark);
          font-size: 16px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background var(--transition), color var(--transition), transform var(--transition);
        }
        .carousel-arrow:hover { background: #2e7175; border-color: #2e7175; color: #f7f3ed; transform: scale(1.05); }

        /* ================================================
           ABOUT SUSAN (FHM "About Frans Hals" card style)
           ================================================ */
        .about-section {
          background: #2e7175;
          padding: 5rem 4rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .about-card-wrap {
          position: relative;
          width: 100%; max-width: 1000px;
        }
        .about-card {
          width: 100%;
          height: 560px;
          overflow: hidden;
          position: relative;
        }
        .about-card img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center 35%;
          filter: brightness(1.05);
          display: block;
        }
        .about-card::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.05) 30%, transparent 55%);
          pointer-events: none;
        }
        .about-card-title {
          position: absolute;
          bottom: 2rem; left: 1.5rem; z-index: 2;
          font-size: clamp(1.4rem, 3vw, 2.2rem);
          font-weight: 800; text-transform: uppercase;
          color: #ffffff; letter-spacing: 0.03em;
          line-height: 1.1;
          right: 160px;
        }
        .about-card-btn {
          position: absolute;
          bottom: 1.75rem; right: 1.5rem; z-index: 2;
          background: var(--gold); color: #1a1714;
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 12px 22px; border-radius: var(--radius-btn);
          transition: background var(--transition), color var(--transition);
          white-space: nowrap;
        }
        .about-card-btn:hover { background: #2e7175; color: #fff; }

        /* ================================================
           SERVICES (three cards like FHM footer nav cards)
           ================================================ */
        .services-section {
          background: #2e7175;
          padding: 3rem 4rem 5rem;
        }
        .services-header {
          display: flex; align-items: center;
          justify-content: space-between;
          padding: 1.5rem 0 2rem; flex-wrap: wrap; gap: 1rem;
        }
        .services-header h2 {
          font-size: clamp(1.4rem, 2.5vw, 2rem);
          font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.02em; color: #ffffff;
        }
        .btn-get-in-touch {
          background: var(--gold); color: #1a1714;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 11px 24px; border-radius: 2px;
          transition: background 0.22s ease;
          white-space: nowrap;
        }
        .btn-get-in-touch:hover { background: #2e7175; color: #fff; border: 1px solid #fff; }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        .service-card {
          position: relative;
          height: 360px;
          border-radius: 4px;
          overflow: hidden;
          cursor: pointer;
        }
        .service-card img {
          width: 100%; height: 100%;
          object-fit: cover;
          filter: brightness(0.5);
          transition: transform 0.6s ease, filter 0.4s ease;
        }
        .service-card:hover img { transform: scale(1.04); filter: brightness(0.38); }
        .service-label {
          position: absolute;
          top: 1.25rem; left: 1.25rem;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--gold);
          background: rgba(0,0,0,0.55);
          padding: 5px 12px; border-radius: 2px;
          backdrop-filter: blur(4px);
        }
        .service-card-title {
          position: absolute;
          bottom: 4.5rem; left: 1.5rem; right: 1.5rem;
          font-size: clamp(1.2rem, 2vw, 1.6rem);
          font-weight: 800; text-transform: uppercase;
          color: #ffffff; letter-spacing: 0.03em;
          line-height: 1.15;
        }
        .service-card-sub {
          position: absolute;
          bottom: 2.75rem; left: 1.5rem;
          font-size: 12px; color: rgba(255,255,255,0.65);
          font-weight: 400; letter-spacing: 0.05em;
        }
        .service-card-btn {
          position: absolute;
          bottom: 1.25rem; right: 1.25rem;
          background: var(--gold); color: #1a1714;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 9px 18px; border-radius: 2px;
          transition: background 0.22s ease, color 0.22s ease;
        }
        .service-card:hover .service-card-btn { background: #2e7175; color: #fff; }

        /* ================================================
           TESTIMONIALS
           ================================================ */
        .testimonials-section {
          background: var(--cream);
          padding: 5rem 4rem;
        }
        .testimonials-header {
          margin-bottom: 2.5rem;
        }
        .testimonials-header h2 {
          font-size: clamp(1.8rem, 3vw, 2.8rem);
          font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.01em;
        }
        .testi-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        .testi-card {
          background: var(--dark-card);
          border-radius: var(--radius-card);
          padding: 2.25rem 2rem;
          display: flex; flex-direction: column; gap: 1rem;
          border: 1px solid rgba(255,255,255,0.05);
          transition: transform var(--transition), border-color var(--transition);
        }
        .testi-card:hover { transform: translateY(-5px); border-color: rgba(245,200,66,0.2); }
        .testi-stars { color: var(--amber); font-size: 12px; letter-spacing: 2px; }
        .testi-quote { font-size: 1rem; font-style: italic; color: rgba(255,255,255,0.78); line-height: 1.75; flex: 1; }
        .testi-rule { width: 24px; height: 1px; background: rgba(255,255,255,0.1); }
        .testi-name { font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.4); font-weight: 600; }
        .testi-source { font-size: 11px; color: rgba(255,255,255,0.22); }

        /* ================================================
           PRESS STRIP
           ================================================ */
        .press-section {
          background: var(--cream);
          padding: 3rem 4rem 4rem;
          border-top: 1px solid rgba(13,31,26,0.1);
        }
        .press-label {
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--text-muted); text-align: center;
          margin-bottom: 2rem;
        }
        .press-names {
          display: flex; gap: 3rem;
          align-items: center; justify-content: center;
          flex-wrap: wrap;
        }
        .press-name {
          font-size: 1.1rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.06em;
          color: rgba(13,31,26,0.25);
          transition: color var(--transition);
          cursor: default;
        }
        .press-name:hover { color: rgba(13,31,26,0.55); }

        /* ================================================
           FOOTER
           ================================================ */
        footer {
          background: #2e7175;
          padding: 4rem 4rem 0;
          color: #fff;
        }
        .footer-inner {
          display: grid;
          grid-template-columns: 1.8fr 1fr;
          gap: 4rem;
          padding-bottom: 3.5rem;
        }
        .footer-brand-name {
          font-size: 1.1rem; font-weight: 800;
          text-transform: uppercase; letter-spacing: 0.06em;
          color: #fff; display: block; margin-bottom: 0.75rem;
        }
        .footer-address {
          font-size: 13px; color: rgba(255,255,255,0.6);
          line-height: 1.8; font-weight: 400; margin-bottom: 1.25rem;
        }
        .footer-hours {
          font-size: 13px; color: rgba(255,255,255,0.6); line-height: 1.8;
        }
        .footer-col h4 {
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--gold); margin-bottom: 1.25rem;
        }
        .footer-col ul { list-style: none; }
        .footer-col li { margin-bottom: 0.75rem; }
        .footer-col a {
          font-size: 14px; font-weight: 500;
          text-transform: uppercase; letter-spacing: 0.06em;
          color: rgba(255,255,255,0.75);
          transition: color var(--transition);
        }
        .footer-col a:hover { color: #fff; }

        /* newsletter box */

        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.15);
          padding: 1.5rem 0;
          display: flex; align-items: center;
          justify-content: space-between; flex-wrap: wrap; gap: 1rem;
        }
        .footer-legal {
          display: flex; gap: 2rem; flex-wrap: wrap; align-items: center;
        }
        .footer-legal a, .footer-copy {
          font-size: 12px; color: rgba(255,255,255,0.45);
          transition: color var(--transition);
        }
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

        /* ================================================
           RESPONSIVE
           ================================================ */
        @media (max-width: 1024px) {
          .nav { padding: 0 2rem; }
          .nav-links { gap: 1.5rem; }
          .hero { flex-direction: column; padding: 6rem 2rem 3rem; min-height: auto; gap: 0; }
          .hero-inner { flex-direction: column; gap: 2rem; }
          .hero-img-wrap { flex: none; width: 100%; height: 320px; }
          .hero-card { max-width: 100%; padding: 2.5rem 2rem; }
          .hero-titles { justify-content: center; }
          .hero-card h1 { font-size: clamp(1.7rem, 7vw, 2.2rem); text-align: center; }
          .hero-rule { margin: 0 auto 1.5rem; }
          .hero-card p { text-align: center; }
          .hero-btns { align-items: center; }
          .services-grid { grid-template-columns: 1fr; }
          .service-card { height: 280px; }
          .testi-grid { grid-template-columns: 1fr 1fr; }
          .footer-inner { grid-template-columns: 1fr 1fr; gap: 2.5rem; }
        }

        @media (max-width: 768px) {
          .nav { padding: 0 1.25rem; }
          .nav-links, .nav-cta { display: none; }
          .hamburger { display: flex; }
          .nav-logo-sub { display: none; }
          .hero { padding: 5rem 1.5rem 3rem; }
          .hero-card { padding: 2rem 1.75rem; }
          .hero-card h1 { font-size: clamp(1.7rem, 7vw, 2.2rem); }
          .books-section { padding: 3.5rem 1.5rem; }
          .books-header h2 { font-size: 1.6rem; }
          .book-card { flex: 0 0 170px; height: 240px; }
          .about-section { padding: 3rem 1.5rem; }
          .about-card { height: 300px; }
          .services-section { padding: 2rem 1.5rem 3.5rem; }
          .services-header { flex-wrap: nowrap; align-items: center; gap: 0.75rem; }
          .services-header h2 { font-size: 1.1rem; }
          .btn-get-in-touch { font-size: 10px; padding: 8px 14px; flex-shrink: 0; }
          .services-grid { grid-template-columns: 1fr; }
          .service-card { height: 300px; }
          .testi-grid { grid-template-columns: 1fr; }
          .press-section { padding: 3rem 1.5rem; }
          .press-names { gap: 1.5rem; }
          .footer-inner { grid-template-columns: 1fr; gap: 2rem; }
          footer { padding: 3rem 1.5rem 0; }
          .footer-bottom { flex-direction: column; align-items: flex-start; }
          .testimonials-section { padding: 3.5rem 1.5rem; }
        }

        @media (max-width: 480px) {
          .hero-img-wrap { height: 340px; }
          .hero-img-wrap img { object-position: center 5%; }
          .about-card { height: 240px; }
          .about-card-title { font-size: 1.2rem; }
          .service-card { height: 240px; }
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

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-img-wrap">
            <img
              src="/images/susansmiling.jpg"
              alt="Susan Herrmann Loomis"
            />
          </div>

          <div className="hero-card">
            <div className="hero-titles">
              <span>Author</span>
              <span className="hero-title-dot">·</span>
              <span>Chef</span>
              <span className="hero-title-dot">·</span>
              <span>Teacher</span>
              <span className="hero-title-dot">·</span>
              <span>Paris, France</span>
            </div>
            <h1>I&apos;m so happy<br />you are here!</h1>
            <div className="hero-rule" />
            <p>
              Susan Herrmann Loomis is an American chef, food journalist, and the
              author of fifteen cookbooks on French cooking. For over thirty years
              she has lived, cooked, and taught in France — welcoming students into
              her Paris kitchen through her cooking school, On Rue Tatin.
            </p>
            <p>
              A James Beard Award–nominated author, Susan splits her time between
              Paris — writing, teaching, and welcoming students to
              her table.
            </p>
            <div className="hero-btns">
              <a href="/books" className="btn-hero">Browse my books</a>
              <a href="/write-your-cookbook" className="btn-hero-ghost">
                Let&apos;s write your cookbook
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOOKS ── */}
      <section className="books-section">
        <div className="books-header reveal">
          <h2>Her Books</h2>
          <a href="/books" className="btn-outline-dark">View all 14 books</a>
        </div>

        <div className="books-carousel-wrap">
          <div className="books-carousel" ref={carouselRef}>
            {BOOKS.map((book) => (
              <div className="book-card" key={`${book.year}-${book.title}`}>
                {book.img
                  ? <img src={book.img} alt={book.title} />
                  : (
                    /* PLACEHOLDER: swap with <img src="/images/covers/..." /> */
                    <div className="book-placeholder-inner">
                      <span className="bp-year">{book.year}</span>
                      <div className="bp-divider" />
                      <span className="bp-title">{book.title}</span>
                      <div className="bp-divider" />
                      <span className="bp-author">Susan Herrmann Loomis</span>
                    </div>
                  )
                }
                <div className="book-overlay">
                  <p className="book-overlay-year">{book.year}</p>
                  <p className="book-overlay-title">{book.title}</p>
                  <a href="/books" className="book-overlay-link">View book</a>
                </div>
              </div>
            ))}
          </div>

          <div className="carousel-arrows">
            <button className="carousel-arrow" onClick={() => scrollCarousel(-1)} aria-label="Previous">←</button>
            <button className="carousel-arrow" onClick={() => scrollCarousel(1)} aria-label="Next">→</button>
          </div>
        </div>
      </section>

      {/* ── ABOUT SUSAN ── */}
      <section className="about-section">
        <div className="about-card-wrap">
          <div className="about-card">
            <img
              src="/images/susanheadtilt.jpg"
              alt="Susan Herrmann Loomis"
            />
          </div>
          <span className="about-card-title">About Susan</span>
          <a href="/about" className="about-card-btn">Go to page</a>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="services-section">
        <div className="services-header reveal">
          <h2>Work With Susan</h2>
          <a href="/contact" className="btn-get-in-touch">Get in Touch</a>
        </div>

        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <a href={s.href} className={`service-card reveal delay-${i + 1}`} key={s.title}>
              {/* PLACEHOLDER: replace each img src with Susan's real photos */}
              <img src={s.img} alt={s.title} style={i === 2 ? { objectPosition: 'center 80%' } : undefined} />
              <span className="service-label">{s.label}</span>
              <p className="service-card-title">{s.title}</p>
              <p className="service-card-sub">{s.sub}</p>
              <span className="service-card-btn">{s.btn}</span>
            </a>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-inner">
          <div>
            <span className="footer-brand-name">Susan Herrmann Loomis</span>
            <p className="footer-address">
              On Rue Tatin Cooking School<br />
              Paris, France<br />
            </p>
            {/* PLACEHOLDER: confirm class schedule / link */}
            <p className="footer-hours">
              Classes available year-round<br />
              See onruetatin.com for dates
            </p>
          </div>

          <div className="footer-col">
            <h4>Pages</h4>
            <ul>
              {[["Books","/books"],["Cooking School","/cooking-school"],["Write Your Cookbook","/write-your-cookbook"],["Ghostwriting","/ghostwriting"],["About","/about"],["Contact","/contact"]].map(([label, href]) => (
                <li key={href}><a href={href}>{label}</a></li>
              ))}
            </ul>
          </div>
            </div>

        <div className="footer-bottom">
          <div className="footer-legal">
            <span className="footer-copy">© 2026 Susan Herrmann Loomis</span>
            <a href="/contact">Contact</a>
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
    </>
  );
}