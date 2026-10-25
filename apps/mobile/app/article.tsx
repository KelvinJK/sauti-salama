import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import { NoticeCard } from '../src/components/cards';
import { ReviewBanner } from '../src/components/content';
import { PrimaryButton } from '../src/components/PrimaryButton';
import { Screen } from '../src/components/Screen';
import { ScreenHeader } from '../src/components/ScreenHeader';
import { getArticle, isPublishable } from '../src/content';
import type { Language } from '../src/i18n';
import { s } from '../src/theme';

export default function ArticleScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage as Language;
  const { id } = useLocalSearchParams<{ id?: string }>();
  const article = getArticle(id);

  if (!article) return <Screen>
    <ScreenHeader title={t('common.appName')}/>
    <View style={[s.content,{flex:1}]}><NoticeCard><Text style={s.privacySub}>{t('content.notFound')}</Text></NoticeCard><PrimaryButton label={t('module.returnHome')} onPress={()=>router.push('/home')}/></View>
  </Screen>;

  const { review } = article;
  // reviewedAt is a calendar date (parsed as UTC midnight), so format it in UTC to avoid an off-by-one day.
  const reviewedOn = review.reviewedAt && new Intl.DateTimeFormat(lang, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(review.reviewedAt));
  return <Screen>
    <ScreenHeader title={t(`modules.${article.moduleId}`)}/>
    <ScrollView contentContainerStyle={s.content}>
      <Text style={s.title}>{article.title[lang]}</Text>
      {!isPublishable(article) && <ReviewBanner/>}
      {article.body[lang].map((p,i)=><Text key={i} style={s.paragraph}>{p}</Text>)}
      {isPublishable(article) && <NoticeCard>
        <Text style={s.reviewMeta}>{t('content.reviewedBy', { reviewer: review.reviewer, date: reviewedOn })}</Text>
        <Text style={s.reviewMeta}>{t('content.source', { source: review.source })}</Text>
      </NoticeCard>}
    </ScrollView>
  </Screen>;
}
