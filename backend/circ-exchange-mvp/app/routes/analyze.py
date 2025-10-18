from fastapi import APIRouter, HTTPException, status
from ..models import AnalyzeRequest, AnalyzeResponse
from ..services.gemini_client import GeminiClient
from ..store import STORE

router = APIRouter(prefix="/analyze", tags=["analysis"])


@router.post("/", response_model=AnalyzeResponse)
async def analyze_waste_compatibility(request: AnalyzeRequest):
    """
    Analyze compatibility between two companies' waste streams using Gemini AI.
    
    This endpoint accepts two companies and uses Gemini to analyze:
    - Chemical compatibility
    - CO₂ reduction potential
    - Cost savings
    - Regulatory considerations
    """
    try:
        gemini_client = GeminiClient()
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
