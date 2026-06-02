"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BriefcaseBusiness,
  Calculator,
  Check,
  ClipboardList,
  Facebook,
  Grid3X3,
  Heart,
  Home,
  Instagram,
  Landmark,
  RefreshCw,
  Search,
  ShieldCheck,
  Smartphone,
  Twitter,
  Users,
  Wallet,
  Youtube,
  Zap,
} from "lucide-react";

import { SiteMobileMenu } from "@/components/site-mobile-menu";
import { Button } from "@/components/ui/button";

type Accent = "green" | "orange" | "blue" | "yellow" | "red" | "pink" | "teal";

type ToolCard = {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: Accent;
  category?: string;
};

type CategoryCard = {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: Accent;
};

const accentClasses: Record<Accent, string> = {
  green: "bg-[#ECFDF3] text-[#0B5A2A]",
  orange: "bg-[#FFF4E5] text-[#B54708]",
  blue: "bg-[#EFF6FF] text-[#2563EB]",
  yellow: "bg-[#FEF9C3] text-[#CA8A04]",
  red: "bg-[#FEF2F2] text-[#DC2626]",
  pink: "bg-[#FDF2F8] text-[#DB2777]",
  teal: "bg-[#ECFDF5] text-[#047857]",
};

const popularTools: ToolCard[] = [
  {
    title: "M-Pesa Charges",
    description: "Calculate send, withdrawal and buy goods fees.",
    href: "/mpesa-charges",
    icon: Smartphone,
    accent: "green",
  },
  {
    title: "Net Salary",
    description: "Calculate PAYE, NSSF, SHIF and take-home pay.",
    href: "/net-salary",
    icon: BriefcaseBusiness,
    accent: "orange",
  },
  {
    title: "Loan Calculator",
    description: "Payments, interest and amortization.",
    href: "/loan-calculator",
    icon: Landmark,
    accent: "blue",
  },
  {
    title: "Fuliza Calculator",
    description: "Check overdraft fees and repayment amounts.",
    href: "/fuliza-calculator",
    icon: Wallet,
    accent: "teal",
  },
  {
    title: "Electricity Calculator",
    description: "Estimate KPLC token units and costs.",
    href: "/electricity-calculator",
    icon: Zap,
    accent: "yellow",
  },
];

const categories: CategoryCard[] = [
  {
    title: "Money & Banking",
    description: "M-Pesa, Fuliza, savings, fees & more",
    href: "/calculators?category=Money",
    icon: Smartphone,
    accent: "green",
  },
  {
    title: "Salary & Tax",
    description: "PAYE, VAT, NSSF, SHIF & taxes",
    href: "/calculators?category=Tax",
    icon: BriefcaseBusiness,
    accent: "orange",
  },
  {
    title: "Loans & Planning",
    description: "Loans, ROI, budget, school fees & more",
    href: "/calculators?category=Loans",
    icon: ClipboardList,
    accent: "blue",
  },
  {
    title: "Home & Utilities",
    description: "Electricity, water, internet & home costs",
    href: "/calculators?category=Utilities",
    icon: Home,
    accent: "teal",
  },
  {
    title: "Lifestyle & Health",
    description: "BMI, health, pregnancy, calories & more",
    href: "/calculators?category=Health",
    icon: Heart,
    accent: "pink",
  },
  {
    title: "Business & Work",
    description: "VAT, invoices, payroll and planning tools",
    href: "/calculators?query=VAT",
    icon: Calculator,
    accent: "blue",
  },
];

const chips = [
  "M-Pesa Charges",
  "Net Salary",
  "Loan Calculator",
  "VAT Calculator",
];

const headerLinks = [
  ["Calculators", "/calculators"],
  ["Categories", "#categories"],
  ["Rates", "/rates"],
  ["Resources", "/guides"],
  ["About", "/about"],
] as const;

function accentClass(accent: Accent) {
  return accentClasses[accent];
}

function HomeHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E4E7EC] bg-white/94 backdrop-blur-xl">
      <div className="mx-auto flex h-[84px] max-w-[1320px] items-center justify-between px-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B5A2A] shadow-sm">
            <span className="font-inter text-lg font-extrabold text-white">
              MC
            </span>
          </div>
          <div>
            <p className="font-inter text-lg font-extrabold leading-tight text-[#0B1020]">
              MyCalculators
            </p>
            <p className="text-xs font-semibold leading-tight text-[#0B5A2A]">
              Kenya
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-10 text-sm font-semibold text-[#0B1020] lg:flex">
          {headerLinks.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="transition-colors hover:text-[#0B5A2A]"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            asChild
            className="hidden h-12 rounded-xl bg-[#0B5A2A] px-6 text-sm font-bold text-white shadow-[0_12px_24px_rgba(11,90,42,0.18)] hover:bg-[#063F20] sm:inline-flex"
          >
            <Link
              href="/mpesa-charges"
              className="inline-flex items-center gap-2"
            >
              <Zap className="h-4 w-4" />
              Try M-Pesa Calculator
            </Link>
          </Button>
          <SiteMobileMenu categoriesHref="#categories" className="lg:hidden" />
        </div>
      </div>
    </header>
  );
}

function HeroSearch({
  searchQuery,
  setSearchQuery,
  onSubmit,
}: {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="mt-10 max-w-[580px] rounded-[21px] bg-[#063F20] p-5 shadow-[0_24px_55px_rgba(6,63,32,0.22)]"
    >
      <div className="flex min-h-[62px] items-center gap-3 rounded-2xl bg-white px-5">
        <Search className="h-6 w-6 shrink-0 text-[#667085]" />
        <input
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          type="search"
          placeholder="Find a calculator... e.g. net salary, loan, VAT"
          className="h-14 min-w-0 flex-1 bg-transparent text-[15px] text-[#0B1020] outline-none placeholder:text-[#667085]"
        />
        <button
          type="submit"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0B5A2A] text-white transition hover:bg-[#063F20]"
          aria-label="Search calculators"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2 px-1 text-xs text-emerald-50/80">
        <span className="font-semibold">Popular:</span>
        {chips.map((chip) => (
          <Link
            key={chip}
            href={`/calculators?query=${encodeURIComponent(chip)}`}
            className="rounded-full border border-white/18 bg-white/8 px-3 py-1.5 font-semibold text-white transition hover:bg-white/14"
          >
            {chip}
          </Link>
        ))}
      </div>
    </form>
  );
}

function MiniMetricCard({
  className,
  icon: Icon,
  title,
  value,
  accent,
}: {
  className: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  accent: Accent;
}) {
  return (
    <div
      className={`z-20 rounded-2xl border border-[#E4E7EC] bg-white/95 p-4 shadow-[0_18px_40px_rgba(16,24,40,0.12)] ${className}`}
    >
      <div className="mb-3 flex items-center gap-3">
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${accentClass(accent)}`}
        >
          <Icon className="h-4 w-4" />
        </span>
        <p className="text-sm font-bold text-[#0B1020]">{title}</p>
      </div>
      <p className="text-xs font-medium text-[#667085]">Estimated result</p>
      <p className="mt-1 text-lg font-extrabold text-[#0B5A2A]">{value}</p>
    </div>
  );
}

function SalaryPreviewCard() {
  const deductions = [
    ["PAYE", "KES 15,270"],
    ["NSSF", "KES 5,100"],
    ["NHIF (SHIF)", "KES 2,338"],
    ["AHL", "KES 1,275"],
  ];

  return (
    <div className="relative z-10 w-full max-w-[350px] rounded-[22px] border border-[#E4E7EC] bg-white p-6 shadow-[0_24px_60px_rgba(16,24,40,0.16)]">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ECFDF3] text-[#0B5A2A]">
            <Wallet className="h-4 w-4" />
          </span>
          <h2 className="font-inter text-base font-extrabold text-[#0B1020]">
            Net Salary Calculator
          </h2>
        </div>
        <Grid3X3 className="h-4 w-4 text-[#98A2B3]" />
      </div>
      <label className="mb-2 block text-xs font-semibold text-[#667085]">
        Gross Salary (KES)
      </label>
      <div className="mb-4 rounded-xl border border-[#E4E7EC] px-4 py-3 text-lg font-extrabold text-[#0B5A2A]">
        85,000
      </div>
      <div className="space-y-3 border-b border-[#E4E7EC] pb-4">
        {deductions.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4 text-sm">
            <span className="font-medium text-[#667085]">{label}</span>
            <span className="font-bold text-[#0B1020]">{value}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-end justify-between gap-4">
        <span className="font-inter text-lg font-extrabold text-[#0B1020]">
          Net Pay
        </span>
        <span className="font-inter text-2xl font-extrabold text-[#0B5A2A]">
          KES 61,018
        </span>
      </div>
      <div className="mt-5 rounded-xl bg-[#F0FAF4] px-4 py-3 text-xs font-semibold leading-5 text-[#0B5A2A]">
        Rates: KRA, NSSF & SHIF updated today.
      </div>
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto hidden min-h-[510px] w-full max-w-[600px] items-center justify-center lg:flex">
      {/* Soft decorative background blob */}
      <div className="absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-[#0B5A2A]/90 to-[#063F20] opacity-95" />
      {/* Ring accent */}
      <div className="absolute right-8 top-12 h-[340px] w-[340px] rounded-full border-[36px] border-white/8" />
      {/* Subtle dot grid — contained within the blob */}
      <div
        className="absolute right-4 top-8 h-[380px] w-[380px] rounded-full opacity-20"
        style={{
          backgroundImage: "radial-gradient(#FFFFFF 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Main card — centred, slightly left to leave room for the mini cards */}
      <div className="relative z-10 -translate-x-8">
        <SalaryPreviewCard />
      </div>

      {/* Mini cards — stacked on the right, deliberately angled */}
      <MiniMetricCard
        className="absolute right-0 top-[80px] w-[178px] rotate-3"
        icon={Smartphone}
        title="M-Pesa Charges"
        value="KES 11"
        accent="green"
      />
      <MiniMetricCard
        className="absolute bottom-[88px] right-0 w-[178px] -rotate-2"
        icon={Zap}
        title="Electricity"
        value="KES 2,340"
        accent="yellow"
      />

      {/* "Live" badge anchored to main card area */}
      <div className="absolute bottom-[52px] left-10 z-20 flex items-center gap-2 rounded-full border border-[#CFEBDD] bg-white px-3 py-1.5 shadow-[0_8px_24px_rgba(11,90,42,0.14)]">
        <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(34,197,94,0.2)]" />
        <span className="text-xs font-bold text-[#0B5A2A]">
          Rates updated today
        </span>
      </div>
    </div>
  );
}

function PopularTool({ tool }: { tool: ToolCard }) {
  const Icon = tool.icon;

  return (
    <Link
      href={tool.href}
      className="group flex flex-col items-center gap-4 border-[#E4E7EC] px-5 py-6 text-center transition hover:bg-[#F7FAF8] md:border-r last:md:border-r-0"
    >
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-full ${accentClass(tool.accent)}`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <div className="flex-1">
        <h3 className="font-inter text-sm font-extrabold text-[#0B1020]">
          {tool.title}
        </h3>
        <p className="mt-1.5 text-xs leading-5 text-[#667085]">
          {tool.description}
        </p>
      </div>
      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B5A2A] transition group-hover:gap-2">
        Explore <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
}

function CategoryTile({ category }: { category: CategoryCard }) {
  const Icon = category.icon;

  return (
    <Link
      href={category.href}
      className="group flex flex-col rounded-2xl border border-[#E4E7EC] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#CFEBDD] hover:shadow-md"
    >
      <span
        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${accentClass(category.accent)}`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="font-inter text-sm font-extrabold text-[#0B1020]">
        {category.title}
      </h3>
      <p className="mt-2 flex-1 text-xs leading-5 text-[#667085]">
        {category.description}
      </p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#0B5A2A] transition group-hover:gap-2">
        Explore{" "}
        <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

function FeatureSection() {
  const features = [
    "Send money fees",
    "Withdraw cash fees",
    "Lipa na M-Pesa fees",
    "Buy goods & services fees",
  ];

  return (
    <section className="mx-auto max-w-[1280px] px-4 pb-14 pt-2 sm:px-8">
      <div className="relative min-h-[365px] overflow-hidden rounded-[22px] bg-[radial-gradient(circle_at_76%_50%,rgba(34,197,94,0.26),transparent_32%),linear-gradient(135deg,#063F20_0%,#075428_58%,#06401f_100%)] text-white shadow-[0_22px_58px_rgba(6,63,32,0.16)]">
        <div className="absolute right-[186px] top-4 hidden h-[350px] w-[350px] rounded-full border-[44px] border-emerald-400/15 lg:block" />
        <div
          className="absolute right-[92px] top-12 hidden h-80 w-80 opacity-24 lg:block"
          style={{
            backgroundImage: "radial-gradient(#FFFFFF 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />
        <div
          className="absolute right-[84px] top-14 hidden h-72 w-72 opacity-24 lg:block"
          style={{
            backgroundImage: "radial-gradient(#FFFFFF 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />
        <img
          src="/iphone-mockup.png"
          alt="M-Pesa Charges Calculator phone preview"
          className="pointer-events-none absolute -bottom-12 right-[150px] hidden h-[470px] w-auto max-w-none rotate-[-2deg] object-contain drop-shadow-[0_26px_45px_rgba(0,0,0,0.28)] md:block lg:right-[166px]"
        />
        <div className="absolute bottom-[62px] right-[112px] hidden rounded-2xl border border-[#E4E7EC] bg-white px-4 py-3 text-[#0B1020] shadow-[0_18px_40px_rgba(0,0,0,0.16)] md:block lg:right-[104px]">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-7 w-7 text-[#0B5A2A]" />
            <p className="text-sm font-bold leading-5">
              Fast. Simple.
              <br />
              Secure.
            </p>
          </div>
        </div>
        <div className="relative min-h-[365px] p-7 md:p-10 lg:p-12">
          <div className="max-w-[620px]">
            <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.22em] text-lime-300">
              Featured Calculator
            </p>
            <h2 className="max-w-xl font-inter text-[32px] font-extrabold leading-tight md:text-[40px]">
              M-Pesa Charges Calculator
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-emerald-50/82">
              Know exactly what you'll pay before sending, withdrawing or paying
              with M-Pesa.
            </p>
            <div className="mt-7 grid max-w-xl gap-4 text-[15px] font-semibold text-emerald-50 sm:grid-cols-2">
              {features.map((feature) => (
                <span key={feature} className="inline-flex items-center gap-3">
                  <Check className="h-5 w-5 rounded-full bg-lime-300 p-1 text-[#063F20]" />
                  {feature}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="h-12 rounded-xl bg-lime-400 px-6 font-extrabold text-[#063F20] hover:bg-lime-300"
              >
                <Link href="/mpesa-charges">
                  Open M-Pesa Calculator
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-xl border-white/20 bg-white/5 px-6 font-bold text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/calculators?category=Money">
                  Explore all money tools
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const links = {
    Calculators: [
      ["M-Pesa Charges", "/mpesa-charges"],
      ["Net Salary", "/net-salary"],
      ["Loan Calculator", "/loan-calculator"],
      ["Fuliza Calculator", "/fuliza-calculator"],
      ["Electricity Calculator", "/electricity-calculator"],
      ["All Calculators", "/calculators"],
    ],
    Categories: [
      ["Money & Banking", "/calculators?category=Money"],
      ["Salary & Tax", "/calculators?category=Tax"],
      ["Loans & Planning", "/calculators?category=Loans"],
      ["Home & Utilities", "/calculators?category=Utilities"],
      ["Lifestyle & Health", "/calculators?category=Health"],
    ],
    Resources: [
      ["Kenyan Rates", "/rates"],
      ["Guides & Articles", "/guides"],
      ["Tools Directory", "/calculators"],
      ["Contact", "/contact"],
    ],
    Company: [
      ["About Us", "/about"],
      ["Privacy Policy", "/privacy"],
      ["Terms of Service", "/terms"],
      ["Disclaimer", "/disclaimer"],
    ],
  };

  return (
    <footer className="w-full bg-[#063F20] text-white">
      <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-8">
        <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="relative min-h-[156px] overflow-hidden rounded-2xl border border-lime-400/45 bg-[radial-gradient(circle_at_78%_44%,rgba(132,204,22,0.22),transparent_34%),#074923] p-7">
            <h3 className="font-inter text-xl font-extrabold">
              Can't find what you need?
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-emerald-50/78">
              Request a calculator and we'll consider it for a future update.
            </p>
            <Button
              asChild
              className="mt-5 h-11 rounded-xl bg-lime-400 px-5 font-extrabold text-[#063F20] hover:bg-lime-300"
            >
              <Link href="/contact">
                Request a calculator
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="min-h-[156px] rounded-2xl border border-white/15 bg-white p-7 text-[#0B1020] shadow-[0_20px_55px_rgba(6,63,32,0.18)]">
            <h3 className="font-inter text-xl font-extrabold">
              Get tips & updates
            </h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-[#667085]">
              New tools, rate changes and smart money tips collected in our
              resources section.
            </p>
            <Button
              asChild
              className="mt-5 h-11 rounded-xl bg-[#0B5A2A] px-5 font-extrabold text-white hover:bg-[#063F20]"
            >
              <Link href="/guides">
                Read resources
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-9 border-t border-white/10 pt-9 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#0B5A2A]">
                <span className="font-inter font-extrabold">MC</span>
              </div>
              <div>
                <p className="font-inter text-lg font-extrabold">
                  MyCalculators
                </p>
                <p className="text-xs font-semibold text-emerald-100">Kenya</p>
              </div>
            </div>
            <p className="max-w-xs text-sm leading-6 text-emerald-50/78">
              Practical calculators and local insights to help you make better
              financial decisions every day.
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              {(
                [
                  { href: "#", label: "Facebook", Icon: Facebook },
                  { href: "#", label: "X / Twitter", Icon: Twitter },
                  { href: "#", label: "Instagram", Icon: Instagram },
                  { href: "#", label: "YouTube", Icon: Youtube },
                ] as const
              ).map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-emerald-50/80 transition hover:bg-white/22 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <h4 className="mb-4 text-sm font-extrabold">{heading}</h4>
              <ul className="space-y-2.5 text-sm text-emerald-50/78">
                {items.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="transition hover:text-white">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-emerald-50/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 MyCalculators Kenya. All rights reserved.</p>
          <p>Made with ❤️ for Kenya.</p>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchQuery.trim();
    router.push(
      query
        ? `/calculators?query=${encodeURIComponent(query)}`
        : "/calculators",
    );
  };

  return (
    <>
      <HomeHeader />
      <main className="bg-[#F7FAF8] text-[#0B1020]">
        <section className="relative overflow-hidden border-b border-[#E4E7EC] bg-[radial-gradient(circle_at_12%_22%,rgba(11,90,42,0.08),transparent_30%),linear-gradient(180deg,#FFFFFF_0%,#F7FAF8_100%)]">
          <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-4 py-[58px] sm:px-8 lg:grid-cols-[610px_1fr]">
            <div>
              <h1 className="max-w-[620px] font-inter text-[42px] font-extrabold leading-[1.04] text-[#0B1020] sm:text-[58px] lg:text-[54px]">
                Smarter calculations.{" "}
                <span className="relative block w-fit text-[#0B5A2A]">
                  Better decisions.
                  <span className="absolute -bottom-2 left-1 h-[3px] w-[245px] -rotate-2 rounded-full bg-[#0B5A2A]" />
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-[#667085] sm:text-lg">
                Everyday calculators for Kenyans. Accurate, local and always up
                to date.
              </p>

              <div className="mt-8 grid max-w-2xl gap-4 sm:grid-cols-3">
                {[
                  {
                    title: "Kenya-focused",
                    desc: "Built for local needs",
                    icon: Users,
                  },
                  {
                    title: "Trusted & accurate",
                    desc: "Reliable results",
                    icon: ShieldCheck,
                  },
                  {
                    title: "Always updated",
                    desc: "Live rates & rules",
                    icon: RefreshCw,
                  },
                ].map(({ title, desc, icon: Icon }) => (
                  <div key={title} className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ECFDF3] text-[#0B5A2A]">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-extrabold text-[#0B1020]">
                        {title}
                      </span>
                      <span className="block text-xs leading-5 text-[#667085]">
                        {desc}
                      </span>
                    </span>
                  </div>
                ))}
              </div>

              <HeroSearch
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSubmit={handleSearchSubmit}
              />
            </div>

            <HeroVisual />
          </div>
        </section>

        <section className="border-b border-[#E4E7EC] bg-white">
          <div className="mx-auto grid max-w-[1280px] gap-8 px-4 py-9 sm:px-8 lg:grid-cols-[210px_1fr] lg:items-center">
            <div>
              <h2 className="font-inter text-[28px] font-extrabold leading-tight text-[#0B1020]">
                Popular tools
              </h2>
              <p className="mt-4 text-sm leading-6 text-[#667085]">
                Quick access to the calculators Kenyans use most.
              </p>
              <Link
                href="/calculators"
                className="mt-8 inline-flex items-center gap-2 text-sm font-extrabold text-[#0B5A2A]"
              >
                View all calculators
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid overflow-hidden rounded-2xl border border-[#E4E7EC] bg-white shadow-sm sm:grid-cols-2 lg:grid-cols-5">
              {popularTools.map((tool) => (
                <PopularTool key={tool.title} tool={tool} />
              ))}
            </div>
          </div>
        </section>

        <section
          id="categories"
          className="mx-auto max-w-[1280px] px-4 py-12 sm:px-8"
        >
          <div className="mb-8">
            <h2 className="font-inter text-[28px] font-extrabold text-[#0B1020] md:text-[32px]">
              Browse by category
            </h2>
            <p className="mt-3 text-base leading-7 text-[#667085]">
              Explore calculators by what matters to you.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {categories.map((category) => (
              <CategoryTile key={category.title} category={category} />
            ))}
          </div>
        </section>

        <FeatureSection />

        <section className="mx-auto max-w-[1220px] px-4 pb-14 pt-2 sm:px-6">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="font-inter text-[30px] font-extrabold text-[#0B1020] md:text-[36px]">
              Local data. Real confidence.
            </h2>
            <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-[#0B5A2A]" />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Local rates",
                description:
                  "Based on Kenya Revenue Authority, NSSF, SHIF and bank data.",
                icon: BriefcaseBusiness,
              },
              {
                title: "Updated regularly",
                description:
                  "We update rates and rules so you always get reviewed estimates.",
                icon: RefreshCw,
              },
              {
                title: "Built for Kenyans",
                description:
                  "Simple tools that reflect how you earn, spend and plan.",
                icon: Users,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex min-h-[130px] items-center gap-5 rounded-2xl border border-[#E4E7EC] bg-white p-6 shadow-sm"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#ECFDF3] text-[#0B5A2A]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-inter text-base font-extrabold text-[#0B1020]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#667085]">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
