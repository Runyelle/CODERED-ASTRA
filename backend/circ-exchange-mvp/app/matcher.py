from typing import Dict, Tuple, Optional
from math import radians, sin, cos, sqrt, atan2

# ---------- Geo ----------
def haversine_km(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    R = 6371.0  # Earth radius km
    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)
    a = sin(dlat/2)**2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon/2)**2
    c = 2 * atan2(sqrt(a), sqrt(1-a))
    return R * c

# ---------- Chemistry similarity ----------
def _normalize_comp(comp: Dict[str, float]) -> Dict[str, float]:
    if not comp:
        return {}
    # Detect if values look like percentages (>1). If any >1, treat as 0..100 and normalize to sum=1
    if any(v > 1.0 for v in comp.values()):
        total = sum(max(v, 0.0) for v in comp.values())
    else:
        total = sum(max(v, 0.0) for v in comp.values())
    if total <= 0:
        return {}
    return {k.lower(): max(v, 0.0) / total for k, v in comp.items()}

def weighted_jaccard(comp_a: Dict[str, float], comp_b: Dict[str, float]) -> float:
    a = _normalize_comp(comp_a)
    b = _normalize_comp(comp_b)
    if not a or not b:
        return 0.0
    keys = set(a) | set(b)
    intersection = 0.0
    union = 0.0
    for k in keys:
        av = a.get(k, 0.0)
        bv = b.get(k, 0.0)
        intersection += min(av, bv)
        union += max(av, bv)
    return intersection / union if union > 0 else 0.0

def score_match(sim: float, distance_km: float, radius_km: float) -> float:
    # Simple linear blend (tune these for the hackathon pitch)
    # If outside radius, we discount more strongly.
    distance_term = min(distance_km / max(radius_km, 1.0), 1.0)
    raw = 0.7 * sim + 0.3 * (1.0 - distance_term)
    return max(0.0, min(1.0, raw))
