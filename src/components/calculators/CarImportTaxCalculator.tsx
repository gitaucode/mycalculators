"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Car, Calculator, AlertCircle } from "lucide-react"

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
  {
    make: "Toyota",
    model: "Fielder",
    year: 2016,
    engine_capacity_cc: 1500,
    fuel_type: "Petrol",
    transmission: "Automatic",
    vehicle_category: "Passenger",
  },
  {
    make: "Toyota",
    model: "Vitz",
    year: 2017,
    engine_capacity_cc: 1300,
    fuel_type: "Petrol",
    transmission: "Automatic",
    vehicle_category: "Passenger",
  },
  {
    make: "Toyota",
    model: "Axio",
    year: 2016,
    engine_capacity_cc: 1500,
    fuel_type: "Petrol",
    transmission: "Automatic",
    vehicle_category: "Passenger",
  },
  {
    make: "Toyota",
    model: "Probox",
    year: 2015,
    engine_capacity_cc: 1300,
    fuel_type: "Petrol",
    transmission: "Manual",
    vehicle_category: "Commercial",
  },
  {
    make: "Toyota",
    model: "Harrier",
    year: 2017,
    engine_capacity_cc: 2400,
    fuel_type: "Petrol",
    transmission: "Automatic",
    vehicle_category: "SUV",
  },
  {
    make: "Toyota",
    model: "Noah",
    year: 2016,
    engine_capacity_cc: 2000,
    fuel_type: "Petrol",
    transmission: "Automatic",
    vehicle_category: "Passenger",
  },
  {
    make: "Toyota",
    model: "Wish",
    year: 2015,
    engine_capacity_cc: 1800,
    fuel_type: "Petrol",
    transmission: "Automatic",
    vehicle_category: "Passenger",
  },
  {
    make: "Toyota",
    model: "Land Cruiser Prado",
    year: 2016,
    engine_capacity_cc: 2700,
    fuel_type: "Petrol",
    transmission: "Automatic",
    vehicle_category: "SUV",
  },
  {
    make: "Toyota",
    model: "Succeed",
    year: 2016,
    engine_capacity_cc: 1500,
    fuel_type: "Petrol",
    transmission: "Manual",
    vehicle_category: "Commercial",
  },
  {
    make: "Toyota",
    model: "Hilux",
    year: 2016,
    engine_capacity_cc: 2400,
    fuel_type: "Diesel",
    transmission: "Manual",
    vehicle_category: "Commercial",
  },

  // Nissan
  {
    make: "Nissan",
    model: "Note",
    year: 2016,
    engine_capacity_cc: 1200,
    fuel_type: "Petrol",
    transmission: "Automatic",
    vehicle_category: "Passenger",
  },
  {
    make: "Nissan",
    model: "X-Trail",
    year: 2016,
    engine_capacity_cc: 2000,
    fuel_type: "Petrol",
    transmission: "Automatic",
    vehicle_category: "SUV",
  },
  {
    make: "Nissan",
    model: "Sylphy",
    year: 2016,
    engine_capacity_cc: 1800,
    fuel_type: "Petrol",
    transmission: "Automatic",
    vehicle_category: "Passenger",
  },
  {
    make: "Nissan",
    model: "Wingroad",
    year: 2015,
    engine_capacity_cc: 1500,
    fuel_type: "Petrol",
    transmission: "Automatic",
    vehicle_category: "Passenger",
  },

  // Mazda
  {
    make: "Mazda",
    model: "Demio",
    year: 2017,
    engine_capacity_cc: 1300,
    fuel_type: "Petrol",
    transmission: "Automatic",
    vehicle_category: "Passenger",
  },
  {
    make: "Mazda",
    model: "Axela",
    year: 2016,
    engine_capacity_cc: 1500,
    fuel_type: "Petrol",
    transmission: "Automatic",
    vehicle_category: "Passenger",
  },
  {
    make: "Mazda",
    model: "CX-5",
    year: 2017,
    engine_capacity_cc: 2200,
    fuel_type: "Diesel",
    transmission: "Automatic",
    vehicle_category: "SUV",
  },

  // Honda
  {
    make: "Honda",
    model: "Fit",
    year: 2016,
    engine_capacity_cc: 1300,
    fuel_type: "Petrol",
    transmission: "Automatic",
    vehicle_category: "Passenger",
  },
  {
    make: "Honda",
    model: "Vezel",
    year: 2016,
    engine_capacity_cc: 1500,
    fuel_type: "Petrol",
    transmission: "Automatic",
    vehicle_category: "SUV",
  },
  {
    make: "Honda",
    model: "Grace",
    year: 2016,
    engine_capacity_cc: 1500,
    fuel_type: "Petrol",
    transmission: "Automatic",
    vehicle_category: "Passenger",
  },

  // Subaru
  {
    make: "Subaru",
    model: "Forester",
    year: 2016,
    engine_capacity_cc: 2000,
    fuel_type: "Petrol",
    transmission: "Automatic",
    vehicle_category: "SUV",
  },
  {
    make: "Subaru",
    model: "Legacy",
    year: 2016,
    engine_capacity_cc: 2500,
    fuel_type: "Petrol",
    transmission: "Automatic",
    vehicle_category: "Passenger",
  },

  // Mitsubishi
  {
    make: "Mitsubishi",
    model: "Outlander",
    year: 2016,
    engine_capacity_cc: 2000,
    fuel_type: "Petrol",
    transmission: "Automatic",
    vehicle_category: "SUV",
  },

  // Suzuki
  {
    make: "Suzuki",
    model: "Alto",
    year: 2018,
    engine_capacity_cc: 1000,
    fuel_type: "Petrol",
    transmission: "Automatic",
    vehicle_category: "Passenger",
  },
  {
    make: "Suzuki",
    model: "Swift",
    year: 2016,
    engine_capacity_cc: 1300,
    fuel_type: "Petrol",
    transmission: "Automatic",
    vehicle_category: "Passenger",
  },

  // VW
  {
    make: "VW",
    model: "Golf",
    year: 2016,
    engine_capacity_cc: 1400,
    fuel_type: "Petrol",
    transmission: "Automatic",
    vehicle_category: "Passenger",
  },
  {
    make: "VW",
    model: "Passat",
    year: 2016,
    engine_capacity_cc: 1800,
    fuel_type: "Petrol",
    transmission: "Automatic",
    vehicle_category: "Passenger",
  },

  // BMW
  {
    make: "BMW",
    model: "X3",
    year: 2016,
    engine_capacity_cc: 2000,
    fuel_type: "Petrol",
    transmission: "Automatic",
    vehicle_category: "SUV",
  },

  // Mercedes-Benz
  {
    make: "Mercedes-Benz",
    model: "C200",
    year: 2016,
    engine_capacity_cc: 2000,
    fuel_type: "Petrol",
    transmission: "Automatic",
    vehicle_category: "Passenger",
  },

  // Isuzu
  {
    make: "Isuzu",
    model: "D-Max",
    year: 2016,
    engine_capacity_cc: 2500,
    fuel_type: "Diesel",
    transmission: "Manual",
    vehicle_category: "Commercial",
  },
]

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

  const makes = [
    "Toyota",
    "Nissan",
    "Mazda",
    "Honda",
    "Subaru",
    "Mitsubishi",
    "Suzuki",
    "VW",
    "BMW",
    "Mercedes-Benz",
    "Isuzu",
    "Other",
  ]
  const years = [2015, 2016, 2017, 2018, 2019, 2020]
  const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"]
  const transmissions = ["Automatic", "Manual"]
  const categories = ["Passenger", "SUV", "Commercial", "Motorcycle"]

  useEffect(() => {
    if (selectedMake && selectedMake !== "Other") {
      const models = vehicleDatabase.filter((vehicle) => vehicle.make === selectedMake).map((vehicle) => vehicle.model)
      const uniqueModels = [...new Set(models)]
      setAvailableModels([...uniqueModels, "Other"])
    } else {
      setAvailableModels([])
    }
    setSelectedModel("")
  }, [selectedMake])

  useEffect(() => {
    if (selectedMake && selectedModel && selectedYear && selectedMake !== "Other" && selectedModel !== "Other") {
      const vehicleData = vehicleDatabase.find(
        (vehicle) =>
          vehicle.make === selectedMake &&
          vehicle.model === selectedModel &&
          vehicle.year === Number.parseInt(selectedYear),
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

  const calculateTaxes = () => {
    const cif = Number.parseFloat(cifValue)
    const engine = Number.parseFloat(engineCapacity)

    if (!cif || !engine) return null

    // Import Duty: 25% of CIF
    const importDuty = cif * 0.25

    // Excise Duty
    let exciseDuty = 0
    if (fuelType === "Electric") {
      exciseDuty = (cif + importDuty) * 0.1
    } else if (engine <= 1500) {
      exciseDuty = (cif + importDuty) * 0.2
    } else {
      exciseDuty = (cif + importDuty) * 0.35
    }

    // VAT: 16% of (CIF + Import Duty + Excise Duty)
    const vat = (cif + importDuty + exciseDuty) * 0.16

    // IDF Fee: 2.25% of CIF (minimum 5000)
    const idfFee = Math.max(cif * 0.0225, 5000)

    // Railway Development Levy: 1.5% of CIF
    const rdl = cif * 0.015

    const totalTax = importDuty + exciseDuty + vat + idfFee + rdl
    const landedCost = cif + totalTax

    return {
      importDuty,
      exciseDuty,
      vat,
      idfFee,
      rdl,
      totalTax,
      landedCost,
    }
  }

  const taxes = calculateTaxes()
  const currentMake = selectedMake === "Other" ? customMake : selectedMake
  const currentModel = selectedModel === "Other" ? customModel : selectedModel

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Car className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold">Car Import Tax Calculator</CardTitle>
              <CardDescription>Calculate import taxes and duties for vehicles imported to Kenya</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Vehicle Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="make">Make</Label>
              <Select value={selectedMake} onValueChange={setSelectedMake}>
                <SelectTrigger>
                  <SelectValue placeholder="Select make" />
                </SelectTrigger>
                <SelectContent>
                  {makes.map((make) => (
                    <SelectItem key={make} value={make}>
                      {make}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedMake === "Other" && (
              <div className="space-y-2">
                <Label htmlFor="customMake">Custom Make</Label>
                <Input
                  id="customMake"
                  value={customMake}
                  onChange={(e) => setCustomMake(e.target.value)}
                  placeholder="Enter make"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Select value={selectedModel} onValueChange={setSelectedModel} disabled={!selectedMake}>
                <SelectTrigger>
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  {availableModels.map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedModel === "Other" && (
              <div className="space-y-2">
                <Label htmlFor="customModel">Custom Model</Label>
                <Input
                  id="customModel"
                  value={customModel}
                  onChange={(e) => setCustomModel(e.target.value)}
                  placeholder="Enter model"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="year">Year of Manufacture</Label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Manual Entry Fields */}
          {showManualEntry && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="space-y-2">
                <Label htmlFor="engineCapacity">Engine Capacity (cc)</Label>
                <Input
                  id="engineCapacity"
                  type="number"
                  value={engineCapacity}
                  onChange={(e) => setEngineCapacity(e.target.value)}
                  placeholder="e.g. 1500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fuelType">Fuel Type</Label>
                <Select value={fuelType} onValueChange={setFuelType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    {fuelTypes.map((fuel) => (
                      <SelectItem key={fuel} value={fuel}>
                        {fuel}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="transmission">Transmission</Label>
                <Select value={transmission} onValueChange={setTransmission}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select transmission" />
                  </SelectTrigger>
                  <SelectContent>
                    {transmissions.map((trans) => (
                      <SelectItem key={trans} value={trans}>
                        {trans}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Vehicle Category</Label>
                <Select value={vehicleCategory} onValueChange={setVehicleCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* CIF Value */}
          <div className="space-y-2">
            <Label htmlFor="cifValue">CIF Value (KSH)</Label>
            <Input
              id="cifValue"
              type="number"
              value={cifValue}
              onChange={(e) => setCifValue(e.target.value)}
              placeholder="e.g. 950000"
              className="text-lg"
            />
            <p className="text-sm text-muted-foreground">CIF = Cost + Insurance + Freight value declared</p>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {taxes &&
        currentMake &&
        currentModel &&
        selectedYear &&
        engineCapacity &&
        fuelType &&
        transmission &&
        vehicleCategory && (
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Calculator className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold">Tax Calculation Results</CardTitle>
                  <CardDescription>Estimated import taxes and duties</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Vehicle Details */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-3">Vehicle Selected:</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                  <div>
                    <span className="font-medium">Make:</span> {currentMake}
                  </div>
                  <div>
                    <span className="font-medium">Model:</span> {currentModel}
                  </div>
                  <div>
                    <span className="font-medium">Year:</span> {selectedYear}
                  </div>
                  <div>
                    <span className="font-medium">Engine:</span> {engineCapacity} cc
                  </div>
                  <div>
                    <span className="font-medium">Fuel:</span> {fuelType}
                  </div>
                  <div>
                    <span className="font-medium">Transmission:</span> {transmission}
                  </div>
                </div>
              </div>

              <Separator />

              {/* CIF Value */}
              <div className="flex justify-between items-center text-lg">
                <span className="font-medium">CIF Value:</span>
                <span className="font-bold">KSH {Number.parseFloat(cifValue).toLocaleString()}</span>
              </div>

              <Separator />

              {/* Tax Breakdown */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Taxes Breakdown:</h3>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Import Duty (25%):</span>
                    <span className="font-medium">KSH {taxes.importDuty.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>
                      Excise Duty ({fuelType === "Electric" ? "10%" : engineCapacity <= 1500 ? "20%" : "35%"}):
                    </span>
                    <span className="font-medium">KSH {taxes.exciseDuty.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>VAT (16%):</span>
                    <span className="font-medium">KSH {taxes.vat.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>IDF Fee (2.25%):</span>
                    <span className="font-medium">KSH {taxes.idfFee.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Railway Development Levy (1.5%):</span>
                    <span className="font-medium">KSH {taxes.rdl.toLocaleString()}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between items-center text-lg font-semibold bg-yellow-50 p-3 rounded-lg">
                  <span>Total Estimated Taxes:</span>
                  <span className="text-yellow-700">KSH {taxes.totalTax.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center text-xl font-bold bg-green-50 p-4 rounded-lg">
                  <span>Estimated Landed Cost:</span>
                  <span className="text-green-700">KSH {taxes.landedCost.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

      {/* Notes */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            <CardTitle className="text-lg">Important Notes</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• All tax rates follow Kenya Revenue Authority (KRA) rules as of 2025.</li>
            <li>• Excise rate is based on fuel type and engine size.</li>
            <li>• CIF = Cost + Insurance + Freight value declared.</li>
            <li>• Actual taxes may vary if KRA revalues the vehicle or exchange rate changes.</li>
            <li>• Vehicles older than 8 years are not eligible for import.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
