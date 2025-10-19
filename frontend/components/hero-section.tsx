"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about-mission")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative overflow-hidden h-screen flex flex-col">
      {/* Background image with dark overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.pexels.com/photos/34351199/pexels-photo-34351199.jpeg"
          alt="Background"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>

      {/* Subtle accent patterns on top of darkened background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_30%_20%,rgba(100,200,150,0.08),transparent_50%)]" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_70%_80%,rgba(150,220,100,0.05),transparent_50%)]" />

      <div className="container relative z-10 mx-auto px-4 lg:px-8 flex-1 flex items-center">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-balance text-5xl font-bold leading-tight tracking-tight text-white lg:text-7xl">
            Transform Your Waste Into <span className="text-primary">Revenue</span>
          </h1>

          <p className="mb-10 text-pretty text-lg leading-relaxed text-gray-200 lg:text-xl">
            Connect directly with purchasing companies who value your waste materials. Turn disposal costs into profit
            streams while contributing to a circular economy.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="group relative h-14 gap-2 px-8 text-lg font-semibold shadow-[0_0_20px_rgba(100,200,150,0.3)] hover:shadow-[0_0_30px_rgba(100,200,150,0.5)] transition-all duration-300"
              >
                Go to Dashboard
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Animated scroll indicator at bottom of section */}
      <div className="relative z-10 pb-8 flex justify-center">
        <button
          onClick={scrollToAbout}
          className="flex flex-col items-center gap-2 animate-bounce cursor-pointer group"
          aria-label="Scroll to next section"
        >
          <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">Scroll to explore</span>
          <ChevronDown className="h-6 w-6 text-primary group-hover:text-primary/80 transition-colors" aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}
