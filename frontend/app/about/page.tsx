import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CheckCircle2, Globe2, Shield, BarChart3, ArrowRight, Droplet } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary">
        <div className="absolute inset-0 bg-[url('/abstract-energy-pipeline-network.jpg')] bg-cover bg-center opacity-8" />
        <div className="container relative mx-auto px-4 py-28 md:py-36">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-4 bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 backdrop-blur-sm" variant="outline">
              Machine Learning & Geospatial Matching
            </Badge>
            <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl">
              Algorithmic Matching for Circular Economy Opportunities
            </h1>
            <p className="mb-8 text-pretty text-lg text-primary-foreground/90 md:text-xl leading-relaxed">
              Our core ML pipeline identifies opportunities for companies to exchange waste streams as raw materials by
              analyzing chemical composition and geographic proximity. The system prioritizes high-similarity composition
              matches while penalizing large transport distances.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" className="h-14 px-8 text-lg shadow-2xl" asChild>
                <Link href="/onboarding">
                  Try Matching
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg" asChild>
                <Link href="#how-it-works">How it works</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 bg-card border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold">How the matching algorithm works</h2>
            <p className="text-muted-foreground mt-2">
              A concise ML + geospatial pipeline that converts raw facility inputs into ranked exchange opportunities.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg">
                  <Globe2 className="h-7 w-7 text-primary-foreground" />
                </div>
                <CardTitle>Data Ingestion</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Facilities upload waste stream profiles (chemical composition, quantities, locations). The pipeline
                  normalizes mixtures and fills missing values for robust comparison.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-secondary/70 shadow-lg">
                  <BarChart3 className="h-7 w-7 text-secondary-foreground" />
                </div>
                <CardTitle>Composition Similarity</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We compute a weighted Tanimoto/Jaccard similarity on normalized component vectors so chemically similar
                  waste streams rank higher. The scorer supports both fraction and percentage inputs.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg">
                  <Shield className="h-7 w-7 text-primary-foreground" />
                </div>
                <CardTitle>Geographic Filtering</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We compute Haversine distances between facilities and apply a distance penalty. Matches are ranked by a
                  blended score that favors composition but scales distance impact with a configurable radius.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-semibold mb-4">Scoring formula</h3>
            <div className="bg-background p-6 rounded-lg border border-border">
              <p className="mb-2 text-muted-foreground">
                Matches are scored using a tunable blend of composition similarity and distance penalty. Defaults used in
                the demo:
              </p>
              <pre className="rounded bg-surface p-4 text-sm overflow-auto">
{`score = clip(0, 1, 0.7 * composition_similarity - 0.3 * (distance_km / (radius_km || 1000)))`}
              </pre>
              <p className="mt-3 text-sm text-muted-foreground">
                The formula is intentionally simple and interpretable. You can tune the composition/distance weights and
                radius to prioritize local exchanges or long-distance high-value material flows.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <h3 className="text-3xl font-bold text-center mb-6">Explainability & AI</h3>
          <p className="text-center text-muted-foreground mb-6">
            For any recommended match, the platform can generate an explainable narrative using a connected language
            model (Gemini) when a GOOGLE_API_KEY is configured. This provides human-friendly reasoning for why a match
            was suggested, highlighting key composition overlaps and logistical considerations.
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="font-semibold mb-2">Privacy & Security</h4>
              <p className="text-muted-foreground">
                Data is kept in-memory in the demo. For production, we recommend encrypted storage, role-based access
                controls, and an audit trail for each exchange suggestion.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="font-semibold mb-2">Integration Points</h4>
              <p className="text-muted-foreground">
                The pipeline exports matches as JSON and can be connected to procurement systems, ERP platforms, or
                notification channels for automated workflows.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="md:col-span-1">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary">
                  <Droplet className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-foreground">WasteStream</span>
                  <span className="text-xs text-primary">by ConocoPhillips</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Transforming waste management for the energy sector</p>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-foreground">Company</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="transition-colors hover:text-primary">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="transition-colors hover:text-primary">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/press" className="transition-colors hover:text-primary">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-foreground">Services</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link href="/services/waste-matching" className="transition-colors hover:text-primary">
                    Waste Matching
                  </Link>
                </li>
                <li>
                  <Link href="/services/compliance" className="transition-colors hover:text-primary">
                    Compliance
                  </Link>
                </li>
                <li>
                  <Link href="/services/analytics" className="transition-colors hover:text-primary">
                    Analytics
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-foreground">Resources</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link href="/resources/documentation" className="transition-colors hover:text-primary">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/resources/guides" className="transition-colors hover:text-primary">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link href="/resources/support" className="transition-colors hover:text-primary">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            © 2025 WasteStream Connect. A ConocoPhillips Initiative. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
