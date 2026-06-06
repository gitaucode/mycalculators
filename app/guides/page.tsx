import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Calculator, Smartphone } from "lucide-react";
import { SiteMobileMenu } from "@/components/site-mobile-menu";
import { SiteToolsMenu } from "@/components/site-tools-menu";
import { Button } from "@/components/ui/button";
import { seoGuides } from "@/lib/seo-guides";
import { BrandLogo } from "@/components/brand-logo"

export const metadata: Metadata = {
  title: "Kenya Calculator Guides - PAYE, M-Pesa, VAT, KPLC & Import Duty",
  description:
    "Practical Kenya calculator guides for PAYE, net salary, M-Pesa charges, VAT, KPLC tokens and car import duty.",
  alternates: {
    canonical: "https://mycalculators.co.ke/guides",
  },
};

export default function GuidesPage() {
  const guideStarters = seoGuides.map((guide) => ({
    title: guide.title,
    desc: guide.description,
    category: guide.category,
    href: `/guides/${guide.slug}`,
  }));

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-[#E4E7EC] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B5A2A] text-white shadow-sm">
              <BrandLogo size={24} />
            </div>
            <div>
              <p className="text-lg font-extrabold leading-tight text-[#0B1020] font-inter">MyCalculators</p>
              <p className="text-xs font-semibold leading-tight text-[#0B5A2A]">Kenya</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-9 text-sm font-bold text-[#0B1020] md:flex">
            <Link href="/calculators" className="hover:text-[#0B5A2A] transition-colors">Calculators</Link>
            <Link href="/rates" className="hover:text-[#0B5A2A] transition-colors">Rates</Link>
            <SiteToolsMenu />
            <Link href="/about" className="hover:text-[#0B5A2A] transition-colors">About</Link>
            <Link href="/contact" className="hover:text-[#0B5A2A] transition-colors">Contact</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button asChild className="hidden h-10 rounded-lg bg-[#0B5A2A] px-5 text-sm font-bold text-white shadow-sm hover:bg-[#063F20] sm:inline-flex">
              <Link href="/mpesa-charges" className="inline-flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                Try M-Pesa Calculator
              </Link>
            </Button>
            <SiteMobileMenu />
          </div>
        </div>
      </header>

      <main className="bg-[#F7FAF8] text-[#0B1020] min-h-[70vh]">
        <div className="mx-auto max-w-[1100px] py-12 px-4 sm:px-6">

          {/* Hero */}
          <div className="flex flex-col items-center text-center mb-16">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#0B5A2A]/10 mb-5">
              <BookOpen className="w-8 h-8 text-[#0B5A2A]" />
            </div>
            <h1 className="font-inter font-extrabold text-3xl sm:text-4xl text-[#063F20] mb-4 leading-tight">
              Financial Guides & Tutorials
            </h1>
            <p className="text-gray-500 text-base sm:text-lg max-w-2xl mb-6">
              Practical starting points for understanding Kenyan fees, deductions, taxes and everyday planning tools.
            </p>
          </div>

          <div className="mb-10 flex items-center justify-between">
            <h2 className="font-inter text-2xl font-extrabold text-[#0B1020]">Start Here</h2>
            <div className="text-sm font-semibold text-[#0B5A2A] bg-[#0B5A2A]/10 px-3 py-1 rounded-full">
              Calculator-backed guides
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {guideStarters.map((guide) => (
              <Link key={guide.title} href={guide.href} className="group relative flex min-h-[230px] flex-col justify-between rounded-2xl border border-[#E4E7EC] bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-[#0B5A2A]/30">
                <div>
                  <div className="mb-4 inline-flex items-center rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600">
                    {guide.category}
                  </div>
                  <h3 className="mb-2 font-inter text-lg font-bold text-[#0B1020] group-hover:text-[#0B5A2A] transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-500">
                    {guide.desc}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#0B5A2A]">
                  <Calculator className="h-4 w-4" />
                  Read guide
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#063F20] text-white mt-auto">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-4 pb-8 pt-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#0B5A2A]">
                <BrandLogo size={24} />
              </div>
              <div>
                <p className="font-bold font-inter">MyCalculators</p>
                <p className="text-xs text-emerald-100">Kenya</p>
              </div>
            </div>
            <p className="max-w-sm text-[15px] leading-6 text-emerald-50/80">
              Essential financial and health calculators designed for Kenyan consumers.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-bold font-inter">Popular Calculators</h4>
            <ul className="space-y-2.5 text-sm text-emerald-50/80">
              {[["M-Pesa Charges", "/mpesa-charges"], ["Loan Calculator", "/loan-calculator"], ["Net Salary", "/net-salary"], ["Car Import Tax", "/car-import-tax"]].map(([label, href]) => (
                <li key={label}><Link href={href} className="hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-bold font-inter">Navigation</h4>
            <ul className="space-y-2.5 text-sm text-emerald-50/80">
              <li><Link href="/rates" className="hover:text-white transition-colors">Current Rates</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-bold font-inter">Legal</h4>
            <ul className="space-y-2.5 text-sm text-emerald-50/80">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
              <li><Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        <div className="mx-auto max-w-[1280px] border-t border-white/10 px-4 py-5 text-center text-sm text-emerald-50/75 sm:px-6">
          © 2026 MyCalculators.
          {" - "}
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
