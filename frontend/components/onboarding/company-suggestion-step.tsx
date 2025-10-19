"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ArrowLeft, Building2, MapPin, DollarSign, Sparkles } from "lucide-react"

interface CompanySuggestionStepProps {
  formData: any
  updateFormData: (data: any) => void
  nextStep: () => void
  prevStep: () => void
}

const SUGGESTED_COMPANIES = [
  {
    id: "1",
    name: "EcoRecycle Solutions",
    location: "Houston, TX",
    matchScore: 95,
    priceRange: "$200-300/ton",
    specialty: "Plastic Recycling",
  },
  {
    id: "2",
    name: "GreenTech Materials",
    location: "Dallas, TX",
    matchScore: 88,
    priceRange: "$180-250/ton",
    specialty: "Industrial Waste",
  },
  {
    id: "3",
    name: "Circular Economy Co",
    location: "Austin, TX",
    matchScore: 82,
    priceRange: "$150-220/ton",
    specialty: "Chemical Processing",
  },
]

export function CompanySuggestionStep({ formData, updateFormData, nextStep, prevStep }: CompanySuggestionStepProps) {
  const toggleCompany = (companyId: string) => {
    const selected = formData.selectedCompanies || []
    const updated = selected.includes(companyId)
      ? selected.filter((id: string) => id !== companyId)
      : [...selected, companyId]
    updateFormData({ selectedCompanies: updated })
  }

  const handleSubmit = () => {
    if (formData.selectedCompanies?.length > 0) {
      nextStep()
    }
  }

  return (
    <Card className="border-border/50 bg-card/50 p-8 backdrop-blur-sm">
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <Badge variant="outline" className="border-primary/50 text-primary">
            AI-Powered Matches
          </Badge>
        </div>
        <h2 className="text-2xl font-bold text-foreground">Recommended Companies</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Based on your waste profile, we've found these potential buyers. Select the companies you'd like to connect
          with.
        </p>
      </div>
      <div className="space-y-4">
        {SUGGESTED_COMPANIES.map((company) => (
          <div
            key={company.id}
            className="group relative overflow-hidden rounded-lg border border-border/50 bg-background/50 p-6 transition-all hover:border-primary/50 hover:shadow-[0_0_20px_rgba(100,200,150,0.2)]"
          >
            <div className="flex items-start gap-4">
              <Checkbox
                checked={formData.selectedCompanies?.includes(company.id)}
                onCheckedChange={() => toggleCompany(company.id)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{company.name}</h3>
                    <p className="text-sm text-muted-foreground">{company.specialty}</p>
                  </div>
                  <Badge className="bg-primary/20 text-primary">{company.matchScore}% Match</Badge>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {company.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    {company.priceRange}
                  </div>
                  <div className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    Verified Buyer
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex gap-4">
        <Button type="button" onClick={prevStep} variant="outline" className="gap-2 bg-transparent">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button onClick={handleSubmit} disabled={!formData.selectedCompanies?.length} className="flex-1 gap-2">
          Continue
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}
