"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, ArrowLeft, Plus, X } from "lucide-react"

interface ChemicalCompositionStepProps {
  formData: any
  updateFormData: (data: any) => void
  nextStep: () => void
  prevStep: () => void
}

export function ChemicalCompositionStep({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}: ChemicalCompositionStepProps) {
  const addChemical = () => {
    updateFormData({
      chemicalComposition: [...formData.chemicalComposition, { chemical: "", percentage: "" }],
    })
  }

  const removeChemical = (index: number) => {
    const updated = formData.chemicalComposition.filter((_: any, i: number) => i !== index)
    updateFormData({ chemicalComposition: updated })
  }

  const updateChemical = (index: number, field: string, value: string) => {
    const updated = [...formData.chemicalComposition]
    updated[index] = { ...updated[index], [field]: value }
    updateFormData({ chemicalComposition: updated })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    nextStep()
  }

  return (
    <Card className="border-border/50 bg-card/50 p-8 backdrop-blur-sm">
      <h2 className="mb-6 text-2xl font-bold text-foreground">Chemical Composition</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <p className="text-sm text-muted-foreground">
          Add the chemical composition of your waste materials. This helps us match you with the right buyers.
        </p>
        <div className="space-y-4">
          {formData.chemicalComposition.map((item: any, index: number) => (
            <div key={index} className="flex gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor={`chemical-${index}`}>Chemical/Material</Label>
                <Input
                  id={`chemical-${index}`}
                  value={item.chemical}
                  onChange={(e) => updateChemical(index, "chemical", e.target.value)}
                  placeholder="e.g., Polyethylene"
                  className="bg-background/50"
                />
              </div>
              <div className="w-32 space-y-2">
                <Label htmlFor={`percentage-${index}`}>Percentage</Label>
                <Input
                  id={`percentage-${index}`}
                  value={item.percentage}
                  onChange={(e) => updateChemical(index, "percentage", e.target.value)}
                  placeholder="e.g., 45%"
                  className="bg-background/50"
                />
              </div>
              <Button type="button" variant="ghost" size="icon" onClick={() => removeChemical(index)} className="mt-8">
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <Button type="button" onClick={addChemical} variant="outline" className="w-full gap-2 bg-transparent">
          <Plus className="h-4 w-4" />
          Add Chemical Component
        </Button>
        <div className="flex gap-4">
          <Button type="button" onClick={prevStep} variant="outline" className="gap-2 bg-transparent">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <Button type="submit" className="flex-1 gap-2">
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </Card>
  )
}
