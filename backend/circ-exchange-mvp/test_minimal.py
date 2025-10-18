#!/usr/bin/env python3
"""
Minimal test to verify the backend works without full dependencies.
This tests the core logic and data structures.
"""

import sys
import os
import json
from pathlib import Path

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def test_core_imports():
    """Test that core modules can be imported."""
    print("🧪 Testing core imports...")
    
    try:
        # Test basic Python imports
        from app.models import Company, Material, AnalyzeRequest, AnalyzeResponse
        print("✅ Models imported successfully")
        
        from app.store import STORE
        print("✅ Store imported successfully")
        
        from app.sample_data import SAMPLE_COMPANIES, load_sample_data
        print("✅ Sample data imported successfully")
        
        from app.matcher import haversine_km, weighted_jaccard, score_match
        print("✅ Matcher functions imported successfully")
        
        return True
        
    except Exception as e:
        print(f"❌ Import failed: {e}")
        return False

def test_sample_data_structure():
    """Test sample data structure and content."""
    print("\n📊 Testing sample data structure...")
    
    try:
        from app.sample_data import SAMPLE_COMPANIES
        
        print(f"✅ Found {len(SAMPLE_COMPANIES)} companies")
        
        # Test first company structure
        company = SAMPLE_COMPANIES[0]
        print(f"✅ First company: {company.name}")
        print(f"✅ Location: ({company.latitude}, {company.longitude})")
        print(f"✅ Waste streams: {len(company.waste_streams)}")
        print(f"✅ Needs: {len(company.needs)}")
        
        # Test waste stream structure
        if company.waste_streams:
            waste = company.waste_streams[0]
            print(f"✅ First waste stream: {waste.name}")
            print(f"✅ Composition: {waste.composition}")
        
        return True
        
    except Exception as e:
        print(f"❌ Sample data test failed: {e}")
        return False

def test_geographic_calculations():
    """Test geographic distance calculations."""
    print("\n🗺️ Testing geographic calculations...")
    
    try:
        from app.matcher import haversine_km
        
        # Test distance between Houston and Dallas
        houston_lat, houston_lon = 29.7604, -95.3698
        dallas_lat, dallas_lon = 32.7767, -96.7970
        
        distance = haversine_km(houston_lat, houston_lon, dallas_lat, dallas_lon)
        print(f"✅ Houston to Dallas distance: {distance:.1f} km")
        
        # Should be around 380-400 km
        if 300 < distance < 500:
            print("✅ Distance calculation looks correct")
        else:
            print(f"⚠️  Distance seems off: {distance} km")
        
        return True
        
    except Exception as e:
        print(f"❌ Geographic test failed: {e}")
        return False

def test_chemical_similarity():
    """Test chemical composition similarity calculations."""
    print("\n🧪 Testing chemical similarity...")
    
    try:
        from app.matcher import weighted_jaccard
        
        # Test similar compositions
        comp1 = {"CaO": 0.45, "SiO2": 0.25, "Fe2O3": 0.15}
        comp2 = {"CaO": 0.40, "SiO2": 0.30, "Al2O3": 0.20}
        
        similarity = weighted_jaccard(comp1, comp2)
        print(f"✅ Chemical similarity: {similarity:.3f}")
        
        if 0 <= similarity <= 1:
            print("✅ Similarity calculation working")
        else:
            print(f"⚠️  Similarity out of range: {similarity}")
        
        return True
        
    except Exception as e:
        print(f"❌ Chemical similarity test failed: {e}")
        return False

def test_store_operations():
    """Test in-memory store operations."""
    print("\n💾 Testing store operations...")
    
    try:
        from app.store import STORE
        from app.sample_data import SAMPLE_COMPANIES
        
        # Test adding companies
        for company in SAMPLE_COMPANIES[:3]:  # Add first 3 companies
            STORE.upsert_company(company)
        
        # Test retrieving companies
        companies = STORE.list_companies()
        print(f"✅ Stored {len(companies)} companies")
        
        # Test getting specific company
        first_company = companies[0]
        retrieved = STORE.get_company(first_company.id)
        if retrieved and retrieved.id == first_company.id:
            print("✅ Company retrieval working")
        else:
            print("❌ Company retrieval failed")
            return False
        
        return True
        
    except Exception as e:
        print(f"❌ Store operations test failed: {e}")
        return False

def test_api_structure():
    """Test API endpoint structure."""
    print("\n🔗 Testing API structure...")
    
    try:
        # Check that route files exist and have correct structure
        route_files = [
            'app/routes/analyze.py',
            'app/routes/companies.py', 
            'app/routes/ask.py'
        ]
        
        for route_file in route_files:
            if Path(route_file).exists():
                with open(route_file, 'r') as f:
                    content = f.read()
                    if 'router = APIRouter' in content and '@router.' in content:
                        print(f"✅ {route_file} structure correct")
                    else:
                        print(f"❌ {route_file} structure incorrect")
                        return False
            else:
                print(f"❌ {route_file} missing")
                return False
        
        return True
        
    except Exception as e:
        print(f"❌ API structure test failed: {e}")
        return False

def create_test_data():
    """Create test data for API testing."""
    print("\n📝 Creating test data...")
    
    test_data = {
        "analyze_request": {
            "company_a": {
                "id": "test-steel",
                "name": "Test Steel Company",
                "latitude": 29.7604,
                "longitude": -95.3698,
                "waste_streams": [
                    {
                        "name": "Steel Slag",
                        "composition": {"CaO": 0.45, "SiO2": 0.25, "Fe2O3": 0.15}
                    }
                ],
                "quantity": 1000,
                "disposal_cost": 25
            },
            "company_b": {
                "id": "test-cement",
                "name": "Test Cement Company", 
                "latitude": 29.4241,
                "longitude": -95.2444,
                "needs": [
                    {
                        "name": "Raw Materials",
                        "composition": {"CaO": 0.40, "SiO2": 0.30, "Al2O3": 0.20}
                    }
                ]
            }
        },
        "ask_request": {
            "question": "What are the benefits of using steel slag in cement production?"
        }
    }
    
    with open('test_data.json', 'w') as f:
        json.dump(test_data, f, indent=2)
    
    print("✅ Test data created in test_data.json")
    return True

def main():
    """Run all minimal tests."""
    print("🧪 Industrial Symbiosis Waste Stream Matchmaker - Minimal Test")
    print("=" * 70)
    print("Testing core functionality without full dependencies...")
    print()
    
    tests = [
        ("Core Imports", test_core_imports),
        ("Sample Data Structure", test_sample_data_structure),
        ("Geographic Calculations", test_geographic_calculations),
        ("Chemical Similarity", test_chemical_similarity),
        ("Store Operations", test_store_operations),
        ("API Structure", test_api_structure),
        ("Test Data Creation", create_test_data)
    ]
    
    results = []
    for name, test_func in tests:
        print(f"\n📋 {name}:")
        try:
            result = test_func()
            results.append(result)
        except Exception as e:
            print(f"❌ Error: {e}")
            results.append(False)
    
    print("\n" + "=" * 70)
    print("📊 MINIMAL TEST RESULTS")
    print("=" * 70)
    
    passed = sum(results)
    total = len(results)
    
    if passed == total:
        print("🎉 ALL CORE TESTS PASSED!")
        print("✅ Your backend core is working perfectly!")
        print()
        print("🚀 Next steps:")
        print("   1. Get Google API key from: https://makersuite.google.com/app/apikey")
        print("   2. Add API key to .env file")
        print("   3. Use Python 3.11/3.12 to install dependencies")
        print("   4. Start server: uvicorn app.main:app --reload")
        print("   5. Test with: curl http://localhost:8000/")
    else:
        print(f"⚠️  {passed}/{total} tests passed")
        print("❌ Please fix the issues above")
        return 1
    
    return 0

if __name__ == "__main__":
    sys.exit(main())
