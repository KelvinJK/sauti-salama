import type { ModuleId } from '../data/modules';
import type { Article } from './types';

// Synthetic placeholder articles for layout and flow testing only. They contain no health information and
// stay in `draft`, so they can never be published. Real articles come from the clinical team.
const articleModules: ModuleId[] = ['reproductiveHealth', 'cycleTracking', 'pregnancy', 'childGrowth', 'nutrition'];

function sample(moduleId: ModuleId, n: number): Article {
  return {
    id: `${moduleId}-sample-${n}`,
    moduleId,
    title: { en: `Sample article ${n}`, sw: `Makala ya mfano ${n}` },
    summary: {
      en: 'Placeholder for an article that will be written and reviewed by health professionals.',
      // TODO(sw-review): placeholder text.
      sw: 'Nafasi ya makala itakayoandikwa na kukaguliwa na wataalamu wa afya.',
    },
    body: {
      en: [
        'This is sample text used to test the layout. It is not health advice.',
        'Real articles will be written and approved by qualified health professionals before they appear in the app.',
      ],
      // TODO(sw-review): placeholder text.
      sw: [
        'Haya ni maandishi ya mfano ya kujaribu mpangilio. Si ushauri wa afya.',
        'Makala halisi zitaandikwa na kuidhinishwa na wataalamu wa afya waliohitimu kabla ya kuonekana kwenye programu.',
      ],
    },
    review: { status: 'draft' },
    synthetic: true,
  };
}

export const sampleArticles: Article[] = articleModules.flatMap(moduleId => [sample(moduleId, 1), sample(moduleId, 2)]);
