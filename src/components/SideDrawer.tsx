import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Language } from '../types';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSupport: () => void;
  onOpenMedia: () => void;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({
  isOpen,
  onClose,
  onOpenSupport,
  onOpenMedia
}) => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();

  const [openSection, setOpenSection] = useState<'language' | 'theme' | 'media' | null>('language');

  const toggleSection = (section: 'language' | 'theme' | 'media') => {
    setOpenSection(prev => (prev === section ? null : section));
  };

  const handleSelectLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  const handleSelectTheme = (mode: 'light' | 'dark') => {
    setTheme(mode);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex animate-fadeIn">
      {/* Dimmed backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity"
        aria-hidden="true"
      />

      {/* Drawer content (slides from left as seen in screenshots) */}
      <div className="relative z-10 w-72 sm:w-80 h-full bg-[#FAF8F5] dark:bg-[#1A1918] border-r border-stone-200 dark:border-stone-800 shadow-2xl flex flex-col justify-between overflow-y-auto animate-slideRight">
        <div>
          {/* Drawer Top Header with Hamburger */}
          <div className="p-4 pt-5 pb-6 border-b border-stone-200/60 dark:border-stone-800/60 flex items-center justify-between">
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="p-2 -ml-1 text-[#BE826A] hover:bg-[#BE826A]/10 rounded-xl flex flex-col justify-center items-center gap-[5px] w-10 h-10 cursor-pointer"
            >
              <span className="w-5 h-[2.5px] bg-[#BE826A] rounded-full"></span>
              <span className="w-5 h-[2.5px] bg-[#BE826A] rounded-full"></span>
              <span className="w-5 h-[2.5px] bg-[#BE826A] rounded-full"></span>
            </button>
            <span className="font-logo text-xl tracking-widest text-[#2D2A26] dark:text-[#F3F1ED] font-semibold">
              HARFTI
            </span>
            <div className="w-8"></div>
          </div>

          {/* Navigation Accordion Sections matching exact screenshots */}
          <div className="p-4 space-y-4">
            {/* 1. Language Section (تغيير اللغة) */}
            <div className="border-b border-stone-200/50 dark:border-stone-800/50 pb-3">
              <button
                onClick={() => toggleSection('language')}
                className="w-full flex items-center justify-between text-right py-2 text-lg font-medium text-stone-800 dark:text-stone-100 hover:text-[#BE826A] dark:hover:text-[#BE826A] transition-colors cursor-pointer"
              >
                <span>{t.changeLanguage}</span>
                {openSection === 'language' ? (
                  <ChevronUp className="w-5 h-5 text-[#BE826A]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-stone-400" />
                )}
              </button>

              {openSection === 'language' && (
                <div className="mt-3 space-y-2.5 animate-fadeIn">
                  {/* Arabic Option */}
                  <button
                    onClick={() => handleSelectLanguage('ar')}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm cursor-pointer ${
                      language === 'ar'
                        ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white border border-stone-200/80 dark:border-stone-700'
                        : 'bg-stone-100/70 dark:bg-stone-900/60 text-stone-600 dark:text-stone-400 hover:bg-white dark:hover:bg-stone-800'
                    }`}
                  >
                    <span>{t.arabicLang}</span>
                    {language === 'ar' && (
                      <span className="w-5 h-5 rounded-full bg-[#BE826A] text-white flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    )}
                  </button>

                  {/* French Option */}
                  <button
                    onClick={() => handleSelectLanguage('fr')}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm cursor-pointer ${
                      language === 'fr'
                        ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white border border-stone-200/80 dark:border-stone-700'
                        : 'bg-stone-100/70 dark:bg-stone-900/60 text-stone-600 dark:text-stone-400 hover:bg-white dark:hover:bg-stone-800'
                    }`}
                  >
                    <span>{t.frenchLang}</span>
                    {language === 'fr' && (
                      <span className="w-5 h-5 rounded-full bg-[#BE826A] text-white flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    )}
                  </button>

                  {/* English Option */}
                  <button
                    onClick={() => handleSelectLanguage('en')}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm cursor-pointer ${
                      language === 'en'
                        ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white border border-stone-200/80 dark:border-stone-700'
                        : 'bg-stone-100/70 dark:bg-stone-900/60 text-stone-600 dark:text-stone-400 hover:bg-white dark:hover:bg-stone-800'
                    }`}
                  >
                    <span>{t.englishLang}</span>
                    {language === 'en' && (
                      <span className="w-5 h-5 rounded-full bg-[#BE826A] text-white flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* 2. Theme Section (الوضع) */}
            <div className="border-b border-stone-200/50 dark:border-stone-800/50 pb-3">
              <button
                onClick={() => toggleSection('theme')}
                className="w-full flex items-center justify-between text-right py-2 text-lg font-medium text-stone-800 dark:text-stone-100 hover:text-[#BE826A] dark:hover:text-[#BE826A] transition-colors cursor-pointer"
              >
                <span>{t.themeTitle}</span>
                {openSection === 'theme' ? (
                  <ChevronUp className="w-5 h-5 text-[#BE826A]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-stone-400" />
                )}
              </button>

              {openSection === 'theme' && (
                <div className="mt-3 space-y-2.5 animate-fadeIn">
                  {/* Dark Mode Option */}
                  <button
                    onClick={() => handleSelectTheme('dark')}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm cursor-pointer ${
                      theme === 'dark'
                        ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white border border-stone-200/80 dark:border-stone-700'
                        : 'bg-stone-100/70 dark:bg-stone-900/60 text-stone-600 dark:text-stone-400 hover:bg-white dark:hover:bg-stone-800'
                    }`}
                  >
                    <span>{t.darkMode}</span>
                    {theme === 'dark' && (
                      <span className="w-5 h-5 rounded-full bg-[#BE826A] text-white flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    )}
                  </button>

                  {/* Light Mode Option */}
                  <button
                    onClick={() => handleSelectTheme('light')}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm cursor-pointer ${
                      theme === 'light'
                        ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white border border-stone-200/80 dark:border-stone-700'
                        : 'bg-stone-100/70 dark:bg-stone-900/60 text-stone-600 dark:text-stone-400 hover:bg-white dark:hover:bg-stone-800'
                    }`}
                  >
                    <span>{t.lightMode}</span>
                    {theme === 'light' && (
                      <span className="w-5 h-5 rounded-full bg-[#BE826A] text-white flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* 3. Support Section (الدعم) */}
            <div className="border-b border-stone-200/50 dark:border-stone-800/50 pb-3">
              <button
                onClick={() => {
                  onClose();
                  onOpenSupport();
                }}
                className="w-full text-right py-2 text-lg font-medium text-stone-800 dark:text-stone-100 hover:text-[#BE826A] transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>{t.support}</span>
              </button>
            </div>

            {/* 4. Media Section (الوسائط) */}
            <div className="border-b border-stone-200/50 dark:border-stone-800/50 pb-3">
              <button
                onClick={() => {
                  onClose();
                  onOpenMedia();
                }}
                className="w-full text-right py-2 text-lg font-medium text-stone-800 dark:text-stone-100 hover:text-[#BE826A] transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>{t.media}</span>
                <ChevronDown className="w-5 h-5 text-stone-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer info in drawer */}
        <div className="p-4 border-t border-stone-200/60 dark:border-stone-800/60 text-center">
          <p className="text-xs text-stone-400">HARFTI Marketplace &copy; 2026</p>
          <p className="text-[11px] text-stone-400/80 mt-0.5">Authentic Moroccan Craftsmanship</p>
        </div>
      </div>
    </div>
  );
};
