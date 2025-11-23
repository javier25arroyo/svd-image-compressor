from __future__ import annotations

from typing import Iterable

import numpy as np


def _svd_compress_channel(channel: np.ndarray, k: int) -> np.ndarray:
    """Apply SVD to a single 2D channel and keep only the top-k components."""

    u, s, vh = np.linalg.svd(channel, full_matrices=False)
    effective_rank = min(k, len(s))
    if effective_rank <= 0:
        raise ValueError("Rank k must be at least 1")

    reconstructed = (u[:, :effective_rank] * s[:effective_rank]) @ vh[:effective_rank, :]
    return reconstructed


def compress_image_array(image_array: np.ndarray, k: int) -> np.ndarray:
    """Compress an RGB (or grayscale) numpy image array using SVD per channel."""

    if image_array.ndim == 2:
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

    if compressed.shape[-1] == 1:
        compressed = compressed[:, :, 0]

    return compressed
