import React, { useState } from 'react';
import { CraftItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { INITIAL_REVIEWS } from '../data/mockData';
import { ReviewList } from '../components/ReviewList';
import { ImageZoomModal } from '../components/ImageZoomModal';
import {
  ArrowLeft,
  ZoomIn,
  MapPin,
  Award,
  Clock,
  Sparkles,
  Phone,
  MessageCircle,
  X
} from 'lucide-react';

interface CraftsmanDetailPageProps {
  craft: CraftItem;
  onBack: () => void;
}

export const CraftsmanDetailPage: React.FC<CraftsmanDetailPageProps> = ({
  craft,
  onBack
}) => {
  const { t, isRtl } = useLanguage();

  const [activeImage, setActiveImage] = useState(craft.imageUrl);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Phone number for artisan
  const phone = '+212 600 123 456';
  const cleanPhone = phone.replace(/[^0-9+]/g, '');

  const handleOpenWhatsApp = () => {
    const message = encodeURIComponent(
      `السلام عليكم أخي الحرفي، أود الاستفسار والطلب بخصوص عملك: "${craft.title}" المعروض في منصة حرفتي.`
    );
    window.open(`https://wa.me/${cleanPhone.replace('+', '')}?text=${message}`, '_blank');
  };

  return (
    <div className="pb-32 pt-2 px-4 sm:px-6 max-w-3xl mx-auto animate-fadeIn">
      {/* Back button */}
      <button
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#BE826A] hover:text-[#A96E57] cursor-pointer transition-colors"
      >
        <ArrowLeft className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
        <span>{t.back}</span>
      </button>

      {/* Craftsman Profile Header matching screenshot 4 */}
      <div className="flex items-center gap-4 mb-4">
        {/* Large circular avatar with subtle ring and shadow */}
        <div className="relative">
          <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full p-0.5 bg-gradient-to-tr from-[#BE826A] to-amber-200 shadow-md">
            <img
              src={craft.craftsmanAvatar}
              alt={craft.craftsmanName}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <span
            className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-stone-900"
            title="Online"
          ></span>
        </div>

        {/* Craftsman Information */}
        <div className="flex-1 min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 truncate">
            {craft.craftsmanName}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-0.5 leading-snug">
            {craft.specialtySubtitle ||
              `${craft.experienceYears || '10+ years experience'} - ${craft.category} - ${craft.location}`}
          </p>
        </div>
      </div>

      {/* Primary Action Button: "تواصل" (Contact) */}
      <button
        onClick={() => setIsContactModalOpen(true)}
        className="w-full py-3.5 px-4 rounded-xl bg-[#BE826A] hover:bg-[#A96E57] active:scale-[0.99] text-white font-medium text-base sm:text-lg shadow-[0_4px_16px_rgba(190,130,106,0.3)] transition-all cursor-pointer mb-6 text-center tracking-wide flex items-center justify-center gap-2"
      >
        <Phone className="w-5 h-5" />
        <span>{t.contactBtn}</span>
      </button>

      {/* Craft Card Presentation matching screenshot 4 */}
      <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-4 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-stone-100 dark:border-stone-800/80 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-bold text-lg text-stone-900 dark:text-white">
              {craft.title}
            </h3>
            <p className="text-xs text-stone-400 mt-0.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#BE826A]" />
              <span>{craft.location}</span>
              <span>·</span>
              <span className="text-[#BE826A] font-medium">{craft.tags.join(' ')}</span>
            </p>
          </div>

          <button
            onClick={() => setIsZoomOpen(true)}
            className="flex items-center gap-1.5 text-xs text-[#BE826A] hover:bg-[#BE826A]/10 px-3 py-1.5 rounded-full transition-colors cursor-pointer border border-[#BE826A]/30 font-medium"
            title="Inspect high-res zoom"
          >
            <ZoomIn className="w-3.5 h-3.5" />
            <span>{t.zoomImage.split(' ')[0]}</span>
          </button>
        </div>

        {/* Main Hero Image */}
        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/10] bg-stone-100 dark:bg-stone-800 group">
          <img
            src={activeImage}
            alt={craft.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <button
            onClick={() => setIsZoomOpen(true)}
            className="absolute bottom-3 right-3 p-2 bg-black/60 hover:bg-black/80 backdrop-blur-md rounded-xl text-white text-xs flex items-center gap-1.5 shadow-lg transition-all cursor-pointer opacity-90 group-hover:opacity-100"
          >
            <ZoomIn className="w-4 h-4" />
            <span className="text-[11px] font-medium">Zoom & Inspect</span>
          </button>
        </div>

        {/* Gallery Thumbnails */}
        {craft.galleryImages && craft.galleryImages.length > 1 && (
          <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1">
            {craft.galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  activeImage === img
                    ? 'border-[#BE826A] ring-2 ring-[#BE826A]/30 scale-105'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Description & Specifications */}
        <div className="mt-5 space-y-4 pt-4 border-t border-stone-100 dark:border-stone-800">
          <div>
            <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
              {t.artisanStory}
            </h4>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              {craft.description}
            </p>
          </div>

          {craft.specs && (
            <div>
              <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                {t.specifications}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {craft.specs.materials && (
                  <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800/80">
                    <span className="text-stone-400 block mb-0.5">{t.materials}</span>
                    <span className="font-medium text-stone-800 dark:text-stone-200">
                      {craft.specs.materials}
                    </span>
                  </div>
                )}
                {craft.specs.dimensions && (
                  <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800/80">
                    <span className="text-stone-400 block mb-0.5">{t.dimensions}</span>
                    <span className="font-medium text-stone-800 dark:text-stone-200">
                      {craft.specs.dimensions}
                    </span>
                  </div>
                )}
                {craft.specs.craftingTime && (
                  <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800/80">
                    <span className="text-stone-400 block mb-0.5">{t.leadTime}</span>
                    <span className="font-medium text-stone-800 dark:text-stone-200">
                      {craft.specs.craftingTime}
                    </span>
                  </div>
                )}
                {craft.specs.origin && (
                  <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800/80">
                    <span className="text-stone-400 block mb-0.5">{t.origin}</span>
                    <span className="font-medium text-stone-800 dark:text-stone-200">
                      {craft.specs.origin}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Comments / Reviews Section matching screenshot 4 */}
      <ReviewList
        craftsmanId={craft.craftsmanId}
        initialReviews={INITIAL_REVIEWS}
      />

      {/* Image Zoom Modal */}
      {isZoomOpen && (
        <ImageZoomModal
          imageUrl={activeImage}
          title={craft.title}
          onClose={() => setIsZoomOpen(false)}
        />
      )}

      {/* Direct Contact Modal (Phone / WhatsApp) */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-sm bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 shadow-2xl border border-stone-200 dark:border-stone-800 text-center">
            <button
              onClick={() => setIsContactModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Avatar */}
            <div className="w-20 h-20 rounded-full mx-auto p-0.5 bg-gradient-to-tr from-[#BE826A] to-amber-200 shadow-md mb-3">
              <img
                src={craft.craftsmanAvatar}
                alt={craft.craftsmanName}
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-1">
              {craft.craftsmanName}
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mb-6 flex items-center justify-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#BE826A]" />
              <span>{craft.location}</span>
            </p>

            <div className="space-y-3">
              {/* Direct Phone Call */}
              <a
                href={`tel:${cleanPhone}`}
                className="w-full py-3 px-4 rounded-2xl bg-[#BE826A] hover:bg-[#A96E57] text-white font-medium text-sm flex items-center justify-center gap-2.5 shadow-md transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>اتصال هاتفي مباشر ({phone})</span>
              </a>

              {/* Direct WhatsApp Message */}
              <button
                type="button"
                onClick={handleOpenWhatsApp}
                className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm flex items-center justify-center gap-2.5 shadow-md transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>مراسلة عبر واتساب (WhatsApp)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
