import { SvdResponse } from '@domain/models/compression';
import { getApiUrl } from '@shared/config/env';

const API_URL = getApiUrl();

export const compressionClient = {
  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/health`);
      return response.ok;
    } catch (error) {
      return false;
    }
  },

  async compressImage(file: File, k: number): Promise<SvdResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('k', k.toString());

    const response = await fetch(`${API_URL}/compress`, {
      method: 'POST',
      mode: 'cors',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to compress image');
    }

    const imageBlob = await response.blob();
    const originalSize = parseInt(response.headers.get('X-Original-Size') || '0', 10);
    const compressedSize = parseInt(response.headers.get('X-Compressed-Size') || '0', 10);
    const width = parseInt(response.headers.get('X-Original-Width') || '0', 10);
    const height = parseInt(response.headers.get('X-Original-Height') || '0', 10);

    return {
      image: imageBlob,
      stats: {
        originalSize: originalSize || file.size,
        compressedSize: compressedSize || imageBlob.size,
        k,
        width,
        height,
      },
    };
  },
};
