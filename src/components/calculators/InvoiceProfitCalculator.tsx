"use client"

import { useState } from "react"
import { BarChart3, Receipt } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type InvoiceProfitResult = {
  revenue: number
  vatAmount: number
  invoiceTotal: number
  totalCost: number
  profit: number
  margin: number
  markup: number
}

const money = (value: number) =>
  value.toLocaleString(undefined, { maximumFractionDigits: 0 })

export const InvoiceProfitCalculator = () => {
  const [sellingPrice, setSellingPrice] = useState("")
  const [quantity, setQuantity] = useState("1")
  const [unitCost, setUnitCost] = useState("")
  const [otherCosts, setOtherCosts] = useState("")
  const [vatRate, setVatRate] = useState("16")
  const [result, setResult] = useState<InvoiceProfitResult | null>(null)

  const calculate = () => {
    const price = Number.parseFloat(sellingPrice)
    const qty = Number.parseFloat(quantity)
    const cost = Number.parseFloat(unitCost) || 0
    const extras = Number.parseFloat(otherCosts) || 0
    const vat = (Number.parseFloat(vatRate) || 0) / 100

    if (!price || !qty || price <= 0 || qty <= 0) {
      setResult(null)
      return
    }

    const revenue = price * qty
    const totalCost = cost * qty + extras
    const profit = revenue - totalCost
    const vatAmount = revenue * vat
    const invoiceTotal = revenue + vatAmount
    const margin = revenue > 0 ? (profit / revenue) * 100 : 0
    const markup = totalCost > 0 ? (profit / totalCost) * 100 : 0

    setResult({ revenue, vatAmount, invoiceTotal, totalCost, profit, margin, markup })
  }

  return (
    <div className="calculator-split-native grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.85fr)] lg:items-start">
      <Card className="rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
        <CardHeader>
          <CardTitle className="font-poppins text-2xl font-bold tracking-tight text-[#0B1020]">
            Invoice and Profit Calculator
          </CardTitle>
          <CardDescription className="text-base leading-6 text-[#667085]">
            Price a sale, add VAT, and see your profit margin before sending an invoice.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="selling-price" className="font-semibold text-[#0B1020]">Selling Price per Unit (KSH)</Label>
              <Input id="selling-price" type="number" value={sellingPrice} onChange={(event) => setSellingPrice(event.target.value)} placeholder="e.g., 2500" className="h-12 rounded-xl border-[#E4E7EC] text-base" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity" className="font-semibold text-[#0B1020]">Quantity</Label>
              <Input id="quantity" type="number" value={quantity} onChange={(event) => setQuantity(event.target.value)} placeholder="e.g., 10" className="h-12 rounded-xl border-[#E4E7EC] text-base" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit-cost" className="font-semibold text-[#0B1020]">Cost per Unit (KSH)</Label>
              <Input id="unit-cost" type="number" value={unitCost} onChange={(event) => setUnitCost(event.target.value)} placeholder="e.g., 1500" className="h-12 rounded-xl border-[#E4E7EC] text-base" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="other-costs" className="font-semibold text-[#0B1020]">Other Costs (KSH)</Label>
              <Input id="other-costs" type="number" value={otherCosts} onChange={(event) => setOtherCosts(event.target.value)} placeholder="e.g., delivery, packaging" className="h-12 rounded-xl border-[#E4E7EC] text-base" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="invoice-vat" className="font-semibold text-[#0B1020]">VAT Rate (%)</Label>
              <Input id="invoice-vat" type="number" value={vatRate} onChange={(event) => setVatRate(event.target.value)} className="h-12 rounded-xl border-[#E4E7EC] text-base" />
            </div>
          </div>
          <Button onClick={calculate} className="h-12 w-full rounded-xl bg-[#0B5A2A] font-bold text-white hover:bg-[#063F20]">
            Calculate Profit
          </Button>
          <div className="rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
            <p className="font-semibold">Small business planning</p>
            <p>Use this to compare invoice total, direct costs, profit margin, and markup before quoting a client.</p>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-[20px] border-[#CFEBDD] bg-[radial-gradient(circle_at_50%_18%,rgba(11,90,42,0.06),transparent_42%),#F7FAF8] shadow-[0_14px_36px_rgba(11,90,42,0.06)]">
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="font-poppins text-2xl font-bold tracking-tight text-[#0B1020]">Your Estimate</CardTitle>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ECFDF3] text-[#0B5A2A]">
            <BarChart3 className="h-5 w-5" />
          </span>
        </CardHeader>
        <CardContent>
          {result ? (
            <div className="space-y-4">
              <div className="rounded-2xl bg-white p-5 text-center shadow-sm">
                <p className="text-sm font-semibold text-[#667085]">Estimated Profit</p>
                <p className={`mt-2 font-poppins text-3xl font-bold ${result.profit >= 0 ? "text-[#0B5A2A]" : "text-[#DC2626]"}`}>
                  KSH {money(result.profit)}
                </p>
              </div>
              <div className="space-y-3 text-sm">
                <ResultRow label="Revenue before VAT" value={`KSH ${money(result.revenue)}`} />
                <ResultRow label="VAT amount" value={`KSH ${money(result.vatAmount)}`} />
                <ResultRow label="Invoice total" value={`KSH ${money(result.invoiceTotal)}`} strong />
                <ResultRow label="Total cost" value={`KSH ${money(result.totalCost)}`} />
                <ResultRow label="Profit margin" value={`${result.margin.toFixed(1)}%`} />
                <ResultRow label="Markup" value={`${result.markup.toFixed(1)}%`} />
              </div>
            </div>
          ) : (
            <EmptyState icon={Receipt} text="Enter your selling price, quantity, costs and VAT rate to see invoice and profit totals." />
          )}
          <div className="mt-6 rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
            Estimates exclude income tax and payment processing fees unless you add them as other costs.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ResultRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex justify-between border-b border-[#E4E7EC] pb-3 ${strong ? "text-base font-bold" : ""}`}>
      <span className={strong ? "text-[#0B1020]" : "text-[#667085]"}>{label}</span>
      <span className={strong ? "text-[#0B5A2A]" : "font-semibold text-[#0B1020]"}>{value}</span>
    </div>
  )
}

function EmptyState({ icon: Icon, text }: { icon: typeof Receipt; text: string }) {
  return (
    <div className="space-y-5">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ECFDF3] text-[#0B5A2A]">
        <Icon className="h-8 w-8" />
      </div>
      <p className="mx-auto max-w-xs text-center text-sm font-semibold leading-6 text-[#344054]">{text}</p>
    </div>
  )
}
