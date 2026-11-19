import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { restoreLanguage } from '../src/i18n';

export default function Layout() {
  // Hold the first render until the saved language is applied, so screens never flash the wrong language.
  const [ready, setReady] = useState(false);
  useEffect(() => { restoreLanguage().finally(() => setReady(true)); }, []);
  if (!ready) return null;
  return <Stack screenOptions={{headerShown:false}}/>;
}
