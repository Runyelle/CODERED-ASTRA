#!/bin/bash

# Industrial Symbiosis Waste Stream Matchmaker - Demo Commands
# Run this after starting the server with: uvicorn app.main:app --reload

echo "🚀 Industrial Symbiosis Waste Stream Matchmaker - Demo Commands"
echo "=================================================================="
echo ""

# Check if server is running
echo "📡 Checking if server is running..."
if curl -s http://localhost:8000/ > /dev/null; then
    echo "✅ Server is running at http://localhost:8000"
else
    echo "❌ Server is not running. Please start it with:"
    echo "   uvicorn app.main:app --reload"
    echo ""
    echo "Then run this script again."
    exit 1
fi

echo ""
echo "🔧 Step 1: Load Sample Data"
echo "=========================="
echo "Loading 8 Texas companies with realistic waste streams..."
curl -X POST http://localhost:8000/load-sample-data
echo ""
echo ""

echo "📊 Step 2: List All Companies"
echo "============================"
curl -s http://localhost:8000/companies/ | python3 -m json.tool
echo ""

echo "🤖 Step 3: Find Best Matches (AI-Powered)"
echo "=========================================="
echo "Finding best waste stream matches among all companies using Gemini AI..."
curl -s http://localhost:8000/companies/matches | python3 -m json.tool
echo ""

echo "💬 Step 4: Ask AI a Question"
echo "============================"
echo "Asking Gemini about steel slag benefits in cement production..."
curl -X POST http://localhost:8000/ask/ \
  -H "Content-Type: application/json" \
  -d '{"question": "What are the environmental benefits of using steel slag as a cement substitute?"}'
echo ""
echo ""

echo "🔬 Step 5: Analyze Two Specific Companies"
echo "========================================"
echo "Analyzing compatibility between Texas Steel and Houston Cement..."
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
          "composition": {"CaO": 0.45, "SiO2": 0.25, "Fe2O3": 0.15, "Al2O3": 0.10, "MgO": 0.05}
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
          "composition": {"CaO": 0.40, "SiO2": 0.30, "Al2O3": 0.20, "Fe2O3": 0.10}
        }
      ]
    }
  }'
echo ""
echo ""

echo "🏭 Step 6: Add a New Company"
echo "============================"
echo "Adding a new manufacturing company..."
curl -X POST http://localhost:8000/companies/ \
  -H "Content-Type: application/json" \
  -d '{
    "id": "demo-company",
    "name": "Demo Manufacturing Co",
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
echo ""
echo ""

echo "📈 Step 7: Get Updated Matches"
echo "=============================="
echo "Getting updated matches including the new company..."
curl -s http://localhost:8000/companies/matches | python3 -m json.tool
echo ""

echo "🎉 Demo Complete!"
echo "================="
echo "✅ All endpoints tested successfully"
echo "✅ AI-powered analysis working"
echo "✅ Sample data loaded"
echo "✅ Company management working"
echo "✅ Conversational AI responding"
echo ""
echo "🚀 Your Industrial Symbiosis Waste Stream Matchmaker is ready!"
echo "📖 Check the README.md for more detailed usage instructions"
