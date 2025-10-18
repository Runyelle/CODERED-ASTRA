"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, MapPin, Star, Award, Send, ArrowLeft } from "lucide-react"
import { findMatchingCompanies, type Company, type WasteStreamData } from "@/lib/mock-data"

export default function MatchPage() {
  const router = useRouter()
  const [wasteData, setWasteData] = useState<WasteStreamData | null>(null)
  const [matchedCompanies, setMatchedCompanies] = useState<Company[]>([])
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [requestSent, setRequestSent] = useState(false)

  useEffect(() => {
    const loadMatches = async () => {
      const data = sessionStorage.getItem("wasteStreamData")
      if (data) {
        const parsedData = JSON.parse(data) as WasteStreamData
        setWasteData(parsedData)
        try {
          const matches = await findMatchingCompanies(parsedData)
          setMatchedCompanies(matches)
          if (matches.length > 0) {
            setSelectedCompany(matches[0])
          }
        } catch (error) {
          console.error('Failed to fetch matching companies:', error)
        }
      } else {
        router.push("/onboarding")
      }
    }
    loadMatches()
  }, [router])

  const handleSendRequest = () => {
    if (selectedCompany) {
      setRequestSent(true)
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    }
  }

  if (!wasteData) {
    return null
  }

  if (requestSent) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
          <Card className="w-full max-w-md text-center">
            <CardHeader>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Request Sent Successfully!</CardTitle>
              <CardDescription>
                Your waste disposal request has been sent to {selectedCompany?.name}. They will review your information
                and contact you shortly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Redirecting to your dashboard...</p>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <Button variant="ghost" onClick={() => router.push("/onboarding")} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Form
          </Button>

          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-foreground">Matching Results</h1>
            <p className="text-muted-foreground">
              We found {matchedCompanies.length} certified partners that can handle your waste stream
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column: Your Waste Stream Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Your Waste Stream</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="mb-1 text-sm font-medium text-muted-foreground">Company</div>
                    <div className="text-sm text-foreground">{wasteData.companyName}</div>
                  </div>
                  <Separator />
                  <div>
                    <div className="mb-1 text-sm font-medium text-muted-foreground">Waste Type</div>
                    <Badge variant="secondary">{wasteData.wasteType}</Badge>
                  </div>
                  <Separator />
                  <div>
                    <div className="mb-1 text-sm font-medium text-muted-foreground">Quantity</div>
                    <div className="text-sm text-foreground">
                      {wasteData.quantity} {wasteData.unit}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <div className="mb-1 text-sm font-medium text-muted-foreground">Location</div>
                    <div className="flex items-center gap-1 text-sm text-foreground">
                      <MapPin className="h-3 w-3" />
                      {wasteData.location}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Matched Companies */}
            <div className="space-y-6 lg:col-span-2">
              {matchedCompanies.map((company, index) => (
                <Card
                  key={company.id}
                  className={`cursor-pointer transition-all ${
                    selectedCompany?.id === company.id
                      ? "border-primary ring-2 ring-primary/20"
                      : "hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedCompany(company)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <CardTitle>{company.name}</CardTitle>
                          {index === 0 && (
                            <Badge variant="default" className="bg-primary">
                              Best Match
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {company.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-primary text-primary" />
                            {company.rating}
                          </span>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="mb-2 text-sm font-medium text-foreground">Industry</div>
                      <div className="text-sm text-muted-foreground">{company.industry}</div>
                    </div>

                    <div>
                      <div className="mb-2 text-sm font-medium text-foreground">Waste Capacity</div>
                      <div className="text-sm text-muted-foreground">
                        {company.wasteCapacity.toLocaleString()} tons/year
                      </div>
                    </div>

                    <div>
                      <div className="mb-2 text-sm font-medium text-foreground">Accepted Waste Types</div>
                      <div className="flex flex-wrap gap-2">
                        {company.acceptedWasteTypes.map((type) => (
                          <Badge key={type} variant="outline">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                        <Award className="h-4 w-4 text-primary" />
                        Certifications
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {company.certifications.map((cert) => (
                          <Badge key={cert} variant="secondary">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {selectedCompany?.id === company.id && (
                      <div className="pt-4">
                        <Button onClick={handleSendRequest} className="w-full">
                          <Send className="mr-2 h-4 w-4" />
                          Send Request to {company.name}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              {matchedCompanies.length === 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>No Matches Found</CardTitle>
                    <CardDescription>
                      We couldn't find any partners that match your waste stream requirements. Please contact our
                      support team for assistance.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline">Contact Support</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
