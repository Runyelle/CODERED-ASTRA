import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield, TrendingUp, Users, Zap, CheckCircle2, Globe2, BarChart3, Droplet } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary">
        <div className="absolute inset-0 bg-[url('/abstract-energy-pipeline-network.jpg')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />

        <div className="container relative mx-auto px-4 py-32 md:py-40">
          <div className="mx-auto max-w-4xl text-center">
            <Badge
              className="mb-6 bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 backdrop-blur-sm"
              variant="outline"
            >
              Powered by ConocoPhillips Innovation
            </Badge>
            <h1 className="mb-6 text-balance text-5xl font-bold tracking-tight text-primary-foreground md:text-7xl">
              Transform Waste Into Value
            </h1>
            <p className="mb-10 text-pretty text-xl text-primary-foreground/90 md:text-2xl leading-relaxed">
              Connect with certified disposal partners across the energy sector. Streamline operations, ensure
              compliance, and drive sustainable impact.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" className="h-14 px-8 text-lg shadow-2xl" asChild>
                <Link href="/onboarding">
                  Start Matching Now
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-lg border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 backdrop-blur-sm"
                asChild
              >
                <Link href="/about">Explore Platform</Link>
              </Button>
            </div>

            <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-primary-foreground/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-sm font-medium">EPA Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-sm font-medium">ISO Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-sm font-medium">500+ Partners</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  <Globe2 className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="mb-2 text-5xl font-bold text-primary">500+</div>
              <div className="text-lg font-medium text-foreground">Certified Partners</div>
              <div className="text-sm text-muted-foreground">Nationwide Coverage</div>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10">
                  <BarChart3 className="h-8 w-8 text-secondary" />
                </div>
              </div>
              <div className="mb-2 text-5xl font-bold text-secondary">2.5M</div>
              <div className="text-lg font-medium text-foreground">Tons Processed</div>
              <div className="text-sm text-muted-foreground">Annually Managed</div>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="mb-2 text-5xl font-bold text-primary">98%</div>
              <div className="text-lg font-medium text-foreground">Compliance Rate</div>
              <div className="text-sm text-muted-foreground">Industry Leading</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-b border-border py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <Badge className="mb-4" variant="outline">
              Platform Features
            </Badge>
            <h2 className="mb-4 text-4xl font-bold text-foreground">Built for Energy Sector Excellence</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Industry-leading technology designed specifically for waste stream management
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-2 transition-all hover:border-primary hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg">
                  <Shield className="h-7 w-7 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">Certified Partners</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  All partners are EPA certified and meet strict industry compliance standards for safe disposal
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:border-secondary hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-secondary/70 shadow-lg">
                  <Zap className="h-7 w-7 text-secondary-foreground" />
                </div>
                <CardTitle className="text-xl">Instant Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Advanced algorithms match your waste streams with optimal disposal partners in real-time
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:border-primary hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg">
                  <TrendingUp className="h-7 w-7 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">Cost Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Reduce disposal costs through competitive bidding and efficient routing optimization
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:border-secondary hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-secondary/70 shadow-lg">
                  <Users className="h-7 w-7 text-secondary-foreground" />
                </div>
                <CardTitle className="text-xl">Network Access</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Connect with hundreds of verified waste management companies across North America
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-primary to-primary/90 py-24">
        <div className="absolute inset-0 bg-[url('/industrial-facility-aerial-view.jpg')] bg-cover bg-center opacity-10" />
        <div className="container relative mx-auto px-4 text-center">
          <Badge
            className="mb-6 bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 backdrop-blur-sm"
            variant="outline"
          >
            Join the Network
          </Badge>
          <h2 className="mb-6 text-4xl font-bold text-primary-foreground md:text-5xl">
            Ready to Optimize Your Operations?
          </h2>
          <p className="mb-10 text-xl text-primary-foreground/90 leading-relaxed">
            Join hundreds of energy companies streamlining their waste disposal operations
          </p>
          <Button size="lg" variant="secondary" className="h-14 px-10 text-lg shadow-2xl" asChild>
            <Link href="/onboarding">
              Get Started Today
              <ArrowRight className="ml-2 h-6 w-6" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
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
