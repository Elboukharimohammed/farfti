import React from 'react';
import { CraftItem } from '../types';
import { Star, MapPin } from 'lucide-react';

interface CraftCardProps {
  craft: CraftItem;
  onClick: () => void;
}

export const CraftCard: React.FC<CraftCardProps> = ({ craft, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-3 sm:p-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border border-stone-100 dark:border-stone-800/80 cursor-pointer group flex flex-col justify-between"
    >
      <div>
        {/* Craft Image Container */}
        <div className="rounded-xl overflow-hidden aspect-[4/3] w-full bg-stone-100 dark:bg-stone-800 relative">
          <img
            src={craft.imageUrl}
            alt={craft.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {craft.rating && (
            <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-md text-white text-[11px] font-medium flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{craft.rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Title and tags matching reference screenshot */}
        <div className="mt-2.5 px-0.5">
          <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-[15px] sm:text-base leading-snug truncate group-hover:text-[#BE826A] transition-colors">
            {craft.title}
          </h3>

          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 truncate">
            {craft.tags.join(' ')}
          </p>
        </div>
      </div>

      {/* Subtle location and craftsman indicator */}
      <div className="mt-2.5 pt-2 border-t border-stone-100 dark:border-stone-800/60 flex items-center justify-between text-[11px] text-stone-400 dark:text-stone-500">
        <span className="flex items-center gap-1 truncate max-w-[65%]">
          <MapPin className="w-3 h-3 text-[#BE826A] shrink-0" />
          <span className="truncate">{craft.location.split(',')[0]}</span>
        </span>
        <span className="text-[#BE826A] font-medium group-hover:underline">
          {craft.craftsmanName}
        </span>
      </div>
    </div>
  );
};
