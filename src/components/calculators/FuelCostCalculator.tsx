"use client"

import { useState } from "react"
import { BarChart3, Fuel } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type FuelResult = {
  liters: number
  totalCost: number
  costPerKm: number
  perPerson: number
}

const money = (value: number) =>
  value.toLocaleString(undefined, { maximumFractionDigits: 0 })

export const FuelCostCalculator = () => {
  const [distance, setDistance] = useState("")
  const [consumption, setConsumption] = useState("12")
  const [fuelPrice, setFuelPrice] = useState("")
  const [trips, setTrips] = useState("1")
  const [people, setPeople] = useState("1")
  const [result, setResult] = useState<FuelResult | null>(null)

  const calculate = () => {
    const km = Number.parseFloat(distance)
    const kmPerLiter = Number.parseFloat(consumption)
    const price = Number.parseFloat(fuelPrice)
    const tripCount = Number.parseFloat(trips) || 1
    const personCount = Math.max(1, Number.parseFloat(people) || 1)

    if (!km || !kmPerLiter || !price || km <= 0 || kmPerLiter <= 0 || price <= 0) {
      setResult(null)
      return
    }

    const totalKm = km * tripCount
    const liters = totalKm / kmPerLiter
    const totalCost = liters * price
    const costPerKm = totalCost / totalKm
    const perPerson = totalCost / personCount

    setResult({ liters, totalCost, costPerKm, perPerson })
  }

  return (
    <div className="calculator-split-native grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.85fr)] lg:items-start">
      <Card className="rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
        <CardHeader>
          <CardTitle className="font-poppins text-2xl font-bold tracking-tight text-[#0B1020]">Fuel Cost Calculator</CardTitle>
          <CardDescription className="text-base leading-6 text-[#667085]">
            Estimate petrol or diesel cost for a trip, commute or shared ride.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="distance" label="Distance per Trip (km)" value={distance} setValue={setDistance} placeholder="e.g., 180" />
            <Field id="consumption" label="Fuel Economy (km/l)" value={consumption} setValue={setConsumption} placeholder="e.g., 12" step="0.1" />
            <Field id="fuel-price" label="Fuel Price (KSH/l)" value={fuelPrice} setValue={setFuelPrice} placeholder="e.g., 193" step="0.01" />
            <Field id="trips" label="Number of Trips" value={trips} setValue={setTrips} placeholder="e.g., 2" />
            <div className="space-y-2 sm:col-span-2">
              <Field id="people" label="People Sharing Cost" value={people} setValue={setPeople} placeholder="e.g., 4" />
            </div>
          </div>
          <Button onClick={calculate} className="h-12 w-full rounded-xl bg-[#0B5A2A] font-bold text-white hover:bg-[#063F20]">
            Calculate Fuel Cost
          </Button>
          <div className="rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
            <p className="font-semibold">Trip planning</p>
            <p>Use the latest pump price in your area and your car's real-world fuel economy for a better estimate.</p>
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
                <p className="text-sm font-semibold text-[#667085]">Total Fuel Cost</p>
                <p className="mt-2 font-poppins text-3xl font-bold text-[#0B5A2A]">KSH {money(result.totalCost)}</p>
              </div>
              <div className="space-y-3 text-sm">
                <ResultRow label="Fuel needed" value={`${result.liters.toFixed(1)} litres`} />
                <ResultRow label="Cost per km" value={`KSH ${result.costPerKm.toFixed(2)}`} />
                <ResultRow label="Per person" value={`KSH ${money(result.perPerson)}`} />
              </div>
            </div>
          ) : (
            <EmptyState />
          )}
          <div className="mt-6 rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
            Traffic, load, tyre pressure and driving style can change actual consumption.
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

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
      <span className="text-[#667085]">{label}</span>
      <span className="font-semibold text-[#0B1020]">{value}</span>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="space-y-5">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ECFDF3] text-[#0B5A2A]"><Fuel className="h-8 w-8" /></div>
      <p className="mx-auto max-w-xs text-center text-sm font-semibold leading-6 text-[#344054]">Enter distance, fuel economy and fuel price to estimate trip cost.</p>
    </div>
  )
}
