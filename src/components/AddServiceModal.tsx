import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { CraftItem } from '../types';
import { X, Sparkles, Upload, Image as ImageIcon, Trash2, Plus } from 'lucide-react';

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCraft: (newCraft: CraftItem) => void;
}

export const AddServiceModal: React.FC<AddServiceModalProps> = ({
  isOpen,
  onClose,
  onAddCraft
}) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Woodwork');
  const [tags, setTags] = useState('#Woodwork #Handmade');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(user?.city || 'Casablanca, Morocco');
  const [materials, setMaterials] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Handle uploading photos directly from user device (phone/PC)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadError(null);
    const newImages: string[] = [];

    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/')) {
        setUploadError('يرجى اختيار ملفات صور صالحة (PNG, JPG, JPEG)');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImages(prev => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setUploadedImages(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (uploadedImages.length === 0) {
      setUploadError('يرجى تحميل صورة واحدة على الأقل لعملك الحرفي');
      return;
    }

    const parsedTags = tags
      .split(' ')
      .map(tag => (tag.startsWith('#') ? tag : `#${tag}`))
      .filter(Boolean);

    const primaryImage = uploadedImages[0];

    const newCraft: CraftItem = {
      id: `craft-${Date.now()}`,
      craftsmanId: user?.id || 'artisan-user',
      craftsmanName: user?.name || 'Local Master Artisan',
      craftsmanAvatar: user?.avatar || primaryImage,
      title: title.trim(),
      category,
      tags: parsedTags.length > 0 ? parsedTags : ['#Handmade', `#${category}`],
      description: description.trim() || 'Handmade artisanal creation by local Moroccan craftsman.',
      imageUrl: primaryImage,
      galleryImages: uploadedImages,
      location,
      rating: 5.0,
      reviewCount: 1,
      experienceYears: user?.experience || '10+ years experience',
      specialtySubtitle: `${user?.name || 'Artisan'} - ${category} - ${location.split(',')[0]}`,
      specs: {
        materials: materials.trim() || 'Natural Moroccan raw materials',
        dimensions: dimensions.trim() || 'Custom upon inquiry',
        craftingTime: '5 - 10 working days',
        origin: location
      }
    };

    onAddCraft(newCraft);
    // Reset state and close
    setTitle('');
    setDescription('');
    setUploadedImages([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 sm:p-7 shadow-2xl border border-stone-200/80 dark:border-stone-800 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-[#BE826A]/10 text-[#BE826A] flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-white">
            {t.addService}
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 1) Real Photos Upload Section */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5 flex items-center justify-between">
              <span>صور العمل الحرفي (Upload Your Real Craft Photos) *</span>
              <span className="text-[11px] text-[#BE826A] font-medium">
                {uploadedImages.length} صور محملة
              </span>
            </label>

            {/* Hidden native file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              multiple
              className="hidden"
            />

            {/* Upload Drag/Click Zone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-stone-300 dark:border-stone-700 hover:border-[#BE826A] dark:hover:border-[#BE826A] rounded-2xl p-4 sm:p-5 text-center cursor-pointer transition-all bg-stone-50/60 dark:bg-stone-900/50 hover:bg-[#BE826A]/5 group"
            >
              <div className="w-10 h-10 rounded-full bg-[#BE826A]/10 text-[#BE826A] mx-auto mb-2 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                اضغط هنا لتحميل صور عملك من هاتفك أو حاسوبك
              </p>
              <p className="text-[11px] text-stone-400 mt-0.5">
                يمكنك تحميل صورة رئيسية وصور إضافية للتفاصيل (PNG, JPG)
              </p>
            </div>

            {/* Thumbnails of user's uploaded real photos */}
            {uploadedImages.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 mt-3">
                {uploadedImages.map((imgUrl, index) => (
                  <div
                    key={index}
                    className="relative rounded-xl overflow-hidden aspect-[4/3] border border-stone-200 dark:border-stone-700 group shadow-sm"
                  >
                    <img
                      src={imgUrl}
                      alt={`Craft upload ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {index === 0 && (
                      <span className="absolute bottom-1 left-1 bg-[#BE826A] text-white text-[9px] px-1.5 py-0.5 rounded font-medium">
                        الرئيسية
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 p-1 bg-black/70 hover:bg-red-600 text-white rounded-full transition-colors cursor-pointer"
                      title="حذف الصورة"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}

                {/* Add more button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-xl border border-dashed border-stone-300 dark:border-stone-700 aspect-[4/3] flex flex-col items-center justify-center text-stone-400 hover:text-[#BE826A] hover:border-[#BE826A] transition-colors cursor-pointer"
                >
                  <Plus className="w-5 h-5 mb-0.5" />
                  <span className="text-[10px] font-medium">إضافة صورة</span>
                </button>
              </div>
            )}

            {uploadError && (
              <p className="text-xs text-red-500 mt-1.5 bg-red-50 dark:bg-red-950/30 p-2 rounded-xl">
                {uploadError}
              </p>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
              {t.serviceTitle} *
            </label>
            <input
              type="text"
              required
              placeholder="مثال: طاولة تقليدية من خشب الأرز المنقوش يدوياً"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-[#BE826A]"
            />
          </div>

          {/* Category & Location */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                {t.serviceCategory}
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl text-xs bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-[#BE826A]"
              >
                <option value="Woodwork">Woodwork / النجارة والنقش</option>
                <option value="Ceramics">Ceramics / الخزف والفخار</option>
                <option value="Textiles">Textiles & Rugs / الزرابي والنسيج</option>
                <option value="Leather">Leather / الجلود التقليدية</option>
                <option value="Metal">Brass & Metal / النحاسيات</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                {t.serviceLocation}
              </label>
              <input
                type="text"
                placeholder="الدار البيضاء، فاس، مراكش..."
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl text-xs bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-[#BE826A]"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
              {t.serviceTags}
            </label>
            <input
              type="text"
              placeholder="#Woodwork #Furniture #Handmade"
              value={tags}
              onChange={e => setTags(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-[#BE826A]"
            />
          </div>

          {/* Materials & Dimensions */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                المواد المستعملة (Materials)
              </label>
              <input
                type="text"
                placeholder="خشب الأرز الطبيعي، صوف جبلي..."
                value={materials}
                onChange={e => setMaterials(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl text-xs bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-[#BE826A]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                المقاسات (Dimensions)
              </label>
              <input
                type="text"
                placeholder="120cm x 70cm أو حسب الطلب"
                value={dimensions}
                onChange={e => setDimensions(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl text-xs bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-[#BE826A]"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
              {t.serviceDescription}
            </label>
            <textarea
              rows={3}
              placeholder="اشرح تقنية الصنع، التفاصيل اليدوية، والقطع المخصصة حسب طلب الزبون..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-[#BE826A]"
            />
          </div>

          {/* Actions */}
          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 font-medium text-xs hover:bg-stone-50 dark:hover:bg-stone-800 cursor-pointer transition-colors"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-[#BE826A] hover:bg-[#A96E57] text-white font-medium text-xs shadow-md transition-colors cursor-pointer"
            >
              {t.publishService}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
