#!/usr/bin/env python3
"""
Production setup script for Industrial Symbiosis Waste Stream Matchmaker.
This script sets up the environment and verifies everything is ready.
"""

import os
import sys
import subprocess
import json
from pathlib import Path

def check_python_version():
    """Check Python version compatibility."""
    print("🐍 Checking Python version...")
    
    version = sys.version_info
    if version.major == 3 and version.minor in [11, 12, 13]:
        print(f"✅ Python {version.major}.{version.minor}.{version.micro} (compatible)")
        return True
    elif version.major == 3 and version.minor == 14:
        print(f"⚠️  Python {version.major}.{version.minor}.{version.micro} (too new for Pydantic)")
        print("   Please use Python 3.11, 3.12, or 3.13")
        return False
    else:
        print(f"❌ Python {version.major}.{version.minor}.{version.micro} (incompatible)")
        print("   Please use Python 3.11, 3.12, or 3.13")
        return False

def setup_environment():
    """Set up the environment file."""
    print("\n🔧 Setting up environment...")
    
    env_file = Path('.env')
    env_example = Path('.env.example')
    
    if not env_file.exists() and env_example.exists():
        # Copy .env.example to .env
        with open(env_example, 'r') as f:
            content = f.read()
        with open(env_file, 'w') as f:
            f.write(content)
        print("✅ Created .env file from .env.example")
    elif env_file.exists():
        print("✅ .env file already exists")
    else:
        print("❌ .env.example not found")
        return False
    
    # Check if API key is set
    with open(env_file, 'r') as f:
        content = f.read()
        if 'your_google_api_key_here' in content:
            print("⚠️  Please set your GOOGLE_API_KEY in .env file")
            print("   Get your API key from: https://makersuite.google.com/app/apikey")
            return False
        else:
            print("✅ GOOGLE_API_KEY appears to be configured")
    
    return True

def install_dependencies():
    """Install Python dependencies."""
    print("\n📦 Installing dependencies...")
    
    try:
        # Try to install requirements
        result = subprocess.run([
            sys.executable, '-m', 'pip', 'install', '-r', 'requirements.txt'
        ], capture_output=True, text=True)
        
        if result.returncode == 0:
            print("✅ Dependencies installed successfully")
            return True
        else:
            print(f"❌ Failed to install dependencies: {result.stderr}")
            return False
            
    except Exception as e:
        print(f"❌ Error installing dependencies: {e}")
        return False

def test_imports():
    """Test that all modules can be imported."""
    print("\n🧪 Testing imports...")
    
    try:
        from app.main import app
        print("✅ Main app imported successfully")
        
        from app.services.gemini_client import GeminiClient
        print("✅ Gemini client imported successfully")
        
        from app.sample_data import SAMPLE_COMPANIES, load_sample_data
        print("✅ Sample data imported successfully")
        
        return True
        
    except Exception as e:
        print(f"❌ Import test failed: {e}")
        return False

def test_gemini_connection():
    """Test Gemini API connection."""
    print("\n🤖 Testing Gemini connection...")
    
    try:
        from app.services.gemini_client import GeminiClient
        
        # Try to create Gemini client
        client = GeminiClient()
        print("✅ Gemini client created successfully")
        
        # Test a simple question
        response = client.ask_question("What is industrial symbiosis?")
        if response and hasattr(response, 'answer'):
            print("✅ Gemini API connection working")
            print(f"   Sample response: {response.answer[:100]}...")
            return True
        else:
            print("❌ Gemini API response failed")
            return False
            
    except Exception as e:
        print(f"❌ Gemini connection test failed: {e}")
        print("   Make sure GOOGLE_API_KEY is set correctly")
        return False

def create_startup_script():
    """Create a startup script."""
    print("\n📝 Creating startup script...")
    
    startup_script = """#!/bin/bash
# Industrial Symbiosis Waste Stream Matchmaker - Startup Script

echo "🚀 Starting Industrial Symbiosis Waste Stream Matchmaker..."

# Check if virtual environment is activated
if [[ "$VIRTUAL_ENV" == "" ]]; then
    echo "⚠️  Virtual environment not activated"
    echo "   Please run: source .venv/bin/activate"
    exit 1
fi

# Check if .env file exists
if [[ ! -f ".env" ]]; then
    echo "❌ .env file not found"
    echo "   Please run: cp .env.example .env"
    echo "   Then edit .env and add your GOOGLE_API_KEY"
    exit 1
fi

# Start the server
echo "🌐 Starting FastAPI server..."
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
"""
    
    with open('start_server.sh', 'w') as f:
        f.write(startup_script)
    
    # Make it executable
    os.chmod('start_server.sh', 0o755)
    print("✅ Startup script created: start_server.sh")
    return True

def create_test_script():
    """Create a comprehensive test script."""
    print("\n🧪 Creating test script...")
    
    test_script = """#!/bin/bash
# Industrial Symbiosis Waste Stream Matchmaker - Test Script

echo "🧪 Testing Industrial Symbiosis Waste Stream Matchmaker API"
echo "=========================================================="

# Check if server is running
echo "📡 Checking if server is running..."
if curl -s http://localhost:8000/ > /dev/null; then
    echo "✅ Server is running"
else
    echo "❌ Server is not running"
    echo "   Please start it with: ./start_server.sh"
    exit 1
fi

echo ""
echo "🔧 Testing API endpoints..."

# Test 1: API status
echo "1. Testing API status..."
curl -s http://localhost:8000/ | python3 -m json.tool

# Test 2: Load sample data
echo ""
echo "2. Loading sample data..."
curl -X POST http://localhost:8000/load-sample-data

# Test 3: List companies
echo ""
echo "3. Listing companies..."
curl -s http://localhost:8000/companies/ | python3 -m json.tool

# Test 4: Find matches
echo ""
echo "4. Finding matches..."
curl -s http://localhost:8000/companies/matches | python3 -m json.tool

# Test 5: Ask AI question
echo ""
echo "5. Asking AI question..."
curl -X POST http://localhost:8000/ask/ \\
  -H "Content-Type: application/json" \\
  -d '{"question": "What are the benefits of industrial symbiosis?"}' | python3 -m json.tool

echo ""
echo "🎉 All tests completed!"
"""
    
    with open('test_api.sh', 'w') as f:
        f.write(test_script)
    
    # Make it executable
    os.chmod('test_api.sh', 0o755)
    print("✅ Test script created: test_api.sh")
    return True

def main():
    """Run production setup."""
    print("🏭 Industrial Symbiosis Waste Stream Matchmaker - Production Setup")
    print("=" * 70)
    
    setup_steps = [
        ("Python Version", check_python_version),
        ("Environment Setup", setup_environment),
        ("Dependencies", install_dependencies),
        ("Import Test", test_imports),
        ("Gemini Connection", test_gemini_connection),
        ("Startup Script", create_startup_script),
        ("Test Script", create_test_script)
    ]
    
    results = []
    for name, step_func in setup_steps:
        print(f"\n📋 {name}:")
        try:
            result = step_func()
            results.append(result)
        except Exception as e:
            print(f"❌ Error: {e}")
            results.append(False)
    
    print("\n" + "=" * 70)
    print("📊 PRODUCTION SETUP RESULTS")
    print("=" * 70)
    
    passed = sum(results)
    total = len(results)
    
    if passed == total:
        print("🎉 PRODUCTION SETUP COMPLETE!")
        print("✅ Your Industrial Symbiosis Waste Stream Matchmaker is ready!")
        print()
        print("🚀 To start the server:")
        print("   ./start_server.sh")
        print()
        print("🧪 To test the API:")
        print("   ./test_api.sh")
        print()
        print("📖 For more information:")
        print("   cat README.md")
    else:
        print(f"⚠️  {passed}/{total} setup steps completed")
        print("❌ Please fix the issues above")
        return 1
    
    return 0

if __name__ == "__main__":
    sys.exit(main())
