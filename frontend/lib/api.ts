const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'

export interface Company {
  id: string
  name: string
  type: 'producer' | 'consumer'
  industry: string
  location: {
    address: string
    city: string
    state: string
    zip: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  contact: {
    name: string
    title: string
    email: string
    phone: string
  }
  waste_stream?: {
    material: string
    category: string
    quantity_tons_year: number
    availability: string
    composition: Record<string, number>
    physical_properties: {
      state: string
      color: string
      particle_size: string
      moisture_content: string
    }
    current_disposal: {
      method: string
      cost_per_ton: number
      annual_cost: number
      hauling_distance_miles: number
    }
    certifications: string[]
    description: string
  }
  material_needs?: {
    material: string
    category: string
    quantity_tons_year: number
    frequency: string
    composition_needed: Record<string, number>
    specifications: {
      form: string
      purity_minimum?: string
      contamination?: string
      quality_standard?: string
    }
    current_sourcing: {
      primary_source: string
      cost_per_ton: number
      annual_cost: number
      transport_distance_miles: number
    }
    certifications_required: string[]
    description: string
  }
}

export interface Match {
  company_a: Company
  company_b: Company
  compatibility_score: number
  distance_km: number
  chemical_notes: string
  co2_reduction_tons: number
  cost_savings_usd: number
  regulatory_notes: string
}

export interface AnalyzeRequest {
  company_a: {
    id: string
    name: string
    latitude: number
    longitude: number
    waste_streams: Array<{
      name: string
      composition: Record<string, number>
    }>
    quantity: number
    disposal_cost: number
  }
  company_b: {
    id: string
    name: string
    latitude: number
    longitude: number
    needs: Array<{
      name: string
      composition: Record<string, number>
    }>
  }
}

export interface AnalyzeResponse {
  compatibility_score: number
  chemical_notes: string
  co2_reduction_tons: number
  cost_savings_usd: number
  regulatory_notes: string
}

export interface AskRequest {
  question: string
}

export interface AskResponse {
  answer: string
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    console.log(`Making API request to: ${url}`)
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })

      console.log(`API response status: ${response.status}`)

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log(`API response data:`, data)
      return data
    } catch (error) {
      console.error(`API request error:`, error)
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error(`Failed to connect to backend at ${this.baseUrl}. Make sure the backend server is running.`)
      }
      throw error
    }
  }

  // Load sample data
  async loadSampleData(): Promise<{ message: string; count: number }> {
    return this.request('/load-sample-data', { method: 'POST' })
  }

  // Get all companies
  async getCompanies(): Promise<Company[]> {
    return this.request('/companies/demo')
  }

  // Get company matches
  async getMatches(): Promise<Match[]> {
    return this.request('/companies/matches')
  }

  // Analyze compatibility between two companies
  async analyzeCompatibility(request: AnalyzeRequest): Promise<AnalyzeResponse> {
    return this.request('/analyze/', {
      method: 'POST',
      body: JSON.stringify(request),
    })
  }

  // Ask AI a question
  async askQuestion(request: AskRequest): Promise<AskResponse> {
    return this.request('/ask/', {
      method: 'POST',
      body: JSON.stringify(request),
    })
  }

  // Add a new company
  async addCompany(company: Partial<Company>): Promise<Company> {
    return this.request('/companies/', {
      method: 'POST',
      body: JSON.stringify(company),
    })
  }

  // Get API status
  async getStatus(): Promise<{ status: string; message: string; version: string }> {
    return this.request('/')
  }
}

export const apiClient = new ApiClient()
export default apiClient
