"""FastAPI entrypoint for the SVD Image Compressor backend."""

from __future__ import annotations

import os
import sys
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

ROOT_DIR = Path(__file__).resolve().parents[1]
if str(ROOT_DIR) not in sys.path:
        sys.path.insert(0, str(ROOT_DIR))

from backend.interfaces.http.routes import router as http_router

app = FastAPI(
    title="SVD Image Compressor",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Configure CORS - allow all origins for simplicity in deployment
# In production, consider restricting to specific origins
allowed_origins = os.getenv("ALLOWED_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins if allowed_origins != ["*"] else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(http_router)

if __name__ == "__main__":  # pragma: no cover
        import uvicorn

        port = int(os.getenv("PORT", "8000"))
        reload_enabled = os.getenv("UVICORN_RELOAD", "true").lower() == "true"
        
        # Log startup configuration for debugging deployment issues
        print(f"Starting server on host=0.0.0.0 port={port}")
        print(f"Reload enabled: {reload_enabled}")

        uvicorn.run(
            "backend.main:app",
            host="0.0.0.0",
            port=port,
            reload=reload_enabled,
            log_level="info",
            access_log=True,
        )
