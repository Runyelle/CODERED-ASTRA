"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card p-12 lg:p-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(100,200,150,0.1),transparent_70%)]" />

          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
              Ready to Transform Your Waste Management?
            </h2>
            <p className="mb-8 text-pretty text-lg leading-relaxed text-muted-foreground">
              Join hundreds of businesses already generating revenue from their waste materials. Start your onboarding
              process today.
            </p>
            <Button size="lg" className="group h-14 gap-2 px-10 text-lg font-semibold">
              Begin Onboarding
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
