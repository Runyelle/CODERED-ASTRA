"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function OnboardingPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to sell onboarding by default
    router.replace("/onboarding/sell")
  }, [router])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Redirecting to onboarding...</p>
      </div>
    </div>
  )
}
