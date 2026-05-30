"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Car, BarChart3, AlertCircle } from "lucide-react"

interface VehicleData {
  make: string
  model: string
  year: number
  engine_capacity_cc: number
  fuel_type: string
  transmission: string
  vehicle_category: string
}

const vehicleDatabase: VehicleData[] = [
  // Toyota
  { make: "Toyota", model: "Fielder", year: 2016, engine_capacity_cc: 1500, fuel_type: "Petrol", transmission: "Automatic", vehicle_category: "Passenger" },
  { make: "Toyota", model: "Vitz", year: 2017, engine_capacity_cc: 1300, fuel_type: "Petrol", transmission: "Automatic", vehicle_category: "Passenger" },
  { make: "Toyota", model: "Axio", year: 2016, engine_capacity_cc: 1500, fuel_type: "Petrol", transmission: "Automatic", vehicle_category: "Passenger" },
  { make: "Toyota", model: "Probox", year: 2015, engine_capacity_cc: 1300, fuel_type: "Petrol", transmission: "Manual", vehicle_category: "Commercial" },
  { make: "Toyota", model: "Harrier", year: 2017, engine_capacity_cc: 2400, fuel_type: "Petrol", transmission: "Automatic", vehicle_category: "SUV" },
  { make: "Toyota", model: "Noah", year: 2016, engine_capacity_cc: 2000, fuel_type: "Petrol", transmission: "Automatic", vehicle_category: "Passenger" },
  { make: "Toyota", model: "Wish", year: 2015, engine_capacity_cc: 1800, fuel_type: "Petrol", transmission: "Automatic", vehicle_category: "Passenger" },
  { make: "Toyota", model: "Land Cruiser Prado", year: 2016, engine_capacity_cc: 2700, fuel_type: "Petrol", transmission: "Automatic", vehicle_category: "SUV" },
  { make: "Toyota", model: "Succeed", year: 2016, engine_capacity_cc: 1500, fuel_type: "Petrol", transmission: "Manual", vehicle_category: "Commercial" },
  { make: "Toyota", model: "Hilux", year: 2016, engine_capacity_cc: 2400, fuel_type: "Diesel", transmission: "Manual", vehicle_category: "Commercial" },
  // Nissan
  { make: "Nissan", model: "Note", year: 2016, engine_capacity_cc: 1200, fuel_type: "Petrol", transmission: "Automatic", vehicle_category: "Passenger" },
  { make: "Nissan", model: "X-Trail", year: 2016, engine_capacity_cc: 2000, fuel_type: "Petrol", transmission: "Automatic", vehicle_category: "SUV" },
  { make: "Nissan", model: "Sylphy", year: 2016, engine_capacity_cc: 1800, fuel_type: "Petrol", transmission: "Automatic", vehicle_category: "Passenger" },
  { make: "Nissan", model: "Wingroad", year: 2015, engine_capacity_cc: 1500, fuel_type: "Petrol", transmission: "Automatic", vehicle_category: "Passenger" },
  // Mazda
  { make: "Mazda", model: "Demio", year: 2017, engine_capacity_cc: 1300, fuel_type: "Petrol", transmission: "Automatic", vehicle_category: "Passenger" },
  { make: "Mazda", model: "Axela", year: 2016, engine_capacity_cc: 1500, fuel_type: "Petrol", transmission: "Automatic", vehicle_category: "Passenger" },
  { make: "Mazda", model: "CX-5", year: 2017, engine_capacity_cc: 2200, fuel_type: "Diesel", transmission: "Automatic", vehicle_category: "SUV" },
  // Honda
  { make: "Honda", model: "Fit", year: 2016, engine_capacity_cc: 1300, fuel_type: "Petrol", transmission: "Automatic", vehicle_category: "Passenger" },
  { make: "Honda", model: "Vezel", year: 2016, engine_capacity_cc: 1500, fuel_type: "Petrol", transmission: "Automatic", vehicle_category: "SUV" },
  { make: "Honda", model: "Grace", year: 2016, engine_capacity_cc: 1500, fuel_type: "Petrol", transmission: "Automatic", vehicle_category: "Passenger" },
  // Subaru
  { make: "Subaru", model: "Forester", year: 2016, engine_capacity_cc: 2000, fuel_type: "Petrol", transmission: "Automatic", vehicle_category: "SUV" },
  { make: "Subaru", model: "Legacy", year: 2016, engine_capacity_cc: 2500, fuel_type: "Petrol", transmission: "Automatic", vehicle_category: "Passenger" },
  // Mitsubishi
  { make: "Mitsubishi", model: "Outlander", year: 2016, engine_capacity_cc: 2000, fuel_type: "Petrol", transmission: "Automatic", vehicle_category: "SUV" },
  // Suzuki
  { make: "Suzuki", model: "Alto", year: 2018, engine_capacity_cc: 1000, fuel_type: "Petrol", transmission: "Automatic", vehicle_category: "Passenger" },
  { make: "Suzuki", model: "Swift", year: 2016, engine_capacity_cc: 1300, fuel_type: "Petrol", transmission: "Automatic", vehicle_category: "Passenger" },
  // VW
  { make: "VW", model: "Golf", year: 2016, engine_capacity_cc: 1400, fuel_type: "Petrol", transmission: "Automatic", vehicle_category: "Passenger" },
  { make: "VW", model: "Passat", year: 2016, engine_capacity_cc: 1800, fuel_type: "Petrol", transmission: "Automatic", vehicle_category: "Passenger" },
  // BMW
  { make: "BMW", model: "X3", year: 2016, engine_capacity_cc: 2000, fuel_type: "Petrol", transmission: "Automatic", vehicle_category: "SUV" },
  // Mercedes-Benz
  { make: "Mercedes-Benz", model: "C200", year: 2016, engine_capacity_cc: 2000, fuel_type: "Petrol", transmission: "Automatic", vehicle_category: "Passenger" },
  // Isuzu
  { make: "Isuzu", model: "D-Max", year: 2016, engine_capacity_cc: 2500, fuel_type: "Diesel", transmission: "Manual", vehicle_category: "Commercial" },
]

const makes = ["Toyota", "Nissan", "Mazda", "Honda", "Subaru", "Mitsubishi", "Suzuki", "VW", "BMW", "Mercedes-Benz", "Isuzu", "Other"]
const years = [2015, 2016, 2017, 2018, 2019, 2020]
const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"]
const transmissions = ["Automatic", "Manual"]
const categories = ["Passenger", "SUV", "Commercial", "Motorcycle"]

export const CarImportTaxCalculator = () => {
  const [selectedMake, setSelectedMake] = useState("")
  const [customMake, setCustomMake] = useState("")
  const [selectedModel, setSelectedModel] = useState("")
  const [customModel, setCustomModel] = useState("")
  const [selectedYear, setSelectedYear] = useState("")
  const [cifValue, setCifValue] = useState("")
  const [engineCapacity, setEngineCapacity] = useState("")
  const [fuelType, setFuelType] = useState("")
  const [transmission, setTransmission] = useState("")
  const [vehicleCategory, setVehicleCategory] = useState("")
  const [availableModels, setAvailableModels] = useState<string[]>([])
  const [showManualEntry, setShowManualEntry] = useState(false)

  useEffect(() => {
    if (selectedMake && selectedMake !== "Other") {
      const models = vehicleDatabase.filter((v) => v.make === selectedMake).map((v) => v.model)
      setAvailableModels([...new Set(models), "Other"])
    } else {
      setAvailableModels([])
    }
    setSelectedModel("")
  }, [selectedMake])

  useEffect(() => {
    if (selectedMake && selectedModel && selectedYear && selectedMake !== "Other" && selectedModel !== "Other") {
      const vehicleData = vehicleDatabase.find(
        (v) => v.make === selectedMake && v.model === selectedModel && v.year === Number.parseInt(selectedYear)
      )
      if (vehicleData) {
        setEngineCapacity(vehicleData.engine_capacity_cc.toString())
        setFuelType(vehicleData.fuel_type)
        setTransmission(vehicleData.transmission)
        setVehicleCategory(vehicleData.vehicle_category)
        setShowManualEntry(false)
      } else {
        setShowManualEntry(true)
      }
    } else if (selectedMake === "Other" || selectedModel === "Other") {
      setShowManualEntry(true)
    }
  }, [selectedMake, selectedModel, selectedYear])

  const getExciseRate = (fuel: string, engine: number) => {
    if (fuel === "Electric") return 0.1
    if (fuel === "Hybrid") return 0.25
    if (fuel === "Petrol") {
      if (engine <= 1000) return 0.1
      if (engine <= 1500) return 0.2
      if (engine <= 3000) return 0.25
      return 0.35
    }
    if (fuel === "Diesel") return engine <= 2500 ? 0.25 : 0.35
    return 0.25
  }

  const calculateTaxes = () => {
    const cif = Number.parseFloat(cifValue)
    const engine = Number.parseFloat(engineCapacity)
    if (!cif || !engine) return null

    const importDuty = cif * 0.25
    const exciseRate = getExciseRate(fuelType, engine)
    const exciseDuty = (cif + importDuty) * exciseRate
    const vat = (cif + importDuty + exciseDuty) * 0.16
    const idfFee = Math.max(cif * 0.035, 5000)
    const rdl = cif * 0.02
    const totalTax = importDuty + exciseDuty + vat + idfFee + rdl
    const landedCost = cif + totalTax

    return { importDuty, exciseDuty, vat, idfFee, rdl, totalTax, landedCost, exciseRate }
  }

  const taxes = calculateTaxes()
  const currentMake = selectedMake === "Other" ? customMake : selectedMake
  const currentModel = selectedModel === "Other" ? customModel : selectedModel
  const hasFullResult = taxes && currentMake && currentModel && selectedYear && engineCapacity && fuelType && transmission && vehicleCategory

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.85fr)] lg:items-start">
      {/* Left – Vehicle selection + CIF input + notes */}
      <div className="space-y-4">
        <Card className="rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
          <CardHeader>
            <CardTitle className="font-poppins text-2xl font-bold tracking-tight text-[#0B1020] flex items-center gap-2">
              <Car className="h-6 w-6 text-[#0B5A2A]" />
              Car Import Tax Calculator
            </CardTitle>
            <CardDescription className="text-base leading-6 text-[#667085]">
              Calculate import duties and taxes for vehicles imported to Kenya (KRA rates).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Vehicle Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="font-semibold text-[#0B1020]">Make</Label>
                <Select value={selectedMake} onValueChange={setSelectedMake}>
                  <SelectTrigger className="h-12 rounded-xl border-[#E4E7EC] text-base"><SelectValue placeholder="Select make" /></SelectTrigger>
                  <SelectContent>{makes.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="font-semibold text-[#0B1020]">Model</Label>
                <Select value={selectedModel} onValueChange={setSelectedModel} disabled={!selectedMake}>
                  <SelectTrigger className="h-12 rounded-xl border-[#E4E7EC] text-base"><SelectValue placeholder="Select model" /></SelectTrigger>
                  <SelectContent>{availableModels.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="font-semibold text-[#0B1020]">Year of Manufacture</Label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="h-12 rounded-xl border-[#E4E7EC] text-base"><SelectValue placeholder="Select year" /></SelectTrigger>
                  <SelectContent>{years.map((y) => <SelectItem key={y} value={y.toString()}>{y}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>

            {/* Custom make/model */}
            {(selectedMake === "Other" || selectedModel === "Other") && (
              <div className="grid grid-cols-2 gap-4">
                {selectedMake === "Other" && (
                  <div className="space-y-2">
                    <Label className="font-semibold text-[#0B1020]">Custom Make</Label>
                    <Input value={customMake} onChange={(e) => setCustomMake(e.target.value)} placeholder="Enter make" className="h-12 rounded-xl border-[#E4E7EC] text-base" />
                  </div>
                )}
                {selectedModel === "Other" && (
                  <div className="space-y-2">
                    <Label className="font-semibold text-[#0B1020]">Custom Model</Label>
                    <Input value={customModel} onChange={(e) => setCustomModel(e.target.value)} placeholder="Enter model" className="h-12 rounded-xl border-[#E4E7EC] text-base" />
                  </div>
                )}
              </div>
            )}

            {/* Manual entry fields when vehicle not in DB */}
            {showManualEntry && (
              <div className="rounded-2xl border border-dashed border-[#E4E7EC] p-4 space-y-4">
                <p className="text-sm font-semibold text-[#667085]">Vehicle details not found — enter manually:</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-semibold text-[#0B1020] text-sm">Engine Capacity (cc)</Label>
                    <Input type="number" value={engineCapacity} onChange={(e) => setEngineCapacity(e.target.value)} placeholder="e.g. 1500" className="h-11 rounded-xl border-[#E4E7EC]" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-semibold text-[#0B1020] text-sm">Fuel Type</Label>
                    <Select value={fuelType} onValueChange={setFuelType}>
                      <SelectTrigger className="h-11 rounded-xl border-[#E4E7EC]"><SelectValue placeholder="Select fuel type" /></SelectTrigger>
                      <SelectContent>{fuelTypes.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-semibold text-[#0B1020] text-sm">Transmission</Label>
                    <Select value={transmission} onValueChange={setTransmission}>
                      <SelectTrigger className="h-11 rounded-xl border-[#E4E7EC]"><SelectValue placeholder="Select transmission" /></SelectTrigger>
                      <SelectContent>{transmissions.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-semibold text-[#0B1020] text-sm">Vehicle Category</Label>
                    <Select value={vehicleCategory} onValueChange={setVehicleCategory}>
                      <SelectTrigger className="h-11 rounded-xl border-[#E4E7EC]"><SelectValue placeholder="Select category" /></SelectTrigger>
                      <SelectContent>{categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Auto-populated vehicle details badge */}
            {!showManualEntry && engineCapacity && fuelType && (
              <div className="rounded-2xl bg-[#EFF6FF] p-4 text-sm text-[#2563EB] space-y-1">
                <p className="font-semibold">Vehicle details auto-populated:</p>
                <p>{engineCapacity}cc · {fuelType} · {transmission} · {vehicleCategory}</p>
              </div>
            )}

            {/* CIF Value */}
            <div className="space-y-2">
              <Label htmlFor="cifValue" className="font-semibold text-[#0B1020]">CIF Value (KSH)</Label>
              <Input
                id="cifValue"
                type="number"
                value={cifValue}
                onChange={(e) => setCifValue(e.target.value)}
                placeholder="e.g. 950,000"
                className="h-12 rounded-xl border-[#E4E7EC] text-base"
              />
              <p className="text-xs text-[#667085]">CIF = Cost + Insurance + Freight value declared to KRA</p>
            </div>

            <div className="rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
              <p className="font-semibold">Live calculation</p>
              <p>Taxes update automatically as you fill in the CIF value. No button needed.</p>
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        <div className="rounded-2xl border border-[#E4E7EC] bg-white p-5 text-sm leading-6 text-[#667085] shadow-[0_10px_30px_rgba(16,24,40,0.04)] space-y-1">
          <div className="flex items-center gap-2 font-semibold text-[#0B1020] mb-2"><AlertCircle className="h-4 w-4 text-[#CA8A04]" /> Important Notes</div>
          <p>• Tax rates were checked against KRA guidance in May 2026.</p>
          <p>• Excise rate is based on fuel type and engine size.</p>
          <p>• Actual taxes may vary if KRA revalues the vehicle or exchange rates change.</p>
          <p>• Vehicles older than 8 years are not eligible for import.</p>
        </div>
      </div>

      {/* Right – Live results */}
      <Card className="rounded-[20px] border-[#CFEBDD] bg-[radial-gradient(circle_at_50%_18%,rgba(11,90,42,0.06),transparent_42%),#F7FAF8] shadow-[0_14px_36px_rgba(11,90,42,0.06)]">
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="font-poppins text-2xl font-bold tracking-tight text-[#0B1020]">Your Estimate</CardTitle>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ECFDF3] text-[#0B5A2A]">
            <BarChart3 className="h-5 w-5" />
          </span>
        </CardHeader>
        <CardContent>
          {hasFullResult ? (
            <div className="space-y-4">
              {/* Vehicle summary */}
              <div className="rounded-2xl bg-[#EFF6FF] p-4 text-sm text-[#2563EB] space-y-1">
                <p className="font-semibold">{currentMake} {currentModel} ({selectedYear})</p>
                <p>{engineCapacity}cc · {fuelType} · {transmission}</p>
              </div>

              <div className="rounded-2xl bg-white p-5 text-center shadow-sm">
                <p className="text-sm font-semibold text-[#667085]">Estimated Landed Cost</p>
                <p className="mt-2 font-poppins text-3xl font-bold text-[#0B5A2A]">
                  KSH {taxes.landedCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">CIF Value</span>
                  <span className="font-semibold text-[#0B1020]">KSH {Number.parseFloat(cifValue).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Import Duty (25%)</span>
                  <span className="font-semibold text-[#DC2626]">KSH {taxes.importDuty.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Excise Duty ({(taxes.exciseRate * 100).toFixed(0)}%)</span>
                  <span className="font-semibold text-[#DC2626]">KSH {taxes.exciseDuty.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">VAT (16%)</span>
                  <span className="font-semibold text-[#DC2626]">KSH {taxes.vat.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">IDF Fee (3.5%)</span>
                  <span className="font-semibold text-[#DC2626]">KSH {taxes.idfFee.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085]">Railway Dev. Levy (2%)</span>
                  <span className="font-semibold text-[#DC2626]">KSH {taxes.rdl.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                  <span className="text-[#667085] font-semibold">Total Taxes</span>
                  <span className="font-bold text-[#DC2626]">KSH {taxes.totalTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between pt-1 text-base font-bold">
                  <span>Landed Cost</span>
                  <span className="text-[#0B5A2A]">KSH {taxes.landedCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ECFDF3] text-[#0B5A2A]">
                <Car className="h-8 w-8" />
              </div>
              <p className="mx-auto max-w-xs text-center text-sm font-semibold leading-6 text-[#344054]">
                Select a vehicle and enter the CIF value to calculate Kenya import taxes.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3"><span className="text-[#667085]">CIF Value</span><span className="font-bold text-[#0B1020]">-</span></div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3"><span className="text-[#667085]">Total taxes</span><span className="font-bold text-[#0B1020]">-</span></div>
                <div className="flex justify-between"><span className="font-bold text-[#0B1020]">Landed cost</span><span className="font-bold text-[#0B1020]">-</span></div>
              </div>
            </div>
          )}
          <div className="mt-6 rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
            These estimates are for planning purposes. Actual taxes depend on KRA valuation and may vary.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
