"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { ChevronRight, ChevronLeft, Building2, FlaskConical, MapPin, Trash2 } from "lucide-react"
import type { WasteStreamData } from "@/lib/mock-data"

const STEPS = [
  { id: 1, title: "Company Information", icon: Building2 },
  { id: 2, title: "Waste Stream Data", icon: Trash2 },
  { id: 3, title: "Chemical Composition", icon: FlaskConical },
  { id: 4, title: "Quantity & Location", icon: MapPin },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<Partial<WasteStreamData>>({
    companyName: "",
    wasteType: "",
    chemicalComposition: "",
    quantity: 0,
    unit: "tons",
    location: "",
    currentDisposal: "",
  })

  const progress = (currentStep / STEPS.length) * 100

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    } else {
      // Store data and navigate to matching
      sessionStorage.setItem("wasteStreamData", JSON.stringify(formData))
      router.push("/onboarding/match")
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateFormData = (field: keyof WasteStreamData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.companyName && formData.companyName.length > 0
      case 2:
        return formData.wasteType && formData.wasteType.length > 0
      case 3:
        return formData.chemicalComposition && formData.chemicalComposition.length > 0
      case 4:
        return (
          formData.quantity &&
          formData.quantity > 0 &&
          formData.location &&
          formData.location.length > 0 &&
          formData.currentDisposal &&
          formData.currentDisposal.length > 0
        )
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <h1 className="text-3xl font-bold text-foreground">Get Started</h1>
              <span className="text-sm text-muted-foreground">
                Step {currentStep} of {STEPS.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Indicators */}
          <div className="mb-8 grid grid-cols-4 gap-4">
            {STEPS.map((step) => {
              const Icon = step.icon
              const isActive = step.id === currentStep
              const isCompleted = step.id < currentStep

              return (
                <div
                  key={step.id}
                  className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors ${
                    isActive
                      ? "border-primary bg-primary/5"
                      : isCompleted
                        ? "border-primary/50 bg-muted"
                        : "border-border bg-card"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : isCompleted
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span
                    className={`text-center text-xs font-medium ${
                      isActive ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Form Card */}
          <Card>
            <CardHeader>
              <CardTitle>{STEPS[currentStep - 1].title}</CardTitle>
              <CardDescription>
                {currentStep === 1 && "Tell us about your company"}
                {currentStep === 2 && "Describe your waste stream"}
                {currentStep === 3 && "Provide chemical composition details"}
                {currentStep === 4 && "Specify quantity, location, and current disposal method"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Company Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      placeholder="Enter your company name"
                      value={formData.companyName}
                      onChange={(e) => updateFormData("companyName", e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Waste Stream Data */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="wasteType">Waste Type *</Label>
                    <Select value={formData.wasteType} onValueChange={(value) => updateFormData("wasteType", value)}>
                      <SelectTrigger id="wasteType">
                        <SelectValue placeholder="Select waste type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Chemical">Chemical Waste</SelectItem>
                        <SelectItem value="Industrial">Industrial Waste</SelectItem>
                        <SelectItem value="Hazardous">Hazardous Waste</SelectItem>
                        <SelectItem value="Petroleum">Petroleum Waste</SelectItem>
                        <SelectItem value="Organic">Organic Waste</SelectItem>
                        <SelectItem value="Non-Hazardous">Non-Hazardous Waste</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 3: Chemical Composition */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="chemicalComposition">Chemical Composition *</Label>
                    <Textarea
                      id="chemicalComposition"
                      placeholder="Describe the chemical composition of your waste stream (e.g., hydrocarbons, solvents, heavy metals)"
                      value={formData.chemicalComposition}
                      onChange={(e) => updateFormData("chemicalComposition", e.target.value)}
                      rows={6}
                    />
                    <p className="text-sm text-muted-foreground">
                      Include major components, concentrations, and any hazardous materials
                    </p>
                  </div>
                </div>
              )}

              {/* Step 4: Quantity & Location */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity *</Label>
                      <Input
                        id="quantity"
                        type="number"
                        placeholder="0"
                        value={formData.quantity || ""}
                        onChange={(e) => updateFormData("quantity", Number.parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unit">Unit *</Label>
                      <Select value={formData.unit} onValueChange={(value) => updateFormData("unit", value)}>
                        <SelectTrigger id="unit">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tons">Tons</SelectItem>
                          <SelectItem value="gallons">Gallons</SelectItem>
                          <SelectItem value="cubic-yards">Cubic Yards</SelectItem>
                          <SelectItem value="barrels">Barrels</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      placeholder="City, State"
                      value={formData.location}
                      onChange={(e) => updateFormData("location", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentDisposal">Current Disposal Method *</Label>
                    <Textarea
                      id="currentDisposal"
                      placeholder="Describe your current waste disposal method"
                      value={formData.currentDisposal}
                      onChange={(e) => updateFormData("currentDisposal", e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-6">
                <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={handleNext} disabled={!isStepValid()}>
                  {currentStep === STEPS.length ? "Find Matches" : "Next"}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
