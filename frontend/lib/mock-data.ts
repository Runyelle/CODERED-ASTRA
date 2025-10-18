import { getAllCompanies } from './api';
import type { Company as BackendCompany } from '@/types/company';

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

export interface WasteStreamData {
  companyName: string
  wasteType: string
  chemicalComposition: string
  quantity: number
  unit: string
  location: string
  currentDisposal: string
}

// Convert backend company format to frontend format
function convertCompany(backendCompany: BackendCompany): Company {
  const isProducer = backendCompany.type === 'producer';
  const wasteTypes: string[] = [];
  const certifications: string[] = [];
  
  if (isProducer && backendCompany.waste_stream) {
    wasteTypes.push(backendCompany.waste_stream.category);
    certifications.push(...backendCompany.waste_stream.certifications);
  } else if (backendCompany.material_needs) {
    wasteTypes.push(backendCompany.material_needs.category);
    certifications.push(...backendCompany.material_needs.certifications_required);
  }
  
  return {
    id: backendCompany.id.toString(),
    name: backendCompany.name,
    industry: backendCompany.industry,
    location: `${backendCompany.location.city}, ${backendCompany.location.state}`,
    wasteCapacity: isProducer 
      ? (backendCompany.waste_stream?.quantity_tons_year || 0)
      : (backendCompany.material_needs?.quantity_tons_year || 0),
    acceptedWasteTypes: wasteTypes,
    certifications: certifications,
    rating: 4.5 + Math.random() * 0.5, // Generate rating between 4.5-5.0
  };
}

export async function getRandomCompany(): Promise<Company> {
  const companies = await getAllCompanies();
  const converted = companies.map(convertCompany);
  return converted[Math.floor(Math.random() * converted.length)];
}

export async function findMatchingCompanies(wasteData: WasteStreamData): Promise<Company[]> {
  const companies = await getAllCompanies();
  const converted = companies.map(convertCompany);
  
  return converted
    .filter((company) =>
      company.acceptedWasteTypes.some((type) => 
        wasteData.wasteType.toLowerCase().includes(type.toLowerCase()) ||
        type.toLowerCase().includes(wasteData.wasteType.toLowerCase())
      ),
    )
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);
}

// Export mock companies for backward compatibility, but fetch from backend
export let mockCompanies: Company[] = [];

// Initialize mock companies from backend
if (typeof window !== 'undefined') {
  getAllCompanies()
    .then(companies => {
      mockCompanies = companies.map(convertCompany);
    })
    .catch(err => {
      console.error('Failed to load companies from backend:', err);
    });
}
