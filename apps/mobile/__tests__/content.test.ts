import { type Article, allArticles, getArticle, getArticlesForModule, isPublishable } from '../src/content';
import { contentPolicy } from '../src/content/policy';
import { isModuleId } from '../src/data/modules';
import { languages } from '../src/i18n';

const approved: Article = {
  id: 'approved-1',
  moduleId: 'nutrition',
  title: { en: 'Title', sw: 'Kichwa' },
  summary: { en: 'Summary', sw: 'Muhtasari' },
  body: { en: ['Paragraph'], sw: ['Aya'] },
  review: { status: 'approved', reviewer: 'Reviewer Name, Role', reviewedAt: '2026-01-15', source: 'Reference guideline' },
  synthetic: false,
};
const draft: Article = { ...approved, id: 'draft-1', review: { status: 'draft' } };
const fixtures = [approved, draft];

afterEach(() => { contentPolicy.showUnreviewed = true; });

describe('isPublishable', () => {
  it('accepts approved content with reviewer, date and source', () => {
    expect(isPublishable(approved)).toBe(true);
  });

  it.each([
    ['draft', { ...approved.review, status: 'draft' as const }],
    ['in review', { ...approved.review, status: 'in_review' as const }],
    ['no reviewer', { ...approved.review, reviewer: '  ' }],
    ['no review date', { ...approved.review, reviewedAt: undefined }],
    ['no source', { ...approved.review, source: '' }],
  ])('rejects content with %s', (_, review) => {
    expect(isPublishable({ ...approved, review })).toBe(false);
  });

  it('never publishes synthetic text, even if marked approved', () => {
    expect(isPublishable({ ...approved, synthetic: true })).toBe(false);
  });
});

describe('visibility policy', () => {
  it('release builds only show publishable articles', () => {
    contentPolicy.showUnreviewed = false;
    expect(getArticlesForModule('nutrition', fixtures).map(a => a.id)).toEqual(['approved-1']);
    expect(getArticle('draft-1', fixtures)).toBeUndefined();
    expect(getArticle('approved-1', fixtures)).toBe(approved);
  });

  it('development builds also show unreviewed articles', () => {
    contentPolicy.showUnreviewed = true;
    expect(getArticlesForModule('nutrition', fixtures).map(a => a.id)).toEqual(['approved-1', 'draft-1']);
    expect(getArticle('draft-1', fixtures)).toBe(draft);
  });

  it('returns nothing for unknown ids', () => {
    expect(getArticle('missing', fixtures)).toBeUndefined();
    expect(getArticle(undefined, fixtures)).toBeUndefined();
  });
});

describe('bundled articles', () => {
  const articles = allArticles();

  it('have unique ids and valid modules', () => {
    expect(new Set(articles.map(a => a.id)).size).toBe(articles.length);
    for (const a of articles) expect(isModuleId(a.moduleId)).toBe(true);
  });

  it('are complete in every language', () => {
    for (const a of articles) {
      for (const lang of languages) {
        expect(a.title[lang].trim()).not.toBe('');
        expect(a.summary[lang].trim()).not.toBe('');
        expect(a.body[lang].length).toBeGreaterThan(0);
        for (const p of a.body[lang]) expect(p.trim()).not.toBe('');
      }
      expect(a.body.sw.length).toBe(a.body.en.length);
    }
  });

  it('synthetic articles are never approved', () => {
    for (const a of articles.filter(x => x.synthetic)) expect(a.review.status).not.toBe('approved');
  });

  it('none are visible in a release build yet', () => {
    contentPolicy.showUnreviewed = false;
    expect(articles.filter(a => getArticle(a.id))).toEqual([]);
  });
});
