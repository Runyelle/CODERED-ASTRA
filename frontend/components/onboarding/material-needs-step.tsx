"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package } from "lucide-react"

interface MaterialNeedsStepProps {
  formData: {
    materialType: string
    materialDescription: string
  }
  updateFormData: (data: Partial<typeof formData>) => void
  nextStep: () => void
  prevStep: () => void
}

export function MaterialNeedsStep({ formData, updateFormData, nextStep, prevStep }: MaterialNeedsStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.materialType && formData.materialDescription) {
      nextStep()
    }
  }

  const materialTypes = [
    "Plastic Waste",
    "Metal Scrap",
    "Organic Waste",
    "Chemical Byproducts",
    "Construction Materials",
    "Textile Waste",
    "Paper/Cardboard",
    "Electronic Waste",
    "Glass Materials",
    "Other"
  ]

  return (
    <Card className="border-border/50 bg-card/50 p-8 backdrop-blur-sm">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Package className="h-8 w-8 text-primary" />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-foreground">What Materials Do You Need?</h2>
        <p className="text-muted-foreground">
          Tell us about the materials your company is looking to purchase
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="materialType">Material Type</Label>
          <Select
            value={formData.materialType}
            onValueChange={(value) => updateFormData({ materialType: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select the type of material you need" />
            </SelectTrigger>
            <SelectContent>
              {materialTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="materialDescription">Material Description</Label>
          <Textarea
            id="materialDescription"
            placeholder="Describe the specific materials you're looking for, including any particular characteristics, quality requirements, or specifications..."
            value={formData.materialDescription}
            onChange={(e) => updateFormData({ materialDescription: e.target.value })}
            rows={4}
          />
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit" disabled={!formData.materialType || !formData.materialDescription}>
            Continue
          </Button>
        </div>
      </form>
    </Card>
  )
}
