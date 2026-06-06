import type { Metadata } from "next";
import Link from "next/link";
import { Smartphone } from "lucide-react";
import { SiteMobileMenu } from "@/components/site-mobile-menu";
import { SiteToolsMenu } from "@/components/site-tools-menu";
import { Button } from "@/components/ui/button";
import { seoGuides } from "@/lib/seo-guides";
import { BrandLogo } from "@/components/brand-logo";
import { ArrowRight, BookOpen } from "lucide-react";
import GuidesClient from "./GuidesClient";

export const metadata: Metadata = {
  title: "Kenya Calculator Guides - PAYE, M-Pesa, VAT, KPLC & Import Duty",
  description:
    "Practical Kenya calculator guides for PAYE, net salary, M-Pesa charges, VAT, KPLC tokens and car import duty.",
  alternates: {
    canonical: "https://mycalculators.co.ke/guides",
  },
};

export default function GuidesPage() {
  return (
    <>
      {/* ── Navigation ── */}
      <header className="sticky top-0 z-50 w-full border-b border-[#E4E7EC] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B5A2A] text-white shadow-sm">
              <BrandLogo size={24} />
            </div>
            <div>
              <p className="font-inter text-lg font-extrabold leading-tight text-[#0B1020]">MyCalculators</p>
              <p className="text-xs font-semibold leading-tight text-[#0B5A2A]">Kenya</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-9 text-sm font-bold text-[#0B1020] md:flex">
            <Link href="/calculators" className="transition-colors hover:text-[#0B5A2A]">Calculators</Link>
            <Link href="/rates" className="transition-colors hover:text-[#0B5A2A]">Rates</Link>
            <Link href="/guides" className="text-[#0B5A2A]">Guides</Link>
            <SiteToolsMenu />
            <Link href="/about" className="transition-colors hover:text-[#0B5A2A]">About</Link>
            <Link href="/contact" className="transition-colors hover:text-[#0B5A2A]">Contact</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              asChild
              className="hidden h-10 rounded-lg bg-[#0B5A2A] px-5 text-sm font-bold text-white shadow-sm hover:bg-[#063F20] sm:inline-flex"
            >
              <Link href="/mpesa-charges" className="inline-flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                Try M-Pesa Calculator
              </Link>
            </Button>
            <SiteMobileMenu />
          </div>
        </div>
      </header>

      <main className="min-h-[70vh] bg-[#F7FAF8] text-[#0B1020]">

        {/* ── Hero band ── */}
        <div className="border-b border-[#E4E7EC] bg-white">
          <div className="mx-auto max-w-[1100px] px-4 py-12 sm:px-6 lg:py-16">
            <div className="flex items-center gap-3 mb-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ECFDF3] text-[#0B5A2A]">
                <BookOpen className="h-5 w-5" />
              </span>
              <span className="rounded-full bg-[#ECFDF3] px-3 py-1 text-xs font-bold text-[#0B5A2A]">
                {seoGuides.length} guides
              </span>
            </div>
            <h1 className="font-inter text-[30px] font-extrabold leading-tight text-[#0B1020] sm:text-[42px]">
              Financial Guides for Kenya
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#475467] sm:text-lg">
              Practical explainers for understanding taxes, deductions, fees and everyday money calculations — each paired with a free calculator.
            </p>
          </div>
        </div>

        {/* ── Interactive content (client) ── */}
        <GuidesClient />

        {/* ── Bottom CTA strip ── */}
        <div className="mx-auto max-w-[1100px] px-4 pb-16 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-5 rounded-2xl border border-[#CFE9D8] bg-white px-8 py-7 sm:flex-row">
            <div>
              <p className="font-inter text-lg font-extrabold text-[#0B1020]">
                Looking for a specific calculator?
              </p>
              <p className="mt-1 text-sm text-[#667085]">
                Browse all free tools for Kenya — no sign-up required.
              </p>
            </div>
            <Button
              asChild
              className="h-11 shrink-0 rounded-xl bg-[#0B5A2A] px-6 text-sm font-bold text-white hover:bg-[#063F20]"
            >
              <Link href="/calculators" className="inline-flex items-center gap-2">
                Browse Calculators
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="w-full bg-[#063F20] text-white">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-4 pb-8 pt-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#0B5A2A]">
                <BrandLogo size={24} />
              </div>
              <div>
                <p className="font-inter font-bold">MyCalculators</p>
                <p className="text-xs text-emerald-100">Kenya</p>
              </div>
            </div>
            <p className="max-w-sm text-[15px] leading-6 text-emerald-50/80">
              Essential financial and health calculators designed for Kenyan consumers.
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-inter text-sm font-bold">Popular Calculators</h4>
            <ul className="space-y-2.5 text-sm text-emerald-50/80">
              {[
                ["M-Pesa Charges", "/mpesa-charges"],
                ["Loan Calculator", "/loan-calculator"],
                ["Net Salary", "/net-salary"],
                ["Car Import Tax", "/car-import-tax"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="transition-colors hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-inter text-sm font-bold">Navigation</h4>
            <ul className="space-y-2.5 text-sm text-emerald-50/80">
              <li><Link href="/rates" className="transition-colors hover:text-white">Current Rates</Link></li>
              <li><Link href="/guides" className="transition-colors hover:text-white">Guides</Link></li>
              <li><Link href="/about" className="transition-colors hover:text-white">About</Link></li>
              <li><Link href="/contact" className="transition-colors hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-inter text-sm font-bold">Legal</h4>
            <ul className="space-y-2.5 text-sm text-emerald-50/80">
              <li><Link href="/privacy" className="transition-colors hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="transition-colors hover:text-white">Terms of Service</Link></li>
              <li><Link href="/cookies" className="transition-colors hover:text-white">Cookie Policy</Link></li>
              <li><Link href="/disclaimer" className="transition-colors hover:text-white">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        <div className="mx-auto max-w-[1280px] border-t border-white/10 px-4 py-5 text-center text-sm text-emerald-50/75 sm:px-6">
          © 2026 MyCalculators.{" "}
          <Link href="/privacy" className="underline hover:text-white">Privacy Policy</Link>
          {" - "}
          <Link href="/terms" className="underline hover:text-white">Terms of Service</Link>
          {" - "}
          <Link href="/cookies" className="underline hover:text-white">Cookies</Link>
          {" - "}
          <Link href="/disclaimer" className="underline hover:text-white">Disclaimer</Link>
        </div>
      </footer>
    </>
  );
}
