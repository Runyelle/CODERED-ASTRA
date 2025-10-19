"use client"

import { DollarSign, Leaf, Recycle, Loader2 } from "lucide-react"
import { useMatches } from "@/hooks/use-api"
import { useMemo } from "react"

export function ImpactMetrics() {
  const { matches, loading, error } = useMatches()

  const metrics = useMemo(() => {
    if (!matches.length) {
      return [
        {
          icon: DollarSign,
          value: "$0",
          label: "Saved",
          color: "text-primary",
        },
        {
          icon: Leaf,
          value: "0",
          label: "Tons CO2 Reduced",
          color: "text-accent",
        },
        {
          icon: Recycle,
          value: "0",
          label: "Tons Waste Diverted",
          color: "text-primary",
        },
      ]
    }

    const totalSavings = matches.reduce((sum, match) => sum + match.cost_savings_usd, 0)
    const totalCO2Reduction = matches.reduce((sum, match) => sum + match.co2_reduction_tons, 0)
    const totalWasteDiverted = matches.reduce((sum, match) => {
      const companyAQuantity = match.company_a.waste_stream?.quantity_tons_year || 0
      const companyBQuantity = match.company_b.material_needs?.quantity_tons_year || 0
      return sum + Math.min(companyAQuantity, companyBQuantity)
    }, 0)

    return [
      {
        icon: DollarSign,
        value: `$${(totalSavings / 1000).toFixed(0)}K`,
        label: "Saved",
        color: "text-primary",
      },
      {
        icon: Leaf,
        value: `${(totalCO2Reduction / 1000).toFixed(1)}K`,
        label: "Tons CO2 Reduced",
        color: "text-accent",
      },
      {
        icon: Recycle,
        value: `${(totalWasteDiverted / 1000).toFixed(1)}K`,
        label: "Tons Waste Diverted",
        color: "text-primary",
      },
    ]
  }, [matches])

  if (loading) {
    return (
      <section className="relative py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="relative py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center">
            <p className="text-muted-foreground">Error loading metrics: {error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative py-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:border-primary/30 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(100,200,150,0.2)]"
              >
                <div className="flex items-center gap-4">
                  <div className={`rounded-lg bg-primary/10 p-3 ${metric.color}`}>
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-foreground">{metric.value}</div>
                    <div className="text-sm text-muted-foreground">{metric.label}</div>
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
