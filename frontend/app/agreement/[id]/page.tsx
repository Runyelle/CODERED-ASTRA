"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  ArrowLeft, 
  FileText, 
  Download, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Building2,
  MapPin,
  Calendar,
  Package,
  DollarSign
} from "lucide-react"
import { getSellerListings, getBuyerListings, updateSellerListingStatus, updateBuyerListingStatus } from "@/lib/data-storage"
import { createNotification, addNotification } from "@/components/notifications"
import type { SellerListing, BuyerListing } from "@/lib/data-storage"

export default function AgreementPage() {
  const params = useParams()
  const router = useRouter()
  const listingId = params.id as string
  
  const [listing, setListing] = useState<SellerListing | BuyerListing | null>(null)
  const [loading, setLoading] = useState(true)
  const [agreementAccepted, setAgreementAccepted] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    // Load listing data
    const sellers = getSellerListings()
    const buyers = getBuyerListings()
    const allListings = [...sellers, ...buyers]
    const foundListing = allListings.find(l => l.id === listingId)
    
    if (foundListing) {
      setListing(foundListing)
    }
    setLoading(false)
  }, [listingId])

  const handleAcceptAgreement = async () => {
    if (!listing || !termsAccepted) return
    
    setSubmitting(true)
    
    try {
      // Update listing status based on type
      if (listing.type === 'seller') {
        updateSellerListingStatus(listingId, 'accepted')
      } else {
        updateBuyerListingStatus(listingId, 'accepted')
      }
      
      // Create notification
      const notification = createNotification(
        'agreement_accepted',
        'Agreement Accepted',
        `You have accepted the agreement with ${listing.companyName} for ${listing.type === 'seller' ? (listing as SellerListing).wasteType : (listing as BuyerListing).materialType}`,
        listingId,
        listing.type
      )
      addNotification(notification)
      
      setAgreementAccepted(true)
      
      // Show success message
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    } catch (error) {
      console.error('Error accepting agreement:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeclineAgreement = async () => {
    if (!listing) return
    
    setSubmitting(true)
    
    try {
      // Update listing status to declined
      if (listing.type === 'seller') {
        updateSellerListingStatus(listingId, 'declined')
      } else {
        updateBuyerListingStatus(listingId, 'declined')
      }
      
      // Create notification
      const notification = createNotification(
        'agreement_declined',
        'Agreement Declined',
        `You have declined the agreement with ${listing.companyName} for ${listing.type === 'seller' ? (listing as SellerListing).wasteType : (listing as BuyerListing).materialType}`,
        listingId,
        listing.type
      )
      addNotification(notification)
      
      // Redirect back to dashboard
      router.push('/dashboard')
    } catch (error) {
      console.error('Error declining agreement:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const downloadAgreement = () => {
    // Create a sample agreement PDF content
    const agreementContent = `
WASTE MATERIAL AGREEMENT

Company: ${listing?.companyName}
Contact: ${listing?.contactName}
Email: ${listing?.email}
Phone: ${listing?.phone}
Location: ${listing?.location}

MATERIAL DETAILS:
${listing?.type === 'seller' ? `Waste Type: ${(listing as SellerListing).wasteType}` : `Material Type: ${(listing as BuyerListing).materialType}`}
Quantity: ${listing?.quantity} ${listing?.unit}
Frequency: ${listing?.frequency}

TERMS AND CONDITIONS:
1. All materials must meet specified quality standards
2. Delivery schedule must be adhered to as agreed
3. Payment terms: Net 30 days from delivery
4. Quality inspection required before acceptance
5. Environmental compliance is mandatory
6. Insurance coverage required for transportation
7. Force majeure clauses apply
8. Dispute resolution through arbitration
9. Confidentiality of business information
10. Compliance with all applicable regulations

This agreement is binding upon acceptance by both parties.

Generated on: ${new Date().toLocaleDateString()}
    `
    
    const blob = new Blob([agreementContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `agreement-${listing?.companyName}-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading agreement...</p>
        </div>
      </div>
    )
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Agreement Not Found</h2>
            <p className="text-muted-foreground mb-4">The requested agreement could not be found.</p>
            <Button onClick={() => router.push('/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (agreementAccepted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Agreement Accepted!</h2>
            <p className="text-muted-foreground mb-4">
              You have successfully accepted the agreement. You will be redirected to the dashboard.
            </p>
            <Button onClick={() => router.push('/dashboard')}>
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="flex items-center gap-3 mb-2">
            <FileText className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Agreement Details</h1>
          </div>
          <p className="text-muted-foreground">
            Review and accept the terms and conditions for this {listing.type} listing
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Agreement Content */}
          <div className="lg:col-span-2">
            <Card className="glass-card border-border/40">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Agreement Document
                </CardTitle>
                <CardDescription>
                  Please review the terms and conditions below
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Company Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Company Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span>{listing.companyName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{listing.location || 'Location not specified'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{new Date(listing.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <span>{listing.frequency}</span>
                    </div>
                  </div>
                </div>

                {/* Material Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Material Details</h3>
                  <div className="bg-muted/20 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Type:</span>
                        <p className="text-muted-foreground">
                          {listing.type === 'seller' 
                            ? (listing as SellerListing).wasteType 
                            : (listing as BuyerListing).materialType
                          }
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">Quantity:</span>
                        <p className="text-muted-foreground">
                          {listing.quantity} {listing.unit}
                        </p>
                      </div>
                      {listing.type === 'seller' && (
                        <div>
                          <span className="font-medium">Disposal Cost:</span>
                          <p className="text-muted-foreground">
                            ${(listing as SellerListing).disposalCost}/ton
                          </p>
                        </div>
                      )}
                      {listing.type === 'buyer' && (
                        <div>
                          <span className="font-medium">Current Cost:</span>
                          <p className="text-muted-foreground">
                            ${(listing as BuyerListing).sourcingCost}/ton
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Terms and Conditions</h3>
                  <div className="bg-muted/20 p-4 rounded-lg space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="font-medium">1.</span>
                      <span>All materials must meet specified quality standards and environmental regulations.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-medium">2.</span>
                      <span>Delivery schedule must be adhered to as agreed upon in the contract.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-medium">3.</span>
                      <span>Payment terms: Net 30 days from delivery and acceptance of materials.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-medium">4.</span>
                      <span>Quality inspection required before acceptance of any materials.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-medium">5.</span>
                      <span>Environmental compliance is mandatory for all parties involved.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-medium">6.</span>
                      <span>Insurance coverage required for transportation and liability.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-medium">7.</span>
                      <span>Force majeure clauses apply for circumstances beyond control.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-medium">8.</span>
                      <span>Dispute resolution through binding arbitration.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-medium">9.</span>
                      <span>Confidentiality of business information must be maintained.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-medium">10.</span>
                      <span>Compliance with all applicable local, state, and federal regulations.</span>
                    </div>
                  </div>
                </div>

                {/* Agreement Actions */}
                <div className="flex gap-4 pt-4 border-t">
                  <Button onClick={downloadAgreement} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download Agreement
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Panel */}
          <div className="space-y-6">
            <Card className="glass-card border-border/40">
              <CardHeader>
                <CardTitle>Agreement Actions</CardTitle>
                <CardDescription>
                  Review and accept the terms to proceed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Checkbox 
                    id="terms" 
                    checked={termsAccepted}
                    onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                  />
                  <label htmlFor="terms" className="text-sm leading-relaxed">
                    I have read and agree to the terms and conditions outlined in this agreement. 
                    I understand that this is a binding contract and will be held accountable for compliance.
                  </label>
                </div>

                <div className="space-y-3">
                  <Button 
                    onClick={handleAcceptAgreement}
                    disabled={!termsAccepted || submitting}
                    className="w-full"
                  >
                    {submitting ? (
                      <>
                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Accept Agreement
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    onClick={handleDeclineAgreement}
                    variant="outline"
                    disabled={submitting}
                    className="w-full"
                  >
                    Decline Agreement
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• Agreement is legally binding upon acceptance</p>
                  <p>• You will receive a confirmation email</p>
                  <p>• Contact information will be shared with the other party</p>
                </div>
              </CardContent>
            </Card>

            {/* Status Information */}
            <Card className="glass-card border-border/40">
              <CardHeader>
                <CardTitle className="text-sm">Agreement Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Created:</span>
                    <span>{new Date(listing.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="capitalize">{listing.type}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
