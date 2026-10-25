import type { Translations } from './en';

// Kiswahili. Plain, everyday wording; nothing here gives clinical guidance.
// Strings marked TODO(sw-review) need a native speaker to confirm before release.
export const sw: Translations = {
  common: {
    appName: 'SautiSalama',
    goBack: 'Rudi nyuma',
  },
  welcome: {
    tagline: 'Afya yako, sauti yako, chaguo lako.',
    // TODO(sw-review): "care navigation" rendered as "mwongozo wa kupata huduma".
    subtitle: 'Maarifa ya faragha na mwongozo wa kupata huduma kwa wanawake na familia.',
    getStarted: 'Anza',
    exploreAsGuest: 'Tazama taarifa za afya kama mgeni',
  },
  language: {
    header: 'Karibu',
    title: 'Chagua lugha yako',
    subtitle: 'Unaweza kubadilisha hili wakati wowote.',
    continueIn_sw: 'Endelea kwa Kiswahili',
    continueIn_en: 'Endelea kwa Kiingereza',
    privacyTitle: 'Faragha yako ni muhimu',
    // TODO(sw-review): "personal tracking" rendered as "kufuatilia taarifa zako binafsi".
    privacyBody: 'Soma makala bila kufungua akaunti. Kufuatilia taarifa zako binafsi ni hiari.',
    continueAsGuest: 'Endelea kama mgeni',
  },
  privacy: {
    header: 'Faragha na idhini',
    title: 'Taarifa zako ziko chini ya udhibiti wako',
    subtitle: 'Tunaeleza kinachohifadhiwa, kwa nini, na nani anaweza kukiona.',
    guestTitle: 'Kuvinjari kama mgeni',
    guestDetail: 'Hakuna usajili wala utambulisho unaohitajika',
    // TODO(sw-review): "Saved health entries" shortened to "your health records" to fit one line on the card.
    entriesTitle: 'Kumbukumbu zako za afya',
    entriesDetail: 'Hiari · inahitaji idhini yako',
    locationTitle: 'Mahali',
    // TODO(sw-review): shortened to fit one line on the card.
    locationDetail: 'Kwa ruhusa tu, kupata huduma karibu nawe',
    referralTitle: 'Maombi ya rufaa',
    referralDetail: 'Hushirikiwa tu na mtoa huduma uliyemchagua',
    noAutoShare: 'Hakuna taarifa za afya zinazoshirikiwa kiotomatiki.',
    continuePrivately: 'Endelea kwa faragha',
  },
  home: {
    title: 'Habari, karibu tena',
    subtitle: 'Ungependa kuchunguza nini leo?',
    disclaimer: 'Huu ni mfano wa majaribio tu. Hakuna taarifa binafsi za afya zinazokusanywa.',
  },
  modules: {
    reproductiveHealth: 'Afya ya Uzazi',
    // TODO(sw-review): "Kufuatilia Hedhi" (tracking menstruation) vs "Mzunguko wa Hedhi" (menstrual cycle).
    cycleTracking: 'Kufuatilia Hedhi',
    // TODO(sw-review): long label; check it reads naturally and fits the card.
    pregnancy: 'Ujauzito na Baada ya Kujifungua',
    childGrowth: 'Ukuaji wa Mtoto',
    nutrition: 'Lishe na Mapishi',
    journal: 'Shajara Binafsi',
    ask: 'Uliza swali la afya kwa faragha',
    findCare: 'Tafuta huduma',
    findCareCta: 'Tafuta huduma za afya ya mama',
  },
  module: {
    // TODO(sw-review): "approved Figma designs" rendered as "michoro iliyoidhinishwa ya Figma".
    subtitle: 'Sehemu hii inaandaliwa kwa kufuata michoro iliyoidhinishwa ya Figma.',
    notice: 'Ufuatiliaji binafsi na ushauri wa kitabibu havijawezeshwa katika toleo hili la majaribio.',
    returnHome: 'Rudi ukurasa wa mwanzo',
  },
  content: {
    listSubtitle: 'Makala huonekana hapa baada ya kukaguliwa na wataalamu wa afya.',
    empty: 'Makala za mada hii zinaandaliwa na kukaguliwa na wataalamu wa afya.',
    unreviewedBadge: 'Haijakaguliwa',
    // TODO(sw-review): development-only warning text.
    unreviewedBanner: 'Bado haijakaguliwa na mtaalamu wa afya. Maandishi ya mfano kwa ajili ya majaribio tu.',
    reviewedBy: 'Imekaguliwa na {{reviewer}} tarehe {{date}}',
    source: 'Chanzo: {{source}}',
    notFound: 'Makala hii haipatikani.',
  },
};
