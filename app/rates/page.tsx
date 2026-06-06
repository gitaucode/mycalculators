"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowUpRight,
  CalendarDays,
  ExternalLink,
  FileText,
  Info,
  Landmark,
  Mail,
  MoreHorizontal,
  RefreshCw,
  Search,
  ShieldCheck,
  Smartphone,
  TrendingUp,
} from "lucide-react"

import { SiteMobileMenu } from "@/components/site-mobile-menu"
import { SiteToolsMenu } from "@/components/site-tools-menu"
import { Button } from "@/components/ui/button"
import { BrandLogo } from "@/components/brand-logo"

// ─── Data ────────────────────────────────────────────────────────────────────

const mobileMoneySections = [
  {
    title: "M-Pesa Send Money",
    updated: "Checked May 2026",
    source: "Safaricom PLC",
    headers: ["Amount Range (KES)", "Fee"],
    rows: [
      ["KES 1 - 49", "Free"],
      ["KES 50 - 100", "Free"],
      ["KES 101 - 500", "KES 7"],
      ["KES 501 - 1,000", "KES 13"],
      ["KES 1,001 - 1,500", "KES 23"],
      ["KES 1,501 - 2,500", "KES 33"],
      ["KES 2,501 - 3,500", "KES 53"],
      ["KES 3,501 - 5,000", "KES 57"],
      ["KES 5,001 - 7,500", "KES 78"],
      ["KES 7,501 - 10,000", "KES 90"],
      ["KES 10,001 - 15,000", "KES 100"],
      ["KES 15,001 - 20,000", "KES 105"],
      ["KES 20,001 - 250,000", "KES 108"],
    ],
  },
  {
    title: "M-Pesa Withdrawal",
    updated: "Checked May 2026",
    source: "Safaricom PLC",
    headers: ["Amount Range (KES)", "Fee"],
    rows: [
      ["KES 50 - 100", "KES 11"],
      ["KES 101 - 500", "KES 29"],
      ["KES 501 - 1,000", "KES 29"],
      ["KES 1,001 - 1,500", "KES 29"],
      ["KES 1,501 - 2,500", "KES 29"],
      ["KES 2,501 - 3,500", "KES 52"],
      ["KES 3,501 - 5,000", "KES 69"],
      ["KES 5,001 - 7,500", "KES 87"],
      ["KES 7,501 - 10,000", "KES 115"],
      ["KES 10,001 - 15,000", "KES 167"],
      ["KES 15,001 - 20,000", "KES 185"],
      ["KES 20,001 - 35,000", "KES 197"],
      ["KES 35,001 - 50,000", "KES 278"],
      ["KES 50,001 - 250,000", "KES 309"],
    ],
  },
  {
    title: "M-Pesa ATM Withdrawal",
    updated: "Checked May 2026",
    source: "Safaricom PLC",
    headers: ["Amount Range (KES)", "Fee"],
    rows: [
      ["KES 200 - 2,500", "KES 35"],
      ["KES 2,501 - 5,000", "KES 69"],
      ["KES 5,001 - 10,000", "KES 115"],
      ["KES 10,001 - 35,000", "KES 203"],
    ],
  },
]

const taxSections = [
  {
    title: "PAYE Tax Bands",
    updated: "Checked May 2026",
    source: "KRA",
    headers: ["Monthly Income (KES)", "Tax Rate"],
    rows: [
      ["Up to KES 24,000", "10%"],
      ["KES 24,001 - 32,333", "25%"],
      ["KES 32,334 - 500,000", "30%"],
      ["KES 500,001 - 800,000", "32.5%"],
      ["Above KES 800,000", "35%"],
    ],
    note: "Personal Relief: KES 2,400/month. NSSF, SHIF and Affordable Housing Levy are deductible before PAYE.",
  },
  {
    title: "NSSF Contributions - Year 4 (2026)",
    updated: "Feb 2026",
    source: "NSSF Kenya",
    headers: ["Tier", "Rate / Amount"],
    rows: [
      ["Tier I (up to KES 9,000)", "6% employee + 6% employer"],
      ["Tier II (KES 9,001 - 108,000)", "6% employee + 6% employer"],
      ["Employer contribution", "6% matched"],
      ["Maximum employee contribution", "KES 6,480/month"],
      ["Maximum combined contribution", "KES 12,960/month"],
    ],
  },
  {
    title: "SHIF (Social Health Insurance Fund)",
    updated: "Checked May 2026",
    source: "SHA Kenya",
    headers: ["Contributor Type", "Rate"],
    rows: [
      ["Employed (formal sector)", "2.75% of gross salary"],
      ["Self-employed / informal", "2.75% of declared income"],
      ["Minimum contribution", "KES 300/month"],
    ],
    note: "SHIF replaced NHIF from October 2024 under SHA (Social Health Authority).",
  },
  {
    title: "VAT (Value Added Tax)",
    updated: "Checked May 2026",
    source: "KRA",
    headers: ["Category", "Rate"],
    rows: [
      ["Standard rate", "16%"],
      ["Petroleum products", "16%"],
      ["Exported goods & services", "0% (Zero-rated)"],
      ["Exempt goods", "No VAT charged"],
    ],
  },
]

const bankingSections = [
  {
    title: "Central Bank Rate (CBR)",
    updated: "Checked May 2026",
    source: "Central Bank of Kenya",
    headers: ["Metric", "Value"],
    rows: [
      ["Central Bank Rate", "8.75%"],
      ["Effective from", "February 10, 2026"],
      ["Treasury bill rates", "Variable weekly"],
      ["Commercial lending rates", "Varies by bank and product"],
    ],
    note: "CBK lowered the Central Bank Rate to 8.75% at the February 10, 2026 MPC meeting.",
  },
  {
    title: "Average Commercial Bank Rates",
    updated: "Q1 2025",
    source: "Central Bank of Kenya",
    headers: ["Rate Type", "Average"],
    rows: [
      ["Average lending rate", "~13% - 17% p.a."],
      ["Average savings deposit rate", "~4% - 7% p.a."],
      ["Mobile banking loan rates", "~10% - 18% p.a."],
      ["Mortgage lending rate", "~13% - 15% p.a."],
    ],
  },
  {
    title: "KCB & Equity Common Charges",
    updated: "Jan 2024",
    source: "Bank Tariff Guides",
    headers: ["Transaction / Service", "Fee"],
    rows: [
      ["ATM withdrawal (own bank)", "Free - KES 35"],
      ["ATM withdrawal (other bank)", "KES 35 - 70"],
      ["Inter-bank transfer (RTGS)", "KES 440 - 550"],
      ["PESALINK transfer", "KES 30 - 150"],
      ["Cheque book (25 leaves)", "KES 550 - 800"],
      ["Bank statement (paper)", "KES 120 - 250"],
    ],
  },
]

const otherSections = [
  {
    title: "KPLC Electricity Tariffs",
    updated: "Checked May 2026",
    source: "EPRA / Kenya Power",
    headers: ["Charge / Levy", "Rate"],
    rows: [
      ["Domestic lifeline (0-30 kWh)", "KES 19.87/kWh retail"],
      ["Domestic ordinary (30-100 kWh)", "KES 25.15/kWh retail"],
      ["Domestic ordinary (100+ kWh)", "KES 27.65/kWh retail"],
      ["Monthly pass-through charges", "Included in retail tariff reports"],
    ],
    note: "EPRA/Kenya Power pass-through costs change monthly, so token values may vary slightly.",
  },
  {
    title: "Fuliza M-Pesa Daily Fees",
    updated: "Checked May 2026",
    source: "Safaricom PLC",
    headers: ["Outstanding Balance (KES)", "Daily Fee"],
    rows: [
      ["KES 1 - 100", "Free for first 3 days"],
      ["KES 101 - 500", "KES 2.50/day after day 3"],
      ["KES 501 - 1,000", "KES 5/day after day 3"],
      ["KES 1,001 - 2,500", "KES 20/day"],
      ["KES 2,501 - 5,000", "KES 25/day"],
      ["KES 5,001 - 10,000", "KES 40/day"],
      ["KES 10,001 - 20,000", "KES 60/day"],
      ["KES 20,001 - 50,000", "KES 80/day"],
      ["KES 50,001 - 150,000", "KES 100/day"],
    ],
    note: "A one-off 1% access fee applies. Daily maintenance fees attract 20% excise duty.",
  },
  {
    title: "KRA Import Duty Rates (Vehicles)",
    updated: "Checked May 2026",
    source: "KRA / Kenya Customs",
    headers: ["Duty / Levy", "Rate"],
    rows: [
      ["Import Duty", "25% of CIF"],
      ["Excise Duty", "10% - 35% of (CIF + ID), depending on vehicle"],
      ["VAT (16%)", "16% of (CIF + ID + ED)"],
      ["Import Declaration Fee (IDF)", "3.5% of CIF (min KES 5,000)"],
      ["Railway Development Levy (RDL)", "2% of CIF"],
    ],
    note: "CIF = Cost + Insurance + Freight. Depreciation schedules apply for used vehicles.",
  },
]

const changes = [
  {
    color: "bg-[#22C55E]",
    title: "CBK Rate cut to 8.75%",
    description: "Reduced at the February 2026 MPC meeting",
    date: "Feb 2026",
  },
  {
    color: "bg-[#3B82F6]",
    title: "NSSF Year 4 rates apply",
    description: "Upper earning limit moved to KES 108,000 for 2026 contributions",
    date: "Feb 2026",
  },
  {
    color: "bg-[#EAB308]",
    title: "SHIF replaced NHIF",
    description: "Social Health Insurance Fund contributions apply at 2.75% of gross",
    date: "Oct 2024",
  },
  {
    color: "bg-[#EF4444]",
    title: "Vehicle IDF/RDL updated",
    description: "Motor vehicle import estimates now use 3.5% IDF and 2% RDL",
    date: "Checked 2026",
  },
]

const sources = [
  { name: "Safaricom M-PESA Tariffs", url: "https://www.safaricom.co.ke/personal/m-pesa/getting-started/m-pesa-rates" },
  { name: "KRA Income Tax Rates", url: "https://www.kra.go.ke/individual/filing-paying/types-of-taxes/individual-income-tax" },
  { name: "KRA PAYE Guidance", url: "https://www.kra.go.ke/individual/filing-paying/types-of-taxes/paye" },
  { name: "Central Bank of Kenya", url: "https://www.centralbank.go.ke" },
  { name: "Social Health Authority (SHA)", url: "https://www.sha.go.ke" },
  { name: "NSSF Kenya", url: "https://www.nssf.or.ke" },
  { name: "Energy and Petroleum Regulatory Authority (EPRA)", url: "https://www.epra.go.ke/retail-electricity-tariff-calculator" },
  { name: "KPLC / Kenya Power", url: "https://www.kplc.co.ke" },
]

// ─── Components ──────────────────────────────────────────────────────────────

function RatesHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E4E7EC] bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B5A2A] text-white shadow-sm">
            <BrandLogo size={24} />
          </div>
          <div>
            <p className="text-lg font-extrabold leading-tight text-[#0B1020]">MyCalculators</p>
            <p className="text-xs font-semibold leading-tight text-[#0B5A2A]">Kenya</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-9 text-sm font-bold text-[#0B1020] md:flex">
          <Link href="/calculators" className="hover:text-[#0B5A2A] transition-colors">Calculators</Link>
          <Link href="/rates" className="text-[#0B5A2A]">Rates</Link>
          <Link href="/guides" className="hover:text-[#0B5A2A] transition-colors">Guides</Link>
          <SiteToolsMenu />
          <Link href="/about" className="hover:text-[#0B5A2A] transition-colors">About</Link>
          <a href="mailto:hellogitau@gmail.com" className="hover:text-[#0B5A2A] transition-colors">Contact</a>
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

function RateTableCard({
  title,
  updated,
  source,
  headers,
  rows,
  note,
  accent = "green",
}: {
  title: string
  updated: string
  source: string
  headers: [string, string]
  rows: string[][]
  note?: string
  accent?: "green" | "blue" | "orange" | "yellow"
}) {
  const accentMap = {
    green: { icon: "bg-[#ECFDF3] text-[#0B5A2A]", badge: "border-[#CFEBDD] bg-[#ECFDF3] text-[#0B5A2A]", header: "bg-[#F0FAF4] text-[#063F20]", value: "text-[#0B5A2A]" },
    blue:  { icon: "bg-[#EFF6FF] text-[#2563EB]",  badge: "border-[#BFDBFE] bg-[#EFF6FF] text-[#1D4ED8]",  header: "bg-[#EFF6FF] text-[#1E3A8A]", value: "text-[#2563EB]" },
    orange:{ icon: "bg-[#FFF4E5] text-[#B54708]",  badge: "border-[#FDBA74] bg-[#FFF4E5] text-[#B54708]",  header: "bg-[#FFF4E5] text-[#92400E]", value: "text-[#B54708]" },
    yellow:{ icon: "bg-[#FEF9C3] text-[#CA8A04]",  badge: "border-[#FDE68A] bg-[#FEF9C3] text-[#CA8A04]",  header: "bg-[#FEF9C3] text-[#713F12]", value: "text-[#CA8A04]" },
  }
  const a = accentMap[accent]

  return (
    <article className="h-full rounded-2xl border border-[#E4E7EC] bg-white p-6 shadow-sm flex flex-col">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[17px] font-extrabold leading-tight text-[#0B1020]">{title}</h2>
          <p className="mt-1 text-sm font-medium text-[#667085]">Updated: {updated}</p>
        </div>
        <span className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${a.badge}`}>
          {source}
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#E4E7EC] flex-1">
        <div className={`grid grid-cols-[1fr_auto] px-4 py-2.5 text-xs font-extrabold uppercase tracking-wide ${a.header}`}>
          <span>{headers[0]}</span>
          <span className="text-right">{headers[1]}</span>
        </div>
        <div className="divide-y divide-[#E4E7EC]">
          {rows.map(([col1, col2]) => (
            <div key={col1} className="grid grid-cols-[1fr_auto] px-4 py-3 text-[14px] leading-6">
              <span className="font-medium text-[#344054]">{col1}</span>
              <span className={`text-right font-bold ${a.value}`}>{col2}</span>
            </div>
          ))}
        </div>
      </div>

      {note && (
        <p className="mt-4 rounded-xl bg-[#F7FAF8] px-4 py-3 text-xs leading-5 text-[#667085] border border-[#E4E7EC]">
          Note: {note}
        </p>
      )}
    </article>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const TABS = [
  { label: "Mobile Money", icon: Smartphone },
  { label: "Tax & Statutory", icon: FileText },
  { label: "Banking", icon: Landmark },
  { label: "Other Rates", icon: MoreHorizontal },
] as const

type TabLabel = (typeof TABS)[number]["label"]

export default function RatesPage() {
  const [activeTab, setActiveTab] = useState<TabLabel>("Mobile Money")

  return (
    <>
      <RatesHeader />
      <main className="bg-[radial-gradient(circle_at_18%_20%,rgba(11,90,42,0.08),transparent_34%),radial-gradient(circle_at_82%_24%,rgba(11,90,42,0.08),transparent_32%),#F7FAF8] text-[#0B1020]">
        <div className="mx-auto max-w-[1120px] px-4 py-12 sm:px-6 lg:py-14">

          {/* Hero */}
          <section className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#ECFDF3] text-[#0B5A2A]">
              <TrendingUp className="h-8 w-8" />
            </div>
            <h1 className="text-[34px] font-extrabold leading-[1.1] text-[#0B1020] md:text-[44px]">
              Current Kenyan Financial Rates
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#667085] md:text-[17px]">
              Track the latest rates for mobile money, taxes, banking charges and statutory deductions used across MyCalculators calculators.
            </p>
          </section>

          {/* Meta bar */}
          <section className="mx-auto mt-8 grid max-w-[1020px] gap-4 rounded-2xl border border-[#E4E7EC] bg-white p-4 shadow-sm md:grid-cols-[1.15fr_auto_1.25fr] md:items-center md:p-5">
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#CFEBDD] text-[#0B5A2A]">
                <CalendarDays className="h-6 w-6" />
              </span>
              <div className="text-sm leading-6">
                <p className="font-semibold text-[#0B1020]">
                  Last updated: <span className="font-medium text-[#667085]">May 30, 2026</span>
                </p>
                <p className="font-medium text-[#344054]">Sources: Safaricom, KRA, CBK, SHA, KPLC</p>
              </div>
            </div>

            <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-extrabold text-[#0B5A2A] transition hover:bg-[#F0FAF4]">
              <RefreshCw className="h-5 w-5" />
              Refresh Rates
            </button>

            <label className="flex h-11 min-w-0 items-center gap-3 rounded-xl border border-[#E4E7EC] bg-white px-4 text-sm text-[#667085]">
              <Search className="h-5 w-5 shrink-0" />
              <input
                type="search"
                placeholder="Search rates, fees, taxes..."
                className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-[#667085]"
              />
            </label>
          </section>

          {/* Tabs */}
          <section className="mt-8 rounded-2xl border border-[#E4E7EC] bg-white p-1.5 shadow-sm">
            <div className="grid gap-1.5 md:grid-cols-4">
              {TABS.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.label
                return (
                  <button
                    key={tab.label}
                    onClick={() => setActiveTab(tab.label)}
                    className={
                      isActive
                        ? "flex h-12 items-center justify-center gap-2.5 rounded-xl bg-[#0B5A2A] text-sm font-extrabold text-white shadow-sm transition"
                        : "flex h-12 items-center justify-center gap-2.5 rounded-xl text-sm font-bold text-[#667085] transition hover:bg-[#F7FAF8] hover:text-[#0B1020]"
                    }
                  >
                    <Icon className="h-4.5 w-4.5" />
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </section>

          {/* Tab content */}
          <section className="mt-6">
            {activeTab === "Mobile Money" && (
              <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
                {mobileMoneySections.map((s) => (
                  <RateTableCard key={s.title} title={s.title} updated={s.updated} source={s.source} headers={[s.headers[0], s.headers[1]] as [string,string]} rows={s.rows} accent="green" />
                ))}
              </div>
            )}

            {activeTab === "Tax & Statutory" && (
              <div className="grid gap-5 lg:grid-cols-2">
                {taxSections.map((s) => (
                  <RateTableCard key={s.title} title={s.title} updated={s.updated} source={s.source} headers={[s.headers[0], s.headers[1]] as [string,string]} rows={s.rows} note={s.note} accent="orange" />
                ))}
              </div>
            )}

            {activeTab === "Banking" && (
              <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
                {bankingSections.map((s) => (
                  <RateTableCard key={s.title} title={s.title} updated={s.updated} source={s.source} headers={[s.headers[0], s.headers[1]] as [string,string]} rows={s.rows} note={(s as any).note} accent="blue" />
                ))}
              </div>
            )}

            {activeTab === "Other Rates" && (
              <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
                {otherSections.map((s) => (
                  <RateTableCard key={s.title} title={s.title} updated={s.updated} source={s.source} headers={[s.headers[0], s.headers[1]] as [string,string]} rows={s.rows} note={(s as any).note} accent="yellow" />
                ))}
              </div>
            )}
          </section>

          {/* Recent Rate Changes */}
          <section className="mt-8 rounded-2xl border border-[#E4E7EC] bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#ECFDF3] text-[#0B5A2A]">
                <ArrowUpRight className="h-6 w-6" />
              </span>
              <div>
                <h2 className="text-2xl font-extrabold text-[#0B1020]">Recent Rate Changes</h2>
                <p className="mt-1 text-sm leading-6 text-[#667085]">Important changes that affect your finances.</p>
              </div>
            </div>
            <div className="space-y-0">
              {changes.map((change, index) => (
                <div key={change.title} className="grid grid-cols-[36px_1fr_auto] gap-3 rounded-xl bg-[#FBFCFD] px-4 py-4">
                  <div className="relative flex justify-center">
                    {index !== changes.length - 1 && <span className="absolute top-5 h-[calc(100%+16px)] w-px bg-[#E4E7EC]" />}
                    <span className={`relative mt-1 h-3 w-3 rounded-full ${change.color}`} />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-extrabold text-[#0B1020]">{change.title}</h3>
                    <p className="mt-1 text-[15px] leading-6 text-[#667085]">{change.description}</p>
                  </div>
                  <div className="hidden items-center gap-3 self-center text-sm font-medium text-[#667085] sm:flex">
                    {change.date}
                    <CalendarDays className="h-4 w-4" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Sources & Notice */}
          <section className="mt-6 grid items-stretch gap-5 lg:grid-cols-2">
            <article className="h-full rounded-2xl border border-[#E4E7EC] bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ECFDF3] text-[#0B5A2A]">
                  <ShieldCheck className="h-6 w-6" />
                </span>
                <h2 className="text-2xl font-extrabold text-[#0B1020]">Official Sources</h2>
              </div>
              <div className="space-y-4">
                {sources.map((s) => (
                  <div key={s.name} className="flex items-center justify-between gap-4 text-[15px]">
                    <span className="font-semibold text-[#0B1020]">{s.name}</span>
                    <a className="inline-flex items-center gap-1.5 font-bold text-[#0B5A2A] hover:underline" href={s.url} target="_blank" rel="noopener noreferrer">
                      Visit
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </article>

            <article className="flex h-full flex-col rounded-2xl border border-[#E4E7EC] bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ECFDF3] text-[#0B5A2A]">
                  <Info className="h-6 w-6" />
                </span>
                <h2 className="text-2xl font-extrabold text-[#0B1020]">Important Notice</h2>
              </div>
              <p className="max-w-xl text-[15px] leading-7 text-[#667085]">
                Rates are provided for planning and estimation only. They were manually reviewed on May 30, 2026, but you should still verify current rates with the relevant institution before making financial decisions. Some charges vary by bank, product tier or monthly pass-through costs.
              </p>
              <Button asChild variant="outline" className="mt-5 h-11 w-fit rounded-lg border-[#0B5A2A] px-5 font-extrabold text-[#0B5A2A] hover:bg-[#F0FAF4]">
                <a href="mailto:hellogitau@gmail.com">Report Incorrect Rate</a>
              </Button>
            </article>
          </section>

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
