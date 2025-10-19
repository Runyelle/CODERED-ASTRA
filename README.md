# WasteFlow

WasteFlow is a demo Industrial Symbiosis / Circular Exchange prototype that helps identify and match waste streams from producers with material needs at consumer companies. It provides a small backend with sample data and a React/Next.js frontend to browse active buyers, view matches, and run simple compatibility analyses.

## Purpose
- Demonstrate an end-to-end prototype for matching industrial waste streams with buyers.
- Provide a friendly UI to explore active buyers, their material needs, and AI-assisted compatibility insights.
- Ship a small self-contained dataset and tooling for evaluation and demoing.


## High-Level Architecture
- **Backend:** Python (FastAPI) in `backend/circ-exchange-mvp/`
  - Serves demo company data and match analysis endpoints
- **Frontend:** Next.js + React + TypeScript
  - Interactive UI for browsing companies, running AI analyses, and viewing matches


## Tech stack & languages
- Frontend
  - Next.js (React) — app router is used (files under `frontend/app/`)
  - React 19 + TypeScript
  - Tailwind CSS for styling
  - Other libs: lucide-react (icons), radix/ui pieces, sonner (notifications), recharts, and a small internal UI component set in `frontend/components`.

- Backend
  - Python 3 (FastAPI-style minimal server in `backend/circ-exchange-mvp/app/`)
  - Uses simple in-repo sample data (`sample_data.py`) to populate demo companies
  - Provides endpoints such as `/companies/demo`, `/companies/matches`, `/analyze/`, and `/ask/` via `app/routes`.

## Key features
- Interactive list of active buyers (material, quantity, price, AI match scores)
- Simple matchmaking and analysis endpoints in the backend
- Onboarding flow (sample steps in the frontend `components/onboarding`)
- Example logo support for buyers: images live in `frontend/public/images/buyers/` and the `BuyerCompanies` component will prefer logos from that folder. You can also pass a `logos` prop to the component for explicit control.

## Project layout
Root folders of interest:
- `backend/circ-exchange-mvp/` — Python demo server and sample data
  - `app/sample_data.py` — sample company definitions used by the demo backend
  - `app/routes/companies.py` — company listing/match endpoints
- `frontend/` — Next.js TypeScript frontend
  - `app/` — top-level pages and routing
  - `components/` — shared UI components including `buyer-companies.tsx`
  - `lib/` — API client used by frontend to talk to backend (`lib/api.ts`)
  - `public/images/buyers/` — place buyer logo images here named by company id (e.g. `tx-steel-001.svg`)

## How logos are handled
- The `BuyerCompanies` component accepts an optional `logos` prop (array of { id?, src, alt, width?, height? }). If provided, those images are used. If not, the component will try to load `/images/buyers/{company.id}.svg` (or .png fallback depending on your build) from the public folder. If an image fails to load the component shows an industry icon.
- There are example placeholder SVGs already checked into `frontend/public/images/buyers/` for the sample companies. To override, drop an SVG/PNG named by the sample company id.

## Running the project locally
Prerequisites: Node.js (recommend v18+), Python 3.11+ (for backend), and the usual package managers.
Backend default port: 8001  
Frontend default port: 3000 (can change to 3001)

Backend (demo server)
1. From the repo root run:
   ```bash
   cd backend/circ-exchange-mvp
   python -m venv .venv
   .venv\Scripts\activate     # Windows PowerShell
   pip install -r requirements.txt
   python run_server.py        # or `uvicorn app.main:app --reload` if you prefer
   ```
2. The demo backend exposes endpoints used by the frontend (by default `http://localhost:8001/`).

Frontend (Next.js)
1. From `frontend/`:
   ```powershell
   cd frontend
   npm install
   npm run dev
   ```
2. The app will start (default Next.js port). If port 3000 is occupied you can set a different port:
   ```powershell
   $env:PORT='3001'; npm run dev
   ```

API configuration
- The frontend uses `NEXT_PUBLIC_API_URL` to find the backend. If your backend runs on a different port, set `NEXT_PUBLIC_API_URL` in `.env.local` inside the `frontend/` folder, for example:
  NEXT_PUBLIC_API_URL=http://localhost:8001

## Sample data
- The backend includes `app/sample_data.py` with 8 sample companies. You can load the data into the store via the provided demo endpoints or scripts (see backend READMEs and `demo.sh`).

## How to add/change buyer logos
1. Add your logo files to `frontend/public/images/buyers/` and name them exactly using the company id from `sample_data.py` (for example `tx-steel-001.svg`).
2. If you prefer to use remote URLs or want to programmatically set logos, change the `BuyerCompanies` component usage to pass a `logos` prop, e.g.:
   ```tsx
   <BuyerCompanies logos={[{ id: 'tx-steel-001', src: '/images/buyers/tx-steel-001.svg', alt: 'Texas Steel' }]} />
   ```

## Development notes
- There is a small helper in `frontend/hooks/use-api.ts` that calls the backend and returns `companies`, `matches`, and utility hooks.
- If you update components or add images, restart the dev server if Next.js does not pick them up automatically.

## Tests
- Backend has some small unit tests under `backend/circ-exchange-mvp/tests/`.

## License & assets
- The placeholder logos included in `frontend/public/images/buyers/` are simple generated SVGs for demo purposes. If you add real third-party logos, make sure you have the right to include them in your repository and comply with any trademark/copyright rules.

## Where to go from here (suggested next steps)
- Replace placeholder logos with actual company logos you have rights to use (drop them into `frontend/public/images/buyers/`).
- Add automatic extension detection (try `.svg`, `.png`, `.jpg`) in the `BuyerCompanies` component.
- Switch to Next.js `Image` for optimized image serving.
- Add a simple admin page to upload logos to a storage bucket, then reference those hosted images.


