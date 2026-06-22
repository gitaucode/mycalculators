"use client"

import { useEffect, useLayoutEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Capacitor } from "@capacitor/core"
import { App } from "@capacitor/app"
import { Network } from "@capacitor/network"
import { ArrowLeft, Calculator, FileText, Home, Landmark, MoreHorizontal, Receipt, Smartphone, WalletCards, WifiOff } from "lucide-react"
import { FormStatePersistence } from "@/components/form-state-persistence"
import { BrandLogo } from "@/components/brand-logo"

const routeTitles: Record<string, string> = {
  "/": "My Calculators",
  "/calculators": "Calculators",
  "/saved": "Saved",
  "/more": "More",
  "/invoice-generator": "Invoice Generator",
  "/receipt-generator": "Receipt Generator",
  "/mpesa-charges": "M-Pesa Charges",
  "/net-salary": "Net Salary",
  "/loan-calculator": "Loan Calculator",
  "/vat-calculator": "VAT Calculator",
  "/fuliza-calculator": "Fuliza Cost",
  "/mortgage-calculator": "Mortgage",
  "/savings-goal": "Savings Goal",
  "/budget-planner": "Budget Planner",
  "/bill-splitting": "Split a Bill",
  "/roi-estimator": "ROI Estimator",
  "/chama-sacco-calculator": "Chama & SACCO",
  "/school-fee-planner": "School Fees",
  "/mkopa-phone-loan": "M-KOPA Phone Loan",
  "/electricity-calculator": "Electricity Tokens",
  "/water-bill-calculator": "Water Bill",
  "/fuel-cost-calculator": "Fuel Cost",
  "/construction-cost": "Construction Cost",
  "/car-import-tax": "Car Import Tax",
  "/withholding-tax-calculator": "Withholding Tax",
  "/cost-of-living": "Cost of Living",
  "/bmi-calculator": "BMI Calculator",
  "/calorie-calculator": "Calories",
  "/water-intake": "Water Intake",
  "/heart-rate-zones": "Heart Rate Zones",
  "/pregnancy-due-date": "Due Date",
  "/ovulation-tracker": "Ovulation Tracker",
  "/rates": "Rates",
  "/guides": "Guides",
  "/about": "About",
  "/contact": "Contact & Feedback",
  "/privacy": "Privacy",
  "/terms": "Terms",
  "/cookies": "Cookies",
  "/disclaimer": "Disclaimer",
  "/guides/net-salary-paye-kenya": "Net Salary Guide",
  "/guides/mpesa-charges-kenya": "M-Pesa Charges Guide",
  "/guides/car-import-duty-kenya": "Car Import Duty Guide",
  "/guides/vat-calculator-kenya": "VAT Guide",
  "/guides/kplc-token-calculator-kenya": "Electricity Tokens Guide",
}

const rootTabs = new Set(["/", "/calculators", "/saved", "/more"])

const quickTools = [
  { label: "M-Pesa", detail: "Charges", href: "/mpesa-charges", icon: Smartphone, color: "bg-[#E8F7EE] text-[#0B5A2A]" },
  { label: "Net Salary", detail: "PAYE & deductions", href: "/net-salary", icon: WalletCards, color: "bg-[#FFF4E5] text-[#B54708]" },
  { label: "Loans", detail: "Payments", href: "/loan-calculator", icon: Landmark, color: "bg-[#EFF6FF] text-[#2563EB]" },
  { label: "All tools", detail: "Browse", href: "/calculators", icon: Calculator, color: "bg-[#F3F0FF] text-[#6941C6]" },
] as const

function titleFor(pathname: string) {
  if (routeTitles[pathname]) return routeTitles[pathname]
  return pathname.split("/").filter(Boolean).pop()?.split("-").map((word) => word[0]?.toUpperCase() + word.slice(1)).join(" ") || "My Calculators"
}

function isNativeRuntime() {
  return Capacitor.isNativePlatform()
    || (process.env.NODE_ENV === "development" && new URLSearchParams(window.location.search).has("native-preview"))
}

function NativeHome() {
  return (
    <main className="native-home-screen fixed inset-x-0 z-40 overflow-y-auto bg-[#F4F7F5] px-4 pb-8">
      <section className="rounded-[24px] bg-[linear-gradient(135deg,#0B5A2A,#063F20)] p-5 text-white shadow-[0_16px_36px_rgba(6,63,32,0.2)]">
        <p className="text-sm font-semibold text-emerald-100">Smart tools for everyday decisions</p>
        <h1 className="mt-2 font-poppins text-2xl font-bold leading-tight">What do you want to calculate?</h1>
        <Link href="/calculators" className="mt-5 flex h-12 items-center gap-3 rounded-2xl bg-white px-4 text-sm font-semibold text-[#667085] shadow-sm">
          <Calculator className="h-5 w-5 text-[#0B5A2A]" />
          Search calculators
        </Link>
      </section>

      <section className="mt-7">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-poppins text-lg font-bold text-[#0B1020]">Quick access</h2>
          <Link href="/calculators" className="text-sm font-bold text-[#0B5A2A]">See all</Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {quickTools.map(({ label, detail, href, icon: Icon, color }) => (
            <Link key={href} href={href} className="rounded-[20px] border border-[#E4E7EC] bg-white p-4 shadow-sm active:scale-[0.98]">
              <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${color}`}><Icon className="h-5 w-5" /></span>
              <p className="mt-4 font-bold text-[#0B1020]">{label}</p>
              <p className="mt-1 text-xs font-medium text-[#667085]">{detail}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-7">
        <h2 className="mb-3 font-poppins text-lg font-bold text-[#0B1020]">Business tools</h2>
        <div className="overflow-hidden rounded-[20px] border border-[#E4E7EC] bg-white shadow-sm">
          <Link href="/invoice-generator" className="flex items-center gap-4 border-b border-[#E4E7EC] p-4 active:bg-[#F0FAF4]">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EFF6FF] text-[#2563EB]"><FileText className="h-5 w-5" /></span>
            <span><strong className="block text-[#0B1020]">Create invoice</strong><small className="text-[#667085]">Saved automatically</small></span>
          </Link>
          <Link href="/receipt-generator" className="flex items-center gap-4 p-4 active:bg-[#F0FAF4]">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ECFDF3] text-[#0B5A2A]"><Receipt className="h-5 w-5" /></span>
            <span><strong className="block text-[#0B1020]">Create receipt</strong><small className="text-[#667085]">Print or share PDF</small></span>
          </Link>
        </div>
      </section>
    </main>
  )
}

export function NativeAppShell() {
  const [offline, setOffline] = useState(false)
  const [native, setNative] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useLayoutEffect(() => {
    const isNative = isNativeRuntime()
    setNative(isNative)
    document.documentElement.classList.toggle("native-app", isNative)
    if (!isNative) document.documentElement.classList.remove("native-loading")
    return () => document.documentElement.classList.remove("native-app", "native-loading", "native-ready")
  }, [])

  useLayoutEffect(() => {
    if (!native) return
    document.documentElement.classList.remove("native-loading")
    document.documentElement.classList.add("native-ready")
  }, [native])

  useLayoutEffect(() => {
    document.body.dataset.nativePath = pathname
  }, [pathname])

  useEffect(() => {
    let disposed = false
    const handles: Array<{ remove: () => Promise<void> }> = []

    Network.getStatus().then(({ connected }) => {
      if (!disposed) setOffline(!connected)
    })
    Network.addListener("networkStatusChange", ({ connected }) => {
      setOffline(!connected)
    }).then((handle) => handles.push(handle))

    if (Capacitor.isNativePlatform()) {
      App.addListener("backButton", ({ canGoBack }) => {
        if (canGoBack && window.history.length > 1) {
          window.history.back()
        } else {
          App.exitApp()
        }
      }).then((handle) => handles.push(handle))
    }

    return () => {
      disposed = true
      handles.forEach((handle) => void handle.remove())
    }
  }, [])

  const mainTab = pathname === "/" ? "/" : pathname === "/saved" ? "/saved" : pathname === "/more" || ["/about", "/rates", "/guides", "/privacy", "/terms", "/contact"].some((path) => pathname.startsWith(path)) ? "/more" : "/calculators"

  const tabs = [
    { label: "Home", href: "/", icon: Home },
    { label: "Calculators", href: "/calculators", icon: Calculator },
    { label: "Saved", href: "/saved", icon: WalletCards },
    { label: "More", href: "/more", icon: MoreHorizontal },
  ] as const

  return (
    <>
      <FormStatePersistence />
      {native && (
        <>
          <header data-native-shell className="native-app-topbar fixed inset-x-0 top-0 z-[60] flex items-end border-b border-[#E4E7EC] bg-white/95 px-4 pb-2 backdrop-blur-xl">
            <div className="flex h-12 w-full items-center gap-3">
              {rootTabs.has(pathname) ? (
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0B5A2A]"><BrandLogo size={23} /></span>
              ) : (
                <button type="button" onClick={() => router.back()} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F2F4F7] text-[#0B1020]" aria-label="Go back"><ArrowLeft className="h-5 w-5" /></button>
              )}
              <div className="min-w-0">
                <p className="truncate font-poppins text-[17px] font-bold text-[#0B1020]">{titleFor(pathname)}</p>
                {pathname === "/" && <p className="text-[11px] font-semibold text-[#0B5A2A]">Kenya</p>}
              </div>
            </div>
          </header>

          {pathname === "/" && <NativeHome />}

          <nav data-native-shell className="native-bottom-nav fixed inset-x-0 bottom-0 z-[60] grid grid-cols-4 border-t border-[#E4E7EC] bg-white/95 px-2 pt-1 backdrop-blur-xl" aria-label="App navigation">
            {tabs.map(({ label, href, icon: Icon }) => {
              const active = mainTab === href
              return (
                <Link key={href} href={href} className={`flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-xl text-[11px] font-bold ${active ? "text-[#0B5A2A]" : "text-[#667085]"}`}>
                  <span className={`flex h-7 min-w-12 items-center justify-center rounded-full ${active ? "bg-[#E8F7EE]" : ""}`}><Icon className="h-5 w-5" /></span>
                  {label}
                </Link>
              )
            })}
          </nav>
        </>
      )}
      {offline && (
        <div className="fixed inset-x-0 top-0 z-[100] flex items-center justify-center gap-2 bg-[#0B1020] px-4 py-2 text-center text-sm font-semibold text-white shadow-md" role="status">
          <WifiOff className="h-4 w-4" />
          You are offline. Saved calculators remain available.
        </div>
      )}
    </>
  )
}
