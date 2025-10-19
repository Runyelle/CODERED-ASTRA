"use client"

import { useState, useEffect } from 'react'
import { calculateEnvironmentalImpact, type EnvironmentalImpact, type CompanyData } from '@/lib/gemini-service'

export function useEnvironmentalImpact(companyData: CompanyData, timePeriod: 'monthly' | 'quarterly' | 'yearly' = 'monthly') {
  const [impact, setImpact] = useState<EnvironmentalImpact | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchImpact = async () => {
      try {
        setLoading(true)
        setError(null)
        const result = await calculateEnvironmentalImpact(companyData, timePeriod)
        setImpact(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to calculate environmental impact')
        console.error('Error fetching environmental impact:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchImpact()
  }, [companyData, timePeriod])

  return { impact, loading, error }
}
