"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";

type SiteMobileMenuProps = {
  categoriesHref?: string;
  className?: string;
  panelTopClass?: string;
};

const baseLinks = [
  ["Calculators", "/calculators"],
  ["Rates", "/rates"],
  ["Resources", "/guides"],
  ["About", "/about"],
  ["Contact", "/contact"],
] as const;

export function SiteMobileMenu({
  categoriesHref,
  className = "md:hidden",
  panelTopClass = "top-20",
}: SiteMobileMenuProps) {
  const [open, setOpen] = useState(false);
  const links = categoriesHref
    ? [
        baseLinks[0],
        ["Categories", categoriesHref] as const,
        ...baseLinks.slice(1),
      ]
    : baseLinks;

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className={`relative z-[90] h-10 w-10 rounded-xl border-[#E4E7EC] bg-white ${className}`}
        aria-expanded={open}
        aria-controls="site-mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {open ? (
        <div className="fixed inset-0 z-[80]">
          <button
            type="button"
            className="absolute inset-0 bg-[#0B1020]/20 backdrop-blur-[2px]"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div
            id="site-mobile-menu"
            className={`absolute right-4 ${panelTopClass} w-[calc(100vw-2rem)] max-w-[360px] overflow-hidden rounded-2xl border border-[#E4E7EC] bg-white shadow-[0_24px_60px_rgba(16,24,40,0.22)]`}
            aria-label="Mobile navigation"
          >
            <div className="flex items-start justify-between gap-5 border-b border-[#E4E7EC] px-5 py-4">
              <div>
                <p className="font-inter text-xl font-extrabold text-[#0B1020]">
                  MyCalculators
                </p>
                <p className="mt-1 text-sm font-semibold text-[#0B5A2A]">
                  Kenya
                </p>
              </div>
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E4E7EC] text-[#0B1020] transition hover:bg-[#F7FAF8]"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="grid gap-1 px-3 py-3">
              {links.map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center rounded-xl px-3 text-base font-bold text-[#0B1020] transition hover:bg-[#F0FAF4] hover:text-[#0B5A2A]"
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="border-t border-[#E4E7EC] px-5 py-4">
              <Link
                href="/mpesa-charges"
                onClick={() => setOpen(false)}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0B5A2A] px-4 text-sm font-extrabold text-white transition hover:bg-[#063F20]"
              >
                <Zap className="h-4 w-4" />
                Try M-Pesa Calculator
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
