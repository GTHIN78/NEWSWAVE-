export type SaasRole =
  | 'super_admin'
  | 'tenant_owner' 
  | 'tenant_admin' 
  | 'tenant_editor' 
  | 'tenant_writer' 
  | 'tenant_analyst' 
  | 'reader';

export type PlanId = 'free' | 'starter' | 'pro' | 'business';

export interface PlanEntitlement {
  id: PlanId;
  name: string;
  nameHindi: string;
  badge: string;
  priceMonthlyInr: number;
  maxMembers: number;
  maxArticlesPerMonth: number;
  maxAiQueriesPerMonth: number;
  customDomainAllowed: boolean;
  advancedSeoAllowed: boolean;
  analyticsAllowed: boolean;
  adMonetizationAllowed: boolean;
  whiteLabelAllowed: boolean;
  descriptionHi: string;
  descriptionEn: string;
  featuresHi: string[];
  featuresEn: string[];
}

export const SAAS_PLANS: Record<PlanId, PlanEntitlement> = {
  free: {
    id: 'free',
    name: 'Free Starter',
    nameHindi: 'निःशुल्क (फ्री)',
    badge: 'फ्री',
    priceMonthlyInr: 0,
    maxMembers: 1,
    maxArticlesPerMonth: 15,
    maxAiQueriesPerMonth: 10,
    customDomainAllowed: false,
    advancedSeoAllowed: false,
    analyticsAllowed: false,
    adMonetizationAllowed: false,
    whiteLabelAllowed: false,
    descriptionHi: 'स्वतंत्र पत्रकारों और नए समाचार ब्लॉगों के लिए उपयुक्त।',
    descriptionEn: 'Ideal for independent journalists and new digital blogs.',
    featuresHi: [
      '1 टीम सदस्य',
      '15 आलेख प्रति माह',
      '10 AI संपादकीय प्रश्न प्रति माह',
      'Newswave सब-डोमेन (.newswave.in)',
      'मानक द्विभाषी थीम'
    ],
    featuresEn: [
      '1 team member',
      '15 articles per month',
      '10 AI editorial queries/mo',
      'Newswave sub-domain',
      'Standard bilingual theme'
    ]
  },
  starter: {
    id: 'starter',
    name: 'Newsroom Starter',
    nameHindi: 'न्यूज़रूम स्टार्टर',
    badge: 'लोकप्रिय',
    priceMonthlyInr: 1499,
    maxMembers: 3,
    maxArticlesPerMonth: 75,
    maxAiQueriesPerMonth: 60,
    customDomainAllowed: false,
    advancedSeoAllowed: true,
    analyticsAllowed: true,
    adMonetizationAllowed: true,
    whiteLabelAllowed: false,
    descriptionHi: 'छोटे स्थानीय समाचार पोर्टलों और सामुदायिक पत्रिकाओं के लिए।',
    descriptionEn: 'For local news portals and hyper-local community outlets.',
    featuresHi: [
      '3 टीम सदस्य (संपादक, रिपोर्टर)',
      '75 आलेख प्रति माह',
      '60 AI संपादकीय ड्राफ्ट/शीर्षक सुझाव',
      'Google News & Schema.org SEO',
      'विज्ञापन स्लॉट एकीकरण (Google AdSense)',
      'मासिक पाठक विश्लेषण'
    ],
    featuresEn: [
      '3 team members (Editors, Reporters)',
      '75 articles per month',
      '60 AI editorial drafts & headline assists',
      'Google News & Schema.org SEO',
      'AdSlot placement support',
      'Monthly audience analytics'
    ]
  },
  pro: {
    id: 'pro',
    name: 'Editorial Pro',
    nameHindi: 'संपादकीय प्रो',
    badge: 'सर्वाधिक अनुशंसित',
    priceMonthlyInr: 4999,
    maxMembers: 10,
    maxArticlesPerMonth: 350,
    maxAiQueriesPerMonth: 300,
    customDomainAllowed: true,
    advancedSeoAllowed: true,
    analyticsAllowed: true,
    adMonetizationAllowed: true,
    whiteLabelAllowed: true,
    descriptionHi: 'मध्यम आकार के डिजिटल मीडिया हाउस और क्षेत्रीय समाचार नेटवर्क के लिए।',
    descriptionEn: 'For established regional digital newsrooms and publishing houses.',
    featuresHi: [
      '10 टीम सदस्य एवं भूमिका नियंत्रण (RBAC)',
      '350 आलेख प्रति माह',
      '300 AI को-पायलट अनुरोध',
      'कस्टम डोमेन समर्थन (उदा. mynews.com)',
      'व्हाइट-लेबल कस्टम ब्रांडिंग व लोगो',
      'उन्नत तथ्य-जांच व संपादकीय वर्कफ़्लो',
      'प्राथमिकता तकनीकी सहायता'
    ],
    featuresEn: [
      '10 team members with RBAC',
      '350 articles per month',
      '300 AI co-pilot queries',
      'Custom domain support (e.g. mynews.com)',
      'White-label branding & logo',
      'Advanced fact-check & editorial workflow',
      'Priority technical support'
    ]
  },
  business: {
    id: 'business',
    name: 'Enterprise Media',
    nameHindi: 'एंटरप्राइज मीडिया',
    badge: 'असीमित',
    priceMonthlyInr: 12999,
    maxMembers: 999,
    maxArticlesPerMonth: 99999,
    maxAiQueriesPerMonth: 1500,
    customDomainAllowed: true,
    advancedSeoAllowed: true,
    analyticsAllowed: true,
    adMonetizationAllowed: true,
    whiteLabelAllowed: true,
    descriptionHi: 'बड़े समाचार नेटवर्कों, बहु-संस्करण प्रकाशनों और डिजिटल ब्रॉडकास्टर्स के लिए।',
    descriptionEn: 'For large news networks, multi-edition syndicates and digital broadcasters.',
    featuresHi: [
      'असीमित टीम सदस्य व मल्टी-रोल एक्सेस',
      'असीमित मासिक प्रकाशन',
      '1,500 उच्च-गति AI संपादकीय प्रश्न',
      'मल्टी-डोमेन और समर्पित सीडीएन तैयारी',
      'पूर्ण विज्ञापन नेटवर्क नियंत्रण',
      'कस्टम वेबहुक और एपीआई एकीकरण',
      '24/7 समर्पित समाधान प्रबंधक'
    ],
    featuresEn: [
      'Unlimited team members with granular RBAC',
      'Unlimited monthly publishing',
      '1,500 high-speed AI queries',
      'Multi-domain and CDN readiness',
      'Full advertising network monetization',
      'Custom webhooks & API integrations',
      '24/7 dedicated solution engineer'
    ]
  }
};

export interface TenantTheme {
  primaryColor: string; // Hex color code e.g. '#B71925', '#0f766e', '#1d4ed8'
  fontFamily: 'Martel' | 'Noto Sans' | 'System';
  darkModeDefault: boolean;
  logoUrl?: string;
  faviconUrl?: string;
}

export interface TenantSeoSettings {
  siteTitle: string;
  siteTitleHi?: string;
  siteDescription: string;
  siteDescriptionHi?: string;
  ogImageUrl?: string;
  googleVerificationCode?: string;
  canonicalBaseUrl?: string;
}

export interface TenantAdConfig {
  enabled: boolean;
  provider: 'none' | 'adsense' | 'custom';
  publisherId?: string;
  topBannerSlot?: string;
  sidebarSlot?: string;
  inArticleSlot?: string;
  footerSlot?: string;
}

export interface TenantCategoryConfig {
  id: string;
  slug: string;
  nameHindi: string;
  nameEnglish: string;
  enabled: boolean;
}

export interface TenantUsage {
  articlesPublishedMonth: number;
  aiQueriesUsedMonth: number;
  memberCount: number;
  cycleStartDate: string;
}

export interface Tenant {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  taglineHi?: string;
  description: string;
  languagePreference: 'hi' | 'en' | 'bilingual';
  ownerId: string;
  ownerEmail: string;
  planId: PlanId;
  subscriptionStatus: 'active' | 'trialing' | 'past_due' | 'canceled';
  billingPeriod: 'monthly' | 'yearly';
  subscriptionRenewsAt?: string;
  customDomain?: string;
  customDomainStatus?: 'unverified' | 'pending' | 'verified';
  theme: TenantTheme;
  categories: TenantCategoryConfig[];
  socialLinks: {
    twitter?: string;
    youtube?: string;
    facebook?: string;
    instagram?: string;
  };
  seoSettings: TenantSeoSettings;
  adConfig: TenantAdConfig;
  usage: TenantUsage;
  status: 'active' | 'suspended' | 'pending';
  createdAt: string;
  updatedAt: string;
}

export interface TenantMember {
  id: string;
  tenantId: string;
  userId: string;
  userEmail: string;
  displayName: string;
  role: 'tenant_owner' | 'tenant_admin' | 'tenant_editor' | 'tenant_writer' | 'tenant_analyst';
  invitedBy: string;
  joinedAt: string;
  status: 'active' | 'invited';
}

export interface PlatformMetric {
  totalTenants: number;
  activeTenants: number;
  totalArticlesPublished: number;
  totalAiQueriesUsed: number;
  paidSubscriptionsCount: number;
  monthlyRecurringRevenueInr: number;
}
