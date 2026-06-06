import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Calculator, Clock, Smartphone } from "lucide-react";
import { SiteMobileMenu } from "@/components/site-mobile-menu";
import { SiteToolsMenu } from "@/components/site-tools-menu";
import { Button } from "@/components/ui/button";
import { seoGuides } from "@/lib/seo-guides";
import { BrandLogo } from "@/components/brand-logo";

export const metadata: Metadata = {
  title: "Kenya Calculator Guides - PAYE, M-Pesa, VAT, KPLC & Import Duty",
  description:
    "Practical Kenya calculator guides for PAYE, net salary, M-Pesa charges, VAT, KPLC tokens and car import duty.",
  alternates: {
    canonical: "https://mycalculators.co.ke/guides",
  },
};

function estimateReadingTime(guide: (typeof seoGuides)[0]): number {
  const totalWords = guide.sections
    .flatMap((s) => s.body)
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.ceil(totalWords / 200));
}

// Map category → accent colour pair
const categoryColours: Record<string, { bg: string; text: string; border: string }> = {
  "Tax & Salary":    { bg: "#ECFDF3", text: "#0B5A2A", border: "#CFE9D8" },
  "Money & Banking": { bg: "#EFF6FF", text: "#1D4ED8", border: "#BFDBFE" },
  "Tax & Transport": { bg: "#FFF7ED", text: "#C2410C", border: "#FED7AA" },
  "Business & Tax":  { bg: "#F5F3FF", text: "#6D28D9", border: "#DDD6FE" },
  "Utilities":       { bg: "#FFFBEB", text: "#B45309", border: "#FDE68A" },
};

function getCategoryStyle(category: string) {
  return (
    categoryColours[category] ?? {
      bg: "#F3F4F6",
      text: "#374151",
      border: "#E5E7EB",
    }
  );
}

export default function GuidesPage() {
  const [featured, ...rest] = seoGuides;
  const featuredTime = estimateReadingTime(featured);

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

        <div className="mx-auto max-w-[1100px] px-4 py-12 sm:px-6">

          {/* ── Featured guide ── */}
          <div className="mb-5">
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-[#98A2B3]">
              Featured guide
            </p>
          </div>

          <Link
            href={`/guides/${featured.slug}`}
            className="group mb-14 flex flex-col overflow-hidden rounded-3xl border border-[#CFE9D8] bg-[#0B5A2A] transition-all hover:shadow-xl hover:shadow-[#0B5A2A]/20 sm:flex-row"
          >
            {/* Text side */}
            <div className="flex flex-1 flex-col justify-between p-8 sm:p-10">
              {/* Category + meta */}
              <div>
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white">
                    {featured.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-[#A7F3C4]">
                    <Clock className="h-3.5 w-3.5" />
                    {featuredTime} min read
                  </span>
                </div>
                <h2 className="font-inter text-2xl font-extrabold leading-snug text-white sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#A7F3C4] sm:text-base">
                  {featured.description}
                </p>
                {/* Keywords */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {featured.keywords.slice(0, 3).map((kw) => (
                    <span
                      key={kw}
                      className="rounded-full border border-white/20 px-2.5 py-1 text-[11px] font-semibold text-white/80"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
              {/* CTA */}
              <div className="mt-8 inline-flex items-center gap-2 text-sm font-extrabold text-white">
                Read guide
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>

            {/* Visual side */}
            <div className="flex items-center justify-center bg-[#063F20] p-10 sm:w-64 sm:rounded-r-3xl">
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white/10 text-white">
                <Calculator className="h-12 w-12" />
              </div>
            </div>
          </Link>

          {/* ── Rest of guides ── */}
          <div className="mb-6">
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-[#98A2B3]">
              All guides
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
            {rest.map((guide) => {
              const readingTime = estimateReadingTime(guide);
              const catStyle = getCategoryStyle(guide.category);

              return (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="group flex flex-col justify-between rounded-2xl border border-[#E4E7EC] bg-white p-7 transition-all hover:-translate-y-0.5 hover:border-[#CFE9D8] hover:shadow-md"
                >
                  <div>
                    {/* Category + reading time */}
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <span
                        className="rounded-full border px-2.5 py-1 text-[11px] font-bold"
                        style={{
                          backgroundColor: catStyle.bg,
                          color: catStyle.text,
                          borderColor: catStyle.border,
                        }}
                      >
                        {guide.category}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-[#98A2B3]">
                        <Clock className="h-3 w-3" />
                        {readingTime} min
                      </span>
                    </div>

                    <h2 className="font-inter text-[17px] font-extrabold leading-snug text-[#0B1020] transition-colors group-hover:text-[#0B5A2A]">
                      {guide.title}
                    </h2>
                    <p className="mt-2.5 text-sm leading-6 text-[#667085]">
                      {guide.description}
                    </p>
                  </div>

                  {/* Footer row */}
                  <div className="mt-6 flex items-center justify-between border-t border-[#F2F4F7] pt-4">
                    <span className="text-sm font-bold text-[#0B5A2A]">Read guide</span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ECFDF3] text-[#0B5A2A] transition-transform group-hover:translate-x-0.5">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* ── Bottom CTA strip ── */}
          <div className="mt-16 flex flex-col items-center justify-between gap-5 rounded-2xl border border-[#CFE9D8] bg-white px-8 py-7 sm:flex-row">
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
