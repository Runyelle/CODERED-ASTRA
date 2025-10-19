// Data storage utilities for buyer and seller listings

export interface BaseListing {
  id: string
  companyName: string
  contactName: string
  email: string
  phone: string
  location: string
  status: 'pending' | 'accepted' | 'declined'
  createdAt: string
  updatedAt: string
}

export interface SellerListing extends BaseListing {
  type: 'seller'
  wasteType: string
  wasteDescription: string
  chemicalComposition: { chemical: string; percentage: string }[]
  quantity: string
  unit: string
  frequency: string
  currentDisposal: string
  disposalCost: string
  selectedCompanies: string[]
  agreementFile?: File
  agreementFileName?: string
}

export interface BuyerListing extends BaseListing {
  type: 'buyer'
  materialType: string
  materialDescription: string
  materialSpecs: { spec: string; value: string }[]
  quantity: string
  unit: string
  frequency: string
  currentSourcing: string
  sourcingCost: string
  selectedSuppliers: string[]
}

export type Listing = SellerListing | BuyerListing

// Generate unique ID
const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Get current timestamp
const getTimestamp = (): string => {
  return new Date().toISOString()
}

// Storage keys
const SELLER_LISTINGS_KEY = 'wasteflow_seller_listings'
const BUYER_LISTINGS_KEY = 'wasteflow_buyer_listings'

// Initialize storage on page load (clear for demo)
const initializeStorage = () => {
  if (typeof window !== 'undefined') {
    // Clear storage on page refresh for demo purposes
    localStorage.removeItem(SELLER_LISTINGS_KEY)
    localStorage.removeItem(BUYER_LISTINGS_KEY)
  }
}

// Initialize on module load - only on client side
if (typeof window !== 'undefined') {
  // Use setTimeout to ensure this runs after React hydration
  setTimeout(() => {
    initializeStorage()
  }, 0)
}

// Test API connection
export const testApiConnection = async (): Promise<boolean> => {
  try {
    const response = await fetch('http://localhost:8001/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.ok
  } catch (error) {
    console.error('API connection test failed:', error)
    return false
  }
}

// Seller listing functions
export const saveSellerListing = (data: Omit<SellerListing, 'id' | 'status' | 'createdAt' | 'updatedAt'>): SellerListing => {
  const listing: SellerListing = {
    ...data,
    id: generateId(),
    status: 'pending',
    createdAt: getTimestamp(),
    updatedAt: getTimestamp(),
  }

  if (typeof window !== 'undefined') {
    const existing = getSellerListings()
    const updated = [...existing, listing]
    localStorage.setItem(SELLER_LISTINGS_KEY, JSON.stringify(updated))
  }

  return listing
}

export const getSellerListings = (): SellerListing[] => {
  if (typeof window === 'undefined') return []
  
  try {
    const data = localStorage.getItem(SELLER_LISTINGS_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export const updateSellerListingStatus = (id: string, status: 'pending' | 'accepted' | 'declined'): void => {
  if (typeof window === 'undefined') return

  const listings = getSellerListings()
  const updated = listings.map(listing => 
    listing.id === id 
      ? { ...listing, status, updatedAt: getTimestamp() }
      : listing
  )
  localStorage.setItem(SELLER_LISTINGS_KEY, JSON.stringify(updated))
}

// Buyer listing functions
export const saveBuyerListing = (data: Omit<BuyerListing, 'id' | 'status' | 'createdAt' | 'updatedAt'>): BuyerListing => {
  const listing: BuyerListing = {
    ...data,
    id: generateId(),
    status: 'pending',
    createdAt: getTimestamp(),
    updatedAt: getTimestamp(),
  }

  if (typeof window !== 'undefined') {
    const existing = getBuyerListings()
    const updated = [...existing, listing]
    localStorage.setItem(BUYER_LISTINGS_KEY, JSON.stringify(updated))
  }

  return listing
}

export const getBuyerListings = (): BuyerListing[] => {
  if (typeof window === 'undefined') return []
  
  try {
    const data = localStorage.getItem(BUYER_LISTINGS_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export const updateBuyerListingStatus = (id: string, status: 'pending' | 'accepted' | 'declined'): void => {
  if (typeof window === 'undefined') return

  const listings = getBuyerListings()
  const updated = listings.map(listing => 
    listing.id === id 
      ? { ...listing, status, updatedAt: getTimestamp() }
      : listing
  )
  localStorage.setItem(BUYER_LISTINGS_KEY, JSON.stringify(updated))
}

// Search functions - searches sample data from backend, not user's own listings
export const searchListings = async (
  query: string,
  materialType?: string,
  location?: string,
  listingType?: 'seller' | 'buyer'
): Promise<Listing[]> => {
  try {
    // Fetch sample data from backend API
    const response = await fetch('http://localhost:8001/companies/demo', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      console.error('Failed to fetch sample data:', response.status, response.statusText)
      return []
    }
    
    const data = await response.json()
    const companies = Array.isArray(data) ? data : (data.companies || [])
    
    // Filter companies based on search criteria
    let results = companies.filter((company: any) => {
      const isSeller = company.type === 'producer' && company.waste_stream
      const isBuyer = company.type === 'consumer' && company.material_needs
      
      // Check if company matches the listing type filter
      if (listingType === 'seller' && !isSeller) return false
      if (listingType === 'buyer' && !isBuyer) return false
      
      // Check query match
      const matchesQuery = !query || 
        company.name.toLowerCase().includes(query.toLowerCase()) ||
        company.industry.toLowerCase().includes(query.toLowerCase()) ||
        (isSeller && company.waste_stream?.material?.toLowerCase().includes(query.toLowerCase())) ||
        (isBuyer && company.material_needs?.material?.toLowerCase().includes(query.toLowerCase()))

      // Check material type match
      const matchesMaterial = !materialType || 
        (isSeller && company.waste_stream?.material?.toLowerCase().includes(materialType.toLowerCase())) ||
        (isBuyer && company.material_needs?.material?.toLowerCase().includes(materialType.toLowerCase()))

      // Check location match
      const matchesLocation = !location || 
        company.location?.city?.toLowerCase().includes(location.toLowerCase()) ||
        company.location?.state?.toLowerCase().includes(location.toLowerCase())

      return matchesQuery && matchesMaterial && matchesLocation
    })

    // Transform to our listing format
    return results.map((company: any) => ({
      id: company.id.toString(),
      companyName: company.name,
      contactName: company.contact?.name || '',
      email: company.contact?.email || '',
      phone: company.contact?.phone || '',
      location: `${company.location?.city}, ${company.location?.state}`,
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      type: company.type === 'producer' ? 'seller' as const : 'buyer' as const,
      ...(company.type === 'producer' ? {
        wasteType: company.waste_stream?.material || '',
        wasteDescription: company.waste_stream?.description || '',
        chemicalComposition: [],
        quantity: company.waste_stream?.quantity_tons_year?.toString() || '',
        unit: 'tons',
        frequency: company.waste_stream?.availability || '',
        currentDisposal: company.waste_stream?.current_disposal?.method || '',
        disposalCost: company.waste_stream?.current_disposal?.cost_per_ton?.toString() || '',
        selectedCompanies: [],
      } : {
        materialType: company.material_needs?.material || '',
        materialDescription: company.material_needs?.description || '',
        materialSpecs: [],
        quantity: company.material_needs?.quantity_tons_year?.toString() || '',
        unit: 'tons',
        frequency: company.material_needs?.frequency || '',
        currentSourcing: company.material_needs?.current_sourcing?.primary_source || '',
        sourcingCost: company.material_needs?.current_sourcing?.cost_per_ton?.toString() || '',
        selectedSuppliers: [],
      })
    }))
  } catch (error) {
    console.error('Error searching listings:', error)
    console.error('Make sure the backend server is running on http://localhost:8001')
    return []
  }
}

// Get unique materials and locations for dropdowns from sample data
export const getUniqueMaterials = async (): Promise<string[]> => {
  try {
    const response = await fetch('http://localhost:8001/companies/demo', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      console.error('Failed to fetch materials:', response.status, response.statusText)
      return []
    }
    
    const data = await response.json()
    const companies = Array.isArray(data) ? data : (data.companies || [])
    
    const materials = new Set<string>()
    companies.forEach((company: any) => {
      if (company.waste_stream?.material) {
        materials.add(company.waste_stream.material)
      }
      if (company.material_needs?.material) {
        materials.add(company.material_needs.material)
      }
    })
    
    return Array.from(materials).sort()
  } catch (error) {
    console.error('Error fetching materials:', error)
    return []
  }
}

export const getUniqueLocations = async (): Promise<string[]> => {
  try {
    const response = await fetch('http://localhost:8001/companies/demo', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      console.error('Failed to fetch locations:', response.status, response.statusText)
      return []
    }
    
    const data = await response.json()
    const companies = Array.isArray(data) ? data : (data.companies || [])
    
    const locations = new Set<string>()
    companies.forEach((company: any) => {
      if (company.location?.city && company.location?.state) {
        locations.add(`${company.location.city}, ${company.location.state}`)
      }
    })
    
    return Array.from(locations).sort()
  } catch (error) {
    console.error('Error fetching locations:', error)
    return []
  }
}
