import React, { useState, useMemo } from 'react';
import { CraftItem } from '../types';
import { CraftCard } from '../components/CraftCard';
import { useLanguage } from '../context/LanguageContext';
import { Search, Sparkles } from 'lucide-react';

interface HomePageProps {
  crafts: CraftItem[];
  onSelectCraft: (craft: CraftItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ crafts, onSelectCraft }) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    { key: 'All', label: t.allCategories },
    { key: 'Ceramics', label: t.categoryCeramics },
    { key: 'Woodwork', label: t.categoryWoodwork },
    { key: 'Textiles', label: t.categoryTextiles },
    { key: 'Leather', label: t.categoryLeather },
    { key: 'Metal', label: t.categoryMetal }
  ];

  const filteredCrafts = useMemo(() => {
    return crafts.filter(item => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.craftsmanName.toLowerCase().includes(q) ||
        item.tags.some(tag => tag.toLowerCase().includes(q)) ||
        item.location.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);

      const matchesCategory =
        selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [crafts, searchQuery, selectedCategory]);

  return (
    <div className="pb-28 pt-3 px-4 sm:px-6 max-w-5xl mx-auto animate-fadeIn">
      {/* Search Bar matching screenshot 7 */}
      <div className="relative mb-5">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-stone-400 absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-[#1E1E1E] text-sm text-stone-800 dark:text-stone-100 placeholder:text-stone-400 border border-stone-200/90 dark:border-stone-800 shadow-[0_2px_12px_rgba(0,0,0,0.03)] focus:outline-none focus:border-[#BE826A] focus:ring-2 focus:ring-[#BE826A]/20 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 text-xs text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat.key
                ? 'bg-[#BE826A] text-white shadow-sm'
                : 'bg-white dark:bg-[#1E1E1E] text-stone-600 dark:text-stone-400 border border-stone-200/80 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/80'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Marketplace Crafts Grid - matching 2-column screenshot 7 */}
      {filteredCrafts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3.5 sm:gap-5">
          {filteredCrafts.map(craft => (
            <CraftCard
              key={craft.id}
              craft={craft}
              onClick={() => onSelectCraft(craft)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-white dark:bg-[#1E1E1E] rounded-3xl border border-stone-100 dark:border-stone-800">
          <Sparkles className="w-8 h-8 text-[#BE826A] mx-auto mb-3 opacity-60" />
          <h4 className="text-stone-800 dark:text-stone-200 font-medium text-sm">
            {t.noCraftsFound}
          </h4>
          <p className="text-stone-400 text-xs mt-1">
            Try searching for pottery, carpets, woodwork, or Casablanca.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-4 px-4 py-1.5 bg-[#BE826A]/10 text-[#BE826A] rounded-xl text-xs font-semibold hover:bg-[#BE826A]/20 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
