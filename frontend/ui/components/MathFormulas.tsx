import React, { useState } from 'react';
import { ChevronRight, BookOpen, X } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface MathFormulasProps {
  kValue: number;
}

export const MathFormulas: React.FC<MathFormulasProps> = ({ kValue }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div className="bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-50 border-2 border-purple-300 p-5 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] transform">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between text-left group"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 sm:p-2.5 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h3 className="font-black text-purple-900 text-base sm:text-lg">Fundamento Matemático SVD</h3>
              <p className="text-xs sm:text-sm text-purple-600 font-medium">
                {isExpanded ? '← Ocultar' : '→ Ver'} las fórmulas
              </p>
            </div>
          </div>
          <ChevronRight className={`w-6 h-6 text-purple-600 group-hover:text-purple-800 transition-all duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
        </button>
      </div>

      {isExpanded && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity"
            onClick={() => setIsExpanded(false)}
          />

          <div className="fixed top-0 right-0 h-full w-full sm:w-11/12 md:w-2/3 lg:w-1/2 xl:w-2/5 bg-white shadow-2xl z-50 overflow-y-auto animate-slideInRight">
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 p-5 sm:p-6 flex items-center justify-between shadow-xl z-10">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="font-black text-white text-lg sm:text-xl">Fundamento Matemático SVD</h3>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 active:scale-90"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-5 sm:space-y-6 text-slate-700 leading-relaxed">
              <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-purple-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h4 className="font-bold text-purple-900 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                  <span className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center text-purple-700 font-black mr-3 text-base sm:text-lg shadow-md">1</span>
                  Descomposición en Valores Singulares (SVD)
                </h4>
                <p className="text-xs sm:text-sm mb-3 text-slate-600 leading-relaxed">
                  Cualquier matriz <InlineMath math="A \in \mathbb{R}^{m \times n}" /> puede descomponerse como:
                </p>
                <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-purple-50 p-3 sm:p-4 rounded-xl overflow-x-auto border border-purple-200 shadow-inner">
                  <BlockMath math="A = U \Sigma V^T" />
                </div>
                <div className="mt-3 sm:mt-4 text-xs sm:text-sm space-y-2 text-slate-600">
                  <p className="flex items-start"><span className="text-purple-600 mr-2 font-bold">•</span><span><InlineMath math="U \in \mathbb{R}^{m \times m}" /> - Matriz ortogonal izquierda</span></p>
                  <p className="flex items-start"><span className="text-purple-600 mr-2 font-bold">•</span><span><InlineMath math="\Sigma \in \mathbb{R}^{m \times n}" /> - Matriz diagonal con valores singulares</span></p>
                  <p className="flex items-start"><span className="text-purple-600 mr-2 font-bold">•</span><span><InlineMath math="V^T \in \mathbb{R}^{n \times n}" /> - Matriz ortogonal derecha</span></p>
                </div>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-purple-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h4 className="font-bold text-purple-900 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                  <span className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center text-purple-700 font-black mr-3 text-base sm:text-lg shadow-md">2</span>
                  Aproximación de Rango k = {kValue}
                </h4>
                <p className="text-xs sm:text-sm mb-3 text-slate-600 leading-relaxed">
                  Para comprimir, mantenemos solo los primeros <InlineMath math="k" /> valores singulares más grandes:
                </p>
                <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-purple-50 p-3 sm:p-4 rounded-xl overflow-x-auto border border-purple-200 shadow-inner">
                  <BlockMath math="A_k = \sum_{i=1}^{k} \sigma_i u_i v_i^T = U_k \Sigma_k V_k^T" />
                </div>
                <div className="mt-3 sm:mt-4 text-xs sm:text-sm space-y-2 text-slate-600">
                  <p className="flex items-start"><span className="text-purple-600 mr-2 font-bold">•</span><span><InlineMath math="U_k" /> - Primeras <InlineMath math="k" /> columnas de <InlineMath math="U" /></span></p>
                  <p className="flex items-start"><span className="text-purple-600 mr-2 font-bold">•</span><span><InlineMath math="\Sigma_k" /> - Primeros <InlineMath math="k" /> valores singulares</span></p>
                  <p className="flex items-start"><span className="text-purple-600 mr-2 font-bold">•</span><span><InlineMath math="V_k^T" /> - Primeras <InlineMath math="k" /> filas de <InlineMath math="V^T" /></span></p>
                </div>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-purple-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h4 className="font-bold text-purple-900 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                  <span className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center text-purple-700 font-black mr-3 text-base sm:text-lg shadow-md">3</span>
                  Error de Aproximación
                </h4>
                <p className="text-xs sm:text-sm mb-3 text-slate-600 leading-relaxed">
                  El error de la aproximación se mide con la norma de Frobenius:
                </p>
                <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-purple-50 p-3 sm:p-4 rounded-xl overflow-x-auto border border-purple-200 shadow-inner">
                  <BlockMath math="\|A - A_k\|_F = \sqrt{\sum_{i=k+1}^{r} \sigma_i^2}" />
                </div>
                <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed bg-purple-50 p-3 rounded-lg border border-purple-200">
                  Esta es la <strong className="text-purple-900">mejor aproximación posible</strong> de rango <InlineMath math="k" /> (Teorema de Eckart-Young).
                </p>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-purple-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h4 className="font-bold text-purple-900 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                  <span className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center text-purple-700 font-black mr-3 text-base sm:text-lg shadow-md">4</span>
                  Aplicación a Imágenes
                </h4>
                <p className="text-xs sm:text-sm mb-3 text-slate-600 leading-relaxed">
                  Para una imagen RGB de <InlineMath math="m \\times n" /> píxeles, aplicamos SVD a cada canal (R, G, B):
                </p>
                <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-purple-50 p-3 sm:p-4 rounded-xl overflow-x-auto border border-purple-200 shadow-inner">
                  <BlockMath math="I_{RGB} = [R_k, G_k, B_k]" />
                </div>
                <div className="mt-3 sm:mt-4 space-y-2 bg-gradient-to-r from-indigo-50 to-purple-50 p-3 sm:p-4 rounded-lg border border-purple-200">
                  <p className="text-xs sm:text-sm text-slate-700 font-semibold">
                    <span className="text-purple-900">📊 Original:</span> <InlineMath math="3mn" /> valores
                  </p>
                  <p className="text-xs sm:text-sm text-slate-700 font-semibold">
                    <span className="text-purple-900">📦 Comprimido:</span> <InlineMath math="3k(m + n + 1)" /> valores
                  </p>
                  <p className="text-xs sm:text-sm text-slate-700 font-semibold">
                    <span className="text-purple-900">🎯 Factor:</span> <InlineMath math="\frac{mn}{k(m + n + 1)}" />
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-50 border-l-4 border-blue-500 p-4 sm:p-5 rounded-r-2xl shadow-md">
                <p className="text-xs sm:text-sm text-blue-900 leading-relaxed">
                  <strong className="text-lg mr-1">💡</strong><strong>Nota:</strong> SVD encuentra automáticamente las características más importantes de la imagen.
                  Los valores singulares más grandes capturan las estructuras principales, mientras que los más pequeños representan detalles finos y ruido que pueden descartarse con mínima pérdida visual.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
