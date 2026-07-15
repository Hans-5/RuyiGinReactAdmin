/**
 * Article domain constants — shared by ArticleForm and ContentArticles.
 * Single source of truth for categories, statuses, and display mappings.
 */

export const ARTICLE_CATEGORIES = ['technology', 'business', 'design', 'tutorial', 'news']
export const ARTICLE_STATUSES   = ['draft', 'published', 'archived']

export const CATEGORY_FILTER_OPTIONS = ARTICLE_CATEGORIES.map(c => ({
  value: c,
  label: c.charAt(0).toUpperCase() + c.slice(1),
}))

export const ARTICLE_STATUS_FILTER_OPTIONS = ARTICLE_STATUSES.map(s => ({
  value: s,
  label: s.charAt(0).toUpperCase() + s.slice(1),
}))

/** Maps article status → Badge variant. */
export const ARTICLE_STATUS_BADGE_VARIANT = {
  draft:     'warning',
  published: 'success',
  archived:  'default',
}
