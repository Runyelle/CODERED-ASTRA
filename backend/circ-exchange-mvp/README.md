# Industrial Symbiosis Waste Stream Matchmaker

AI-powered FastAPI backend for matching industrial waste streams using Google Gemini AI. This system helps companies find optimal waste exchange opportunities by analyzing chemical compatibility, geographic proximity, and environmental benefits.

## Features

- **AI-Powered Analysis**: Uses Google Gemini (gemini-flash-lite-latest) for all reasoning
- **Waste Stream Matching**: Analyzes chemical compatibility between companies
- **Geographic Optimization**: Considers distance and transportation costs
- **Environmental Impact**: Estimates CO₂ reduction and cost savings
- **Regulatory Guidance**: Provides compliance and safety considerations
- **Conversational AI**: Ask questions about waste management best practices

## Quickstart

### 1. Setup Environment

```bash
# Create virtual environment
python3 -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Configure API Key

Copy `.env.example` to `.env` and add your Google API key:

```bash
cp .env.example .env
# Edit .env and add: GOOGLE_API_KEY=your_actual_api_key_here
```

Get your API key from: https://makersuite.google.com/app/apikey

### 3. Run the Server

```bash
uvicorn app.main:app --reload
```

The API will be available at: http://localhost:8000

### 4. Load Sample Data

```bash
# Load 8 Texas companies with realistic waste streams
curl -X POST http://localhost:8000/load-sample-data
```

### 5. Test the API

```bash
# List all companies
curl http://localhost:8000/companies/

# Find best matches among all companies
curl http://localhost:8000/companies/matches

# Ask AI a question
curl -X POST http://localhost:8000/ask/ \
  -H "Content-Type: application/json" \
  -d '{"question": "What are the benefits of using steel slag in cement production?"}'
```

## API Endpoints

### Core Endpoints

- `POST /analyze` - Analyze compatibility between two companies
- `GET /companies/matches` - Find best matches among all companies
- `POST /companies/` - Add a new company
- `GET /companies/` - List all companies
- `POST /ask/` - Ask AI questions about waste management

### Utility Endpoints

- `POST /load-sample-data` - Load sample Texas companies
- `GET /` - API status and information

### Legacy Endpoints (for backward compatibility)

- `POST /facilities` - Add facility (legacy)
- `GET /facilities` - List facilities (legacy)
- `GET /match/{facility_id}` - Match facility (legacy)
- `POST /explain` - Explain match (legacy)

## Example Usage

### Analyze Two Companies

```bash
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
```

### Add a Company

```bash
curl -X POST http://localhost:8000/companies/ \
  -H "Content-Type: application/json" \
  -d '{
    "id": "new-company",
    "name": "My Manufacturing Co",
    "latitude": 30.2672,
    "longitude": -97.7431,
    "waste_streams": [
      {
        "name": "Metal Scrap",
        "composition": {"Fe": 0.85, "C": 0.10, "Si": 0.05}
      }
    ],
    "needs": [
      {
        "name": "Clean Steel",
        "composition": {"Fe": 0.95, "C": 0.05}
      }
    ],
    "quantity": 10000,
    "disposal_cost": 30
  }'
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

## Development

### Project Structure

```
app/
├── main.py              # FastAPI application
├── models.py            # Pydantic models
├── store.py             # In-memory data store
├── matcher.py           # Matching algorithms
├── sample_data.py       # Sample Texas companies
├── services/
│   └── gemini_client.py # Gemini AI client
└── routes/
    ├── analyze.py       # Analysis endpoints
    ├── companies.py     # Company management
    └── ask.py          # AI Q&A endpoints
```

### Running Tests

```bash
pytest -q
```

### Key Features

- **Gemini Integration**: All AI reasoning handled by Google Gemini
- **Chemical Analysis**: Detailed composition matching
- **Geographic Optimization**: Distance-based scoring
- **Environmental Metrics**: CO₂ reduction and cost savings
- **Regulatory Compliance**: Safety and compliance guidance
- **Conversational AI**: Natural language Q&A about waste management

## Notes

- Data is stored in-memory (resets on restart) for MVP speed
- All AI reasoning is handled by Gemini - no local ML models
- Chemical compositions can be fractions (0-1) or percentages (0-100)
- Distance calculations use Haversine formula for accuracy
- Compatible with both legacy facility endpoints and new company endpoints
