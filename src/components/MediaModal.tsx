import React from 'react';
import { X, Film, Instagram, Youtube, Globe, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MediaModal: React.FC<MediaModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 sm:p-7 shadow-2xl border border-stone-200/80 dark:border-stone-800">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-9 h-9 rounded-2xl bg-[#BE826A]/10 text-[#BE826A] flex items-center justify-center">
            <Film className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-white">
              {t.mediaModalTitle}
            </h3>
            <p className="text-xs text-stone-400">Documenting Traditional Crafts</p>
          </div>
        </div>

        <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
          {t.mediaDesc}
        </p>

        <div className="space-y-2.5">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800 flex items-center justify-between hover:border-[#BE826A]/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Instagram className="w-4 h-4 text-[#BE826A]" />
              <div className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                @harfti.artisanat
              </div>
            </div>
            <span className="text-[11px] text-stone-400">Daily workshop reels</span>
          </a>

          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800 flex items-center justify-between hover:border-[#BE826A]/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Youtube className="w-4 h-4 text-[#BE826A]" />
              <div className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                HARFTI Documentaries
              </div>
            </div>
            <span className="text-[11px] text-stone-400">Ancestral techniques</span>
          </a>

          <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-[#BE826A]" />
              <div className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                Craft Heritage Archive
              </div>
            </div>
            <span className="text-[11px] text-stone-400">Casablanca & Fez</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-5 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 text-xs font-semibold cursor-pointer transition-colors"
        >
          {t.close}
        </button>
      </div>
    </div>
  );
};
