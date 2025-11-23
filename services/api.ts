import type { SvdResponse } from '../frontend/domain/models/compression';
import { compressionService } from '../frontend/application/services/compressionService';

export const checkBackendHealth = (): Promise<boolean> =>
  compressionService.checkHealth();

export const compressImage = (file: File, k: number): Promise<SvdResponse> =>
  compressionService.compressImage(file, k);
