"use client"

import { Recycle } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-8 flex items-center justify-center gap-2">
          <Recycle className="h-6 w-6 text-primary" aria-hidden="true" />
          <span className="text-xl font-semibold text-card-foreground">WasteFlow</span>
        </div>
        <p className="mx-auto mb-8 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
          Connecting businesses with purchasing companies to transform waste into revenue. Building a sustainable,
          circular economy together.
        </p>

        <div className="border-t border-border pt-8">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Built by <span className="font-semibold text-foreground">Henry</span>,{" "}
              <span className="font-semibold text-foreground">Andrew</span>,{" "}
              <span className="font-semibold text-foreground">Ronielle</span>, and{" "}
              <span className="font-semibold text-foreground">Austin</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">© 2025 WasteFlow. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
