import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import { s } from '../theme';

export function ScreenHeader({title}:{title:string}) {
  const router = useRouter();
  const { t } = useTranslation();
  return <View style={s.header}><Pressable onPress={()=>router.back()} accessibilityLabel={t('common.goBack')} style={s.back}><Text style={s.backText}>‹</Text></Pressable><Text style={s.headerTitle}>{title}</Text></View>;
}
