from typing import Dict, List
from .models import Facility, Company

class InMemoryStore:
    def __init__(self) -> None:
        self.facilities: Dict[str, Facility] = {}
        self.companies: Dict[str, Company] = {}

    def upsert_facility(self, facility: Facility) -> None:
        self.facilities[facility.id] = facility

    def list_facilities(self) -> List[Facility]:
        return list(self.facilities.values())

    def get_facility(self, facility_id: str) -> Facility | None:
        return self.facilities.get(facility_id)
    
    def upsert_company(self, company: Company) -> None:
        self.companies[company.id] = company

    def list_companies(self) -> List[Company]:
        return list(self.companies.values())

    def get_company(self, company_id: str) -> Company | None:
        return self.companies.get(company_id)

STORE = InMemoryStore()
