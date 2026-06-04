import Link from "next/link"
import { ChevronDown, FileText, Receipt, ReceiptText } from "lucide-react"

type SiteToolsMenuProps = {
  className?: string
}

const tools = [
  {
    title: "Invoice Generator",
    description: "Create printable invoices with VAT and payment details.",
    href: "/invoice-generator",
    icon: FileText,
  },
  {
    title: "Receipt Generator",
    description: "Create printable receipts for completed payments.",
    href: "/receipt-generator",
    icon: Receipt,
  },
  {
    title: "Invoice and Profit",
    description: "Estimate profit margin before sending a quote.",
    href: "/invoice-profit-calculator",
    icon: ReceiptText,
  },
]

export function SiteToolsMenu({ className = "" }: SiteToolsMenuProps) {
  return (
    <div className={`group relative ${className}`}>
      <button
        type="button"
        className="inline-flex items-center gap-1.5 font-semibold text-[#0B1020] transition-colors hover:text-[#0B5A2A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B5A2A] focus-visible:ring-offset-4"
        aria-haspopup="true"
      >
        Tools
        <ChevronDown className="h-4 w-4 transition group-hover:rotate-180 group-focus-within:rotate-180" />
      </button>
      <div className="invisible absolute left-1/2 top-full z-50 w-[320px] -translate-x-1/2 pt-4 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="rounded-2xl border border-[#E4E7EC] bg-white p-2 shadow-[0_18px_45px_rgba(16,24,40,0.14)]">
          {tools.map(({ title, description, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex gap-3 rounded-xl p-3 transition hover:bg-[#F0FAF4]"
            >
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB]">
                <Icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-extrabold text-[#0B1020]">{title}</span>
                <span className="mt-1 block text-xs leading-5 text-[#667085]">{description}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
