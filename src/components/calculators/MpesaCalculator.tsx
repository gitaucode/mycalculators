"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { BarChart3, CreditCard, TriangleAlert } from "lucide-react"

interface MpesaCharge {
  min: number
  max: number
  sendMoney: number
  withdrawAgent: number | null
  buyGoods: number
}

interface AtmWithdrawalCharge {
  min: number
  max: number
  fee: number
}

const mpesaCharges: MpesaCharge[] = [
  // Safaricom M-PESA customer charges, checked May 2026.
  { min: 1, max: 49, sendMoney: 0, withdrawAgent: null, buyGoods: 0 },
  { min: 50, max: 100, sendMoney: 0, withdrawAgent: 11, buyGoods: 0 },
  { min: 101, max: 500, sendMoney: 7, withdrawAgent: 29, buyGoods: 0 },
  { min: 501, max: 1000, sendMoney: 13, withdrawAgent: 29, buyGoods: 0 },
  { min: 1001, max: 1500, sendMoney: 23, withdrawAgent: 29, buyGoods: 0 },
  { min: 1501, max: 2500, sendMoney: 33, withdrawAgent: 29, buyGoods: 0 },
  { min: 2501, max: 3500, sendMoney: 53, withdrawAgent: 52, buyGoods: 0 },
  { min: 3501, max: 5000, sendMoney: 57, withdrawAgent: 69, buyGoods: 0 },
  { min: 5001, max: 7500, sendMoney: 78, withdrawAgent: 87, buyGoods: 0 },
  { min: 7501, max: 10000, sendMoney: 90, withdrawAgent: 115, buyGoods: 0 },
  { min: 10001, max: 15000, sendMoney: 100, withdrawAgent: 167, buyGoods: 0 },
  { min: 15001, max: 20000, sendMoney: 105, withdrawAgent: 185, buyGoods: 0 },
  { min: 20001, max: 35000, sendMoney: 108, withdrawAgent: 197, buyGoods: 0 },
  { min: 35001, max: 50000, sendMoney: 108, withdrawAgent: 278, buyGoods: 0 },
  { min: 50001, max: 250000, sendMoney: 108, withdrawAgent: 309, buyGoods: 0 },
]

const atmWithdrawalCharges: AtmWithdrawalCharge[] = [
  { min: 200, max: 2500, fee: 35 },
  { min: 2501, max: 5000, fee: 69 },
  { min: 5001, max: 10000, fee: 115 },
  { min: 10001, max: 35000, fee: 203 },
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

    if (transactionType === "withdrawATM" && (numAmount < 200 || numAmount > 35000)) {
      setError("ATM withdrawals must be between KSH 200 and KSH 35,000.")
      return
    }

    if (transactionType !== "withdrawATM" && numAmount > 250000) {
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
        charge = atmWithdrawalCharges.find((item) => numAmount >= item.min && numAmount <= item.max)?.fee ?? 0
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
    <div className="calculator-split-native mx-auto max-w-none">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.85fr)] lg:items-start">
        <div className="space-y-4">
          <Card className="rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
            <CardHeader>
              <CardTitle className="font-poppins text-2xl font-bold tracking-tight text-[#0B1020]">
                Calculate Mpesa Charges
              </CardTitle>
              <CardDescription className="text-base leading-6 text-[#667085]">
                Enter the amount and select transaction type to calculate Mpesa charges
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="amount" className="font-semibold text-[#0B1020]">Amount (KSH)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="h-12 rounded-xl border-[#E4E7EC] text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="transaction-type" className="font-semibold text-[#0B1020]">Transaction Type</Label>
                <Select value={transactionType} onValueChange={setTransactionType}>
                  <SelectTrigger className="h-12 rounded-xl border-[#E4E7EC] text-base">
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

              <Button onClick={calculateCharge} className="h-12 w-full rounded-xl bg-[#0B5A2A] font-bold text-white hover:bg-[#063F20]">
                Calculate Charges
              </Button>

              <div className="rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
                <p className="font-semibold">Checked May 2026 tariffs</p>
                <p>Customer send and agent withdrawal charges follow Safaricom's published M-PESA rates.</p>
              </div>
            </CardContent>
          </Card>

          {error && (
            <Alert variant="destructive" className="rounded-2xl">
              <TriangleAlert className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>

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
                  <p className="text-sm font-semibold text-[#667085]">
                    {transactionType === "sendMoney" ? "Total Cost" : "Amount Received"}
                  </p>
                  <p className="mt-2 font-poppins text-3xl font-bold text-[#0B5A2A]">
                    KSH {(transactionType === "sendMoney" ? result.total : result.net).toLocaleString()}
                  </p>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                    <span className="text-[#667085]">Transaction Type</span>
                    <span className="font-semibold text-[#0B1020]">{getTransactionLabel(transactionType)}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                    <span className="text-[#667085]">Amount</span>
                    <span className="font-semibold text-[#0B1020]">KSH {Number.parseFloat(amount).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#E4E7EC] pb-3">
                    <span className="text-[#667085]">Mpesa Charge</span>
                    <span className="font-semibold text-[#DC2626]">KSH {result.charge.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between pt-1 text-base font-bold">
                    <span>{transactionType === "sendMoney" ? "Total" : "Net"}</span>
                    <span className="text-[#0B5A2A]">
                      KSH {(transactionType === "sendMoney" ? result.total : result.net).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ECFDF3] text-[#0B5A2A]">
                  <CreditCard className="h-8 w-8" />
                </div>
                <p className="mx-auto max-w-xs text-center text-sm font-semibold leading-6 text-[#344054]">
                  Enter your details in the calculator to see your estimate and breakdown.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-[#E4E7EC] pb-3"><span className="text-[#667085]">Input details</span><span className="font-bold text-[#0B1020]">-</span></div>
                  <div className="flex justify-between border-b border-[#E4E7EC] pb-3"><span className="text-[#667085]">Estimated result</span><span className="font-bold text-[#0B1020]">-</span></div>
                  <div className="flex justify-between"><span className="font-bold text-[#0B1020]">Total</span><span className="font-bold text-[#0B1020]">-</span></div>
                </div>
              </div>
            )}

            <div className="mt-6 rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
              These estimates are for planning purposes. Actual values may vary depending on provider updates and service terms.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
