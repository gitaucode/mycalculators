"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { PlusCircle, MinusCircle } from "lucide-react"

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
    setResults(null) // Clear results if people change
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
          ? {
              ...p,
              items: p.items.map((item) => (item.id === itemId ? { ...item, amount } : item)),
            }
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
      const owes = personItemsTotal + sharedPerPerson + shared / people.length // Add shared items to each person's share
      return { name: person.name, owes: Number.parseFloat(owes.toFixed(2)) }
    })

    setResults(calculatedResults)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Bill Splitting Calculator</CardTitle>
          <CardDescription>
            Easily split bills among friends, including individual items and shared expenses.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="total-bill">Total Bill Amount (KSH)</Label>
            <Input
              id="total-bill"
              type="number"
              placeholder="e.g., 5000"
              value={totalBill}
              onChange={(e) => setTotalBill(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="shared-items">Shared Items Total (KSH, e.g., service charge, drinks)</Label>
            <Input
              id="shared-items"
              type="number"
              placeholder="e.g., 500"
              value={sharedItems}
              onChange={(e) => setSharedItems(e.target.value)}
            />
          </div>

          <h3 className="font-semibold text-lg mt-6 mb-2">Individual Items</h3>
          {people.map((person) => (
            <Card key={person.id} className="p-4 space-y-3 border-dashed">
              <div className="flex items-center justify-between">
                <Input
                  type="text"
                  placeholder={`Name for Person ${person.id}`}
                  value={person.name}
                  onChange={(e) => updatePersonName(person.id, e.target.value)}
                  className="font-medium text-base"
                />
                {people.length > 1 && (
                  <Button variant="ghost" size="sm" onClick={() => removePerson(person.id)}>
                    <MinusCircle className="h-4 w-4 text-destructive" />
                  </Button>
                )}
              </div>
              <div className="space-y-2">
                {person.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <Input
                      type="number"
                      placeholder="Item amount"
                      value={item.amount}
                      onChange={(e) => updatePersonItemAmount(person.id, item.id, e.target.value)}
                    />
                    {person.items.length > 1 && (
                      <Button variant="ghost" size="sm" onClick={() => removePersonItem(person.id, item.id)}>
                        <MinusCircle className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => addItemToPerson(person.id)} className="w-full">
                  <PlusCircle className="h-4 w-4 mr-2" /> Add Item
                </Button>
              </div>
            </Card>
          ))}
          <Button onClick={addPerson} className="w-full mt-4">
            <PlusCircle className="h-4 w-4 mr-2" /> Add Another Person
          </Button>

          <Button onClick={calculateSplit} className="w-full mt-6">
            Calculate Split
          </Button>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Bill Split Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.map((personResult, index) => (
                <div key={index} className="flex justify-between">
                  <span>{personResult.name} owes:</span>
                  <span className="font-medium text-success">KSH {personResult.owes.toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Paid:</span>
                  <span>KSH {results.reduce((sum, r) => sum + r.owes, 0).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
