"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign } from "lucide-react"

interface CurrentSourcingStepProps {
  formData: {
    currentSourcing: string
    sourcingCost: string
  }
  updateFormData: (data: Partial<typeof formData>) => void
  nextStep: () => void
  prevStep: () => void
}

export function CurrentSourcingStep({ formData, updateFormData, nextStep, prevStep }: CurrentSourcingStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.currentSourcing && formData.sourcingCost) {
      nextStep()
    }
  }

  const sourcingMethods = [
    "Direct from manufacturers",
    "Wholesale suppliers",
    "Brokers/Intermediaries",
    "Online marketplaces",
    "Trade shows/Networking",
    "Government contracts",
    "Other"
  ]

  return (
    <Card className="border-border/50 bg-card/50 p-8 backdrop-blur-sm">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <DollarSign className="h-8 w-8 text-primary" />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-foreground">Current Sourcing</h2>
        <p className="text-muted-foreground">
          Tell us about how you currently source these materials
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="currentSourcing">Current Sourcing Method</Label>
          <Select
            value={formData.currentSourcing}
            onValueChange={(value) => updateFormData({ currentSourcing: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="How do you currently source these materials?" />
            </SelectTrigger>
            <SelectContent>
              {sourcingMethods.map((method) => (
                <SelectItem key={method} value={method}>
                  {method}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sourcingCost">Current Cost per Unit</Label>
          <div className="flex gap-2">
            <span className="flex items-center px-3 text-sm text-muted-foreground border border-r-0 rounded-l-md bg-muted">
              $
            </span>
            <Input
              id="sourcingCost"
              type="number"
              placeholder="0.00"
              value={formData.sourcingCost}
              onChange={(e) => updateFormData({ sourcingCost: e.target.value })}
              className="rounded-l-none"
            />
            <span className="flex items-center px-3 text-sm text-muted-foreground border border-l-0 rounded-r-md bg-muted">
              per ton
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            This helps us understand your budget and find better deals
          </p>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit" disabled={!formData.currentSourcing || !formData.sourcingCost}>
            Continue
          </Button>
        </div>
      </form>
    </Card>
  )
}
