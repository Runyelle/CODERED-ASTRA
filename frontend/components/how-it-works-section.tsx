"use client"

import { Card } from "@/components/ui/card"
import { Upload, Search, Handshake, DollarSign } from "lucide-react"

const steps = [
  {
    icon: Upload,
    number: "01",
    title: "List Your Waste",
    description:
      "Upload details about your waste materials, including type, quantity, and location. Our platform makes it simple.",
  },
  {
    icon: Search,
    number: "02",
    title: "Get Matched",
    description:
      "Our algorithm connects you with verified purchasing companies actively seeking your specific waste materials.",
  },
  {
    icon: Handshake,
    number: "03",
    title: "Negotiate Terms",
    description:
      "Communicate directly with buyers, negotiate pricing, and arrange logistics through our secure platform.",
  },
  {
    icon: DollarSign,
    number: "04",
    title: "Earn Revenue",
    description:
      "Complete the transaction and receive payment. Transform what was once a cost into a new revenue stream.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
            How It Works
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Four simple steps to turn your waste into profit. No complex processes, just straightforward value creation.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <Card
                key={index}
                className="group relative overflow-hidden border-border bg-card p-6 transition-all hover:border-primary/50"
              >
                <div className="absolute right-4 top-4 text-6xl font-bold text-primary/5">{step.number}</div>
                <div className="relative">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-card-foreground">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
