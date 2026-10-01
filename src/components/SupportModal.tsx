import React from 'react';
import { X, HelpCircle, Phone, Mail, ShieldCheck, HeartHandshake } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
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
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-white">
              {t.supportModalTitle}
            </h3>
            <p className="text-xs text-stone-400">HARFTI Artisan Assistance</p>
          </div>
        </div>

        <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
          {t.supportDesc}
        </p>

        <div className="space-y-2.5">
          <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800 flex items-center gap-3">
            <Phone className="w-4 h-4 text-[#BE826A] shrink-0" />
            <div className="text-xs">
              <span className="font-semibold text-stone-800 dark:text-stone-200 block">Direct Line / WhatsApp</span>
              <span className="text-stone-500">+212 522 98 76 54</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800 flex items-center gap-3">
            <Mail className="w-4 h-4 text-[#BE826A] shrink-0" />
            <div className="text-xs">
              <span className="font-semibold text-stone-800 dark:text-stone-200 block">Artisan Relations</span>
              <span className="text-stone-500">support@harfti.ma</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800 flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-[#BE826A] shrink-0" />
            <div className="text-xs">
              <span className="font-semibold text-stone-800 dark:text-stone-200 block">Fair Trade & Craft Heritage</span>
              <span className="text-stone-500">100% authentic Moroccan artisans directly supported</span>
            </div>
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
