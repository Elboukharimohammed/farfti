import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface BottomNavProps {
  currentTab: 'home' | 'account';
  onChangeTab: (tab: 'home' | 'account') => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onChangeTab }) => {
  const { t } = useLanguage();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#1C1B1A]/95 backdrop-blur-md border-t border-stone-200/70 dark:border-stone-800/80 shadow-[0_-4px_24px_rgba(0,0,0,0.05)] transition-colors">
      <div className="max-w-md mx-auto px-10 py-2.5 flex items-center justify-around">
        {/* Account Tab */}
        <button
          onClick={() => onChangeTab('account')}
          className={`flex flex-col items-center justify-center py-1 px-6 transition-all duration-200 cursor-pointer group ${
            currentTab === 'account'
              ? 'text-[#BE826A] font-semibold scale-105'
              : 'text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300'
          }`}
        >
          <svg
            className={`w-6 h-6 transition-transform group-hover:scale-110 ${
              currentTab === 'account' ? 'stroke-[#BE826A]' : 'stroke-current'
            }`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={currentTab === 'account' ? 2.2 : 1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span className="text-[11px] tracking-wide mt-1">{t.accountTab}</span>
        </button>

        {/* Home Tab */}
        <button
          onClick={() => onChangeTab('home')}
          className={`flex flex-col items-center justify-center py-1 px-6 transition-all duration-200 cursor-pointer group ${
            currentTab === 'home'
              ? 'text-[#BE826A] font-semibold scale-105'
              : 'text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300'
          }`}
        >
          <svg
            className={`w-6 h-6 transition-transform group-hover:scale-110 ${
              currentTab === 'home' ? 'fill-[#BE826A] stroke-[#BE826A]' : 'fill-none stroke-current'
            }`}
            viewBox="0 0 24 24"
            strokeWidth={currentTab === 'home' ? 2 : 1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className="text-[11px] tracking-wide mt-1">{t.homeTab}</span>
        </button>
      </div>
    </nav>
  );
};
