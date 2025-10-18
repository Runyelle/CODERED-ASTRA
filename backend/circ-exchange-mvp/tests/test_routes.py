import os
import json
from fastapi.testclient import TestClient

from app.main import app
from app.store import STORE


client = TestClient(app)


def setup_module(module):
    # Seed two simple facilities
    STORE.facilities.clear()
    f1 = {
        "id": "t1",
        "name": "T1",
        "latitude": 29.8,
        "longitude": -95.3,
        "waste_streams": [{"name": "wasteA", "composition": {"a": 1.0}}],
        "needs": [{"name": "needX", "composition": {"x": 1.0}}],
    }
    f2 = {
        "id": "t2",
        "name": "T2",
        "latitude": 29.9,
        "longitude": -95.4,
        "waste_streams": [{"name": "wasteB", "composition": {"x": 1.0}}],
        "needs": [{"name": "needY", "composition": {"a": 1.0}}],
    }
    client.post("/facilities/bulk", json=[f1, f2])


def test_match_returns_candidates():
    r = client.get("/match/t1?radius_km=800&top_k=5")
    assert r.status_code == 200
    data = r.json()
    assert "candidates" in data
    assert isinstance(data["candidates"], list)


def test_missing_facility_404():
    r = client.get("/match/doesnotexist")
    assert r.status_code == 404


def test_explain_requires_key():
    # Ensure GOOGLE_API_KEY not set
    if "GOOGLE_API_KEY" in os.environ:
        del os.environ["GOOGLE_API_KEY"]

    explain_req = {
        "source": client.get("/facilities").json()[0],
        "candidate": client.get("/facilities").json()[1],
        "distance_km": 10.0,
        "matched_waste": {"name": "w", "composition": {"a": 1.0}},
        "matched_need": {"name": "n", "composition": {"a": 1.0}},
        "score": 0.9,
    }
    r = client.post("/explain", json=explain_req)
    assert r.status_code == 400
