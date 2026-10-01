import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface Translations {
  appName: string;
  searchPlaceholder: string;
  homeTab: string;
  messageTab: string;
  accountTab: string;
  changeLanguage: string;
  arabicLang: string;
  frenchLang: string;
  englishLang: string;
  themeTitle: string;
  darkMode: string;
  lightMode: string;
  support: string;
  media: string;
  contactBtn: string;
  commentsTitle: string;
  addCommentPlaceholder: string;
  sendBtn: string;
  userNamePlaceholder: string;
  editAccount: string;
  addService: string;
  logout: string;
  login: string;
  register: string;
  typeMessagePlaceholder: string;
  experienceLabel: string;
  yearsExperience: string;
  allCategories: string;
  categoryCeramics: string;
  categoryWoodwork: string;
  categoryTextiles: string;
  categoryLeather: string;
  categoryMetal: string;
  noCraftsFound: string;
  viewDetails: string;
  craftDetailsTitle: string;
  specifications: string;
  materials: string;
  dimensions: string;
  leadTime: string;
  origin: string;
  artisanStory: string;
  startConversationWith: string;
  back: string;
  online: string;
  roleCustomer: string;
  roleArtisan: string;
  welcomeGuest: string;
  loginPrompt: string;
  saveChanges: string;
  cancel: string;
  serviceTitle: string;
  serviceDescription: string;
  serviceCategory: string;
  serviceTags: string;
  serviceLocation: string;
  publishService: string;
  close: string;
  zoomImage: string;
  noDirectEcommerceNote: string;
  supportModalTitle: string;
  supportDesc: string;
  mediaModalTitle: string;
  mediaDesc: string;
}

const TRANSLATIONS: Record<Language, Translations> = {
  ar: {
    appName: 'HARFTI',
    searchPlaceholder: 'Search artisans or crafts...',
    homeTab: 'Home',
    messageTab: 'Message',
    accountTab: 'Account',
    changeLanguage: 'تغيير اللغة',
    arabicLang: 'اللغة العربية',
    frenchLang: 'اللغة الفرنسية',
    englishLang: 'اللغة الإنجليزية',
    themeTitle: 'الوضع',
    darkMode: 'الوضع الداكن',
    lightMode: 'الوضع الفاتح',
    support: 'الدعم',
    media: 'الوسائط',
    contactBtn: 'تواصل',
    commentsTitle: 'Comments',
    addCommentPlaceholder: 'Add Comment...',
    sendBtn: 'send',
    userNamePlaceholder: 'اسم المستخدم',
    editAccount: '✏️ تعديل الحساب',
    addService: 'إضافة خدمة',
    logout: 'تسجيل الخروج',
    login: 'تسجيل الدخول',
    register: 'إنشاء حساب جديد',
    typeMessagePlaceholder: 'Type a message...',
    experienceLabel: 'خبرة',
    yearsExperience: 'سنوات خبرة',
    allCategories: 'الكل',
    categoryCeramics: 'الخزف والفخار',
    categoryWoodwork: 'النجارة والنقش',
    categoryTextiles: 'الزرابي والنسيج',
    categoryLeather: 'الجلود التقليدية',
    categoryMetal: 'النحاسيات والمعادن',
    noCraftsFound: 'لم يتم العثور على حرفيين أو خدمات مطابقة للبحث',
    viewDetails: 'عرض التفاصيل',
    craftDetailsTitle: 'تفاصيل الحرفة والخدمة',
    specifications: 'المواصفات الفنية',
    materials: 'المواد المستعملة',
    dimensions: 'المقاسات',
    leadTime: 'مدة الإنجاز',
    origin: 'المنشأ / الورشة',
    artisanStory: 'نبذة عن الحرفي والورشة',
    startConversationWith: 'بدء محادثة مباشرة مع الحرفي',
    back: 'رجوع',
    online: 'متصل الآن',
    roleCustomer: 'زبون يبحث عن منتجات حرفية',
    roleArtisan: 'صانع تقليدي / حرفي محلي',
    welcomeGuest: 'أهلاً بك في منصة حرفتي',
    loginPrompt: 'سجل دخولك لتتمكن من مراسلة الحرفيين وإضافة تقييمات وحفظ خدماتك المفضلة',
    saveChanges: 'حفظ التعديلات',
    cancel: 'إلغاء',
    serviceTitle: 'عنوان الحرفة / الخدمة',
    serviceDescription: 'وصف الحرفة والتفاصيل',
    serviceCategory: 'التصنيف الحرفي',
    serviceTags: 'الوسوم (مثال: #Woodwork #Furniture)',
    serviceLocation: 'المدينة / المنطقة',
    publishService: 'نشر الخدمة في المنصة',
    close: 'إغلاق',
    zoomImage: 'تكبير الصورة وفحص التفاصيل',
    noDirectEcommerceNote: 'المنصة تعتمد حصرياً على التواصل المباشر مع الحرفي لمناقشة الطلب والتفاصيل دون وسيط أو دفع إلكتروني.',
    supportModalTitle: 'مركز الدعم والمساعدة',
    supportDesc: 'فريق دعم منصة حرفتي جاهز لمساعدتكم وتقديم الإرشاد للحرفيين والمشترين على مدار الساعة.',
    mediaModalTitle: 'مجتمع ووسائط حرفتي',
    mediaDesc: 'تابع قصص الحرفيين والموروث المغربي الأصيل عبر قنواتنا ومنصات التواصل الاجتماعي.'
  },
  en: {
    appName: 'HARFTI',
    searchPlaceholder: 'Search artisans or crafts...',
    homeTab: 'Home',
    messageTab: 'Message',
    accountTab: 'Account',
    changeLanguage: 'Change Language',
    arabicLang: 'Arabic (العربية)',
    frenchLang: 'French (Français)',
    englishLang: 'English',
    themeTitle: 'Theme',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    support: 'Support',
    media: 'Media & Social',
    contactBtn: 'Contact',
    commentsTitle: 'Comments',
    addCommentPlaceholder: 'Add Comment...',
    sendBtn: 'send',
    userNamePlaceholder: 'User Profile',
    editAccount: '✏️ Edit Profile',
    addService: 'Add Craft Service',
    logout: 'Log Out',
    login: 'Log In',
    register: 'Create Account',
    typeMessagePlaceholder: 'Type a message...',
    experienceLabel: 'Experience',
    yearsExperience: 'years experience',
    allCategories: 'All',
    categoryCeramics: 'Ceramics & Pottery',
    categoryWoodwork: 'Woodwork & Furniture',
    categoryTextiles: 'Rugs & Textiles',
    categoryLeather: 'Leathercraft',
    categoryMetal: 'Brass & Metalwork',
    noCraftsFound: 'No artisans or crafts found matching your search.',
    viewDetails: 'View Details',
    craftDetailsTitle: 'Craft & Service Details',
    specifications: 'Specifications',
    materials: 'Materials',
    dimensions: 'Dimensions',
    leadTime: 'Crafting Time',
    origin: 'Workshop Location',
    artisanStory: 'About the Artisan',
    startConversationWith: 'Start direct conversation with',
    back: 'Back',
    online: 'Active now',
    roleCustomer: 'Customer seeking handmade crafts',
    roleArtisan: 'Local Craftsman / Artisan',
    welcomeGuest: 'Welcome to HARFTI',
    loginPrompt: 'Sign in to message master craftsmen directly, leave reviews, and showcase your services.',
    saveChanges: 'Save Changes',
    cancel: 'Cancel',
    serviceTitle: 'Craft / Service Title',
    serviceDescription: 'Description and Details',
    serviceCategory: 'Craft Category',
    serviceTags: 'Tags (e.g. #Woodwork #Furniture)',
    serviceLocation: 'City / Region',
    publishService: 'Publish Craft Service',
    close: 'Close',
    zoomImage: 'Inspect high-resolution details',
    noDirectEcommerceNote: 'HARFTI connects you directly with local artisans. All commissions, custom requests, and pricing are settled directly via chat.',
    supportModalTitle: 'Support Center',
    supportDesc: 'The HARFTI team is here to assist artisans and craft lovers alike with guidance and support.',
    mediaModalTitle: 'HARFTI Community & Media',
    mediaDesc: 'Explore artisanal stories, documentary videos, and behind-the-scenes mastercrafting.'
  },
  fr: {
    appName: 'HARFTI',
    searchPlaceholder: 'Search artisans or crafts...',
    homeTab: 'Accueil',
    messageTab: 'Messages',
    accountTab: 'Compte',
    changeLanguage: 'Changer la langue',
    arabicLang: 'Arabe (العربية)',
    frenchLang: 'Français',
    englishLang: 'Anglais (English)',
    themeTitle: 'Apparence',
    darkMode: 'Mode sombre',
    lightMode: 'Mode clair',
    support: 'Support & Aide',
    media: 'Médias & Réseaux',
    contactBtn: 'Contacter',
    commentsTitle: 'Commentaires',
    addCommentPlaceholder: 'Add Comment...',
    sendBtn: 'send',
    userNamePlaceholder: 'Nom d’utilisateur',
    editAccount: '✏️ Modifier le profil',
    addService: 'Ajouter un service artisanal',
    logout: 'Se déconnecter',
    login: 'Se connecter',
    register: 'Créer un compte',
    typeMessagePlaceholder: 'Tapez un message...',
    experienceLabel: 'Expérience',
    yearsExperience: 'ans d’expérience',
    allCategories: 'Tous',
    categoryCeramics: 'Céramique & Poterie',
    categoryWoodwork: 'Menuiserie & Ébénisterie',
    categoryTextiles: 'Tapis & Tissage',
    categoryLeather: 'Maroquinerie',
    categoryMetal: 'Cuivres & Dinanderie',
    noCraftsFound: 'Aucun artisan ou création ne correspond à votre recherche.',
    viewDetails: 'Voir les détails',
    craftDetailsTitle: 'Détails du travail artisanal',
    specifications: 'Spécifications',
    materials: 'Matériaux',
    dimensions: 'Dimensions',
    leadTime: 'Délai de confection',
    origin: 'Atelier d’origine',
    artisanStory: 'À propos de l’artisan',
    startConversationWith: 'Démarrer une conversation directe avec',
    back: 'Retour',
    online: 'En ligne',
    roleCustomer: 'Client à la recherche de créations authentiques',
    roleArtisan: 'Maître Artisan local',
    welcomeGuest: 'Bienvenue sur HARFTI',
    loginPrompt: 'Connectez-vous pour échanger directement avec les artisans, donner votre avis et publier vos créations.',
    saveChanges: 'Enregistrer',
    cancel: 'Annuler',
    serviceTitle: 'Titre de la création ou service',
    serviceDescription: 'Description détaillée',
    serviceCategory: 'Catégorie artisanale',
    serviceTags: 'Tags (ex: #Woodwork #Furniture)',
    serviceLocation: 'Ville / Atelier',
    publishService: 'Publier la création',
    close: 'Fermer',
    zoomImage: 'Agrandir pour examiner les détails',
    noDirectEcommerceNote: 'HARFTI favorise la relation directe humaine : les commandes sur-mesure et modalités se négocient directement par messagerie avec l’artisan.',
    supportModalTitle: 'Centre d’assistance',
    supportDesc: 'Notre équipe est à votre disposition pour accompagner les artisans et clients.',
    mediaModalTitle: 'Médias & Communauté HARFTI',
    mediaDesc: 'Découvrez les reportages sur le patrimoine et les ateliers artisanaux.'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('harfti_lang');
    return (saved as Language) || 'ar'; // Default to Arabic matching design screenshots
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('harfti_lang', lang);
  };

  const isRtl = language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRtl]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: TRANSLATIONS[language], isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
