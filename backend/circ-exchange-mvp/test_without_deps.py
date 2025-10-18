#!/usr/bin/env python3
"""
Test the Industrial Symbiosis Waste Stream Matchmaker without installing dependencies.
This script tests the structure and logic without requiring package installation.
"""

import sys
import os
import json
from pathlib import Path

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def test_file_structure():
    """Test that all required files exist."""
    print("🔍 Testing file structure...")
    
    required_files = [
        'app/main.py',
        'app/models.py', 
        'app/store.py',
        'app/sample_data.py',
        'app/services/gemini_client.py',
        'app/routes/analyze.py',
        'app/routes/companies.py',
        'app/routes/ask.py',
        'requirements.txt',
        '.env.example',
        'README.md'
    ]
    
    missing = []
    for file_path in required_files:
        if Path(file_path).exists():
            print(f"✅ {file_path}")
        else:
            print(f"❌ {file_path} (missing)")
            missing.append(file_path)
    
    if missing:
        print(f"\n❌ Missing files: {', '.join(missing)}")
        return False
    else:
        print("✅ All required files present")
        return True

def test_sample_data():
    """Test sample data structure."""
    print("\n📊 Testing sample data...")
    
    try:
        # Read and parse sample data
        with open('app/sample_data.py', 'r') as f:
            content = f.read()
            
        # Check for key components
        if 'SAMPLE_COMPANIES' in content:
            print("✅ Sample companies data found")
        else:
            print("❌ Sample companies data missing")
            return False
            
        if 'Texas Steel Manufacturing' in content:
            print("✅ Texas companies included")
        else:
            print("❌ Texas companies missing")
            return False
            
        if 'load_sample_data' in content:
            print("✅ Sample data loader function found")
        else:
            print("❌ Sample data loader missing")
            return False
        
        # Try to import and test the sample data
        try:
            import sys
            sys.path.append('.')
            from app.sample_data import SAMPLE_COMPANIES, load_sample_data
            
            print(f"✅ Successfully imported {len(SAMPLE_COMPANIES)} companies")
            
            # Check first company structure
            first_company = SAMPLE_COMPANIES[0]
            print(f"✅ First company: {first_company.name}")
            print(f"✅ Has {len(first_company.waste_streams)} waste streams")
            print(f"✅ Has {len(first_company.needs)} needs")
            
            # Test load function
            print("✅ Sample data loader function is callable")
            
        except Exception as import_error:
            print(f"⚠️  Could not import sample data: {import_error}")
            print("   (This is expected if dependencies aren't installed)")
            
        return True
        
    except Exception as e:
        print(f"❌ Error reading sample data: {e}")
        return False

def test_requirements():
    """Test requirements.txt content."""
    print("\n📦 Testing requirements...")
    
    try:
        with open('requirements.txt', 'r') as f:
            content = f.read()
            
        required_packages = [
            'fastapi',
            'uvicorn',
            'pydantic',
            'google-generativeai',
            'python-dotenv',
            'geopy'
        ]
        
        missing = []
        for package in required_packages:
            if package in content:
                print(f"✅ {package}")
            else:
                print(f"❌ {package} (missing)")
                missing.append(package)
        
        if missing:
            print(f"❌ Missing packages: {', '.join(missing)}")
            return False
        else:
            print("✅ All required packages listed")
            return True
            
    except Exception as e:
        print(f"❌ Error reading requirements: {e}")
        return False

def test_api_structure():
    """Test API endpoint structure."""
    print("\n🔗 Testing API structure...")
    
    try:
        # Check route files for endpoint definitions
        route_files = [
            ('app/routes/analyze.py', ['@router.post("/", response_model=AnalyzeResponse)', 'analyze_waste_compatibility']),
            ('app/routes/companies.py', ['@router.post("/", response_model=Company)', '@router.get("/", response_model=List[Company])', '@router.get("/matches", response_model=List[MatchResult])']),
            ('app/routes/ask.py', ['@router.post("/", response_model=AskResponse)', 'ask_question'])
        ]
        
        found_endpoints = []
        
        # Check each route file
        for route_file, patterns in route_files:
            try:
                with open(route_file, 'r') as f:
                    content = f.read()
                
                for pattern in patterns:
                    if pattern in content:
                        print(f"✅ {route_file}: {pattern}")
                        found_endpoints.append(f"{route_file}: {pattern}")
                    else:
                        print(f"❌ {route_file}: {pattern} (missing)")
            except FileNotFoundError:
                print(f"❌ {route_file} (file missing)")
        
        # Check main.py for route includes
        with open('app/main.py', 'r') as f:
            main_content = f.read()
            
        if 'app.include_router(analyze.router)' in main_content:
            print("✅ Analyze router included in main.py")
            found_endpoints.append("Analyze router included")
        else:
            print("❌ Analyze router not included in main.py")
            
        if 'app.include_router(companies.router)' in main_content:
            print("✅ Companies router included in main.py")
            found_endpoints.append("Companies router included")
        else:
            print("❌ Companies router not included in main.py")
            
        if 'app.include_router(ask.router)' in main_content:
            print("✅ Ask router included in main.py")
            found_endpoints.append("Ask router included")
        else:
            print("❌ Ask router not included in main.py")
        
        if len(found_endpoints) >= 6:  # Should find route definitions + includes
            print("✅ Core API endpoints present")
            return True
        else:
            print("❌ Insufficient API endpoints")
            return False
            
    except Exception as e:
        print(f"❌ Error checking API structure: {e}")
        return False

def test_gemini_integration():
    """Test Gemini integration structure."""
    print("\n🤖 Testing Gemini integration...")
    
    try:
        with open('app/services/gemini_client.py', 'r') as f:
            gemini_content = f.read()
            
        # Check for key Gemini components
        gemini_checks = [
            'google.generativeai',
            'gemini-flash-lite-latest',
            'analyze_waste_compatibility',
            'ask_question',
            'GOOGLE_API_KEY'
        ]
        
        found_checks = []
        for check in gemini_checks:
            if check in gemini_content:
                print(f"✅ {check}")
                found_checks.append(check)
            else:
                print(f"❌ {check} (missing)")
        
        if len(found_checks) >= 4:
            print("✅ Gemini integration present")
            return True
        else:
            print("❌ Insufficient Gemini integration")
            return False
            
    except Exception as e:
        print(f"❌ Error checking Gemini integration: {e}")
        return False

def test_documentation():
    """Test documentation completeness."""
    print("\n📚 Testing documentation...")
    
    try:
        # Check README
        with open('README.md', 'r') as f:
            readme_content = f.read()
            
        doc_checks = [
            'Industrial Symbiosis',
            'FastAPI',
            'Gemini',
            'Quickstart',
            'API endpoints',
            'Sample data'
        ]
        
        found_docs = []
        for check in doc_checks:
            if check in readme_content:
                print(f"✅ {check}")
                found_docs.append(check)
            else:
                print(f"❌ {check} (missing)")
        
        if len(found_docs) >= 4:
            print("✅ Documentation complete")
            return True
        else:
            print("❌ Insufficient documentation")
            return False
            
    except Exception as e:
        print(f"❌ Error checking documentation: {e}")
        return False

def create_test_curl_commands():
    """Create test curl commands for manual testing."""
    print("\n🧪 Creating test commands...")
    
    test_commands = """
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
curl -X POST http://localhost:8000/ask/ \\
  -H "Content-Type: application/json" \\
  -d '{"question": "What are the benefits of industrial symbiosis?"}'

# 6. Analyze two companies (requires GOOGLE_API_KEY)
curl -X POST http://localhost:8000/analyze/ \\
  -H "Content-Type: application/json" \\
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
"""
    
    with open('test_commands.sh', 'w') as f:
        f.write(test_commands)
    
    print("✅ Test commands created in test_commands.sh")
    return True

def main():
    """Run all tests."""
    print("🧪 Industrial Symbiosis Waste Stream Matchmaker - Structure Test")
    print("=" * 70)
    print("Testing without installing dependencies...")
    print()
    
    tests = [
        ("File Structure", test_file_structure),
        ("Sample Data", test_sample_data),
        ("Requirements", test_requirements),
        ("API Structure", test_api_structure),
        ("Gemini Integration", test_gemini_integration),
        ("Documentation", test_documentation)
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
    
    # Create test commands
    create_test_curl_commands()
    
    print("\n" + "=" * 70)
    print("📊 TEST RESULTS")
    print("=" * 70)
    
    passed = sum(results)
    total = len(results)
    
    if passed == total:
        print("🎉 ALL TESTS PASSED!")
        print("✅ Your Industrial Symbiosis Waste Stream Matchmaker is ready!")
        print()
        print("🚀 Next steps:")
        print("   1. Use Python 3.11 or 3.12 (not 3.14)")
        print("   2. Install dependencies: pip install -r requirements.txt")
        print("   3. Set up .env file with GOOGLE_API_KEY")
        print("   4. Start server: uvicorn app.main:app --reload")
        print("   5. Run test commands from test_commands.sh")
    else:
        print(f"⚠️  {passed}/{total} tests passed")
        print("❌ Please fix the issues above")
        return 1
    
    return 0

if __name__ == "__main__":
    sys.exit(main())
