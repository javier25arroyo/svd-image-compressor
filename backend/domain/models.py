from __future__ import annotations

from dataclasses import dataclass


@dataclass(slots=True)
class CompressionStats:
    """Metadata returned after compressing an image."""

    original_size: int
    compressed_size: int
    width: int
    height: int
    rank_used: int
