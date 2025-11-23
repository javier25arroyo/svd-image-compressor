import { SvdResponse } from '../types';

// Use environment variable for API URL, fallback to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/health`, {
      method: 'GET',
      mode: 'cors',
    });
    return response.ok;
  } catch (e) {
    return false;
  }
};

export const compressImage = async (file: File, k: number): Promise<SvdResponse> => {
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
  
  // Extract stats from custom headers sent by backend
  const originalSize = parseInt(response.headers.get('X-Original-Size') || '0');
  const compressedSize = parseInt(response.headers.get('X-Compressed-Size') || '0');
  const width = parseInt(response.headers.get('X-Original-Width') || '0');
  const height = parseInt(response.headers.get('X-Original-Height') || '0');
  
  return {
    image: imageBlob,
    stats: {
      originalSize: originalSize || file.size,
      compressedSize: compressedSize || imageBlob.size,
      k,
      width,
      height
    }
  };
};

