import React, { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Image, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

const C = { purple:'#7139E8', plum:'#331568', ink:'#252042', muted:'#79738D', line:'#EAE6F4', lilac:'#EFE8FF', pink:'#FFE6EF', cream:'#FFF8F3', mint:'#E5F7F3', green:'#EAF9EF', white:'#FFFFFF' };
export type Page = 'welcome' | 'language' | 'privacy' | 'home' | 'module';
type Language = 'English' | 'Kiswahili';
const modules = [
  {title:'Reproductive Health', color:C.pink, icon:require('./assets/figma/reproductive-health.png')},
  {title:'Cycle Tracking', color:C.lilac, icon:require('./assets/figma/cycle-tracking.png')},
  {title:'Pregnancy & Postnatal', color:C.cream, icon:require('./assets/figma/pregnancy.png')},
  {title:'Child Growth', color:C.mint, icon:require('./assets/figma/child-growth.png')},
  {title:'Nutrition & Recipes', color:C.green, icon:require('./assets/figma/nutrition.png')},
  {title:'Private Journal', color:'#F0EDFE', icon:require('./assets/figma/journal.png')},
];
function PrimaryButton({label,onPress}:{label:string,onPress:()=>void}) {
  return <Pressable accessibilityRole="button" onPress={onPress} style={s.button}><Text style={s.buttonText}>{label}  →</Text></Pressable>;
}
export default function App({ page }: { page: Page }) {
  const router = useRouter();
  const params = useLocalSearchParams<{ title?: string }>();
  const setPage = (next: Page) => { router.push(next === 'welcome' ? '/' : '/'+next as any); };
  const [language,setLanguage]=useState<Language>('English');
  const selected = typeof params.title === 'string' ? params.title : 'Reproductive Health';
  const showModule = (title: string) => router.push({pathname:'/module',params:{title}});
  const {width}=useWindowDimensions();
  const cardWidth=Math.min((width-54)/2,168);
  const back=()=>router.back();
  return <SafeAreaView style={s.safe}><StatusBar barStyle="dark-content"/>
    {page!=='welcome' && <View style={s.header}><Pressable onPress={back} accessibilityLabel="Go back" style={s.back}><Text style={s.backText}>‹</Text></Pressable><Text style={s.headerTitle}>{page==='language'?'Welcome':page==='privacy'?'Privacy & consent':page==='home'?'SautiSalama':selected}</Text></View>}
    {page==='welcome' && <ScrollView contentContainerStyle={s.welcome} showsVerticalScrollIndicator={false}>
      <Image source={require('./assets/figma/official-logo.png')} style={s.logo} resizeMode="contain"/>
      <View style={s.illustration}><View style={s.illustrationInner}/><Image source={require('./assets/figma/welcome-companion.png')} style={s.companion} resizeMode="contain"/></View>
      <Text style={s.brand}>SautiSalama</Text>
      <Text style={s.tagline}>Your health, your voice, your choice.</Text>
      <Text style={s.welcomeSub}>Private knowledge and care navigation for women and families.</Text>
      <View style={{height:20}}/>
      <PrimaryButton label="Get started" onPress={()=>setPage('language')}/>
      <Pressable onPress={()=>setPage('home')} accessibilityRole="button"><Text style={s.guest}>Explore health information as a guest</Text></Pressable>
    </ScrollView>}
    {page==='language' && <View style={s.fill}><ScrollView contentContainerStyle={s.content}>
      <Text style={s.title}>Choose your language</Text><Text style={s.subtitle}>You can change this at any time.</Text>
      <View style={{height:22}}/>
      {(['Kiswahili','English'] as Language[]).map(l=><Pressable key={l} accessibilityRole="button" onPress={()=>setLanguage(l)} style={[s.langCard,language===l&&{borderColor:C.purple,borderWidth:2}]}>
        <View style={s.langIcon}><Text style={{fontSize:23}}>文</Text></View><View style={{flex:1}}><Text style={s.langTitle}>{l}</Text><Text style={s.langSub}>Continue in {l==='Kiswahili'?'Swahili':'English'}</Text></View><Text style={s.chevron}>{language===l?'✓':'›'}</Text>
      </Pressable>)}
      <View style={s.privacy}><Text style={s.privacyTitle}>Your privacy matters</Text><Text style={s.privacySub}>Browse articles without an account. Personal tracking is optional.</Text></View>
      </ScrollView><View style={s.bottomCta}><PrimaryButton label="Continue as guest" onPress={()=>setPage('privacy')}/></View></View>}
    {page==='privacy' && <View style={s.fill}><ScrollView contentContainerStyle={s.content}>
      <Text style={s.title}>Your data stays in your control</Text><Text style={s.subtitle}>We explain what is saved, why, and who may access it.</Text>
      <View style={{height:22}}/>
      {[
        ['Guest browsing','No registration or identity required'],
        ['Saved health entries','Optional · requires your consent'],
        ['Location','Only used with permission for nearby care'],
        ['Referral requests','Only shared with your selected provider']
      ].map(([title,detail])=><View key={title} style={s.langCard}><View style={s.langIcon}><Text style={{fontSize:22,color:C.purple}}>✦</Text></View><View style={{flex:1}}><Text style={s.langTitle}>{title}</Text><Text style={s.langSub}>{detail}</Text></View></View>)}
      <View style={[s.privacy,{backgroundColor:'#F7F5FC'}]}><Text style={{color:C.plum,fontWeight:'700',fontSize:15}}>No health data shared automatically.</Text></View>
    </ScrollView><View style={s.bottomCta}><PrimaryButton label="Continue privately" onPress={()=>setPage('home')}/></View></View>}
    {page==='home' && <ScrollView contentContainerStyle={s.content}>
      <Text style={s.title}>Habari, welcome back</Text><Text style={s.subtitle}>What would you like to explore today?</Text>
      <View style={s.grid}>{modules.map(m=><Pressable key={m.title} onPress={()=>showModule(m.title)} style={[s.module,{backgroundColor:m.color,width:cardWidth}]} accessibilityRole="button">
      <Image source={m.icon} style={{width:44,height:44}} resizeMode="contain"/><Text style={s.moduleTitle}>{m.title}</Text></Pressable>)}</View>
      <Pressable onPress={()=>showModule('Ask a private health question')} style={s.ask}><Image source={require('./assets/figma/ask.png')} style={{width:52,height:52}} resizeMode="contain"/><Text style={s.askText}>Ask a private health question</Text><Text style={s.chevron}>›</Text></Pressable>
      <Pressable onPress={()=>showModule('Find care')} style={[s.ask,{backgroundColor:C.cream}]}><Text style={s.askText}>Find maternal health services</Text><Text style={s.chevron}>›</Text></Pressable>
      <Text style={s.disclaimer}>Demo interface only. No personal health data is being collected.</Text>
    </ScrollView>}
    {page==='module' && <View style={[s.content,{flex:1}]}><Text style={s.title}>{selected}</Text><Text style={s.subtitle}>This section is being built from the approved Figma designs.</Text><View style={s.privacy}><Text style={s.privacySub}>Personal tracking and clinical guidance are not enabled in this prototype.</Text></View><PrimaryButton label="Return to home" onPress={()=>setPage('home')}/></View>}
  </SafeAreaView>;
}
const s=StyleSheet.create({
 safe:{flex:1,backgroundColor:C.white},fill:{flex:1},content:{paddingHorizontal:22,paddingTop:16,paddingBottom:36},
 welcome:{alignItems:'center',paddingHorizontal:22,paddingTop:16,paddingBottom:38,gap:14},
 logo:{width:112,height:72},illustration:{backgroundColor:C.pink,borderRadius:24,width:'100%',maxWidth:342,height:332,justifyContent:'center',alignItems:'center',overflow:'hidden'},
 illustrationInner:{position:'absolute',height:240,width:'82%',backgroundColor:C.cream,borderRadius:26},companion:{width:137,height:137},
 brand:{fontSize:24,fontWeight:'700',color:C.purple,lineHeight:29},tagline:{fontSize:15,color:C.ink,textAlign:'center',lineHeight:21},
 welcomeSub:{fontSize:15,color:C.muted,textAlign:'center',lineHeight:22},guest:{color:C.purple,fontSize:13,marginTop:7,textAlign:'center'},
 button:{backgroundColor:C.purple,borderRadius:15,height:52,alignItems:'center',justifyContent:'center',alignSelf:'stretch',minWidth:'100%'},
 buttonText:{color:C.white,fontWeight:'700',fontSize:15},
 header:{height:52,paddingHorizontal:22,flexDirection:'row',alignItems:'center',gap:12},
 back:{width:44,height:44,borderRadius:22,backgroundColor:C.lilac,alignItems:'center',justifyContent:'center'},
 backText:{fontSize:30,color:C.purple,marginTop:-4},headerTitle:{fontSize:16,fontWeight:'700',color:C.plum},
 title:{fontSize:24,fontWeight:'700',color:C.plum,lineHeight:30},subtitle:{fontSize:13,color:C.muted,marginTop:6,lineHeight:19},
 langCard:{height:74,borderWidth:1,borderColor:C.line,borderRadius:18,flexDirection:'row',gap:14,alignItems:'center',paddingHorizontal:14,marginBottom:12},
 langIcon:{height:46,width:46,borderRadius:13,backgroundColor:C.lilac,alignItems:'center',justifyContent:'center'},
 langTitle:{fontSize:15,fontWeight:'700',color:C.plum},langSub:{fontSize:12,color:C.muted,marginTop:4},chevron:{fontSize:22,color:C.purple},
 privacy:{backgroundColor:C.cream,borderRadius:18,padding:16,marginTop:14,gap:7},privacyTitle:{fontSize:18,fontWeight:'700',color:C.plum},
 privacySub:{fontSize:15,color:C.muted,lineHeight:22},bottomCta:{paddingHorizontal:22,paddingBottom:20},
 grid:{flexDirection:'row',flexWrap:'wrap',gap:10,justifyContent:'space-between',marginTop:24},
 module:{height:120,borderRadius:18,padding:14,justifyContent:'space-between'},
 moduleTitle:{fontSize:15,fontWeight:'700',color:C.plum,lineHeight:20},
 ask:{marginTop:24,borderRadius:18,padding:14,backgroundColor:C.lilac,flexDirection:'row',alignItems:'center',gap:14},
 askText:{flex:1,fontSize:15,fontWeight:'700',color:C.purple},
 disclaimer:{fontSize:12,color:C.muted,marginTop:20,textAlign:'center'},
});
