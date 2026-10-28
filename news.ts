export type Language = 'hi' | 'en';

export type ArticleStatus = 'draft' | 'in_review' | 'approved' | 'published' | 'archived';

export type UserRole = 'admin' | 'chief_editor' | 'editor' | 'reporter' | 'reader';

export type NewsCategory = 
  | 'all'
  | 'bharat'
  | 'duniya'
  | 'rajneeti'
  | 'business'
  | 'technology'
  | 'shiksha'
  | 'manoranjan'
  | 'samaj'
  | 'sports'
  | 'lifestyle'
  | 'video'
  | 'explainer';

export interface Author {
  id: string;
  name: string;
  nameEn?: string;
  role: string;
  roleEn?: string;
  avatar?: string;
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
  likes: number;
}

export interface Article {
  id: string;
  tenantId?: string; // Multi-tenant publication ID (defaults to 'newswave-main')
  slug: string;
  slugHi?: string;
  slugEn?: string;
  language: 'hi' | 'en' | 'bilingual';
  
  // Hindi Content
  title: string;
  titleHi?: string;
  summary: string;
  summaryHi?: string;
  content: string[];
  contentHi?: string[];
  
  // English Content
  titleEn?: string;
  summaryEn?: string;
  contentEn?: string[];

  category: NewsCategory;
  categoryHindi: string;
  categoryEnglish?: string;
  tags: string[];
  
  author: Author;
  sourceLinks?: string[];
  
  imageUrl: string;
  heroImage?: string;
  imageAlt?: string;
  imageCaption?: string;
  imageCredit?: string;
  
  videoUrl?: string; // YouTube watch or Shorts link
  videoTitle?: string;
  
  status: ArticleStatus;
  
  isLead?: boolean;
  isFeatured?: boolean;
  featured?: boolean;
  isBreaking?: boolean;
  breakingNews?: boolean;
  isTrending?: boolean;
  trendingRank?: number;
  
  pullQuote?: string;
  pullQuoteEn?: string;
  
  publishedAt: string;
  timestampIso: string;
  createdAt?: string;
  updatedAt?: string;
  readTimeMinutes: number;
  
  views: number;
  comments: Comment[];
  
  // SEO fields
  seoTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
}

export interface MarketItem {
  name: string;
  nameEn?: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export interface WeatherItem {
  city: string;
  cityEn?: string;
  temp: string;
  condition: string;
  conditionEn?: string;
}

export interface CategoryInfo {
  id: NewsCategory;
  slug: string;
  nameHindi: string;
  nameEnglish: string;
  descriptionHi: string;
  descriptionEn: string;
}

export interface VideoStory {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  youtubeId: string;
  duration: string;
  category: NewsCategory;
  categoryHindi: string;
  thumbnailUrl: string;
  publishedAt: string;
  relatedArticleId?: string;
}
