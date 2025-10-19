"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Settings } from "lucide-react"

interface MaterialSpecsStepProps {
  formData: {
    materialSpecs: { spec: string; value: string }[]
  }
  updateFormData: (data: Partial<typeof formData>) => void
  nextStep: () => void
  prevStep: () => void
}

export function MaterialSpecsStep({ formData, updateFormData, nextStep, prevStep }: MaterialSpecsStepProps) {
  const addSpec = () => {
    updateFormData({
      materialSpecs: [...formData.materialSpecs, { spec: "", value: "" }]
    })
  }

  const removeSpec = (index: number) => {
    updateFormData({
      materialSpecs: formData.materialSpecs.filter((_, i) => i !== index)
    })
  }

  const updateSpec = (index: number, field: 'spec' | 'value', value: string) => {
    const updated = [...formData.materialSpecs]
    updated[index] = { ...updated[index], [field]: value }
    updateFormData({ materialSpecs: updated })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    nextStep()
  }

  const commonSpecs = [
    "Purity Level",
    "Moisture Content",
    "Particle Size",
    "Color",
    "Density",
    "pH Level",
    "Contamination Level",
    "Certification Required"
  ]

  return (
    <Card className="border-border/50 bg-card/50 p-8 backdrop-blur-sm">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Settings className="h-8 w-8 text-primary" />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-foreground">Material Specifications</h2>
        <p className="text-muted-foreground">
          Define the specific requirements and quality standards for the materials you need
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {formData.materialSpecs.map((spec, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor={`spec-${index}`}>Specification</Label>
                <Select
                  value={spec.spec}
                  onValueChange={(value) => updateSpec(index, 'spec', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select specification type" />
                  </SelectTrigger>
                  <SelectContent>
                    {commonSpecs.map((specType) => (
                      <SelectItem key={specType} value={specType}>
                        {specType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor={`value-${index}`}>Value/Requirement</Label>
                <Input
                  id={`value-${index}`}
                  placeholder="e.g., >95%, <2%, 1-5mm"
                  value={spec.value}
                  onChange={(e) => updateSpec(index, 'value', e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeSpec(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={addSpec}
          className="w-full"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Specification
        </Button>

        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit">
            Continue
          </Button>
        </div>
      </form>
    </Card>
  )
}
