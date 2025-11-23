import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    
    return {
      base: mode === 'production' ? '/svd-image-compressor/' : '/',
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
          '@app': path.resolve(__dirname, 'frontend/app'),
          '@ui': path.resolve(__dirname, 'frontend/ui'),
          '@domain': path.resolve(__dirname, 'frontend/domain'),
          '@application': path.resolve(__dirname, 'frontend/application'),
          '@infrastructure': path.resolve(__dirname, 'frontend/infrastructure'),
          '@shared': path.resolve(__dirname, 'frontend/shared'),
        }
      },
      define: {
        'import.meta.env.VITE_API_URL': JSON.stringify(
          env.VITE_API_URL || 'http://localhost:8000'
        ),
      }
    };
});
