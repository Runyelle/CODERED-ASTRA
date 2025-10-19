"use client"
import { TrendingUp, Shield, Leaf, Users } from "lucide-react"

const benefits = [
  {
    icon: TrendingUp,
    title: "Increase Revenue",
    description:
      "Convert disposal costs into profit. Our platform users report an average 40% reduction in waste management expenses.",
  },
  {
    icon: Shield,
    title: "Verified Buyers",
    description:
      "All purchasing companies are thoroughly vetted. Trade with confidence knowing your partners are legitimate and reliable.",
  },
  {
    icon: Leaf,
    title: "Environmental Impact",
    description:
      "Contribute to the circular economy. Every transaction helps reduce landfill waste and supports sustainable practices.",
  },
  {
    icon: Users,
    title: "Growing Network",
    description:
      "Access a constantly expanding network of buyers across multiple industries seeking diverse waste materials.",
  },
]

export function BenefitsSection() {
  return (
    <section id="benefits" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
            Why Choose WasteFlow
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Join hundreds of businesses already transforming their waste management approach into a competitive
            advantage.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">{benefit.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
