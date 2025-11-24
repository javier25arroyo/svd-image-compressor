from __future__ import annotations

from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from fastapi.responses import Response

from backend.application.compression_service import (
    CompressionRequest,
    execute_compression,
)

router = APIRouter()


@router.get("/health")
async def health() -> dict[str, str]:
    """Health check endpoint for monitoring backend availability."""
    return {
        "status": "ok",
        "service": "svd-image-compressor-backend",
        "version": "1.0.0"
    }


@router.post("/compress")
async def compress_image(
    k: int = Form(..., ge=1, description="Rank (k) to keep for SVD reconstruction"),
    file: UploadFile = File(..., description="Image to compress (PNG, JPG, WebP, ...)")
) -> Response:
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Uploaded file must be an image")

    raw_bytes = await file.read()
    if not raw_bytes:
        raise HTTPException(status_code=400, detail="Uploaded file is empty")

    try:
        result = execute_compression(CompressionRequest(raw_bytes=raw_bytes, k=k))
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    headers = {
        "X-Original-Size": str(result.stats.original_size),
        "X-Compressed-Size": str(result.stats.compressed_size),
        "X-Original-Width": str(result.stats.width),
        "X-Original-Height": str(result.stats.height),
        "X-Rank-Used": str(result.stats.rank_used),
    }

    return Response(content=result.image_bytes, media_type="image/jpeg", headers=headers)
