import { CraftItem, Conversation, Review, User } from '../types';

import imgCarpenter from '../assets/images/craftsman_carpenter_1790740217089.jpg';
import imgPotter from '../assets/images/craftsman_potter_1790740229386.jpg';
import imgCeramics from '../assets/images/craft_ceramic_pottery_1790740241789.jpg';
import imgCarpet from '../assets/images/craft_berber_carpet_1790740253374.jpg';
import imgWoodwork from '../assets/images/craft_woodwork_table_1790740263783.jpg';

export const INITIAL_CRAFTS: CraftItem[] = [
  {
    id: 'craft-1',
    craftsmanId: 'artisan-anas',
    craftsmanName: 'Anas',
    craftsmanAvatar: imgCarpenter,
    title: "Amina's Pottery",
    category: 'Ceramics',
    tags: ['#Ceramics', '#Handmade'],
    description: 'Handcrafted authentic terracotta and glazed clay ceramics created using centuries-old wheel throwing and kiln firing traditions in Safi and Fez.',
    imageUrl: imgCeramics,
    galleryImages: [imgCeramics, imgWoodwork, imgCarpet],
    location: 'Safi, Morocco',
    rating: 4.9,
    reviewCount: 38,
    experienceYears: '12+ years experience',
    specialtySubtitle: '10+ years experience - Carpentry & Woodwork - Casablanca',
    specs: {
      materials: 'Natural clay, mineral glazes, wood-fired kiln finish',
      dimensions: 'Custom diameter 25cm - 60cm',
      craftingTime: '4 - 7 working days per piece',
      origin: 'Safi Artisanal Quarter'
    }
  },
  {
    id: 'craft-2',
    craftsmanId: 'artisan-khalid',
    craftsmanName: 'Khalid',
    craftsmanAvatar: imgCarpenter,
    title: "Khalid's Carpets",
    category: 'Textiles',
    tags: ['#Woodwork', '#Furniture', '#Textiles'],
    description: 'Authentic high-Atlas Berber carpets hand-knotted with 100% natural virgin wool, featuring traditional tribal geometries and natural vegetable dyes.',
    imageUrl: imgCarpet,
    galleryImages: [imgCarpet, imgCeramics, imgWoodwork],
    location: 'Marrakech, Morocco',
    rating: 5.0,
    reviewCount: 52,
    experienceYears: '20+ years experience',
    specialtySubtitle: '20+ years experience - Carpet Weaving & Textiles - Marrakech',
    specs: {
      materials: '100% pure mountain sheep wool, pomegranate and indigo dyes',
      dimensions: '200cm x 300cm (custom commissions available)',
      craftingTime: '3 - 5 weeks',
      origin: 'High Atlas Mountains'
    }
  },
  {
    id: 'craft-3',
    craftsmanId: 'artisan-asisia',
    craftsmanName: 'Asisia',
    craftsmanAvatar: imgPotter,
    title: "Asisia's Pottery",
    category: 'Ceramics',
    tags: ['#Ceramics', '#Handmade'],
    description: 'Delicate hand-pinched and carved terracotta vases with organic earthy textures, designed for contemporary spaces while honoring ancestral craft.',
    imageUrl: imgCeramics,
    galleryImages: [imgCeramics, imgCarpet],
    location: 'Fez, Morocco',
    rating: 4.8,
    reviewCount: 24,
    experienceYears: '8+ years experience',
    specialtySubtitle: '8+ years experience - Contemporary Ceramics - Fez',
    specs: {
      materials: 'Earthenware clay, matte iron oxide wash',
      dimensions: '35cm height x 18cm width',
      craftingTime: '5 days',
      origin: 'Fez Medina'
    }
  },
  {
    id: 'craft-4',
    craftsmanId: 'artisan-morp',
    craftsmanName: 'Morp',
    craftsmanAvatar: imgCarpenter,
    title: "Morp's Pottery",
    category: 'Woodwork',
    tags: ['#Woodwork', '#Furniture'],
    description: 'Artisanal carved Atlas cedar and thuya woodwork, including intricate turned lattice screens, decorative accent tables, and heirloom furniture.',
    imageUrl: imgWoodwork,
    galleryImages: [imgWoodwork, imgCeramics],
    location: 'Essaouira, Morocco',
    rating: 4.9,
    reviewCount: 41,
    experienceYears: '15+ years experience',
    specialtySubtitle: '15+ years experience - Fine Woodworking & Marquetry - Essaouira',
    specs: {
      materials: 'Atlas Cedar & Thuya burl, beeswax polish',
      dimensions: '110cm x 60cm x 45cm',
      craftingTime: '10 - 14 days',
      origin: 'Essaouira Wood Market'
    }
  },
  {
    id: 'craft-5',
    craftsmanId: 'artisan-audr',
    craftsmanName: 'Audr',
    craftsmanAvatar: imgPotter,
    title: "Audr's Pottery",
    category: 'Woodwork',
    tags: ['#Woodwork', '#Furniture'],
    description: 'Bespoke hand-joined architectural woodwork and minimalist furniture celebrating the warmth of solid walnut and reclaimed cedar.',
    imageUrl: imgWoodwork,
    galleryImages: [imgWoodwork, imgCarpet],
    location: 'Casablanca, Morocco',
    rating: 4.7,
    reviewCount: 19,
    experienceYears: '9+ years experience',
    specialtySubtitle: '9+ years experience - Architectural Woodwork - Casablanca',
    specs: {
      materials: 'Solid walnut, brass joinery pins',
      dimensions: 'Custom specifications upon consultation',
      craftingTime: '2 - 3 weeks',
      origin: 'Casablanca Workshop'
    }
  },
  {
    id: 'craft-6',
    craftsmanId: 'artisan-anas',
    craftsmanName: 'Anas',
    craftsmanAvatar: imgCarpenter,
    title: "Anas Carpentry & Joinery",
    category: 'Woodwork',
    tags: ['#Woodwork', '#Furniture', '#Handmade'],
    description: 'Traditional moucharaby lattice woodwork, custom cabinetry, bespoke cedar coffee tables, and heirloom interior furnishings.',
    imageUrl: imgWoodwork,
    galleryImages: [imgWoodwork, imgCeramics, imgCarpet],
    location: 'Casablanca, Morocco',
    rating: 5.0,
    reviewCount: 67,
    experienceYears: '10+ years experience',
    specialtySubtitle: '10+ years experience - Carpentry & Woodwork - Casablanca',
    specs: {
      materials: 'Cedar wood, natural mineral oil, mortise and tenon joinery',
      dimensions: 'Custom commissioned sizes',
      craftingTime: '7 - 12 days',
      origin: 'Derb Sultan, Casablanca'
    }
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    craftsmanId: 'artisan-anas',
    author: 'una_work!',
    rating: 5,
    text: 'Great work! Highly recommend.',
    date: '2 days ago'
  },
  {
    id: 'rev-2',
    craftsmanId: 'artisan-anas',
    author: 'ujermoky2152',
    rating: 4,
    text: 'Great work! Highly recommend.',
    date: '1 week ago'
  },
  {
    id: 'rev-3',
    craftsmanId: 'artisan-anas',
    author: 'Cheqaobe460',
    rating: 5,
    text: 'Great work! Highly recommend.',
    date: '2 weeks ago'
  },
  {
    id: 'rev-4',
    craftsmanId: 'artisan-anas',
    author: 'kaisian_a2',
    rating: 5,
    text: 'Great work! Highly recommend.',
    date: '1 month ago'
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-moha',
    craftsmanId: 'artisan-moha',
    craftsmanName: 'Moha',
    craftsmanAvatar: imgCarpenter,
    craftsmanTitle: 'Master Leatherworker',
    lastMessage: 'سلام عليكم...',
    lastTimestamp: 'Yesterday',
    unread: false,
    messages: [
      {
        id: 'm1',
        conversationId: 'conv-moha',
        senderId: 'artisan-moha',
        senderName: 'Moha',
        text: 'سلام عليكم...',
        timestamp: 'Yesterday',
        isSelf: false
      }
    ]
  },
  {
    id: 'conv-moad',
    craftsmanId: 'artisan-moad',
    craftsmanName: 'Moad',
    craftsmanAvatar: imgCarpenter,
    craftsmanTitle: 'Copper & Brass Artisan',
    lastMessage: 'مرحبا...',
    lastTimestamp: 'Yesterday',
    unread: false,
    messages: [
      {
        id: 'm2',
        conversationId: 'conv-moad',
        senderId: 'artisan-moad',
        senderName: 'Moad',
        text: 'مرحبا... هل تفضل النحاس الأصفر أم الأحمر للثريا؟',
        timestamp: 'Yesterday',
        isSelf: false
      }
    ]
  },
  {
    id: 'conv-anas',
    craftsmanId: 'artisan-anas',
    craftsmanName: 'Anas',
    craftsmanAvatar: imgCarpenter,
    craftsmanTitle: '10+ years experience - Carpentry & Woodwork - Casablanca',
    lastMessage: 'هل يمكن القدوم؟ بكل سرور',
    lastTimestamp: '2:40 AM',
    unread: false,
    messages: [
      {
        id: 'm3',
        conversationId: 'conv-anas',
        senderId: 'user-current',
        senderName: 'Me',
        text: 'سلام عليكم',
        timestamp: '1:45 AM',
        isSelf: true
      },
      {
        id: 'm4',
        conversationId: 'conv-anas',
        senderId: 'artisan-anas',
        senderName: 'Anas',
        text: 'وعليكم السلام',
        timestamp: '12:49 AM',
        isSelf: false
      },
      {
        id: 'm5',
        conversationId: 'conv-anas',
        senderId: 'user-current',
        senderName: 'Me',
        text: 'هل يمكن القدوم؟ بكل سرور',
        timestamp: '2:40 AM',
        isSelf: true
      }
    ]
  },
  {
    id: 'conv-rida',
    craftsmanId: 'artisan-rida',
    craftsmanName: 'Rida',
    craftsmanAvatar: imgPotter,
    craftsmanTitle: 'Ceramics & Zellige Specialist',
    lastMessage: 'Welcome',
    lastTimestamp: '3 days ago',
    unread: false,
    messages: [
      {
        id: 'm6',
        conversationId: 'conv-rida',
        senderId: 'artisan-rida',
        senderName: 'Rida',
        text: 'Welcome! I would be delighted to craft a custom mosaic fountain for your garden.',
        timestamp: '3 days ago',
        isSelf: false
      }
    ]
  },
  {
    id: 'conv-samir',
    craftsmanId: 'artisan-samir',
    craftsmanName: 'Samir',
    craftsmanAvatar: imgCarpenter,
    craftsmanTitle: 'Atlas Rug Weaver',
    lastMessage: 'Bonjour...',
    lastTimestamp: 'Just now',
    unread: true,
    messages: [
      {
        id: 'm7',
        conversationId: 'conv-samir',
        senderId: 'artisan-samir',
        senderName: 'Samir',
        text: 'Bonjour... J’ai bien reçu votre demande de dimension pour le tapis berbère en laine pure.',
        timestamp: 'Just now',
        isSelf: false
      }
    ]
  }
];

export const DEMO_USER: User = {
  id: 'user-current',
  name: 'اسم المستخدم',
  email: 'user@harfti.ma',
  avatar: '',
  role: 'user',
  city: 'Casablanca, Morocco',
  phone: '+212 600 123 456'
};
