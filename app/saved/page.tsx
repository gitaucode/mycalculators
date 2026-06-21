"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Capacitor } from "@capacitor/core"
import { Preferences } from "@capacitor/preferences"
import { ArrowRight, FileText, Receipt } from "lucide-react"

type Draft = { title: string; subtitle: string; href: string; icon: typeof FileText }

async function stored(key: string) {
  return Capacitor.isNativePlatform() ? (await Preferences.get({ key })).value : window.localStorage.getItem(key)
}

export default function SavedPage() {
  const [drafts, setDrafts] = useState<Draft[]>([])

  useEffect(() => {
    Promise.all([
      Promise.all([stored("invoice.number"), stored("invoice.clientName")]),
      Promise.all([stored("receipt.number"), stored("receipt.customerName")]),
    ]).then(([[invoiceNumber, clientName], [receiptNumber, customerName]]) => {
      const next: Draft[] = []
      if (invoiceNumber || clientName) next.push({ title: JSON.parse(invoiceNumber || '"Invoice draft"'), subtitle: JSON.parse(clientName || '"Invoice draft"') || "Invoice draft", href: "/invoice-generator", icon: FileText })
      if (receiptNumber || customerName) next.push({ title: JSON.parse(receiptNumber || '"Receipt draft"'), subtitle: JSON.parse(customerName || '"Receipt draft"') || "Receipt draft", href: "/receipt-generator", icon: Receipt })
      setDrafts(next)
    }).catch(() => setDrafts([]))
  }, [])

  return (
    <main className="min-h-screen bg-[#F4F7F5] px-4 py-5 text-[#0B1020]">
      <h1 className="font-poppins text-2xl font-bold">Saved drafts</h1>
      <p className="mt-1 text-sm text-[#667085]">Your documents are stored only on this device.</p>
      <div className="mt-6 space-y-3">
        {drafts.length ? drafts.map(({ title, subtitle, href, icon: Icon }) => (
          <Link key={href} href={href} className="flex items-center gap-4 rounded-[20px] border border-[#E4E7EC] bg-white p-4 shadow-sm">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F7EE] text-[#0B5A2A]"><Icon className="h-5 w-5" /></span>
            <span className="min-w-0 flex-1"><strong className="block truncate">{title}</strong><small className="block truncate text-[#667085]">{subtitle}</small></span>
            <ArrowRight className="h-5 w-5 text-[#98A2B3]" />
          </Link>
        )) : (
          <div className="rounded-[20px] border border-dashed border-[#CFEBDD] bg-white p-8 text-center">
            <FileText className="mx-auto h-8 w-8 text-[#0B5A2A]" />
            <p className="mt-3 font-bold">No saved drafts yet</p>
            <p className="mt-1 text-sm text-[#667085]">Invoices and receipts save automatically as you type.</p>
          </div>
        )}
      </div>
    </main>
  )
}
