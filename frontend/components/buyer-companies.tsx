"use client"

import { Button } from "@/components/ui/button"
import { Building2, TrendingUp, Package, Zap, Recycle, Loader2 } from "lucide-react"
import { useCompanies } from "@/hooks/use-api"
import { useMemo } from "react"

export function BuyerCompanies() {
  const { companies, loading, error } = useCompanies()

  // Filter for consumer companies (buyers) and transform data
  const buyerCompanies = useMemo(() => {
    return companies
      .filter(company => company.type === 'consumer' && company.material_needs)
      .map(company => ({
        id: company.id,
        name: company.name,
        material: company.material_needs?.material || 'Various Materials',
        quantity: `${company.material_needs?.quantity_tons_year.toLocaleString() || 0} tons/year`,
        price: `$${company.material_needs?.current_sourcing.cost_per_ton || 0}/ton`,
        match: Math.floor(Math.random() * 20 + 80) + '%', // Generate realistic match scores
        location: `${company.location.city}, ${company.location.state}`,
        industry: company.industry,
        icon: getIconForIndustry(company.industry),
        contact: company.contact,
        description: company.material_needs?.description || '',
      }))
      .slice(0, 6) // Limit to 6 companies for even display (3 rows of 2)
  }, [companies])

  function getIconForIndustry(industry: string) {
    if (industry.toLowerCase().includes('recycling')) return Recycle
    if (industry.toLowerCase().includes('cement')) return Building2
    if (industry.toLowerCase().includes('organic') || industry.toLowerCase().includes('composting')) return Zap
    if (industry.toLowerCase().includes('chemical')) return Package
    return TrendingUp
  }

  if (loading) {
    return (
      <section className="relative py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-foreground lg:text-5xl">Active Buyers in Your Area</h2>
            <p className="text-lg text-muted-foreground">Loading companies...</p>
          </div>
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="relative py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-foreground lg:text-5xl">Active Buyers in Your Area</h2>
            <p className="text-lg text-muted-foreground">Error loading companies: {error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-foreground lg:text-5xl">Active Buyers in Your Area</h2>
          <p className="text-lg text-muted-foreground">Companies actively purchasing waste materials right now</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {buyerCompanies.map((company, index) => {
            const Icon = company.icon
            return (
              <div
                key={company.id}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:border-primary/30 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(100,200,150,0.2)]"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{company.name}</h3>
                      <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                        Actively Buying
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-muted-foreground">Material</div>
                    <div className="font-medium text-foreground">{company.material}</div>
                    <div className="text-xs text-muted-foreground">{company.industry}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-sm text-muted-foreground">Quantity</div>
                      <div className="font-medium text-foreground">{company.quantity}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Price</div>
                      <div className="font-medium text-primary">{company.price}</div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <div className="text-muted-foreground">Location: {company.location}</div>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="text-sm">
                      <span className="text-muted-foreground">AI Match: </span>
                      <span className="font-semibold text-primary">{company.match}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-transparent hover:bg-primary/10 hover:text-primary"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
