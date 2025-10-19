"use client"

import { Card } from "@/components/ui/card"

const partners = [
  { name: "EcoRecycle Corp", industry: "Plastics & Polymers" },
  { name: "GreenMetal Solutions", industry: "Metal Recycling" },
  { name: "Sustainable Textiles", industry: "Fabric & Textiles" },
  { name: "BioWaste Energy", industry: "Organic Materials" },
  { name: "CircularPaper Co", industry: "Paper & Cardboard" },
  { name: "TechReclaim", industry: "Electronics" },
]

export function PartnersSection() {
  return (
    <section id="partners" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
            Trusted Partners
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            We work with industry-leading purchasing companies across multiple sectors to ensure you get the best value
            for your materials.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner, index) => (
            <Card key={index} className="border-border bg-card p-6 transition-all hover:border-primary/50">
              <div className="mb-2 text-lg font-semibold text-card-foreground">{partner.name}</div>
              <div className="text-sm text-muted-foreground">{partner.industry}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
