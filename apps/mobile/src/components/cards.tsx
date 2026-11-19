import type { ReactNode } from 'react';
import { Image, type ImageSourcePropType, Pressable, type StyleProp, Text, View, type ViewStyle } from 'react-native';
import { s } from '../theme';

// Bordered row with an icon tile, title and detail line (language options, privacy items).
export function OptionCard({icon,title,detail,trailing,selected,onPress}:{icon:ReactNode,title:string,detail:string,trailing?:ReactNode,selected?:boolean,onPress?:()=>void}) {
  const body = <><View style={s.langIcon}>{icon}</View><View style={{flex:1}}><Text style={s.langTitle}>{title}</Text><Text style={s.langSub}>{detail}</Text></View>{trailing}</>;
  if (!onPress) return <View style={s.langCard}>{body}</View>;
  return <Pressable accessibilityRole="button" accessibilityState={{selected}} onPress={onPress} style={[s.langCard,selected&&s.langCardSelected]}>{body}</Pressable>;
}

// Soft rounded panel for notices (privacy reassurance, prototype disclaimers).
export function NoticeCard({children,style}:{children:ReactNode,style?:StyleProp<ViewStyle>}) {
  return <View style={[s.privacy,style]}>{children}</View>;
}

export function ModuleCard({title,color,icon,width,onPress}:{title:string,color:string,icon:ImageSourcePropType,width:number,onPress:()=>void}) {
  return <Pressable onPress={onPress} style={[s.module,{backgroundColor:color,width}]} accessibilityRole="button">
    <Image source={icon} style={{width:44,height:44}} resizeMode="contain"/><Text style={s.moduleTitle}>{title}</Text></Pressable>;
}

// Full-width call-to-action row with a chevron (ask a question, find care).
export function ActionCard({label,icon,style,onPress}:{label:string,icon?:ImageSourcePropType,style?:StyleProp<ViewStyle>,onPress:()=>void}) {
  return <Pressable onPress={onPress} style={[s.ask,style]} accessibilityRole="button">{icon && <Image source={icon} style={{width:52,height:52}} resizeMode="contain"/>}<Text style={s.askText}>{label}</Text><Text style={s.chevron}>›</Text></Pressable>;
}
