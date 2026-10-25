import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View, useWindowDimensions } from 'react-native';
import { ActionCard, ModuleCard } from '../src/components/cards';
import { Screen } from '../src/components/Screen';
import { ScreenHeader } from '../src/components/ScreenHeader';
import { type ModuleId, modules } from '../src/data/modules';
import { C, s } from '../src/theme';

export default function Home() {
  const router = useRouter();
  const { t } = useTranslation();
  const {width}=useWindowDimensions();
  const cardWidth=Math.min((width-54)/2,168);
  const showModule = (id: ModuleId) => router.push({pathname:'/module',params:{id}});
  return <Screen>
    <ScreenHeader title={t('common.appName')}/>
    <ScrollView contentContainerStyle={s.content}>
      <Text style={s.title}>{t('home.title')}</Text><Text style={s.subtitle}>{t('home.subtitle')}</Text>
      <View style={s.grid}>{modules.map(m=><ModuleCard key={m.id} title={t(`modules.${m.id}`)} color={m.color} icon={m.icon} width={cardWidth} onPress={()=>showModule(m.id)}/>)}</View>
      <ActionCard label={t('modules.ask')} icon={require('../assets/figma/ask.png')} onPress={()=>showModule('ask')}/>
      <ActionCard label={t('modules.findCareCta')} style={{backgroundColor:C.cream}} onPress={()=>showModule('findCare')}/>
      <Text style={s.disclaimer}>{t('home.disclaimer')}</Text>
    </ScrollView>
  </Screen>;
}
