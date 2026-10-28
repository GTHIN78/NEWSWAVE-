/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { INITIAL_ARTICLES, CATEGORIES } from './data/newsData';
import { Article, Comment, NewsCategory, Language } from './types/news';
import { filterArticles, getLeadArticle, getTrendingArticles, getBreakingNews, getRelatedArticles } from './utils/newsFilters';
import { loadBookmarksFromStorage, saveBookmarksToStorage, toggleBookmarkId } from './utils/bookmarkStorage';
import { rotateArticlesOnRefresh, getRotationState } from './utils/newsRotation';

// Components
import { TopBar } from './components/TopBar';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { LeadStory } from './components/LeadStory';
import { ArticleCard } from './components/ArticleCard';
import { Sidebar } from './components/Sidebar';
import { ArticleDetail } from './components/ArticleDetail';
import { Footer } from './components/Footer';
import { AdPlaceholder } from './components/AdPlaceholder';
import { PolicyModal } from './components/PolicyModal';
import { AdminDashboard } from './components/AdminDashboard';
import { VideoNews } from './components/VideoNews';
import { SaaSWorkspace } from './components/SaaSWorkspace';
import { PlatformAdminDashboard } from './components/PlatformAdminDashboard';
import { INITIAL_TENANTS, INITIAL_TENANT_MEMBERS } from './data/tenantData';
import { Tenant, TenantMember, PlanId } from './types/saas';

import { 
  auth, 
  testConnection, 
  signInWithGoogle, 
  logOut, 
  getUserRole, 
  fetchPublishedArticlesFromFirestore, 
  fetchAllArticlesFromFirestore, 
  saveArticleToFirestore, 
  deleteArticleFromFirestore, 
  seedInitialArticles 
} from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { UserRole } from './types/news';

// Icons
import { 
  Flame, 
  Search, 
  X, 
  ArrowRight, 
  BookOpen, 
  TrendingUp, 
  Radio, 
  ChevronRight,
  Bookmark,
  Video,
  Sparkles,
  ShieldCheck,
  FileText,
  Building2,
  Crown
} from 'lucide-react';

export default function App() {
  // Initialize with rotated non-repeating news from the news pool
  const [articles, setArticles] = useState<Article[]>(() => {
    return rotateArticlesOnRefresh(INITIAL_ARTICLES).rotatedArticles;
  });
  const [activeCategory, setActiveCategory] = useState<NewsCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activePolicy, setActivePolicy] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [refreshCount, setRefreshCount] = useState<number>(() => getRotationState().cycleCount);
  const [refreshToast, setRefreshToast] = useState<string | null>(null);

  // Firebase Authentication & Authorization State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole>('reader');
  const [isFirestoreActive, setIsFirestoreActive] = useState<boolean>(true);

  // App View routing: 'home' | 'video' | 'admin' | 'saas' | 'platform_admin'
  const [currentView, setCurrentView] = useState<'home' | 'video' | 'admin' | 'saas' | 'platform_admin'>('home');

  // Multi-tenant SaaS state
  const [tenants, setTenants] = useState<Tenant[]>(INITIAL_TENANTS);
  const [activeTenant, setActiveTenant] = useState<Tenant>(INITIAL_TENANTS[0]);
  const [tenantMembers, setTenantMembers] = useState<TenantMember[]>(INITIAL_TENANT_MEMBERS);

  // Language state: 'hi' | 'en' (defaults to 'hi')
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('newswave_lang') as Language) || 'hi';
  });

  // Dark Mode state: boolean (persisted in localStorage)
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('newswave_theme') === 'dark';
  });

  // Sync dark mode class on html root element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('newswave_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('newswave_theme', 'light');
    }
  }, [darkMode]);

  // Sync language with html tag and localStorage
  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem('newswave_lang', language);
  }, [language]);

  // 1. Initial Firestore Connection Check & Real-time Authentication Sync
  useEffect(() => {
    testConnection().then((connected) => {
      setIsFirestoreActive(connected);
    });

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const role = await getUserRole(user);
        setUserRole(role);

        // Authorized staff can view all articles (drafts, in-review, published)
        if (['admin', 'chief_editor', 'editor', 'reporter'].includes(role)) {
          try {
            const staffArticles = await fetchAllArticlesFromFirestore();
            if (staffArticles && staffArticles.length > 0) {
              setArticles(staffArticles);
            }
          } catch (err) {
            console.warn('Staff Firestore article fetch fallback:', err);
          }
        }
      } else {
        setUserRole('reader');
        // Public readers query ONLY published articles from Firestore
        try {
          const publicArticles = await fetchPublishedArticlesFromFirestore();
          if (publicArticles && publicArticles.length > 0) {
            const rotated = rotateArticlesOnRefresh(publicArticles);
            setArticles(rotated.rotatedArticles);
            setRefreshCount(rotated.cycleCount);
          } else {
            // Seed Firestore with verified demo articles on fresh project
            await seedInitialArticles(INITIAL_ARTICLES);
            const rotated = rotateArticlesOnRefresh(INITIAL_ARTICLES.filter((a) => a.status === 'published'));
            setArticles(rotated.rotatedArticles);
            setRefreshCount(rotated.cycleCount);
          }
        } catch (err) {
          console.warn('Public Firestore article fetch notice:', err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // 2. Initial Tenant & Platform Registry Sync
  useEffect(() => {
    fetch('/api/tenants')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) {
          setTenants(data.data);
        }
      })
      .catch(err => console.warn('Tenant sync notice:', err));
  }, []);

  // 3. URL Path & PopState routing support (/article/:slug, /admin, /video, /saas, /platform-admin, /publication/:slug)
  useEffect(() => {
    const handleUrlRoute = () => {
      const pathname = window.location.pathname;
      if (pathname.startsWith('/article/')) {
        const slug = pathname.replace('/article/', '').trim();
        const found = articles.find(
          (a) => a.slug === slug || a.slugHi === slug || a.slugEn === slug || a.id === slug
        );
        if (found && (found.status === 'published' || ['admin', 'chief_editor', 'editor', 'reporter'].includes(userRole))) {
          setSelectedArticle(found);
          setCurrentView('home');
        }
      } else if (pathname === '/admin') {
        setCurrentView('admin');
        setSelectedArticle(null);
      } else if (pathname === '/video') {
        setCurrentView('video');
        setSelectedArticle(null);
      } else if (pathname === '/saas') {
        setCurrentView('saas');
        setSelectedArticle(null);
      } else if (pathname === '/platform-admin') {
        setCurrentView('platform_admin');
        setSelectedArticle(null);
      } else if (pathname.startsWith('/publication/')) {
        const pubSlug = pathname.replace('/publication/', '').trim();
        const match = tenants.find(t => t.slug === pubSlug || t.id === pubSlug);
        if (match) {
          setActiveTenant(match);
        }
        setCurrentView('home');
        setSelectedArticle(null);
      } else {
        if (pathname === '/' && selectedArticle) {
          setSelectedArticle(null);
        }
      }
    };

    handleUrlRoute();
    window.addEventListener('popstate', handleUrlRoute);
    return () => window.removeEventListener('popstate', handleUrlRoute);
  }, [articles, userRole, tenants]);

  // Bookmark IDs persisted in localStorage
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => loadBookmarksFromStorage());

  useEffect(() => {
    saveBookmarksToStorage(bookmarkedIds);
  }, [bookmarkedIds]);

  const handleToggleBookmark = (articleId: string) => {
    setBookmarkedIds((prev) => toggleBookmarkId(prev, articleId));
  };

  const handleClearBookmarks = () => {
    setBookmarkedIds([]);
  };

  // Saved Articles derived array
  const bookmarkedArticles = useMemo(() => {
    return articles.filter((a) => bookmarkedIds.includes(a.id));
  }, [articles, bookmarkedIds]);

  // Scroll to Saved Articles section in the sidebar
  const handleViewSaved = () => {
    if (currentView !== 'home') {
      setCurrentView('home');
    }
    if (selectedArticle) {
      setSelectedArticle(null);
    }
    setTimeout(() => {
      const el = document.getElementById('saved-articles-sidebar');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Tenant-isolated articles stream
  const tenantArticles = useMemo(() => {
    if (activeTenant.id === 'newswave-main') {
      return articles.filter(a => !a.tenantId || a.tenantId === 'newswave-main');
    }
    return articles.filter(a => a.tenantId === activeTenant.id);
  }, [articles, activeTenant]);

  // Filtered Articles based on category & search within active tenant
  const filteredArticles = useMemo(() => {
    return filterArticles(tenantArticles, activeCategory, searchQuery);
  }, [tenantArticles, activeCategory, searchQuery]);

  // Lead story for the current view
  const leadArticle = useMemo(() => {
    if (activeCategory === 'all' && !searchQuery) {
      return getLeadArticle(tenantArticles);
    }
    return filteredArticles[0];
  }, [tenantArticles, activeCategory, searchQuery, filteredArticles]);

  // Secondary stories for home feed
  const secondaryStories = useMemo(() => {
    if (activeCategory === 'all' && !searchQuery && leadArticle) {
      return tenantArticles.filter((a) => a.id !== leadArticle.id).slice(0, 3);
    }
    return filteredArticles.slice(1, 4);
  }, [tenantArticles, activeCategory, searchQuery, leadArticle, filteredArticles]);

  // Remaining latest feed stories
  const remainingStories = useMemo(() => {
    if (activeCategory === 'all' && !searchQuery && leadArticle) {
      const excludedIds = [leadArticle.id, ...secondaryStories.map((s) => s.id)];
      return tenantArticles.filter((a) => !excludedIds.includes(a.id));
    }
    return filteredArticles.slice(4);
  }, [tenantArticles, activeCategory, searchQuery, leadArticle, secondaryStories, filteredArticles]);

  // Breaking News
  const breakingNews = useMemo(() => {
    return getBreakingNews(tenantArticles);
  }, [tenantArticles]);

  // Trending stories
  const trendingArticles = useMemo(() => {
    return getTrendingArticles(tenantArticles);
  }, [tenantArticles]);

  // Related articles for detail view
  const currentRelatedArticles = useMemo(() => {
    if (!selectedArticle) return [];
    return getRelatedArticles(tenantArticles, selectedArticle);
  }, [tenantArticles, selectedArticle]);

  // Category specific slice helpers for homepage blocks
  const bharatStories = useMemo(
    () => tenantArticles.filter((a) => a.category === 'bharat').slice(0, 3),
    [tenantArticles]
  );
  const businessStories = useMemo(
    () => tenantArticles.filter((a) => a.category === 'business').slice(0, 3),
    [tenantArticles]
  );
  const techStories = useMemo(
    () => tenantArticles.filter((a) => a.category === 'technology').slice(0, 3),
    [tenantArticles]
  );
  const explainerStories = useMemo(
    () => tenantArticles.filter((a) => a.category === 'explainer').slice(0, 2),
    [tenantArticles]
  );

  // Google Auth Handlers
  const handleSignInGoogle = async () => {
    try {
      const res = await signInWithGoogle();
      if (res && res.user) {
        setCurrentUser(res.user);
        setUserRole(res.role);
        if (['admin', 'chief_editor', 'editor', 'reporter'].includes(res.role)) {
          const staffArts = await fetchAllArticlesFromFirestore();
          if (staffArts && staffArts.length > 0) {
            setArticles(staffArts);
          }
        }
      }
    } catch (err) {
      console.error('Google Sign-in failed:', err);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
      setCurrentUser(null);
      setUserRole('reader');
      const pubArts = await fetchPublishedArticlesFromFirestore();
      if (pubArts && pubArts.length > 0) {
        setArticles(pubArts);
      }
    } catch (err) {
      console.error('Sign-out error:', err);
    }
  };

  // Handlers
  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    setCurrentView('home');
    window.history.pushState(null, '', `/article/${article.slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticleById = (articleId: string) => {
    const art = articles.find((a) => a.id === articleId);
    if (art) {
      handleSelectArticle(art);
    }
  };

  // Anti-repetition Fresh News Refresh Handler
  const handleRefreshNews = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const currentLeadId = leadArticle?.id;
      const currentTopIds = [currentLeadId, ...secondaryStories.map((s) => s.id)].filter(Boolean);
      const excludeQuery = currentTopIds.join(',');
      const nextCycle = refreshCount + 1;

      let freshLoaded = false;
      try {
        const res = await fetch(`/api/articles/fresh?exclude=${encodeURIComponent(excludeQuery)}&count=8&cycle=${nextCycle}`);
        const result = await res.json();
        if (result.success && result.data && result.data.length > 0) {
          const map = new Map<string, Article>();
          articles.forEach((a) => map.set(a.id, a));
          result.data.forEach((a: Article) => map.set(a.id, a));
          const merged = Array.from(map.values());
          const rotated = rotateArticlesOnRefresh(merged);
          setArticles(rotated.rotatedArticles);
          setRefreshCount(rotated.cycleCount);
          freshLoaded = true;
        }
      } catch (networkErr) {
        // Fallback to client pool rotation
      }

      if (!freshLoaded) {
        const rotated = rotateArticlesOnRefresh(articles);
        setArticles(rotated.rotatedArticles);
        setRefreshCount(rotated.cycleCount);
      }

      setRefreshToast(
        language === 'hi' 
          ? `✓ ताज़ा समाचार अपडेट: नई मुख्य खबरें लोड हुईं (रिफ्रेश #${nextCycle})`
          : `✓ Fresh News Feed Loaded: New Headlines Promoted (Refresh #${nextCycle})`
      );
      setTimeout(() => setRefreshToast(null), 3500);

      if (currentView === 'home' && !selectedArticle) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } finally {
      setTimeout(() => setIsRefreshing(false), 300);
    }
  }, [articles, leadArticle, secondaryStories, refreshCount, language, currentView, selectedArticle]);

  const handleSelectCategory = (cat: NewsCategory) => {
    if (cat === 'video') {
      setCurrentView('video');
      setSelectedArticle(null);
      window.history.pushState(null, '', '/video');
      return;
    }
    setActiveCategory(cat);
    setSearchQuery('');
    setSelectedArticle(null);
    setCurrentView('home');
    window.history.pushState(null, '', `/category/${cat}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedArticle(null);
    setCurrentView('home');
  };

  const handleGoHome = () => {
    setActiveCategory('all');
    setSearchQuery('');
    setSelectedArticle(null);
    setCurrentView('home');
    window.history.pushState(null, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddComment = (articleId: string, comment: Comment) => {
    setArticles((prev) =>
      prev.map((art) => {
        if (art.id === articleId) {
          const updated = {
            ...art,
            comments: [comment, ...art.comments],
          };
          if (selectedArticle && selectedArticle.id === articleId) {
            setSelectedArticle(updated);
          }
          return updated;
        }
        return art;
      })
    );
  };

  // CMS Article Save Handler (Cloud Firestore Persistence + ABAC Enforcement)
  const handleSaveArticle = async (article: Article) => {
    // Workflow enforcement: Only chief_editor or admin can directly publish
    let finalArticle = { ...article };
    if (finalArticle.status === 'published' && userRole !== 'admin' && userRole !== 'chief_editor') {
      finalArticle.status = 'in_review';
    }

    // 1. Optimistic local state update
    setArticles((prev) => {
      const idx = prev.findIndex((a) => a.id === finalArticle.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = finalArticle;
        return copy;
      }
      return [finalArticle, ...prev];
    });

    // 2. Persist to Cloud Firestore
    try {
      await saveArticleToFirestore(finalArticle);
    } catch (err) {
      console.error('Firestore article save error:', err);
    }

    // 3. Keep backend SSR cache synchronized
    try {
      await fetch('/api/articles', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'role': userRole || 'chief_editor'
        },
        body: JSON.stringify(finalArticle),
      });
    } catch (err) {
      console.warn('Backend sync notice:', err);
    }
  };

  // CMS Article Delete Handler (Restricted to Chief Editor & Admin)
  const handleDeleteArticle = async (articleId: string) => {
    if (userRole !== 'admin' && userRole !== 'chief_editor') {
      alert('Only Chief Editor or Admin can delete articles.');
      return;
    }

    setArticles((prev) => prev.filter((a) => a.id !== articleId));

    try {
      await deleteArticleFromFirestore(articleId);
    } catch (err) {
      console.error('Firestore delete error:', err);
    }

    try {
      await fetch(`/api/articles/${articleId}`, { 
        method: 'DELETE',
        headers: { 'role': userRole }
      });
    } catch (err) {
      console.warn('Backend delete sync notice:', err);
    }
  };

  // ==========================================
  // SaaS Multi-Tenant Handlers
  // ==========================================
  const handleSelectTenant = (tenant: Tenant) => {
    setActiveTenant(tenant);
    setSelectedArticle(null);
    setCurrentView('home');
    window.history.pushState(null, '', tenant.id === 'newswave-main' ? '/' : `/publication/${tenant.slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCreateTenant = async (newTenantData: Partial<Tenant>): Promise<Tenant | null> => {
    try {
      const res = await fetch('/api/tenants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-email': currentUser?.email || 'sanjayraj505@gmail.com',
        },
        body: JSON.stringify({
          ...newTenantData,
          ownerEmail: currentUser?.email || 'sanjayraj505@gmail.com',
          ownerId: currentUser?.uid || 'user-owner',
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setTenants((prev) => [...prev, data.data]);
        setActiveTenant(data.data);
        return data.data;
      }
    } catch (err) {
      console.error('Tenant creation error:', err);
    }
    return null;
  };

  const handleUpdateTenant = async (updatedTenant: Tenant) => {
    try {
      const res = await fetch(`/api/tenants/${updatedTenant.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-user-email': currentUser?.email || 'sanjayraj505@gmail.com',
        },
        body: JSON.stringify(updatedTenant),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setTenants((prev) => prev.map((t) => (t.id === updatedTenant.id ? data.data : t)));
        if (activeTenant.id === updatedTenant.id) {
          setActiveTenant(data.data);
        }
      }
    } catch (err) {
      console.error('Tenant update error:', err);
    }
  };

  const handleInviteMember = async (tenantId: string, email: string, name: string, role: string) => {
    try {
      const res = await fetch(`/api/tenants/${tenantId}/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-email': currentUser?.email || 'sanjayraj505@gmail.com',
        },
        body: JSON.stringify({ email, displayName: name, role }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setTenantMembers((prev) => [...prev, data.data]);
      }
    } catch (err) {
      console.error('Member invite error:', err);
    }
  };

  const handleRemoveMember = async (tenantId: string, memberId: string) => {
    try {
      await fetch(`/api/tenants/${tenantId}/members/${memberId}`, { method: 'DELETE' });
      setTenantMembers((prev) => prev.filter((m) => !(m.tenantId === tenantId && m.id === memberId)));
    } catch (err) {
      console.error('Member remove error:', err);
    }
  };

  const handleRefreshTenants = async () => {
    try {
      const res = await fetch('/api/tenants');
      const data = await res.json();
      if (data.success && data.data) {
        setTenants(data.data);
      }
    } catch (err) {
      console.warn('Tenant refresh error:', err);
    }
  };

  const isHindi = language === 'hi';

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col font-devanagari transition-colors duration-200">
      {/* 1. Top Utility Bar with Breaking Ticker, Language Switcher, Dark Mode, SaaS and Platform Admin */}
      <TopBar
        breakingArticles={breakingNews}
        language={language}
        onToggleLanguage={(lang) => setLanguage(lang)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onSelectArticle={handleSelectArticle}
        onOpenDataGuide={() => setActivePolicy('guide')}
        onOpenVideoNews={() => {
          setSelectedArticle(null);
          setCurrentView('video');
          window.history.pushState(null, '', '/video');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAdmin={() => {
          setSelectedArticle(null);
          setCurrentView('admin');
          window.history.pushState(null, '', '/admin');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSaaS={() => {
          setSelectedArticle(null);
          setCurrentView('saas');
          window.history.pushState(null, '', '/saas');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenPlatformAdmin={() => {
          setSelectedArticle(null);
          setCurrentView('platform_admin');
          window.history.pushState(null, '', '/platform-admin');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        activeTenantName={activeTenant.name}
        currentUser={currentUser}
        userRole={userRole}
        onSignInGoogle={handleSignInGoogle}
        onSignOut={handleSignOut}
        onRefreshNews={handleRefreshNews}
        isRefreshing={isRefreshing}
      />

      {/* 2. Newswave Masthead, Multi-Tenant Switcher & Search */}
      <Header
        language={language}
        onSearch={handleSearch}
        searchQuery={searchQuery}
        onClearSearch={() => setSearchQuery('')}
        onGoHome={handleGoHome}
        onOpenDataGuide={() => setActivePolicy('guide')}
        onOpenVideoNews={() => {
          setSelectedArticle(null);
          setCurrentView('video');
          window.history.pushState(null, '', '/video');
        }}
        onOpenAdmin={() => {
          setSelectedArticle(null);
          setCurrentView('admin');
          window.history.pushState(null, '', '/admin');
        }}
        onOpenSaaS={() => {
          setSelectedArticle(null);
          setCurrentView('saas');
          window.history.pushState(null, '', '/saas');
        }}
        savedCount={bookmarkedArticles.length}
        onViewSaved={handleViewSaved}
        currentTenant={activeTenant}
        allTenants={tenants}
        onSelectTenant={handleSelectTenant}
        onRefreshNews={handleRefreshNews}
        isRefreshing={isRefreshing}
        refreshCount={refreshCount}
      />

      {/* Dynamic Fresh News Notification Banner */}
      {refreshToast && (
        <div className="bg-emerald-900/95 text-emerald-100 text-xs px-4 py-2 border-b border-emerald-700/60 shadow-inner flex items-center justify-between font-devanagari transition-all">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
              <span className="font-semibold">{refreshToast}</span>
            </div>
            <button 
              type="button" 
              onClick={() => setRefreshToast(null)}
              className="text-emerald-300 hover:text-white text-xs px-2 cursor-pointer font-bold"
              aria-label="Dismiss banner"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* 3. Sticky Category Navigation (Prompt Item 3) */}
      <Navigation
        language={language}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        onSelectTag={(tag) => handleSearch(tag)}
        onOpenVideoNews={() => {
          setSelectedArticle(null);
          setCurrentView('video');
          window.history.pushState(null, '', '/video');
        }}
        isCustomView={currentView !== 'home'}
      />

      {/* Main Body Routing */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4">
        {/* VIEW A: SAAS CUSTOMER WORKSPACE */}
        {currentView === 'saas' ? (
          <SaaSWorkspace
            tenants={tenants}
            activeTenant={activeTenant}
            onSelectTenant={handleSelectTenant}
            onCreateTenant={handleCreateTenant}
            onUpdateTenant={handleUpdateTenant}
            members={tenantMembers}
            onInviteMember={handleInviteMember}
            onRemoveMember={handleRemoveMember}
            currentUserEmail={currentUser?.email || 'sanjayraj505@gmail.com'}
            isSuperAdmin={currentUser?.email === 'sanjayraj505@gmail.com' || userRole === 'admin'}
            onClose={() => {
              setCurrentView('home');
              window.history.pushState(null, '', '/');
            }}
            onOpenNewsroom={() => {
              setCurrentView('admin');
              window.history.pushState(null, '', '/admin');
            }}
            onOpenPlatformAdmin={() => {
              setCurrentView('platform_admin');
              window.history.pushState(null, '', '/platform-admin');
            }}
          />
        ) : currentView === 'platform_admin' ? (
          /* VIEW B: PLATFORM OWNER / SUPER ADMIN CONTROL ROOM */
          <PlatformAdminDashboard
            currentUserEmail={currentUser?.email || 'sanjayraj505@gmail.com'}
            onClose={() => {
              setCurrentView('home');
              window.history.pushState(null, '', '/');
            }}
            onSelectTenantToView={(tenant) => {
              handleSelectTenant(tenant);
              setCurrentView('saas');
            }}
            tenants={tenants}
            onRefreshTenants={handleRefreshTenants}
          />
        ) : currentView === 'admin' ? (
          /* VIEW C: ADMIN / EDITORIAL CMS DASHBOARD */
          <AdminDashboard
            articles={articles}
            currentTenant={activeTenant}
            onSaveArticle={handleSaveArticle}
            onDeleteArticle={handleDeleteArticle}
            onClose={() => {
              setCurrentView('home');
              window.history.pushState(null, '', '/');
            }}
            onPreviewArticle={(art) => {
              handleSelectArticle(art);
            }}
            currentUser={currentUser}
            userRole={userRole}
            onSignInGoogle={handleSignInGoogle}
            onSignOut={handleSignOut}
            isFirestoreActive={isFirestoreActive}
          />
        ) : currentView === 'video' ? (
          /* VIEW D: VIDEO NEWS PORTAL */
          <VideoNews
            language={language}
            onBack={handleGoHome}
            onSelectArticleById={handleSelectArticleById}
            articles={articles}
          />
        ) : selectedArticle ? (
          /* VIEW E: ARTICLE DETAIL VIEW */
          <ArticleDetail
            article={selectedArticle}
            language={language}
            onToggleLanguage={(lang) => setLanguage(lang)}
            relatedArticles={currentRelatedArticles}
            onBack={() => {
              setSelectedArticle(null);
              window.history.pushState(null, '', '/');
            }}
            onSelectArticle={handleSelectArticle}
            onSelectCategory={handleSelectCategory}
            onAddComment={handleAddComment}
            isBookmarked={bookmarkedIds.includes(selectedArticle.id)}
            onToggleBookmark={handleToggleBookmark}
          />
        ) : (
          /* VIEW D: EDITORIAL HOMEPAGE & CATEGORY STREAM */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 8 Columns: Editorial Feed */}
            <div className="lg:col-span-8 space-y-8">
              {/* Search Active Notification Bar */}
              {searchQuery && (
                <div className="bg-red-50 dark:bg-red-950/40 border-l-4 border-[#B71925] p-3 flex items-center justify-between text-xs rounded-r">
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-[#B71925]" />
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                      {isHindi ? `खोज परिणाम: "${searchQuery}"` : `Search results for: "${searchQuery}"`}
                    </span>
                    <span className="text-neutral-500 dark:text-neutral-400">
                      ({filteredArticles.length} {isHindi ? 'खबरें' : 'stories'})
                    </span>
                  </div>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-neutral-500 hover:text-[#B71925] font-bold p-1 cursor-pointer"
                    aria-label="खोज साफ़ करें"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Category Active Header */}
              {activeCategory !== 'all' && !searchQuery && (
                <div className="border-b-2 border-[#B71925] pb-2 flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold font-martel text-neutral-900 dark:text-neutral-100">
                      {isHindi 
                        ? CATEGORIES.find((c) => c.id === activeCategory)?.nameHindi 
                        : CATEGORIES.find((c) => c.id === activeCategory)?.nameEnglish}
                    </h1>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                      {isHindi
                        ? CATEGORIES.find((c) => c.id === activeCategory)?.descriptionHi
                        : CATEGORIES.find((c) => c.id === activeCategory)?.descriptionEn}
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded text-neutral-600 dark:text-neutral-300">
                    {filteredArticles.length} {isHindi ? 'रिपोर्ट्स' : 'stories'}
                  </span>
                </div>
              )}

              {/* Empty Publication Onboarding State */}
              {!leadArticle && tenantArticles.length === 0 && (
                <div className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-8 text-center space-y-4 my-6">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-950/60 text-[#B71925] rounded-full flex items-center justify-center mx-auto">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                      {activeTenant.name} में अभी कोई आलेख प्रकाशित नहीं हुआ है
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
                      यह पब्लिकेशन सक्रिय है। संपादकीय टीम CMS न्यूज़रूम में जाकर ड्राफ्ट बना सकती है और समीक्षा के बाद प्रकाशित कर सकती है।
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentView('admin');
                        window.history.pushState(null, '', '/admin');
                      }}
                      className="px-4 py-2 bg-[#B71925] hover:bg-red-800 text-white font-bold text-xs rounded transition cursor-pointer"
                    >
                      + पहला आलेख लिखें (CMS Newsroom)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelectTenant(tenants[0])}
                      className="px-4 py-2 bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-bold text-xs rounded transition cursor-pointer"
                    >
                      NEWSWAVE मुख्य पोर्टल पर जाएं
                    </button>
                  </div>
                </div>
              )}

              {/* Item 4: Featured Lead Story (Prompt Item 4) */}
              {leadArticle && (
                <LeadStory
                  article={leadArticle}
                  language={language}
                  onSelectArticle={handleSelectArticle}
                  onSelectCategory={handleSelectCategory}
                  isBookmarked={bookmarkedIds.includes(leadArticle.id)}
                  onToggleBookmark={handleToggleBookmark}
                />
              )}

              {/* Secondary 3-Column Story Grid on Frontpage */}
              {activeCategory === 'all' && !searchQuery && secondaryStories.length > 0 && (
                <section aria-label="प्रमुख विशेष खबरें">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-gray-200 dark:border-neutral-800">
                    {secondaryStories.map((story) => (
                      <ArticleCard
                        key={story.id}
                        article={story}
                        language={language}
                        variant="standard"
                        onSelectArticle={handleSelectArticle}
                        onSelectCategory={handleSelectCategory}
                        isBookmarked={bookmarkedIds.includes(story.id)}
                        onToggleBookmark={handleToggleBookmark}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* In-Feed Responsive Ad Placeholder (Prompt Item 9) */}
              <AdPlaceholder slotType="in-feed" className="my-6" />

              {/* Special Section: Video News Spotlight on Homepage */}
              {activeCategory === 'all' && !searchQuery && (
                <section className="bg-neutral-900 text-white p-5 rounded-xs border border-neutral-800 shadow-md">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                      <h2 className="text-lg font-bold font-martel text-white">
                        {isHindi ? 'वीडियो बुलेटिन एवं विश्लेषण' : 'Video News Spotlight'}
                      </h2>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedArticle(null);
                        setCurrentView('video');
                      }}
                      className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                    >
                      <span>{isHindi ? 'सभी वीडियो देखें' : 'View All Videos'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {articles
                      .filter((a) => a.videoUrl)
                      .slice(0, 2)
                      .map((vidArt) => (
                        <div
                          key={vidArt.id}
                          onClick={() => handleSelectArticle(vidArt)}
                          className="group cursor-pointer bg-neutral-800/80 rounded overflow-hidden border border-neutral-700 hover:border-red-600 transition-all"
                        >
                          <div className="relative aspect-video overflow-hidden">
                            <img
                              src={vidArt.imageUrl}
                              alt={vidArt.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <div className="w-10 h-10 rounded-full bg-[#B71925] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <Video className="w-4 h-4 text-white" />
                              </div>
                            </div>
                            <span className="absolute bottom-2 right-2 bg-black/80 text-[10px] font-mono px-1.5 py-0.5 rounded text-white">
                              {vidArt.readTimeMinutes}:30
                            </span>
                          </div>
                          <div className="p-3">
                            <h4 className="font-bold text-xs sm:text-sm font-martel text-neutral-100 group-hover:text-red-400 transition-colors line-clamp-2">
                              {isHindi ? vidArt.title : (vidArt.titleEn || vidArt.title)}
                            </h4>
                          </div>
                        </div>
                      ))}
                  </div>
                </section>
              )}

              {/* Item 7: Category Sections on Desktop (भारत, बिज़नेस, टेक) */}
              {activeCategory === 'all' && !searchQuery && (
                <div className="space-y-8">
                  {/* Category Section: भारत (National) */}
                  <section aria-labelledby="sec-bharat">
                    <div className="flex items-center justify-between border-b-2 border-neutral-900 dark:border-neutral-700 pb-2 mb-4">
                      <h2 id="sec-bharat" className="text-xl font-bold font-devanagari text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 bg-[#B71925]" />
                        <span>{isHindi ? 'भारत एवं राष्ट्रीय विमर्श' : 'India & Governance'}</span>
                      </h2>
                      <button
                        onClick={() => handleSelectCategory('bharat')}
                        className="text-xs font-semibold text-[#B71925] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>{isHindi ? 'और खबरें' : 'More'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {bharatStories.map((story) => (
                        <ArticleCard
                          key={story.id}
                          article={story}
                          language={language}
                          variant="compact-row"
                          onSelectArticle={handleSelectArticle}
                          onSelectCategory={handleSelectCategory}
                          isBookmarked={bookmarkedIds.includes(story.id)}
                          onToggleBookmark={handleToggleBookmark}
                        />
                      ))}
                    </div>
                  </section>

                  {/* Category Section: बिज़नेस एवं बाज़ार (Business & Markets) */}
                  <section aria-labelledby="sec-business">
                    <div className="flex items-center justify-between border-b-2 border-neutral-900 dark:border-neutral-700 pb-2 mb-4">
                      <h2 id="sec-business" className="text-xl font-bold font-devanagari text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 bg-[#B71925]" />
                        <span>{isHindi ? 'बिज़नेस, अर्थव्यवस्था एवं बाज़ार' : 'Business & Finance'}</span>
                      </h2>
                      <button
                        onClick={() => handleSelectCategory('business')}
                        className="text-xs font-semibold text-[#B71925] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>{isHindi ? 'और खबरें' : 'More'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {businessStories.map((story) => (
                        <ArticleCard
                          key={story.id}
                          article={story}
                          language={language}
                          variant="compact-row"
                          onSelectArticle={handleSelectArticle}
                          onSelectCategory={handleSelectCategory}
                          isBookmarked={bookmarkedIds.includes(story.id)}
                          onToggleBookmark={handleToggleBookmark}
                        />
                      ))}
                    </div>
                  </section>

                  {/* Category Section: टेक्नोलॉजी एवं एआई (Tech & AI) */}
                  <section aria-labelledby="sec-tech">
                    <div className="flex items-center justify-between border-b-2 border-neutral-900 dark:border-neutral-700 pb-2 mb-4">
                      <h2 id="sec-tech" className="text-xl font-bold font-devanagari text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 bg-[#B71925]" />
                        <span>{isHindi ? 'टेक्नोलॉजी, एआई एवं नवाचार' : 'Technology & AI'}</span>
                      </h2>
                      <button
                        onClick={() => handleSelectCategory('technology')}
                        className="text-xs font-semibold text-[#B71925] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>{isHindi ? 'और खबरें' : 'More'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {techStories.map((story) => (
                        <ArticleCard
                          key={story.id}
                          article={story}
                          language={language}
                          variant="compact-row"
                          onSelectArticle={handleSelectArticle}
                          onSelectCategory={handleSelectCategory}
                          isBookmarked={bookmarkedIds.includes(story.id)}
                          onToggleBookmark={handleToggleBookmark}
                        />
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {/* Explainer Special Block (Prompt Item 7) */}
              <section className="bg-neutral-50 dark:bg-neutral-900/60 p-5 rounded-xs border-l-4 border-[#B71925] border-y border-r border-gray-200 dark:border-neutral-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#B71925]" />
                    <h2 className="text-lg font-bold font-devanagari text-neutral-900 dark:text-neutral-100">
                      {isHindi ? 'न्यूज़वेव एक्सप्लेनर — गहराई से समझें' : 'Newswave Explainers — In-Depth'}
                    </h2>
                  </div>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 font-devanagari">
                    {isHindi ? 'मुद्दों का सरल विश्लेषण' : 'Clarity on Complex Issues'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {explainerStories.map((art) => (
                    <div
                      key={art.id}
                      onClick={() => handleSelectArticle(art)}
                      className="group cursor-pointer bg-white dark:bg-neutral-900 p-4 rounded border border-gray-200 dark:border-neutral-800 hover:border-[#B71925] transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2 text-xs text-[#B71925] font-bold uppercase mb-1">
                          <span>{isHindi ? 'क्यू एंड ए विश्लेषण' : 'Q&A Breakdown'}</span>
                          <span className="text-gray-300 dark:text-neutral-700">·</span>
                          <span className="text-neutral-500 dark:text-neutral-400 font-normal">
                            {art.readTimeMinutes} {isHindi ? 'मिनट पढ़ने का समय' : 'min read'}
                          </span>
                        </div>
                        <h3 className="text-base font-bold font-martel text-neutral-900 dark:text-neutral-100 leading-snug group-hover:text-[#B71925] transition-colors mb-2">
                          {isHindi ? art.title : (art.titleEn || art.title)}
                        </h3>
                        <p className="text-xs text-neutral-600 dark:text-neutral-300 line-clamp-2 leading-relaxed">
                          {isHindi ? art.summary : (art.summaryEn || art.summary)}
                        </p>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                        <span>{art.author.name}</span>
                        <span className="font-semibold text-[#B71925] flex items-center gap-0.5">
                          {isHindi ? 'विस्तार से समझें' : 'Read'} <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Item 5: ताज़ा समाचार Timeline Feed (Latest News Feed) */}
              <section aria-labelledby="sec-latest">
                <div className="flex items-center justify-between border-b-2 border-neutral-900 dark:border-neutral-700 pb-2 mb-4">
                  <h2 id="sec-latest" className="text-xl font-bold font-devanagari text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                    <Radio className="w-5 h-5 text-[#B71925]" />
                    <span>{isHindi ? 'ताज़ा समाचार फ़ीड (Latest Wire Stream)' : 'Latest News Stream'}</span>
                  </h2>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 font-devanagari">
                    {isHindi ? 'अपडेटेड 24x7' : 'Updated 24x7'}
                  </span>
                </div>

                <div className="divide-y divide-gray-100 dark:divide-neutral-800">
                  {remainingStories.map((story) => (
                    <ArticleCard
                      key={story.id}
                      article={story}
                      language={language}
                      variant="compact-row"
                      onSelectArticle={handleSelectArticle}
                      onSelectCategory={handleSelectCategory}
                      isBookmarked={bookmarkedIds.includes(story.id)}
                      onToggleBookmark={handleToggleBookmark}
                    />
                  ))}
                </div>
              </section>
            </div>

            {/* Right 4 Columns: Sidebar with Saved Articles Section */}
            <div className="lg:col-span-4">
              <Sidebar
                language={language}
                trendingArticles={trendingArticles}
                bookmarkedArticles={bookmarkedArticles}
                onSelectArticle={handleSelectArticle}
                onOpenPolicy={(p) => setActivePolicy(p)}
                onToggleBookmark={handleToggleBookmark}
                onClearBookmarks={handleClearBookmarks}
              />
            </div>
          </div>
        )}
      </main>

      {/* 10. Footer (Prompt Item 10) */}
      <Footer
        language={language}
        onSelectCategory={handleSelectCategory}
        onOpenPolicy={(p) => setActivePolicy(p)}
        onOpenVideoNews={() => {
          setSelectedArticle(null);
          setCurrentView('video');
        }}
        onOpenAdmin={() => setCurrentView('admin')}
      />

      {/* Interactive Policy & Data Guide Modals */}
      <PolicyModal
        policyKey={activePolicy}
        language={language}
        onClose={() => setActivePolicy(null)}
      />
    </div>
  );
}
