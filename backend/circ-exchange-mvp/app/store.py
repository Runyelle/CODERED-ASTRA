from typing import Dict, List, Optional, Union
from .models import Facility, Company

class InMemoryStore:
    def __init__(self) -> None:
        self.facilities: Dict[str, Facility] = {}
        self.companies: Dict[str, Company] = {}

    def upsert_facility(self, facility: Facility) -> None:
        self.facilities[facility.id] = facility

    def list_facilities(self) -> List[Facility]:
        return list(self.facilities.values())

    def get_facility(self, facility_id: str) -> Optional[Facility]:
        return self.facilities.get(facility_id)
    
    def upsert_company(self, company: Company) -> None:
        self.companies[company.id] = company

    def list_companies(self) -> List[Company]:
        return list(self.companies.values())

    def get_company(self, company_id: str) -> Optional[Company]:
        return self.companies.get(company_id)
    
    def upsert_company_from_dict(self, company_dict: dict) -> None:
        """Add a company from dictionary data (new structure)."""
        # Store the raw dictionary data for now
        company_id = str(company_dict.get('id', ''))
        self.companies[company_id] = company_dict
    
    def clear_all(self) -> None:
        """Clear all data from the store."""
        self.facilities.clear()
        self.companies.clear()

STORE = InMemoryStore()
