import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  onOpenDrawer: () => void;
  activeTab: 'home' | 'account' | 'craft-detail' | 'artisan-profile';
  onNavigateHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenDrawer, onNavigateHome }) => {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/90 dark:bg-[#151515]/90 backdrop-blur-md border-b border-stone-200/60 dark:border-stone-800/60 px-4 md:px-8 py-3.5 transition-colors">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Left: 3-line terracotta hamburger button */}
        <button
          onClick={onOpenDrawer}
          aria-label="Open menu"
          className="p-2 -ml-2 rounded-xl text-[#BE826A] hover:bg-[#BE826A]/10 active:scale-95 transition-all flex flex-col justify-center items-center gap-[5px] w-10 h-10 cursor-pointer"
        >
          <span className="w-5 h-[2.5px] bg-[#BE826A] rounded-full transition-transform"></span>
          <span className="w-5 h-[2.5px] bg-[#BE826A] rounded-full transition-transform"></span>
          <span className="w-5 h-[2.5px] bg-[#BE826A] rounded-full transition-transform"></span>
        </button>

        {/* Center: HARFTI Logo */}
        <button
          onClick={onNavigateHome}
          className="cursor-pointer group flex items-center gap-1.5 focus:outline-none"
        >
          <h1 className="font-logo text-2xl md:text-3xl font-bold tracking-[0.2em] text-[#2D2A26] dark:text-[#F3F1ED] transition-colors group-hover:text-[#BE826A]">
            {t.appName}
          </h1>
        </button>

        {/* Right side balance spacer */}
        <div className="w-10 h-10 flex items-center justify-end">
          <div className="w-2.5 h-2.5 rounded-full bg-[#BE826A]/30"></div>
        </div>
      </div>
    </header>
  );
};
