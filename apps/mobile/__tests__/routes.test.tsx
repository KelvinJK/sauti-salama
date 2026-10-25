import AsyncStorage from '@react-native-async-storage/async-storage';
import { fireEvent, renderRouter, screen } from 'expo-router/testing-library';
import { setLanguage } from '../src/i18n';
import { en } from '../src/i18n/locales/en';
import { sw } from '../src/i18n/locales/sw';

// Renders the real app/ directory, including the root layout that restores the saved language.
const renderApp = (initialUrl: string) => renderRouter('./app', { initialUrl });

beforeEach(async () => {
  await setLanguage('en');
  await AsyncStorage.clear();
});

describe('onboarding flow', () => {
  it('walks welcome → language → privacy → home', async () => {
    await renderApp('/');
    await fireEvent.press(await screen.findByText(`${en.welcome.getStarted}  →`));
    expect(screen).toHavePathname('/language');

    await fireEvent.press(screen.getByText(`${en.language.continueAsGuest}  →`));
    expect(screen).toHavePathname('/privacy');

    await fireEvent.press(screen.getByText(`${en.privacy.continuePrivately}  →`));
    expect(screen).toHavePathname('/home');
    expect(screen.getByText(en.home.title)).toBeVisible();
  });

  it('lets guests skip straight to home', async () => {
    await renderApp('/');
    await fireEvent.press(await screen.findByText(en.welcome.exploreAsGuest));
    expect(screen).toHavePathname('/home');
  });
});

describe('language screen', () => {
  it('switches the UI to Kiswahili and saves the choice', async () => {
    await renderApp('/language');
    await fireEvent.press(await screen.findByText('Kiswahili'));

    expect(await screen.findByText(sw.language.title)).toBeVisible();
    expect(screen.getByText(sw.language.header)).toBeVisible();
    expect(await AsyncStorage.getItem('sautisalama.language')).toBe('sw');
  });

  it('marks only the current language as selected', async () => {
    await renderApp('/language');
    const english = await screen.findByRole('button', { name: /English/ });
    const kiswahili = screen.getByRole('button', { name: /Kiswahili/ });
    expect(english).toBeSelected();
    expect(kiswahili).not.toBeSelected();
  });

  it('applies a language saved on a previous launch', async () => {
    await AsyncStorage.setItem('sautisalama.language', 'sw');
    await renderApp('/');
    expect(await screen.findByText(sw.welcome.tagline)).toBeVisible();
  });
});

describe('modules', () => {
  it('opens a module from home with its id', async () => {
    await renderApp('/home');
    await fireEvent.press(await screen.findByText(en.modules.cycleTracking));
    expect(screen).toHavePathnameWithParams('/module?id=cycleTracking');
    expect(screen.getAllByText(en.modules.cycleTracking).length).toBeGreaterThan(0);
  });

  it('opens the find-care placeholder from its call to action', async () => {
    await renderApp('/home');
    await fireEvent.press(await screen.findByText(en.modules.findCareCta));
    expect(screen).toHavePathnameWithParams('/module?id=findCare');
  });

  it('shows the module title in the current language', async () => {
    await setLanguage('sw');
    await renderApp('/module?id=childGrowth');
    expect((await screen.findAllByText(sw.modules.childGrowth)).length).toBeGreaterThan(0);
    expect(screen.getByText(sw.module.notice)).toBeVisible();
  });

  it('falls back to a safe title for unknown module ids', async () => {
    await renderApp('/module?id=not-a-module');
    expect((await screen.findAllByText(en.modules.reproductiveHealth)).length).toBeGreaterThan(0);
  });
});
