from typing import Dict, List, Optional
from pydantic import BaseModel, Field


class Material(BaseModel):
    """Represents a material with a component composition map."""

    name: str = Field(..., description="Human label for the material")
    composition: Dict[str, float] = Field(
        default_factory=dict,
        description="Map of component -> proportion (0..1 or 0..100).",
    )


class Company(BaseModel):
    """Company with location, waste streams, and needs."""
    
    id: str = Field(..., description="Unique company ID")
    name: str = Field(..., description="Company name")
    latitude: float = Field(..., ge=-90.0, le=90.0, description="Latitude in degrees")
    longitude: float = Field(..., ge=-180.0, le=180.0, description="Longitude in degrees")
    waste_streams: List[Material] = Field(
        default_factory=list, description="What this company produces as waste"
    )
    needs: List[Material] = Field(
        default_factory=list, description="What this company can accept/use as input"
    )
    quantity: Optional[float] = Field(None, description="Waste quantity in tons/year")
    disposal_cost: Optional[float] = Field(None, description="Disposal cost per ton in USD")


class AnalyzeRequest(BaseModel):
    """Request for waste stream compatibility analysis."""
    
    company_a: Company = Field(..., description="First company with waste streams")
    company_b: Company = Field(..., description="Second company with needs")


class AnalyzeResponse(BaseModel):
    """Response from waste stream compatibility analysis."""
    
    compatibility_score: int = Field(..., ge=0, le=100, description="Compatibility score 0-100")
    chemical_notes: str = Field(..., description="Chemical analysis summary")
    co2_reduction_tons: float = Field(..., description="CO₂ reduction potential in tons/year")
    cost_savings_usd: float = Field(..., description="Cost savings estimate in USD")
    regulatory_notes: str = Field(..., description="Regulatory or safety considerations")


class MatchResult(BaseModel):
    """Result of matching two companies."""
    
    company_a: Company
    company_b: Company
    compatibility_score: int = Field(..., ge=0, le=100)
    distance_km: float = Field(..., description="Distance between companies in km")
    chemical_notes: str = Field(..., description="Chemical analysis summary")
    co2_reduction_tons: float = Field(..., description="CO₂ reduction potential in tons/year")
    cost_savings_usd: float = Field(..., description="Cost savings estimate in USD")
    regulatory_notes: str = Field(..., description="Regulatory or safety considerations")


class AskRequest(BaseModel):
    """Request for conversational AI query."""
    
    question: str = Field(..., description="User question about waste management, regulations, or material compatibility")


class AskResponse(BaseModel):
    """Response from conversational AI query."""
    
    answer: str = Field(..., description="AI-generated response")


# Legacy models for backward compatibility
class Facility(BaseModel):
    """Legacy facility model for backward compatibility."""

    id: str = Field(..., description="Unique facility ID")
    name: str
    latitude: float = Field(..., ge=-90.0, le=90.0, description="Latitude in degrees")
    longitude: float = Field(..., ge=-180.0, le=180.0, description="Longitude in degrees")
    waste_streams: List[Material] = Field(
        default_factory=list, description="What this facility produces as waste"
    )
    needs: List[Material] = Field(
        default_factory=list, description="What this facility can accept/use as input"
    )


class Candidate(BaseModel):
    facility_id: str
    distance_km: float
    composition_similarity: float
    score: float
    matched_waste: Material
    matched_need: Material


class MatchResponse(BaseModel):
    source_facility: Facility
    candidates: List[Candidate]


class ExplainRequest(BaseModel):
    source: Facility
    candidate: Facility
    distance_km: float
    matched_waste: Material
    matched_need: Material
    score: float