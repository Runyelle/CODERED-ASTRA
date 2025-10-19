"use client"

import { DollarSign, Leaf, Recycle } from "lucide-react"

export function ImpactMetrics() {
  const metrics = [
    {
      icon: DollarSign,
      value: "$430K",
      label: "Saved",
      color: "text-primary",
    },
    {
      icon: Leaf,
      value: "1.0K",
      label: "Tons CO2 Reduced",
      color: "text-accent",
    },
    {
      icon: Recycle,
      value: "8.3K",
      label: "Tons Waste Diverted",
      color: "text-primary",
    },
  ]

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
