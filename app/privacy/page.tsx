"use client";

import Link from "next/link";
import { Shield, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand-logo"

export default function PrivacyPage() {
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
              <Shield className="w-8 h-8 text-[#0B5A2A]" />
            </div>
            <h1 className="font-inter font-extrabold text-3xl sm:text-4xl text-[#063F20] mb-3 leading-tight">
              Privacy Policy
            </h1>
            <p className="text-gray-500 text-base sm:text-lg max-w-xl mb-4">
              How MyCalculators handles your information - and why we keep it simple.
            </p>
            <span className="inline-flex items-center gap-1.5 bg-[#0B5A2A]/10 text-[#0B5A2A] text-xs font-semibold px-3 py-1.5 rounded-full">
              <Shield className="w-3.5 h-3.5" />
              Last updated: May 2025
            </span>
          </div>

          {/* Content Cards */}
          <div className="flex flex-col gap-6">

            {/* 1. Information We Collect */}
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <h2 className="font-inter font-extrabold text-xl text-[#063F20] mb-3">
                1. Information We Collect
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                <strong className="text-[#0B5A2A]">We do not collect any personal data.</strong> All calculations
                on MyCalculators happen entirely in your browser - your financial inputs, health data, or any other
                figures you enter are never sent to our servers.
              </p>
              <p className="text-gray-600 leading-relaxed mb-3">
                We may collect <strong>anonymous usage analytics</strong> - such as page views and device type
                - through tools like Google Analytics. This data is aggregated and cannot be used to identify you.
              </p>
              <p className="text-gray-600 leading-relaxed">
                MyCalculators requires <strong>no account and no login</strong>. You can use every tool on this site
                without providing any personal information.
              </p>
            </section>

            {/* 2. How We Use Information */}
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <h2 className="font-inter font-extrabold text-xl text-[#063F20] mb-3">
                2. How We Use Information
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                The anonymous analytics we may collect are used solely to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-3">
                <li>Improve the site and user experience</li>
                <li>Understand which tools are most useful to Kenyans</li>
                <li>Identify and fix bugs or performance issues</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                We <strong>never sell, rent, or share</strong> any data with third parties for marketing or
                commercial purposes.
              </p>
            </section>

            {/* 3. Cookies */}
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <h2 className="font-inter font-extrabold text-xl text-[#063F20] mb-3">
                3. Cookies
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                MyCalculators uses <strong>minimal cookies</strong> for analytics purposes only. We do not use
                tracking cookies for advertising or retargeting.
              </p>
              <p className="text-gray-600 leading-relaxed">
                You can disable or clear cookies at any time through your browser settings. Doing so will not
                affect your ability to use any calculator on this site.
              </p>
            </section>

            {/* 4. Third-Party Services */}
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <h2 className="font-inter font-extrabold text-xl text-[#063F20] mb-3">
                4. Third-Party Services
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                We may use <strong>Google Analytics</strong> to collect anonymous usage data. Google Analytics
                has its own{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0B5A2A] underline underline-offset-2 hover:text-[#063F20] transition-colors"
                >
                  privacy policy
                </a>
                .
              </p>
              <p className="text-gray-600 leading-relaxed mb-3">
                Financial rates (M-Pesa charges, PAYE tax bands, loan rates, etc.) are sourced from publicly
                available data published by <strong>Safaricom</strong>, the <strong>Kenya Revenue Authority (KRA)</strong>,
                and the <strong>Central Bank of Kenya (CBK)</strong>. We link to their official sites where relevant.
              </p>
              <p className="text-gray-600 leading-relaxed">
                External links on this site take you to official government or corporate websites. We are not
                responsible for the content or privacy practices of those sites.
              </p>
            </section>

            {/* 5. Data Security */}
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <h2 className="font-inter font-extrabold text-xl text-[#063F20] mb-3">
                5. Data Security
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                All calculations on MyCalculators are performed <strong>client-side in your browser</strong>. We
                do not transmit or store your financial inputs, health data, or any other figures you enter on
                our servers.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Because we collect no personal data, there is no sensitive personal information at risk of
                being compromised on our end.
              </p>
            </section>

            {/* 6. Children's Privacy */}
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <h2 className="font-inter font-extrabold text-xl text-[#063F20] mb-3">
                6. Children&apos;s Privacy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                MyCalculators is not directed at children under the age of 13. We do not knowingly collect any
                information from children. If you believe a child has provided personal information through
                this site, please contact us and we will address it promptly.
              </p>
            </section>

            {/* 7. Changes to This Policy */}
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <h2 className="font-inter font-extrabold text-xl text-[#063F20] mb-3">
                7. Changes to This Policy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this Privacy Policy from time to time. Any changes will be reflected by an
                updated &ldquo;Last updated&rdquo; date at the top of this page. We encourage you to review
                this page periodically. Continued use of MyCalculators after changes are posted constitutes
                acceptance of those changes.
              </p>
            </section>

            {/* 8. Contact Us */}
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <h2 className="font-inter font-extrabold text-xl text-[#063F20] mb-3">
                8. Contact Us
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you have any questions or concerns about this Privacy Policy, please reach out:
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="mailto:hellogitau@gmail.com"
                  className="inline-flex items-center gap-2 bg-[#0B5A2A]/10 hover:bg-[#0B5A2A]/20 text-[#0B5A2A] font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  hellogitau@gmail.com
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#0B5A2A] hover:bg-[#063F20] text-white font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors"
                >
                  Visit Contact Page
                </Link>
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
              <li><Link href="/privacy" className="text-white font-semibold">Privacy Policy</Link></li>
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
