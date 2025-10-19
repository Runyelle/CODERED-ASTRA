import os
from typing import List, Tuple, Optional
from fastapi import FastAPI, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from .models import Facility, Material, Candidate, MatchResponse, ExplainRequest
from .store import STORE
from .matcher import haversine_km, weighted_jaccard, score_match
from .routes import analyze, companies, ask
from .sample_data import load_sample_data

# Load .env for GOOGLE_API_KEY (Gemini)
load_dotenv()

app = FastAPI(
    title="Industrial Symbiosis Waste Stream Matchmaker", 
    version="1.0.0",
    description="AI-powered API backend for waste stream matching using Google Gemini"
)

# CORS for local dev and production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost", "http://localhost:3000", "http://localhost:3001", "http://localhost:5173"],
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


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


@app.post("/facilities", response_model=Facility)
def add_facility(facility: Facility):
    created = STORE.get_facility(facility.id) is None
    STORE.upsert_facility(facility)
    # 201 for created, 200 for update
    return facility


@app.post("/facilities/bulk")
def add_facilities_bulk(facilities: List[Facility]):
    count = 0
    for f in facilities:
        STORE.upsert_facility(f)
        count += 1
    return {"inserted": count}


@app.get("/facilities", response_model=List[Facility])
def list_facilities():
    return STORE.list_facilities()


@app.get("/match/{facility_id}", response_model=MatchResponse)
def match_facility(
    facility_id: str,
    radius_km: float = Query(500.0, ge=1.0, le=2000.0),
    top_k: int = Query(5, ge=1, le=50),
):
    source = STORE.get_facility(facility_id)
    if not source:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Facility {facility_id} not found")

    candidates: List[Candidate] = []
    for cand in STORE.list_facilities():
        if cand.id == source.id:
            continue

        dist = haversine_km(source.latitude, source.longitude, cand.latitude, cand.longitude)

        best_sim = 0.0
        best_pair: Tuple[Optional[Material], Optional[Material]] = (None, None)

        # Compare every source waste to every candidate need and pick best matching pair
        for w in source.waste_streams:
            for n in cand.needs:
                sim = weighted_jaccard(w.composition, n.composition)
                if sim > best_sim:
                    best_sim = sim
                    best_pair = (w, n)

        if best_sim <= 0:
            # no chemical overlap, skip candidate
            continue

        score = score_match(best_sim, dist, radius_km)
        # Construct Candidate record
        candidates.append(
            Candidate(
                facility_id=cand.id,
                distance_km=dist,
                composition_similarity=best_sim,
                score=score,
                matched_waste=best_pair[0],
                matched_need=best_pair[1],
            )
        )

    # Sort by score desc, then distance asc and return top_k
    candidates.sort(key=lambda c: (-c.score, c.distance_km))
    return MatchResponse(source_facility=source, candidates=candidates[:top_k])


@app.post("/explain")
def explain_match(req: ExplainRequest):
    """Return a short explanation from Gemini for the provided match.

    If GOOGLE_API_KEY is not present, return 400 with a friendly message.
    """
    try:
        import google.generativeai as genai
    except Exception:
        # We don't fail the whole API if the lib isn't installed — return an explicit 500
        raise HTTPException(status_code=500, detail="Gemini client library not available. Install google-generativeai")

    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        # Per spec, return 400 when the key is missing
        raise HTTPException(status_code=400, detail="Missing GOOGLE_API_KEY in environment; set it in .env or env vars to enable /explain")

    genai.configure(api_key=api_key)

    prompt = (
        "You are an industrial symbiosis expert. Explain briefly why this waste->need match is promising, "
        "note 1-2 risks, and propose 2 concrete next steps. Keep it concise.\n\n"
        f"Source: {req.source.name} (lat={req.source.latitude}, lon={req.source.longitude})\n"
        f"Candidate: {req.candidate.name} (lat={req.candidate.latitude}, lon={req.candidate.longitude})\n"
        f"Distance km: {req.distance_km:.1f}\n"
        f"Matched waste: {req.matched_waste.name} comp={req.matched_waste.composition}\n"
        f"Matched need: {req.matched_need.name} comp={req.matched_need.composition}\n"
        f"Score: {req.score:.2f}\n"
    )

    # Use the simple higher-level generate API; model choice per spec.
    model = "gemini-1.5-flash"
    try:
        res = genai.generate_text(model=model, text_prompt=prompt)
        text = res.text if hasattr(res, "text") else str(res)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating explanation: {e}")

    return {"explanation": text}


# Include new API routes
app.include_router(analyze.router)
app.include_router(companies.router)
app.include_router(ask.router)
