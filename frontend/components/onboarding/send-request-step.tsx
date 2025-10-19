"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle2, Send } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { saveSellerListing, saveBuyerListing, SellerListing, BuyerListing } from "@/lib/data-storage"

interface SendRequestStepProps {
  formData: any
  prevStep: () => void
  listingType?: 'seller' | 'buyer'
}

export function SendRequestStep({ formData, prevStep, listingType = 'seller' }: SendRequestStepProps) {
  const [submitted, setSubmitted] = useState(false)
  const router = useRouter()

  const handleSubmit = () => {
    try {
      if (listingType === 'seller') {
        const sellerData: Omit<SellerListing, 'id' | 'status' | 'createdAt' | 'updatedAt'> = {
          type: 'seller',
          companyName: formData.companyName,
          contactName: formData.contactName,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          wasteType: formData.wasteType,
          wasteDescription: formData.wasteDescription,
          chemicalComposition: formData.chemicalComposition || [],
          quantity: formData.quantity,
          unit: formData.unit,
          frequency: formData.frequency,
          currentDisposal: formData.currentDisposal,
          disposalCost: formData.disposalCost,
          selectedCompanies: formData.selectedCompanies || [],
          agreementFile: formData.agreementFile,
          agreementFileName: formData.agreementFileName,
        }
        saveSellerListing(sellerData)
      } else {
        const buyerData: Omit<BuyerListing, 'id' | 'status' | 'createdAt' | 'updatedAt'> = {
          type: 'buyer',
          companyName: formData.companyName,
          contactName: formData.contactName,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          materialType: formData.materialType,
          materialDescription: formData.materialDescription,
          materialSpecs: formData.materialSpecs || [],
          quantity: formData.quantity,
          unit: formData.unit,
          frequency: formData.frequency,
          currentSourcing: formData.currentSourcing,
          sourcingCost: formData.sourcingCost,
          selectedSuppliers: formData.selectedSuppliers || [],
        }
        saveBuyerListing(buyerData)
      }
      
      console.log(`[v0] Submitting ${listingType} onboarding data:`, formData)
      setSubmitted(true)
    } catch (error) {
      console.error('Error saving listing:', error)
      alert('Error saving your listing. Please try again.')
    }
  }

  const handleReturnToDashboard = () => {
    router.push("/dashboard")
  }

  if (submitted) {
    return (
      <Card className="border-border/50 bg-card/50 p-8 text-center backdrop-blur-sm">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="h-10 w-10 text-primary" />
        </div>
        <h2 className="mb-4 text-3xl font-bold text-foreground">Request Sent Successfully!</h2>
        <p className="mb-8 text-lg text-muted-foreground">
          Your connection requests have been sent to the selected companies. They will review your waste profile and
          reach out to you within 24-48 hours.
        </p>
        <div className="space-y-4">
          <div className="rounded-lg border border-border/50 bg-background/50 p-4">
            <h3 className="mb-2 font-semibold text-foreground">What happens next?</h3>
            <ul className="space-y-2 text-left text-sm text-muted-foreground">
              <li>• Companies will review your waste materials and requirements</li>
              <li>• You'll receive notifications when companies respond</li>
              <li>• You can negotiate terms and pricing directly with interested buyers</li>
              <li>• Our AI will continue to find new matches for your waste streams</li>
            </ul>
          </div>
        </div>
        <Button size="lg" className="mt-8" onClick={handleReturnToDashboard}>
          Return to Dashboard
        </Button>
      </Card>
    )
  }

  return (
    <Card className="border-border/50 bg-card/50 p-8 backdrop-blur-sm">
      <h2 className="mb-6 text-2xl font-bold text-foreground">Review & Send Request</h2>
      <div className="space-y-6">
        <div className="rounded-lg border border-border/50 bg-background/50 p-4">
          <h3 className="mb-3 font-semibold text-foreground">Company Information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Company:</span>
              <span className="font-medium text-foreground">{formData.companyName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Contact:</span>
              <span className="font-medium text-foreground">{formData.contactName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span className="font-medium text-foreground">{formData.email}</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border/50 bg-background/50 p-4">
          <h3 className="mb-3 font-semibold text-foreground">Waste Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Type:</span>
              <span className="font-medium text-foreground">{formData.wasteType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Quantity:</span>
              <span className="font-medium text-foreground">
                {formData.quantity} {formData.unit}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Location:</span>
              <span className="font-medium text-foreground">{formData.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Frequency:</span>
              <span className="font-medium text-foreground">{formData.frequency}</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border/50 bg-background/50 p-4">
          <h3 className="mb-3 font-semibold text-foreground">Selected Companies</h3>
          <div className="flex flex-wrap gap-2">
            {formData.selectedCompanies?.map((id: string) => (
              <Badge key={id} variant="secondary">
                Company {id}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <Button type="button" onClick={prevStep} variant="outline" className="gap-2 bg-transparent">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button onClick={handleSubmit} className="flex-1 gap-2">
          Send Requests
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}
