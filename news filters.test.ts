import test from 'node:test';
import assert from 'node:assert/strict';
import { filterArticles, getLeadArticle, getTrendingArticles, getRelatedArticles } from './newsFilters';
import { Article } from '../types/news';

const sampleArticles: Article[] = [
  {
    id: 'art-1',
    slug: 'bullet-train-project',
    language: 'bilingual',
    status: 'published',
    title: 'वाराणसी-दिल्ली बुलेट ट्रेन परियोजना को हरी झंडी',
    summary: 'हाई स्पीड रेलवे नेटवर्क का विस्तार उत्तर भारत में गति पकड़ेगा।',
    content: ['परीक्षण सफल रहा।'],
    category: 'bharat',
    categoryHindi: 'भारत',
    tags: ['रेलवे', 'इन्फ्रास्ट्रक्चर'],
    publishedAt: '20 मिनट पहले',
    timestampIso: '2026-10-24T18:00:00Z',
    readTimeMinutes: 4,
    author: { id: 'a1', name: 'अमित कुमार', role: 'वरिष्ठ संवाददाता', avatar: '' },
    imageUrl: '/test.jpg',
    imageCaption: 'बुलेट ट्रेन',
    imageCredit: 'पीटीआई',
    isLead: true,
    isTrending: true,
    trendingRank: 1,
    comments: [],
    views: 12000
  },
  {
    id: 'art-2',
    slug: 'isro-satellite-launch',
    language: 'bilingual',
    status: 'published',
    title: 'इसरो का नया मौसम उपग्रह अंतरिक्ष में स्थापित',
    summary: 'मौसम पूर्वानुमान और आपदा प्रबंधन में नई क्रांति आएगी।',
    content: ['सफल प्रक्षेपण।'],
    category: 'technology',
    categoryHindi: 'टेक्नोलॉजी',
    tags: ['इसरो', 'स्पेस', 'तकनीक'],
    publishedAt: '1 घंटा पहले',
    timestampIso: '2026-10-24T17:00:00Z',
    readTimeMinutes: 3,
    author: { id: 'a2', name: 'डॉ. प्रिया शर्मा', role: 'विज्ञान संपादक', avatar: '' },
    imageUrl: '/test2.jpg',
    imageCaption: 'उपग्रह',
    imageCredit: 'इसरो',
    isLead: false,
    isTrending: true,
    trendingRank: 2,
    comments: [],
    views: 8500
  },
  {
    id: 'art-3',
    slug: 'sensex-all-time-high',
    language: 'bilingual',
    status: 'published',
    title: 'शेयर बाज़ार में ऐतिहासिक तेज़ी: सेंसेक्स 85000 के पार',
    summary: 'विदेशी निवेशकों की चौतरफा खरीदारी से बाजार चमका।',
    content: ['बाजार में उछाल।'],
    category: 'business',
    categoryHindi: 'बिज़नेस',
    tags: ['सेंसेक्स', 'अर्थव्यवस्था'],
    publishedAt: '2 घंटे पहले',
    timestampIso: '2026-10-24T16:00:00Z',
    readTimeMinutes: 5,
    author: { id: 'a3', name: 'राकेश वर्मा', role: 'वित्तीय विश्लेषक', avatar: '' },
    imageUrl: '/test3.jpg',
    imageCaption: 'स्टॉक एक्सचेंज',
    imageCredit: 'रॉयटर्स',
    isLead: false,
    isTrending: false,
    comments: [],
    views: 5200
  }
];

test('filterArticles correctly filters by category', () => {
  const result = filterArticles(sampleArticles, 'technology');
  assert.equal(result.length, 1);
  assert.equal(result[0].id, 'art-2');
});

test('filterArticles correctly searches by headline keyword', () => {
  const result = filterArticles(sampleArticles, 'all', 'बुलेट ट्रेन');
  assert.equal(result.length, 1);
  assert.equal(result[0].id, 'art-1');
});

test('filterArticles searches across tags', () => {
  const result = filterArticles(sampleArticles, 'all', 'अर्थव्यवस्था');
  assert.equal(result.length, 1);
  assert.equal(result[0].id, 'art-3');
});

test('getLeadArticle returns the marked lead article', () => {
  const lead = getLeadArticle(sampleArticles);
  assert.ok(lead);
  assert.equal(lead?.id, 'art-1');
  assert.equal(lead?.isLead, true);
});

test('getTrendingArticles returns items ordered by rank', () => {
  const trending = getTrendingArticles(sampleArticles, 5);
  assert.equal(trending.length, 2);
  assert.equal(trending[0].id, 'art-1');
  assert.equal(trending[1].id, 'art-2');
});

test('getRelatedArticles excludes current article', () => {
  const related = getRelatedArticles(sampleArticles, 'art-1', 'bharat');
  assert.ok(!related.some((a) => a.id === 'art-1'));
});
