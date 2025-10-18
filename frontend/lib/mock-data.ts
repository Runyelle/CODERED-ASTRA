export interface Company {
  id: string
  name: string
  industry: string
  location: string
  wasteCapacity: number
  acceptedWasteTypes: string[]
  certifications: string[]
  rating: number
}

export const mockCompanies: Company[] = [
  {
    id: "1",
    name: "EcoRecycle Solutions",
    industry: "Waste Management",
    location: "Houston, TX",
    wasteCapacity: 50000,
    acceptedWasteTypes: ["Chemical", "Industrial", "Hazardous"],
    certifications: ["EPA Certified", "ISO 14001", "RCRA Permitted"],
    rating: 4.8,
  },
  {
    id: "2",
    name: "GreenTech Disposal",
    industry: "Environmental Services",
    location: "Denver, CO",
    wasteCapacity: 35000,
    acceptedWasteTypes: ["Chemical", "Organic", "Industrial"],
    certifications: ["EPA Certified", "ISO 14001"],
    rating: 4.6,
  },
  {
    id: "3",
    name: "Industrial Waste Partners",
    industry: "Waste Management",
    location: "Midland, TX",
    wasteCapacity: 75000,
    acceptedWasteTypes: ["Hazardous", "Chemical", "Petroleum"],
    certifications: ["EPA Certified", "RCRA Permitted", "DOT Certified"],
    rating: 4.9,
  },
  {
    id: "4",
    name: "Sustainable Solutions Inc",
    industry: "Environmental Services",
    location: "Oklahoma City, OK",
    wasteCapacity: 40000,
    acceptedWasteTypes: ["Industrial", "Chemical", "Non-Hazardous"],
    certifications: ["EPA Certified", "ISO 14001"],
    rating: 4.5,
  },
  {
    id: "5",
    name: "CleanStream Environmental",
    industry: "Waste Management",
    location: "Tulsa, OK",
    wasteCapacity: 60000,
    acceptedWasteTypes: ["Chemical", "Hazardous", "Industrial", "Petroleum"],
    certifications: ["EPA Certified", "RCRA Permitted", "ISO 14001", "DOT Certified"],
    rating: 4.7,
  },
]

export interface WasteStreamData {
  companyName: string
  wasteType: string
  chemicalComposition: string
  quantity: number
  unit: string
  location: string
  currentDisposal: string
}

export function getRandomCompany(): Company {
  return mockCompanies[Math.floor(Math.random() * mockCompanies.length)]
}

export function findMatchingCompanies(wasteData: WasteStreamData): Company[] {
  return mockCompanies
    .filter((company) =>
      company.acceptedWasteTypes.some((type) => wasteData.wasteType.toLowerCase().includes(type.toLowerCase())),
    )
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3)
}
