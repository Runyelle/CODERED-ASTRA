"use client"

export function SponsorBar() {
  const sponsors = ["ConocoPhillips", "Google Gemini", "Red Bull", "MLH", "Tokio Marine HCC", "Pure Buttons", "RSM"]

  return (
    <section className="relative border-t border-border/40 py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center">
          <p className="mb-6 text-sm font-medium uppercase tracking-wider text-muted-foreground">Supported By</p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
            {sponsors.map((sponsor, index) => (
              <div
                key={index}
                className="text-lg font-semibold text-muted-foreground/60 transition-colors hover:text-foreground"
              >
                {sponsor}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
