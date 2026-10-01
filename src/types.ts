export type Language = 'ar' | 'en' | 'fr';

export type Theme = 'light' | 'dark';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'artisan';
  city?: string;
  phone?: string;
  experience?: string;
  specialty?: string;
  bio?: string;
}

export interface Review {
  id: string;
  craftsmanId: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface CraftItem {
  id: string;
  craftsmanId: string;
  craftsmanName: string;
  craftsmanAvatar: string;
  title: string;
  category: string;
  tags: string[];
  description: string;
  imageUrl: string;
  galleryImages: string[];
  location: string;
  rating: number;
  reviewCount: number;
  experienceYears?: string;
  specialtySubtitle?: string;
  specs?: {
    materials?: string;
    dimensions?: string;
    craftingTime?: string;
    origin?: string;
  };
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  imageUrl?: string;
  audioUrl?: string;
  audioDuration?: string;
  isSelf: boolean;
}

export interface Conversation {
  id: string;
  craftsmanId: string;
  craftsmanName: string;
  craftsmanAvatar: string;
  craftsmanTitle: string;
  lastMessage: string;
  lastTimestamp: string;
  unread: boolean;
  messages: Message[];
}
