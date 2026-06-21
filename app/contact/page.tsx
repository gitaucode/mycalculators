"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Check,
  Github,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  Smartphone,
} from "lucide-react"
import { SiteMobileMenu } from "@/components/site-mobile-menu"
import { SiteToolsMenu } from "@/components/site-tools-menu"
import { Button } from "@/components/ui/button"
import { BrandLogo } from "@/components/brand-logo"

// Custom X icon
const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
)

function ContactHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E4E7EC] bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B5A2A] text-white shadow-sm">
            <BrandLogo size={24} />
          </div>
          <div>
            <p className="text-lg font-extrabold leading-tight text-[#0B1020] font-inter">My Calculators</p>
            <p className="text-xs font-semibold leading-tight text-[#0B5A2A]">Kenya</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-9 text-sm font-bold text-[#0B1020] md:flex">
          <Link href="/calculators" className="hover:text-[#0B5A2A] transition-colors">Calculators</Link>
          <Link href="/rates" className="hover:text-[#0B5A2A] transition-colors">Rates</Link>
          <Link href="/guides" className="hover:text-[#0B5A2A] transition-colors">Guides</Link>
          <SiteToolsMenu />
          <Link href="/about" className="hover:text-[#0B5A2A] transition-colors">About</Link>
          <Link href="/contact" className="text-[#0B5A2A]">Contact</Link>
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
  )
}

const faqs = [
  {
    q: "Are all calculators free to use?",
    a: "Yes. Every tool on My Calculators is completely free. No sign-up, no subscription, no hidden charges.",
  },
  {
    q: "How accurate are the rates?",
    a: "We source rates from official institutions - KRA, CBK, Safaricom, NSSF and SHA. We review them regularly but always recommend verifying with the relevant body before making financial decisions.",
  },
  {
    q: "Can I suggest a new calculator?",
    a: "Absolutely! Use the contact form or send an email to hellogitau@gmail.com with your idea. We love hearing what Kenyans actually need.",
  },
  {
    q: "I found a wrong rate. What do I do?",
    a: "Please report it using the form below or email us directly. We'll investigate and update as quickly as possible.",
  },
  {
    q: "Do you store my calculation data?",
    a: "No. All calculations happen in your browser. We do not store your inputs or results on any server.",
  },
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", subject: "General Enquiry", message: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`[My Calculators] ${form.subject}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
    window.location.href = `mailto:hellogitau@gmail.com?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <>
      <ContactHeader />

      <main className="bg-[#F7FAF8] text-[#0B1020]">
        {/* Hero */}
        <section className="mx-auto max-w-[1100px] px-4 pt-12 pb-10 sm:px-6 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#ECFDF3] text-[#0B5A2A] border border-[#CFEBDD]">
            <MessageSquare className="h-7 w-7" />
          </div>
          <h1 className="text-[34px] font-extrabold leading-[1.1] text-[#0B1020] md:text-[44px] font-inter">
            Get in Touch
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-7 text-[#667085]">
            Have a question, found a wrong rate, or want to suggest a new calculator? We'd love to hear from you.
          </p>
        </section>

        {/* Main grid */}
        <section className="mx-auto max-w-[1100px] px-4 pb-16 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

            {/* Contact Form */}
            <div className="rounded-2xl border border-[#E4E7EC] bg-white p-6 sm:p-8 shadow-sm">
              {submitted ? (
                <div className="flex h-full flex-col items-center justify-center py-12 text-center gap-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ECFDF3] text-[#0B5A2A]">
                    <Check className="h-8 w-8" />
                  </div>
                  <h2 className="font-inter text-2xl font-extrabold text-[#0B1020]">Message Sent!</h2>
                  <p className="max-w-sm text-[15px] leading-7 text-[#667085]">
                    Your email app should now open with the message details filled in. Send it from there and we'll reply as soon as possible.
                  </p>
                  <Button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "General Enquiry", message: "" }) }}
                    variant="outline"
                    className="h-11 rounded-xl border-[#E4E7EC] px-6 font-bold text-[#0B1020] hover:bg-[#F7FAF8]"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="font-inter text-xl font-extrabold text-[#0B1020] mb-1">Send a Message</h2>
                  <p className="text-sm text-[#667085] mb-6">Submitting opens your email app with the message pre-filled.</p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-semibold text-[#344054]">Your Name</label>
                        <input
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="e.g. Jane Wanjiku"
                          className="w-full rounded-xl border border-[#E4E7EC] bg-white px-4 py-3 text-sm text-[#0B1020] outline-none placeholder:text-[#667085] focus:border-[#0B5A2A] focus:ring-2 focus:ring-[#0B5A2A]/10 transition"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-semibold text-[#344054]">Email Address</label>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="you@example.com"
                          className="w-full rounded-xl border border-[#E4E7EC] bg-white px-4 py-3 text-sm text-[#0B1020] outline-none placeholder:text-[#667085] focus:border-[#0B5A2A] focus:ring-2 focus:ring-[#0B5A2A]/10 transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-[#344054]">Subject</label>
                      <select
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full rounded-xl border border-[#E4E7EC] bg-white px-4 py-3 text-sm text-[#0B1020] outline-none focus:border-[#0B5A2A] focus:ring-2 focus:ring-[#0B5A2A]/10 transition"
                      >
                        <option>General Enquiry</option>
                        <option>Suggest a Calculator</option>
                        <option>Report an Incorrect Rate</option>
                        <option>Bug Report</option>
                        <option>Partnership / Collaboration</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-[#344054]">Message</label>
                      <textarea
                        required
                        rows={6}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell us what's on your mind..."
                        className="w-full rounded-xl border border-[#E4E7EC] bg-white px-4 py-3 text-sm text-[#0B1020] outline-none placeholder:text-[#667085] focus:border-[#0B5A2A] focus:ring-2 focus:ring-[#0B5A2A]/10 transition resize-none"
                      />
                    </div>

                    <Button type="submit" className="h-12 w-full rounded-xl bg-[#0B5A2A] text-sm font-bold text-white hover:bg-[#063F20] inline-flex items-center justify-center gap-2">
                      <Send className="h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-5">
              {/* Contact info */}
              <div className="rounded-2xl border border-[#E4E7EC] bg-white p-6 shadow-sm">
                <h2 className="font-inter text-[17px] font-extrabold text-[#0B1020] mb-5">Other Ways to Reach Us</h2>
                <div className="space-y-5">
                  <a href="mailto:hellogitau@gmail.com" className="flex items-center gap-4 group">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#ECFDF3] text-[#0B5A2A]">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0B1020] group-hover:text-[#0B5A2A] transition-colors">Email Us</p>
                      <p className="text-sm text-[#667085]">hellogitau@gmail.com</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF4E5] text-[#B54708]">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0B1020]">Based in</p>
                      <p className="text-sm text-[#667085]">Nairobi, Kenya Kenya</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="rounded-2xl bg-[#E4F5EB] border border-[#CFEBDD] p-6 shadow-sm">
                <h3 className="font-inter font-extrabold text-[#0B1020] mb-2">Explore the Tools</h3>
                <p className="text-sm leading-6 text-[#344054] mb-4">Browse 20+ free calculators built for Kenya.</p>
                <Button asChild className="w-full h-11 rounded-xl bg-[#0B5A2A] text-sm font-bold text-white hover:bg-[#063F20]">
                  <Link href="/calculators" className="inline-flex items-center justify-center gap-2">
                    Browse Calculators
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Response time */}
              <div className="rounded-2xl border border-[#E4E7EC] bg-white p-5 shadow-sm flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ECFDF3] text-[#0B5A2A]">
                  <Check className="h-5 w-5" />
                </div>
                <p className="text-sm leading-6 text-[#667085]">
                  Messages are sent through your email app so you keep a copy of what you sent.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-10">
            <h2 className="font-inter text-[26px] font-extrabold text-[#0B1020] mb-6 text-center">Frequently Asked Questions</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {faqs.map((faq) => (
                <div key={faq.q} className="rounded-2xl border border-[#E4E7EC] bg-white p-6 shadow-sm">
                  <h3 className="font-inter text-[15px] font-bold text-[#0B1020] mb-2">{faq.q}</h3>
                  <p className="text-[14px] leading-6 text-[#667085]">{faq.a}</p>
                </div>
              ))}
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
                <p className="font-bold font-inter">My Calculators</p>
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
              <li><Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
              <li><Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        <div className="mx-auto max-w-[1280px] border-t border-white/10 px-4 py-5 text-center text-sm text-emerald-50/75 sm:px-6">
          Â© 2026 My Calculators.
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
