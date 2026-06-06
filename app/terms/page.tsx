"use client"

import Link from "next/link"
import { FileText, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BrandLogo } from "@/components/brand-logo"

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing and using MyCalculators (mycalculators.co.ke), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. We reserve the right to update these terms at any time, and continued use of the site constitutes acceptance of any changes.`,
  },
  {
    title: "2. Description of Service",
    content: `MyCalculators provides free online calculators and rate reference tools designed for Kenyan consumers. These include, but are not limited to, calculators for M-Pesa charges, net salary (PAYE, NSSF, SHIF), loan repayments, VAT, car import tax, electricity costs, BMI, and other financial or health estimates. All tools are provided free of charge and require no account or registration.`,
  },
  {
    title: "3. Disclaimer of Accuracy",
    content: `All calculations and rates provided by MyCalculators are for estimation and planning purposes only. While we strive to keep rates current and accurate by referencing official sources (KRA, CBK, Safaricom, SHA, KPLC), we do not guarantee that the information is complete, accurate, or up to date at the time of use.\n\nRates and tax rules change frequently. Always verify figures with the relevant institution - your employer, bank, Kenya Revenue Authority, Safaricom, or other official body - before making any financial decisions. MyCalculators accepts no liability for decisions made based on estimates from this site.`,
  },
  {
    title: "4. No Financial or Legal Advice",
    content: `MyCalculators is not a licensed financial advisor, tax consultant, or legal practitioner. Nothing on this site constitutes financial, tax, investment, or legal advice. The tools are informational aids to help you understand numbers, not professional recommendations. For advice specific to your situation, consult a qualified professional.`,
  },
  {
    title: "5. Intellectual Property",
    content: `All content on MyCalculators - including calculator logic, design, copy, and code - is the property of MyCalculators and its creator. You may not reproduce, redistribute, or sell any part of the site without explicit written permission. Rate data sourced from official third parties (KRA, CBK, Safaricom, etc.) remains the property of those respective institutions.`,
  },
  {
    title: "6. User Conduct",
    content: `You agree not to:\n- Use the site for any unlawful purpose\n- Attempt to disrupt or compromise the site's functionality\n- Scrape or automate requests to the site without permission\n- Misrepresent calculator outputs as official or certified figures\n\nWe reserve the right to restrict access to any user or entity violating these terms.`,
  },
  {
    title: "7. Third-Party Links",
    content: `MyCalculators may contain links to external websites such as KRA, CBK, Safaricom, KPLC, or SHA. These links are provided for reference. We are not responsible for the content, accuracy, or privacy practices of any external site. Visiting third-party links is at your own risk.`,
  },
  {
    title: "8. Limitation of Liability",
    content: `To the fullest extent permitted by Kenyan law, MyCalculators and its creator shall not be liable for any direct, indirect, incidental, or consequential damages arising from:\n- Use of or reliance on calculator estimates\n- Inaccurate or outdated rate information\n- Interruption or unavailability of the service\n- Any errors or omissions in content\n\nYour use of this service is entirely at your own risk.`,
  },
  {
    title: "9. Availability",
    content: `We aim to keep MyCalculators available at all times but do not guarantee uninterrupted access. The service may be temporarily unavailable due to maintenance, updates, or technical issues beyond our control. We are not liable for any inconvenience caused by downtime.`,
  },
  {
    title: "10. Governing Law",
    content: `These Terms of Service are governed by the laws of the Republic of Kenya. Any disputes arising from use of MyCalculators shall be subject to the exclusive jurisdiction of the courts of Kenya.`,
  },
  {
    title: "11. Changes to These Terms",
    content: `We may revise these Terms of Service from time to time. The date at the top of this page reflects the most recent update. Continued use of the site after any changes constitutes your acceptance of the revised terms.`,
  },
  {
    title: "12. Contact",
    content: `For questions about these Terms of Service, please contact us:\n\nEmail: hellogitau@gmail.com\nWebsite: mycalculators.co.ke/contact`,
  },
]

export default function TermsPage() {
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

      <main className="bg-[#F7FAF8] text-[#0B1020]">
        {/* Hero */}
        <section className="mx-auto max-w-[1100px] px-4 pt-12 pb-10 sm:px-6 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#ECFDF3] text-[#0B5A2A] border border-[#CFEBDD]">
            <FileText className="h-7 w-7" />
          </div>
          <h1 className="text-[34px] font-extrabold leading-[1.1] text-[#0B1020] md:text-[44px] font-inter">
            Terms of Service
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-7 text-[#667085]">
            Please read these terms carefully before using MyCalculators. By using our calculators and tools, you agree to the terms below.
          </p>
          <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#E4E7EC] bg-white px-4 py-1.5 text-sm font-semibold text-[#667085]">
            Last updated: May 2025
          </span>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-[1100px] px-4 pb-16 sm:px-6">
          <div className="grid gap-5">
            {sections.map((section) => (
              <article key={section.title} className="rounded-2xl border border-[#E4E7EC] bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="font-inter text-[17px] font-extrabold text-[#0B1020] mb-3">{section.title}</h2>
                <div className="space-y-3">
                  {section.content.split("\n").map((para, i) =>
                    para.trim() ? (
                      <p key={i} className={`text-[15px] leading-7 ${para.startsWith("-") ? "pl-4 text-[#344054]" : "text-[#667085]"}`}>
                        {para}
                      </p>
                    ) : null
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-8 rounded-2xl bg-[#E4F5EB] border border-[#CFEBDD] p-8 text-center shadow-sm">
            <h2 className="font-inter text-xl font-extrabold text-[#0B1020] mb-2">Ready to use MyCalculators?</h2>
            <p className="text-[15px] text-[#667085] mb-5">
              All calculators are free, private, and built for Kenya.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="h-11 rounded-xl bg-[#0B5A2A] px-6 text-sm font-bold text-white hover:bg-[#063F20]">
                <Link href="/calculators" className="inline-flex items-center gap-2">
                  Browse All Calculators
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-11 rounded-xl border-[#0B5A2A] bg-white px-6 text-sm font-bold text-[#0B5A2A] hover:bg-[#F0FAF4]">
                <Link href="/privacy">Read Privacy Policy</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#063F20] text-white">
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
              <li><Link href="/terms" className="text-white font-semibold">Terms of Service</Link></li>
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
  )
}
