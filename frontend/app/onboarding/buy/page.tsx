"use client"

import { useState } from "react"
import { OnboardingProgress } from "@/components/onboarding/onboarding-progress"
import { CompanyVisitStep } from "@/components/onboarding/company-visit-step"
import { EnterNameStep } from "@/components/onboarding/enter-name-step"
import { MaterialNeedsStep } from "@/components/onboarding/material-needs-step"
import { MaterialSpecsStep } from "@/components/onboarding/material-specs-step"
import { QuantityLocationStep } from "@/components/onboarding/quantity-location-step"
import { CurrentSourcingStep } from "@/components/onboarding/current-sourcing-step"
import { SupplierSuggestionStep } from "@/components/onboarding/supplier-suggestion-step"
import { SendRequestStep } from "@/components/onboarding/send-request-step"

const STEPS = [
  "Company Visit",
  "Enter Name",
  "Material Needs",
  "Material Specifications",
  "Quantity & Location",
  "Current Sourcing",
  "Supplier Suggestions",
  "Send Request",
]

export default function BuyOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    materialType: "",
    materialDescription: "",
    materialSpecs: [] as { spec: string; value: string }[],
    quantity: "",
    unit: "tons",
    location: "",
    frequency: "",
    currentSourcing: "",
    sourcingCost: "",
    selectedSuppliers: [] as string[],
  })

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <CompanyVisitStep formData={formData} updateFormData={updateFormData} nextStep={nextStep} />
      case 1:
        return (
          <EnterNameStep formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />
        )
      case 2:
        return (
          <MaterialNeedsStep formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />
        )
      case 3:
        return (
          <MaterialSpecsStep
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )
      case 4:
        return (
          <QuantityLocationStep
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )
      case 5:
        return (
          <CurrentSourcingStep
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )
      case 6:
        return (
          <SupplierSuggestionStep
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )
      case 7:
        return <SendRequestStep formData={formData} prevStep={prevStep} listingType="buyer" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 lg:px-8">
        <OnboardingProgress steps={STEPS} currentStep={currentStep} />
        <div className="mx-auto mt-8 max-w-3xl">{renderStep()}</div>
      </div>
    </div>
  )
}
