import { renderRouter, screen } from 'expo-router/testing-library';
import { contentPolicy } from '../src/content/policy';
import type { Article } from '../src/content/types';
import { setLanguage } from '../src/i18n';
import { en } from '../src/i18n/locales/en';

// A fictional approved article, standing in for real reviewed content.
jest.mock('../src/content/sampleArticles', () => {
  const article: Article = {
    id: 'fixture-approved',
    moduleId: 'nutrition',
    title: { en: 'Fixture title', sw: 'Kichwa cha mfano' },
    summary: { en: 'Fixture summary', sw: 'Muhtasari wa mfano' },
    body: { en: ['Fixture paragraph.'], sw: ['Aya ya mfano.'] },
    review: { status: 'approved', reviewer: 'Test Reviewer, Midwife', reviewedAt: '2026-03-04', source: 'Fixture Guideline 2026' },
    synthetic: false,
  };
  return { sampleArticles: [article] };
});

beforeEach(async () => {
  contentPolicy.showUnreviewed = false;
  await setLanguage('en');
});
afterEach(() => { contentPolicy.showUnreviewed = true; });

it('shows approved articles in release builds without a warning', async () => {
  await renderRouter('./app', { initialUrl: '/module?id=nutrition' });
  expect(await screen.findByText('Fixture title')).toBeVisible();
  expect(screen.queryByText(en.content.unreviewedBadge)).toBeNull();
});

it('shows who reviewed an article, when, and against which source', async () => {
  await renderRouter('./app', { initialUrl: '/article?id=fixture-approved' });
  expect(await screen.findByText('Fixture paragraph.')).toBeVisible();
  expect(screen.queryByText(en.content.unreviewedBanner)).toBeNull();
  expect(screen.getByText('Reviewed by Test Reviewer, Midwife on March 4, 2026')).toBeVisible();
  expect(screen.getByText('Source: Fixture Guideline 2026')).toBeVisible();
});
