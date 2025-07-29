"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const VatCalculator = () => {
  const [amount, setAmount] = useState<string>("")
  const [vatRate, setVatRate] = useState<string>("16") // Default to 16% VAT in Kenya
  const [calculationType, setCalculationType] = useState<string>("add") // 'add' or 'remove'
  const [result, setResult] = useState<{
    vatAmount: number
    totalAmount: number
    netAmount: number
  } | null>(null)

  const calculateVat = () => {
    const numAmount = Number.parseFloat(amount) || 0
    const rate = Number.parseFloat(vatRate) / 100

    if (numAmount <= 0 || rate <= 0) {
      setResult(null)
      return
    }

    let vatAmount = 0
    let totalAmount = 0
    let netAmount = 0

    if (calculationType === "add") {
      // Add VAT to Net Amount
      vatAmount = numAmount * rate
      totalAmount = numAmount + vatAmount
      netAmount = numAmount
    } else {
      // Remove VAT from Gross Amount
      totalAmount = numAmount
      netAmount = numAmount / (1 + rate)
      vatAmount = numAmount - netAmount
    }

    setResult({
      vatAmount: Number.parseFloat(vatAmount.toFixed(2)),
      totalAmount: Number.parseFloat(totalAmount.toFixed(2)),
      netAmount: Number.parseFloat(netAmount.toFixed(2)),
    })
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>VAT Calculator</CardTitle>
          <CardDescription>Calculate VAT amounts for prices (VAT inclusive/exclusive).</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (KSH)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="e.g., 1000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vat-rate">VAT Rate (%)</Label>
            <Input
              id="vat-rate"
              type="number"
              placeholder="e.g., 16"
              value={vatRate}
              onChange={(e) => setVatRate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="calculation-type">Calculation Type</Label>
            <Select value={calculationType} onValueChange={setCalculationType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="add">Add VAT (Amount is Net)</SelectItem>
                <SelectItem value="remove">Remove VAT (Amount is Gross)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={calculateVat} className="w-full">
            Calculate VAT
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>VAT Calculation Result</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>VAT Rate:</span>
                <span className="font-medium">{Number.parseFloat(vatRate).toLocaleString()}%</span>
              </div>
              <div className="flex justify-between">
                <span>Net Amount:</span>
                <span className="font-medium">KSH {result.netAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>VAT Amount:</span>
                <span className="font-medium text-destructive">KSH {result.vatAmount.toLocaleString()}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Gross Amount (Total):</span>
                  <span className="text-success">KSH {result.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
