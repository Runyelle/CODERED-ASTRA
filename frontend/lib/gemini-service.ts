import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '')

// Simple rate limiter to prevent quota exhaustion
let lastRequestTime = 0
const MIN_REQUEST_INTERVAL = 7000 // 7 seconds between requests (to stay under 10/minute limit)

// Simple cache to reduce API calls
const cache = new Map<string, EnvironmentalImpact>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

async function rateLimitedRequest<T>(requestFn: () => Promise<T>): Promise<T> {
  const now = Date.now()
  const timeSinceLastRequest = now - lastRequestTime
  
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    const waitTime = MIN_REQUEST_INTERVAL - timeSinceLastRequest
    console.log(`Rate limiting: waiting ${waitTime}ms before next request`)
    await new Promise(resolve => setTimeout(resolve, waitTime))
  }
  
  lastRequestTime = Date.now()
  return requestFn()
}

export interface EnvironmentalImpact {
  wasteProcessed: {
    total: number
    unit: string
    description: string
  }
  co2Reduced: {
    total: number
    unit: string
    description: string
  }
  energySaved: {
    total: number
    unit: string
    description: string
  }
  waterSaved: {
    total: number
    unit: string
    description: string
  }
}

export interface CompanyData {
  companyName: string
  industry: string
  size: 'small' | 'medium' | 'large' | 'enterprise'
  operations: string[]
  sustainabilityGoals: string[]
}

export async function calculateEnvironmentalImpact(
  companyData: CompanyData,
  timePeriod: 'monthly' | 'quarterly' | 'yearly' = 'monthly'
): Promise<EnvironmentalImpact> {
  // Create cache key
  const cacheKey = `${companyData.companyName}-${companyData.industry}-${companyData.size}-${timePeriod}`
  
  // Check cache first
  const cached = cache.get(cacheKey)
  if (cached) {
    console.log('Using cached environmental impact data')
    return cached
  }
  
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
    
    const prompt = `
    As an environmental sustainability expert, calculate the environmental impact metrics for ${companyData.companyName}, 
    a ${companyData.size} ${companyData.industry} company.
    
    Company Details:
    - Industry: ${companyData.industry}
    - Size: ${companyData.size}
    - Operations: ${companyData.operations.join(', ')}
    - Sustainability Goals: ${companyData.sustainabilityGoals.join(', ')}
    - Time Period: ${timePeriod}
    
    Please provide realistic calculations for:
    1. Waste Processed (in metric tons)
    2. CO2 Reduced (in metric tons)
    3. Energy Saved (in MWh)
    4. Water Saved (in cubic meters)
    
    Base your calculations on industry standards and the company's size and operations.
    Return the data in JSON format with the following structure:
    {
      "wasteProcessed": {
        "total": number,
        "unit": "metric tons",
        "description": "string"
      },
      "co2Reduced": {
        "total": number,
        "unit": "metric tons",
        "description": "string"
      },
      "energySaved": {
        "total": number,
        "unit": "MWh",
        "description": "string"
      },
      "waterSaved": {
        "total": number,
        "unit": "cubic meters",
        "description": "string"
      }
    }
    `

    // Use rate-limited request to prevent quota exhaustion
    const result = await rateLimitedRequest(async () => {
      return await model.generateContent(prompt)
    })
    
    const response = await result.response
    const text = response.text()
    
    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[0])
      // Cache the successful result
      cache.set(cacheKey, result)
      return result
    }
    
    // Fallback calculations if Gemini fails
    const fallbackResult = getFallbackCalculations(companyData, timePeriod)
    cache.set(cacheKey, fallbackResult)
    return fallbackResult
    
  } catch (error) {
    console.error('Error calculating environmental impact:', error)
    
    // Check if it's a quota error
    if (error instanceof Error && error.message.includes('quota')) {
      console.warn('Gemini API quota exceeded, using fallback calculations')
    }
    
    // Always return fallback calculations on any error
    const fallbackResult = getFallbackCalculations(companyData, timePeriod)
    cache.set(cacheKey, fallbackResult)
    return fallbackResult
  }
}

function getFallbackCalculations(
  companyData: CompanyData, 
  timePeriod: 'monthly' | 'quarterly' | 'yearly'
): EnvironmentalImpact {
  // Base calculations for ConocoPhillips (oil & gas industry)
  const multiplier = timePeriod === 'monthly' ? 1 : timePeriod === 'quarterly' ? 3 : 12
  
  return {
    wasteProcessed: {
      total: Math.round(150 * multiplier),
      unit: 'metric tons',
      description: 'Waste materials processed and recycled'
    },
    co2Reduced: {
      total: Math.round(2500 * multiplier),
      unit: 'metric tons',
      description: 'CO2 emissions reduced through efficiency improvements'
    },
    energySaved: {
      total: Math.round(1200 * multiplier),
      unit: 'MWh',
      description: 'Energy saved through optimization initiatives'
    },
    waterSaved: {
      total: Math.round(5000 * multiplier),
      unit: 'cubic meters',
      description: 'Water conserved through recycling and efficiency'
    }
  }
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}
