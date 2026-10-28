import { Article, NewsCategory } from '../types/news';

/**
 * Filter articles by category and search query
 */
export function filterArticles(
  articles: Article[],
  category: NewsCategory,
  query: string = ''
): Article[] {
  const normalizedQuery = query.trim().toLowerCase();

  return articles.filter((article) => {
    const matchesCategory =
      category === 'all' || article.category === category;

    if (!matchesCategory) return false;

    if (!normalizedQuery) return true;

    const matchesTitle = article.title.toLowerCase().includes(normalizedQuery);
    const matchesSummary = article.summary.toLowerCase().includes(normalizedQuery);
    const matchesTag = article.tags.some((tag) =>
      tag.toLowerCase().includes(normalizedQuery)
    );
    const matchesAuthor = article.author.name.toLowerCase().includes(normalizedQuery);

    return matchesTitle || matchesSummary || matchesTag || matchesAuthor;
  });
}

/**
 * Get the designated lead article
 */
export function getLeadArticle(articles: Article[]): Article | undefined {
  return articles.find((a) => a.isLead) || articles[0];
}

/**
 * Get top trending articles sorted by rank
 */
export function getTrendingArticles(articles: Article[], limit: number = 5): Article[] {
  return articles
    .filter((a) => a.isTrending || a.trendingRank !== undefined)
    .sort((a, b) => (a.trendingRank ?? 99) - (b.trendingRank ?? 99))
    .slice(0, limit);
}

/**
 * Get breaking news items
 */
export function getBreakingNews(articles: Article[]): Article[] {
  return articles.filter((a) => a.isBreaking);
}

export function getRelatedArticles(
  articles: Article[],
  currentArticleOrId: Article | string,
  categoryOrLimit?: NewsCategory | number,
  limit: number = 3
): Article[] {
  const currentId = typeof currentArticleOrId === 'string' ? currentArticleOrId : currentArticleOrId.id;
  const cat = typeof currentArticleOrId === 'object' ? currentArticleOrId.category : (typeof categoryOrLimit === 'string' ? categoryOrLimit : undefined);
  const maxLimit = typeof categoryOrLimit === 'number' ? categoryOrLimit : limit;

  return articles
    .filter((a) => a.id !== currentId && (cat ? a.category === cat || a.isFeatured : true))
    .slice(0, maxLimit);
}

/**
 * Format date in Devanagari Hindi representation
 */
export function getFormattedHindiDate(date: Date = new Date()): string {
  const hindiDays = [
    'रविवार',
    'सोमवार',
    'मंगलवार',
    'बुधवार',
    'गुरुवार',
    'शुक्रवार',
    'शनिवार',
  ];
  const hindiMonths = [
    'जनवरी',
    'फ़रवरी',
    'मार्च',
    'अप्रैल',
    'मई',
    'जून',
    'जुलाई',
    'अगस्त',
    'सितंबर',
    'अक्टूबर',
    'नवंबर',
    'दिसंबर',
  ];

  const dayName = hindiDays[date.getDay()];
  const dateNum = date.getDate();
  const monthName = hindiMonths[date.getMonth()];
  const year = date.getFullYear();

  return `${dayName}, ${dateNum} ${monthName} ${year}`;
}
