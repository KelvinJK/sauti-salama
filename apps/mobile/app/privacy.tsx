import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import { NoticeCard, OptionCard } from '../src/components/cards';
import { PrimaryButton } from '../src/components/PrimaryButton';
import { Screen } from '../src/components/Screen';
import { ScreenHeader } from '../src/components/ScreenHeader';
import { C, s } from '../src/theme';

const items = ['guest', 'entries', 'location', 'referral'] as const;

export default function Privacy() {
  const router = useRouter();
  const { t } = useTranslation();
  return <Screen>
    <ScreenHeader title={t('privacy.header')}/>
    <View style={s.fill}><ScrollView contentContainerStyle={s.content}>
      <Text style={s.title}>{t('privacy.title')}</Text><Text style={s.subtitle}>{t('privacy.subtitle')}</Text>
      <View style={{height:22}}/>
      {items.map(item=><OptionCard key={item} icon={<Text style={{fontSize:22,color:C.purple}}>✦</Text>}
        title={t(`privacy.${item}Title`)} detail={t(`privacy.${item}Detail`)}/>)}
      <NoticeCard style={{backgroundColor:'#F7F5FC'}}><Text style={{color:C.plum,fontWeight:'700',fontSize:15}}>{t('privacy.noAutoShare')}</Text></NoticeCard>
    </ScrollView><View style={s.bottomCta}><PrimaryButton label={t('privacy.continuePrivately')} onPress={()=>router.push('/home')}/></View></View>
  </Screen>;
}
