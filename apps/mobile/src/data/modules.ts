import { C } from '../theme';

// Keys index into `modules.*` in the translation files.
export type ModuleId = 'reproductiveHealth' | 'cycleTracking' | 'pregnancy' | 'childGrowth' | 'nutrition' | 'journal' | 'ask' | 'findCare';

export const modules: { id: ModuleId; color: string; icon: number }[] = [
  {id:'reproductiveHealth', color:C.pink, icon:require('../../assets/figma/reproductive-health.png')},
  {id:'cycleTracking', color:C.lilac, icon:require('../../assets/figma/cycle-tracking.png')},
  {id:'pregnancy', color:C.cream, icon:require('../../assets/figma/pregnancy.png')},
  {id:'childGrowth', color:C.mint, icon:require('../../assets/figma/child-growth.png')},
  {id:'nutrition', color:C.green, icon:require('../../assets/figma/nutrition.png')},
  {id:'journal', color:'#F0EDFE', icon:require('../../assets/figma/journal.png')},
];

const moduleIds: readonly string[] = [...modules.map(m=>m.id), 'ask', 'findCare'];
export const isModuleId = (value: unknown): value is ModuleId => typeof value === 'string' && moduleIds.includes(value);
