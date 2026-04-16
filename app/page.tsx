"use client";

import { useEffect, useRef, useState } from "react";

/* ============================================================
   DATA
   ============================================================ */
const BOOKS = [
  {
    year: "2024",
    title: "Plat du Jour",
    description: "Susan's latest — French cuisine at its seasonal best. Recipes built around the French tradition of the daily special, for everyone who loves French food.",
    amazon: "https://www.amazon.com/s?k=Plat+du+Jour+Susan+Herrmann+Loomis",
    img: "/images/covers/plat-du-jour.jpg",
  },
  {
    year: "2015",
    title: "In a French Kitchen",
    description: "How the French really cook. Tips, tricks, guides, menus, and more than 80 recipes drawn from the real kitchens of France.",
    amazon: "https://www.amazon.com/s?k=In+a+French+Kitchen+Susan+Herrmann+Loomis",
    img: "/images/covers/in-a-french-kitchen.jpg",
  },
  {
    year: "2018",
    title: "French Grill",
    description: "Ingredients forward, simple, beautifully grilled — French grilling will change the way you cook outdoors forever.",
    amazon: "https://www.amazon.com/s?k=French+Grill+Susan+Herrmann+Loomis",
    img: "/images/covers/french-grill.jpg",
  },
  {
    year: "2010",
    title: "Nuts in the Kitchen",
    description: "A comprehensive collection of nut recipes for every meal — sweet, savory, and everything in between.",
    amazon: "https://www.amazon.com/s?k=Nuts+in+the+Kitchen+Susan+Herrmann+Loomis",
    img: "/images/covers/nuts-in-the-kitchen.jpg",
  },
  {
    year: "2005",
    title: "Cooking at Home on Rue Tatin",
    description: "Award-winning author and professional chef Susan Herrmann Loomis takes cooks on a journey through French home cooking.",
    amazon: "https://www.amazon.com/s?k=Cooking+at+Home+on+Rue+Tatin",
    img: "/images/covers/cooking-at-home-on-rue-tatin.jpg",
  },
  {
    year: "2001",
    title: "On Rue Tatin",
    description: "Part memoir, part cookbook — the story of arriving in Paris with little more than a student loan, and finding a life built around French food.",
    amazon: "https://www.amazon.com/s?k=On+Rue+Tatin+Susan+Herrmann+Loomis",
    img: "/images/covers/on-rue-tatin.jpg",
  },
  {
    year: "1991",
    title: "Farmhouse Cookbook",
    description: "A beloved classic. Everything made from it is very good — an extensive and deeply satisfying collection of farmhouse recipes.",
    amazon: "https://www.amazon.com/s?k=Farmhouse+Cookbook+Susan+Herrmann+Loomis",
    img: "/images/covers/farmhouse-cookbook.jpg",
  },
  {
    year: "1996",
    title: "French Farmhouse Cookbook",
    description: "As much a book of inspiration as a recipe collection — over 250 uncommonly delicious recipes capturing rustic, richly flavored farmhouse cooking.",
    amazon: "https://www.amazon.com/s?k=French+Farmhouse+Cookbook+Susan+Herrmann+Loomis",
    img: "/images/covers/french-farmhouse-cookbook.jpg",
  },
  {
    year: "2000",
    title: "Italian Farmhouse Cookbook",
    description: "The essence of Italian cooking — Susan goes to the source, where the techniques are still genuine and the recipes tied to the culture.",
    amazon: "https://www.amazon.com/s?k=Italian+Farmhouse+Cookbook+Susan+Herrmann+Loomis",
    img: "/images/covers/italian-farmhouse-cookbook.jpg",
  },
  {
    year: "1999",
    title: "Tarte Tatin",
    description: "Further adventures in a small French town — a delightful follow-up to On Rue Tatin, rich with food, life, and Normandy.",
    amazon: "https://www.amazon.com/s?k=Tarte+Tatin+Susan+Herrmann+Loomis",
    img: "/images/covers/tarte-tatin.jpg",
  },
  {
    year: "1993",
    title: "Clambakes & Fish Fries",
    description: "From clambakes to shrimp boils to oyster galas — nothing is more pleasurable or nourishing than a great seafood celebration.",
    amazon: "https://www.amazon.com/s?k=Clambakes+Fish+Fries+Susan+Herrmann+Loomis",
    img: "/images/covers/clambakes-and-fish-fries.jpg",
  },
  {
    year: "1988",
    title: "Great American Seafood Cookbook",
    description: "The seafood-lover's bible — for health, variety, and flavor, the definitive guide to American seafood cooking.",
    amazon: "https://www.amazon.com/s?k=Great+American+Seafood+Cookbook+Susan+Herrmann+Loomis",
    img: "/images/covers/great-american-seafood-cookbook.jpg",
  },
  {
    year: "1994",
    title: "A Holiday Cookbook",
    description: "Les Recettes de la Saison — a holiday cookbook from the chefs of La Madeleine and Susan Herrmann Loomis.",
    amazon: "https://www.amazon.com/s?k=Holiday+Cookbook+La+Madeleine+Susan+Herrmann+Loomis",
    img: "/images/covers/a-holiday-cookbook.jpg",
  },
  {
    year: "1985",
    title: "The Food Lover's Guide to Paris",
    description: "An internationally acclaimed guide to French cuisine — written by an award-winning cookbook author and restaurant critic for France.",
    amazon: "https://www.amazon.com/s?k=Food+Lovers+Guide+Paris+Susan+Herrmann+Loomis",
    img: "/images/covers/food-lovers-guide-paris.jpg",
  },
  {
    year: "",
    title: "Les Meilleures Recettes",
    description: "The best recipes from the regions of France — a special book that will inspire your palate and ignite a passion for great food.",
    amazon: "https://www.amazon.com/s?k=Les+Meilleures+Recettes+Susan+Herrmann+Loomis",
    img: "/images/covers/les-meilleures-recettes.jpg",
  },
];

const SERVICES = [
  {
    label: "Cooking School",
    title: "ON RUE TATIN",
    sub: "Normandy & Paris",
    href: "/cooking-school",
    /* PLACEHOLDER — replace with a kitchen/convent photo */
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&auto=format&q=75",
  },
  {
    label: "Cookbook Writing",
    title: "WRITING COURSE",
    sub: "5-Module Programme",
    href: "/writing-courses",
    /* PLACEHOLDER — replace with a writing/desk photo */
    img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&auto=format&q=75",
  },
  {
    label: "Ghostwriting",
    title: "GHOSTWRITING",
    sub: "Your Story, Expertly Told",
    href: "/ghostwriting",
    /* PLACEHOLDER — replace with a books/manuscript photo */
    img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=900&auto=format&q=75",
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
        /* ================================================
           NAV
           ================================================ */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          height: 68px;
          background: var(--dark);
          display: flex; align-items: center;
          justify-content: space-between;
          padding: 0 3rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .nav-logo {
          display: flex; align-items: center; gap: 12px;
        }
        .nav-logo-mark {
          width: 56px; height: 38px;
          background: var(--amber);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          padding: 6px 8px;
        }
        .nav-logo-text { display: flex; flex-direction: column; }
        .nav-logo-name {
          font-weight: 700; font-size: 14px;
          color: var(--white); letter-spacing: 0.04em;
          text-transform: uppercase; line-height: 1.1;
        }
        .nav-logo-sub {
          font-size: 10px; letter-spacing: 0.14em;
          text-transform: uppercase; color: rgba(255,255,255,0.4);
          line-height: 1;
        }
        .nav-links {
          display: flex; list-style: none; gap: 2.25rem; align-items: center;
        }
        .nav-links a {
          font-size: 12px; letter-spacing: 0.09em;
          text-transform: uppercase; font-weight: 600;
          color: rgba(255,255,255,0.65);
          transition: color var(--transition);
        }
        .nav-links a:hover { color: var(--amber); }
        .nav-cta {
          background: var(--amber); color: var(--dark);
          font-size: 12px; letter-spacing: 0.1em;
          text-transform: uppercase; font-weight: 700;
          padding: 10px 22px; border-radius: var(--radius-btn);
          transition: background var(--transition), transform var(--transition);
          flex-shrink: 0;
        }
        .nav-cta:hover { background: var(--amber-dark); transform: translateY(-1px); }
        .hamburger {
          display: none; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 4px;
        }
        .hamburger span {
          display: block; width: 22px; height: 2px;
          background: var(--white);
          transition: transform var(--transition), opacity var(--transition);
        }
        .mobile-drawer {
          display: none; position: fixed;
          top: 68px; left: 0; right: 0; z-index: 199;
          background: var(--dark);
          flex-direction: column;
          border-top: 1px solid rgba(255,255,255,0.07);
          padding: 1rem 2rem 2rem;
        }
        .mobile-drawer.open { display: flex; }
        .mobile-drawer a {
          font-size: 15px; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: rgba(255,255,255,0.75);
          padding: 1rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          transition: color var(--transition);
        }
        .mobile-drawer a:hover { color: var(--amber); }

        /* ================================================
           HERO
           ================================================ */
        .hero {
          min-height: 100vh;
          padding-top: 68px;
          background: var(--cream);
          display: flex; align-items: center;
          justify-content: center;
          padding-left: 4rem; padding-right: 4rem;
          gap: 3rem;
          position: relative;
          overflow: hidden;
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
          object-position: center 20%;
          transition: transform 7s ease;
        }
        .hero:hover .hero-img-wrap img { transform: scale(1.06); }
        .hero-card {
          background: var(--dark-card);
          border-radius: var(--radius-card);
          padding: 3rem 3rem;
          max-width: 520px;
          flex-shrink: 0;
        }
        .hero-card h1 {
          font-size: clamp(2rem, 3.5vw, 3rem);
          font-weight: 800;
          color: var(--amber);
          text-transform: uppercase;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          letter-spacing: 0.01em;
          animation: fadeUp 0.7s ease 0.2s both;
        }
        .hero-card p {
          font-size: 16px;
          color: rgba(255,255,255,0.82);
          line-height: 1.75;
          margin-bottom: 1rem;
          font-weight: 400;
          animation: fadeUp 0.7s ease 0.35s both;
        }
        .hero-card p:last-of-type { margin-bottom: 2rem; }
        .hero-btns {
          display: flex; flex-direction: column;
          gap: 0.75rem;
          animation: fadeUp 0.7s ease 0.5s both;
        }
        .btn-hero {
          display: inline-flex; align-items: center;
          width: fit-content;
          font-size: 13px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 13px 28px;
          border-radius: var(--radius-btn);
          border: 2px solid var(--amber);
          color: var(--dark);
          background: var(--amber);
          transition: background var(--transition), color var(--transition), transform var(--transition);
        }
        .btn-hero:hover { background: var(--amber-dark); border-color: var(--amber-dark); transform: translateY(-2px); }
        .btn-hero-ghost {
          display: inline-flex; align-items: center;
          width: fit-content;
          font-size: 13px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 13px 28px;
          border-radius: var(--radius-btn);
          border: 2px solid var(--amber);
          color: var(--amber);
          background: transparent;
          transition: background var(--transition), color var(--transition), transform var(--transition);
        }
        .btn-hero-ghost:hover { background: var(--amber); color: var(--dark); transform: translateY(-2px); }

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
        .btn-outline-dark:hover { background: var(--text-dark); color: var(--cream); transform: translateY(-1px); }

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
        .carousel-arrow:hover { background: var(--text-dark); color: var(--cream); transform: scale(1.05); }

        /* ================================================
           ABOUT SUSAN (FHM "About Frans Hals" card style)
           ================================================ */
        .about-section {
          background: var(--dark);
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
          border-radius: var(--radius-card);
          overflow: hidden;
          position: relative;
        }
        .about-card img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center 15%;
          filter: brightness(1.1);
          display: block;
        }
        .about-card::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 25%, transparent 50%);
          pointer-events: none;
          border-radius: var(--radius-card);
        }

        .about-card-title {
          position: absolute;
          bottom: 2rem; left: 2rem;
          z-index: 2;
          font-size: clamp(1.4rem, 3vw, 2.2rem);
          font-weight: 800; text-transform: uppercase;
          color: #ffffff; letter-spacing: 0.03em;
          line-height: 1.1;
        }
        .about-card-btn {
          position: absolute;
          bottom: 2rem; right: 2rem;
          z-index: 2;
          background: var(--amber); color: var(--dark);
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 12px 22px; border-radius: var(--radius-btn);
          transition: background var(--transition), transform var(--transition);
        }
        .about-card-btn:hover { background: var(--amber-dark); transform: translateY(-2px); }

        /* ================================================
           SERVICES (three cards like FHM footer nav cards)
           ================================================ */
        .services-section {
          background: var(--dark);
          padding: 2rem 4rem 5rem;
        }
        .services-header {
          display: flex; align-items: center;
          justify-content: space-between;
          padding: 2rem 0 2rem; flex-wrap: wrap; gap: 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          margin-bottom: 2rem;
        }
        .services-header h2 {
          font-size: clamp(1.4rem, 2.5vw, 2rem);
          font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.02em; color: var(--white);
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        .service-card {
          position: relative;
          height: 340px;
          border-radius: var(--radius-card);
          overflow: hidden;
          cursor: pointer;
        }
        .service-card img {
          width: 100%; height: 100%;
          object-fit: cover;
          filter: brightness(0.5);
          transition: transform 0.6s ease, filter 0.4s ease;
        }
        .service-card:hover img { transform: scale(1.06); filter: brightness(0.4); }
        .service-label {
          position: absolute;
          top: 1.5rem; left: 1.5rem;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--amber);
          background: rgba(13,31,26,0.7);
          padding: 5px 12px; border-radius: var(--radius-btn);
        }
        .service-card-title {
          position: absolute;
          bottom: 4.5rem; left: 1.5rem; right: 1.5rem;
          font-size: clamp(1.2rem, 2vw, 1.6rem);
          font-weight: 800; text-transform: uppercase;
          color: var(--white); letter-spacing: 0.03em;
          line-height: 1.15;
          text-shadow: 0 2px 10px rgba(0,0,0,0.4);
        }
        .service-card-sub {
          position: absolute;
          bottom: 2.5rem; left: 1.5rem;
          font-size: 12px; color: rgba(255,255,255,0.6);
          font-weight: 400; letter-spacing: 0.05em;
        }
        .service-card-btn {
          position: absolute;
          bottom: 1.5rem; right: 1.5rem;
          background: var(--amber); color: var(--dark);
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 9px 18px; border-radius: var(--radius-btn);
          transition: background var(--transition), transform var(--transition);
        }
        .service-card:hover .service-card-btn { background: var(--amber-dark); transform: translateY(-2px); }

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
          background: var(--dark);
          padding: 4rem 4rem 0;
          color: var(--white);
        }
        .footer-inner {
          display: grid;
          grid-template-columns: 1.8fr 1fr 1.4fr;
          gap: 4rem;
          padding-bottom: 3.5rem;
        }
        .footer-brand-name {
          font-size: 1.1rem; font-weight: 800;
          text-transform: uppercase; letter-spacing: 0.06em;
          color: var(--white); display: block; margin-bottom: 0.4rem;
        }
        .footer-address {
          font-size: 13px; color: rgba(255,255,255,0.42);
          line-height: 1.8; font-weight: 400; margin-bottom: 1.5rem;
        }
        .footer-hours {
          font-size: 13px; color: rgba(255,255,255,0.42); line-height: 1.8;
        }
        .footer-col h4 {
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--amber); margin-bottom: 1.25rem;
        }
        .footer-col ul { list-style: none; }
        .footer-col li { margin-bottom: 0.6rem; }
        .footer-col a {
          font-size: 14px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.06em;
          color: rgba(255,255,255,0.65);
          transition: color var(--transition);
        }
        .footer-col a:hover { color: var(--amber); }

        /* newsletter box */
        .footer-newsletter {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: var(--radius-card);
          padding: 2rem;
        }
        .footer-newsletter h3 {
          font-size: 1.2rem; font-weight: 800;
          text-transform: uppercase; letter-spacing: 0.04em;
          color: var(--white); margin-bottom: 0.4rem;
        }
        .footer-newsletter p {
          font-size: 13px; color: rgba(255,255,255,0.45);
          margin-bottom: 1.25rem;
        }
        .newsletter-input {
          width: 100%; background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: var(--radius-btn);
          color: var(--white); font-size: 13px;
          padding: 12px 16px; outline: none; margin-bottom: 0.75rem;
          transition: border-color var(--transition);
          font-family: var(--sans);
        }
        .newsletter-input::placeholder { color: rgba(255,255,255,0.25); }
        .newsletter-input:focus { border-color: var(--amber); }
        .btn-subscribe {
          width: 100%; background: var(--amber); color: var(--dark);
          border: none; cursor: pointer;
          font-size: 13px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 13px; border-radius: var(--radius-btn);
          transition: background var(--transition), transform var(--transition);
          font-family: var(--sans);
        }
        .btn-subscribe:hover { background: var(--amber-dark); transform: translateY(-1px); }

        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.08);
          padding: 1.5rem 0;
          display: flex; align-items: center;
          justify-content: space-between; flex-wrap: wrap; gap: 1rem;
        }
        .footer-legal {
          display: flex; gap: 2rem; flex-wrap: wrap;
        }
        .footer-legal a {
          font-size: 12px; color: rgba(255,255,255,0.3);
          transition: color var(--transition);
        }
        .footer-legal a:hover { color: var(--white); }
        .footer-social {
          display: flex; gap: 1.25rem; align-items: center;
        }
        .footer-social a {
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          border: 1px solid rgba(255,255,255,0.12);
          padding: 6px 14px; border-radius: var(--radius-btn);
          transition: color var(--transition), border-color var(--transition);
        }
        .footer-social a:hover { color: var(--amber); border-color: var(--amber); }

        /* ================================================
           RESPONSIVE
           ================================================ */
        @media (max-width: 1024px) {
          .nav { padding: 0 2rem; }
          .nav-links { gap: 1.5rem; }
          .hero { flex-direction: column; padding: 6rem 2rem 3rem; min-height: auto; gap: 2rem; justify-content: flex-start; }
          .hero-img-wrap { flex: none; width: 100%; height: 320px; }
          .hero-card { max-width: 100%; }
          .services-grid { grid-template-columns: 1fr 1fr; }
          .service-card { height: 280px; }
          .footer-inner { grid-template-columns: 1fr 1fr; gap: 2.5rem; }
          .about-card-wrap { max-width: 100%; }
        }

        @media (max-width: 768px) {
          .nav { padding: 0 1.25rem; }
          .nav-links, .nav-cta { display: none; }
          .hamburger { display: flex; }
          .nav-logo-sub { display: none; }
          .nav-logo-name { font-size: 12px; }

          .hero { padding: 5rem 1.25rem 2.5rem; flex-direction: column; }
          .hero-img-wrap { width: 100%; height: 260px; }
          .hero-card { padding: 1.75rem 1.5rem; width: 100%; }
          .hero-card h1 { font-size: clamp(1.6rem, 7vw, 2.2rem); }
          .hero-card p { font-size: 15px; }
          .hero-btns { flex-direction: column; gap: 0.75rem; }
          .btn-hero, .btn-hero-ghost { width: 100%; justify-content: center; }

          .books-section { padding: 3rem 1.25rem; }
          .books-header { flex-direction: column; align-items: flex-start; gap: 1rem; }
          .books-header h2 { font-size: 1.6rem; }
          .book-card { flex: 0 0 155px; height: 220px; }

          .about-section { padding: 2.5rem 1.25rem; }
          .about-card { height: 280px; }
          .about-card-title { font-size: 1.2rem; bottom: 1.25rem; left: 1.25rem; }
          .about-card-btn { bottom: 1.25rem; right: 1.25rem; padding: 9px 16px; font-size: 11px; }

          .services-section { padding: 2rem 1.25rem 3rem; }
          .services-grid { grid-template-columns: 1fr; }
          .service-card { height: 240px; }
          .services-header { flex-direction: column; align-items: flex-start; gap: 1rem; }

          .footer-inner { grid-template-columns: 1fr; gap: 2rem; }
          footer { padding: 3rem 1.25rem 0; }
          .footer-bottom { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
          .footer-legal { flex-wrap: wrap; gap: 1rem; }
          .footer-social { flex-wrap: wrap; }
        }

        @media (max-width: 480px) {
          .hero-img-wrap { height: 220px; }
          .about-card { height: 240px; }
          .about-card-title { font-size: 1.1rem; }
          .service-card { height: 220px; }
          .book-card { flex: 0 0 135px; height: 195px; }
          .nav-logo-name { font-size: 11px; }
          .nav-logo-mark { width: 44px; height: 32px; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav className="nav">
        <a href="/" className="nav-logo">
          <div className="nav-logo-mark">
            <svg viewBox="440 550 2600 1550" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
              <path
                d="M559.25 1982.64 c-17.98 -9.78 -23.27 -23 -29.09 -73.51 -8.99 -76.42 -2.64 -136.97 20.63 -197.26 12.69 -32.79 73.51 -161.83 86.47 -183.77 l10.84 -18.25 -33.32 -77.21 c-25.91 -60.55 -38.61 -86.47 -58.17 -118.73 -13.75 -22.74 -33.58 -57.91 -43.89 -78 -10.58 -20.10 -24.59 -45.75 -31.47 -56.59 -38.08 -60.29 -47.33 -92.02 -49.45 -169.50 -2.12 -71.13 3.17 -120.05 19.04 -178.49 16.39 -60.82 52.62 -143.05 77.21 -175.84 15.60 -20.36 58.44 -60.55 80.91 -75.63 56.59 -37.81 117.93 -45.48 164.21 -21.15 34.38 18.25 58.17 54.74 67.69 103.65 7.93 42.57 11.37 99.42 9.78 165.26 -1.59 64.25 -5.55 100.75 -17.72 165.79 -15.60 83.56 -18.51 100.22 -20.10 118.46 -1.59 16.66 -2.38 19.30 -11.63 28.29 -9.78 9.78 -10.31 10.05 -29.35 10.05 -30.67 0 -43.63 -10.58 -46.54 -37.81 -1.85 -18.25 1.59 -43.10 16.39 -116.88 19.83 -98.63 21.15 -110.26 20.89 -191.71 0 -83.56 -3.70 -113.97 -17.19 -142.26 -8.20 -16.66 -22.21 -29.62 -32.26 -29.62 -9.78 0 -44.69 18.77 -63.20 33.85 -27.76 22.74 -47.07 44.16 -60.02 65.84 -22.48 38.87 -51.83 116.61 -61.08 162.36 -11.63 57.12 -11.63 135.12 0.26 172.93 6.88 22.48 11.90 32.79 31.47 63.46 8.20 13.22 21.15 35.70 28.29 50.24 7.40 14.54 23.80 44.42 36.75 66.11 33.32 56.59 39.13 67.96 61.61 120.05 11.11 25.65 21.15 46.80 22.21 47.33 1.32 0.53 7.67 -6.35 14.54 -14.81 84.62 -106.83 157.86 -176.11 203.34 -192.50 13.75 -4.76 46.80 -4.76 56.06 0.26 12.43 6.35 20.36 18.25 25.12 37.55 16.66 69.81 22.48 249.62 11.11 341.37 -2.64 19.57 -4.23 36.49 -3.70 38.08 0.53 1.32 7.40 -13.49 15.07 -32.79 7.67 -19.30 24.59 -57.12 37.28 -84.09 12.69 -26.97 29.35 -65.58 37.02 -85.94 7.40 -20.36 17.98 -46.54 23.53 -58.17 11.37 -24.33 61.08 -113.70 71.66 -129.57 11.11 -16.13 29.88 -32.26 41.25 -35.43 17.45 -4.76 38.08 -3.44 49.98 3.17 16.66 9.25 22.48 23.80 25.12 63.20 5.82 78.27 2.91 121.37 -14.81 226.35 -11.63 69.81 -16.66 120.05 -13.22 133.80 1.59 6.08 5.55 -0.53 30.14 -49.45 15.60 -30.94 33.58 -70.60 39.93 -87.79 6.35 -17.45 16.39 -42.31 22.21 -55.53 9.25 -21.42 10.31 -25.65 10.05 -43.89 -0.79 -34.64 12.16 -80.38 38.34 -133.27 15.07 -30.94 82.76 -121.63 96.25 -128.77 20.10 -10.58 51.30 -4.50 62.14 12.16 15.07 22.74 -0.79 90.70 -35.96 153.89 -20.63 36.75 -33.85 62.93 -48.39 95.99 l-11.90 26.44 15.60 13.49 c11.37 9.78 25.91 18.25 52.36 30.14 38.34 17.45 54.74 27.24 67.69 40.99 4.50 4.50 8.73 8.20 9.52 8.20 1.85 0 33.85 -38.08 62.93 -74.57 20.36 -25.38 138.03 -143.85 153.63 -154.16 8.73 -6.08 15.07 -7.93 28.29 -8.73 19.83 -1.32 30.14 2.12 39.40 13.22 5.82 7.14 6.61 10.05 6.61 30.94 0 35.43 -17.72 94.13 -53.15 175.31 -10.31 23.80 -25.38 59.76 -33.32 80.12 -7.93 20.36 -25.12 57.91 -38.08 83.29 -26.44 52.36 -32.52 67.96 -37.02 97.57 -4.76 31.73 0 42.57 19.04 42.57 25.91 0 60.82 -17.19 145.43 -71.92 158.39 -102.33 284.78 -166.32 452.43 -229.25 130.10 -48.65 224.50 -70.87 394.25 -92.81 83.03 -10.84 100.22 -14.54 129.04 -29.35 12.16 -6.08 19.04 -7.67 31.47 -7.67 28.82 0 39.66 11.37 39.66 40.99 0 23 -8.20 34.64 -33.05 47.07 -32.79 16.13 -52.88 20.89 -124.81 29.62 -108.94 13.49 -191.71 28.56 -262.57 47.86 -51.56 14.28 -172.40 56.06 -178.22 61.88 -1.59 1.59 -4.23 2.64 -6.35 2.64 -3.17 0 -41.51 15.60 -86.47 35.17 -7.14 3.17 -39.13 18.51 -70.60 34.11 -95.46 47.07 -159.71 84.35 -258.61 150.19 -79.06 52.62 -131.42 71.66 -186.42 67.96 -33.58 -2.38 -47.07 -7.67 -65.31 -25.65 -12.16 -12.43 -15.87 -17.98 -20.36 -32.79 -10.05 -32.26 -6.35 -96.78 7.93 -139.88 2.91 -8.99 16.92 -40.19 31.47 -69.28 27.24 -55.53 61.35 -137.76 53.41 -129.83 -6.08 6.08 -59.76 71.66 -82.50 101.01 l-18.51 23.80 2.64 27.76 c5.82 62.67 -9.25 99.95 -49.18 120.05 -13.75 6.88 -18.51 7.93 -38.34 7.93 -20.36 0 -23.80 -0.79 -33.85 -7.40 -8.20 -5.29 -13.22 -11.63 -17.98 -21.95 -6.08 -13.49 -6.61 -17.19 -5.55 -44.16 1.06 -34.38 5.29 -46.01 29.88 -81.71 9.52 -13.75 14.28 -23 13.22 -25.91 -2.91 -8.99 -25.38 -26.71 -45.22 -35.96 -10.84 -5.02 -28.29 -12.96 -38.61 -17.72 -10.58 -5.02 -24.86 -13.22 -32 -18.77 -8.46 -6.35 -12.96 -8.46 -13.75 -6.35 -15.60 44.42 -26.18 69.01 -58.44 133.53 -32.79 65.84 -40.19 78.80 -49.98 87.52 -13.75 11.90 -26.44 16.39 -48.13 16.39 -33.32 0 -59.76 -15.34 -73.51 -42.31 -12.16 -24.06 -15.34 -48.39 -13.75 -106.83 1.06 -47.33 2.64 -61.08 13.49 -124.54 6.61 -39.13 12.96 -79.06 13.75 -88.58 l1.59 -17.19 -7.40 11.90 c-11.63 19.57 -23.80 47.33 -40.72 92.55 -8.73 23.53 -25.12 62.67 -36.75 86.73 -11.63 24.33 -29.88 65.58 -40.72 92.02 -10.84 26.18 -32.52 72.72 -47.86 103.39 -23.53 46.80 -30.14 57.64 -40.19 66.63 -14.81 12.96 -28.56 17.19 -49.98 15.34 -55 -4.23 -64.52 -48.65 -43.63 -198.85 11.63 -84.09 13.22 -102.33 13.22 -158.65 0 -52.36 -4.23 -139.35 -7.40 -152.57 -1.85 -7.14 -2.38 -6.88 -32.79 21.68 -16.92 16.13 -38.87 38.87 -48.65 51.03 -10.05 11.90 -28.82 34.90 -42.31 50.77 -13.22 16.13 -32.26 41.25 -41.78 56.32 l-17.72 27.24 4.50 19.04 c2.64 12.69 4.76 37.55 5.55 75.89 2.12 82.50 -1.06 95.72 -44.69 197.79 -13.22 31.20 -29.88 66.11 -36.49 77.21 -15.07 25.12 -42.04 60.29 -58.70 77.21 l-12.69 12.69 -20.36 0 c-11.37 0 -23 -1.59 -25.91 -3.17z"
                fill="#1a1714"
              />
            </svg>
          </div>
          <div className="nav-logo-text">
            <span className="nav-logo-name">Susan Herrmann Loomis</span>
            <span className="nav-logo-sub">Author · Chef · Cooking School</span>
          </div>
        </a>

        <ul className="nav-links">
          <li><a href="/books">Books</a></li>
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

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-img-wrap reveal-left">
          <img
            src="/images/susansmiling.jpg"
            alt="Susan Herrmann Loomis"
          />
        </div>

        <div className="hero-card reveal-right">
          <h1>Welcome to<br />Susan Herrmann<br />Loomis</h1>
          <p>
            Susan Herrmann Loomis is an American chef, food journalist, and the
            author of fourteen cookbooks on French cooking. Since 1993, she has
            lived and cooked in a restored 15th-century convent in Louviers,
            Normandy.
          </p>
          <p>
            A James Beard Award–nominated author, Susan splits her time between
            Louviers and Paris — writing, teaching, and welcoming students to
            her table through her cooking school, On Rue Tatin.
          </p>
          <div className="hero-btns">
            <a href="/books" className="btn-hero">Browse the books</a>
            <a href="https://onruetatin.com" className="btn-hero-ghost" target="_blank" rel="noopener noreferrer">
              Visit the cooking school
            </a>
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
              <a
                className="book-card"
                key={`${book.year}-${book.title}`}
                href={book.amazon}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                {book.img ? (
                  <img src={book.img} alt={book.title} />
                ) : (
                  <div className="book-placeholder-inner">
                    <span className="bp-year">{book.year}</span>
                    <div className="bp-divider" />
                    <span className="bp-title">{book.title}</span>
                    <div className="bp-divider" />
                    <span className="bp-author">Susan Herrmann Loomis</span>
                  </div>
                )}
                <div className="book-overlay">
                  <p className="book-overlay-year">{book.year}</p>
                  <p className="book-overlay-title">{book.title}</p>
                  <span className="book-overlay-link">Buy on Amazon →</span>
                </div>
              </a>
            ))}
          </div>

          <div className="carousel-arrows">
            <button className="carousel-arrow" onClick={() => scrollCarousel(-1)} aria-label="Previous">←</button>
            <button className="carousel-arrow" onClick={() => scrollCarousel(1)} aria-label="Next">→</button>
          </div>
        </div>
      </section>

      {/* ── ABOUT SUSAN (FHM "About Frans Hals" card) ── */}
      <section className="about-section">
        <div className="about-card-wrap reveal-up">
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
          <a href="/contact" className="btn-hero" style={{ fontSize: "11px", padding: "10px 20px" }}>Get in Touch</a>
        </div>

        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <a href={s.href} className={`service-card reveal delay-${i + 1}`} key={s.title}>
              {/* PLACEHOLDER: replace each img src with Susan's real photos */}
              <img src={s.img} alt={s.title} />
              <span className="service-label">{s.label}</span>
              <p className="service-card-title">{s.title}</p>
              <p className="service-card-sub">{s.sub}</p>
              <span className="service-card-btn">Go to page</span>
            </a>
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
              Louviers, Normandy, France<br />
              &amp; Paris, France
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
              {[["Books","/books"],["Cooking School","/cooking-school"],["Writing Courses","/writing-courses"],["Ghostwriting","/ghostwriting"],["About","/about"],["Contact","/contact"]].map(([label, href]) => (
                <li key={href}><a href={href}>{label}</a></li>
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
            <a href="/privacy">Privacy Policy</a>
            <a href="/contact">Contact</a>
            {/* PLACEHOLDER: add real links */}
            <a href="https://onruetatin.com" target="_blank" rel="noopener noreferrer">onruetatin.com</a>
          </div>
          <div className="footer-social">
            {/* PLACEHOLDER: replace # with Susan's real social URLs */}
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">Pinterest</a>
            <a href="#">Amazon</a>
          </div>
        </div>
      </footer>
    </>
  );
}