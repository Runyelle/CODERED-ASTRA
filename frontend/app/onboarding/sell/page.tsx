"use client"

import { useState } from "react"
import { OnboardingProgress } from "@/components/onboarding/onboarding-progress"
import { CompanyVisitStep } from "@/components/onboarding/company-visit-step"
import { EnterNameStep } from "@/components/onboarding/enter-name-step"
import { WasteDataStep } from "@/components/onboarding/waste-data-step"
import { ChemicalCompositionStep } from "@/components/onboarding/chemical-composition-step"
import { QuantityLocationStep } from "@/components/onboarding/quantity-location-step"
import { CurrentDisposalStep } from "@/components/onboarding/current-disposal-step"
import { CompanySuggestionStep } from "@/components/onboarding/company-suggestion-step"
import { AgreementStep } from "@/components/onboarding/agreement-step"
import { SendRequestStep } from "@/components/onboarding/send-request-step"

const STEPS = [
  "Company Visit",
  "Enter Name",
  "Waste Data",
  "Chemical Composition",
  "Quantity & Location",
  "Current Disposal",
  "Company Suggestions",
  "Agreement",
  "Send Request",
]

export default function SellOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    wasteType: "",
    wasteDescription: "",
    chemicalComposition: [] as { chemical: string; percentage: string }[],
    quantity: "",
    unit: "tons",
    location: "",
    frequency: "",
    currentDisposal: "",
    disposalCost: "",
    selectedCompanies: [] as string[],
    agreementAccepted: false,
    agreementFile: undefined as File | undefined,
    agreementFileName: undefined as string | undefined,
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
          <WasteDataStep formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />
        )
      case 3:
        return (
          <ChemicalCompositionStep
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
          <CurrentDisposalStep
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )
      case 6:
        return (
          <CompanySuggestionStep
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )
      case 7:
        return (
          <AgreementStep
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )
      case 8:
        return <SendRequestStep formData={formData} prevStep={prevStep} listingType="seller" />
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
