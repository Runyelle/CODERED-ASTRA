from fastapi import APIRouter, HTTPException, status
from ..models import AskRequest, AskResponse
from ..services.gemini_client import GeminiClient

router = APIRouter(prefix="/ask", tags=["ai"])


@router.post("/", response_model=AskResponse)
async def ask_question(request: AskRequest):
    """
    Send a user question to Gemini AI for conversational response.
    
    This endpoint handles questions about:
    - Waste management best practices
    - Regulatory compliance
    - Material compatibility
    - Environmental benefits
    - Cost optimization strategies
    """
    try:
        gemini_client = GeminiClient()
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
