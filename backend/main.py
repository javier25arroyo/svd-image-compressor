from __future__ import annotations

import sys
from pathlib import Path

import os

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

ROOT_DIR = Path(__file__).resolve().parents[1]
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from backend.interfaces.http.routes import router as http_router

app = FastAPI(title="SVD Image Compressor", version="1.0.0")

# Serve frontend static files
dist_dir = Path(__file__).resolve().parents[1] / "dist"
app.mount("/assets", StaticFiles(directory=dist_dir / "assets"), name="assets")

allowed_origins_str = os.getenv("ALLOWED_ORIGINS", "*")
allowed_origins = ["*"] if allowed_origins_str == "*" else allowed_origins_str.split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(http_router)

@app.middleware("http")
async def spa_middleware(request: Request, call_next):
    """Middleware to serve index.html for SPA routes."""
    response = await call_next(request)
    if response.status_code == 404 and not request.url.path.startswith("/api"):
        return FileResponse(f"{dist_dir}/index.html")
    return response


if __name__ == "__main__": 
        import uvicorn


        uvicorn.run(
                "backend.main:app",
                host="localhost",
                port=8000,
                reload=True,
                log_level="info",
        )