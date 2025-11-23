import React from 'react';
import { Settings2, Download } from 'lucide-react';

interface ControlsProps {
  kValue: number;
  setKValue: (val: number) => void;
  maxK: number;
  isProcessing: boolean;
  onDownload: () => void;
  compressionRatio: number;
  onDownloadOriginal: () => void;

}

export const Controls: React.FC<ControlsProps> = ({
  kValue,
  setKValue,
  maxK,
  isProcessing,
  onDownload,
  compressionRatio,
  onDownloadOriginal,

}) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm p-5 sm:p-6 rounded-2xl shadow-xl border border-slate-200/50 space-y-5 sm:space-y-6 hover:shadow-2xl transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <div className="flex items-center space-x-2 text-indigo-600">
          <div className="p-1.5 bg-indigo-100 rounded-lg">
            <Settings2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <h3 className="font-bold text-sm sm:text-base">Configuración de Compresión</h3>
        </div>
        <span className="text-xs font-bold px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 rounded-full border border-indigo-200 shadow-sm w-fit">
          Algoritmo SVD
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center text-sm bg-gradient-to-r from-slate-50 to-indigo-50 p-3 rounded-xl border border-slate-200">
          <span className="text-slate-600 font-semibold">Rango (valor k)</span>
          <div className="flex items-center space-x-2">
            <span className="text-slate-900 font-bold text-2xl sm:text-3xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{kValue}</span>
            <span className="text-xs text-slate-500">/ {maxK}</span>
          </div>
        </div>
        <div className="relative">
          <input
            type="range"
            min="1"
            max={maxK > 0 ? maxK : 100}
            value={kValue}
            onChange={(e) => setKValue(Number(e.target.value))}
            disabled={isProcessing}
            className="w-full h-3 bg-gradient-to-r from-indigo-200 via-indigo-300 to-purple-400 rounded-lg appearance-none cursor-pointer accent-indigo-600 disabled:opacity-50 transition-all shadow-inner"
          />
          <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-sm"></div>
        </div>
        <div className="flex justify-between text-xs text-slate-500 font-medium gap-2">
          <span className="flex items-center">📉 Menor calidad</span>
          <span className="flex items-center">📈 Mayor calidad</span>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between mb-4 bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border-2 border-green-200 shadow-sm hover:shadow-md transition-shadow duration-200">
          <span className="text-sm sm:text-base text-slate-700 font-bold flex items-center">
            <span className="text-xl mr-2">🗜️</span>
            <span className="hidden sm:inline">Reducción de Tamaño</span>
            <span className="sm:hidden">Reducción</span>
          </span>
          <span className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            {compressionRatio.toFixed(1)}%
          </span>
        </div>
        <div className="flex flex-col space-y-3">
          <button
            onClick={onDownload}
            disabled={isProcessing}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 hover:from-indigo-700 hover:via-indigo-700 hover:to-purple-700 text-white py-3.5 rounded-xl font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-300/50 hover:shadow-xl hover:shadow-indigo-400/50 hover:scale-[1.02] active:scale-95 transform text-sm sm:text-base"
          >
            <Download className="w-5 h-5" />
            <span>Descargar Comprimida</span>
          </button>
          <button
            onClick={onDownloadOriginal}
            disabled={isProcessing}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transform text-sm sm:text-base"
          >
            <Download className="w-5 h-5" />
            <span>Descargar Original</span>
          </button>
        </div>
      </div>
    </div>
  );
};