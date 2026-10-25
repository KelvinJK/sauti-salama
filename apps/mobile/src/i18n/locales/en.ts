// English is the source of truth for translation keys; other locales must match this shape.
export const en = {
  common: {
    appName: 'SautiSalama',
    goBack: 'Go back',
  },
  welcome: {
    tagline: 'Your health, your voice, your choice.',
    subtitle: 'Private knowledge and care navigation for women and families.',
    getStarted: 'Get started',
    exploreAsGuest: 'Explore health information as a guest',
  },
  language: {
    header: 'Welcome',
    title: 'Choose your language',
    subtitle: 'You can change this at any time.',
    continueIn_sw: 'Continue in Swahili',
    continueIn_en: 'Continue in English',
    privacyTitle: 'Your privacy matters',
    privacyBody: 'Browse articles without an account. Personal tracking is optional.',
    continueAsGuest: 'Continue as guest',
  },
  privacy: {
    header: 'Privacy & consent',
    title: 'Your data stays in your control',
    subtitle: 'We explain what is saved, why, and who may access it.',
    guestTitle: 'Guest browsing',
    guestDetail: 'No registration or identity required',
    entriesTitle: 'Saved health entries',
    entriesDetail: 'Optional · requires your consent',
    locationTitle: 'Location',
    locationDetail: 'Only used with permission for nearby care',
    referralTitle: 'Referral requests',
    referralDetail: 'Only shared with your selected provider',
    noAutoShare: 'No health data shared automatically.',
    continuePrivately: 'Continue privately',
  },
  home: {
    title: 'Habari, welcome back',
    subtitle: 'What would you like to explore today?',
    disclaimer: 'Demo interface only. No personal health data is being collected.',
  },
  modules: {
    reproductiveHealth: 'Reproductive Health',
    cycleTracking: 'Cycle Tracking',
    pregnancy: 'Pregnancy & Postnatal',
    childGrowth: 'Child Growth',
    nutrition: 'Nutrition & Recipes',
    journal: 'Private Journal',
    ask: 'Ask a private health question',
    findCare: 'Find care',
    findCareCta: 'Find maternal health services',
  },
  module: {
    subtitle: 'This section is being built from the approved Figma designs.',
    notice: 'Personal tracking and clinical guidance are not enabled in this prototype.',
    returnHome: 'Return to home',
  },
};

type DeepStrings<T> = { [K in keyof T]: T[K] extends string ? string : DeepStrings<T[K]> };
export type Translations = DeepStrings<typeof en>;
