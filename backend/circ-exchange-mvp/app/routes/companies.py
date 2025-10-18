from fastapi import APIRouter, HTTPException, status
from typing import List
from ...models import Company, MatchResult
from ...services.gemini_client import GeminiClient
from ...store import STORE
from ...matcher import haversine_km

router = APIRouter(prefix="/companies", tags=["companies"])


@router.post("/", response_model=Company)
async def add_company(company: Company):
    """
    Add a new company to the database.
    
    Company should include:
    - id, name, location (lat/lon)
    - waste_streams (materials + compositions)
    - needs (materials sought)
    - quantity & disposal_cost (optional)
    """
    try:
        STORE.upsert_company(company)
        return company
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to add company: {str(e)}"
        )


@router.get("/", response_model=List[Company])
async def list_companies():
    """
    List all companies in the database.
    """
    try:
        return STORE.list_companies()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to list companies: {str(e)}"
        )


@router.get("/matches", response_model=List[MatchResult])
async def get_matches():
    """
    Find the best matches among all companies using Gemini AI.
    
    This endpoint:
    1. Loops over all company combinations
    2. Sends each pair to Gemini for analysis
    3. Collects and ranks results by compatibility score
    4. Returns top matches
    """
    try:
        companies = STORE.list_companies()
        if len(companies) < 2:
            return []
        
        gemini_client = GeminiClient()
        matches = []
        
        # Analyze all possible pairs
        for i, company_a in enumerate(companies):
            for j, company_b in enumerate(companies[i+1:], i+1):
                try:
                    # Get Gemini analysis
                    analysis = gemini_client.analyze_waste_compatibility(company_a, company_b)
                    
                    # Calculate distance
                    distance_km = haversine_km(
                        company_a.latitude, company_a.longitude,
                        company_b.latitude, company_b.longitude
                    )
                    
                    # Create match result
                    match = MatchResult(
                        company_a=company_a,
                        company_b=company_b,
                        compatibility_score=analysis.compatibility_score,
                        distance_km=distance_km,
                        chemical_notes=analysis.chemical_notes,
                        co2_reduction_tons=analysis.co2_reduction_tons,
                        cost_savings_usd=analysis.cost_savings_usd,
                        regulatory_notes=analysis.regulatory_notes
                    )
                    
                    matches.append(match)
                    
                except Exception as e:
                    # Skip this pair if analysis fails
                    continue
        
        # Sort by compatibility score (descending) and return top 10
        matches.sort(key=lambda x: x.compatibility_score, reverse=True)
        return matches[:10]
        
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to find matches: {str(e)}"
        )
