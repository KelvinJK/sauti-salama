import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import { NoticeCard } from '../src/components/cards';
import { ArticleCard } from '../src/components/content';
import { PrimaryButton } from '../src/components/PrimaryButton';
import { Screen } from '../src/components/Screen';
import { ScreenHeader } from '../src/components/ScreenHeader';
import { getArticlesForModule, hasArticles } from '../src/content';
import { type ModuleId, isModuleId } from '../src/data/modules';
import { s } from '../src/theme';

export default function Module() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const moduleId: ModuleId = isModuleId(id) ? id : 'reproductiveHealth';
  return hasArticles(moduleId) ? <ArticleList moduleId={moduleId}/> : <Placeholder moduleId={moduleId}/>;
}

function ArticleList({moduleId}:{moduleId:ModuleId}) {
  const router = useRouter();
  const { t } = useTranslation();
  const title = t(`modules.${moduleId}`);
  const articles = getArticlesForModule(moduleId);
  return <Screen>
    <ScreenHeader title={title}/>
    <ScrollView contentContainerStyle={s.content}>
      <Text style={s.title}>{title}</Text><Text style={s.subtitle}>{t('content.listSubtitle')}</Text>
      <View style={{height:22}}/>
      {articles.map(a=><ArticleCard key={a.id} article={a} onPress={()=>router.push({pathname:'/article',params:{id:a.id}})}/>)}
      {articles.length===0 && <NoticeCard><Text style={s.privacySub}>{t('content.empty')}</Text></NoticeCard>}
    </ScrollView>
  </Screen>;
}

// Modules without articles yet (journal, ask, find care) keep the original prototype screen.
function Placeholder({moduleId}:{moduleId:ModuleId}) {
  const router = useRouter();
  const { t } = useTranslation();
  const title = t(`modules.${moduleId}`);
  return <Screen>
    <ScreenHeader title={title}/>
    <View style={[s.content,{flex:1}]}><Text style={s.title}>{title}</Text><Text style={s.subtitle}>{t('module.subtitle')}</Text><NoticeCard><Text style={s.privacySub}>{t('module.notice')}</Text></NoticeCard><PrimaryButton label={t('module.returnHome')} onPress={()=>router.push('/home')}/></View>
  </Screen>;
}
