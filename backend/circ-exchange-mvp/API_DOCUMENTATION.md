# Industrial Symbiosis Waste Stream Matchmaker - API Documentation

## Overview

This API provides AI-powered waste stream matching using Google Gemini for industrial symbiosis applications. The system analyzes chemical compatibility, geographic proximity, and environmental benefits to find optimal waste exchange opportunities.

## Base URL
```
http://localhost:8000
```

## Authentication
No authentication required for MVP. All endpoints are publicly accessible.

## Core Endpoints

### 1. Analyze Waste Stream Compatibility

**POST** `/analyze/`

Analyzes compatibility between two companies' waste streams using Gemini AI.

**Request Body:**
```json
{
  "company_a": {
    "id": "string",
    "name": "string", 
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
    "id": "string",
    "name": "string",
    "latitude": 29.4241, 
    "longitude": -95.2444,
    "needs": [
      {
        "name": "Alternative Raw Materials",
        "composition": {"CaO": 0.40, "SiO2": 0.30, "Al2O3": 0.20}
      }
    ]
  }
}
```

**Response:**
```json
{
  "compatibility_score": 92,
  "chemical_notes": "High CaO and SiO₂ alignment with cement feedstock",
  "co2_reduction_tons": 480,
  "cost_savings_usd": 210000,
  "regulatory_notes": "Non-hazardous under EPA RCRA. Suitable with minor filtration."
}
```

### 2. Find Best Matches

**GET** `/companies/matches`

Finds the best matches among all companies using Gemini AI analysis.

**Response:**
```json
[
  {
    "company_a": { /* Company object */ },
    "company_b": { /* Company object */ },
    "compatibility_score": 92,
    "distance_km": 45.2,
    "chemical_notes": "High compatibility for steel slag in cement production",
    "co2_reduction_tons": 480,
    "cost_savings_usd": 210000,
    "regulatory_notes": "EPA compliant, minor processing required"
  }
]
```

### 3. Add Company

**POST** `/companies/`

Adds a new company to the database.

**Request Body:**
```json
{
  "id": "unique-company-id",
  "name": "Company Name",
  "latitude": 30.2672,
  "longitude": -97.7431,
  "waste_streams": [
    {
      "name": "Material Name",
      "composition": {"Component1": 0.5, "Component2": 0.3, "Component3": 0.2}
    }
  ],
  "needs": [
    {
      "name": "Needed Material",
      "composition": {"Component1": 0.6, "Component2": 0.4}
    }
  ],
  "quantity": 10000,
  "disposal_cost": 30
}
```

**Response:** Returns the created company object.

### 4. List Companies

**GET** `/companies/`

Lists all companies in the database.

**Response:**
```json
[
  {
    "id": "company-id",
    "name": "Company Name",
    "latitude": 30.2672,
    "longitude": -97.7431,
    "waste_streams": [ /* Material objects */ ],
    "needs": [ /* Material objects */ ],
    "quantity": 10000,
    "disposal_cost": 30
  }
]
```

### 5. Ask AI Question

**POST** `/ask/`

Sends a question to Gemini AI about waste management, regulations, or material compatibility.

**Request Body:**
```json
{
  "question": "What are the environmental benefits of using steel slag in cement production?"
}
```

**Response:**
```json
{
  "answer": "Steel slag offers significant environmental benefits when used in cement production. It reduces the need for virgin raw materials, decreases CO₂ emissions by up to 40% compared to traditional cement production, and diverts industrial waste from landfills. The high calcium oxide content makes it an excellent substitute for limestone, while its pozzolanic properties improve concrete strength and durability..."
}
```

## Utility Endpoints

### Load Sample Data

**POST** `/load-sample-data`

Loads 8 sample Texas companies with realistic waste streams.

**Response:**
```json
{
  "message": "Loaded 8 sample companies",
  "count": 8
}
```

### API Status

**GET** `/`

Returns API status and version information.

**Response:**
```json
{
  "status": "ok",
  "message": "Industrial Symbiosis Waste Stream Matchmaker API",
  "version": "1.0.0"
}
```

## Data Models

### Company
```json
{
  "id": "string (required)",
  "name": "string (required)",
  "latitude": "float (-90 to 90)",
  "longitude": "float (-180 to 180)",
  "waste_streams": "Material[] (optional)",
  "needs": "Material[] (optional)",
  "quantity": "float (optional)",
  "disposal_cost": "float (optional)"
}
```

### Material
```json
{
  "name": "string (required)",
  "composition": {
    "Component1": "float (0-1 or 0-100)",
    "Component2": "float (0-1 or 0-100)"
  }
}
```

### AnalyzeResponse
```json
{
  "compatibility_score": "integer (0-100)",
  "chemical_notes": "string",
  "co2_reduction_tons": "float",
  "cost_savings_usd": "float", 
  "regulatory_notes": "string"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "detail": "Missing GOOGLE_API_KEY in environment"
}
```

### 404 Not Found
```json
{
  "detail": "Company not found"
}
```

### 500 Internal Server Error
```json
{
  "detail": "Analysis failed: [error message]"
}
```

## Example Usage

### Complete Workflow

1. **Load sample data:**
```bash
curl -X POST http://localhost:8000/load-sample-data
```

2. **List companies:**
```bash
curl http://localhost:8000/companies/
```

3. **Find matches:**
```bash
curl http://localhost:8000/companies/matches
```

4. **Ask AI question:**
```bash
curl -X POST http://localhost:8000/ask/ \
  -H "Content-Type: application/json" \
  -d '{"question": "What are the benefits of industrial symbiosis?"}'
```

5. **Analyze specific companies:**
```bash
curl -X POST http://localhost:8000/analyze/ \
  -H "Content-Type: application/json" \
  -d '{"company_a": {...}, "company_b": {...}}'
```

## Sample Data

The system includes 8 realistic Texas companies:

1. **Texas Steel Manufacturing** (Houston) - Steel slag, mill scale
2. **Houston Cement Works** (Houston) - Cement kiln dust
3. **Gulf Coast Chemical Solutions** (Galveston) - Spent solvents, acid waste
4. **Austin Organic Processing** (Austin) - Organic waste, food processing waste
5. **Dallas Power Generation** (Dallas) - Fly ash, bottom ash
6. **San Antonio Paper Mill** (San Antonio) - Paper sludge, bark waste
7. **Corpus Christi Refinery** (Corpus Christi) - Catalyst fines, spent caustic
8. **West Texas Agricultural Co-op** (Abilene) - Cotton gin waste, crop residues

## Notes

- All AI reasoning is handled by Google Gemini (gemini-flash-lite-latest)
- Chemical compositions can be fractions (0-1) or percentages (0-100)
- Distance calculations use Haversine formula for accuracy
- Data is stored in-memory (resets on server restart)
- Requires `GOOGLE_API_KEY` environment variable for AI features
