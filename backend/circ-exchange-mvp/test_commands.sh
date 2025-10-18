
# Test Commands for Industrial Symbiosis Waste Stream Matchmaker
# Run these after starting the server with: uvicorn app.main:app --reload

# 1. Check API status
curl http://localhost:8000/

# 2. Load sample data
curl -X POST http://localhost:8000/load-sample-data

# 3. List companies
curl http://localhost:8000/companies/

# 4. Find matches (requires GOOGLE_API_KEY)
curl http://localhost:8000/companies/matches

# 5. Ask AI question (requires GOOGLE_API_KEY)
curl -X POST http://localhost:8000/ask/ \
  -H "Content-Type: application/json" \
  -d '{"question": "What are the benefits of industrial symbiosis?"}'

# 6. Analyze two companies (requires GOOGLE_API_KEY)
curl -X POST http://localhost:8000/analyze/ \
  -H "Content-Type: application/json" \
  -d '{
    "company_a": {
      "id": "steel-001",
      "name": "Texas Steel Manufacturing",
      "latitude": 29.7604,
      "longitude": -95.3698,
      "waste_streams": [
        {
          "name": "Steel Slag",
          "composition": {"CaO": 0.45, "SiO2": 0.25, "Fe2O3": 0.15}
        }
      ],
      "quantity": 50000,
      "disposal_cost": 25
    },
    "company_b": {
      "id": "cement-001",
      "name": "Houston Cement Works",
      "latitude": 29.4241,
      "longitude": -95.2444,
      "needs": [
        {
          "name": "Alternative Raw Materials",
          "composition": {"CaO": 0.40, "SiO2": 0.30, "Al2O3": 0.20}
        }
      ]
    }
  }'
