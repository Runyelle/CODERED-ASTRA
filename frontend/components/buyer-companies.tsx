"use client"

import { Button } from "@/components/ui/button"
import { Building2, TrendingUp, Package, Zap, Recycle } from "lucide-react"

export function BuyerCompanies() {
  const companies = [
    {
      name: "LyondellBasell",
      material: "Plastic Waste (HDPE, PP)",
      quantity: "500 tons/year",
      price: "$450/ton",
      match: "94%",
      icon: Building2,
    },
    {
      name: "Waste Management Inc",
      material: "Mixed Recyclables",
      quantity: "1,200 tons/year",
      price: "$180/ton",
      match: "89%",
      icon: Recycle,
    },
    {
      name: "Republic Services",
      material: "Cardboard & Paper",
      quantity: "800 tons/year",
      price: "$120/ton",
      match: "92%",
      icon: Package,
    },
    {
      name: "Covanta Energy",
      material: "Organic Waste",
      quantity: "2,000 tons/year",
      price: "$85/ton",
      match: "87%",
      icon: Zap,
    },
    {
      name: "Veolia North America",
      material: "Metal Scrap",
      quantity: "600 tons/year",
      price: "$320/ton",
      match: "91%",
      icon: TrendingUp,
    },
    {
      name: "Suez Recycling",
      material: "Glass & Bottles",
      quantity: "400 tons/year",
      price: "$95/ton",
      match: "88%",
      icon: Building2,
    },
  ]

  return (
    <section className="relative py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-foreground lg:text-5xl">Active Buyers in Your Area</h2>
          <p className="text-lg text-muted-foreground">Companies actively purchasing waste materials right now</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {companies.map((company, index) => {
            const Icon = company.icon
            return (
              <div
                key={index}
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
