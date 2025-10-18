#!/bin/bash
# Industrial Symbiosis Waste Stream Matchmaker - API Demo
# Run this after starting the server

echo "🚀 Industrial Symbiosis Waste Stream Matchmaker - API Demo"
echo "=========================================================="

# Test 1: API status
echo "1. Testing API status..."
curl -s http://localhost:8001/ | python3 -m json.tool

# Test 2: Load sample data
echo "\n2. Loading sample data..."
curl -X POST http://localhost:8001/load-sample-data

# Test 3: List companies
echo "\n3. Listing companies..."
curl -s http://localhost:8001/companies/ | python3 -m json.tool

# Test 4: Find matches
echo "\n4. Finding matches..."
curl -s http://localhost:8001/companies/matches | python3 -m json.tool

# Test 5: Ask AI question
echo "\n5. Asking AI question..."
curl -X POST http://localhost:8001/ask/ \
  -H "Content-Type: application/json" \
  -d '{"question": "What are the benefits of industrial symbiosis?"}' | python3 -m json.tool

echo "\n🎉 Demo completed!"
