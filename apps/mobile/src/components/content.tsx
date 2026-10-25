import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import { type Article, isPublishable } from '../content';
import type { Language } from '../i18n';
import { s } from '../theme';

export function ArticleCard({article,onPress}:{article:Article,onPress:()=>void}) {
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage as Language;
  return <Pressable accessibilityRole="button" onPress={onPress} style={s.articleCard}>
    {!isPublishable(article) && <View style={s.badge}><Text style={s.badgeText}>{t('content.unreviewedBadge')}</Text></View>}
    <Text style={s.articleTitle}>{article.title[lang]}</Text>
    <Text style={s.articleSummary}>{article.summary[lang]}</Text>
  </Pressable>;
}

// Shown on every article that has not passed clinical review (development builds only).
export function ReviewBanner() {
  const { t } = useTranslation();
  return <View style={s.banner} accessibilityRole="alert"><Text style={s.bannerText}>{t('content.unreviewedBanner')}</Text></View>;
}
