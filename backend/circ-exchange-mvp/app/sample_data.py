"""
Sample data for the Industrial Symbiosis Waste Stream Matchmaker.
Contains 8 Texas companies with realistic waste streams and needs.
"""

from .models import Company, Material

# Texas company sample data
SAMPLE_COMPANIES = [
    Company(
        id="tx-steel-001",
        name="Texas Steel Manufacturing",
        latitude=29.7604,
        longitude=-95.3698,
        waste_streams=[
            Material(
                name="Steel Slag",
                composition={"CaO": 0.45, "SiO2": 0.25, "Fe2O3": 0.15, "Al2O3": 0.10, "MgO": 0.05}
            ),
            Material(
                name="Mill Scale",
                composition={"Fe2O3": 0.70, "FeO": 0.20, "SiO2": 0.05, "Al2O3": 0.03, "CaO": 0.02}
            )
        ],
        needs=[
            Material(
                name="Scrap Metal",
                composition={"Fe": 0.85, "C": 0.10, "Si": 0.03, "Mn": 0.02}
            )
        ],
        quantity=50000.0,
        disposal_cost=25.0
    ),
    
    Company(
        id="tx-cement-002",
        name="Houston Cement Works",
        latitude=29.4241,
        longitude=-95.2444,
        waste_streams=[
            Material(
                name="Cement Kiln Dust",
                composition={"CaO": 0.50, "SiO2": 0.20, "Al2O3": 0.15, "Fe2O3": 0.10, "K2O": 0.05}
            )
        ],
        needs=[
            Material(
                name="Alternative Raw Materials",
                composition={"CaO": 0.40, "SiO2": 0.30, "Al2O3": 0.20, "Fe2O3": 0.10}
            ),
            Material(
                name="Steel Slag",
                composition={"CaO": 0.45, "SiO2": 0.25, "Fe2O3": 0.15, "Al2O3": 0.10, "MgO": 0.05}
            )
        ],
        quantity=30000.0,
        disposal_cost=15.0
    ),
    
    Company(
        id="tx-chemical-003",
        name="Gulf Coast Chemical Solutions",
        latitude=29.3013,
        longitude=-94.7977,
        waste_streams=[
            Material(
                name="Spent Solvents",
                composition={"Toluene": 0.40, "Xylene": 0.25, "Acetone": 0.20, "Methanol": 0.15}
            ),
            Material(
                name="Acid Waste",
                composition={"H2SO4": 0.60, "HCl": 0.25, "HNO3": 0.10, "H3PO4": 0.05}
            )
        ],
        needs=[
            Material(
                name="Clean Solvents",
                composition={"Toluene": 0.50, "Xylene": 0.30, "Acetone": 0.20}
            )
        ],
        quantity=15000.0,
        disposal_cost=75.0
    ),
    
    Company(
        id="tx-food-004",
        name="Austin Organic Processing",
        latitude=30.2672,
        longitude=-97.7431,
        waste_streams=[
            Material(
                name="Organic Waste",
                composition={"Cellulose": 0.40, "Lignin": 0.25, "Proteins": 0.20, "Lipids": 0.10, "Ash": 0.05}
            ),
            Material(
                name="Food Processing Waste",
                composition={"Carbohydrates": 0.50, "Proteins": 0.30, "Lipids": 0.15, "Ash": 0.05}
            )
        ],
        needs=[
            Material(
                name="Nutrient-Rich Compost",
                composition={"Organic Matter": 0.60, "N": 0.15, "P": 0.08, "K": 0.10, "pH": 0.07}
            )
        ],
        quantity=25000.0,
        disposal_cost=20.0
    ),
    
    Company(
        id="tx-power-005",
        name="Dallas Power Generation",
        latitude=32.7767,
        longitude=-96.7970,
        waste_streams=[
            Material(
                name="Fly Ash",
                composition={"SiO2": 0.50, "Al2O3": 0.25, "Fe2O3": 0.15, "CaO": 0.05, "MgO": 0.05}
            ),
            Material(
                name="Bottom Ash",
                composition={"SiO2": 0.40, "Al2O3": 0.20, "Fe2O3": 0.20, "CaO": 0.10, "Unburned Carbon": 0.10}
            )
        ],
        needs=[
            Material(
                name="Concrete Additives",
                composition={"SiO2": 0.45, "Al2O3": 0.20, "Fe2O3": 0.15, "CaO": 0.10, "MgO": 0.10}
            )
        ],
        quantity=40000.0,
        disposal_cost=12.0
    ),
    
    Company(
        id="tx-paper-006",
        name="San Antonio Paper Mill",
        latitude=29.4241,
        longitude=-98.4936,
        waste_streams=[
            Material(
                name="Paper Sludge",
                composition={"Cellulose": 0.60, "Lignin": 0.20, "Clay": 0.10, "Water": 0.10}
            ),
            Material(
                name="Bark Waste",
                composition={"Lignin": 0.40, "Cellulose": 0.35, "Hemicellulose": 0.20, "Ash": 0.05}
            )
        ],
        needs=[
            Material(
                name="Wood Chips",
                composition={"Cellulose": 0.50, "Lignin": 0.30, "Hemicellulose": 0.15, "Ash": 0.05}
            )
        ],
        quantity=18000.0,
        disposal_cost=18.0
    ),
    
    Company(
        id="tx-refinery-007",
        name="Corpus Christi Refinery",
        latitude=27.8006,
        longitude=-97.3964,
        waste_streams=[
            Material(
                name="Catalyst Fines",
                composition={"Al2O3": 0.60, "SiO2": 0.25, "Ni": 0.08, "V": 0.05, "Mo": 0.02}
            ),
            Material(
                name="Spent Caustic",
                composition={"NaOH": 0.80, "Na2S": 0.15, "Water": 0.05}
            )
        ],
        needs=[
            Material(
                name="Fresh Catalyst",
                composition={"Al2O3": 0.70, "SiO2": 0.20, "Ni": 0.05, "Mo": 0.05}
            )
        ],
        quantity=12000.0,
        disposal_cost=45.0
    ),
    
    Company(
        id="tx-agriculture-008",
        name="West Texas Agricultural Co-op",
        latitude=31.9686,
        longitude=-99.9018,
        waste_streams=[
            Material(
                name="Cotton Gin Waste",
                composition={"Cellulose": 0.70, "Lignin": 0.15, "Proteins": 0.10, "Ash": 0.05}
            ),
            Material(
                name="Crop Residues",
                composition={"Cellulose": 0.50, "Hemicellulose": 0.25, "Lignin": 0.15, "Ash": 0.10}
            )
        ],
        needs=[
            Material(
                name="Organic Fertilizer",
                composition={"N": 0.20, "P": 0.10, "K": 0.15, "Organic Matter": 0.55}
            ),
            Material(
                name="Animal Feed",
                composition={"Proteins": 0.30, "Carbohydrates": 0.50, "Lipids": 0.15, "Ash": 0.05}
            )
        ],
        quantity=35000.0,
        disposal_cost=8.0
    )
]


def load_sample_data():
    """Load sample data into the store."""
    from .store import STORE
    
    for company in SAMPLE_COMPANIES:
        STORE.upsert_company(company)
    
    return len(SAMPLE_COMPANIES)
