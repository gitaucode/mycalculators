"use client"

import type React from "react"
import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  Calculator,
  Check,
  Compass,
  Facebook,
  Gift,
  Instagram,
  Lightbulb,
  Mail,
  Menu,
  RefreshCw,
  Rocket,
  Shield,
  Smartphone,
  Target,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"

// Custom SVG for X (formerly Twitter)
const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2.5"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
)

// Custom inline SVG for Nairobi Skyline (KICC, Times Tower, and other skyscrapers)
const NairobiSkyline = () => (
  <svg
    className="absolute bottom-0 left-0 right-0 w-full h-[80px] text-[#0B5A2A]/5 pointer-events-none"
    viewBox="0 0 600 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    {/* Background Buildings */}
    <rect x="30" y="55" width="40" height="45" fill="currentColor" opacity="0.3" />
    <rect x="80" y="45" width="30" height="55" fill="currentColor" opacity="0.3" />
    <rect x="240" y="60" width="45" height="40" fill="currentColor" opacity="0.3" />
    <rect x="420" y="50" width="35" height="50" fill="currentColor" opacity="0.3" />

    {/* Times Tower (tall building on the left) */}
    <rect x="140" y="25" width="28" height="75" fill="currentColor" opacity="0.6" />
    <rect x="150" y="12" width="8" height="13" fill="currentColor" opacity="0.6" />
    <line x1="154" y1="12" x2="154" y2="2" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />

    {/* KICC Tower */}
    {/* Cylinder body */}
    <rect x="200" y="38" width="28" height="62" fill="currentColor" />
    {/* KICC body details */}
    <line x1="205" y1="38" x2="205" y2="100" stroke="#F7FAF8" strokeWidth="0.75" opacity="0.4" />
    <line x1="210" y1="38" x2="210" y2="100" stroke="#F7FAF8" strokeWidth="0.75" opacity="0.4" />
    <line x1="214" y1="38" x2="214" y2="100" stroke="#F7FAF8" strokeWidth="0.75" opacity="0.4" />
    <line x1="218" y1="38" x2="218" y2="100" stroke="#F7FAF8" strokeWidth="0.75" opacity="0.4" />
    <line x1="222" y1="38" x2="222" y2="100" stroke="#F7FAF8" strokeWidth="0.75" opacity="0.4" />
    {/* Helipad rim */}
    <ellipse cx="214" cy="38" rx="14" ry="3" fill="currentColor" />
    {/* Cone roof */}
    <path d="M202 37 L214 15 L226 37 Z" fill="currentColor" />
    {/* Amphitheatre dome next to it */}
    <path d="M228 100 C228 75, 260 75, 260 100 Z" fill="currentColor" opacity="0.8" />

    {/* Other Skysrapers */}
    <rect x="300" y="40" width="32" height="60" fill="currentColor" opacity="0.7" />
    {/* UAP Old Mutual Tower (pyramid top) */}
    <rect x="360" y="30" width="26" height="70" fill="currentColor" opacity="0.7" />
    <path d="M360 30 L373 12 L386 30 Z" fill="currentColor" opacity="0.7" />

    {/* Modern skyscraper with curved roof */}
    <path d="M470 100 L470 35 Q485 25 500 35 L500 100 Z" fill="currentColor" opacity="0.6" />

    {/* Small trees/bushes at the base */}
    <circle cx="20" cy="98" r="12" fill="currentColor" opacity="0.25" />
    <circle cx="65" cy="96" r="16" fill="currentColor" opacity="0.25" />
    <circle cx="115" cy="98" r="10" fill="currentColor" opacity="0.25" />
    <circle cx="180" cy="95" r="15" fill="currentColor" opacity="0.25" />
    <circle cx="285" cy="97" r="14" fill="currentColor" opacity="0.25" />
    <circle cx="340" cy="95" r="16" fill="currentColor" opacity="0.25" />
    <circle cx="410" cy="97" r="12" fill="currentColor" opacity="0.25" />
    <circle cx="530" cy="95" r="18" fill="currentColor" opacity="0.25" />
    <circle cx="570" cy="98" r="10" fill="currentColor" opacity="0.25" />

    {/* Ground line */}
    <line x1="0" y1="99" x2="600" y2="99" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

function AboutHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E4E7EC] bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B5A2A] text-white shadow-sm">
            <span className="text-lg font-extrabold font-inter">MC</span>
          </div>
          <div>
            <p className="text-lg font-extrabold leading-tight text-[#0B1020] font-inter">MyCalculators</p>
            <p className="text-xs font-semibold leading-tight text-[#0B5A2A]">Kenya</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-9 text-sm font-bold text-[#0B1020] md:flex">
          <Link href="/calculators" className="hover:text-[#0B5A2A] transition-colors">
            Calculators
          </Link>
          <Link href="/rates" className="hover:text-[#0B5A2A] transition-colors">
            Rates
          </Link>
          <Link href="/about" className="text-[#0B5A2A]">
            About
          </Link>
          <Link href="/contact" className="hover:text-[#0B5A2A] transition-colors">
            Contact
          </Link>
        </nav>

        <Button asChild className="hidden h-10 rounded-lg bg-[#0B5A2A] px-5 text-sm font-bold text-white shadow-sm hover:bg-[#063F20] sm:inline-flex">
          <Link href="/mpesa-charges" className="inline-flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            Try M-Pesa Calculator
          </Link>
        </Button>
      </div>
    </header>
  )
}

function AboutFooter() {
  const popularLinks = [
    ["M-Pesa Charges", "/mpesa-charges"],
    ["Loan Calculator", "/loan-calculator"],
    ["Net Salary", "/net-salary"],
    ["Fuliza Calculator", "/fuliza-calculator"],
    ["Car Import Tax", "/car-import-tax"],
    ["Budget Planner", "/budget-planner"],
  ]

  return (
    <footer id="support" className="w-full bg-[#063F20] text-white">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 pb-8 pt-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#0B5A2A]">
              <span className="font-bold font-inter">MC</span>
            </div>
            <div>
              <p className="font-bold font-inter">MyCalculators</p>
              <p className="text-xs text-emerald-100">Kenya</p>
            </div>
          </div>
          <p className="max-w-sm text-[15px] leading-6 text-emerald-50/80">
            Essential financial and health calculators designed for Kenyan consumers. Make money decisions with confidence
            and accuracy.
          </p>
          <div className="mt-7 flex gap-5 text-emerald-50/80 items-center">
            <a href="https://x.com/ItsMeGitau" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <XIcon className="h-4.5 w-4.5" />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Facebook className="h-4.5 w-4.5" />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Instagram className="h-4.5 w-4.5" />
            </a>
            <a href="mailto:hellogitau@gmail.com" className="hover:text-white transition-colors">
              <Mail className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold font-inter">Popular Calculators</h4>
          <ul className="space-y-2.5 text-sm text-emerald-50/80">
            {popularLinks.map(([label, href]) => (
              <li key={label}>
                <Link href={href} className="hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold font-inter">Resources</h4>
          <ul className="space-y-2.5 text-sm text-emerald-50/80">
            <li><Link href="/guides" className="hover:text-white transition-colors">Financial Guides</Link></li>
            <li><Link href="/rates" className="hover:text-white transition-colors">Current Rates</Link></li>
            <li><Link href="/guides" className="hover:text-white transition-colors">Calculator Tutorials</Link></li>
            <li><Link href="/guides" className="hover:text-white transition-colors">Money Tips</Link></li>
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
  )
}

export default function AboutPage() {
  const badges = [
    { label: "Kenya-focused", renderIcon: () => <span className="mr-1 text-[13px]">Kenya</span> },
    { label: "Free to use", renderIcon: () => <Check className="h-3.5 w-3.5 text-[#0B5A2A] stroke-[3]" /> },
    { label: "No sign-up needed", renderIcon: () => <Users className="h-3.5 w-3.5 text-[#0B5A2A]" /> },
    { label: "Updated regularly", renderIcon: () => <RefreshCw className="h-3.5 w-3.5 text-[#0B5A2A]" /> },
  ]

  const featureCards = [
    {
      title: "20+ Practical Tools",
      description: "Calculators for money, taxes, bills, loans, health and more.",
      icon: Calculator,
    },
    {
      title: "Built for Kenya",
      description: "Made for local realities like M-Pesa, PAYE, SHIF, NSSF, VAT and more.",
      icon: Users,
    },
    {
      title: "Free to Use",
      description: "All tools are 100% free. No hidden fees and no sign-ups required.",
      icon: Gift,
    },
    {
      title: "Updated Regularly",
      description: "We use official sources and review rates to keep calculators accurate and relevant.",
      icon: RefreshCw,
    },
  ]

  const valueCards = [
    {
      title: "Accuracy",
      description: "We use official and publicly available sources where possible. We review rates regularly to stay accurate.",
      icon: Target,
      bgClass: "bg-[#ECFDF3]",
      iconClass: "text-[#0B5A2A]",
    },
    {
      title: "Simplicity",
      description: "No spreadsheets. No complicated formulas. Just clear inputs and useful estimates.",
      icon: Lightbulb,
      bgClass: "bg-[#FFF4E5]",
      iconClass: "text-[#B54708]",
    },
    {
      title: "Local Context",
      description: "We use familiar Kenyan terms, currency and everyday financial situations you understand.",
      icon: Users,
      bgClass: "bg-[#EFF6FF]",
      iconClass: "text-[#2563EB]",
    },
    {
      title: "Privacy",
      description: "Most calculations happen in your browser. We don't store your personal data or calculation history.",
      icon: Shield,
      bgClass: "bg-[#FEF2F2]",
      iconClass: "text-[#DC2626]",
    },
  ]

  return (
    <>
      <AboutHeader />

      <main className="bg-[#F7FAF8] text-[#0B1020]">
        {/* Hero Section */}
        <section className="mx-auto max-w-[1100px] px-4 pt-12 pb-10 sm:px-6 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#ECFDF3] text-[#0B5A2A] border border-[#CFEBDD]">
            <Calculator className="h-7 w-7" />
          </div>
          <h1 className="text-[34px] font-extrabold leading-[1.1] text-[#0B1020] md:text-[44px] font-inter">
            About MyCalculators
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-[16px] leading-7 text-[#667085]">
            MyCalculators is a collection of simple calculators built for Kenyan consumers, covering money, taxes, bills, loans, health and everyday planning.
            The goal is simple: help people understand the numbers before they make decisions.
          </p>

          {/* Badges */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {badges.map((badge) => (
              <span
                key={badge.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#E4E7EC] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#344054]"
              >
                {badge.renderIcon()}
                {badge.label}
              </span>
            ))}
          </div>
        </section>

        {/* Feature Cards Grid */}
        <section className="mx-auto max-w-[1100px] px-4 pb-14 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featureCards.map((card) => {
              const Icon = card.icon
              return (
                <div
                  key={card.title}
                  className="rounded-2xl border border-[#E4E7EC] bg-white p-6 shadow-sm flex flex-col items-start"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0FAF4] text-[#0B5A2A]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-inter text-[16px] font-bold text-[#0B1020]">{card.title}</h3>
                  <p className="text-[14px] leading-6 text-[#667085]">{card.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Mission & Why Kenya-Focused 2-Column Section */}
        <section className="mx-auto max-w-[1100px] px-4 pb-14 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Our Mission */}
            <div className="relative overflow-hidden rounded-2xl border border-[#E4E7EC] bg-white p-6 sm:p-8 flex flex-col justify-between min-h-[360px] pb-[96px] sm:pb-[96px]">
              <div>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0FAF4] text-[#0B5A2A]">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h2 className="font-inter text-xl font-extrabold text-[#0B1020] mb-1">Our Mission</h2>
                <p className="text-[15px] font-bold text-[#0B5A2A] mb-4">To make everyday financial decisions easier.</p>
                <div className="space-y-4 text-[15px] leading-6.5 text-[#667085]">
                  <p>
                    We turn confusing fees, deductions and estimates into simple, practical calculators anyone can use.
                  </p>
                  <p>
                    Our goal is to democratize financial literacy in Kenya by giving people access to accurate tools that help them
                    plan, compare and make informed decisions.
                  </p>
                </div>
              </div>
              <NairobiSkyline />
            </div>

            {/* Why Kenya-Focused */}
            <div className="rounded-2xl border border-[#E4E7EC] bg-white p-6 sm:p-8 flex flex-col min-h-[360px]">
              <div>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0FAF4] text-[#0B5A2A]">
                  <Compass className="h-6 w-6" />
                </div>
                <h2 className="font-inter text-xl font-extrabold text-[#0B1020] mb-1">Why Kenya-Focused?</h2>
                <p className="text-[15px] font-bold text-[#0B5A2A] mb-4">Kenyan finance is unique.</p>
                <div className="space-y-4 text-[15px] leading-6.5 text-[#667085]">
                  <p>Generic calculators often don't reflect our reality.</p>
                  <p>
                    We account for M-Pesa fees, PAYE, SHIF, NSSF, VAT, Fuliza, local utility costs, school fees, car import duties and other common Kenyan financial needs.
                  </p>
                  <p>Everything we build is designed around the numbers Kenyans actually deal with.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="mx-auto max-w-[1100px] px-4 pb-14 sm:px-6">
          <h2 className="mb-7 text-center font-inter text-[26px] font-extrabold text-[#0B1020]">Our Values</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {valueCards.map((value) => {
              const Icon = value.icon
              return (
                <div
                  key={value.title}
                  className="rounded-2xl border border-[#E4E7EC] bg-white p-6 shadow-sm flex flex-col items-center text-center"
                >
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${value.bgClass} ${value.iconClass}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-inter text-[16px] font-bold text-[#0B1020]">{value.title}</h3>
                  <p className="text-[14px] leading-6 text-[#667085]">{value.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Built by Gitau Card */}
        <section className="mx-auto max-w-[1100px] px-4 pb-14 sm:px-6">
          <div className="rounded-2xl border border-[#E4E7EC] bg-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#0B5A2A] text-white font-inter text-2xl font-extrabold">
                G
              </div>
              <div>
                <h3 className="font-inter text-[18px] font-bold text-[#0B1020]">Built by Gitau</h3>
                <p className="text-sm font-semibold text-[#0B5A2A] mt-0.5">Web developer and builder of practical digital tools</p>
                <p className="text-[15px] leading-6.5 text-[#667085] mt-3.5 max-w-2xl">
                  Passionate about building tools that make financial literacy more accessible to Kenyan consumers. When not coding, I'm exploring fintech trends or helping others understand personal finance.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 shrink-0 w-full sm:w-[200px]">
              <Button asChild variant="outline" className="w-full h-11 border-[#E4E7EC] text-[#0B1020] font-bold hover:bg-[#F7FAF8]">
                <a href="https://x.com/ItsMeGitau" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2">
                  <XIcon className="h-4.5 w-4.5" />
                  Follow on X
                </a>
              </Button>
              <Button asChild variant="outline" className="w-full h-11 border-[#E4E7EC] text-[#0B1020] font-bold hover:bg-[#F7FAF8]">
                <a href="mailto:hellogitau@gmail.com" className="inline-flex items-center justify-center gap-2">
                  <Mail className="h-4.5 w-4.5" />
                  Get in Touch
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Explore MyCalculators CTA Block */}
        <section className="mx-auto max-w-[1100px] px-4 pb-16 sm:px-6">
          <div className="rounded-2xl bg-[#E4F5EB] p-8 text-center flex flex-col items-center border border-[#CFEBDD] shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#0B5A2A] text-white">
              <Rocket className="h-5 w-5" />
            </div>
            <h2 className="font-inter text-2xl font-extrabold text-[#0B1020]">Explore MyCalculators</h2>
            <p className="text-[15px] text-[#667085] mt-2 mb-6 max-w-xl leading-6">
              Try the calculators or suggest a tool that would help Kenyan consumers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="h-11 rounded-lg bg-[#0B5A2A] px-6 text-sm font-bold text-white hover:bg-[#063F20]">
                <Link href="/calculators" className="inline-flex items-center gap-2">
                  Try Our Calculators
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-11 rounded-lg border-[#0B5A2A] bg-white px-6 text-sm font-bold text-[#0B5A2A] hover:bg-[#F0FAF4] hover:text-[#0B5A2A]">
                <a href="mailto:hellogitau@gmail.com" className="inline-flex items-center gap-2">
                  Suggest a Calculator
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <AboutFooter />
    </>
  )
}
