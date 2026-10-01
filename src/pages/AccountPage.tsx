import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { EditProfileModal } from '../components/EditProfileModal';
import { AddServiceModal } from '../components/AddServiceModal';
import { CraftItem } from '../types';
import { User as UserIcon, LogIn, Sparkles, MapPin, Phone, Briefcase } from 'lucide-react';

interface AccountPageProps {
  onAddCraft: (newCraft: CraftItem) => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({ onAddCraft }) => {
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();
  const { t } = useLanguage();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);

  return (
    <div className="pb-32 pt-8 px-4 sm:px-6 max-w-md mx-auto animate-fadeIn flex flex-col items-center">
      {/* Large circular avatar placeholder matching screenshot 5 */}
      <div
        onClick={() => isAuthenticated && setIsEditModalOpen(true)}
        className={`relative w-28 h-28 rounded-full bg-stone-200 dark:bg-stone-800 border-2 border-stone-300/80 dark:border-stone-700 flex items-center justify-center mb-4 shadow-sm overflow-hidden group ${
          isAuthenticated ? 'cursor-pointer hover:border-[#BE826A] transition-all' : ''
        }`}
        title={isAuthenticated ? 'اضغط لتغيير الصورة الشخصية والمعلومات' : undefined}
      >
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <UserIcon className="w-16 h-16 text-stone-400 dark:text-stone-500 stroke-[1.5]" />
        )}

        {isAuthenticated && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[10px] font-medium">
            <span>تعديل</span>
          </div>
        )}
      </div>

      {/* User Name matching screenshot 5 */}
      <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2 text-center">
        {user ? user.name : t.userNamePlaceholder}
      </h2>

      {user && (
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-6 text-center">
          {user.city && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#BE826A]" />
              {user.city}
            </span>
          )}
          {user.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-[#BE826A]" />
              {user.phone}
            </span>
          )}
          {user.role === 'artisan' && (
            <span className="px-2 py-0.5 rounded-full bg-[#BE826A]/10 text-[#BE826A] font-medium flex items-center gap-1">
              <Briefcase className="w-3 h-3" />
              Craftsman Space
            </span>
          )}
        </div>
      )}

      {/* Action Buttons matching screenshot 5 */}
      <div className="w-full space-y-3.5">
        {isAuthenticated ? (
          <>
            {/* 1. Edit Account Button (تعديل الحساب) */}
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="w-full py-3.5 px-6 rounded-2xl bg-white dark:bg-[#1E1E1E] text-stone-800 dark:text-stone-100 font-medium text-base shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-md border border-stone-200/80 dark:border-stone-800 transition-all cursor-pointer flex items-center justify-center gap-2 group"
            >
              <span>{t.editAccount}</span>
            </button>

            {/* 2. Add Service Button (إضافة خدمة) */}
            <button
              onClick={() => setIsAddServiceModalOpen(true)}
              className="w-full py-3.5 px-6 rounded-2xl bg-white dark:bg-[#1E1E1E] text-stone-800 dark:text-stone-100 font-medium text-base shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-md border border-stone-200/80 dark:border-stone-800 transition-all cursor-pointer flex items-center justify-center gap-2 group"
            >
              <span>{t.addService}</span>
            </button>

            {/* 3. Logout Button (تسجيل الخروج) matching screenshot 5 */}
            <button
              onClick={logout}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#FCF8F5] dark:bg-[#251E1B] text-[#BE826A] font-semibold text-base shadow-[0_2px_12px_rgba(190,130,106,0.08)] hover:bg-[#F9F0EA] dark:hover:bg-[#302621] border border-[#BE826A]/40 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{t.logout}</span>
            </button>
          </>
        ) : (
          <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 shadow-sm border border-stone-100 dark:border-stone-800 text-center space-y-3">
            <Sparkles className="w-8 h-8 text-[#BE826A] mx-auto opacity-70" />
            <h4 className="font-semibold text-stone-900 dark:text-white text-base">
              {t.welcomeGuest}
            </h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
              {t.loginPrompt}
            </p>
            <button
              onClick={() => openAuthModal()}
              className="w-full py-3 rounded-2xl bg-[#BE826A] hover:bg-[#A96E57] text-white font-medium text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>{t.login} / {t.register}</span>
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />

      <AddServiceModal
        isOpen={isAddServiceModalOpen}
        onClose={() => setIsAddServiceModalOpen(false)}
        onAddCraft={onAddCraft}
      />
    </div>
  );
};
