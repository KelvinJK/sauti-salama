import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { PrimaryButton } from '../src/components/PrimaryButton';
import { Screen } from '../src/components/Screen';
import { s } from '../src/theme';

export default function Welcome() {
  const router = useRouter();
  const { t } = useTranslation();
  return <Screen>
    <ScrollView contentContainerStyle={s.welcome} showsVerticalScrollIndicator={false}>
      <Image source={require('../assets/figma/official-logo.png')} style={s.logo} resizeMode="contain"/>
      <View style={s.illustration}><View style={s.illustrationInner}/><Image source={require('../assets/figma/welcome-companion.png')} style={s.companion} resizeMode="contain"/></View>
      <Text style={s.brand}>{t('common.appName')}</Text>
      <Text style={s.tagline}>{t('welcome.tagline')}</Text>
      <Text style={s.welcomeSub}>{t('welcome.subtitle')}</Text>
      <View style={{height:20}}/>
      <PrimaryButton label={t('welcome.getStarted')} onPress={()=>router.push('/language')}/>
      <Pressable onPress={()=>router.push('/home')} accessibilityRole="button"><Text style={s.guest}>{t('welcome.exploreAsGuest')}</Text></Pressable>
    </ScrollView>
  </Screen>;
}
