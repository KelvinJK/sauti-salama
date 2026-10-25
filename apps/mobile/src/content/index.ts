import type { ModuleId } from '../data/modules';
import { contentPolicy } from './policy';
import { sampleArticles } from './sampleArticles';
import type { Article } from './types';

export type { Article, ContentReview, Localized, ReviewStatus } from './types';

const articles: Article[] = sampleArticles;

// Approved by a named reviewer, on a known date, against a cited source. Synthetic text never qualifies.
export function isPublishable(article: Article): boolean {
  const { status, reviewer, reviewedAt, source } = article.review;
  return !article.synthetic && status === 'approved' && !!reviewer?.trim() && !!reviewedAt && !!source?.trim();
}

const isVisible = (article: Article) => isPublishable(article) || contentPolicy.showUnreviewed;

// Modules that show an article list rather than the generic placeholder screen.
export const hasArticles = (moduleId: ModuleId) => articles.some(a => a.moduleId === moduleId);

export function getArticlesForModule(moduleId: ModuleId, source: Article[] = articles): Article[] {
  return source.filter(a => a.moduleId === moduleId && isVisible(a));
}

export function getArticle(id: string | undefined, source: Article[] = articles): Article | undefined {
  const article = source.find(a => a.id === id);
  return article && isVisible(article) ? article : undefined;
}

export const allArticles = (): readonly Article[] => articles;
