"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  BriefcaseBusiness,
  Car,
  Check,
  ClipboardList,
  Grid3X3,
  Heart,
  Home,
  Landmark,
  Lightbulb,
  Mail,
  Menu,
  Percent,
  Phone,
  PiggyBank,
  Receipt,
  RefreshCw,
  Search,
  ShieldCheck,
  Smartphone,
  ThumbsUp,
  Wallet,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"

type ToolCard = {
  title: string
  description: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  accent: string
  category?: string
}

type CategoryCard = {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  accent: string
  filter: string
}

const popularTools: ToolCard[] = [
  {
    title: "M-Pesa Charges",
    description: "Calculate send money, withdrawal & payment fees.",
    href: "/mpesa-charges",
    icon: Smartphone,
    accent: "green",
  },
  {
    title: "Net Salary",
    description: "Calculate take-home pay after PAYE, NSSF & SHIF.",
    href: "/net-salary",
    icon: BriefcaseBusiness,
    accent: "orange",
  },
  {
    title: "Loan Calculator",
    description: "Calculate monthly payments, interest & amortization.",
    href: "/loan-calculator",
    icon: Landmark,
    accent: "blue",
  },
  {
    title: "Fuliza Calculator",
    description: "Check overdraft fees and total repayment amounts.",
    href: "/fuliza-calculator",
    icon: Wallet,
    accent: "green",
  },
  {
    title: "Car Import Tax",
    description: "Calculate import duties and taxes for vehicles.",
    href: "/car-import-tax",
    icon: Car,
    accent: "red",
  },
  {
    title: "Electricity Calculator",
    description: "Estimate KPLC token units and costs.",
    href: "/electricity-calculator",
    icon: Zap,
    accent: "yellow",
  },
]

const categories: CategoryCard[] = [
  {
    title: "Money & Banking",
    description: "M-Pesa, Fuliza, savings, bills & more",
    icon: Smartphone,
    accent: "green",
    filter: "Money",
  },
  {
    title: "Salary & Tax",
    description: "PAYE, VAT, NSSF, SHIF & more",
    icon: BriefcaseBusiness,
    accent: "orange",
    filter: "Tax",
  },
  {
    title: "Loans & Planning",
    description: "Loans, ROI, budget, school fees & more",
    icon: ClipboardList,
    accent: "blue",
    filter: "Loans",
  },
  {
    title: "Home & Utilities",
    description: "Electricity, construction, cost of living & more",
    icon: Home,
    accent: "teal",
    filter: "Utilities",
  },
  {
    title: "Health & Lifestyle",
    description: "BMI, calories, pregnancy, health tools & more",
    icon: Heart,
    accent: "pink",
    filter: "Health",
  },
]

const allTools: ToolCard[] = [
  {
    title: "Budget Planner",
    description: "Track income & expenses across categories",
    href: "/budget-planner",
    icon: PiggyBank,
    accent: "green",
    category: "Money",
  },
  {
    title: "Electricity Calculator",
    description: "Calculate KPLC token units and costs",
    href: "/electricity-calculator",
    icon: Zap,
    accent: "yellow",
    category: "Utilities",
  },
  {
    title: "Cost of Living",
    description: "Compare living expenses across Kenyan cities",
    href: "/cost-of-living",
    icon: Home,
    accent: "teal",
    category: "Utilities",
  },
  {
    title: "Construction Cost",
    description: "Estimate building costs based on area & quality",
    href: "/construction-cost",
    icon: Receipt,
    accent: "teal",
    category: "Utilities",
  },
  {
    title: "Bill Splitting",
    description: "Split bills fairly among friends or roommates",
    href: "/bill-splitting",
    icon: Receipt,
    accent: "green",
    category: "Money",
  },
  {
    title: "School Fee Planner",
    description: "Project future education costs with annual increments",
    href: "/school-fee-planner",
    icon: ClipboardList,
    accent: "blue",
    category: "Education",
  },
  {
    title: "ROI Estimator",
    description: "Calculate investment returns with compound interest",
    href: "/roi-estimator",
    icon: Percent,
    accent: "blue",
    category: "Investment",
  },
  {
    title: "VAT Calculator",
    description: "Convert between VAT inclusive and exclusive prices",
    href: "/vat-calculator",
    icon: Receipt,
    accent: "orange",
    category: "Tax",
  },
]

const filters = ["All", "Money", "Tax", "Loans", "Utilities", "Health", "Education", "Lifestyle"]
const chips = ["M-Pesa charges", "Net salary", "Loan calculator", "VAT calculator", "Pregnancy due date"]

const accentClasses = {
  green: "bg-[#ECFDF3] text-[#0B5A2A]",
  orange: "bg-[#FFF4E5] text-[#B54708]",
  blue: "bg-[#EFF6FF] text-[#2563EB]",
  yellow: "bg-[#FEF9C3] text-[#CA8A04]",
  red: "bg-[#FEF2F2] text-[#DC2626]",
  pink: "bg-[#FDF2F8] text-[#DB2777]",
  teal: "bg-[#ECFDF5] text-[#047857]",
}

function accentClass(accent: string) {
  return accentClasses[accent as keyof typeof accentClasses] ?? accentClasses.green
}

function HomeHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E4E7EC] bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 lg:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0B5A2A] shadow-sm">
            <span className="font-inter text-lg font-extrabold text-white">MC</span>
          </div>
          <div>
            <p className="font-inter text-lg font-extrabold leading-tight text-[#0B1020]">MyCalculators</p>
            <p className="text-xs font-semibold leading-tight text-[#0B5A2A]">Kenya</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-[#0B1020] md:flex">
          <a href="/calculators" className="hover:text-[#0B5A2A] transition-colors">Calculators</a>
          <Link href="/rates" className="hover:text-[#0B5A2A] transition-colors">Rates</Link>
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
          <Button variant="outline" size="icon" className="h-10 w-10 rounded-lg border-[#E4E7EC] md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

function SalaryPreview() {
  const deductions = [
    ["PAYE", "KES 15,270"],
    ["NSSF", "KES 5,100"],
    ["SHIF", "KES 2,338"],
    ["AHL", "KES 1,275"],
  ]

  return (
    <div className="relative mx-auto w-full max-w-[440px] rounded-2xl border border-[#E4E7EC] bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0FAF4] text-[#0B5A2A]">
            <Wallet className="h-6 w-6" />
          </div>
          <h2 className="font-inter text-lg font-bold text-[#0B1020]">Net Salary Calculator</h2>
        </div>
        <div className="flex gap-1">
          <span className="h-1 w-1 rounded-full bg-[#667085]" />
          <span className="h-1 w-1 rounded-full bg-[#667085]" />
          <span className="h-1 w-1 rounded-full bg-[#667085]" />
        </div>
      </div>

      <label className="mb-2 block text-sm font-medium text-[#667085]">Gross Salary (KES)</label>
      <div className="mb-5 rounded-xl border border-[#E4E7EC] bg-white px-4 py-3 text-base font-semibold text-[#0B1020]">
        85,000
      </div>

      <div className="space-y-4 border-b border-[#E4E7EC] pb-5">
        {deductions.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between text-[15px]">
            <span className="font-medium text-[#344054]">{label}</span>
            <span className="font-semibold text-[#0B1020]">{value}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="font-inter text-lg font-bold text-[#0B1020]">Net Pay</span>
        <span className="font-inter text-3xl font-extrabold text-[#0B5A2A]">KES 61,018</span>
      </div>

      <div className="mt-6 flex items-center gap-3 rounded-xl bg-[#F0FAF4] px-4 py-3 text-sm font-semibold text-[#0B5A2A]">
        <Check className="h-4 w-4" />
        These calculations use current KRA, NSSF & SHIF rates.
      </div>
    </div>
  )
}

function PopularToolCard({ tool }: { tool: ToolCard }) {
  const Icon = tool.icon

  return (
    <Link
      href={tool.href}
      className="group flex h-full min-h-[210px] flex-col rounded-2xl border border-[#E4E7EC] bg-white p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${accentClass(tool.accent)}`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 font-inter text-[17px] font-bold leading-tight text-[#0B1020]">{tool.title}</h3>
      <p className="mb-6 flex-1 text-[15px] leading-6 text-[#667085]">{tool.description}</p>
      <span className="inline-flex h-11 w-fit items-center gap-2 rounded-xl border border-[#CFEBDD] px-4 text-sm font-bold text-[#0B5A2A] transition group-hover:border-[#0B5A2A] group-hover:bg-[#F0FAF4]">
        Calculate Now
        <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  )
}

function CategoryCard({ category }: { category: CategoryCard }) {
  const Icon = category.icon

  return (
    <Link
      href={`/calculators?category=${encodeURIComponent(category.filter)}`}
      className="group flex h-full min-h-[170px] flex-col rounded-2xl border border-[#E4E7EC] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="mb-5 flex items-center gap-4">
        <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${accentClass(category.accent)}`}>
          <Icon className="h-6 w-6" />
        </span>
        <h3 className="font-inter text-base font-bold leading-tight text-[#0B1020]">{category.title}</h3>
      </div>
      <p className="mb-5 flex-1 text-[15px] leading-6 text-[#667085]">{category.description}</p>
      <span className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-[#0B5A2A]">
        Explore tools
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </Link>
  )
}

function SmallToolCard({ tool }: { tool: ToolCard }) {
  const Icon = tool.icon

  return (
    <Link
      href={tool.href}
      className="flex h-full min-h-[140px] gap-4 rounded-2xl border border-[#E4E7EC] bg-white p-5 shadow-sm transition hover:border-[#CFEBDD] hover:shadow-md"
    >
      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${accentClass(tool.accent)}`}>
        <Icon className="h-5 w-5" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="mb-2 flex flex-wrap items-start gap-2">
          <span className="font-inter text-base font-bold leading-tight text-[#0B1020]">{tool.title}</span>
          {tool.category && (
            <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${accentClass(tool.accent)}`}>
              {tool.category}
            </span>
          )}
        </span>
        <span className="block flex-1 text-[15px] leading-6 text-[#667085]">{tool.description}</span>
      </span>
    </Link>
  )
}

function HomeFooter() {
  const popularLinks = [
    ["M-Pesa Charges", "/mpesa-charges"],
    ["Net Salary Calculator", "/net-salary"],
    ["Loan Calculator", "/loan-calculator"],
    ["Car Import Tax", "/car-import-tax"],
    ["VAT Calculator", "/vat-calculator"],
  ]

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

export default function HomePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const query = searchQuery.trim()
    if (!query) {
      router.push("/calculators")
      return
    }

    router.push(`/calculators?query=${encodeURIComponent(query)}`)
  }

  return (
    <>
      <HomeHeader />

      <main className="bg-[#F7FAF8] text-[#0B1020]">
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_78%_26%,rgba(11,90,42,0.13),transparent_34%),linear-gradient(180deg,#FFFFFF_0%,#F7FAF8_100%)]">
        <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-4 pb-14 pt-12 lg:grid-cols-[1fr_0.86fr] lg:px-6 lg:pb-16 lg:pt-16">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#F0FAF4] px-4 py-2 text-sm font-bold text-[#0B5A2A]">
              <Check className="h-4 w-4" />
              Kenya's #1 Calculator Toolkit
            </div>
            <h1 className="max-w-3xl font-inter text-[40px] font-extrabold leading-[1.05] text-[#0B1020] md:text-[58px] lg:text-[62px]">
              Kenya's Everyday <span className="text-[#0B5A2A]">Calculator Toolkit</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[#667085] md:text-[17px]">
              Calculate M-Pesa charges, loan payments, net salary, bills, taxes, construction costs, health estimates
              and more using simple tools built for Kenyan consumers.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-12 rounded-xl bg-[#0B5A2A] px-6 text-base font-bold text-white hover:bg-[#063F20]">
                <Link href="/mpesa-charges">
                  Open Popular Calculator
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-xl border-[#E4E7EC] bg-white px-6 text-base font-bold text-[#0B5A2A] hover:bg-[#F7FAF8]"
              >
                <a href="/calculators">
                  Browse All Tools
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-5 text-sm font-medium text-[#344054]">
              {["Free to use", "Kenya-focused", "Updated rates"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <Check className="h-5 w-5 rounded-full border border-[#0B5A2A] p-0.5 text-[#0B5A2A]" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <SalaryPreview />
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-4 pt-8 lg:px-6">
        <form onSubmit={handleSearchSubmit} className="rounded-2xl border border-[#E4E7EC] bg-white px-5 py-3 shadow-sm">
          <div className="flex items-center gap-3">
            <Search className="h-4 w-4 shrink-0 text-[#667085]" />
            <input
              className="h-9 flex-1 bg-transparent text-sm text-[#0B1020] outline-none placeholder:text-[#667085]"
              placeholder="Search for a calculator..."
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
            <button
              type="submit"
              className="rounded-md border border-[#E4E7EC] bg-[#F7FAF8] px-3 py-1 text-xs font-bold text-[#667085] transition hover:border-[#0B5A2A] hover:text-[#0B5A2A]"
            >
              Search
            </button>
          </div>
        </form>

        <div className="mt-3 flex flex-wrap items-center gap-2 px-1">
          <span className="text-sm font-medium text-[#667085]">Popular:</span>
          {chips.map((chip) => (
            <Link
              key={chip}
              href={`/calculators?query=${encodeURIComponent(chip)}`}
              className="rounded-full border border-[#E4E7EC] bg-white px-3 py-1 text-xs font-semibold text-[#667085] transition hover:border-[#0B5A2A] hover:text-[#0B5A2A]"
            >
              {chip}
            </Link>
          ))}
        </div>
      </section>

      <section id="popular" className="mx-auto max-w-[1180px] px-4 py-14 lg:px-6">
        <div className="mb-7 flex items-end justify-between gap-4">
          <h2 className="font-inter text-[26px] font-extrabold text-[#0B1020] md:text-[32px]">Popular Calculators</h2>
          <a href="/calculators" className="hidden items-center gap-2 text-[15px] font-bold text-[#0B5A2A] sm:flex">
            View all calculators
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popularTools.map((tool) => (
            <PopularToolCard key={tool.title} tool={tool} />
          ))}
        </div>
      </section>

      <section id="categories" className="mx-auto max-w-[1180px] px-4 pb-10 lg:px-6">
        <h2 className="mb-7 font-inter text-[26px] font-extrabold text-[#0B1020] md:text-[32px]">Browse by Category</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => (
            <CategoryCard key={category.title} category={category} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-4 py-8 lg:px-6">
        <div className="relative overflow-hidden rounded-2xl border border-[#E4E7EC] bg-white shadow-sm">
          <div className="relative grid items-center gap-8 p-6 md:grid-cols-[1.1fr_0.9fr] lg:p-8">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-wide text-[#0B5A2A]">Featured Tool</p>
              <h2 className="mb-4 font-inter text-[28px] font-extrabold text-[#0B5A2A] md:text-[32px]">M-Pesa Charges Calculator</h2>
              <p className="mb-6 max-w-xl text-base leading-7 text-[#667085]">
                Know exactly what you'll pay before sending, withdrawing or paying through M-Pesa.
              </p>
              <div className="mb-7 grid gap-4 text-[15px] font-medium text-[#344054] sm:grid-cols-2">
                {["Send money fees", "Lipa na M-Pesa fees", "Withdraw cash fees", "Buy goods & services fees"].map(
                  (item) => (
                    <span key={item} className="flex items-center gap-3">
                      <Check className="h-5 w-5 rounded-full bg-[#0B5A2A] p-1 text-white" />
                      {item}
                    </span>
                  ),
                )}
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild className="h-12 rounded-xl bg-[#0B5A2A] px-6 font-bold text-white hover:bg-[#063F20]">
                  <Link href="/mpesa-charges">
                    Calculate M-Pesa Fees
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-12 rounded-xl border-[#D0D5DD] bg-white px-6 font-bold text-[#0B5A2A]">
                  <a href="/calculators">View all mobile money tools</a>
                </Button>
              </div>
            </div>

            <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden md:min-h-[320px]">
              <img
                src="/mpesa-phone-mockup-cropped.png"
                alt="M-Pesa Charges Calculator phone preview"
                className="relative h-[280px] w-auto max-w-none object-contain sm:h-[330px] lg:h-[380px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="all-calculators" className="mx-auto max-w-[1180px] px-4 py-12 lg:px-6">
        <h2 className="mb-7 font-inter text-[26px] font-extrabold text-[#0B1020] md:text-[32px]">All Calculators</h2>
        <div className="mb-7 flex flex-wrap gap-3">
          {filters.map((filter, index) => (
            <button
              key={filter}
              className={
                index === 0
                  ? "rounded-full bg-[#0B5A2A] px-6 py-2.5 text-sm font-bold text-white"
                  : "rounded-full border border-[#E4E7EC] bg-white px-6 py-2.5 text-sm font-semibold text-[#667085] transition hover:border-[#0B5A2A] hover:text-[#0B5A2A]"
              }
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {allTools.map((tool) => (
            <SmallToolCard key={tool.title} tool={tool} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild variant="outline" className="h-12 rounded-xl border-[#D0D5DD] bg-white px-7 font-bold text-[#0B5A2A]">
            <a href="/calculators">
              View all calculators
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-[1180px] px-4 py-14 lg:px-6">
        <div className="mx-auto mb-9 max-w-2xl text-center">
          <h2 className="font-inter text-[26px] font-extrabold text-[#0B1020] md:text-[32px]">Made for real Kenyan decisions</h2>
          <p className="mt-4 text-base leading-7 text-[#667085]">
            From mobile money fees to salary deductions and household planning, MyCalculators helps you estimate costs
            before they surprise you.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Kenyan rates",
              description: "Built around local taxes, mobile money charges and common expenses.",
              icon: ShieldCheck,
            },
            {
              title: "Simple inputs",
              description: "No confusing spreadsheets. Just enter the numbers and get results.",
              icon: ThumbsUp,
            },
            {
              title: "Updated regularly",
              description: "Tools are reviewed as rates and rules change so you get accurate results.",
              icon: RefreshCw,
            },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="flex h-full min-h-[150px] gap-5 rounded-2xl border border-[#E4E7EC] bg-white p-6 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F0FAF4] text-[#0B5A2A]">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-2 font-inter font-bold text-[#0B1020]">{item.title}</h3>
                  <p className="text-[15px] leading-7 text-[#667085]">{item.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>
      </main>

      <HomeFooter />
    </>
  )
}

