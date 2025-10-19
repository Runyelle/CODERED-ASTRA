"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Building2, ArrowRight } from "lucide-react"

interface CompanyVisitStepProps {
  formData: any
  updateFormData: (data: any) => void
  nextStep: () => void
}

export function CompanyVisitStep({ nextStep }: CompanyVisitStepProps) {
  return (
    <Card className="border-border/50 bg-card/50 p-8 backdrop-blur-sm">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <Building2 className="h-10 w-10 text-primary" />
        </div>
        <h2 className="mb-4 text-3xl font-bold text-foreground">Welcome to WasteFlow</h2>
        <p className="mb-8 text-lg text-muted-foreground">
          Let's get started with your company onboarding. We'll guide you through a simple process to connect you with
          the right waste purchasing companies.
        </p>
        <div className="space-y-4 text-left">
          <div className="rounded-lg border border-border/50 bg-background/50 p-4">
            <h3 className="mb-2 font-semibold text-foreground">What you'll need:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Company information and contact details</li>
              <li>• Details about your waste materials</li>
              <li>• Chemical composition data (if available)</li>
              <li>• Quantity and location information</li>
              <li>• Current disposal methods and costs</li>
            </ul>
          </div>
        </div>
        <Button onClick={nextStep} size="lg" className="mt-8 gap-2">
          Get Started
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </Card>
  )
}
