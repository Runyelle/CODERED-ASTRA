"use client"

import React, { useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ArrowLeft, Plus, X } from "lucide-react"

interface ChemicalCompositionStepProps {
  formData: any
  updateFormData: (data: any) => void
  nextStep: () => void
  prevStep: () => void
}

// Chemical composition suggestions based on waste type
const chemicalSuggestions: { [key: string]: Array<{ chemical: string; percentage: string }> } = {
  "Polyethylene (PE)": [
    { chemical: "Polyethylene", percentage: "95%" },
    { chemical: "Additives", percentage: "3%" },
    { chemical: "Contaminants", percentage: "2%" }
  ],
  "Polypropylene (PP)": [
    { chemical: "Polypropylene", percentage: "93%" },
    { chemical: "Stabilizers", percentage: "4%" },
    { chemical: "Fillers", percentage: "3%" }
  ],
  "Polyethylene Terephthalate (PET)": [
    { chemical: "Polyethylene Terephthalate", percentage: "96%" },
    { chemical: "Colorants", percentage: "2%" },
    { chemical: "Other Additives", percentage: "2%" }
  ],
  "Polyvinyl Chloride (PVC)": [
    { chemical: "Polyvinyl Chloride", percentage: "85%" },
    { chemical: "Plasticizers", percentage: "10%" },
    { chemical: "Stabilizers", percentage: "5%" }
  ],
  "Polystyrene (PS)": [
    { chemical: "Polystyrene", percentage: "98%" },
    { chemical: "Additives", percentage: "2%" }
  ],
  "Ferrous Metals (Steel/Iron)": [
    { chemical: "Iron", percentage: "98%" },
    { chemical: "Carbon", percentage: "1.5%" },
    { chemical: "Other Alloys", percentage: "0.5%" }
  ],
  "Aluminum": [
    { chemical: "Aluminum", percentage: "99%" },
    { chemical: "Silicon", percentage: "0.5%" },
    { chemical: "Other Alloys", percentage: "0.5%" }
  ],
  "Copper": [
    { chemical: "Copper", percentage: "99.5%" },
    { chemical: "Trace Elements", percentage: "0.5%" }
  ],
  "Stainless Steel": [
    { chemical: "Iron", percentage: "70%" },
    { chemical: "Chromium", percentage: "18%" },
    { chemical: "Nickel", percentage: "8%" },
    { chemical: "Other Alloys", percentage: "4%" }
  ],
  "Fly Ash": [
    { chemical: "Silicon Dioxide (SiO₂)", percentage: "45%" },
    { chemical: "Aluminum Oxide (Al₂O₃)", percentage: "25%" },
    { chemical: "Iron Oxide (Fe₂O₃)", percentage: "15%" },
    { chemical: "Calcium Oxide (CaO)", percentage: "10%" },
    { chemical: "Other Oxides", percentage: "5%" }
  ],
  "Slag": [
    { chemical: "Calcium Oxide (CaO)", percentage: "40%" },
    { chemical: "Silicon Dioxide (SiO₂)", percentage: "35%" },
    { chemical: "Aluminum Oxide (Al₂O₃)", percentage: "10%" },
    { chemical: "Magnesium Oxide (MgO)", percentage: "10%" },
    { chemical: "Other Compounds", percentage: "5%" }
  ],
  "Concrete": [
    { chemical: "Calcium Silicates", percentage: "60%" },
    { chemical: "Aggregates", percentage: "30%" },
    { chemical: "Calcium Carbonate", percentage: "5%" },
    { chemical: "Other Minerals", percentage: "5%" }
  ],
  "Gypsum/Drywall": [
    { chemical: "Calcium Sulfate Dihydrate", percentage: "90%" },
    { chemical: "Paper/Cellulose", percentage: "6%" },
    { chemical: "Additives", percentage: "4%" }
  ],
  "Used Oil": [
    { chemical: "Base Oil", percentage: "75%" },
    { chemical: "Hydrocarbons", percentage: "15%" },
    { chemical: "Additives", percentage: "5%" },
    { chemical: "Contaminants", percentage: "5%" }
  ],
  "Solvents": [
    { chemical: "Organic Solvents", percentage: "85%" },
    { chemical: "Water", percentage: "10%" },
    { chemical: "Dissolved Materials", percentage: "5%" }
  ],
  "Food Waste": [
    { chemical: "Water", percentage: "70%" },
    { chemical: "Carbohydrates", percentage: "15%" },
    { chemical: "Proteins", percentage: "8%" },
    { chemical: "Fats", percentage: "5%" },
    { chemical: "Fiber", percentage: "2%" }
  ],
  "Wood Waste": [
    { chemical: "Cellulose", percentage: "45%" },
    { chemical: "Lignin", percentage: "25%" },
    { chemical: "Hemicellulose", percentage: "25%" },
    { chemical: "Other Organics", percentage: "5%" }
  ],
  "Paper/Cardboard": [
    { chemical: "Cellulose Fiber", percentage: "85%" },
    { chemical: "Fillers", percentage: "10%" },
    { chemical: "Coatings/Additives", percentage: "5%" }
  ],
  "Clear Glass": [
    { chemical: "Silicon Dioxide (SiO₂)", percentage: "72%" },
    { chemical: "Sodium Oxide (Na₂O)", percentage: "14%" },
    { chemical: "Calcium Oxide (CaO)", percentage: "10%" },
    { chemical: "Other Oxides", percentage: "4%" }
  ],
  "Cotton Waste": [
    { chemical: "Cellulose", percentage: "90%" },
    { chemical: "Waxes", percentage: "5%" },
    { chemical: "Proteins", percentage: "3%" },
    { chemical: "Other Organics", percentage: "2%" }
  ],
  "Tire-Derived Material": [
    { chemical: "Rubber Polymer", percentage: "60%" },
    { chemical: "Carbon Black", percentage: "28%" },
    { chemical: "Steel Wire", percentage: "10%" },
    { chemical: "Other Additives", percentage: "2%" }
  ],
  "Circuit Boards": [
    { chemical: "Fiberglass/Epoxy", percentage: "40%" },
    { chemical: "Copper", percentage: "20%" },
    { chemical: "Plastics", percentage: "15%" },
    { chemical: "Tin/Lead Solder", percentage: "10%" },
    { chemical: "Other Metals", percentage: "10%" },
    { chemical: "Other Materials", percentage: "5%" }
  ],
  "Batteries (Lithium-ion)": [
    { chemical: "Lithium Compounds", percentage: "25%" },
    { chemical: "Cobalt", percentage: "20%" },
    { chemical: "Nickel", percentage: "15%" },
    { chemical: "Aluminum", percentage: "15%" },
    { chemical: "Copper", percentage: "10%" },
    { chemical: "Plastics/Electrolytes", percentage: "15%" }
  ]
}

export function ChemicalCompositionStep({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}: ChemicalCompositionStepProps) {
  // Get suggestions for all selected waste types
  const wasteTypes = formData.wasteTypes || []
  const allSuggestions = wasteTypes
    .map((type: string) => chemicalSuggestions[type])
    .filter((s: any) => s !== undefined)
  
  // Combine suggestions from all waste types
  const suggestions = allSuggestions.length > 0 ? allSuggestions.flat() : null

  useEffect(() => {
    // Auto-populate if suggestions exist and composition is empty
    if (suggestions && (!formData.chemicalComposition || formData.chemicalComposition.length === 0)) {
      updateFormData({ chemicalComposition: [...suggestions] })
    }
  }, []) // Only run once on mount

  const applySuggestion = () => {
    if (suggestions) {
      updateFormData({ chemicalComposition: [...suggestions] })
    }
  }

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
        
        {suggestions && (
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">
                Suggested compositions for your selected waste types:
              </p>
              <Button type="button" onClick={applySuggestion} size="sm" variant="outline">
                Apply Suggestions
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((item: any, idx: number) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {item.chemical}: {item.percentage}
                </Badge>
              ))}
            </div>
          </div>
        )}

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
