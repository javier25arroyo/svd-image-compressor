import React, { useState, useEffect } from 'react';
import { Activity, AlertTriangle, Github } from 'lucide-react';

import { UploadArea } from '@ui/components/UploadArea';
import { Controls } from '@ui/components/Controls';
import { ComparisonView } from '@ui/components/ComparisonView';
import { MathFormulas } from '@ui/components/MathFormulas';
import { compressionService } from '@application/services/compressionService';
import { useDebounce } from '@shared/hooks/useDebounce';

export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [compressedPreview, setCompressedPreview] = useState<string | null>(null);

  const [kValue, setKValue] = useState<number>(50);
  const [maxK, setMaxK] = useState<number>(100);

  const [isProcessing, setIsProcessing] = useState(false);
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [error, setError] = useState<string | null>(null);

  const [stats, setStats] = useState({ originalSize: 0, compressedSize: 0 });

  const debouncedK = useDebounce(kValue, 500);

  useEffect(() => {
    compressionService.checkHealth().then(isOnline => {
      setBackendStatus(isOnline ? 'online' : 'offline');
    });
  }, []);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setOriginalPreview(objectUrl);
    setStats(prev => ({ ...prev, originalSize: selectedFile.size, compressedSize: 0 }));

    setCompressedPreview(null);
    setError(null);

    setMaxK(200);
    setKValue(50);
  };

  useEffect(() => {
    if (!file || backendStatus !== 'online') return;

    const process = async () => {
      setIsProcessing(true);
      setError(null);
      try {
        const response = await compressionService.compressImage(file, debouncedK);

        if (compressedPreview) URL.revokeObjectURL(compressedPreview);

        const newUrl = URL.createObjectURL(response.image);
        setCompressedPreview(newUrl);
        setStats(prev => ({
          ...prev,
          compressedSize: response.stats.compressedSize,
        }));
      } catch (err) {
        console.error(err);
        setError('Error al comprimir la imagen. Asegúrate de que el servidor backend esté ejecutándose.');
      } finally {
        setIsProcessing(false);
      }
    };

    process();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedK, file, backendStatus]);

  const handleDownload = () => {
    if (!compressedPreview) return;

    const link = document.createElement('a');
    link.href = compressedPreview;
    link.download = `svd-compressed-${kValue}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadOriginal = () => {
    if (!originalPreview) return;

    const link = document.createElement('a');
    link.href = originalPreview;
    link.download = 'original-image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const compressionRatio = stats.originalSize > 0
    ? ((stats.originalSize - stats.compressedSize) / stats.originalSize) * 100
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20 pb-20">
      <header className="bg-white/80 backdrop-blur-lg border-b border-slate-200/50 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 sm:p-2.5 rounded-xl shadow-lg shadow-indigo-300/50 hover:scale-110 transition-transform duration-300">
              <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight">Compresor SVD</h1>
              <p className="hidden sm:block text-xs text-slate-500 font-medium">Descomposición en Valores Singulares</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className={`flex items-center space-x-1.5 sm:space-x-2 px-2 sm:px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
              backendStatus === 'online'
                ? 'bg-green-50 text-green-700 border border-green-200 shadow-sm shadow-green-200'
                : 'bg-red-50 text-red-700 border border-red-200 shadow-sm shadow-red-200'
            }`}>
              <div className={`w-2 h-2 rounded-full ${backendStatus === 'online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
              <span className="hidden sm:inline">API: {backendStatus === 'online' ? 'EN LÍNEA' : 'FUERA DE LÍNEA'}</span>
              <span className="sm:hidden">{backendStatus === 'online' ? '✓' : '✗'}</span>
            </div>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-600 transition-all duration-300 hover:scale-110 transform">
              <Github className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {backendStatus === 'offline' && (
          <div className="mb-6 sm:mb-8 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 p-4 sm:p-6 rounded-r-2xl shadow-lg animate-fadeIn">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="bg-amber-100 p-2 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                </div>
              </div>
              <div className="ml-3 sm:ml-4 flex-1">
                <h3 className="text-sm sm:text-base font-bold text-amber-900 mb-2">Backend Desconectado</h3>
                <div className="mt-2 text-xs sm:text-sm text-amber-800 space-y-1">
                  <p>El servidor API de Python no está disponible en <code className="bg-amber-100 px-2 py-0.5 rounded font-mono text-xs">http://localhost:8000</code>.</p>
                  <p className="mt-1">Por favor ejecuta <code className="bg-amber-100 px-2 py-0.5 rounded font-mono text-xs">python backend/main.py</code> para habilitar la compresión.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-rose-50 text-red-700 rounded-2xl border-l-4 border-red-500 flex items-center shadow-lg animate-fadeIn">
            <div className="bg-red-100 p-2 rounded-lg mr-3">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <span className="text-sm sm:text-base">{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            {!file ? (
              <div className="animate-fadeIn">
                <UploadArea onFileSelect={handleFileSelect} />
              </div>
            ) : (
              <>
                <button
                  onClick={() => {
                    setFile(null);
                    setOriginalPreview(null);
                    setCompressedPreview(null);
                  }}
                  className="flex items-center space-x-2 text-sm sm:text-base text-indigo-600 hover:text-indigo-700 font-medium mb-2 group transition-all duration-200 animate-fadeIn"
                >
                  <span className="transform group-hover:-translate-x-1 transition-transform duration-200">←</span>
                  <span className="group-hover:underline">Subir imagen diferente</span>
                </button>
                <div className="animate-fadeIn">
                  <Controls
                    kValue={kValue}
                    setKValue={setKValue}
                    maxK={maxK}
                    isProcessing={isProcessing}
                    onDownload={handleDownload}
                    compressionRatio={compressionRatio}
                    onDownloadOriginal={handleDownloadOriginal}
                  />
                </div>
              </>
            )}

            {file && (
              <div className="animate-fadeIn">
                <MathFormulas kValue={kValue} />
              </div>
            )}

            <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-slate-100 p-5 sm:p-6 rounded-2xl text-sm leading-relaxed shadow-2xl border border-indigo-700/50 hover:shadow-indigo-500/20 transition-shadow duration-300 animate-fadeIn">
              <h4 className="text-white font-bold mb-3 text-base sm:text-lg flex items-center">
                <span className="mr-2 text-xl">💡</span> ¿Cómo Funciona?
              </h4>
              <p className="mb-3 text-xs sm:text-sm">
                La <strong className="text-indigo-200">Descomposición en Valores Singulares (SVD)</strong> factoriza la matriz de la imagen en tres matrices.
              </p>
              <p className="text-xs sm:text-sm">
                Al mantener solo los primeros <span className="text-white font-mono bg-indigo-700/50 px-2 py-0.5 rounded border border-indigo-500">k</span> valores singulares más importantes,
                reconstruimos una aproximación de la imagen, comprimiéndola efectivamente mientras descartamos ruido y detalles menos relevantes.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            {file && originalPreview ? (
              <div className="animate-fadeIn">
                <ComparisonView
                  originalUrl={originalPreview}
                  compressedUrl={compressedPreview}
                  isProcessing={isProcessing}
                  originalSize={stats.originalSize}
                  compressedSize={stats.compressedSize}
                />
              </div>
            ) : (
              <div className="h-full min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] flex flex-col items-center justify-center border-2 border-dashed border-indigo-200 rounded-2xl bg-gradient-to-br from-white/50 to-indigo-50/30 backdrop-blur-sm hover:border-indigo-300 transition-all duration-300 animate-fadeIn">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-4 shadow-lg animate-pulse">
                  <Activity className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-500" />
                </div>
                <p className="text-slate-600 font-semibold text-center px-4 text-sm sm:text-base">Sube una imagen para comenzar a visualizar la compresión SVD</p>
                <p className="text-slate-400 text-xs sm:text-sm mt-2">Las fórmulas matemáticas aparecerán aquí</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
