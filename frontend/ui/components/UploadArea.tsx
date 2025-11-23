import React, { useCallback } from 'react';
import { UploadCloud, FileImage } from 'lucide-react';

interface UploadAreaProps {
  onFileSelect: (file: File) => void;
}

export const UploadArea: React.FC<UploadAreaProps> = ({ onFileSelect }) => {
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        onFileSelect(file);
      }
    }
  }, [onFileSelect]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  }, [onFileSelect]);

  return (
    <div
      className="w-full border-3 border-dashed border-indigo-300 rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 hover:border-indigo-400 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-xl"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <label className="flex flex-col items-center justify-center w-full h-56 sm:h-64 lg:h-72 cursor-pointer px-4">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <div className="p-4 sm:p-5 bg-white rounded-2xl shadow-lg mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 border-2 border-indigo-100">
            <UploadCloud className="w-10 h-10 sm:w-12 sm:h-12 text-indigo-500 group-hover:text-indigo-600 transition-colors" />
          </div>
          <p className="mb-2 text-sm sm:text-base text-slate-700 font-medium text-center">
            <span className="font-bold text-indigo-600 group-hover:text-indigo-700">Haz clic para subir</span>
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> o arrastra y suelta</span>
          </p>
          <p className="text-xs sm:text-sm text-slate-500 font-medium flex items-center space-x-2">
            <FileImage className="w-4 h-4" />
            <span>SVG, PNG, JPG o WEBP</span>
          </p>
          <p className="mt-3 text-xs text-indigo-600 bg-indigo-100 px-3 py-1.5 rounded-full font-medium">
            Máximo 10 MB
          </p>
        </div>
        <input 
          type="file" 
          className="hidden" 
          accept="image/*"
          onChange={handleInputChange}
        />
      </label>
    </div>
  );
};
