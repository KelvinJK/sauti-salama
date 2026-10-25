import { StyleSheet } from 'react-native';

export const C = { purple:'#7139E8', plum:'#331568', ink:'#252042', muted:'#79738D', line:'#EAE6F4', lilac:'#EFE8FF', pink:'#FFE6EF', cream:'#FFF8F3', mint:'#E5F7F3', green:'#EAF9EF', white:'#FFFFFF' };

export const s=StyleSheet.create({
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
 langCardSelected:{borderColor:C.purple,borderWidth:2},
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
