import type { ComponentType, ReactNode } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Grid3X3,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

import { SiteMobileMenu } from "@/components/site-mobile-menu"
import { Button } from "@/components/ui/button"

type CalculatorPageLayoutProps = {
  title: string
  category: string
  description: string
  icon: ComponentType<{ className?: string }>
  children: ReactNode
}

const relatedCalculators = [
  {
    title: "Fuliza Calculator",
    description: "Check your Fuliza limit and usage details.",
    href: "/fuliza-calculator",
  },
  {
    title: "M-KOPA Phone Loan",
    description: "Score phone repayment deals against cash price.",
    href: "/mkopa-phone-loan",
  },
  {
    title: "Net Salary Calculator",
    description: "Calculate your take-home pay after deductions.",
    href: "/net-salary",
  },
  {
    title: "Loan Calculator",
    description: "Calculate monthly payments and total interest.",
    href: "/loan-calculator",
  },
  {
    title: "Budget Planner",
    description: "Plan your income and expenses effectively.",
    href: "/budget-planner",
  },
]

const accentClasses = {
  green: "bg-[#ECFDF3] text-[#0B5A2A]",
  orange: "bg-[#FFF4E5] text-[#B54708]",
  blue: "bg-[#EFF6FF] text-[#2563EB]",
  yellow: "bg-[#FEF9C3] text-[#CA8A04]",
  red: "bg-[#FEF2F2] text-[#DC2626]",
  pink: "bg-[#FDF2F8] text-[#DB2777]",
  teal: "bg-[#ECFDF5] text-[#047857]",
}

function getAccent(title: string, category: string) {
  const value = `${title} ${category}`.toLowerCase()

  if (value.match(/car|import|transport/)) return accentClasses.red
  if (value.match(/salary|tax|vat|paye|nssf|shif/)) return accentClasses.orange
  if (value.match(/phone|m-kopa|mkopa/)) return accentClasses.teal
  if (value.match(/business|invoice|quote|receipt|profit/)) return accentClasses.blue
  if (value.match(/loan|education|school|roi|investment/)) return accentClasses.blue
  if (value.match(/electricity|kplc|utility|utilities/)) return accentClasses.yellow
  if (value.match(/health|lifestyle|bmi|calorie|pregnancy|ovulation|heart|water/)) return accentClasses.pink
  if (value.match(/home|living|construction|building/)) return accentClasses.teal
  if (value.match(/money|m-pesa|mpesa|banking|fuliza|bill|budget|savings/)) return accentClasses.green

  return accentClasses.green
}

function CalculatorHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E4E7EC] bg-white/92 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 lg:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0B5A2A] text-white shadow-sm">
            <span className="font-poppins text-lg font-bold">MC</span>
          </div>
          <div>
            <p className="font-poppins text-lg font-bold leading-tight text-[#0B1020]">MyCalculators</p>
            <p className="text-xs font-medium leading-tight text-[#0B5A2A]">Kenya</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-[#0B1020] md:flex">
          <Link href="/calculators" className="hover:text-[#0B5A2A] transition-colors">Calculators</Link>
          <Link href="/rates" className="hover:text-[#0B5A2A] transition-colors">Rates</Link>
          <Link href="/about" className="hover:text-[#0B5A2A] transition-colors">About</Link>
          <Link href="/contact" className="hover:text-[#0B5A2A] transition-colors">Contact</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button asChild className="hidden h-10 rounded-lg bg-[#0B5A2A] px-5 text-sm font-bold text-white shadow-[0_8px_18px_rgba(11,90,42,0.16)] hover:bg-[#063F20] sm:inline-flex">
            <Link href="/mpesa-charges" className="inline-flex items-center gap-2">
              <Grid3X3 className="h-4 w-4" />
              Try M-Pesa Calculator
            </Link>
          </Button>
          <SiteMobileMenu />
        </div>
      </div>
    </header>
  )
}

function CalculatorFooter() {
  return (
    <footer className="w-full bg-[#063F20] text-white mt-auto">
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
            Essential financial and health calculators designed for Kenyan consumers.
          </p>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-bold font-inter">Popular Calculators</h4>
          <ul className="space-y-2.5 text-sm text-emerald-50/80">
            {[["M-Pesa Charges", "/mpesa-charges"], ["M-KOPA Phone Loan", "/mkopa-phone-loan"], ["Loan Calculator", "/loan-calculator"], ["Net Salary", "/net-salary"]].map(([label, href]) => (
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
        {" · "}
        <Link href="/privacy" className="underline hover:text-white">Privacy Policy</Link>
        {" · "}
        <Link href="/terms" className="underline hover:text-white">Terms of Service</Link>
        {" · "}
        <Link href="/cookies" className="underline hover:text-white">Cookies</Link>
        {" · "}
        <Link href="/disclaimer" className="underline hover:text-white">Disclaimer</Link>
      </div>
    </footer>
  )
}

export function CalculatorPageLayout({ title, category, description, icon: Icon, children }: CalculatorPageLayoutProps) {
  const accent = getAccent(title, category)

  return (
    <>
      <CalculatorHeader />
      <main className="min-h-screen bg-[linear-gradient(180deg,#FFFFFF_0%,#F7FAF8_44%,#FFFFFF_100%)] text-[#0B1020]">
        <div className="mx-auto max-w-[1180px] px-4 py-10 lg:px-6">
          <Link href="/calculators" className="mb-7 inline-flex items-center gap-2 text-sm font-bold text-[#0B5A2A] hover:text-[#063F20]">
            <ArrowLeft className="h-4 w-4" />
            Back to Calculators
          </Link>

          <section className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex max-w-4xl gap-5">
              <div className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-[20px] ${accent}`}>
                <Icon className="h-9 w-9" />
              </div>
              <div>
                <h1 className="font-poppins text-[31px] font-bold leading-tight tracking-tight text-[#0B1020] md:text-[43px]">{title}</h1>
                <span className={`mt-2.5 inline-flex rounded-full px-3 py-1 text-sm font-bold ${accent}`}>
                  {category}
                </span>
                <p className="mt-5 max-w-3xl text-base leading-7 text-[#667085]">{description}</p>
                <div className="mt-6 flex flex-wrap gap-5 text-sm font-semibold text-[#344054]">
                  <span className="inline-flex items-center gap-2"><Check className="h-5 w-5 rounded-full border border-[#0B5A2A] p-0.5 text-[#0B5A2A]" />Updated rates</span>
                  <span className="inline-flex items-center gap-2"><Sparkles className="h-5 w-5 text-[#0B5A2A]" />Kenya-focused</span>
                  <span className="inline-flex items-center gap-2"><Check className="h-5 w-5 rounded-full border border-[#0B5A2A] p-0.5 text-[#0B5A2A]" />Free to use</span>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="calculator-content [&_.rounded-lg]:rounded-2xl [&_.border]:border-[#E4E7EC] [&_.shadow-sm]:shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
              {children}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="mb-5 font-poppins text-2xl font-bold text-[#0B1020]">How this calculator works</h2>
            <div className="grid items-stretch gap-5 md:grid-cols-3">
              {[
                ["1", "Enter amount", "Type the figures or details you want to calculate."],
                ["2", "Choose options", "Select the calculator settings that match your situation."],
                ["3", "View estimate", "Review the expected result before making a decision."],
              ].map(([step, heading, text]) => (
                <div key={step} className="flex h-full min-h-[158px] gap-5 rounded-2xl border border-[#E4E7EC] bg-white p-6 shadow-[0_10px_30px_rgba(16,24,40,0.04)]">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0B5A2A] text-sm font-bold text-white">{step}</span>
                  <div>
                    <h3 className="mb-2 font-poppins font-bold text-[#0B1020]">{heading}</h3>
                    <p className="text-sm leading-6 text-[#667085]">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 grid gap-5 rounded-[20px] border border-[#CFE9D8] bg-[#F7FAF8] p-5 md:grid-cols-[1.2fr_0.8fr_0.8fr] md:items-center md:p-6">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F0FAF4] text-[#0B5A2A]">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-poppins text-lg font-bold text-[#0B5A2A]">Built around Kenyan decisions</h3>
                <p className="mt-1.5 text-sm leading-6 text-[#667085]">Tools are designed for local money, tax, utility, planning and health needs.</p>
              </div>
            </div>
            <div className="border-[#E4E7EC] md:border-l md:pl-6">
              <p className="text-sm text-[#667085]">Local focus</p>
              <p className="font-poppins text-xl font-bold text-[#0B5A2A]">Kenya</p>
            </div>
            <div className="border-[#E4E7EC] md:border-l md:pl-6">
              <p className="text-sm text-[#667085]">Access</p>
              <p className="font-poppins text-xl font-bold text-[#0B5A2A]">Free</p>
            </div>
          </section>

          <section className="mt-12">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="font-poppins text-2xl font-bold text-[#0B1020]">Related Calculators</h2>
              <Link href="/calculators" className="hidden items-center gap-2 text-sm font-bold text-[#0B5A2A] sm:flex">
                View all calculators
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-4">
              {relatedCalculators.map((calculator) => (
                <Link
                  key={calculator.href}
                  href={calculator.href}
                  className="group flex h-full min-h-[168px] flex-col justify-between rounded-2xl border border-[#E4E7EC] bg-white p-6 shadow-[0_10px_30px_rgba(16,24,40,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_38px_rgba(16,24,40,0.08)]"
                >
                  <div>
                    <h3 className="mb-2 font-poppins font-bold text-[#0B1020]">{calculator.title}</h3>
                    <p className="text-sm leading-6 text-[#667085]">{calculator.description}</p>
                  </div>
                  <ArrowRight className="mt-5 h-5 w-5 text-[#0B5A2A] transition group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <CalculatorFooter />
    </>
  )
}
