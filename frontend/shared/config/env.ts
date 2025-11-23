const FALLBACK_API_URL = 'http://localhost:8000';

export const getApiUrl = (): string =>
  import.meta.env.VITE_API_URL || FALLBACK_API_URL;
