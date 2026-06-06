"use client";

import Link from "next/link";
import { Cookie, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand-logo"

export default function CookiesPage() {
  return (
    <>
      {/* Header */}
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
            <Link href="/guides" className="hover:text-[#0B5A2A] transition-colors">Guides</Link>
            <Link href="/about" className="hover:text-[#0B5A2A] transition-colors">About</Link>
            <Link href="/contact" className="hover:text-[#0B5A2A] transition-colors">Contact</Link>
          </nav>

          <Button asChild className="hidden h-10 rounded-lg bg-[#0B5A2A] px-5 text-sm font-bold text-white shadow-sm hover:bg-[#063F20] sm:inline-flex">
            <Link href="/mpesa-charges" className="inline-flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Try M-Pesa Calculator
            </Link>
          </Button>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="bg-[#F7FAF8] text-[#0B1020]">
        <div className="mx-auto max-w-[1100px] py-12 px-4 sm:px-6">

          {/* Hero */}
          <div className="flex flex-col items-center text-center mb-12">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#0B5A2A]/10 mb-5">
              <Cookie className="w-8 h-8 text-[#0B5A2A]" />
            </div>
            <h1 className="font-inter font-extrabold text-3xl sm:text-4xl text-[#063F20] mb-3 leading-tight">
              Cookie Policy
            </h1>
            <p className="text-gray-500 text-base sm:text-lg max-w-xl mb-4">
              How we use cookies to provide a better experience.
            </p>
            <span className="inline-flex items-center gap-1.5 bg-[#0B5A2A]/10 text-[#0B5A2A] text-xs font-semibold px-3 py-1.5 rounded-full">
              <Cookie className="w-3.5 h-3.5" />
              Last updated: May 2025
            </span>
          </div>

          {/* Content Cards */}
          <div className="space-y-6">
            
            <section className="bg-white rounded-2xl border border-[#E4E7EC] shadow-sm p-6 sm:p-8">
              <h2 className="font-inter text-xl font-extrabold text-[#0B1020] mb-4">
                1. What Are Cookies?
              </h2>
              <div className="text-sm text-gray-600 leading-relaxed space-y-4">
                <p>
                  Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the owners of the site.
                </p>
              </div>
            </section>

            <section className="bg-white rounded-2xl border border-[#E4E7EC] shadow-sm p-6 sm:p-8">
              <h2 className="font-inter text-xl font-extrabold text-[#0B1020] mb-4">
                2. How We Use Cookies
              </h2>
              <div className="text-sm text-gray-600 leading-relaxed space-y-4">
                <p>
                  At MyCalculators, we keep things simple. We only use cookies for the following purposes:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Essential Cookies:</strong> Required to enable core site functionality such as security, network management, and accessibility. You may disable these by changing your browser settings, but this may affect how the website functions.
                  </li>
                  <li>
                    <strong>Analytics Cookies:</strong> Used to understand how visitors interact with our calculators. We use tools like Google Analytics to track page views and feature usage so we can prioritize new calculators and fix bugs. These cookies collect information anonymously.
                  </li>
                </ul>
              </div>
            </section>

            <section className="bg-white rounded-2xl border border-[#E4E7EC] shadow-sm p-6 sm:p-8">
              <h2 className="font-inter text-xl font-extrabold text-[#0B1020] mb-4">
                3. What We Do NOT Use Cookies For
              </h2>
              <div className="text-sm text-gray-600 leading-relaxed space-y-4">
                <p>
                  We respect your privacy. Therefore, we <strong>do not</strong> use cookies to:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Track you across other websites for targeted advertising.</li>
                  <li>Store sensitive financial data or personal inputs from the calculators (all calculations happen directly in your browser).</li>
                  <li>Sell your browsing data to third parties.</li>
                </ul>
              </div>
            </section>

            <section className="bg-white rounded-2xl border border-[#E4E7EC] shadow-sm p-6 sm:p-8">
              <h2 className="font-inter text-xl font-extrabold text-[#0B1020] mb-4">
                4. Managing Your Cookies
              </h2>
              <div className="text-sm text-gray-600 leading-relaxed space-y-4">
                <p>
                  You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. 
                  However, if you do this, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.
                </p>
                <p>
                  To learn more about how to manage cookies on popular browsers, visit your browser's official documentation.
                </p>
              </div>
            </section>

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
              <li><Link href="/guides" className="hover:text-white transition-colors">Guides</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-bold font-inter">Legal</h4>
            <ul className="space-y-2.5 text-sm text-emerald-50/80">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="text-white font-semibold">Cookie Policy</Link></li>
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
