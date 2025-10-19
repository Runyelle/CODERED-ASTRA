"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-20">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(100,200,150,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(150,220,100,0.03),transparent_50%)]" />

      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Trust indicator */}

          <h1 className="mb-6 text-balance text-5xl font-bold leading-tight tracking-tight text-foreground lg:text-7xl">
            Transform Your Waste Into <span className="text-primary">Revenue</span>
          </h1>

          <p className="mb-10 text-pretty text-lg leading-relaxed text-muted-foreground lg:text-xl">
            Connect directly with purchasing companies who value your waste materials. Turn disposal costs into profit
            streams while contributing to a circular economy.
          </p>

          <div className="flex flex-col items-center justify-center gap-4">
            <Button
              size="lg"
              className="group relative h-14 gap-2 px-12 text-lg font-semibold shadow-[0_0_20px_rgba(100,200,150,0.3)] hover:shadow-[0_0_30px_rgba(100,200,150,0.5)] transition-all duration-300"
            >
              Start Onboarding
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
