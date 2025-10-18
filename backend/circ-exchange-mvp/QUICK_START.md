# 🚀 Quick Start Guide

## 5-Minute Setup

### 1. Install Dependencies
```bash
# Create virtual environment
python3 -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

# Install packages
pip install -r requirements.txt
```

### 2. Configure API Key
```bash
# Copy environment template
cp .env.example .env

# Edit .env and add your Google API key
# Get key from: https://makersuite.google.com/app/apikey
```

### 3. Start Server
```bash
uvicorn app.main:app --reload
```

### 4. Test Everything
```bash
# Run verification script
python3 verify_setup.py

# Run demo commands
./demo_commands.sh
```

## 🎯 Key Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | API status |
| `/load-sample-data` | POST | Load 8 Texas companies |
| `/companies/` | GET | List all companies |
| `/companies/matches` | GET | Find best matches (AI-powered) |
| `/companies/` | POST | Add new company |
| `/analyze/` | POST | Analyze two companies |
| `/ask/` | POST | Ask AI questions |

## 🧪 Quick Tests

### Test 1: Load Sample Data
```bash
curl -X POST http://localhost:8000/load-sample-data
```

### Test 2: Find Matches
```bash
curl http://localhost:8000/companies/matches
```

### Test 3: Ask AI
```bash
curl -X POST http://localhost:8000/ask/ \
  -H "Content-Type: application/json" \
  -d '{"question": "What are the benefits of industrial symbiosis?"}'
```

## 📊 Sample Companies

The system includes 8 realistic Texas companies with diverse waste streams:

- **Steel Manufacturing** - Steel slag, mill scale
- **Cement Works** - Cement kiln dust  
- **Chemical Solutions** - Spent solvents, acid waste
- **Organic Processing** - Organic waste, food waste
- **Power Generation** - Fly ash, bottom ash
- **Paper Mill** - Paper sludge, bark waste
- **Oil Refinery** - Catalyst fines, spent caustic
- **Agricultural Co-op** - Cotton gin waste, crop residues

## 🔧 Troubleshooting

### Server won't start?
```bash
# Check if port 8000 is free
lsof -i :8000

# Try different port
uvicorn app.main:app --reload --port 8001
```

### API key issues?
```bash
# Check .env file exists
ls -la .env

# Verify API key format
cat .env
```

### Dependencies missing?
```bash
# Reinstall requirements
pip install -r requirements.txt --force-reinstall
```

## 📖 Next Steps

1. **Explore the API**: Visit http://localhost:8000/docs for interactive documentation
2. **Read the full docs**: Check `README.md` and `API_DOCUMENTATION.md`
3. **Run the demo**: Execute `./demo_commands.sh` for a complete walkthrough
4. **Add your data**: Use the `/companies/` endpoint to add your own companies

## 🎉 Success!

Your Industrial Symbiosis Waste Stream Matchmaker is ready! The AI-powered system can now:

- ✅ Analyze chemical compatibility between companies
- ✅ Find optimal waste exchange opportunities  
- ✅ Estimate environmental benefits (CO₂ reduction)
- ✅ Calculate cost savings
- ✅ Provide regulatory guidance
- ✅ Answer questions about waste management

**Happy matching! 🌱♻️**
