export function AboutMissionSection() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* About Me */}
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
              <span className="text-sm font-medium text-primary">About Us</span>
            </div>
            <h2 className="text-4xl font-bold text-balance">Transforming Waste Into Opportunity</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              WasteFlow was born from a simple observation: businesses generate valuable waste materials every day,
              while other companies actively seek these same materials for their operations. We bridge this gap,
              creating a sustainable marketplace where waste becomes a resource.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our platform leverages AI-powered matching to connect waste generators with verified buyers, ensuring
              efficient transactions that benefit both your bottom line and the environment.
            </p>
          </div>

          {/* Our Mission */}
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-accent/10 border border-accent/20 rounded-full">
              <span className="text-sm font-medium text-accent">Our Mission</span>
            </div>
            <h2 className="text-4xl font-bold text-balance">Building a Circular Economy</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We envision a world where waste is eliminated through intelligent resource circulation. Every ton of waste
              diverted from landfills represents both environmental progress and economic opportunity.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">Reduce Environmental Impact:</span> Divert waste from
                  landfills and reduce carbon emissions
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">Create Economic Value:</span> Turn disposal costs into
                  revenue streams
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">Enable Sustainability:</span> Make circular economy
                  practices accessible to all businesses
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
