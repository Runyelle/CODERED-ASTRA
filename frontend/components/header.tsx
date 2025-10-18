import Link from "next/link"
import { Droplet } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-lg">
            <Droplet className="h-7 w-7 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-foreground">WasteStream</span>
            <span className="text-xs font-medium text-primary">by ConocoPhillips</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/about"
            className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            About
          </Link>
          <Link
            href="/services"
            className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            Services
          </Link>
          <Link
            href="/solutions"
            className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            Solutions
          </Link>
          <Link
            href="/contact"
            className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button size="lg" className="shadow-lg">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  )
}
