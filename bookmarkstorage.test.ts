import test from 'node:test';
import assert from 'node:assert/strict';
import { toggleBookmarkId, isArticleBookmarked } from './bookmarkStorage';

test('toggleBookmarkId adds a new article ID to empty bookmarks', () => {
  const initial: string[] = [];
  const updated = toggleBookmarkId(initial, 'art-101');
  assert.deepEqual(updated, ['art-101']);
});

test('toggleBookmarkId adds to front of list if not present', () => {
  const initial = ['art-1', 'art-2'];
  const updated = toggleBookmarkId(initial, 'art-3');
  assert.deepEqual(updated, ['art-3', 'art-1', 'art-2']);
});

test('toggleBookmarkId removes article ID if already present', () => {
  const initial = ['art-1', 'art-2', 'art-3'];
  const updated = toggleBookmarkId(initial, 'art-2');
  assert.deepEqual(updated, ['art-1', 'art-3']);
});

test('isArticleBookmarked returns true when present, false when absent', () => {
  const bookmarks = ['art-1', 'art-2'];
  assert.equal(isArticleBookmarked(bookmarks, 'art-1'), true);
  assert.equal(isArticleBookmarked(bookmarks, 'art-99'), false);
});
