# GMS School and Classes Website

Website for **Greenvalley Montessori School** and **Expert Tution Center** (Aurangabad).  
Test Series is provided externally; this site only links to it.

## Structure

- **backend/** — Node.js + Express (API, optional static serve of frontend build)
- **frontend/** — React + Vite + React Router (School, Classes, Test Series pages)

## Setup

```bash
# Backend
cd backend
npm install
cp .env.example .env   # optional: set PORT
npm start

# Frontend (separate terminal)
cd frontend
npm install
npm run dev
```

- Frontend dev server: http://localhost:3000 (proxies `/api` to backend)
- Backend: http://localhost:3691

## Production

1. Build the frontend:

   ```bash
   cd frontend && npm run build
   ```

2. Start the backend (it will serve `frontend/dist` and the API):

   ```bash
   cd backend && npm start
   ```

   Open http://localhost:3691 (or your `PORT`).

## API (for future use)

- `GET /api/health` — health check
- `POST /api/contact` — contact form stub (ready for nodemailer/CMS later)
