"use client";

import { useEffect, useState } from "react";
import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({
  weight: "700",
  subsets: ["latin"],
});

export default function LoadingScreen() {
  // Start as null — we don't know yet if we should show
  const [phase, setPhase] = useState<"drawing" | "filled" | "fadeout" | "done" | null>(null);

  useEffect(() => {
    // Show on first visit OR on page refresh
    const isRefresh = (performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming)?.type === "reload";
    const hasShown = sessionStorage.getItem("shl-intro-shown");

    if (hasShown && !isRefresh) {
      setPhase("done");
      return;
    }

    sessionStorage.setItem("shl-intro-shown", "1");
    setPhase("drawing");

    const fillTimer  = setTimeout(() => setPhase("filled"),  2600);
    const fadeTimer  = setTimeout(() => setPhase("fadeout"), 3400);
    const doneTimer  = setTimeout(() => setPhase("done"),    4100);
    return () => { clearTimeout(fillTimer); clearTimeout(fadeTimer); clearTimeout(doneTimer); };
  }, []);

  // null = waiting for client check, done = finished — both render nothing
  if (phase === null || phase === "done") return null;

  return (
    <>
      <style>{`
        .loader-wrap {
          position: fixed; inset: 0; z-index: 9999;
          background: #f7f3ed;
          display: flex; align-items: center; justify-content: center;
          flex-direction: column; gap: 0.5rem;
          opacity: ${phase === "fadeout" ? "0" : "1"};
          transition: opacity 0.7s ease;
          pointer-events: ${phase === "fadeout" ? "none" : "all"};
        }

        .loader-svg {
          overflow: visible;
          width: min(420px, 80vw);
          height: auto;
          display: block;
          margin: 0 auto;
        }

        .sig-drawing {
          fill: none;
          stroke: #1a1714;
          stroke-width: 1.5px;
          font-size: 100px;
          font-weight: 700;
          stroke-dasharray: 2000;
          stroke-dashoffset: 2000;
          animation: drawSig 2.4s ease forwards 0.2s;
        }

        .sig-filled {
          fill: #1a1714;
          stroke: #1a1714;
          stroke-width: 0.5px;
          font-size: 100px;
          font-weight: 700;
        }

        @keyframes drawSig {
          to { stroke-dashoffset: 0; }
        }

        .loader-line {
          width: 0;
          height: 1px;
          background: #c8a96e;
          animation: growLine 0.8s ease 2.4s forwards;
        }

        @keyframes growLine {
          to { width: min(280px, 50vw); }
        }

        .loader-name {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #6e6660;
          opacity: 0;
          animation: fadeInName 0.6s ease 2.6s forwards;
        }

        @keyframes fadeInName {
          to { opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          .loader-wrap { transition: none; }
          .sig-drawing { animation: none; stroke-dashoffset: 0; }
          .loader-line { animation: none; width: min(280px, 50vw); }
          .loader-name { animation: none; opacity: 1; }
        }
      `}</style>

      <div className="loader-wrap" aria-hidden="true">
        <svg className={`loader-svg ${dancingScript.className}`} viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg">
          <text
            x="50%"
            y="80"
            textAnchor="middle"
            className={phase === "drawing" ? "sig-drawing" : "sig-filled"}
          >
            Bonjour!
          </text>
          <text
            x="50%"
            y="170"
            textAnchor="middle"
            className={phase === "drawing" ? "sig-drawing" : "sig-filled"}
            style={{ fontSize: "60px" }}
          >
            Let&apos;s write your cookbook...
          </text>
        </svg>
        <div className="loader-line" />
        <p className="loader-name">Susan Herrmann Loomis</p>
      </div>
    </>
  );
}