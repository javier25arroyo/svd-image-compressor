import { compressionClient } from '@infrastructure/http/compressionClient';
import { SvdResponse } from '@domain/models/compression';

export const compressionService = {
  checkHealth: () => compressionClient.checkHealth(),
  compressImage: (file: File, k: number): Promise<SvdResponse> =>
    compressionClient.compressImage(file, k),
};
