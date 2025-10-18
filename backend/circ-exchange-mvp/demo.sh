#!/usr/bin/env bash
set -euo pipefail

# Simple demo script for local development. Assumes uvicorn and deps are installed.

ROOT_DIR=$(cd "$(dirname "$0")" && pwd)

echo "Starting uvicorn in background..."
uvicorn app.main:app --reload &
PID=$!
trap 'echo "Killing uvicorn..."; kill $PID || true' EXIT

sleep 1

echo "Loading sample data..."
curl -s -X POST -H "Content-Type: application/json" --data @${ROOT_DIR}/sample_data.json http://127.0.0.1:8000/facilities/bulk | jq || true

echo "Querying match for fac_eco_pack..."
curl -s "http://127.0.0.1:8000/match/fac_eco_pack?radius_km=800&top_k=5" -o out_match.json
jq . out_match.json || cat out_match.json

echo "Building explain request from top candidate..."
python3 - <<'PY'
import json
data=json.load(open('out_match.json'))
src=data['source_facility']
cand=data['candidates'][0]
req={
  'source': src,
  'candidate': next((f for f in json.load(open('sample_data.json')) if f['id']==cand['facility_id']), {}),
  'distance_km': cand['distance_km'],
  'matched_waste': cand['matched_waste'],
  'matched_need': cand['matched_need'],
  'score': cand['score']
}
json.dump(req, open('explain_req.json','w'), indent=2)
print('Wrote explain_req.json')
PY

echo "Calling /explain (may return 400 if GOOGLE_API_KEY missing)..."
curl -s -X POST -H "Content-Type: application/json" --data @explain_req.json http://127.0.0.1:8000/explain | jq || cat

echo "Demo finished."
