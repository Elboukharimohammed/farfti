/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { INITIAL_CRAFTS } from './data/mockData';
import { CraftItem } from './types';
import { getCrafts, createCraft } from './services/supabaseService';
import { Header } from './components/Header';
import { SideDrawer } from './components/SideDrawer';
import { BottomNav } from './components/BottomNav';
import { AuthModal } from './components/AuthModal';
import { SupportModal } from './components/SupportModal';
import { MediaModal } from './components/MediaModal';
import { HomePage } from './pages/HomePage';
import { CraftsmanDetailPage } from './pages/CraftsmanDetailPage';
import { AccountPage } from './pages/AccountPage';

const AppContent: React.FC = () => {
  const { isRtl } = useLanguage();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<'home' | 'account'>('home');
  const [selectedCraft, setSelectedCraft] = useState<CraftItem | null>(null);
  const [craftsList, setCraftsList] = useState<CraftItem[]>(() => {
    const saved = localStorage.getItem('harfti_crafts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_CRAFTS;
      }
    }
    return INITIAL_CRAFTS;
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isMediaOpen, setIsMediaOpen] = useState(false);

  // 1) Load data from Supabase
  useEffect(() => {
    let isMounted = true;
    getCrafts().then(loaded => {
      if (isMounted && loaded && loaded.length > 0) {
        setCraftsList(loaded);
        localStorage.setItem('harfti_crafts', JSON.stringify(loaded));
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // 2) Create new item in Supabase
  const handleAddCraft = async (newCraft: CraftItem) => {
    const created = await createCraft(newCraft, user?.id);
    const itemToInsert = created || newCraft;
    const updated = [itemToInsert, ...craftsList];
    setCraftsList(updated);
    localStorage.setItem('harfti_crafts', JSON.stringify(updated));
    setSelectedCraft(itemToInsert);
    setActiveTab('home');
  };

  const handleSelectCraft = (craft: CraftItem) => {
    setSelectedCraft(craft);
  };

  const handleTabChange = (tab: 'home' | 'account') => {
    setActiveTab(tab);
    if (tab !== 'home') {
      setSelectedCraft(null);
    }
  };

  return (
    <div className={`min-h-screen bg-[#FAF8F5] dark:bg-[#151515] text-[#2D2A26] dark:text-[#F3F1ED] transition-colors duration-200 ${isRtl ? 'rtl' : 'ltr'}`}>
      {/* Header with terracotta hamburger and HARFTI wordmark */}
      <Header
        onOpenDrawer={() => setIsDrawerOpen(true)}
        activeTab={selectedCraft ? 'craft-detail' : activeTab}
        onNavigateHome={() => {
          setSelectedCraft(null);
          setActiveTab('home');
        }}
      />

      {/* Main Page View */}
      <main className="max-w-5xl mx-auto min-h-[calc(100vh-140px)]">
        {selectedCraft ? (
          <CraftsmanDetailPage
            craft={selectedCraft}
            onBack={() => setSelectedCraft(null)}
          />
        ) : activeTab === 'home' ? (
          <HomePage
            crafts={craftsList}
            onSelectCraft={handleSelectCraft}
          />
        ) : (
          <AccountPage onAddCraft={handleAddCraft} />
        )}
      </main>

      {/* Bottom Navigation with Home & Account */}
      <BottomNav
        currentTab={activeTab}
        onChangeTab={handleTabChange}
      />

      {/* Side Navigation Drawer matching screenshots 1, 2, 7 */}
      <SideDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onOpenSupport={() => setIsSupportOpen(true)}
        onOpenMedia={() => setIsMediaOpen(true)}
      />

      {/* Modals */}
      <AuthModal />
      <SupportModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
      />
      <MediaModal
        isOpen={isMediaOpen}
        onClose={() => setIsMediaOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
