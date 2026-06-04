"use client"

import { useMemo, useState } from "react"
import { Download, FileText, Plus, Printer, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type InvoiceItem = {
  id: number
  description: string
  quantity: string
  rate: string
}

const initialItems: InvoiceItem[] = [
  { id: 1, description: "Consulting services", quantity: "1", rate: "25000" },
]

const formatMoney = (value: number) =>
  `KSH ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

const today = new Date().toISOString().slice(0, 10)

function addDays(days: number) {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.toISOString().slice(0, 10)
}

export function InvoiceGenerator() {
  const [businessName, setBusinessName] = useState("Your Business Name")
  const [businessPin, setBusinessPin] = useState("")
  const [businessDetails, setBusinessDetails] = useState("Nairobi, Kenya\nhello@example.com\n+254 700 000 000")
  const [clientName, setClientName] = useState("")
  const [clientDetails, setClientDetails] = useState("")
  const [invoiceNumber, setInvoiceNumber] = useState(`INV-${new Date().getFullYear()}-001`)
  const [invoiceDate, setInvoiceDate] = useState(today)
  const [dueDate, setDueDate] = useState(addDays(14))
  const [items, setItems] = useState<InvoiceItem[]>(initialItems)
  const [vatRate, setVatRate] = useState("16")
  const [discount, setDiscount] = useState("")
  const [amountPaid, setAmountPaid] = useState("")
  const [paymentDetails, setPaymentDetails] = useState("M-Pesa Paybill: 000000\nAccount: Invoice number")
  const [notes, setNotes] = useState("Thank you for your business.")

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => {
      const quantity = Number.parseFloat(item.quantity) || 0
      const rate = Number.parseFloat(item.rate) || 0
      return sum + quantity * rate
    }, 0)
    const discountAmount = Math.min(subtotal, Math.max(0, Number.parseFloat(discount) || 0))
    const taxableAmount = Math.max(0, subtotal - discountAmount)
    const vatAmount = taxableAmount * ((Number.parseFloat(vatRate) || 0) / 100)
    const total = taxableAmount + vatAmount
    const paid = Math.max(0, Number.parseFloat(amountPaid) || 0)
    const balance = total - paid

    return { subtotal, discountAmount, taxableAmount, vatAmount, total, paid, balance }
  }, [amountPaid, discount, items, vatRate])

  const updateItem = (id: number, field: keyof InvoiceItem, value: string) => {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const addItem = () => {
    setItems((current) => [
      ...current,
      { id: Date.now(), description: "", quantity: "1", rate: "" },
    ])
  }

  const removeItem = (id: number) => {
    setItems((current) => current.length === 1 ? current : current.filter((item) => item.id !== id))
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="invoice-tool w-full max-w-none space-y-6">
      <style>{`
        .invoice-form-grid {
          display: grid;
          gap: 1.25rem;
          width: 100%;
        }

        @media (min-width: 1024px) {
          .invoice-form-grid {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          }

          .invoice-form-grid-wide {
            grid-column: 1 / -1;
          }
        }

        @media print {
          body * {
            visibility: hidden !important;
          }
          .invoice-print-area,
          .invoice-print-area * {
            visibility: visible !important;
          }
          .invoice-print-area {
            position: absolute !important;
            inset: 0 auto auto 0 !important;
            width: 100% !important;
            background: #ffffff !important;
          }
          .invoice-print-sheet {
            border: 0 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            min-height: auto !important;
          }
          .invoice-no-print {
            display: none !important;
          }
          @page {
            margin: 14mm;
          }
        }
      `}</style>

      <div className="invoice-no-print invoice-form-grid">
        <Card className="rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
          <CardHeader>
            <CardTitle className="font-poppins text-2xl font-bold tracking-tight text-[#0B1020]">
              Invoice Generator
            </CardTitle>
            <CardDescription className="text-base leading-6 text-[#667085]">
              Create a clean Kenya-ready invoice with VAT, payment details and balance due.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="business-name" label="Business Name" value={businessName} setValue={setBusinessName} />
              <Field id="business-pin" label="KRA PIN" value={businessPin} setValue={setBusinessPin} placeholder="Optional" />
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="business-details" className="font-semibold text-[#0B1020]">Business Details</Label>
                <Textarea id="business-details" value={businessDetails} onChange={(event) => setBusinessDetails(event.target.value)} className="min-h-[104px] rounded-xl border-[#E4E7EC] text-base" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
          <CardHeader>
            <CardTitle className="font-poppins text-xl font-bold text-[#0B1020]">Client and Invoice Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="client-name" label="Client Name" value={clientName} setValue={setClientName} placeholder="Client or company name" />
              <Field id="invoice-number" label="Invoice Number" value={invoiceNumber} setValue={setInvoiceNumber} />
              <Field id="invoice-date" label="Invoice Date" value={invoiceDate} setValue={setInvoiceDate} type="date" />
              <Field id="due-date" label="Due Date" value={dueDate} setValue={setDueDate} type="date" />
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="client-details" className="font-semibold text-[#0B1020]">Client Details</Label>
                <Textarea id="client-details" value={clientDetails} onChange={(event) => setClientDetails(event.target.value)} placeholder="Address, email, phone or PIN" className="min-h-[88px] rounded-xl border-[#E4E7EC] text-base" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="invoice-form-grid-wide rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
          <CardHeader className="flex-row items-center justify-between gap-4 space-y-0">
            <div>
              <CardTitle className="font-poppins text-xl font-bold text-[#0B1020]">Line Items</CardTitle>
              <CardDescription>Quantity, rate and totals update instantly.</CardDescription>
            </div>
            <Button type="button" onClick={addItem} className="h-10 rounded-xl bg-[#0B5A2A] px-4 font-bold text-white hover:bg-[#063F20]">
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((item, index) => (
              <div key={item.id} className="grid gap-3 rounded-2xl border border-[#E4E7EC] bg-[#F7FAF8] p-4 sm:grid-cols-[minmax(0,1fr)_90px_130px_44px] sm:items-end">
                <Field id={`item-description-${item.id}`} label={`Item ${index + 1}`} value={item.description} setValue={(value) => updateItem(item.id, "description", value)} placeholder="Description" />
                <Field id={`item-quantity-${item.id}`} label="Qty" value={item.quantity} setValue={(value) => updateItem(item.id, "quantity", value)} type="number" />
                <Field id={`item-rate-${item.id}`} label="Rate" value={item.rate} setValue={(value) => updateItem(item.id, "rate", value)} type="number" />
                <Button type="button" variant="outline" onClick={() => removeItem(item.id)} disabled={items.length === 1} className="h-11 rounded-xl border-[#E4E7EC] text-[#667085] hover:text-[#DC2626]" aria-label={`Remove item ${index + 1}`}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="invoice-form-grid-wide rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
          <CardHeader>
            <CardTitle className="font-poppins text-xl font-bold text-[#0B1020]">Totals and Payment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-3">
              <Field id="vat-rate" label="VAT Rate (%)" value={vatRate} setValue={setVatRate} type="number" />
              <Field id="discount" label="Discount (KSH)" value={discount} setValue={setDiscount} type="number" placeholder="0" />
              <Field id="amount-paid" label="Amount Paid (KSH)" value={amountPaid} setValue={setAmountPaid} type="number" placeholder="0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="payment-details" className="font-semibold text-[#0B1020]">Payment Details</Label>
              <Textarea id="payment-details" value={paymentDetails} onChange={(event) => setPaymentDetails(event.target.value)} className="min-h-[88px] rounded-xl border-[#E4E7EC] text-base" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="invoice-notes" className="font-semibold text-[#0B1020]">Notes</Label>
              <Textarea id="invoice-notes" value={notes} onChange={(event) => setNotes(event.target.value)} className="min-h-[88px] rounded-xl border-[#E4E7EC] text-base" />
            </div>
            <div className="grid gap-3 rounded-2xl bg-[#F0FAF4] p-4 text-sm text-[#0B5A2A] sm:grid-cols-2">
              <SummaryLine label="Subtotal" value={formatMoney(totals.subtotal)} />
              <SummaryLine label="Total" value={formatMoney(totals.total)} />
              <SummaryLine label="VAT" value={formatMoney(totals.vatAmount)} />
              <SummaryLine label="Balance Due" value={formatMoney(totals.balance)} strong />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="invoice-no-print flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button type="button" onClick={handlePrint} className="h-11 rounded-xl bg-[#0B5A2A] px-5 font-bold text-white hover:bg-[#063F20]">
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button type="button" onClick={handlePrint} variant="outline" className="h-11 rounded-xl border-[#CFEBDD] px-5 font-bold text-[#0B5A2A]">
            <Download className="h-4 w-4" />
            Save as PDF
          </Button>
        </div>

        <section className="invoice-print-area">
          <div className="invoice-print-sheet min-h-[860px] rounded-[20px] border border-[#E4E7EC] bg-white p-6 shadow-[0_20px_50px_rgba(16,24,40,0.08)] sm:p-8">
            <div className="flex flex-col gap-6 border-b border-[#E4E7EC] pb-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B5A2A] text-white">
                  <FileText className="h-6 w-6" />
                </div>
                <h2 className="font-poppins text-2xl font-bold text-[#0B1020]">{businessName || "Business Name"}</h2>
                {businessPin && <p className="mt-1 text-sm font-semibold text-[#0B5A2A]">PIN: {businessPin}</p>}
                <PreserveLines className="mt-3 text-sm leading-6 text-[#667085]" value={businessDetails} fallback="Business details" />
              </div>
              <div className="text-left sm:text-right">
                <p className="font-poppins text-3xl font-bold uppercase tracking-wide text-[#0B1020]">Invoice</p>
                <p className="mt-3 text-sm font-semibold text-[#667085]">Invoice No.</p>
                <p className="font-bold text-[#0B1020]">{invoiceNumber || "INV-001"}</p>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-1 sm:gap-2">
                  <div>
                    <p className="font-semibold text-[#667085]">Date</p>
                    <p className="font-bold text-[#0B1020]">{invoiceDate || "-"}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#667085]">Due</p>
                    <p className="font-bold text-[#0B1020]">{dueDate || "-"}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6 border-b border-[#E4E7EC] py-6 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#667085]">Bill To</p>
                <h3 className="font-poppins text-lg font-bold text-[#0B1020]">{clientName || "Client Name"}</h3>
                <PreserveLines className="mt-2 text-sm leading-6 text-[#667085]" value={clientDetails} fallback="Client details" />
              </div>
              <div className="rounded-2xl bg-[#F7FAF8] p-4">
                <p className="text-sm font-semibold text-[#667085]">Balance Due</p>
                <p className="mt-1 font-poppins text-3xl font-bold text-[#0B5A2A]">{formatMoney(totals.balance)}</p>
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-[#E4E7EC]">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-[#F7FAF8] text-[#344054]">
                  <tr>
                    <th className="px-4 py-3 font-bold">Description</th>
                    <th className="w-20 px-4 py-3 text-right font-bold">Qty</th>
                    <th className="w-32 px-4 py-3 text-right font-bold">Rate</th>
                    <th className="w-36 px-4 py-3 text-right font-bold">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => {
                    const quantity = Number.parseFloat(item.quantity) || 0
                    const rate = Number.parseFloat(item.rate) || 0
                    return (
                      <tr key={item.id} className="border-t border-[#E4E7EC]">
                        <td className="px-4 py-4 font-semibold text-[#0B1020]">{item.description || "Item description"}</td>
                        <td className="px-4 py-4 text-right text-[#667085]">{quantity.toLocaleString()}</td>
                        <td className="px-4 py-4 text-right text-[#667085]">{formatMoney(rate)}</td>
                        <td className="px-4 py-4 text-right font-bold text-[#0B1020]">{formatMoney(quantity * rate)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-[1fr_320px]">
              <div className="space-y-5">
                <div>
                  <p className="mb-2 text-sm font-bold text-[#0B1020]">Payment Details</p>
                  <PreserveLines className="text-sm leading-6 text-[#667085]" value={paymentDetails} fallback="Payment details" />
                </div>
                <div>
                  <p className="mb-2 text-sm font-bold text-[#0B1020]">Notes</p>
                  <PreserveLines className="text-sm leading-6 text-[#667085]" value={notes} fallback="Notes" />
                </div>
              </div>
              <div className="space-y-3 rounded-2xl bg-[#F7FAF8] p-5 text-sm">
                <PreviewTotal label="Subtotal" value={formatMoney(totals.subtotal)} />
                <PreviewTotal label="Discount" value={`- ${formatMoney(totals.discountAmount)}`} />
                <PreviewTotal label={`VAT (${Number.parseFloat(vatRate) || 0}%)`} value={formatMoney(totals.vatAmount)} />
                <PreviewTotal label="Total" value={formatMoney(totals.total)} strong />
                <PreviewTotal label="Paid" value={`- ${formatMoney(totals.paid)}`} />
                <div className="border-t border-[#D0D5DD] pt-3">
                  <PreviewTotal label="Balance Due" value={formatMoney(totals.balance)} strong />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function Field({
  id,
  label,
  value,
  setValue,
  placeholder,
  type = "text",
}: {
  id: string
  label: string
  value: string
  setValue: (value: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="font-semibold text-[#0B1020]">{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        className="h-12 rounded-xl border-[#E4E7EC] text-base"
      />
    </div>
  )
}

function PreserveLines({ value, fallback, className }: { value: string; fallback: string; className?: string }) {
  return (
    <p className={className}>
      {(value || fallback).split("\n").map((line, index, lines) => (
        <span key={`${line}-${index}`}>
          {line}
          {index < lines.length - 1 && <br />}
        </span>
      ))}
    </p>
  )
}

function SummaryLine({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#047857]">{label}</p>
      <p className={`mt-1 ${strong ? "font-poppins text-xl font-bold" : "font-bold"}`}>{value}</p>
    </div>
  )
}

function PreviewTotal({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex justify-between gap-4 ${strong ? "font-poppins text-lg font-bold text-[#0B1020]" : "text-[#667085]"}`}>
      <span>{label}</span>
      <span className={strong ? "text-[#0B5A2A]" : "font-semibold text-[#0B1020]"}>{value}</span>
    </div>
  )
}
