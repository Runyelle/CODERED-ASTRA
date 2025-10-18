export interface Location {
  address: string;
  city: string;
  state: string;
  zip: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Contact {
  name: string;
  title: string;
  email: string;
  phone: string;
}

export interface WasteStream {
  material: string;
  category: string;
  quantity_tons_year: number;
  availability: string;
  composition: Record<string, number>;
  physical_properties: Record<string, string | number>;
  current_disposal: {
    method: string;
    cost_per_ton: number;
    annual_cost: number;
    hauling_distance_miles: number;
  };
  certifications: string[];
  description: string;
}

export interface MaterialNeeds {
  material: string;
  category: string;
  quantity_tons_year: number;
  frequency: string;
  composition_needed: Record<string, number>;
  specifications: Record<string, string>;
  current_sourcing: {
    primary_source: string;
    cost_per_ton: number;
    annual_cost: number;
    transport_distance_miles: number;
  };
  certifications_required: string[];
  description: string;
}

export interface Company {
  id: number;
  name: string;
  type: 'producer' | 'consumer';
  industry: string;
  location: Location;
  contact: Contact;
  waste_stream?: WasteStream;
  material_needs?: MaterialNeeds;
}
