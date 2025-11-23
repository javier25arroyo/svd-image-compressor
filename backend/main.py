"""FastAPI backend that compresses images using Singular Value Decomposition (SVD).

The API exposes two routes:
1. GET /health    -> simple readiness probe used by the React client
2. POST /compress -> accepts an image and desired rank (k) and returns the compressed image bytes

Run locally with:
	python backend/main.py

This will launch uvicorn on http://localhost:8000 with auto-reload enabled.
"""

from __future__ import annotations

import io
from typing import Iterable

import numpy as np
from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from PIL import Image, ImageFilter


app = FastAPI(title="SVD Image Compressor", version="1.0.0")

app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)


@app.get("/health")
async def health() -> dict[str, str]:
	"""Health endpoint used by the frontend to verify the API is running."""

	return {"status": "ok"}


def _svd_compress_channel(channel: np.ndarray, k: int) -> np.ndarray:
	"""Apply SVD to a single 2D channel and keep only the top-k components."""

	u, s, vh = np.linalg.svd(channel, full_matrices=False)
	effective_rank = min(k, len(s))
	if effective_rank <= 0:
		raise ValueError("Rank k must be at least 1")

	# (u[:, :k] * s[:k]) leverages broadcasting to avoid building a diagonal matrix explicitly
	reconstructed = (u[:, :effective_rank] * s[:effective_rank]) @ vh[:effective_rank, :]
	return reconstructed


def _compress_image_array(image_array: np.ndarray, k: int) -> np.ndarray:
	"""Compress an RGB (or grayscale) numpy image array using SVD per channel."""

	if image_array.ndim == 2:  # grayscale -> add channel axis for uniform processing
		image_array = image_array[:, :, np.newaxis]

	height, width, channels = image_array.shape
	max_rank = min(height, width)
	if max_rank == 0:
		raise ValueError("Image has invalid dimensions")

	clamped_k = max(1, min(k, max_rank))

	compressed_channels: Iterable[np.ndarray] = (
		_svd_compress_channel(image_array[:, :, idx], clamped_k)
		for idx in range(channels)
	)

	compressed = np.stack(list(compressed_channels), axis=-1)
	compressed = np.clip(compressed, 0, 255).astype(np.uint8)

	if compressed.shape[-1] == 1:  # drop singleton channel if grayscale
		compressed = compressed[:, :, 0]

	return compressed


@app.post("/compress")
async def compress_image(
	k: int = Form(..., ge=1, description="Rank (k) to keep for SVD reconstruction"),
	file: UploadFile = File(..., description="Image to compress (PNG, JPG, WebP, ...)")
) -> Response:
	"""Receive an image, run SVD compression, and return the compressed bytes."""

	if not file.content_type or not file.content_type.startswith("image/"):
		raise HTTPException(status_code=400, detail="Uploaded file must be an image")

	raw_bytes = await file.read()
	if not raw_bytes:
		raise HTTPException(status_code=400, detail="Uploaded file is empty")

	try:
		image = Image.open(io.BytesIO(raw_bytes))
	except Exception as exc:  # pragma: no cover - defensive; FastAPI will log
		raise HTTPException(status_code=400, detail="Unable to read image file") from exc

	image = image.convert("RGB")  # ensure consistent channels
	np_image = np.asarray(image, dtype=np.float64)

	compressed_array = _compress_image_array(np_image, k)
	compressed_image = Image.fromarray(compressed_array)

	buffer = io.BytesIO()
	compressed_image.save(buffer, format="JPEG", quality=90)
	compressed_bytes = buffer.getvalue()

	headers = {
		"X-Original-Size": str(len(raw_bytes)),
		"X-Compressed-Size": str(len(compressed_bytes)),
		"X-Original-Width": str(image.width),
		"X-Original-Height": str(image.height),
		"X-Rank-Used": str(min(k, min(image.width, image.height))),
	}

	return Response(content=compressed_bytes, media_type="image/jpeg", headers=headers)



if __name__ == "__main__":  # pragma: no cover
	import uvicorn

	uvicorn.run(
		"main:app",
		host="0.0.0.0",
		port=8000,
		reload=True,
		log_level="info",
	)