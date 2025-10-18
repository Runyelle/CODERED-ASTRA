#!/usr/bin/env python3
"""
Setup verification script for Industrial Symbiosis Waste Stream Matchmaker
Run this to verify your environment is properly configured
"""

import os
import sys
import subprocess
from pathlib import Path

def check_python_version():
    """Check if Python version is 3.11+"""
    version = sys.version_info
    if version.major == 3 and version.minor >= 11:
        print(f"✅ Python {version.major}.{version.minor}.{version.micro} (compatible)")
        return True
    else:
        print(f"❌ Python {version.major}.{version.minor}.{version.micro} (requires 3.11+)")
        return False

def check_venv():
    """Check if virtual environment is activated"""
    if hasattr(sys, 'real_prefix') or (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix):
        print("✅ Virtual environment is activated")
        return True
    else:
        print("⚠️  Virtual environment not detected (recommended but not required)")
        return False

def check_dependencies():
    """Check if required dependencies are installed"""
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
        try:
            __import__(package.replace('-', '_'))
            print(f"✅ {package}")
        except ImportError:
            print(f"❌ {package} (missing)")
            missing.append(package)
    
    if missing:
        print(f"\n📦 Install missing packages with:")
        print(f"   pip install {' '.join(missing)}")
        return False
    return True

def check_env_file():
    """Check if .env file exists and has API key"""
    env_file = Path('.env')
    if env_file.exists():
        with open(env_file, 'r') as f:
            content = f.read()
            if 'GOOGLE_API_KEY=' in content and 'your_google_api_key_here' not in content:
                print("✅ .env file exists with API key configured")
                return True
            else:
                print("⚠️  .env file exists but API key not configured")
                print("   Edit .env and set: GOOGLE_API_KEY=your_actual_api_key")
                return False
    else:
        print("⚠️  .env file not found")
        print("   Copy .env.example to .env and configure your API key")
        return False

def check_api_structure():
    """Check if API structure is correct"""
    required_files = [
        'app/main.py',
        'app/models.py', 
        'app/store.py',
        'app/sample_data.py',
        'app/services/gemini_client.py',
        'app/routes/analyze.py',
        'app/routes/companies.py',
        'app/routes/ask.py'
    ]
    
    missing = []
    for file_path in required_files:
        if Path(file_path).exists():
            print(f"✅ {file_path}")
        else:
            print(f"❌ {file_path} (missing)")
            missing.append(file_path)
    
    if missing:
        print(f"\n🔧 Missing files: {', '.join(missing)}")
        return False
    return True

def test_imports():
    """Test that all modules can be imported"""
    try:
        print("\n🧪 Testing imports...")
        
        # Test basic imports
        from app.models import Company, Material, AnalyzeRequest, AnalyzeResponse
        print("✅ Models imported successfully")
        
        from app.store import STORE
        print("✅ Store imported successfully")
        
        from app.sample_data import SAMPLE_COMPANIES, load_sample_data
        print("✅ Sample data imported successfully")
        
        from app.services.gemini_client import GeminiClient
        print("✅ Gemini client imported successfully")
        
        from app.routes import analyze, companies, ask
        print("✅ Routes imported successfully")
        
        from app.main import app
        print("✅ Main app imported successfully")
        
        return True
        
    except Exception as e:
        print(f"❌ Import failed: {e}")
        return False

def main():
    """Run all verification checks"""
    print("🔍 Industrial Symbiosis Waste Stream Matchmaker - Setup Verification")
    print("=" * 70)
    print()
    
    checks = [
        ("Python Version", check_python_version),
        ("Virtual Environment", check_venv),
        ("Dependencies", check_dependencies),
        ("Environment File", check_env_file),
        ("API Structure", check_api_structure),
        ("Module Imports", test_imports)
    ]
    
    results = []
    for name, check_func in checks:
        print(f"\n📋 {name}:")
        try:
            result = check_func()
            results.append(result)
        except Exception as e:
            print(f"❌ Error: {e}")
            results.append(False)
    
    print("\n" + "=" * 70)
    print("📊 VERIFICATION SUMMARY")
    print("=" * 70)
    
    passed = sum(results)
    total = len(results)
    
    if passed == total:
        print("🎉 ALL CHECKS PASSED!")
        print("✅ Your setup is complete and ready to run!")
        print()
        print("🚀 Next steps:")
        print("   1. Start the server: uvicorn app.main:app --reload")
        print("   2. Run demo: ./demo_commands.sh")
        print("   3. Visit: http://localhost:8000/docs for API documentation")
    else:
        print(f"⚠️  {passed}/{total} checks passed")
        print("❌ Please fix the issues above before running the server")
        return 1
    
    return 0

if __name__ == "__main__":
    sys.exit(main())
