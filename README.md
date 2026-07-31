# PDF Toolkit — Web App

A full‑stack PDF toolkit web application for common PDF operations (merge, split, convert). Built for developers and power users who want a self-hosted, extensible PDF service with a modern TypeScript React frontend and FastAPI backend.

## Key features
- Merge multiple PDFs into one
- Split PDF into pages or ranges
- Convert images → PDF and PDF → images
- Instantly download processed files
- User authentication, session handling, and background processing hooks
- Database-backed metadata storage (Postgres + SQLAlchemy)
- Migrations with Alembic, caching with Redis

## Tech Stack

| Category | Technology |
|----------|------------|
| Languages| <img src="https://skillicons.dev/icons?i=ts,py" /> |
| Frameworks / Runtimes | <img src="https://skillicons.dev/icons?i=react,vite,tailwind,fastapi" /> |
| Databases | <img src="https://skillicons.dev/icons?i=postgres,redis" /> |
| ORM & Migrations | **SQLAlchemy, Alembic** |
| Mai Service | **Resend (current), FastAPI Mail (Python)** |
| Cloud Platforms | <img src="https://skillicons.dev/icons?i=supabase,vercel" />   **UpstashRedis, Render** |
| Notable Libraries | **pypdf, pillow, uvicorn, fastapi-mail, python-multipart, pydantic, etc**|

## Repository layout
```
client/              # Frontend (React + TypeScript, Vite)
  package.json
  vite.config.ts
  src/                # React app (pages, components, API clients, styles)
  public/             # Static assets
  README.md           # Client-specific instructions

server/              # Backend (FastAPI)
  app/
    main.py           # FastAPI app entrypoint
    auth/             # Authentication (routers, services, models, utils)
    pdf/              # PDF routes + services (merge/split/conversion)
    core/             # DB, Redis, config, sessions
  alembic/            # DB migrations
  alembic.ini
  requirements.txt

docs/                # Design notes: SQLAlchemy patterns, Tailwind tips
.gitignore
README.md            # This file
```

How it fits together:
- The React frontend (client/) calls the FastAPI backend (server/) API endpoints to upload and manipulate PDFs.
- The backend uses SQLAlchemy/Postgres to store metadata and Alembic for schema migrations. Redis is used for background task coordination.
- PDF processing logic lives under server/app/pdf and is exposed via dedicated API routes (e.g. /api/pdf/*). Authentication routes live under server/app/auth.

---

## Quickstart — run locally

Prerequisites
- Node.js (16+), npm or pnpm
- Python 3.10+ (match your runtime.txt if specified)
- PostgreSQL database
- Redis (optional, recommended if the app uses Redis)
- Git

1. Clone
```bash
git clone https://github.com/prashant348/PDF-toolkit-web-app.git
cd PDF-toolkit-web-app
```

2. Backend — install & run
```bash
# from repository root
cd server

# Create a Python virtual environment
python -m venv .venv
source .venv/bin/activate   # Linux/macOS
# .venv\Scripts\Activate.ps1    # Windows

# Install dependencies
pip install -r requirements.txt

# Set environment variables (example)
export DATABASE_URL=postgresql://user:pass@localhost:5432/pdf_toolkit
export REDIS_URL=redis://localhost:6379/0
export SECRET_KEY="your-secret-key"
export SMTP_HOST="smtp.example.com"
export SMTP_PORT=587
export SMTP_USER="..."
export SMTP_PASSWORD="..."
export FRONTEND_URL="http://localhost:5173"

# Run DB migrations
alembic upgrade head --config alembic.ini

# Start dev server
python app/main.py
```

Notes:
- The FastAPI app provides interactive API docs at: http://localhost:8000/docs (Swagger UI) and /redoc.
- Adjust environment variable names and values to your deployment.

3. Frontend — install & run
```bash
cd ../client
npm install
npm run dev
# or
# pnpm install
# pnpm dev
```
- The Vite dev server typically runs on http://localhost:5173 (check the client/README.md for exact ports).
- For production builds:
```bash
npm run build
npm run preview   # optional, to preview the production build
```

---

## Common tasks

- Run backend migrations
  - From server/: `alembic upgrade head --config alembic.ini`
- Start backend locally
  - `uvicorn app.main:app --reload --host 0.0.0.0 --port 8000` (from server/)
- Start frontend locally
  - `npm run dev` (from client/)
- Build frontend for production
  - `npm run build` (from client/)

---

## Example API usage

Merge PDFs (example)
```bash
curl -X POST "http://localhost:8000/api/pdf/merge" \
  -F "files=@./file1.pdf" \
  -F "files=@./file2.pdf" \
  --output merged.pdf
```

Split PDF (example)
```bash
curl -X POST "http://localhost:8000/api/pdf/split" \
  -F "file=@./source.pdf" \
  -F "pages=1-3,5,7-"
```

Note: The exact endpoint paths and request fields are implemented in server/app/pdf/router.py — check that file for canonical parameter names and any authentication requirements.

---

## Configuration / Environment variables
(Adjust names to match your server/app/core/config.py)
- DATABASE_URL — Postgres connection string
- REDIS_URL — Redis connection string (optional)
- SECRET_KEY — application secret for signing tokens/sessions
- SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD — email settings for password reset / verification
- FRONTEND_URL — origin of the client app for CORS / links
- EXTRA: any storage paths or cloud storage keys if you offload files

---

## Migrations & Database
- Alembic is included at server/alembic/ and server/alembic.ini config.
- After changing SQLAlchemy models, generate + run migrations:
  - `alembic revision --autogenerate -m "describe change" --config alembic.ini`
  - `alembic upgrade head --config alembic.ini`

Docs about SQLAlchemy patterns are in docs/SQLAlchemy.md.

---

## Deployment hints
- Client: vercel.json exists — the client is ready to deploy to Vercel or any static hosting that supports SPA.
- Server: Deploy the Python FastAPI server to Render. Ensure env vars and DB connections are secure.

---

## Development notes & docs
- See docs/TailwindCSS.md for setting up Tailwind v4 with React.
- See server/SQLAlchemy for setting up SQLAlchemy ORM with PostgreSQL & FastAPI.
- See server/ for authentication patterns (server/app/auth) and PDF logic (server/app/pdf).
- Redis integration exists under server/app/core/redis.py for background task coordination.

---

## License

This project is proprietary. All rights reserved. See [LICENSE.md](LICENSE.md) for details.  
Viewing the repository does not grant permission to copy, modify, distribute, or claim the project as your own.
