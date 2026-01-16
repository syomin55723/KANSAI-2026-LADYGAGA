
export type EventTag = 'TRANSPORT' | 'CHECK-IN' | 'SIGHTSEEING' | 'FOOD' | 'SHOPPING' | 'FUN';

export interface TranslationItem {
  cn: string;
  jp: string;
}

export interface DetailSection {
  title: string; // e.g. "店名由來", "必吃美食"
  content: string;
  isHighlight?: boolean; // For "Must eat", "Must buy"
  // Custom Styling for specific sections (e.g. Song highlights)
  accentColor?: string; 
  borderColor?: string;
  bgColor?: string;
}

export interface BookingInfo {
  id: string;
  site: string; // Restaurant name or platform
  plan: string;
  pax: number;
  price: string;
  timeLimit?: string;
  url?: string;
}

export interface EventItem {
  time: string;
  title: string;
  tag: EventTag;
  
  // Special Visual Treatment
  isSpecial?: boolean; // Triggers highlight style (Full width card)
  isImportant?: boolean; // Triggers subtle icon in standard layout
  specialTheme?: 'GOLD' | 'RED' | 'GAGA' | 'ALERT' | 'FOX'; // GOLD (Standard), RED (Daruma), GAGA (Concert), ALERT (Warning), FOX (Inari)
  
  // Navigation
  address?: string;
  phone?: string; // For Car GPS Navigation
  mapEmbedUrl?: string; // New: For embedding Google Maps iframe
  
  // Ticket / Transport info
  isTicket?: boolean;
  from?: string;
  to?: string;
  booking?: BookingInfo; // Structured reservation data

  // Content
  description?: string; // Short summary
  
  // Guide Features
  vocab?: TranslationItem[]; // Point & Speak (Menu, Parking name)
  details?: DetailSection[]; // Structured story/guide info
  
  recommendations?: string[]; // Quick bullet points
}

export interface DayData {
  title: string;
  loc: string;
  img: string;
  events: EventItem[];
}

export interface DaySetting {
  d: string;
  w: string;
  k_num: string;
  city: string;
  temp_L: number;
  temp_H: number;
}

export interface Expense {
  id: string;
  item: string;
  amount: number;
  category: 'Food' | 'Transport' | 'Shopping' | 'Stay' | 'Other';
  payer: string; // 'K', 'M', 'E', 'G', 'J'
  isPaid: boolean;
}
