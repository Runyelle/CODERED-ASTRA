import math
from app.matcher import _normalize_comp, weighted_jaccard, score_match


def test_normalize_empty():
    assert _normalize_comp({}) == {}


def test_normalize_negatives_and_percentages():
    comp = {"A": -5, "B": 50, "C": 50}
    norm = _normalize_comp(comp)
    # negatives coerced to 0, B and C are 50 each -> normalized equal
    assert math.isclose(norm.get("b", 0), 0.5, rel_tol=1e-6)
    assert math.isclose(norm.get("c", 0), 0.5, rel_tol=1e-6)


def test_weighted_jaccard_identical():
    a = {"x": 60, "y": 40}
    b = {"x": 0.6, "y": 0.4}
    assert weighted_jaccard(a, b) == 1.0


def test_weighted_jaccard_disjoint():
    a = {"x": 1.0}
    b = {"y": 1.0}
    assert weighted_jaccard(a, b) == 0.0


def test_weighted_jaccard_partial():
    a = {"x": 0.7, "y": 0.3}
    b = {"x": 0.4, "z": 0.6}
    val = weighted_jaccard(a, b)
    assert 0.0 < val < 1.0


def test_score_match_clipping():
    # sim=1, distance=0 -> score=1
    assert score_match(1.0, 0.0, 500.0) == 1.0
    # sim=0, distance large -> score clipped to 0
    assert score_match(0.0, 10000.0, 500.0) == 0.0
