import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { NoticeCard } from '../src/components/cards';
import { PrimaryButton } from '../src/components/PrimaryButton';
import { Screen } from '../src/components/Screen';
import { ScreenHeader } from '../src/components/ScreenHeader';
import { isModuleId } from '../src/data/modules';
import { s } from '../src/theme';

// Placeholder for every module until its content is designed.
export default function Module() {
  const router = useRouter();
  const { t } = useTranslation();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const title = t(`modules.${isModuleId(id) ? id : 'reproductiveHealth'}`);
  return <Screen>
    <ScreenHeader title={title}/>
    <View style={[s.content,{flex:1}]}><Text style={s.title}>{title}</Text><Text style={s.subtitle}>{t('module.subtitle')}</Text><NoticeCard><Text style={s.privacySub}>{t('module.notice')}</Text></NoticeCard><PrimaryButton label={t('module.returnHome')} onPress={()=>router.push('/home')}/></View>
  </Screen>;
}
