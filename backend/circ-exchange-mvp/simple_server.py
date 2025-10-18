#!/usr/bin/env python3
"""
Simple server that bypasses dotenv issues.
This creates a working FastAPI server for the Industrial Symbiosis Waste Stream Matchmaker.
"""

import os
import sys
from pathlib import Path

# Set the API key directly
os.environ['GOOGLE_API_KEY'] = 'AIzaSyBcYXrdM_2HKa-kBwFwIRQyEcN4DswL5sY'

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Import FastAPI and create the app
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional

# Import our models and services
from app.models import Company, Material, AnalyzeRequest, AnalyzeResponse, MatchResult, AskRequest, AskResponse
from app.store import STORE
from app.sample_data import SAMPLE_COMPANIES, load_sample_data
from app.services.gemini_client import GeminiClient
from app.matcher import haversine_km

# Create FastAPI app
app = FastAPI(
    title="Industrial Symbiosis Waste Stream Matchmaker", 
    version="1.0.0",
    description="AI-powered API backend for waste stream matching using Google Gemini"
)

# CORS for local dev and production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost", "http://localhost:3000", "http://localhost:5173"],
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# Initialize Gemini client
gemini_client = GeminiClient()

@app.get("/")
def root():
    return {
        "status": "ok",
        "message": "Industrial Symbiosis Waste Stream Matchmaker API",
        "version": "1.0.0"
    }

@app.post("/load-sample-data")
def load_sample_data_endpoint():
    """Load sample Texas companies into the database."""
    try:
        count = load_sample_data()
        return {"message": f"Loaded {count} sample companies", "count": count}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to load sample data: {str(e)}"
        )

@app.post("/analyze/", response_model=AnalyzeResponse)
async def analyze_waste_compatibility(request: AnalyzeRequest):
    """Analyze compatibility between two companies' waste streams using Gemini AI."""
    try:
        result = gemini_client.analyze_waste_compatibility(
            request.company_a, 
            request.company_b
        )
        return result
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Analysis failed: {str(e)}"
        )

@app.get("/companies/", response_model=List[Company])
async def list_companies():
    """List all companies in the database."""
    try:
        return STORE.list_companies()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to list companies: {str(e)}"
        )

@app.post("/companies/", response_model=Company)
async def add_company(company: Company):
    """Add a new company to the database."""
    try:
        STORE.upsert_company(company)
        return company
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to add company: {str(e)}"
        )

@app.get("/companies/matches", response_model=List[MatchResult])
async def get_matches():
    """Find the best matches among all companies using Gemini AI."""
    try:
        companies = STORE.list_companies()
        if len(companies) < 2:
            return []
        
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

@app.post("/ask/", response_model=AskResponse)
async def ask_question(request: AskRequest):
    """Send a user question to Gemini AI for conversational response."""
    try:
        response = gemini_client.ask_question(request.question)
        return response
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process question: {str(e)}"
        )

if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting Industrial Symbiosis Waste Stream Matchmaker API")
    print("=" * 60)
    print("🌐 Server will be available at: http://127.0.0.1:8001")
    print("📖 API documentation: http://127.0.0.1:8001/docs")
    print("🧪 Test the API with: ./api_demo.sh")
    print("=" * 60)
    
    uvicorn.run(app, host="127.0.0.1", port=8001, reload=False)
