"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { TriangleAlert } from "lucide-react"

interface MpesaCharge {
  min: number
  max: number
  sendMoney: number
  withdrawAgent: number | null
  withdrawATM: number
  buyGoods: number
}

const mpesaCharges: MpesaCharge[] = [
  // M-PESA Send Money Charges (2025) & Withdrawal Charges
  { min: 1, max: 49, sendMoney: 0, withdrawAgent: null, withdrawATM: 0, buyGoods: 0 },
  { min: 50, max: 100, sendMoney: 0, withdrawAgent: 11, withdrawATM: 0, buyGoods: 0 },
  { min: 101, max: 500, sendMoney: 7, withdrawAgent: 29, withdrawATM: 15, buyGoods: 0 },
  { min: 501, max: 1000, sendMoney: 13, withdrawAgent: 29, withdrawATM: 25, buyGoods: 0 },
  { min: 1001, max: 1500, sendMoney: 23, withdrawAgent: 29, withdrawATM: 30, buyGoods: 0 },
  { min: 1501, max: 2500, sendMoney: 33, withdrawAgent: 29, withdrawATM: 35, buyGoods: 0 },
  { min: 2501, max: 3500, sendMoney: 53, withdrawAgent: 52, withdrawATM: 45, buyGoods: 0 },
  { min: 3501, max: 5000, sendMoney: 57, withdrawAgent: 69, withdrawATM: 55, buyGoods: 0 },
  { min: 5001, max: 7500, sendMoney: 78, withdrawAgent: 87, withdrawATM: 65, buyGoods: 0 },
  { min: 7501, max: 10000, sendMoney: 90, withdrawAgent: 115, withdrawATM: 85, buyGoods: 0 },
  { min: 10001, max: 15000, sendMoney: 100, withdrawAgent: 167, withdrawATM: 115, buyGoods: 0 },
  { min: 15001, max: 20000, sendMoney: 105, withdrawAgent: 185, withdrawATM: 140, buyGoods: 0 },
  { min: 20001, max: 35000, sendMoney: 108, withdrawAgent: 197, withdrawATM: 165, buyGoods: 0 },
  { min: 35001, max: 50000, sendMoney: 108, withdrawAgent: 278, withdrawATM: 230, buyGoods: 0 },
  { min: 50001, max: 250000, sendMoney: 108, withdrawAgent: 309, withdrawATM: 270, buyGoods: 0 },
]

export const MpesaCalculator = () => {
  const [amount, setAmount] = useState<string>("")
  const [transactionType, setTransactionType] = useState<string>("sendMoney")
  const [result, setResult] = useState<{ charge: number; total: number; net: number } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const calculateCharge = () => {
    setError(null)
    setResult(null)

    const numAmount = Number.parseFloat(amount)

    if (isNaN(numAmount) || numAmount <= 0) {
      setError("Please enter a valid positive amount.")
      return
    }

    if (numAmount > 250000) {
      setError("Maximum per transaction is KSH 250,000.")
      return
    }

    // Check for withdrawal restrictions
    if (transactionType === "withdrawAgent" && numAmount < 50) {
      setError("Withdrawals below KSH 50 are not permitted.")
      return
    }

    const chargeData = mpesaCharges.find((charge) => numAmount >= charge.min && numAmount <= charge.max)

    if (!chargeData) {
      setError("No charge data found for the entered amount.")
      return
    }

    let charge = 0
    switch (transactionType) {
      case "sendMoney":
        charge = chargeData.sendMoney
        break
      case "withdrawAgent":
        if (chargeData.withdrawAgent === null) {
          setError("Withdrawals not available for this amount range.")
          return
        }
        charge = chargeData.withdrawAgent
        break
      case "withdrawATM":
        charge = chargeData.withdrawATM
        break
      case "buyGoods":
        charge = chargeData.buyGoods
        break
      default:
        charge = chargeData.sendMoney
    }

    const total = numAmount + charge
    const net = numAmount - charge

    setResult({ charge, total, net })
  }

  const getTransactionLabel = (type: string) => {
    switch (type) {
      case "sendMoney":
        return "Send Money"
      case "withdrawAgent":
        return "Withdraw from Agent"
      case "withdrawATM":
        return "Withdraw from ATM"
      case "buyGoods":
        return "Buy Goods & Services"
      default:
        return "Send Money"
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Calculate Mpesa Charges</CardTitle>
          <CardDescription>Enter the amount and select transaction type to calculate Mpesa charges</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (KSH)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="transaction-type">Transaction Type</Label>
            <Select value={transactionType} onValueChange={setTransactionType}>
              <SelectTrigger>
                <SelectValue placeholder="Select transaction type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sendMoney">Send Money</SelectItem>
                <SelectItem value="withdrawAgent">Withdraw from Agent</SelectItem>
                <SelectItem value="withdrawATM">Withdraw from ATM</SelectItem>
                <SelectItem value="buyGoods">Buy Goods & Services</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={calculateCharge} className="w-full">
            Calculate Charges
          </Button>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <TriangleAlert className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Transaction Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Transaction Type:</span>
                <span className="font-medium">{getTransactionLabel(transactionType)}</span>
              </div>
              <div className="flex justify-between">
                <span>Amount:</span>
                <span className="font-medium">KSH {Number.parseFloat(amount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Mpesa Charge:</span>
                <span className="font-medium text-destructive">KSH {result.charge}</span>
              </div>
              <div className="border-t pt-3">
                {transactionType === "sendMoney" ? (
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Cost:</span>
                    <span>KSH {result.total.toLocaleString()}</span>
                  </div>
                ) : (
                  <div className="flex justify-between text-lg font-bold">
                    <span>Amount Received:</span>
                    <span className="text-success">KSH {result.net.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="text-sm text-muted-foreground text-center space-y-1">
        <p>Updated 2025 tariffs. Fees are harmonized across networks.</p>
        <p>Maximum transaction: KSH 250,000 | Daily limit: KSH 500,000</p>
      </div>
    </div>
  )
}
