"use client"

import type React from "react"
import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Activity,
  BriefcaseBusiness,
  Calendar,
  Calculator,
  Car,
  ClipboardList,
  Droplets,
  Fuel,
  FileText,
  Heart,
  Home,
  Landmark,
  Percent,
  Receipt,
  Search,
  Smartphone,
  Users,
  Wallet,
  Zap,
} from "lucide-react"

import { SiteMobileMenu } from "@/components/site-mobile-menu"
import { SiteToolsMenu } from "@/components/site-tools-menu"
import { Button } from "@/components/ui/button"
import { BrandLogo } from "@/components/brand-logo"

type ToolCard = {
  title: string
  description: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  accent: keyof typeof accentClasses
  category: string
}

const accentClasses = {
  green: "bg-[#ECFDF3] text-[#0B5A2A]",
  orange: "bg-[#FFF4E5] text-[#B54708]",
  blue: "bg-[#EFF6FF] text-[#2563EB]",
  yellow: "bg-[#FEF9C3] text-[#CA8A04]",
  red: "bg-[#FEF2F2] text-[#DC2626]",
  pink: "bg-[#FDF2F8] text-[#DB2777]",
  teal: "bg-[#ECFDF5] text-[#047857]",
}

const tools: ToolCard[] = [
  {
    title: "M-Pesa Charges",
    description: "Calculate send money, withdrawal and payment fees.",
    href: "/mpesa-charges",
    icon: Smartphone,
    accent: "green",
    category: "Money",
  },
  {
    title: "M-KOPA Phone Loan",
    description: "Score phone loan repayments against the cash price.",
    href: "/mkopa-phone-loan",
    icon: Smartphone,
    accent: "teal",
    category: "Money",
  },
  {
    title: "Net Salary",
    description: "Calculate take-home pay after PAYE, NSSF and SHIF.",
    href: "/net-salary",
    icon: BriefcaseBusiness,
    accent: "orange",
    category: "Tax",
  },
  {
    title: "Loan Calculator",
    description: "Estimate monthly payments, total interest and repayment cost.",
    href: "/loan-calculator",
    icon: Landmark,
    accent: "blue",
    category: "Loans",
  },
  {
    title: "Mortgage Calculator",
    description: "Estimate home loan repayments and upfront cash needs.",
    href: "/mortgage-calculator",
    icon: Home,
    accent: "blue",
    category: "Loans",
  },
  {
    title: "Fuliza Calculator",
    description: "Check overdraft fees and total repayment amounts.",
    href: "/fuliza-calculator",
    icon: Wallet,
    accent: "green",
    category: "Money",
  },
  {
    title: "Car Import Tax",
    description: "Estimate duties and taxes for importing vehicles.",
    href: "/car-import-tax",
    icon: Car,
    accent: "red",
    category: "Transport",
  },
  {
    title: "Fuel Cost Calculator",
    description: "Estimate petrol or diesel costs for trips and commutes.",
    href: "/fuel-cost-calculator",
    icon: Fuel,
    accent: "red",
    category: "Transport",
  },
  {
    title: "Electricity Calculator",
    description: "Estimate KPLC token units and electricity costs.",
    href: "/electricity-calculator",
    icon: Zap,
    accent: "yellow",
    category: "Utilities",
  },
  {
    title: "Water Bill Calculator",
    description: "Estimate water, sewerage and service charges.",
    href: "/water-bill-calculator",
    icon: Droplets,
    accent: "teal",
    category: "Utilities",
  },
  {
    title: "Budget Planner",
    description: "Track income and expenses across categories.",
    href: "/budget-planner",
    icon: ClipboardList,
    accent: "green",
    category: "Money",
  },
  {
    title: "VAT Calculator",
    description: "Convert between VAT inclusive and exclusive prices.",
    href: "/vat-calculator",
    icon: Percent,
    accent: "orange",
    category: "Tax",
  },
  {
    title: "Withholding Tax",
    description: "Estimate WHT deductions, net payable and gross-up values.",
    href: "/withholding-tax-calculator",
    icon: Percent,
    accent: "orange",
    category: "Tax",
  },
  {
    title: "Invoice Generator",
    description: "Create printable invoices with VAT and payment details.",
    href: "/invoice-generator",
    icon: FileText,
    accent: "blue",
    category: "Business",
  },
  {
    title: "Receipt Generator",
    description: "Create printable receipts for completed payments.",
    href: "/receipt-generator",
    icon: Receipt,
    accent: "blue",
    category: "Business",
  },
  {
    title: "Cost of Living",
    description: "Compare living expenses across Kenyan cities.",
    href: "/cost-of-living",
    icon: Home,
    accent: "teal",
    category: "Utilities",
  },
  {
    title: "Construction Cost",
    description: "Estimate building costs based on area and quality.",
    href: "/construction-cost",
    icon: Receipt,
    accent: "teal",
    category: "Home",
  },
  {
    title: "School Fee Planner",
    description: "Project future education costs with annual increments.",
    href: "/school-fee-planner",
    icon: ClipboardList,
    accent: "blue",
    category: "Education",
  },
  {
    title: "ROI Estimator",
    description: "Calculate investment returns with compound interest.",
    href: "/roi-estimator",
    icon: Percent,
    accent: "blue",
    category: "Investment",
  },
  {
    title: "Chama/SACCO Calculator",
    description: "Project group savings, member shares and loan limits.",
    href: "/chama-sacco-calculator",
    icon: Users,
    accent: "green",
    category: "Money",
  },
  {
    title: "Savings Goal",
    description: "Plan monthly savings needed to reach a target amount.",
    href: "/savings-goal",
    icon: Wallet,
    accent: "green",
    category: "Money",
  },
  {
    title: "Bill Splitting",
    description: "Split shared bills fairly among friends or roommates.",
    href: "/bill-splitting",
    icon: Receipt,
    accent: "green",
    category: "Money",
  },
  {
    title: "BMI Calculator",
    description: "Check your body mass index using height and weight.",
    href: "/bmi-calculator",
    icon: Heart,
    accent: "pink",
    category: "Health",
  },
  {
    title: "Calorie Calculator",
    description: "Estimate daily calorie needs from your body profile.",
    href: "/calorie-calculator",
    icon: Heart,
    accent: "pink",
    category: "Health",
  },
  {
    title: "Pregnancy Due Date",
    description: "Estimate pregnancy due date and key timeline milestones.",
    href: "/pregnancy-due-date",
    icon: Heart,
    accent: "pink",
    category: "Health",
  },
  {
    title: "Ovulation Tracker",
    description: "Estimate fertile window and peak fertility days.",
    href: "/ovulation-tracker",
    icon: Calendar,
    accent: "pink",
    category: "Health",
  },
  {
    title: "Heart Rate Zones",
    description: "Calculate workout zones from age and resting heart rate.",
    href: "/heart-rate-zones",
    icon: Activity,
    accent: "pink",
    category: "Health",
  },
  {
    title: "Water Intake",
    description: "Estimate daily water intake based on your needs.",
    href: "/water-intake",
    icon: Heart,
    accent: "pink",
    category: "Lifestyle",
  },
]

const filters = ["All", "Money", "Tax", "Loans", "Utilities", "Transport", "Business", "Health", "Education", "Lifestyle"]

const filterAliases: Record<string, string[]> = {
  All: [],
  Money: ["Money"],
  Tax: ["Tax"],
  Loans: ["Loans", "Education", "Investment"],
  Utilities: ["Utilities", "Home"],
  Transport: ["Transport"],
  Business: ["Business", "Investment"],
  Health: ["Health", "Lifestyle"],
  Education: ["Education"],
  Lifestyle: ["Lifestyle"],
}

function normalizeSearchValue(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
}

function compactSearchValue(value: string) {
  return normalizeSearchValue(value).replace(/\s+/g, "")
}

function toolSearchText(tool: ToolCard) {
  return [
    tool.title,
    tool.description,
    tool.category,
    tool.href.replace(/-/g, " "),
  ].join(" ")
}

function matchesSearchQuery(tool: ToolCard, query: string) {
  const normalizedQuery = normalizeSearchValue(query)
  const compactQuery = compactSearchValue(query)

  if (!compactQuery) {
    return true
  }

  const searchText = toolSearchText(tool)
  const normalizedText = normalizeSearchValue(searchText)
  const compactText = compactSearchValue(searchText)
  const queryTokens = normalizedQuery.split(/\s+/).filter(Boolean)

  return (
    normalizedText.includes(normalizedQuery) ||
    compactText.includes(compactQuery) ||
    queryTokens.every((token) => normalizedText.includes(token))
  )
}

function CalculatorsHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E4E7EC] bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0B5A2A] text-white shadow-sm">
            <BrandLogo size={24} />
          </div>
          <div>
            <p className="font-inter text-lg font-extrabold leading-tight text-[#0B1020]">MyCalculators</p>
            <p className="text-xs font-semibold leading-tight text-[#0B5A2A]">Kenya</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-[#0B1020] md:flex">
          <Link href="/calculators" className="text-[#0B5A2A]">Calculators</Link>
          <Link href="/rates" className="transition-colors hover:text-[#0B5A2A]">Rates</Link>
          <Link href="/guides" className="transition-colors hover:text-[#0B5A2A]">Guides</Link>
          <SiteToolsMenu />
          <Link href="/about" className="transition-colors hover:text-[#0B5A2A]">About</Link>
          <Link href="/contact" className="transition-colors hover:text-[#0B5A2A]">Contact</Link>
        </nav>

        <Button asChild className="hidden h-10 rounded-lg bg-[#0B5A2A] px-5 text-sm font-bold text-white shadow-sm hover:bg-[#063F20] sm:inline-flex">
          <Link href="/mpesa-charges" className="inline-flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            Try M-Pesa Calculator
          </Link>
        </Button>

        <SiteMobileMenu />
      </div>
    </header>
  )
}

function ToolCard({ tool }: { tool: ToolCard }) {
  const Icon = tool.icon

  return (
    <Link
      href={tool.href}
      className="group flex h-full min-h-[170px] flex-col justify-between rounded-2xl border border-[#E4E7EC] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#CFEBDD] hover:shadow-md"
    >
      <div>
        <div className="mb-4 flex items-start justify-between gap-3">
          <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${accentClasses[tool.accent]}`}>
            <Icon className="h-5 w-5" />
          </span>
          <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${accentClasses[tool.accent]}`}>
            {tool.category}
          </span>
        </div>
        <h2 className="font-inter text-[17px] font-bold leading-tight text-[#0B1020]">{tool.title}</h2>
        <p className="mt-2 text-[15px] leading-6 text-[#667085]">{tool.description}</p>
      </div>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#0B5A2A]">
        Open calculator
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </Link>
  )
}

function CalculatorsFooter() {
  return (
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
          <h4 className="mb-4 text-sm font-bold font-inter">Popular Calculators</h4>
          <ul className="space-y-2.5 text-sm text-emerald-50/80">
            {[["M-Pesa Charges", "/mpesa-charges"], ["Loan Calculator", "/loan-calculator"], ["Net Salary", "/net-salary"], ["Car Import Tax", "/car-import-tax"]].map(([label, href]) => (
              <li key={label}><Link href={href} className="transition-colors hover:text-white">{label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-bold font-inter">Navigation</h4>
          <ul className="space-y-2.5 text-sm text-emerald-50/80">
            <li><Link href="/calculators" className="transition-colors hover:text-white">Calculators</Link></li>
            <li><Link href="/rates" className="transition-colors hover:text-white">Current Rates</Link></li>
            <li><Link href="/guides" className="transition-colors hover:text-white">Guides</Link></li>
            <li><Link href="/about" className="transition-colors hover:text-white">About</Link></li>
            <li><Link href="/contact" className="transition-colors hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-bold font-inter">Legal</h4>
          <ul className="space-y-2.5 text-sm text-emerald-50/80">
            <li><Link href="/privacy" className="transition-colors hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/terms" className="transition-colors hover:text-white">Terms of Service</Link></li>
            <li><Link href="/cookies" className="transition-colors hover:text-white">Cookie Policy</Link></li>
            <li><Link href="/disclaimer" className="transition-colors hover:text-white">Disclaimer</Link></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-[1280px] border-t border-white/10 px-4 py-5 text-center text-sm text-emerald-50/75 sm:px-6">
        © 2026 MyCalculators.
      </div>
    </footer>
  )
}

export default function CalculatorsPage() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const category = params.get("category")
    const query = params.get("query")

    if (category && filters.includes(category)) {
      setActiveFilter(category)
    }
    if (query) {
      setSearchQuery(query)
    }
  }, [])

  const filteredTools = useMemo(() => {
    const acceptedCategories = filterAliases[activeFilter] ?? []

    return tools.filter((tool) => {
      const matchesCategory =
        activeFilter === "All" || acceptedCategories.includes(tool.category)
      const matchesSearch = matchesSearchQuery(tool, searchQuery)

      return matchesCategory && matchesSearch
    })
  }, [activeFilter, searchQuery])

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter)

    const url = new URL(window.location.href)
    if (filter === "All") {
      url.searchParams.delete("category")
    } else {
      url.searchParams.set("category", filter)
    }
    window.history.replaceState(null, "", url.toString())
  }

  return (
    <>
      <CalculatorsHeader />
      <main className="bg-[#F7FAF8] text-[#0B1020]">
        <div className="mx-auto max-w-[1180px] px-4 py-10 sm:px-6 lg:py-14">
          <section className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#ECFDF3] text-[#0B5A2A]">
              <Calculator className="h-7 w-7" />
            </div>
            <h1 className="font-inter text-[34px] font-extrabold leading-[1.1] text-[#0B1020] md:text-[44px]">
              Calculators
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#667085] md:text-[17px]">
              Browse all MyCalculators calculators for Kenyan money, taxes, utilities, planning and health estimates.
            </p>
          </section>

          <section className="mt-9 rounded-2xl border border-[#E4E7EC] bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3 rounded-xl border border-[#E4E7EC] px-4 py-3">
              <Search className="h-5 w-5 text-[#667085]" />
              <input
                className="h-8 flex-1 bg-transparent text-sm text-[#0B1020] outline-none placeholder:text-[#667085]"
                placeholder="Search calculators..."
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => handleFilterChange(filter)}
                  className={
                    activeFilter === filter
                      ? "rounded-full bg-[#0B5A2A] px-4 py-2 text-sm font-bold text-white"
                      : "rounded-full border border-[#E4E7EC] bg-white px-4 py-2 text-sm font-semibold text-[#667085] transition hover:border-[#0B5A2A] hover:text-[#0B5A2A]"
                  }
                >
                  {filter}
                </button>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <h2 className="font-inter text-[26px] font-extrabold text-[#0B1020] md:text-[30px]">
                  {activeFilter === "All" ? "All calculators" : `${activeFilter} calculators`}
                </h2>
                <p className="mt-2 text-[15px] leading-6 text-[#667085]">
                  Pick a calculator and enter your details. No account required.
                </p>
              </div>
            </div>
            <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.href} tool={tool} />
              ))}
            </div>
            {filteredTools.length === 0 && (
              <div className="rounded-2xl border border-[#E4E7EC] bg-white p-8 text-center text-[#667085]">
                No calculators match your search.
              </div>
            )}
          </section>
        </div>
      </main>
      <CalculatorsFooter />
    </>
  )
}
