"use client"

import { useEffect, useState } from "react"
import { useLoadSampleData } from "@/hooks/use-api"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"

export function DataInitializer() {
  const { loadSampleData, loading, error } = useLoadSampleData()
  const [initialized, setInitialized] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted on client side
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const initializeData = async (retries = 5) => {
      try {
        console.log('Attempting to load sample data...')
        const success = await loadSampleData()
        if (success) {
          console.log('Sample data loaded successfully')
          setInitialized(true)
        }
      } catch (err) {
        console.error('Failed to initialize data:', err)
        if (retries > 0) {
          console.log(`Retrying in 3 seconds... (${retries} retries left)`)
          setTimeout(() => initializeData(retries - 1), 3000)
        } else {
          console.error('Failed to load sample data after all retries')
        }
      }
    }

    // Only initialize if not already done
    const hasInitialized = localStorage.getItem('data-initialized')
    if (!hasInitialized) {
      // Wait a bit for the backend to be ready
      setTimeout(() => initializeData(), 1000)
    } else {
      setInitialized(true)
    }
  }, [loadSampleData, mounted])

  useEffect(() => {
    if (initialized && mounted) {
      localStorage.setItem('data-initialized', 'true')
    }
  }, [initialized, mounted])

  // Don't render anything until mounted
  if (!mounted) {
    return null
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
          <div className="flex items-center gap-3">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <span>Loading sample data...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
          <div className="flex items-center gap-3 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <span>Failed to load data: {error}</span>
          </div>
        </div>
      </div>
    )
  }

  if (initialized) {
    return (
      <div className="fixed top-4 right-4 z-40">
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Data loaded</span>
          </div>
        </div>
      </div>
    )
  }

  return null
}
