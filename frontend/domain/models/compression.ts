export interface CompressionStats {
  originalSize: number;
  compressedSize: number;
  k: number;
  width: number;
  height: number;
}

export interface SvdResponse {
  image: Blob;
  stats: CompressionStats;
}
