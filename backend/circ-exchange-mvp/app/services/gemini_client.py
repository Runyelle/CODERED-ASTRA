import os
import json
import logging
from typing import Dict, Any, Optional
import google.generativeai as genai
from ..models import Company, AnalyzeResponse, AskResponse

logger = logging.getLogger(__name__)


class GeminiClient:
    """Client for interacting with Google Gemini AI."""
    
    def __init__(self):
        api_key = os.getenv("GOOGLE_API_KEY")
        if not api_key:
            raise ValueError("GOOGLE_API_KEY environment variable is required")
        
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel("gemini-flash-lite-latest")
    
    def analyze_waste_compatibility(self, company_a: Company, company_b: Company) -> AnalyzeResponse:
        """
        Analyze compatibility between two companies' waste streams using Gemini.
        
        Args:
            company_a: Company with waste streams
            company_b: Company with needs
            
        Returns:
            AnalyzeResponse with compatibility analysis
        """
        prompt = self._build_analysis_prompt(company_a, company_b)
        
        try:
            response = self.model.generate_content(prompt)
            result = self._parse_analysis_response(response.text)
            return AnalyzeResponse(**result)
        except Exception as e:
            logger.error(f"Error analyzing waste compatibility: {e}")
            # Return a default response if Gemini fails
            return AnalyzeResponse(
                compatibility_score=0,
                chemical_notes="Analysis failed - unable to process request",
                co2_reduction_tons=0.0,
                cost_savings_usd=0.0,
                regulatory_notes="Unable to assess regulatory considerations"
            )
    
    def ask_question(self, question: str) -> AskResponse:
        """
        Answer a user question about waste management using Gemini.
        
        Args:
            question: User's question
            
        Returns:
            AskResponse with AI-generated answer
        """
        prompt = f"""
        You are an expert in industrial symbiosis, waste management, and circular economy.
        Answer the following question with practical, actionable advice:
        
        Question: {question}
        
        Provide a clear, concise answer that demonstrates your expertise in:
        - Waste stream analysis
        - Chemical compatibility
        - Regulatory considerations
        - Cost optimization
        - Environmental benefits
        
        Keep your response conversational but professional.
        """
        
        try:
            response = self.model.generate_content(prompt)
            return AskResponse(answer=response.text)
        except Exception as e:
            logger.error(f"Error generating answer: {e}")
            return AskResponse(
                answer="I'm sorry, I'm having trouble processing your question right now. Please try again later."
            )
    
    def _build_analysis_prompt(self, company_a: Company, company_b: Company) -> str:
        """Build the analysis prompt for Gemini."""
        
        # Format waste streams for company A
        waste_streams_a = []
        for waste in company_a.waste_streams:
            comp_str = ", ".join([f"{k}: {v:.2f}" for k, v in waste.composition.items()])
            waste_streams_a.append(f"- {waste.name}: {comp_str}")
        
        # Format needs for company B
        needs_b = []
        for need in company_b.needs:
            comp_str = ", ".join([f"{k}: {v:.2f}" for k, v in need.composition.items()])
            needs_b.append(f"- {need.name}: {comp_str}")
        
        prompt = f"""
        Analyze the following industrial waste exchange opportunity:

        Company A: {company_a.name}
        Location: ({company_a.latitude}, {company_a.longitude})
        Waste Streams:
        {chr(10).join(waste_streams_a)}
        Disposal Cost: ${company_a.disposal_cost or 0}/ton
        Quantity: {company_a.quantity or 0} tons/year

        Company B: {company_b.name}
        Location: ({company_b.latitude}, {company_b.longitude})
        Needs:
        {chr(10).join(needs_b)}

        Please provide a comprehensive analysis in the following JSON format:
        {{
            "compatibility_score": <integer 0-100>,
            "chemical_notes": "<detailed chemical analysis summary>",
            "co2_reduction_tons": <float>,
            "cost_savings_usd": <float>,
            "regulatory_notes": "<regulatory and safety considerations>"
        }}

        Consider:
        1. Chemical compatibility between waste streams and needs
        2. Geographic proximity and transportation costs
        3. Environmental benefits (CO₂ reduction)
        4. Economic benefits (cost savings)
        5. Regulatory compliance and safety requirements
        6. Processing requirements and feasibility

        Be specific and quantitative where possible.
        """
        
        return prompt
    
    def _parse_analysis_response(self, response_text: str) -> Dict[str, Any]:
        """Parse Gemini's response and extract structured data."""
        try:
            # Try to find JSON in the response
            start_idx = response_text.find('{')
            end_idx = response_text.rfind('}') + 1
            
            if start_idx != -1 and end_idx > start_idx:
                json_str = response_text[start_idx:end_idx]
                return json.loads(json_str)
            else:
                # If no JSON found, create a default response
                return {
                    "compatibility_score": 50,
                    "chemical_notes": "Unable to parse detailed analysis",
                    "co2_reduction_tons": 0.0,
                    "cost_savings_usd": 0.0,
                    "regulatory_notes": "Analysis unavailable"
                }
        except json.JSONDecodeError as e:
            logger.error(f"Error parsing JSON response: {e}")
            return {
                "compatibility_score": 50,
                "chemical_notes": "Unable to parse detailed analysis",
                "co2_reduction_tons": 0.0,
                "cost_savings_usd": 0.0,
                "regulatory_notes": "Analysis unavailable"
            }
