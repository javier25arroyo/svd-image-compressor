import React from 'react';
import { Loader2 } from 'lucide-react';

interface ComparisonViewProps {
  originalUrl: string;
  compressedUrl: string | null;
  isProcessing: boolean;
  originalSize: number;
  compressedSize: number;
}

const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const ComparisonView: React.FC<ComparisonViewProps> = ({
  originalUrl,
  compressedUrl,
  isProcessing,
  originalSize,
  compressedSize,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
      <div className="space-y-3 group">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-1 bg-gradient-to-r from-slate-50 to-slate-100 p-3 sm:p-4 rounded-xl border border-slate-300 shadow-sm">
          <span className="text-sm sm:text-base font-bold text-slate-700 flex items-center">
            <span className="text-xl sm:text-2xl mr-2">📷</span>
            <span>Imagen Original</span>
          </span>
          <span className="text-xs sm:text-sm font-mono bg-slate-700 text-white px-3 py-1.5 rounded-lg font-bold shadow-md">
            {formatBytes(originalSize)}
          </span>
        </div>
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 border-2 border-slate-400 shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02] transform">
          <img src={originalUrl} alt="Original" className="w-full h-full object-contain" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      <div className="space-y-3 group">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-1 bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-50 p-3 sm:p-4 rounded-xl border-2 border-indigo-300 shadow-sm">
          <span className="text-sm sm:text-base font-bold text-indigo-900 flex items-center">
            <span className="text-xl sm:text-2xl mr-2">🗜️</span>
            <span>Resultado Comprimido</span>
          </span>
          <span className="text-xs sm:text-sm font-mono bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1.5 rounded-lg font-bold shadow-md">
            {compressedSize > 0 ? formatBytes(compressedSize) : '...'}
          </span>
        </div>
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 border-2 border-indigo-400 shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02] transform">
          {isProcessing && (
            <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-indigo-50/90 backdrop-blur-md z-10 flex items-center justify-center flex-col space-y-4">
              <div className="relative">
                <Loader2 className="w-12 h-12 sm:w-16 sm:h-16 text-indigo-600 animate-spin" />
                <div className="absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 text-purple-400 animate-spin animation-delay-150">
                  <Loader2 className="w-full h-full opacity-30" />
                </div>
              </div>
              <span className="text-sm sm:text-base font-bold text-indigo-800 animate-pulse">Comprimiendo imagen...</span>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          )}
          {compressedUrl ? (
            <img src={compressedUrl} alt="Comprimida" className="w-full h-full object-contain transition-all duration-500 animate-fadeIn" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm font-medium p-4 text-center">
              <div className="space-y-2">
                <div className="w-12 h-12 mx-auto border-4 border-slate-300 border-t-indigo-500 rounded-full animate-spin" />
                <p>Esperando procesamiento...</p>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
    </div>
  );
};
