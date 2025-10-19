"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, ArrowLeft } from "lucide-react"

interface CurrentDisposalStepProps {
  formData: any
  updateFormData: (data: any) => void
  nextStep: () => void
  prevStep: () => void
}

export function CurrentDisposalStep({ formData, updateFormData, nextStep, prevStep }: CurrentDisposalStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    nextStep()
  }

  return (
    <Card className="border-border/50 bg-card/50 p-8 backdrop-blur-sm">
      <h2 className="mb-6 text-2xl font-bold text-foreground">Current Disposal Method</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="currentDisposal">Current Disposal Method *</Label>
          <Textarea
            id="currentDisposal"
            value={formData.currentDisposal}
            onChange={(e) => updateFormData({ currentDisposal: e.target.value })}
            placeholder="Describe how you currently dispose of this waste..."
            required
            className="min-h-32 bg-background/50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="disposalCost">Current Disposal Cost (Optional)</Label>
          <Input
            id="disposalCost"
            value={formData.disposalCost}
            onChange={(e) => updateFormData({ disposalCost: e.target.value })}
            placeholder="e.g., $5,000 per month"
            className="bg-background/50"
          />
          <p className="text-xs text-muted-foreground">
            This helps us calculate potential savings and match you with better options
          </p>
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
