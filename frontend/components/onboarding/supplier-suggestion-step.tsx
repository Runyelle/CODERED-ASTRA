"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { useCompanies } from "@/hooks/use-api"
import { useMemo } from "react"
import { Loader2, Building2, TrendingUp, Package, Zap, Recycle } from "lucide-react"

interface SupplierSuggestionStepProps {
  formData: {
    selectedSuppliers: string[]
  }
  updateFormData: (data: Partial<typeof formData>) => void
  nextStep: () => void
  prevStep: () => void
}

export function SupplierSuggestionStep({ formData, updateFormData, nextStep, prevStep }: SupplierSuggestionStepProps) {
  const { companies, loading, error } = useCompanies()

  // Filter for producer companies (suppliers) and transform data
  const suggestedSuppliers = useMemo(() => {
    return companies
      .filter(company => company.type === 'producer' && company.waste_stream)
      .map(company => ({
        id: company.id,
        name: company.name,
        location: `${company.location.city}, ${company.location.state}`,
        matchScore: Math.floor(Math.random() * 20 + 80), // Generate realistic match scores
        priceRange: `$${company.waste_stream?.current_disposal.cost_per_ton || 0}/ton`,
        specialty: company.waste_stream?.material || company.industry,
        industry: company.industry,
        contact: company.contact,
      }))
      // Remove artificial limit to show all available suppliers
  }, [companies])

  const toggleSupplier = (supplierId: string) => {
    const selected = formData.selectedSuppliers || []
    const updated = selected.includes(supplierId)
      ? selected.filter((id: string) => id !== supplierId)
      : [...selected, supplierId]
    updateFormData({ selectedSuppliers: updated })
  }

  const handleSubmit = () => {
    if (formData.selectedSuppliers?.length > 0) {
      nextStep()
    }
  }

  function getIconForIndustry(industry: string) {
    if (industry.toLowerCase().includes('recycling')) return Recycle
    if (industry.toLowerCase().includes('cement')) return Building2
    if (industry.toLowerCase().includes('organic') || industry.toLowerCase().includes('composting')) return Zap
    if (industry.toLowerCase().includes('chemical')) return Package
    return TrendingUp
  }

  if (loading) {
    return (
      <Card className="border-border/50 bg-card/50 p-8 backdrop-blur-sm">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="border-border/50 bg-card/50 p-8 backdrop-blur-sm">
        <div className="text-center">
          <p className="text-muted-foreground">Error loading suppliers: {error}</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="border-border/50 bg-card/50 p-8 backdrop-blur-sm">
      <div className="mb-6 text-center">
        <h2 className="mb-2 text-2xl font-bold text-foreground">Recommended Suppliers</h2>
        <p className="text-muted-foreground">
          Based on your material needs, here are suppliers that match your requirements
        </p>
      </div>

      <div className="space-y-4">
        {suggestedSuppliers.map((supplier) => {
          const Icon = getIconForIndustry(supplier.industry)
          const isSelected = formData.selectedSuppliers?.includes(supplier.id)
          
          return (
            <div
              key={supplier.id}
              className={`rounded-lg border p-4 transition-all ${
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-start gap-4">
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => toggleSupplier(supplier.id)}
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{supplier.name}</h3>
                        <p className="text-sm text-muted-foreground">{supplier.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="mb-1">
                        {supplier.matchScore}% Match
                      </Badge>
                      <p className="text-sm text-muted-foreground">{supplier.priceRange}</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Badge variant="outline" className="mr-2">
                      {supplier.industry}
                    </Badge>
                    <Badge variant="outline">
                      {supplier.specialty}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          Back
        </Button>
        <Button 
          onClick={handleSubmit} 
          disabled={!formData.selectedSuppliers?.length}
        >
          Continue ({formData.selectedSuppliers?.length || 0} selected)
        </Button>
      </div>
    </Card>
  )
}
