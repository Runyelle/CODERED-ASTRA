from fastapi import APIRouter, HTTPException, status
from typing import List
from ..models import Company, MatchResult
from ..services.gemini_client import GeminiClient
from ..store import STORE
from ..matcher import haversine_km
import json
from pathlib import Path

router = APIRouter(prefix="/companies", tags=["companies"])

def load_fake_data():
    data_file = Path(__file__).parent.parent.parent / "fakeData.json"
    with open(data_file, "r") as f:
        return json.load(f)

@router.get("/demo", response_model=List[dict])
async def get_demo_companies():
    """Get all companies from the demo dataset"""
    data = load_fake_data()
    return data["companies"]

@router.get("/new")
async def get_new_companies():
    """Get companies using the new data structure"""
    try:
        companies = STORE.list_companies()
        # Filter for dict objects (new structure)
        new_companies = [company for company in companies if isinstance(company, dict)]
        return new_companies
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to get new companies: {str(e)}"
        )

@router.get("/demo/{company_id}")
async def get_demo_company(company_id: int):
    """Get a specific company from the demo dataset by ID"""
    data = load_fake_data()
    company = next((c for c in data["companies"] if c["id"] == company_id), None)
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    return company


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


@router.get("/")
async def list_companies():
    """
    List all companies in the database.
    """
    try:
        companies = STORE.list_companies()
        # Return raw dictionary data if available, otherwise convert Company objects
        result = []
        for company in companies:
            if isinstance(company, dict):
                result.append(company)
            else:
                # Convert Company object to dict
                result.append({
                    "id": company.id,
                    "name": company.name,
                    "latitude": company.latitude,
                    "longitude": company.longitude,
                    "waste_streams": [{"name": ws.name, "composition": ws.composition} for ws in company.waste_streams],
                    "needs": [{"name": need.name, "composition": need.composition} for need in company.needs],
                    "quantity": company.quantity,
                    "disposal_cost": company.disposal_cost
                })
        return result
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
