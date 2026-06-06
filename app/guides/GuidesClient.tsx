"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { seoGuides } from "@/lib/seo-guides";

// ─── Types ────────────────────────────────────────────────────────────────────

type CatConfig = {
  color: string;       // strong foreground / icon color
  bg: string;          // light tinted background
  border: string;      // chip border
  accent: string;      // top border stripe on card
  gradFrom: string;    // featured banner gradient start
  gradTo: string;      // featured banner gradient end
};

// ─── Per-category palette ────────────────────────────────────────────────────

const CAT: Record<string, CatConfig> = {
  "Tax & Salary": {
    color: "#0B5A2A",
    bg: "#ECFDF3",
    border: "#A7E3C0",
    accent: "#0B5A2A",
    gradFrom: "#052E16",
    gradTo: "#0B5A2A",
  },
  "Money & Banking": {
    color: "#1D4ED8",
    bg: "#EFF6FF",
    border: "#93C5FD",
    accent: "#2563EB",
    gradFrom: "#1e3a8a",
    gradTo: "#1D4ED8",
  },
  "Tax & Transport": {
    color: "#C2410C",
    bg: "#FFF7ED",
    border: "#FDBA74",
    accent: "#EA580C",
    gradFrom: "#7c2d12",
    gradTo: "#C2410C",
  },
  "Business & Tax": {
    color: "#6D28D9",
    bg: "#F5F3FF",
    border: "#C4B5FD",
    accent: "#7C3AED",
    gradFrom: "#3b0764",
    gradTo: "#6D28D9",
  },
  Utilities: {
    color: "#92400E",
    bg: "#FFFBEB",
    border: "#FCD34D",
    accent: "#D97706",
    gradFrom: "#451a03",
    gradTo: "#92400E",
  },
};

const fallbackCat: CatConfig = {
  color: "#374151",
  bg: "#F3F4F6",
  border: "#D1D5DB",
  accent: "#6B7280",
  gradFrom: "#1f2937",
  gradTo: "#374151",
};

function cfg(category: string) {
  return CAT[category] ?? fallbackCat;
}

// ─── ALL_CATS ordered list ────────────────────────────────────────────────────

const ALL_CATS = [
  "All",
  "Tax & Salary",
  "Money & Banking",
  "Tax & Transport",
  "Business & Tax",
  "Utilities",
] as const;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function readingTime(guide: (typeof seoGuides)[0]) {
  const words = guide.sections.flatMap((s) => s.body).join(" ").split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function GuidesClient() {
  const [active, setActive] = useState<string>("All");

  const [featured, ...rest] = seoGuides;
  const featTime = readingTime(featured);
  const featCfg = cfg(featured.category);

  // When "All" is selected → show rest in grid (featured is the banner above)
  // When a category is selected → show all matching guides in grid, no separate banner
  const showBanner = active === "All";
  const gridGuides =
    active === "All"
      ? rest
      : seoGuides.filter((g) => g.category === active);

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-10 sm:px-6 sm:py-14">

      {/* ── Featured banner ───────────────────────────────────────────────── */}
      {showBanner && (
        <section className="mb-10">
          {/* Editorial eyebrow */}
          <div className="mb-4 flex items-center gap-2">
            <span className="h-px w-6 bg-[#98A2B3]" />
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#98A2B3]">
              Featured guide
            </p>
          </div>

          <Link
            href={`/guides/${featured.slug}`}
            className="group relative flex min-h-[260px] flex-col overflow-hidden rounded-2xl sm:flex-row sm:min-h-[220px]"
            style={{
              background: `linear-gradient(130deg, ${featCfg.gradFrom} 0%, ${featCfg.gradTo} 100%)`,
            }}
          >
            {/* Decorative rings — right side, desktop only */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] overflow-hidden sm:block"
            >
              {/* large ring */}
              <div
                className="absolute -right-24 top-1/2 -translate-y-1/2 h-[340px] w-[340px] rounded-full"
                style={{ border: "56px solid rgba(255,255,255,0.07)" }}
              />
              {/* medium ring */}
              <div
                className="absolute right-16 top-1/2 -translate-y-1/2 h-[180px] w-[180px] rounded-full"
                style={{ border: "32px solid rgba(255,255,255,0.06)" }}
              />
              {/* small ring */}
              <div
                className="absolute right-52 bottom-6 h-[80px] w-[80px] rounded-full"
                style={{ border: "18px solid rgba(255,255,255,0.08)" }}
              />
              {/* faint category watermark text */}
              <p
                className="absolute bottom-4 right-4 select-none font-inter text-[72px] font-black uppercase leading-none tracking-tight"
                style={{ color: "rgba(255,255,255,0.05)" }}
              >
                {featured.category.split(" & ")[0]}
              </p>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-1 flex-col justify-between p-8 sm:p-10 sm:max-w-[64%]">
              <div>
                {/* Meta row */}
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
                    {featured.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-white/60">
                    <Clock className="h-3.5 w-3.5" />
                    {featTime} min read
                  </span>
                </div>

                {/* Headline */}
                <h2 className="font-inter text-[28px] font-extrabold leading-tight text-white sm:text-[34px]">
                  {featured.title}
                </h2>

                {/* Excerpt */}
                <p className="mt-3 max-w-[480px] text-[15px] leading-7 text-white/65">
                  {featured.description}
                </p>

                {/* Keyword tags */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {featured.keywords.slice(0, 3).map((kw) => (
                    <span
                      key={kw}
                      className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/70"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Read link */}
              <div className="mt-8 flex items-center gap-2">
                <span className="text-sm font-extrabold text-white">Read guide</span>
                <ArrowRight className="h-4 w-4 text-white/80 transition-transform group-hover:translate-x-1.5" />
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ── Filter tabs ───────────────────────────────────────────────────── */}
      <div className="mb-8 flex flex-wrap gap-2">
        {ALL_CATS.map((cat) => {
          const isActive = active === cat;
          const c = cat !== "All" ? cfg(cat) : null;

          return (
            <button
              key={cat}
              id={`filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
              onClick={() => setActive(cat)}
              className="rounded-full px-4 py-2 text-sm font-bold transition-all duration-150"
              style={
                isActive
                  ? {
                      backgroundColor: c ? c.accent : "#0B5A2A",
                      color: "#fff",
                      boxShadow: c
                        ? `0 2px 8px ${c.accent}40`
                        : "0 2px 8px #0B5A2A40",
                    }
                  : {
                      backgroundColor: "#F2F4F7",
                      color: "#667085",
                    }
              }
            >
              {cat}
            </button>
          );
        })}

        {/* Guide count */}
        <span className="ml-auto self-center text-[13px] text-[#98A2B3]">
          {gridGuides.length + (showBanner ? 1 : 0)}{" "}
          {gridGuides.length + (showBanner ? 1 : 0) === 1 ? "guide" : "guides"}
        </span>
      </div>

      {/* ── Cards grid ────────────────────────────────────────────────────── */}
      {gridGuides.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-center">
          <p className="text-[#98A2B3]">No guides in this category yet.</p>
          <button
            onClick={() => setActive("All")}
            className="mt-4 text-sm font-bold text-[#0B5A2A] hover:underline"
          >
            View all guides
          </button>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {gridGuides.map((guide) => {
            const rt = readingTime(guide);
            const c = cfg(guide.category);

            return (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#E4E7EC] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                style={{ borderTopColor: c.accent, borderTopWidth: "3px" }}
              >
                {/* Tinted header zone */}
                <div
                  className="flex items-center justify-between px-5 py-3.5"
                  style={{ backgroundColor: c.bg }}
                >
                  <span
                    className="rounded-full border bg-white px-2.5 py-1 text-[11px] font-bold"
                    style={{ color: c.color, borderColor: c.border }}
                  >
                    {guide.category}
                  </span>
                  <span
                    className="flex items-center gap-1 text-[11px] font-semibold"
                    style={{ color: c.color }}
                  >
                    <Clock className="h-3 w-3" />
                    {rt} min read
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <h2 className="font-inter text-[16px] font-extrabold leading-snug text-[#0B1020] transition-colors duration-150 group-hover:text-[#0B5A2A]">
                      {guide.title}
                    </h2>
                    <p className="mt-2.5 line-clamp-3 text-sm leading-6 text-[#667085]">
                      {guide.description}
                    </p>
                  </div>

                  {/* Card footer */}
                  <div className="mt-5 flex items-center justify-between border-t border-[#F2F4F7] pt-4">
                    <span
                      className="text-sm font-bold transition-colors"
                      style={{ color: c.color }}
                    >
                      Read guide
                    </span>
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-150 group-hover:translate-x-0.5"
                      style={{ backgroundColor: c.bg, color: c.color }}
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
