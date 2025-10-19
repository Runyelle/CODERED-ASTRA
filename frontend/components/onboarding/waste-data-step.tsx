"use client"

import React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowRight, ArrowLeft, X } from "lucide-react"

interface WasteDataStepProps {
  formData: any
  updateFormData: (data: any) => void
  nextStep: () => void
  prevStep: () => void
}

const wasteTypes = [
  { category: "Plastics", types: [
    "Polyethylene (PE)", "Polypropylene (PP)", "Polyethylene Terephthalate (PET)", 
    "Polyvinyl Chloride (PVC)", "Polystyrene (PS)", "ABS Plastic", "Mixed Plastics",
    "Plastic Film", "Rigid Plastics", "Expanded Polystyrene (EPS)"
  ]},
  { category: "Metals", types: [
    "Ferrous Metals (Steel/Iron)", "Aluminum", "Copper", "Brass", "Stainless Steel",
    "Lead", "Zinc", "Nickel", "Mixed Metals", "Metal Shavings/Turnings"
  ]},
  { category: "Chemicals", types: [
    "Solvents", "Acids", "Bases/Alkalines", "Petrochemicals", "Glycols",
    "Catalysts", "Resins", "Adhesives", "Coatings/Paints", "Chemical Process Residues"
  ]},
  { category: "Organic/Biomass", types: [
    "Food Waste", "Agricultural Waste", "Wood Waste", "Paper/Cardboard",
    "Yard/Green Waste", "Biosolids", "Animal By-products", "Organic Sludge",
    "Spent Grains", "Pulp & Paper Residues"
  ]},
  { category: "Industrial Residues", types: [
    "Fly Ash", "Bottom Ash", "Slag", "Kiln Dust", "Foundry Sand",
    "Spent Catalysts", "Process Dust", "Filter Cakes", "Mineral Residues", "Tailings"
  ]},
  { category: "Textiles", types: [
    "Cotton Waste", "Synthetic Fibers", "Mixed Textiles", "Leather Scraps",
    "Carpet Waste", "Industrial Fabrics"
  ]},
  { category: "Glass", types: [
    "Clear Glass", "Colored Glass", "Mixed Glass", "Flat Glass",
    "Container Glass", "Fiberglass"
  ]},
  { category: "Construction & Demolition", types: [
    "Concrete", "Asphalt", "Bricks", "Gypsum/Drywall", "Insulation Materials",
    "Roofing Materials", "Mixed C&D Waste"
  ]},
  { category: "Electronics/E-Waste", types: [
    "Circuit Boards", "Electronic Components", "Batteries (Lithium-ion)",
    "Batteries (Lead-acid)", "Batteries (Other)", "Display Screens", "Mixed E-Waste"
  ]},
  { category: "Rubber/Tires", types: [
    "Tire-Derived Material", "Rubber Crumb", "Synthetic Rubber", "Natural Rubber",
    "Mixed Rubber Waste"
  ]},
  { category: "Energy/Fuels", types: [
    "Used Oil", "Waste Fuel", "Biomass Fuel", "Refuse-Derived Fuel (RDF)",
    "Alternative Fuels", "Lubricants"
  ]},
  { category: "Other", types: [
    "Commingled/Mixed Waste", "Packaging Materials", "Other (Please Specify)"
  ]}
]

export function WasteDataStep({ formData, updateFormData, nextStep, prevStep }: WasteDataStepProps) {
  const selectedWasteTypes = formData.wasteTypes || []

  const toggleWasteType = (type: string) => {
    const updated = selectedWasteTypes.includes(type)
      ? selectedWasteTypes.filter((t: string) => t !== type)
      : [...selectedWasteTypes, type]
    updateFormData({ wasteTypes: updated })
  }

  const removeWasteType = (type: string) => {
    const updated = selectedWasteTypes.filter((t: string) => t !== type)
    updateFormData({ wasteTypes: updated })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedWasteTypes.length > 0) {
      nextStep()
    }
  }

  return (
    <Card className="border-border/50 bg-card/50 p-8 backdrop-blur-sm">
      <h2 className="mb-6 text-2xl font-bold text-foreground">Waste Material Information</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label>Waste Types * (Select all that apply)</Label>
          <p className="text-sm text-muted-foreground mb-3">
            Select one or more waste types that your company produces
          </p>
          
          {selectedWasteTypes.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4 p-3 bg-muted/30 rounded-lg">
              {selectedWasteTypes.map((type: string) => (
                <Badge key={type} variant="secondary" className="gap-1 pr-1">
                  {type}
                  <button
                    type="button"
                    onClick={() => removeWasteType(type)}
                    className="ml-1 rounded-full hover:bg-muted p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          <ScrollArea className="h-[300px] rounded-md border border-border/50 bg-background/50 p-4">
            <div className="space-y-4">
              {wasteTypes.map((category) => (
                <div key={category.category}>
                  <h3 className="font-semibold text-sm text-primary mb-2">
                    {category.category}
                  </h3>
                  <div className="space-y-2 ml-2">
                    {category.types.map((type) => (
                      <div
                        key={type}
                        className="flex items-center space-x-2 p-2 rounded-md"
                      >
                        <Checkbox
                          checked={selectedWasteTypes.includes(type)}
                          onCheckedChange={() => toggleWasteType(type)}
                        />
                        <label className="text-sm flex-1">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
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
