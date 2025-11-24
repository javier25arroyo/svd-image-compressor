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


app = FastAPI(title="SVD Image Compressor", version="1.0.0")

app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

app.include_router(http_router)


if __name__ == "__main__":  # pragma: no cover
	import uvicorn

	port = int(os.getenv("PORT", "8000"))
	reload_enabled = os.getenv("UVICORN_RELOAD", "true").lower() == "true"

	uvicorn.run(
		"backend.main:app",
		host="0.0.0.0",
		port=port,
		reload=reload_enabled,
		log_level="info",
	)