import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import { NoticeCard, OptionCard } from '../src/components/cards';
import { PrimaryButton } from '../src/components/PrimaryButton';
import { Screen } from '../src/components/Screen';
import { ScreenHeader } from '../src/components/ScreenHeader';
import { languages, setLanguage } from '../src/i18n';
import { s } from '../src/theme';

// Each language is always shown in its own name, whatever the current UI language.
const endonyms = { sw: 'Kiswahili', en: 'English' } as const;

export default function LanguageScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const current = i18n.resolvedLanguage;
  return <Screen>
    <ScreenHeader title={t('language.header')}/>
    <View style={s.fill}><ScrollView contentContainerStyle={s.content}>
      <Text style={s.title}>{t('language.title')}</Text><Text style={s.subtitle}>{t('language.subtitle')}</Text>
      <View style={{height:22}}/>
      {languages.map(l=><OptionCard key={l} selected={current===l} onPress={()=>setLanguage(l)}
        icon={<Text style={{fontSize:23}}>文</Text>} title={endonyms[l]} detail={t(`language.continueIn_${l}`)}
        trailing={<Text style={s.chevron}>{current===l?'✓':'›'}</Text>}/>)}
      <NoticeCard><Text style={s.privacyTitle}>{t('language.privacyTitle')}</Text><Text style={s.privacySub}>{t('language.privacyBody')}</Text></NoticeCard>
    </ScrollView><View style={s.bottomCta}><PrimaryButton label={t('language.continueAsGuest')} onPress={()=>router.push('/privacy')}/></View></View>
  </Screen>;
}
