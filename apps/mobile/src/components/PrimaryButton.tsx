import { Pressable, Text } from 'react-native';
import { s } from '../theme';

export function PrimaryButton({label,onPress}:{label:string,onPress:()=>void}) {
  return <Pressable accessibilityRole="button" onPress={onPress} style={s.button}><Text style={s.buttonText}>{label}  →</Text></Pressable>;
}
