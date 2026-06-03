"use client"

import { useState } from "react"
import { BarChart3, Droplets } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type WaterResult = {
  waterCharge: number
  sewerCharge: number
  serviceCharge: number
  total: number
  averageRate: number
}

const money = (value: number) =>
  value.toLocaleString(undefined, { maximumFractionDigits: 0 })

export const WaterBillCalculator = () => {
  const [units, setUnits] = useState("")
  const [firstTierRate, setFirstTierRate] = useState("204")
  const [secondTierRate, setSecondTierRate] = useState("253")
  const [serviceCharge, setServiceCharge] = useState("150")
  const [sewerPercent, setSewerPercent] = useState("75")
  const [result, setResult] = useState<WaterResult | null>(null)

  const calculate = () => {
    const consumed = Number.parseFloat(units)
    const tierOne = Number.parseFloat(firstTierRate)
    const tierTwo = Number.parseFloat(secondTierRate)
    const service = Number.parseFloat(serviceCharge) || 0
    const sewerRate = (Number.parseFloat(sewerPercent) || 0) / 100

    if (!consumed || !tierOne || !tierTwo || consumed <= 0 || tierOne < 0 || tierTwo < 0) {
      setResult(null)
      return
    }

    const firstBlockUnits = Math.min(consumed, 6)
    const secondBlockUnits = Math.max(0, consumed - 6)
    const waterCharge = firstBlockUnits * tierOne + secondBlockUnits * tierTwo
    const sewerCharge = waterCharge * sewerRate
    const total = waterCharge + sewerCharge + service
    const averageRate = total / consumed

    setResult({ waterCharge, sewerCharge, serviceCharge: service, total, averageRate })
  }

  return (
    <div className="calculator-split-native grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.85fr)] lg:items-start">
      <Card className="rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
        <CardHeader>
          <CardTitle className="font-poppins text-2xl font-bold tracking-tight text-[#0B1020]">Water Bill Calculator</CardTitle>
          <CardDescription className="text-base leading-6 text-[#667085]">
            Estimate a monthly water bill using consumption, tier rates, sewerage and service charge.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="water-units" label="Consumption (m3)" value={units} setValue={setUnits} placeholder="e.g., 12" step="0.1" />
            <Field id="first-tier-rate" label="First 6 m3 Rate (KSH)" value={firstTierRate} setValue={setFirstTierRate} placeholder="e.g., 204" />
            <Field id="second-tier-rate" label="Extra m3 Rate (KSH)" value={secondTierRate} setValue={setSecondTierRate} placeholder="e.g., 253" />
            <Field id="service-charge" label="Service Charge (KSH)" value={serviceCharge} setValue={setServiceCharge} placeholder="e.g., 150" />
            <div className="space-y-2 sm:col-span-2">
              <Field id="sewer-percent" label="Sewerage Charge (% of water)" value={sewerPercent} setValue={setSewerPercent} placeholder="e.g., 75" />
            </div>
          </div>
          <Button onClick={calculate} className="h-12 w-full rounded-xl bg-[#0B5A2A] font-bold text-white hover:bg-[#063F20]">
            Calculate Water Bill
          </Button>
          <div className="rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
            <p className="font-semibold">Editable tariff assumptions</p>
            <p>Water tariffs vary by provider and customer class, so adjust the rates to match your local bill.</p>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-[20px] border-[#CFEBDD] bg-[radial-gradient(circle_at_50%_18%,rgba(11,90,42,0.06),transparent_42%),#F7FAF8] shadow-[0_14px_36px_rgba(11,90,42,0.06)]">
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="font-poppins text-2xl font-bold tracking-tight text-[#0B1020]">Your Estimate</CardTitle>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ECFDF3] text-[#0B5A2A]"><BarChart3 className="h-5 w-5" /></span>
        </CardHeader>
        <CardContent>
          {result ? (
            <div className="space-y-4">
              <div className="rounded-2xl bg-white p-5 text-center shadow-sm">
                <p className="text-sm font-semibold text-[#667085]">Estimated Bill</p>
                <p className="mt-2 font-poppins text-3xl font-bold text-[#0B5A2A]">KSH {money(result.total)}</p>
              </div>
              <div className="space-y-3 text-sm">
                <ResultRow label="Water charge" value={`KSH ${money(result.waterCharge)}`} />
                <ResultRow label="Sewerage charge" value={`KSH ${money(result.sewerCharge)}`} />
                <ResultRow label="Service charge" value={`KSH ${money(result.serviceCharge)}`} />
                <ResultRow label="Average cost per m3" value={`KSH ${result.averageRate.toFixed(2)}`} strong />
              </div>
            </div>
          ) : (
            <EmptyState />
          )}
          <div className="mt-6 rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
            The final bill may include meter rent, arrears, penalties, taxes or provider-specific adjustments.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function Field({ id, label, value, setValue, placeholder, step }: { id: string; label: string; value: string; setValue: (value: string) => void; placeholder: string; step?: string }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="font-semibold text-[#0B1020]">{label}</Label>
      <Input id={id} type="number" step={step} value={value} onChange={(event) => setValue(event.target.value)} placeholder={placeholder} className="h-12 rounded-xl border-[#E4E7EC] text-base" />
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

function EmptyState() {
  return (
    <div className="space-y-5">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ECFDF3] text-[#0B5A2A]"><Droplets className="h-8 w-8" /></div>
      <p className="mx-auto max-w-xs text-center text-sm font-semibold leading-6 text-[#344054]">Enter water consumption and tariff assumptions to see your bill estimate.</p>
    </div>
  )
}
