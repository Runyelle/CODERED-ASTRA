"use client"

import { useState, useEffect, useCallback } from 'react'
import { apiClient, Company, Match, AnalyzeRequest, AnalyzeResponse, AskRequest, AskResponse } from '@/lib/api'

export function useCompanies() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCompanies = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await apiClient.getCompanies()
      setCompanies(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch companies')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCompanies()
  }, [fetchCompanies])

  return { companies, loading, error, refetch: fetchCompanies }
}

export function useMatches() {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchMatches = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await apiClient.getMatches()
      setMatches(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch matches')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMatches()
  }, [fetchMatches])

  return { matches, loading, error, refetch: fetchMatches }
}

export function useAnalyze() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const analyze = useCallback(async (request: AnalyzeRequest): Promise<AnalyzeResponse | null> => {
    setLoading(true)
    setError(null)
    try {
      const result = await apiClient.analyzeCompatibility(request)
      return result
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  return { analyze, loading, error }
}

export function useAsk() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const ask = useCallback(async (request: AskRequest): Promise<string | null> => {
    setLoading(true)
    setError(null)
    try {
      const result = await apiClient.askQuestion(request)
      return result.answer
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get AI response')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  return { ask, loading, error }
}

export function useLoadSampleData() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadSampleData = useCallback(async (): Promise<boolean> => {
    setLoading(true)
    setError(null)
    try {
      await apiClient.loadSampleData()
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load sample data')
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  return { loadSampleData, loading, error }
}
