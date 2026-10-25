import type { ModuleId } from '../data/modules';
import type { Language } from '../i18n';

export type Localized<T> = Record<Language, T>;

// Clinical review lifecycle. Only `approved` content with complete review details may be published.
export type ReviewStatus = 'draft' | 'in_review' | 'approved';

export interface ContentReview {
  status: ReviewStatus;
  /** Name and role of the qualified reviewer, e.g. "Dr A. Example, Midwife". */
  reviewer?: string;
  /** ISO date (YYYY-MM-DD) of the most recent approval. */
  reviewedAt?: string;
  /** Guideline or reference the content is based on. */
  source?: string;
}

export interface Article {
  id: string;
  moduleId: ModuleId;
  title: Localized<string>;
  summary: Localized<string>;
  /** Paragraphs, in reading order. */
  body: Localized<string[]>;
  review: ContentReview;
  /** True for placeholder text used during development; never publishable. */
  synthetic: boolean;
}
