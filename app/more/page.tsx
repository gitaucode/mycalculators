import Link from "next/link"
import { ArrowRight, BookOpen, CircleHelp, FileText, Info, Scale } from "lucide-react"

const links = [
  { label: "Current rates", detail: "Taxes, fees and limits", href: "/rates", icon: Scale },
  { label: "Guides", detail: "Understand the numbers", href: "/guides", icon: BookOpen },
  { label: "About My Calculators", detail: "Built for Kenya", href: "/about", icon: Info },
  { label: "Contact", detail: "Questions and feedback", href: "/contact", icon: CircleHelp },
  { label: "Privacy and terms", detail: "How the app works", href: "/privacy", icon: FileText },
] as const

export default function MorePage() {
  return (
    <main className="min-h-screen bg-[#F4F7F5] px-4 py-5 text-[#0B1020]">
      <div className="native-web-only">
        <h1 className="font-poppins text-2xl font-bold">More</h1>
        <p className="mt-1 text-sm text-[#667085]">Information, support and useful references.</p>
      </div>
      <div className="mt-6 overflow-hidden rounded-[20px] border border-[#E4E7EC] bg-white shadow-sm">
        {links.map(({ label, detail, href, icon: Icon }, index) => (
          <Link key={href} href={href} className={`flex items-center gap-4 p-4 active:bg-[#F0FAF4] ${index ? "border-t border-[#E4E7EC]" : ""}`}>
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E8F7EE] text-[#0B5A2A]"><Icon className="h-5 w-5" /></span>
            <span className="min-w-0 flex-1"><strong className="block">{label}</strong><small className="text-[#667085]">{detail}</small></span>
            <ArrowRight className="h-5 w-5 text-[#98A2B3]" />
          </Link>
        ))}
      </div>
      <p className="mt-8 text-center text-xs font-semibold text-[#98A2B3]">My Calculators Kenya Â· Version 1.0</p>
    </main>
  )
}
