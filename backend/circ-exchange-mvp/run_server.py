#!/usr/bin/env python3
"""
Simple server runner that bypasses dotenv issues.
"""

import os
import sys
from pathlib import Path

# Set the API key directly
os.environ['GOOGLE_API_KEY'] = 'AIzaSyB7MD_RfrNKogch8om_iQiI9ey5QDpQSHM'

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Import and run the app
if __name__ == "__main__":
    import uvicorn
    from app.main import app
    
    print("🚀 Starting Industrial Symbiosis Waste Stream Matchmaker API")
    print("=" * 60)
    print("🌐 Server will be available at: http://127.0.0.1:8001")
    print("📖 API documentation: http://127.0.0.1:8001/docs")
    print("🧪 Test the API with: ./api_demo.sh")
    print("=" * 60)
    
    uvicorn.run(app, host="127.0.0.1", port=8001, reload=False)
