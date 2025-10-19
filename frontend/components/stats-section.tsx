"use client"

const stats = [
  {
    value: "500+",
    label: "Active Businesses",
  },
  {
    value: "2.5M",
    label: "Tons Diverted",
  },
  {
    value: "$12M",
    label: "Revenue Generated",
  },
  {
    value: "98%",
    label: "Satisfaction Rate",
  },
]

export function StatsSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="rounded-2xl border border-border bg-card p-8 lg:p-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-2 text-4xl font-bold text-primary lg:text-5xl">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
