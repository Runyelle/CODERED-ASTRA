"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, ArrowLeft } from "lucide-react"

interface WasteDataStepProps {
  formData: any
  updateFormData: (data: any) => void
  nextStep: () => void
  prevStep: () => void
}

export function WasteDataStep({ formData, updateFormData, nextStep, prevStep }: WasteDataStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    nextStep()
  }

  return (
    <Card className="border-border/50 bg-card/50 p-8 backdrop-blur-sm">
      <h2 className="mb-6 text-2xl font-bold text-foreground">Waste Material Information</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="wasteType">Waste Type *</Label>
          <Input
            id="wasteType"
            value={formData.wasteType}
            onChange={(e) => updateFormData({ wasteType: e.target.value })}
            placeholder="e.g., Plastic, Metal, Chemical, etc."
            required
            className="bg-background/50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="wasteDescription">Waste Description *</Label>
          <Textarea
            id="wasteDescription"
            value={formData.wasteDescription}
            onChange={(e) => updateFormData({ wasteDescription: e.target.value })}
            placeholder="Provide detailed description of your waste materials..."
            required
            className="min-h-32 bg-background/50"
          />
        </div>
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
