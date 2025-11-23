from __future__ import annotations

import io
from dataclasses import dataclass

import numpy as np
from PIL import Image

from backend.domain.models import CompressionStats
from backend.domain.svd_compressor import compress_image_array


@dataclass(slots=True)
class CompressionRequest:
    """Incoming request data required to execute the compression use case."""

    raw_bytes: bytes
    k: int


@dataclass(slots=True)
class CompressionResult:
    """Outcome of the compression use case."""

    image_bytes: bytes
    stats: CompressionStats


def _load_image(raw_bytes: bytes) -> Image.Image:
    try:
        image = Image.open(io.BytesIO(raw_bytes))
    except Exception as exc:  # pragma: no cover - FastAPI will log the traceback
        raise ValueError("Unable to read image file") from exc

    return image.convert("RGB")


def execute_compression(request: CompressionRequest) -> CompressionResult:
    if request.k < 1:
        raise ValueError("Rank k must be at least 1")

    image = _load_image(request.raw_bytes)
    np_image = np.asarray(image, dtype=np.float64)

    compressed_array = compress_image_array(np_image, request.k)
    compressed_image = Image.fromarray(compressed_array)

    buffer = io.BytesIO()
    compressed_image.save(buffer, format="JPEG", quality=90)
    compressed_bytes = buffer.getvalue()

    stats = CompressionStats(
        original_size=len(request.raw_bytes),
        compressed_size=len(compressed_bytes),
        width=image.width,
        height=image.height,
        rank_used=min(request.k, min(image.width, image.height)),
    )

    return CompressionResult(image_bytes=compressed_bytes, stats=stats)
