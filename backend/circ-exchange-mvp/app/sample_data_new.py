"""
New sample data loader that uses the fakeData.json structure.
"""

import json
from pathlib import Path
from .store import STORE

def load_fake_data():
    """Load data from fakeData.json into the store."""
    # Load the fakeData.json file
    fake_data_path = Path(__file__).parent.parent / "fakeData.json"
    
    with open(fake_data_path, 'r') as f:
        data = json.load(f)
    
    companies = data.get('companies', [])
    
    # Clear existing data
    STORE.clear_all()
    
    # Load each company
    for company_data in companies:
        STORE.upsert_company_from_dict(company_data)
    
    return len(companies)
