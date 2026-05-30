"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { PlusCircle, MinusCircle, BarChart3, Users } from "lucide-react"

interface Person {
  id: number
  name: string
  items: { id: number; amount: string }[]
}

export const BillSplittingCalculator = () => {
  const [totalBill, setTotalBill] = useState<string>("")
  const [sharedItems, setSharedItems] = useState<string>("")
  const [people, setPeople] = useState<Person[]>([{ id: 1, name: "Person 1", items: [{ id: 1, amount: "" }] }])
  const [results, setResults] = useState<{ name: string; owes: number }[] | null>(null)

  const addPerson = () => {
    setPeople((prev) => [
      ...prev,
      { id: prev.length + 1, name: `Person ${prev.length + 1}`, items: [{ id: 1, amount: "" }] },
    ])
  }

  const removePerson = (id: number) => {
    setPeople((prev) => prev.filter((p) => p.id !== id))
    setResults(null)
  }

  const updatePersonName = (id: number, name: string) => {
    setPeople((prev) => prev.map((p) => (p.id === id ? { ...p, name } : p)))
  }

  const addItemToPerson = (personId: number) => {
    setPeople((prev) =>
      prev.map((p) => (p.id === personId ? { ...p, items: [...p.items, { id: p.items.length + 1, amount: "" }] } : p)),
    )
  }

  const updatePersonItemAmount = (personId: number, itemId: number, amount: string) => {
    setPeople((prev) =>
      prev.map((p) =>
        p.id === personId
          ? { ...p, items: p.items.map((item) => (item.id === itemId ? { ...item, amount } : item)) }
          : p,
      ),
    )
  }

  const removePersonItem = (personId: number, itemId: number) => {
    setPeople((prev) =>
      prev.map((p) => (p.id === personId ? { ...p, items: p.items.filter((item) => item.id !== itemId) } : p)),
    )
  }

  const calculateSplit = () => {
    const total = Number.parseFloat(totalBill) || 0
    const shared = Number.parseFloat(sharedItems) || 0

    let individualItemsTotal = 0
    people.forEach((person) => {
      person.items.forEach((item) => {
        individualItemsTotal += Number.parseFloat(item.amount) || 0
      })
    })

    const remainingBill = total - individualItemsTotal - shared
    const sharedPerPerson = people.length > 0 ? remainingBill / people.length : 0

    const calculatedResults = people.map((person) => {
      let personItemsTotal = 0
      person.items.forEach((item) => {
        personItemsTotal += Number.parseFloat(item.amount) || 0
      })
      const owes = personItemsTotal + sharedPerPerson + shared / people.length
      return { name: person.name, owes: Number.parseFloat(owes.toFixed(2)) }
    })

    setResults(calculatedResults)
  }

  const totalOwed = results?.reduce((sum, r) => sum + r.owes, 0) ?? 0

  return (
    <div className="calculator-split-native grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.85fr)] lg:items-start">
      {/* Left – Inputs */}
      <div className="space-y-4">
        <Card className="rounded-[20px] border-[#E4E7EC] bg-white shadow-[0_14px_36px_rgba(16,24,40,0.05)]">
          <CardHeader>
            <CardTitle className="font-poppins text-2xl font-bold tracking-tight text-[#0B1020]">
              Bill Splitting Calculator
            </CardTitle>
            <CardDescription className="text-base leading-6 text-[#667085]">
              Easily split bills among friends, including individual items and shared expenses.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="total-bill" className="font-semibold text-[#0B1020]">Total Bill Amount (KSH)</Label>
              <Input
                id="total-bill"
                type="number"
                placeholder="e.g., 5,000"
                value={totalBill}
                onChange={(e) => setTotalBill(e.target.value)}
                className="h-12 rounded-xl border-[#E4E7EC] text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shared-items" className="font-semibold text-[#0B1020]">Shared Items Total (KSH)</Label>
              <Input
                id="shared-items"
                type="number"
                placeholder="e.g., 500 (service charge, drinks)"
                value={sharedItems}
                onChange={(e) => setSharedItems(e.target.value)}
                className="h-12 rounded-xl border-[#E4E7EC] text-base"
              />
            </div>

            <div>
              <h3 className="mb-3 font-semibold text-[#0B1020]">Individual Items</h3>
              <div className="space-y-3">
                {people.map((person) => (
                  <div key={person.id} className="rounded-2xl border border-dashed border-[#E4E7EC] p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Input
                        type="text"
                        placeholder={`Name for Person ${person.id}`}
                        value={person.name}
                        onChange={(e) => updatePersonName(person.id, e.target.value)}
                        className="h-10 rounded-xl border-[#E4E7EC] font-semibold"
                      />
                      {people.length > 1 && (
                        <Button variant="ghost" size="sm" onClick={() => removePerson(person.id)} className="shrink-0 text-[#DC2626] hover:text-[#DC2626]">
                          <MinusCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="space-y-2">
                      {person.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-2">
                          <Input
                            type="number"
                            placeholder="Item amount"
                            value={item.amount}
                            onChange={(e) => updatePersonItemAmount(person.id, item.id, e.target.value)}
                            className="h-10 rounded-xl border-[#E4E7EC]"
                          />
                          {person.items.length > 1 && (
                            <Button variant="ghost" size="sm" onClick={() => removePersonItem(person.id, item.id)} className="shrink-0">
                              <MinusCircle className="h-4 w-4 text-[#667085]" />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button variant="outline" size="sm" onClick={() => addItemToPerson(person.id)} className="w-full rounded-xl border-[#E4E7EC] text-[#0B5A2A] hover:bg-[#F0FAF4]">
                        <PlusCircle className="h-4 w-4 mr-2" /> Add Item
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={addPerson} variant="outline" className="h-12 w-full rounded-xl border-[#0B5A2A] text-[#0B5A2A] hover:bg-[#F0FAF4]">
              <PlusCircle className="h-4 w-4 mr-2" /> Add Another Person
            </Button>
            <Button onClick={calculateSplit} className="h-12 w-full rounded-xl bg-[#0B5A2A] font-bold text-white hover:bg-[#063F20]">
              Calculate Split
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Right – Results */}
      <Card className="rounded-[20px] border-[#CFEBDD] bg-[radial-gradient(circle_at_50%_18%,rgba(11,90,42,0.06),transparent_42%),#F7FAF8] shadow-[0_14px_36px_rgba(11,90,42,0.06)]">
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="font-poppins text-2xl font-bold tracking-tight text-[#0B1020]">Your Estimate</CardTitle>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ECFDF3] text-[#0B5A2A]">
            <BarChart3 className="h-5 w-5" />
          </span>
        </CardHeader>
        <CardContent>
          {results ? (
            <div className="space-y-4">
              <div className="rounded-2xl bg-white p-5 text-center shadow-sm">
                <p className="text-sm font-semibold text-[#667085]">Total Paid by All</p>
                <p className="mt-2 font-poppins text-3xl font-bold text-[#0B5A2A]">
                  KSH {totalOwed.toLocaleString()}
                </p>
              </div>
              <div className="space-y-3 text-sm">
                {results.map((personResult, index) => (
                  <div key={index} className={`flex justify-between ${index < results.length - 1 ? "border-b border-[#E4E7EC] pb-3" : "pt-1 text-base font-bold"}`}>
                    <span className={index < results.length - 1 ? "text-[#667085]" : "text-[#0B1020]"}>
                      {personResult.name}
                    </span>
                    <span className={`font-semibold ${index < results.length - 1 ? "text-[#0B5A2A]" : "text-[#0B5A2A]"}`}>
                      KSH {personResult.owes.toLocaleString()}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between border-t border-[#E4E7EC] pt-3 text-base font-bold">
                  <span>Total Paid</span>
                  <span className="text-[#0B5A2A]">KSH {totalOwed.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ECFDF3] text-[#0B5A2A]">
                <Users className="h-8 w-8" />
              </div>
              <p className="mx-auto max-w-xs text-center text-sm font-semibold leading-6 text-[#344054]">
                Enter bill details and click Calculate Split to see who owes what.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3"><span className="text-[#667085]">Per person</span><span className="font-bold text-[#0B1020]">-</span></div>
                <div className="flex justify-between border-b border-[#E4E7EC] pb-3"><span className="text-[#667085]">Individual items</span><span className="font-bold text-[#0B1020]">-</span></div>
                <div className="flex justify-between"><span className="font-bold text-[#0B1020]">Total paid</span><span className="font-bold text-[#0B1020]">-</span></div>
              </div>
            </div>
          )}
          <div className="mt-6 rounded-2xl bg-[#F0FAF4] p-4 text-sm leading-6 text-[#0B5A2A]">
            These estimates are for planning purposes. Amounts shown are per-person shares based on the figures entered.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
