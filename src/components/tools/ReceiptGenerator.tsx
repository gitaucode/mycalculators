"use client"

import { useMemo, useState } from "react"
import { Download, Plus, Printer, Receipt, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type ReceiptItem = {
  id: number
  description: string
  quantity: string
  amount: string
}

const initialItems: ReceiptItem[] = [
  { id: 1, description: "Payment received", quantity: "1", amount: "5000" },
]

const today = new Date().toISOString().slice(0, 10)

const formatMoney = (value: number) =>
  `KSH ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

export function ReceiptGenerator() {
  const [businessName, setBusinessName] = useState("Your Business Name")
  const [businessPin, setBusinessPin] = useState("")
  const [businessDetails, setBusinessDetails] = useState("Nairobi, Kenya\nhello@example.com\n+254 700 000 000")
  const [customerName, setCustomerName] = useState("")
  const [customerDetails, setCustomerDetails] = useState("")
  const [receiptNumber, setReceiptNumber] = useState(`RCT-${new Date().getFullYear()}-001`)
  const [receiptDate, setReceiptDate] = useState(today)
  const [paymentMethod, setPaymentMethod] = useState("M-Pesa")
  const [paymentReference, setPaymentReference] = useState("")
  const [servedBy, setServedBy] = useState("")
  const [items, setItems] = useState<ReceiptItem[]>(initialItems)
  const [vatRate, setVatRate] = useState("0")
  const [notes, setNotes] = useState("Payment received with thanks.")

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => {
      const quantity = Number.parseFloat(item.quantity) || 0
      const amount = Number.parseFloat(item.amount) || 0
      return sum + quantity * amount
    }, 0)
    const vatAmount = subtotal * ((Number.parseFloat(vatRate) || 0) / 100)
    const total = subtotal + vatAmount

    return { subtotal, vatAmount, total }
  }, [items, vatRate])

  const updateItem = (id: number, field: keyof ReceiptItem, value: string) => {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const addItem = () => {
    setItems((current) => [
      ...current,
      { id: Date.now(), description: "", quantity: "1", amount: "" },
    ])
  }

  const removeItem = (id: number) => {
    setItems((current) => (current.length === 1 ? current : current.filter((item) => item.id !== id)))
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="receipt-tool calculator-split-native w-full max-w-none space-y-6">
      <style>{`
        .receipt-form-grid {
          display: grid;
          gap: 1.25rem;
          width: 100%;
        }

        .receipt-print-area {
          max-width: 820px;
          margin-left: auto;
          margin-right: auto;
        }

        @media (min-width: 1024px) {
          .receipt-form-grid {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          }

          .receipt-form-grid-wide {
            grid-column: 1 / -1;
          }
        }

        @media print {
          body * {
            visibility: hidden !important;
          }
          .receipt-print-area,
          .receipt-print-area * {
            visibility: visible !important;
          }
          .receipt-print-area {
            position: absolute !important;
            inset: 0 auto auto 0 !important;
            width: 100% !important;
            background: #ffffff !important;
          }
          .receipt-print-sheet {
            border: 0 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            min-height: auto !important;
          }
          .receipt-no-print {
            display: none !important;
          }
          @page {
            margin: 14mm;
          }
        }
      `}</style>

      <div className="receipt-no-print receipt-form-grid">
        <Card className="rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
          <CardHeader>
            <CardTitle className="font-poppins text-2xl font-bold tracking-tight text-[#0B1020]">
              Receipt Generator
            </CardTitle>
            <CardDescription className="text-base leading-6 text-[#667085]">
              Create a printable receipt for cash, bank or M-Pesa payments.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="receipt-business-name" label="Business Name" value={businessName} setValue={setBusinessName} />
              <Field id="receipt-business-pin" label="KRA PIN" value={businessPin} setValue={setBusinessPin} placeholder="Optional" />
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="receipt-business-details" className="font-semibold text-[#0B1020]">Business Details</Label>
                <Textarea id="receipt-business-details" value={businessDetails} onChange={(event) => setBusinessDetails(event.target.value)} className="min-h-[104px] rounded-xl border-[#E4E7EC] text-base" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
          <CardHeader>
            <CardTitle className="font-poppins text-xl font-bold text-[#0B1020]">Customer and Payment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="customer-name" label="Customer Name" value={customerName} setValue={setCustomerName} placeholder="Customer or company name" />
              <Field id="receipt-number" label="Receipt Number" value={receiptNumber} setValue={setReceiptNumber} />
              <Field id="receipt-date" label="Receipt Date" value={receiptDate} setValue={setReceiptDate} type="date" />
              <Field id="payment-method" label="Payment Method" value={paymentMethod} setValue={setPaymentMethod} placeholder="M-Pesa, cash, bank" />
              <Field id="payment-reference" label="Payment Reference" value={paymentReference} setValue={setPaymentReference} placeholder="Transaction code or cheque no." />
              <Field id="served-by" label="Received By" value={servedBy} setValue={setServedBy} placeholder="Staff or owner name" />
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="customer-details" className="font-semibold text-[#0B1020]">Customer Details</Label>
                <Textarea id="customer-details" value={customerDetails} onChange={(event) => setCustomerDetails(event.target.value)} placeholder="Address, email, phone or PIN" className="min-h-[88px] rounded-xl border-[#E4E7EC] text-base" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="receipt-form-grid-wide rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
          <CardHeader className="flex-row items-center justify-between gap-4 space-y-0">
            <div>
              <CardTitle className="font-poppins text-xl font-bold text-[#0B1020]">Receipt Items</CardTitle>
              <CardDescription>Add one or more paid items or services.</CardDescription>
            </div>
            <Button type="button" onClick={addItem} className="h-10 rounded-xl bg-[#0B5A2A] px-4 font-bold text-white hover:bg-[#063F20]">
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((item, index) => (
              <div key={item.id} className="grid gap-3 rounded-2xl border border-[#E4E7EC] bg-[#F7FAF8] p-4 sm:grid-cols-[minmax(0,1fr)_90px_150px_44px] sm:items-end">
                <Field id={`receipt-item-description-${item.id}`} label={`Item ${index + 1}`} value={item.description} setValue={(value) => updateItem(item.id, "description", value)} placeholder="Description" />
                <Field id={`receipt-item-quantity-${item.id}`} label="Qty" value={item.quantity} setValue={(value) => updateItem(item.id, "quantity", value)} type="number" />
                <Field id={`receipt-item-amount-${item.id}`} label="Amount" value={item.amount} setValue={(value) => updateItem(item.id, "amount", value)} type="number" />
                <Button type="button" variant="outline" onClick={() => removeItem(item.id)} disabled={items.length === 1} className="h-11 rounded-xl border-[#E4E7EC] text-[#667085] hover:text-[#DC2626]" aria-label={`Remove item ${index + 1}`}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="receipt-form-grid-wide rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
          <CardHeader>
            <CardTitle className="font-poppins text-xl font-bold text-[#0B1020]">Tax and Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-[220px_minmax(0,1fr)]">
              <Field id="receipt-vat-rate" label="VAT Rate (%)" value={vatRate} setValue={setVatRate} type="number" />
              <div className="rounded-2xl bg-[#F0FAF4] p-4 text-sm text-[#0B5A2A]">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#047857]">Amount Received</p>
                <p className="mt-1 font-poppins text-2xl font-bold">{formatMoney(totals.total)}</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="receipt-notes" className="font-semibold text-[#0B1020]">Notes</Label>
              <Textarea id="receipt-notes" value={notes} onChange={(event) => setNotes(event.target.value)} className="min-h-[88px] rounded-xl border-[#E4E7EC] text-base" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="receipt-no-print flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button type="button" onClick={handlePrint} className="h-11 rounded-xl bg-[#0B5A2A] px-5 font-bold text-white hover:bg-[#063F20]">
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button type="button" onClick={handlePrint} variant="outline" className="h-11 rounded-xl border-[#CFEBDD] px-5 font-bold text-[#0B5A2A]">
            <Download className="h-4 w-4" />
            Save as PDF
          </Button>
        </div>

        <section className="receipt-print-area">
          <div className="receipt-print-sheet rounded-[20px] border border-[#E4E7EC] bg-white p-6 shadow-[0_20px_50px_rgba(16,24,40,0.08)] sm:p-8">
            <div className="flex flex-col gap-6 border-b border-[#E4E7EC] pb-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B5A2A] text-white">
                  <Receipt className="h-6 w-6" />
                </div>
                <h2 className="font-poppins text-2xl font-bold text-[#0B1020]">{businessName || "Business Name"}</h2>
                {businessPin && <p className="mt-1 text-sm font-semibold text-[#0B5A2A]">PIN: {businessPin}</p>}
                <PreserveLines className="mt-3 text-sm leading-6 text-[#667085]" value={businessDetails} fallback="Business details" />
              </div>
              <div className="text-left sm:text-right">
                <p className="font-poppins text-3xl font-bold uppercase tracking-wide text-[#0B1020]">Receipt</p>
                <p className="mt-3 text-sm font-semibold text-[#667085]">Receipt No.</p>
                <p className="font-bold text-[#0B1020]">{receiptNumber || "RCT-001"}</p>
                <p className="mt-4 text-sm font-semibold text-[#667085]">Date</p>
                <p className="font-bold text-[#0B1020]">{receiptDate || "-"}</p>
              </div>
            </div>

            <div className="grid gap-6 border-b border-[#E4E7EC] py-6 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#667085]">Received From</p>
                <h3 className="font-poppins text-lg font-bold text-[#0B1020]">{customerName || "Customer Name"}</h3>
                <PreserveLines className="mt-2 text-sm leading-6 text-[#667085]" value={customerDetails} fallback="Customer details" />
              </div>
              <div className="rounded-2xl bg-[#F0FAF4] p-5">
                <p className="text-sm font-semibold text-[#0B5A2A]">Amount Received</p>
                <p className="mt-1 font-poppins text-3xl font-bold text-[#0B5A2A]">{formatMoney(totals.total)}</p>
                <div className="mt-4 grid gap-2 text-sm text-[#344054]">
                  <p><span className="font-semibold">Method:</span> {paymentMethod || "-"}</p>
                  <p><span className="font-semibold">Reference:</span> {paymentReference || "-"}</p>
                  <p><span className="font-semibold">Received by:</span> {servedBy || "-"}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-[#E4E7EC]">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-[#F7FAF8] text-[#344054]">
                  <tr>
                    <th className="px-4 py-3 font-bold">Description</th>
                    <th className="w-20 px-4 py-3 text-right font-bold">Qty</th>
                    <th className="w-36 px-4 py-3 text-right font-bold">Amount</th>
                    <th className="w-36 px-4 py-3 text-right font-bold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => {
                    const quantity = Number.parseFloat(item.quantity) || 0
                    const amount = Number.parseFloat(item.amount) || 0
                    return (
                      <tr key={item.id} className="border-t border-[#E4E7EC]">
                        <td className="px-4 py-4 font-semibold text-[#0B1020]">{item.description || "Item description"}</td>
                        <td className="px-4 py-4 text-right text-[#667085]">{quantity.toLocaleString()}</td>
                        <td className="px-4 py-4 text-right text-[#667085]">{formatMoney(amount)}</td>
                        <td className="px-4 py-4 text-right font-bold text-[#0B1020]">{formatMoney(quantity * amount)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-[1fr_300px]">
              <div>
                <p className="mb-2 text-sm font-bold text-[#0B1020]">Notes</p>
                <PreserveLines className="text-sm leading-6 text-[#667085]" value={notes} fallback="Notes" />
              </div>
              <div className="space-y-3 rounded-2xl bg-[#F7FAF8] p-5 text-sm">
                <PreviewTotal label="Subtotal" value={formatMoney(totals.subtotal)} />
                <PreviewTotal label={`VAT (${Number.parseFloat(vatRate) || 0}%)`} value={formatMoney(totals.vatAmount)} />
                <div className="border-t border-[#D0D5DD] pt-3">
                  <PreviewTotal label="Total Paid" value={formatMoney(totals.total)} strong />
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-[#E4E7EC] pt-4 text-center text-xs font-semibold uppercase tracking-[0.16em] text-[#667085]">
              Paid
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

function PreviewTotal({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex justify-between gap-4 ${strong ? "font-poppins text-lg font-bold text-[#0B1020]" : "text-[#667085]"}`}>
      <span>{label}</span>
      <span className={strong ? "text-[#0B5A2A]" : "font-semibold text-[#0B1020]"}>{value}</span>
    </div>
  )
}
