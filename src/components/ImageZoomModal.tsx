import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ImageZoomModalProps {
  imageUrl: string;
  title: string;
  onClose: () => void;
}

export const ImageZoomModal: React.FC<ImageZoomModalProps> = ({
  imageUrl,
  title,
  onClose
}) => {
  const { t } = useLanguage();
  const [scale, setScale] = useState(1);

  const handleZoomIn = () => setScale(s => Math.min(s + 0.5, 3));
  const handleZoomOut = () => setScale(s => Math.max(s - 0.5, 1));
  const handleReset = () => setScale(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Top Header controls */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-20">
        <div className="max-w-md truncate">
          <h4 className="text-sm font-semibold">{title}</h4>
          <p className="text-[11px] text-stone-300">{t.zoomImage}</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md rounded-full px-2 py-1">
            <button
              onClick={handleZoomOut}
              disabled={scale <= 1}
              className="p-1.5 hover:bg-white/20 rounded-full disabled:opacity-30 cursor-pointer"
              title="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono px-1">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={scale >= 3}
              className="p-1.5 hover:bg-white/20 rounded-full disabled:opacity-30 cursor-pointer"
              title="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleReset}
              className="p-1.5 hover:bg-white/20 rounded-full cursor-pointer ml-1"
              title="Reset zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Zoomable Image Container */}
      <div className="w-full h-full max-w-4xl max-h-[80vh] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing">
        <img
          src={imageUrl}
          alt={title}
          referrerPolicy="no-referrer"
          style={{ transform: `scale(${scale})`, transition: 'transform 0.2s ease-out' }}
          className="max-w-full max-h-full object-contain rounded-xl shadow-2xl select-none"
        />
      </div>
    </div>
  );
};
